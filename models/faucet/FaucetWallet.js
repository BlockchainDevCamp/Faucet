'use strict';

const Crypto = require('../Crypto');

class FaucetWallet {}
FaucetWallet.privateKey = 'bdb9fc50105618477af34fdbd0546b954820679fa0ad1cd12984057cc5e18856';
FaucetWallet.publicKey = 'b1ad0307aac50113d3a4ee19db30aea0f43ae659c8b8f0b1fffcd85fe73bb18a1';
FaucetWallet.compressedPublicKey = 'b1ad0307aac50113d3a4ee19db30aea0f43ae659c8b8f0b1fffcd85fe73bb18a1';
FaucetWallet.address = '9cb729548b18dd625aa5a52769844e2ed915da42';
Object.freeze(FaucetWallet);

module.exports = FaucetWallet;
