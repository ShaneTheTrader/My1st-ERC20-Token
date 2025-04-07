const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let Token;
    let token;
    let owner;
    let addr1;
    let addr2;
    const initialSupply = ethers.parseUnits("1000000", 18); // 1 million tokens with 18 decimals

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        Token = await ethers.getContractFactory("MyToken");
        token = await Token.deploy(initialSupply);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("Should assign the initial supply to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });

    describe("Minting", function () {
        it("Should allow owner to mint tokens", async function () {
            const mintAmount = ethers.parseUnits("100", 18);
            await token.mint(owner.address, mintAmount);
            const newBalance = await token.balanceOf(owner.address);
            expect(newBalance).to.equal(initialSupply.add(mintAmount)); // Use .add() for adding BigNumbers
        });

        it("Should not allow non-owner to mint", async function () {
            const mintAmount = ethers.parseUnits("100", 18);
            await expect(
                token.connect(addr1).mint(addr1.address, mintAmount)
            ).to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
        });
    });

    describe("Burning", function () {
        it("Should allow burning tokens", async function () {
            const burnAmount = ethers.parseUnits("100", 18);
            await token.burn(burnAmount);
            const ownerBalance = await token.balanceOf(owner.address);
            expect(ownerBalance).to.equal(initialSupply.sub(burnAmount)); // Use .sub() for subtracting BigNumbers
        });

        it("Should not allow burning more than balance", async function () {
            const burnAmount = ethers.parseUnits("100000000", 18); // More than balance
            await expect(
                token.connect(addr1).burn(burnAmount)
            ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
        });
    });

    describe("Pausable", function () {
        it("Should allow owner to pause and unpause", async function () {
            await token.pause();
            expect(await token.paused()).to.equal(true);

            await token.unpause();
            expect(await token.paused()).to.equal(false);
        });

        it("Should prevent transfers while paused", async function () {
            await token.transfer(addr1.address, ethers.parseUnits("100", 18)); // normal transfer
            await token.pause();

            await expect(
                token.transfer(addr1.address, ethers.parseUnits("50", 18))
            ).to.be.revertedWithCustomError(token, "EnforcedPause");

            await token.unpause();
            await token.transfer(addr1.address, ethers.parseUnits("50", 18)); // should work again
        });
    });
});
