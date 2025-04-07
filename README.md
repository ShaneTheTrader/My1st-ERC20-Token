# 🚀 My1st-ERC20-Token

This project is a simple implementation of an ERC20 Token using Solidity, OpenZeppelin, Hardhat, and Ethers.js. The token is deployed and verified on the Sepolia Testnet.

## 🪙 Token Details

- **Name:** MyToken  
- **Symbol:** MTK  
- **Total Supply:** 1,000,000 MTK  
- **Decimals:** 18  
- **Deployed Address:** [0x8E2dc72db5D0f73fD1fA4dd16Cb101B2C1f1b17a](https://sepolia.etherscan.io/address/0x8E2dc72db5D0f73fD1fA4dd16Cb101B2C1f1b17a#code)

## 📁 Project Structure

```
├── contracts/
│   └── MyToken.sol        # ERC20 Token Contract
├── scripts/
│   └── deploy.js          # Script to deploy the contract
├── .env                   # Environment variables (not pushed to GitHub)
├── .gitignore
├── hardhat.config.js
└── README.md              # This file
```

## 🛠 How to Use

### 1. Clone the repo

```bash
git clone https://github.com/ShaneTheTrader/My1st-ERC20-Token.git
cd My1st-ERC20-Token
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file with the following content:

```
PRIVATE_KEY=your_private_key
ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/your_project_key
ETHERSCAN_API_KEY=your_etherscan_key
```

> ⚠️ Do not share your private key publicly.

### 4. Deploy the Contract

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. Verify the Contract

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS
```

### Example:

```bash
npx hardhat verify --network sepolia 0xYourDeployedAddress 1000000000000000000000000
```

---

## 📜 Verified Contracts

- [✔️ Etherscan - View Verified Code](https://sepolia.etherscan.io/address/0x8E2dc72db5D0f73fD1fA4dd16Cb101B2C1f1b17a#code)
- [✔️ Sourcify - Verified Source Code](https://repo.sourcify.dev/contracts/full_match/11155111/0x8E2dc72db5D0f73fD1fA4dd16Cb101B2C1f1b17a/)

---

## 📢 Author

**[@ShaneTheTrader](https://github.com/ShaneTheTrader)**  
Built with 💻 and ☕ using Hardhat, Ethers, and OpenZeppelin & Chatgpt guidance.

---

## 📄 License

This project is licensed under the MIT License.