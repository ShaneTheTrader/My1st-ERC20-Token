import React, { useState } from "react";
import { ethers } from "ethers";
import Logo from "./components/Logo";
import MyTokenJSON from "./MyToken.json";

function App() {
  const [appState, setAppState] = useState({
    account: "",
    contract: null,
    paused: false,
    balance: "",
    tokenName: "",
    tokenSymbol: "",
  });

  const [mintAmount, setMintAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const contractAddress = "0xEA75909F6E753b4512F9b2B947d457cb5c1FF6d5";
  const contractABI = MyTokenJSON.abi;

  const updateState = (key, value) => {
    setAppState((prevState) => ({ ...prevState, [key]: value }));
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask!");

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const tokenContract = new ethers.Contract(contractAddress, contractABI, signer);

      updateState("account", address);
      updateState("contract", tokenContract);

      // Fetching data using provider instead of signer to avoid `CALL_EXCEPTION`
      const readOnlyContract = new ethers.Contract(contractAddress, contractABI, provider);
      const [_paused, _name, _symbol, _balance] = await Promise.all([
        readOnlyContract.paused(),
        readOnlyContract.name(),
        readOnlyContract.symbol(),
        readOnlyContract.balanceOf(address),
      ]);

      console.log("Token Symbol:", _symbol);
      console.log("Raw Balance:", _balance.toString());

      updateState("paused", _paused);
      updateState("tokenName", _name);
      updateState("tokenSymbol", _symbol);
      updateState("balance", ethers.utils.formatUnits(_balance, 18));
    } catch (err) {
      console.error("Wallet connection error:", err);
      alert(`Error: ${err.message || "Failed to connect wallet."}`);
    }
  };

  const mintTokens = async () => {
    if (!appState.contract) return;

    try {
      const amount = ethers.utils.parseUnits(mintAmount.toString(), 18);
      const tx = await appState.contract.mint(appState.account, amount);
      await tx.wait();
      alert("Minted successfully!");
    } catch (error) {
      console.error("Minting failed:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const transferTokens = async () => {
    if (!appState.contract || !recipient) {
      return alert("Please enter a valid recipient address.");
    }

    try {
      const amount = ethers.utils.parseUnits(transferAmount.toString(), 18);
      const tx = await appState.contract.transfer(recipient, amount);
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const toggleContractPause = async (pause) => {
    if (!appState.contract) return;

    try {
      const tx = pause ? await appState.contract.pause() : await appState.contract.unpause();
      await tx.wait();
      updateState("paused", pause);
      alert(`Contract ${pause ? "paused" : "unpaused"} successfully.`);
    } catch (error) {
      console.error("Contract pause/unpause failed:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 font-[Playfair Display]">
      {!appState.account ? (
        <div className="flex flex-col items-center justify-center text-white space-y-6">
          <Logo />
          <h1 className="text-4xl font-bold text-center">Welcome to MyToken DApp</h1>
          <p className="text-center max-w-md text-gray-400">
            Mint, transfer, and manage tokens securely.
          </p>
          <button
            onClick={connectWallet}
            className="bg-[#d4af37] hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white">
          <h1 className="text-3xl font-bold text-center mb-6">MyToken DApp</h1>
          <div className="space-y-2 text-sm">
            <p><span className="text-[#d4af37] font-semibold">Account:</span> {appState.account}</p>
            <p><span className="text-[#d4af37] font-semibold">Paused:</span> {appState.paused ? "Yes" : "No"}</p>
            <p><span className="text-[#d4af37] font-semibold">Token Name:</span> {appState.tokenName}</p>
            <p><span className="text-[#d4af37] font-semibold">Token Symbol:</span> {appState.tokenSymbol}</p>
            <p><span className="text-[#d4af37] font-semibold">Balance:</span> {appState.balance}</p>
          </div>

          <input type="number" placeholder="Amount to Mint" className="w-full mt-4 mb-3 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
          <button onClick={mintTokens} className="w-full mb-3 bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-lg">
            Mint Tokens
          </button>

          {appState.paused ? (
            <button onClick={() => toggleContractPause(false)} className="w-full mb-3 bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg">
              Unpause Contract
            </button>
          ) : (
            <button onClick={() => toggleContractPause(true)} className="w-full mb-3 bg-red-700 hover:bg-red-600 text-white py-2 rounded-lg">
              Pause Contract
            </button>
          )}

          <input type="text" placeholder="Recipient Address" className="w-full mb-2 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            value={recipient} onChange={(e) => setRecipient(e.target.value)} />
          <input type="number" placeholder="Amount to Transfer" className="w-full mb-4 p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
          <button onClick={transferTokens} className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-lg">
            Transfer Tokens
          </button>
        </div>
      )}
    </div>
  );
}

export default App;