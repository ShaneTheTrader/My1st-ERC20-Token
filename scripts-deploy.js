const { ethers } = require("hardhat");
const { parseUnits } = require("ethers");

async function main() {
  const initialSupply = parseUnits("1000000", 18); // 1 Million Tokens with 18 Decimals
  console.log("Initial supply:", initialSupply.toString());

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment(); // ✅ Ethers v6 uses this instead of `deployTransaction.wait()`

  console.log("Contract deployed to:", await token.getAddress()); // ✅ New syntax
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
