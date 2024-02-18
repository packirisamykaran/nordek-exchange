import React, { useState } from 'react';
import Wallets from './components/Wallet';
import { ReactComponent as Logo } from './assets/logo1.svg';
import './app.css';

function App() {
  // States
  // Current chain user is on
  const [chain, setChain] = useState<"Solana" | "Ethereum">("Solana");

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChain(event.target.value as "Solana" | "Ethereum");
  };

  return (
    <div className="app">
      <div className="navbar">
        <Logo className='logo' />

        <Wallets chain={chain} />
      </div>


      <select value={chain} onChange={handleChainChange}>
        <option value="Solana">Solana</option>
        <option value="Ethereum">Ethereum</option>
      </select>

    </div>
  );
}

export default App;
