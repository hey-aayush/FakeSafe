import { GOI, Manufacturer, Seller, Customer } from './components'
import './App.css'
import contractJSON from "../../smart_contract/build/contracts/FakeProductDetection.json"
import { ethers } from 'ethers'
import React, { useState } from 'react'

const App = () => {

  // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
  let contractAddress = '0x5E43A4933B1E84D96D7E1CC2b0D6Da668357852C';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [sellerList, setSellerList] = useState([]);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log("Connecting ... ")

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          // console.log("Connected")
          // console.log(result)
          setConnButtonText('Wallet Connected');
          accountChangedHandler(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);

        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  }

  const updateEthers = () => {
    // console.log("51");
    // console.log(contractJSON['abi']);
    // console.log(window.ethereum);

    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(tempProvider);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, contractJSON['abi'], tempSigner);
    setContract(tempContract);
    console.log(tempContract);
  }

  const getSellerList = async () => {
    let _SellerList = await contract.viewAllSeller();
    setSellerList(_SellerList)
    console.log(_SellerList);
  }

  return (
    <div className="App">
      <button onClick={connectWallet}>{connButtonText}</button>

      <GOI contract={contract} />

      <Manufacturer contract={contract} account={defaultAccount} />

      {/* <Seller /> */}

      {/* <Customer /> */}

    </div>
  )
}

export default App
