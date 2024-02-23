import React, { useState, useEffect } from 'react';
import Wallets from './components/Wallet';
import { ReactComponent as Logo } from './assets/logo1.svg';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { OptionType } from './utils/types';

import { SingleValue } from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import Swap from './components/Swap';







const chainOptions: OptionType[] = [
  { value: 'Solana', label: 'Solana' },
  { value: 'Ethereum', label: 'Ethereum' }
];



function App() {
  // States
  // Current chain user is on
  const [chain, setChain] = useState(chainOptions[0]);

  // Chain change handler
  const handleChainChange = (option: SingleValue<OptionType>) => {
    setChain(option as OptionType);
  };


  return (
    <div className="app">

      <ToastContainer />
      <div className="navbar">
        <Logo className='logo' />
        <Wallets chain={chain.value} />
      </div>
      <Swap
        chain={chain}
        chainOptions={chainOptions}
        handleChainChange={handleChainChange}
      />
    </div>
  );
}

export default App;
