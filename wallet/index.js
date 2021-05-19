const {STARTING_BALANCE} = require('../config');
const Transaction = require('./transaction');
const {ec, cryptoHash} = require('../util');

class Wallet{
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();//this generates the pair of private and public keys

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({recipient,amount}){
        if(amount> this.balance){
            throw new Error('Amount exceeds balance');
        }

        return new Transaction({senderWallet: this, recipient, amount});
    }
};

module.exports = Wallet;
