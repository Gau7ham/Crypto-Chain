const uuid = require('uuid/v1');// uuid creates a unique id for every transaction

class Transaction {
    constructor({senderWallet, recipient, amount}){
        this.id = uuid();

        this.outputMap = this.createOutputMap({senderWallet, recipient, amount});
    }

    createOutputMap({senderWallet, recipient, amount}){
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance-amount;
        
        return outputMap;
    }
}

module.exports = Transaction;