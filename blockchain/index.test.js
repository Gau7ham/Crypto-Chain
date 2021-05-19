const Blockchain = require ('./index');
const Block = require ('./block');
const {cryptoHash} = require('../util')

describe('Blockchain', () => {
    let blockchain,newChain,orignalChain;

    beforeEach(() => {// it creates a fresh instance of blockchain between each test
        blockchain = new Blockchain();
        newChain = new Blockchain();// it is initialized to check with orignal chain
        orignalChain = blockchain.chain;// to get the orignal chain to compare if the chain has changed .
    });

    it('contain a `chain` array instance', () =>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block',() =>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain',() =>{
        const newData = 'foo bar';
        blockchain.addBlock({data:newData});
    
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
        /*console.log("1",blockchain.chain); it returns minblock as well as genesis block
        console.log('2',blockchain.chain[blockchain.chain.length-1]);it returns the mined block*/ 
    });

    describe('isValidChain()', () =>{
        describe('when the chain does not start with genesis block',()=>{
            it('returns false', () =>{
                blockchain.chain[0]= {data:'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the the genesis block and has multiple blocks',()=>{
            beforeEach(() =>{// creates new instance after every test cases 
                blockchain.addBlock({data:'bears'});
                blockchain.addBlock({data:'beets'});
                blockchain.addBlock({data:'battlestar Galactica'});
            });

            describe('and a lastHash reference has changed',()=>{
                it('returns false',() =>{
                    blockchain.chain[2].lastHash = 'broken-lastHash';
                
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field',() =>{
                it('returns false', () =>{
                   blockchain.chain[2].data = 'some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });          

            describe('and the chain contains a block with a jumped difficulty', () => {// this test is written to prevent someone from chainging the difficulty level.
                it('returns false',() =>{
                    const lastBlock = blockchain.chain[blockchain.chain.length-1];
                    const lastHash = lastBlock.hash;
                    const timestamp = Date.now();
                    const nonce = 0;
                    const data =[];
                    const difficulty = lastBlock.difficulty-3;

                    const hash = cryptoHash(timestamp, lastHash, difficulty, nonce, data);

                    const badBlock = new Block({
                        timestamp, lastHash, hash, nonce, difficulty, data
                    });

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain does not contain invalid blocks', () =>{
                it('returns true',() => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });

    describe('replaceChain()',() => {
        let errorMock,logMock;// to not show a certain every time we run test this jest.fn() is used it create temporary mehods for tests to keep track of certain mehtod were called or not during the execution of some code..
        beforeEach(() => { 
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;//we are initialising global.console.error as jest.jn()
            global.console.log = logMock;
        });

        describe('when the new chain is not longer',() => {
            beforeEach(() =>{
                newChain.chain[0] = {new: 'chain'};
                blockchain.replaceChain(newChain.chain);
            });

            it('does not replace the chain', () => {
                expect(blockchain.chain).toEqual(orignalChain);
            });
            
            it('logs an error', () =>{// to check if errorMock fn have fired 
                expect(errorMock).toHaveBeenCalled();
            });

        });

        describe('when the new chain is longer',() => {
            beforeEach(()=>{
                newChain.addBlock({data: 'Abhishek'});
                newChain.addBlock({data: 'Prashil'});
                newChain.addBlock({data: ' Gautham '});
            });

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockchain.replaceChain(newChain.chain);
                });

                it('does not replace the chain', () =>{
                     expect(blockchain.chain).toEqual(orignalChain);
                });

                it('logs an error', () =>{
                    expect(errorMock).toHaveBeenCalled();
                });
            });
            
            describe('and the chain is valid',() => {
                beforeEach(() =>{
                    blockchain.replaceChain(newChain.chain);
                });

                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });
                
                it('logs about the chain replacement', () =>{
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });
    });
});
