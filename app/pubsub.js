const PubNub = require('pubnub');
const Blockchain = require('../blockchain');

const credentials ={
    publishKey: 'pub-c-5000642d-e3eb-47ea-8e83-0df4c3d2e935',
    subscribeKey: 'sub-c-a897f736-b4cc-11eb-b2e5-0e040bede276',
    secretKey: 'sec-c-OWZjNzI0MmUtMmMxZC00Nzk2LTg4MmMtNzk2M2U5ZDIwNjRk'
};
const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);// this.pubnub is a class object which uses PubNub modules feature 
        this.pubnub.subscribe({channels:Object.values(CHANNELS)});// object.values send the objects of CHANNELS in an array format
        
        this.pubnub.addListener(this.listener());
    }
    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)//JSON.stringify converts js to json format(readable format)
        });
    }
    
    listener(){
        return{
            message: messageObject=> {
                const {channel,message} = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);

                const parsedMessage = JSON.parse(message);

                if(channel === CHANNELS.BLOCKCHAIN){
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        };
    }

    publish({channel,message}){
        this.pubnub.publish({channel,message});
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)//JSON.stringify converts js to json format(readable format)
        });
    }
}
// const testPubSub = new PubSub();
// testPubSub.publish({channel: CHANNELS.TEST, message:'HELLO PUBNUB'});

module.exports = PubSub;