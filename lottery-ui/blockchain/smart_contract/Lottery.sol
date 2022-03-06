//SPDX-License-Identifier:UNLISENCED

pragma solidity 0.8.11;

contract Lottery{
    //Variables
    address public owner;
    address[] public players;
    uint public lotteryId;
    mapping(uint => address payable) public lotteryHistory; 

    constructor(){
        owner=msg.sender;
        lotteryId=1;
    }

    modifier onlyByOwner(){
        require(msg.sender==owner,"Only owner can call this function.");
        _;
    }

    function getBalance() public view returns(uint _balance){
        return address(this).balance;
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function getWinnerByLotteryId(uint _id) public view returns(address payable _winner){
        return lotteryHistory[_id];
    }


    function enter() public payable{
        require(msg.value > 10000 wei,"You have to pay al least 10000 wei to enter Lottery." );
        //address of players
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns(uint _randomNunber){
        return uint(keccak256(abi.encodePacked(owner,block.timestamp)));
    }

    function pickWinner() public onlyByOwner{
        require(players.length > 3,"At least there should be 3 players.");
        uint index=getRandomNumber() % players.length;
        payable(players[index]).transfer(address(this).balance);

        lotteryHistory[lotteryId]=payable(players[index]);
        lotteryId++;

        //reset the players array
        players=new address payable [](0);
    }


}