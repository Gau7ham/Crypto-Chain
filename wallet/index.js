const {STARTING_BALANCE} = require('../config');
const cryptoHash = require('../util/crypto-hash');
const {ec} = require('../util');

class Wallet{
    constructor() {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();//this generates the pair of private and public keys

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data){
        return this.keyPair.sign(cryptoHash(data))
    }
};

module.exports = Wallet;
