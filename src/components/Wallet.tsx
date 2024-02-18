import React from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'


interface WalletsProps {
  chain: string;
}

export default function Wallets({ chain }: WalletsProps) {



  // Ethereum Wallet
  // 1. Get projectId at https://cloud.walletconnect.com
  const projectId = 'YOUR_PROJECT_ID'

  // 2. Set chains
  const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  }

  // 3. Create modal
  const metadata = {
    name: 'Nordek Exhanage',
    description: 'Nordek Exchange is a decentralized exchange for trading Ethereum and Solana tokens.',
    url: 'http://localhost:3000/', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
  }

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
  })




  return (
    <div className="wallets">
      {chain === "Solana" ? <WalletMultiButton /> : <w3m-button />}
    </div>
  );
}
