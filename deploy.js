const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js');

// USE THIS MODULE TO UNLOCK AN ACCT ON SPECIFIED NETWORK
const provider = new HDWalletProvider(
  'document brass act cradle plate camera north myth glance outer force skirt',
  'https://rinkeby.infura.io/RuQxhWvoneX0FObjxiia'
);

const web3 = new Web3(provider);

// create a deploy function to make use of async/await
const deploy = async () => {
  // GET LIST OF AVAILABLE ACCTS
  const accounts = await web3.eth.getAccounts();

  // LOG OUT ACCT THAT WILL PAY FOR DEPLOYMENT
  console.log(`Attempting to deploy from account ${accounts[0]}`);

  // FEED OUR CONTRACT ABI AND BYTECODE AND SEND TO NETWORK
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello, squirrel'] })
    .send({ gas: '1000000', from: accounts[0] })

  // LOG OUT THE DESTINATION
  console.log(`Contract deployed to ${result.options.address}`)
};

deploy();
