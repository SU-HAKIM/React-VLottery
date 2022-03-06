const contract_address = "0xd73dfC6f89813925822fcD7F36d989Db27D26E41";
const abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        inputs: [],
        name: "enter",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "getBalance",
        outputs: [{ internalType: "uint256", name: "_balance", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getPlayers",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getRandomNumber",
        outputs: [
            { internalType: "uint256", name: "_randomNunber", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
        name: "getWinnerByLotteryId",
        outputs: [
            { internalType: "address payable", name: "_winner", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "lotteryHistory",
        outputs: [{ internalType: "address payable", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "lotteryId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pickWinner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "players",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
];

const getContract = (web3) => {
    return new web3.eth.Contract(abi, contract_address);
};

export default getContract;
