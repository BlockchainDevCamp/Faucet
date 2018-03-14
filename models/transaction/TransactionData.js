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
}

module.exports = TransactionData;
