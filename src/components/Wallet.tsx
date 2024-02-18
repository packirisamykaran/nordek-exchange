import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


interface WalletsProps {
  chain: "Solana" | "Ethereum";
}

export default function Wallets({ chain }: WalletsProps) {





  return (
    <div className="wallets">
      {chain === "Solana" ? <WalletMultiButton /> : null}
    </div>
  );
}
