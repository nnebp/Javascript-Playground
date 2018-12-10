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

// Command line args
const listenPort = process.argv[2];
const joinID = process.argv[3];
const joinIP = process.argv[4];
const joinPort= process.argv[5];
//TODO if argv.length < blah blah

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

// When you are ready, start listening for messages and join the network
// The Node#listen method takes different arguments based on the transport
// adapter being used
node.listen(listenPort);

// Join a known peer by it's [identity, contact]
//if (joinNode !== undefined) { //TODO we still have to join?
if (true) { //TODO we still have to join?
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
  });
}

// Use "userland" (that's you!) rules to create your own protocols
node.use('ECHO', (request, response, next) => {
/*  if ([/!* some naughty words *!/].includes(request.params.message)) {
    return next(new Error(
      `Oh goodness, I dare not say "${request.params.message}"`
    ));
  }*/
  console.log(request.params.message + " <-- did you also see this one?");

  //response.send(request.params);
});

const neighbor = [
  ...node.router.getClosestContactsToKey(node.identity).entries(),
].shift();

node.send('ECHO', { message: "will i see this?" }, neighbor);


