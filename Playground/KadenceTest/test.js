/**
 * @example kadence/example/minimal
 */

'use strict';

// Import dependencies
const bunyan = require('bunyan');
const levelup = require('levelup');
const leveldown = require('leveldown');
const encoding = require('encoding-down');
const kadence = require('@kadenceproject/kadence');
const uuid = require('uuid/v4');

// Command line args
const listenPort = process.argv[2];
const joinID = process.argv[3];
const joinIP = process.argv[4];
const joinPort= process.argv[5];
//TODO if argv.length < blah blah

const receivedFloodMessages = [];

//create map and fill it with functions (message(key), function (value) TODO
const messages = new Map();

// In production, persist identity to disk and load it
// Generating a new one every time will cause lookup problems
const identity = kadence.utils.getRandomKeyBuffer();

// Construct a kademlia node interface; the returned `KademliaNode` object
// exposes:
// - router
// - rpc
// - storage
// - identity
const node = new kadence.KademliaNode({
  transport: new kadence.HTTPTransport(),
  storage: levelup(encoding(leveldown(`./storage${listenPort}.db`))),
  contact: { hostname: 'localhost', port: listenPort}
});

// TODO do we need to join if we are the first node? it seems kadence is cool
// wih us just connecting to a nonexistent node

// When you are ready, start listening for messages and join the network
// The Node#listen method takes different arguments based on the transport
// adapter being used
node.listen(listenPort);

// Join a known peer by it's [identity, contact]
node.join([joinID, { // does this even matter on the same machine?

  hostname: joinIP,
  port: joinPort
}], () => {
  // Add 'join' callback which indicates peers were discovered and
  // our node is now connected to the overlay network
  node.logger.info(`Connected to ${node.router.size} peers!`);
  console.log(identity.valueOf());

  // Base protocol exposes:
  // * node.iterativeFindNode(key, callback)
  // * node.iterativeFindValue(key, callback)
  // * node.iterativeStore(key, value, callback)
  flood("test", uuid()); //TODO split join uuid??

});

// Use "userland" (that's you!) rules to create your own protocols
node.use('FLOOD', (request, response, next) => {
  if (receivedFloodMessages.indexOf(request.params.id) === -1) {
    message.get(request.params.message)(request);
    //console.log("the funct is" + funct);
    //funct(request);

    flood(request.params.message, request.params.id);
    receivedFloodMessages.push(request.params.id);
  }
});

//send out a flood
const flood = (message, id) => {
  for(let value of node.router.values()) {
    if (value.size > 0) {
      for(let identValue of value) {
        //change args to be some object? TODO
        node.send('FLOOD', {message: message, /*args: null,*/ id: id}, identValue);
      }
    }
 }
};

//TODO process messages take a map and a callback?
// TODO change name
const testMe = (request) => {
  console.log(request.params.message + " <-- did the test function fire?");
  //console.log("delte me " + " <-- did the test function fire?");
};
messages.set("test", testMe);

flood("test", uuid()); //TODO split join uuid??
console.log("flood???");
//messages.get("test")(null);
