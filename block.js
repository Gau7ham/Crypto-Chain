const {GENESIS_DATA, MINE_RATE}  = require('./config');
const cryptoHash = require('./crypto-hash');

class Block{// WE are using constructor to have different initializn of data
    constructor({timestamp, lastHash, hash ,data, nonce ,difficulty}){ // When using curly braces we dont have to remember the order of parameters
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty; // difficulty is how many leadning 0 should nonce should have

    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock,data}){
        let hash, timestamp;
        //const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const {difficulty} = lastBlock;
        let nonce = 0;
        do{
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
        } while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));

        return new this({timestamp,lastHash,data,difficulty,nonce,hash
            //cryptoHash(timestamp,lastHash, data, nonce, difficulty)//it creates a hash based on the timestamp lastHash and data. 
        });
    }
    
    static adjustDifficulty({orignalBlock, timestamp}){
        const{difficulty} = orignalBlock;
        
        if(timestamp - orignalBlock.timestamp > MINE_RATE) return difficulty -1;
       
        return difficulty + 1;
    }
}

module.exports = Block; // to share Block class with other files