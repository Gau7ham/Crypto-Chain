const Wallet = require('./index');
const {verifySignature} = require('../util');

describe('Wallet', () => {
    let wallet; 

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('has a `balance`', () => {
        expect(wallet).toHaveProperty('balance');
    });

    it('has a `publicKey`', () => {
        //console.log(wallet.publicKey); just to see how the public key looks like..

        expect(wallet).toHaveProperty('publicKey');
    });

    describe('signing data', () => {
        const data = 'foobar';

        it('verifies a signature', () => {
                expect(
                    verifySignature({
                    publicKey:wallet.publicKey,
                    data,
                    signature: wallet.sign(data)
                })
            ).toBe(true);
        });

        it('does not verifya an invalid signature', () => {
            expect(
                    verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: new Wallet().sign(data)
                })
            ).toBe(false);
        });
    })
});