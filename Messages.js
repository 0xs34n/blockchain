const messageType = require("./message-type.js");
const {
  REQUEST_LATEST_BLOCK,
  RECEIVE_LATEST_BLOCK,
  REQUEST_BLOCKCHAIN,
  RECEIVE_BLOCKCHAIN,
  REQUEST_TRANSACTIONS,
  RECEIVE_TRANSACTIONS
} = messageType;

class Messages {
  static getLatestBlock() {
    return {
      type: REQUEST_LATEST_BLOCK
    };
  }

  static sendLatestBlock(block) {
    return {
      type: RECEIVE_LATEST_BLOCK,
      data: block
    };
  }

  static getBlockchain() {
    return {
      type: REQUEST_BLOCKCHAIN
    };
  }

  static sendBlockchain(blockchain) {
    return {
      type: RECEIVE_BLOCKCHAIN,
      data: blockchain
    };
  }
}

module.exports = Messages;