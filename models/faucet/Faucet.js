'use strict';

const ONE_HOUR = 60 * 60 * 1000; // millisecs
const FORBIDDEN_RECURRENT_WITHDRAWAL_PERIOD = ONE_HOUR; // millisecs

const lastWithdrawalTimestamps = new Map();

const balance = 1000000000; // coins

class Faucet {

    static withdrawACoin(address){
        if (this.balance <= 0) {
            throw Error("Ups! We ran out of honey!");
        }
        if (Faucet.isAllowed(address)) {
            Faucet.storeAddress(address);
            Faucet.balance--;
            return;
        }
        throw Error("A coin could be requested only once per hour.");
    }

    static isAllowed(address) {
        if (!address) {
            throw new Error("Invalid address.");
        }
        let lastWithdrawalTimestamp = lastWithdrawalTimestamps.get(address);

        if (!lastWithdrawalTimestamp) {
            return true;
        }

        let millisecsSinceLastWithdrawal = new Date() - lastWithdrawalTimestamp;
        return (millisecsSinceLastWithdrawal > FORBIDDEN_RECURRENT_WITHDRAWAL_PERIOD);
    }

    static storeAddress(address) {
        lastWithdrawalTimestamps.set(address, new Date());
    }

    // TODO optimise memory by cleaning it every now and then
    static removeAddress(address) {
        lastWithdrawalTimestamps.delete(address);
    }
}

module.exports = Faucet;
