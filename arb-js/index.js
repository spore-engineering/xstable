require("dotenv").config();

const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");

const Arb = require("./src/arb");
const Events = require("./src/events");

const {
  MNEMONIC,
  PRIVATE_KEY,
  WEB3_URL,
  STRAT_LIST,
  PROFIT_THRESHOLD,
  GAS_PRICE,
  ROUTER_1,
  ROUTER_2,
  UNI_ARB_PAIRS
} = process.env;

(async () => {
  let web3;
  if (MNEMONIC) web3 = new Web3(new HDWalletProvider(MNEMONIC, WEB3_URL));
  else if (PRIVATE_KEY) web3 = new Web3(WEB3_URL);
  else
    throw new Error(
      "no auth set. Please set a mnemonic or private key in .env"
    );
  const config = {
    tokens: TOKEN_LIST,
    strats: STRAT_LIST,
    profitThreshold: PROFIT_THRESHOLD,
    gasPrice: GAS_PRICE,
    chainId: await web3.eth.getChainId(),
    router1: ROUTER_1,
    router2: ROUTER_2,
    uniArbPairs: UNI_ARB_PAIRS
  };
  const events = new Events(web3);
  const arb = new Arb(web3, events, config);
})();
