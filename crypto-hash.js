const crypto = require('crypto');

const cryptoHash = (...inputs) => {//(...inputs) it combines all the input parameteres into an array
    const hash = crypto.createHash('sha256');
    
    hash.update(inputs.sort().join(' '));
    
    return hash.digest('hex');
};

module.exports = cryptoHash;