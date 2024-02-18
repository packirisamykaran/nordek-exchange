import React from 'react';
import { useState } from 'react';
import Wallets from './components/Wallet';


function App() {



  // States
  const [chain, useChain] = useState<"Solana" | "Ethereum">("Solana");





  return (
    <div className="app">

      <Wallets chain={chain} />


    </div>
  );
}

export default App;
