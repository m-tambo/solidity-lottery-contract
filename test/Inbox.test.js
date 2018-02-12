const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// create local instance of Web3
const provider = ganache.provider();
const web3 = new Web3(provider);

// retreive the teo pieces of the compiled app
const { interface, bytecode } = require('../compile.js');


let accounts;
let inbox;
const INITIAL_MSG = 'hello squirrel';

beforeEach( async () => {
  // GET A LIST OF ALL ACCOUNTS
  accounts = await web3.eth.getAccounts()

  // USE AN ACCOUNT TO DEPLOY CONTRACT
  inbox = await new web3.eth.Contract(JSON.parse(interface ))
    .deploy({ data: bytecode, arguments: [INITIAL_MSG] })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider);

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // assert.ok passes with any truthy value
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MSG);
  });

  it('can change a message', async () => {
    await inbox.methods.setMessage('ciao').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'ciao');
  })
});







// MOCHA SAMPLE TESTS
// class Car {
//   park() {
//     return 'stopped';
//   }

//   drive() {
//     return 'vroom';
//   }
// }

// let testCar;

// beforeEach(() => {
//   testCar = new Car();
// });

// describe('Car', () => {
//   it('is able to park', () => {
//     assert.equal(testCar.park(), 'stopped');
//   });

//   it('is able to drive', () => {
//     assert.equal(testCar.drive(), 'vroom');
//   });
// });
