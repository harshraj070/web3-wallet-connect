const { ethers, formatEther } = require("ethers");

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/f56a222e5a9a41c898b822bce7133378"
);

const queryBlockchain = async () => {
  const block = await provider.getBlockNumber();
  console.log("Block Number:", block);

  const balance = await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  console.log("Raw Balance (BN):", balance);

  const balanceEther = formatEther(balance); // ✅ Use `formatEther` directly
  console.log("Account Balance in Ether:", balanceEther);

  console.log("Balance in Wei:", balance.toString());
};

queryBlockchain();


