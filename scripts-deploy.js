const { ethers } = require("hardhat");

async function main() {
  const initialSupply = ethers.parseUnits("1000000", 18); // 1 Million Tokens with 18 Decimals

  const Token = await ethers.getContractFactory("MyToken");

  const token = await Token.deploy(initialSupply);

  await token.waitForDeployment();

  console.log("Contract deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
