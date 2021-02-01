const {GENESIS_DATA}  = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{// WE are using constructor to have different initializn of data
    constructor({timestamp, lastHash, hash ,data}){ // When using curly braces we dont have to remember the order of parameters
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock,data}){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        
        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp,lastHash, data)//it creates a hash based on the timestamp lastHash and data. 
        });
    }
}

module.exports = Block; // to share Block class with other files