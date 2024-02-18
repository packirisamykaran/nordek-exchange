import React, { useState } from 'react';
import Wallets from './components/Wallet';
import { ReactComponent as Logo } from './assets/logo1.svg';
import { ReactComponent as Swap } from './assets/swap icon.svg';
import './app.css';

import Select from 'react-select';
import { SingleValue } from 'react-select';



interface OptionType {
  label: string;
  value: string;
}

const chainOptions: OptionType[] = [
  { value: 'Solana', label: 'Solana' },
  { value: 'Ethereum', label: 'Ethereum' }
];


const tokenOptions: OptionType[] = [
  { value: 'SOL', label: 'SOL' },
  { value: 'USDC', label: 'USDC' },
  { value: 'USDT', label: 'USDT' },
  { value: 'BTC', label: 'BTC' },
  { value: 'ETH', label: 'ETH' },
];


function App() {
  // States
  // Current chain user is on
  const [chain, setChain] = useState(chainOptions[0]);

  // Tokens
  const [sendToken, setSendToken] = useState(tokenOptions[0]);
  const [receiveToken, setReceiveToken] = useState(tokenOptions[1]);



  // Amounts
  const [sendAmount, setSendAmount] = useState("0.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");


  // Animation
  const [switchToken, setSwitchToken] = useState(false);


  // Chain change handler
  const handleChainChange = (option: SingleValue<OptionType>) => {
    setChain(option as OptionType);
  };

  // Token change handler
  const sendTokenChange = (option: SingleValue<OptionType>) => {
    setSendToken(option as OptionType);
  };

  const receiveTokenChange = (option: SingleValue<OptionType>) => {

    setReceiveToken(option as OptionType);
  };

  // Token Amount change handler
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {



      if (event.target.name === "send-amount") {
        setSendAmount(value);

      } else if (event.target.name === "receive-amount") {
        setReceiveAmount(value);
      }

    }
  };



  // Switch token
  const switchTokenChange = () => {
    setSwitchToken(!switchToken);
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
  };




  return (
    <div className="app">
      <div className="navbar">
        <Logo className='logo' />

        <Wallets chain={chain.value} />
      </div>


      <div className="main-section">
        {/* <select value={chain} className='select-chain' onChange={handleChainChange}>
          <option value="Solana">Solana</option>
          <option value="Ethereum">Ethereum</option>
        </select> */}

        <Select
          className='select-chain select'
          value={chain}
          onChange={handleChainChange}
          options={chainOptions}
        />



        <div className="swap-section">
          <div className="input-group">
            <Select name="send-token" className='send-token select' onChange={sendTokenChange} value={sendToken} options={tokenOptions} />
            <input type="text" name="send-amount" className='send-amount' onChange={handleAmountChange} value={sendAmount} placeholder='0.00' />
          </div>
          <Swap className={`swap-icon ${switchToken ? 'swap-icon-spin' : ''}`} onClick={switchTokenChange} />
          <div className="input-group">
            <Select name="receive-token" className='receive-token select' onChange={receiveTokenChange} value={receiveToken} options={tokenOptions} />
            <input type="text" name="receive-amount" className='receive-amount' onChange={handleAmountChange} value={receiveAmount} placeholder='0.00' />
          </div>
        </div>


        <button>
          <span>
            Swap
          </span>
        </button>

      </div>

    </div>
  );
}

export default App;
