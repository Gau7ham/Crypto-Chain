const EC = require('elliptic').ec;// .ec is a property which contains the overall EC class
const cryptoHash = require('./crypto-hash');

const ec = new EC('secp256k1')//secp standards of efficient cryptography used in bit coin kstarts for the mathematecian who created this and 1 is this is the 1st implementation

const verifySignature = ({ publicKey, data, signature}) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');

    return keyFromPublic.verify(cryptoHash(data), signature)
};

module.exports = {ec, verifySignature, cryptoHash};

