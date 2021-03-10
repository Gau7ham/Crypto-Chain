//const { genesis } = require("./block"); // it impors genesis function to const genesis
const Block = require("./block"); // it imports the block Block class to the const Block  
const {GENESIS_DATA} = require ('./config');// we use { GENESIS_DATA } bcoz it is exported as an object .
const cryptoHash = require('./crypto-hash');

describe('Block' ,()=> { // in describe we write the test case for the requrired tests (testing  block class)
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data =['blockchain','data'];
    const nonce =1;
    const difficulty =1;
    const block = new Block({timestamp,lastHash,hash,data,nonce,difficulty});// we are sending this parameters to block.js file.

    it('has timestamp, lastHash, hash and data property',() => {
        expect(block.timestamp).toEqual(timestamp);// it checks if the data initialized in the describe block and data in the constructor in the block class are equal.
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe('genesis()', () => {// this test is for genesis function 
        const genesisBlock = Block.genesis();
        
        it('returns a Block instance',() => {
            expect(genesisBlock instanceof Block). toBe(true)
        });
        it('returns the genesis data',() => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock= Block.mineBlock({lastBlock,data});

        it('returns a Block instance',() => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it ('sets the  `lastHash` to be the `hash` of the lastBlock' , () => { // we are using backticks `lastHash` bcoz lastHash is a keyword 
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`',() => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `timestamp`',()=> {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the proper inputs', () =>{
            expect(minedBlock.hash).toEqual(cryptoHash(
                minedBlock.timestamp,
                minedBlock.nonce,
                minedBlock.difficulty,
                lastBlock.hash,
                data
                )
            );
        });
        it('sets a `hash` that matches that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
        });
    });
});