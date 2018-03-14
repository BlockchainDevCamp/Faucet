'use strict';

const Faucet = require('../models/faucet/Faucet');
const FaucetWallet = require('../models/faucet/FaucetWallet');
const Transaction = require('../models/transaction/Transaction');
const TransactionData = require('../models/transaction/TransactionData');
const TransactionHash = require('../models/transaction/TransactionHash');

const Request = require('request');
const dateformat = require('dateformat');

async function handleTransaction(req,res) {
    // 2. Handling transaction
    let senderAddress = FaucetWallet.address;
    let recipientAddress = req.body['address'];
    // TODO validate toAddress
    let senderPublicKey = FaucetWallet.publicKey;
    let amount = 1;
    let fee = 1;
    let dateCreated = dateformat(new Date(), "isoUtcDateTime");

    let transactionData = new TransactionData(senderAddress, recipientAddress, senderPublicKey, amount, fee, dateCreated);
    let transaction = Transaction.createTransaction(transactionData);
    let transactionHash = new TransactionHash(transaction).transactionHash;

    let options = {
        method: 'post',
        body: transaction,
        json: true,
        // TODO: move to a configuration
        url: "http://127.0.0.1:5555/transactions",
    };

    await Request(options, function (err, response, transactionHashBody) {
        if (err) {
            console.error(err);
            res.set('Content-Type', 'text/html')
            res.redirect(302, '/');
        }
        else if (!transactionHashBody || !transactionHashBody.transactionHash
            || transactionHash !== transactionHashBody.transactionHash) {

            // throw Error("Compromised transaction.");
            console.error("Compromised transaction: " + transaction);

            // res.status(302);
            res.set('Content-Type', 'text/html');
            res.redirect(302, '/');
        }
        else {
            try {
                Faucet.withdrawACoin(recipientAddress);
            }catch (err){
                if ("A coin could be requested only once per hour." === err.message) {
                    res.status(429);
                    res.set('Content-Type', 'text/html');
                    res.redirect('/too-soon');
                } else if ("Ups! We ran out of honey!" === err.message) {
                    res.status(500);
                    res.set('Content-Type', 'text/html');
                    res.redirect('/out-of-money');
                }
                return;
            }

            res.set('Content-Type', 'text/html')
            res.redirect(301, '/success');
        }
    });
}
module.exports = { 
    main: (req, res) => {
        res.render('home/main');
    },

    success: (req, res) => {
        res.render('home/success');
    },

    tooSoon: (req, res) => {
        res.render('home/too-soon');
    },

    outOfHoney: (req, res) => {
        res.render('home/out-of-honey');
    },

    postTransaction: async (req, res) => {
        // 1. Handling recaptcha
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({"responseError": "Please select captcha first"});
        }

        const secretKey = "6LeA30sUAAAAAPxBqNwnxOUOYdjUMyv7Dtgsi9xl";
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

        Request(verificationURL, function (error, response, body) {
            body = JSON.parse(body);

            if (body.success !== undefined && !body.success) {
                return response.json({responseError: "Failed captcha verification"});
            }
            // res.json({responseSuccess: "Success"});

            // response.json({"responseCode": 0, "responseDesc": "Success"});
            handleTransaction(req, res);
        });
    }
};
