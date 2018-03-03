'use strict';

const Crypto = require('../Crypto');

class Faucet {

    //TODO Create constructor/builder/factory method which generates public AND private key on behalf of the user

    constructor(privateKeyStr, publicKey, compressedPublicKey, address) {
        this.privateKey = privateKeyStr;
        this.publicKey = publicKey;
        this.compressedPublicKey = compressedPublicKey;
        this.address = address;
    }

    static loadFaucet(publicKeyStr) {
        // TODO enhance validation
        if (!publicKeyStr) {
            throw new Error("Invalid public key.");
        }

        let compressedPublicKey = Crypto.compressPublicKey(publicKey);
        let address = Crypto.createAddress(compressedPublicKey);

        return new Faucet(privateKeyStr, publicKey, compressedPublicKey, address);
    }

    static createFaucet() {
        let privateKey = Crypto.createPrivateKey();
        return Wallet.loadFaucet(privateKey);
    }
}

module.exports = Faucet;
