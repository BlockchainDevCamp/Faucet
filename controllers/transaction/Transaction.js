'use strict';

const Crypto = require('../../models/Crypto');
const TransactionData = require('./TransactionData');

class Transaction {

    constructor(senderAddress, recipientAddress, senderPublicKey, amount, fee, dateCreated, senderSignature) {
        this.from = senderAddress;
        this.to = recipientAddress;
        this.senderPubKey = senderPublicKey;
        this.value = amount;
        this.fee = fee;
        this.dateCreated = dateCreated;
        this.senderSignature = senderSignature;
    }

    static createTransaction(request) {
        let transactionData = TransactionData.createTransactionData(request);

        let transactionPayloadHash = Crypto.signSHA256(JSON.stringify(transactionData));

        let senderSignature = Crypto.createTransactionSignature(request.wallet.privateKey, transactionPayloadHash);

        return new Transaction(
            transactionData.from,
            transactionData.to,
            transactionData.senderPubKey,
            transactionData.value,
            transactionData.fee,
            transactionData.dateCreated,
            senderSignature);
    }

}

module.exports = Transaction;