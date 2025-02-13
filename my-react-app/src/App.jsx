import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null); // Store contract instance

  const walletAddress = "0x7ef30d3bf390f8ea529a58179804015aa22f241a";
  const walletAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_num",
          "type": "uint256"
        }
      ],
      "name": "setValue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  async function connectMetaMask() {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const signer = await provider.getSigner();
      setSigner(signer);

      const walletContract = new ethers.Contract(walletAddress, walletAbi, signer);
      setContract(walletContract);
    } catch (error) {
      console.error("MetaMask connection failed:", error);
    }
  }

  async function setValue(num) {
    if (!contract) {
      alert("Connect MetaMask first!");
      return;
    }

    try {
      const tx = await contract.setValue(num);
      console.log("Transaction sent! Hash:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!");
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  return (
    <div>
      <button onClick={connectMetaMask}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>
      <button onClick={() => setValue(42)}>Set Value to 42</button>
    </div>
  );
}

export default App;
