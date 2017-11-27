
const P2p = require("./P2p.js");
const Blockchain = require("./Blockchain.js");
const blockchain = new Blockchain();
const p2p = new P2p(blockchain);

function cli(vorpal) {
  vorpal
  .use(welcome)
  .use(connectCommand)
  .use(discoverCommand)
  .use(blockchainCommand)
  .use(peersCommand)
  .use(mineCommand)
  .use(openCommand)
  .delimiter('blockchain →')
  .show()
}

module.exports = cli;

// COMMANDS
function welcome(vorpal) {
  vorpal.log("Welcome to Blockchain CLI!");
  vorpal.exec("help");
}

function connectCommand(vorpal) {
  vorpal
  .command('connect <host> <port>', "Connect to a new peer. Eg: connect localhost 2727")
  .alias('c')
  .action(function(args, callback) {
    if(args.host && args.port) {
      try {
        p2p.connectToPeer(args.host, args.port);
      } catch(err) {
        this.log(err);
      }
    }
    callback();
  })
}

function discoverCommand(vorpal) {
  vorpal
  .command('discover', 'Discover new peers from your connected peers.')
  .alias('d')
  .action(function(args, callback) {
    try {
      p2p.discoverPeers();
    } catch(err) {
      this.log(err);
    }
    callback();
  })
}

function blockchainCommand(vorpal) {
  vorpal
    .command('blockchain', 'See the current state of the blockchain.')
    .alias('bc')
    .action(function(args, callback) {
      this.log(blockchain)
      callback();
    })
}

function peersCommand(vorpal) {
  vorpal
    .command('peers', 'Get the list of connected peers.')
    .alias('p')
    .action(function(args, callback) {
      p2p.peers.forEach(peer => {
        this.log(`${peer.pxpPeer.socket._host} \n`)
      }, this)
      callback();
    })
}

function mineCommand(vorpal) {
  vorpal
    .command('mine <data>', 'Mine a new block. Eg: mine hello!')
    .alias('m')
    .action(function(args, callback) {
      if (args.data) {
        blockchain.mine(args.data);
        p2p.broadcastLatest(); 
      }
      callback();
    })
}

function openCommand(vorpal) {
  vorpal
    .command('open <port>', 'Open port to accept incoming connections. Eg: open 2727')
    .alias('o')
    .action(function(args, callback) {
      if (args.port) {
        if(typeof args.port === 'number') {
          p2p.startServer(args.port);
          this.log(`Listening to peers on ${args.port}`);
        } else {
          this.log(`Invalid port!`);
        }
      }
      callback();
    })
}