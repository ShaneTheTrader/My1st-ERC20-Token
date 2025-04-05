require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // Match the Solidity version with your contract
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // URL from your Alchemy account
      accounts: [process.env.PRIVATE_KEY], // Private key from your wallet (stored in .env file)
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY, // Your Etherscan API key for Sepolia
    }
  },
  sourcify: {
    enabled: true // ✅ Enable Sourcify verification
  }
};