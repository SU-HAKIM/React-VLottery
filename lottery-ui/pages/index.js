import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import getContract from '../blockchain/lottery';

const App = () => {
  const [error, setError] = useState('')
  const [web3, setWeb3] = useState(
    null
  );
  const [accounts, setAccounts] = useState(
    ''
  );
  const [contract, setContract] = useState(
    null
  );
  const [potBalance, setPotBalance] = useState(0)
  const [players, setPlayers] = useState([])
  useEffect(() => {
    if (contract) getPotBalance();
    if (contract) getPlayers();
  }, [contract, potBalance, players])
  const getPotBalance = async () => {
    try {
      const pot = await contract.methods.getBalance().call();
      setPotBalance(pot);
    } catch (error) {
      setError(error.message);
    }
  }
  const getPlayers = async () => {
    try {
      const players = await contract.methods.getPlayers().call();
      setPlayers(players);
    } catch (error) {
      setError(error.message);
    }
  }
  const connectWallet = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        //request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts[0])
        let contract = getContract(web3);
        setContract(contract);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please install MetaMask.")
    }
  }
  return (
    <>
      <header className='bg-dark'>
        <div className='container py-3 d-flex justify-content-between align-items-center'>
          <div className='navbar-brand text-white'>DLottery</div>
          <div className='navbar-actions'>
            <button className='btn btn-primary text-white' onClick={connectWallet}>Connect Wallet</button>
          </div>
        </div>
      </header>
      {/* error handler */}
      {error && <div className='alert alert-danger'>{error}</div>}
      {/* error handler */}
      <main className='container'>
        <section className='mt-4'>
          <div className='row'>
            <div className='col-8 pt-3'>
              <section className='mb-3'>
                <p className='lead'>Enter Lottery by sending more than 10000 Wei.</p>
                <button className='btn btn-primary'>Play Now</button>
              </section>
              <section className='mb-3'>
                <p className='lead'>Only By Owner...</p>
                <button className='btn btn-primary'>Pick Winner</button>
              </section>
            </div>
            <div className="col-4 pt-3">
              <section className='mb-3'>
                <div className='card mb-1'>
                  <div className='card-header'>Lottery History</div>
                  <div className='card-body'>
                    <h6 className='card-title'>Round 1 Winner</h6>
                    <p className='card-text'>0xa2ea9c5f30D05f03D11A4d0F441A5636545a7f5F</p>
                  </div>
                </div>
                <div className='card mb-1'>
                  <div className='card-header'>Players</div>
                  {players.map((player, index) => {
                    return <div key={index} className='card-body'>
                      <h6 className='card-title'>Player {index + 1}</h6>
                      <p className='card-text'>{player}</p>
                    </div>
                  })}
                </div>
                <div className='card '>
                  <div className='card-header'>Pot Balance</div>
                  <div className='card-body'>
                    <p className='card-text'>{potBalance} Wei</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App