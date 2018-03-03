'use strict';

const dateformat = require('dateformat');

class TransactionData {

    constructor(sendersAddress, recipientAddress, senderPublicKey, amount, fee, dateCreated) {
        this.from = sendersAddress;
        this.to = recipientAddress;
        this.senderPubKey = senderPublicKey;
        this.value = amount;
        this.fee = fee;
        this.dateCreated = dateCreated;
    }

    static createTransactionData(request) {
        let wallet = request.wallet;

        let senderAddress = wallet.address;
        let recipientAddress = request.body['to'];
        let senderPublicKey = request.body['senderPubKey'];
        let amount = request.body['value'];
        let fee = request.body['fee'];
        let dateCreated = dateformat(new Date(), "isoUtcDateTime"); // ISO8601 UTC datetime string

        return new TransactionData(senderAddress, recipientAddress, senderPublicKey, amount, fee, dateCreated);
    }
}

module.exports = TransactionData;
