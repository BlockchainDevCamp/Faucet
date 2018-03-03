'use strict'

const Transaction = require('./Transaction');

module.exports = {
    createTransaction(request, response, next) {
        try {
            let transaction = Transaction.createTransaction(request);

            response.status(200);
            response.set('Content-Type', 'application/json');
            response.send(transaction);
        } catch(err) {
            console.error(err);
            next(new Error("Transaction creation failed."));
        }
    },

    validateTransactionData(request, response, next) {
        try {
            let from = request.body["from"];
            if (!from || from.length != 40 || from != request.wallet.address) {
                throw new Error("Invalid sender address.");
            }

            let senderPublicKey = request.body["senderPubKey"];
            if (!senderPublicKey || senderPublicKey.length != 65) {
                throw new Error("Invalid sender public key.");
            }

            let recipientAddress = request.body['to'];
            if (!recipientAddress || recipientAddress.length != 40) {
                throw new Error("Invalid recipient address.");
            }

            let amount = request.body['value'];
            if (!amount || amount <= 0 || amount > 1) {
                throw new Error("Invalid transaction amount.");
            }

            let fee = request.body['fee'];
            if (!fee || fee <= 0) {
                throw new Error("Invalid transaction fee.");
            }
        } catch (err) {
            next(err);
            return;
        }
        next();
    }
};
