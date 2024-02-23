import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


interface WalletsProps {
  chain: string;
}

export default function Wallets({ chain }: WalletsProps) {


  return (
    <div className="wallets">
      {chain === "Solana" ? <WalletMultiButton className='wallet-button' /> : <w3m-button />}
    </div>
  );
}
