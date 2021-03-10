const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            lastBlock:this.chain[this.chain.length-1],data// it sends the lastblock which is current chain -1 that is previous block in the array.
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain.length <= this.chain.length){
            console.error('the incoming chain must be longer');
            return;
        }

        if(!Blockchain.isValidChain(chain)){// it blocchainisvalidchain is false
            console.error('the incoming chain must be valid');
            return;
        }
        console.log('replacing chain with',chain);
        this.chain = chain;
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;// it verifies if 1st block is similar to genesis block ,stringify creates the object in the form of strings and compares the chain and genesis objects in the form of objects

        for(let i =1; i<chain.length; i++){
            const {timestamp,lastHash,hash,nonce, difficulty, data} = chain[i];

            const actualLastHash = chain[i-1].hash;

            if(lastHash !== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp,lastHash,data,nonce , difficulty);

            if(hash  !== validatedHash)return false;
        }

        return true;
    }
}

module.exports = Blockchain;
