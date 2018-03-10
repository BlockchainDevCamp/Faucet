'use strict';

const crypto = require('../models/Crypto')
const request = require('request')

module.exports = { 
    main: (req, res) => {
        res.render('home/main');
    },

    success: (req, res) => {
        res.render('home/success');
    },
    postTransaction: (req, res) => {
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
        {
            return res.json({"responseError" : "Please select captcha first"});
        }
        const secretKey = "6LeA30sUAAAAAPxBqNwnxOUOYdjUMyv7Dtgsi9xl";
        
        const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        
        request(verificationURL,function(error,response,body) {
            body = JSON.parse(body);
        
            if(body.success !== undefined && !body.success) {
            return res.json({"responseError" : "Failed captcha verification"});
            }
            res.json({"responseSuccess" : "Sucess"});
        });

        let privateKey = 'migema0gcsqgsib3dqebaquaa4gmadcbiakbghjhmtedxpux8tgejsexljffde8d';
        let nodeUri = "http://localhost:5555";
        let publicKey = "0x53d9468ae772B27f6b49c108D2d1677C122b2b52";
        let compressedPublicKey = crypto.compressPublicKey(publicKey);
        let address = crypto.createAddress(compressedPublicKey);
        let userAddress = req.path.split('/')[2];  
        let amount = 1;
        
        let data = {
            from: address,
            to: userAddress,
            amount: amount,
            timeCreated: (new Date()).getTime(),
        };
        // create transaction hash
        data.transactionHash = crypto.signSHA256(JSON.stringify(data));
        // sign transaction hash
        data.senderSignature = crypto.createTransactionSignature(privateKey, data.transactionHash);
        // add public key
        data.senderPubKey = publicKey;

        let uri = nodeUri + '/transactions';

        let options = {
            uri: uri,
            method: 'POST',
            json: data
        };
        
        request(options, function (error, response, body) {   
            if (!error) {
                res.redirect('/success')
            } else {
                res.redirect('/')
            }
        });
    }
}