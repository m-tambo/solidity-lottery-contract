const assert = require('assert');
// REQUIRE LOCAL TEST NETWORK GANACHE WITH TEST ACCTS
const ganache = require('ganache-cli');
const Web3 = require('web3');
// CREATE NEW INSTANCE OF WEB3
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile.js');

let lottery, accounts

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});
