It is a blockchain-based crowdfunding platform inspired by Kickstarter, built on Ethereum. It enables anyone to create a fundraising campaign with a specified minimum contribution. Contributors automatically become approvers and gain the right to vote on spending requests proposed by the campaign creator.

Each spending request must receive approval from more than 50% of contributors before being finalized, ensuring a transparent and democratic use of funds.

Key Features:
-Create campaigns with customizable minimum contribution thresholds.
-Smart contract logic implemented in Solidity.
-Modern frontend built with Next.js, React, and Semantic UI.
-Real-time voting system for approving or rejecting spending requests.
-Direct interaction with Ethereum blockchain via Web3.js.

## 🛠️ How to Run This Project Locally

To run this project locally, make sure to **manually add the following files** in the `ethereum/` directory before installing dependencies.

---

### `ethereum/campaign.js`

```js
import web3 from './web3';
import CampaignFactory from './build/Campaign.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        address
    );
};
---
### `ethereum/deploy.js`

const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  /* Replace with your mnemonic and Infura URL */
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
Then run:
npm install
node ethereum/deploy.js
Copy the deployed contract address.


---
### `ethereum/factory.js`
import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'PASTE_YOUR_DEPLOYED_ADDRESS_HERE'
);

export default instance;
ethereum/web3.js
js
Copier
Modifier
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "PASTE_YOUR_INFURA_LINK_HERE"
  );
  web3 = new Web3(provider);
}

export default web3;
