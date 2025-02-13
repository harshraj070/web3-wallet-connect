const {ethers, formatEther} = require("ethers");
require("dotenv").config();
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);


const walletAddress="0x7ef30d3bf390f8ea529a58179804015aa22f241a";
const walletAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
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
]

const contractInteraction = async()=>{
    const walletContract= new ethers.Contract(walletAddress, walletAbi, provider);

    const contractName = await walletContract.name();
    console.log("Contract name:", contractName);

    const num = await walletContract.getValue();
    console.log("the value is: ", num);

	const contractBalance = await walletContract.accountBalance("0x5a6355b1b2590a6f6747da676748b322cd494801");
	const balanceEther = await ethers.formatEther(contractBalance);
	console.log(balanceEther);

	const userBalance = await walletContract.accountBalance("0x3fe210488045FaD3123bd640acF9CebB534d0dCe");
	console.log(userBalance);
}
contractInteraction();


