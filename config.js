const MINE_RATE = 1000; //1000  which is 1sec coz it is set in milisec
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    hash: 'hash-one',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []// it is an empty array
}; 
// difficulty added in genesis block will help the block that is generated to base the difficulty that came before.

const STARTING_BALANCE = 1000;
module.exports = {GENESIS_DATA, MINE_RATE, STARTING_BALANCE};// It shares the GENESIS Object with other fiels