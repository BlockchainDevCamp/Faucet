'use strict';

const Faucet = require('../models/faucet/Faucet');

function handleWalletCreation(request, response, wallet) {
    let walletInfo = new WalletInfo(wallet.privateKey, wallet.compressedPublicKey, wallet.address);
    let status = 200;

    if (!WalletRepository.walletByAddress(wallet.address)) {
        WalletRepository.addWallet(wallet);
        status = 201;
    }

    response.status(status);
    response.set('Content-Type', 'application/json');
    response.send(walletInfo);
}

module.exports = {
    retrieveWalletByAddress(request, response) {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error("Not Found.");
        }
        response.set('Content-Type', 'application/json');
        response.send(request.wallet);
    },

    createWallet(request, response) {
        let wallet = Wallet.createWallet();
        handleWalletCreation(request, response, wallet);
    },

    loadWallet(request, response) {
        let privateKey = request.body['privateKey'];
        let wallet = Wallet.loadWallet(privateKey);
        handleWalletCreation(request, response, wallet);
    }
};

