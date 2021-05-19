const crypto = require('crypto');

const hexToBinary = require('hex-to-binary');

const cryptoHash = (...inputs) => {//(...inputs) it combines all the input parameteres into an array
    const hash = crypto.createHash('sha256');//it creates a default sha hash
    
    hash.update(inputs.map(input=>JSON.stringify(input)).sort().join(' '));//it updates the hash by taking all the hash values of the input parameters
    
    return hash.digest('hex');// it converts the 256 bit hash into 256 bit hash
};

module.exports = cryptoHash;
