import React, { useState, useEffect } from 'react';
import Wallets from './components/Wallet';
import { ReactComponent as Logo } from './assets/logo1.svg';
import { ReactComponent as Swap } from './assets/swap icon.svg';
import './app.css';


import Select from 'react-select';
import { SingleValue } from 'react-select';
import send from 'send';
import { set } from 'lodash';



interface OptionType {
  label: string;
  value: string;
}

const chainOptions: OptionType[] = [
  { value: 'Solana', label: 'Solana' },
  { value: 'Ethereum', label: 'Ethereum' }
];


const solanaTokenOptions: OptionType[] = [
  { value: 'SOL', label: 'SOL' },
  { value: 'USDC', label: 'USDC' },
  { value: 'JUP', label: 'JUP' },
  { value: 'mSOL', label: 'mSOL' },
  { value: 'WEN', label: 'WEN' },
];


const ethereumTokenOptions: OptionType[] = [
  { value: 'ETH', label: 'ETH' },
  { value: 'MATIC', label: 'MATIC' },
  { value: 'LINK', label: 'LINK' },
  { value: 'LTC', label: 'LTC' },
  { value: 'BNB', label: 'BNB' },
];

function App() {
  // States
  // Current chain user is on
  const [chain, setChain] = useState(chainOptions[0]);


  useEffect(() => {

    if (chain.value === "Ethereum") {
      setSendToken(ethereumTokenOptions[0]);
      setReceiveToken(ethereumTokenOptions[1]);
    }
    else if (chain.value === "Solana") {
      setSendToken(solanaTokenOptions[0]);
      setReceiveToken(solanaTokenOptions[1]);
    }

  }
    , [chain]);


  // Tokens
  const [sendToken, setSendToken] = useState(solanaTokenOptions[0]);
  const [receiveToken, setReceiveToken] = useState(solanaTokenOptions[1]);

  // Price
  const [price, setPrice] = useState(0);



  // Amounts
  const [sendAmount, setSendAmount] = useState("1.00");
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
    let value = event.target.value;
    value = value.replace(/^0+/, '') || "0";
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {

      if (value === "") {
        value = "0";
      }


      if (event.target.name === "send-amount") {
        setSendAmount(value);
        setReceiveAmount((parseFloat(value) * price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));


      } else if (event.target.name === "receive-amount") {
        setReceiveAmount(value);
        setSendAmount((parseFloat(value) * price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));
      }

    }
  };



  // Switch token
  const switchTokenChange = () => {
    setSwitchToken(!switchToken);
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
  };



  // Fetch price
  useEffect(() => {
    const fetchPrice = async () => {


      if (chain.value === "Solana") {
        const url = `https://price.jup.ag/v4/price?ids=${sendToken.value}&vsToken=${receiveToken.value}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.data[sendToken.value].price) {
          setPrice(data.data[sendToken.value].price);

          setReceiveAmount((parseFloat(sendAmount) * data.data[sendToken.value].price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));


        }

      }
      else if (chain.value === "Ethereum") {


        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sendToken.value}&tsyms=${receiveToken.value}&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data && data[sendToken.value][receiveToken.value]) {
          setPrice(data[sendToken.value][receiveToken.value]);
          setReceiveAmount((parseFloat(sendAmount) * data[sendToken.value][receiveToken.value]).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));
        }
      }









    };

    fetchPrice();
  }, [sendToken, receiveToken, chain]);




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
            <Select name="send-token" className='send-token select' onChange={sendTokenChange} value={sendToken} options={chain.value === "Solana" ? solanaTokenOptions : ethereumTokenOptions} />
            <input type="text" name="send-amount" className='send-amount' onChange={handleAmountChange} value={sendAmount} placeholder='0.00' />
          </div>
          <Swap className={`swap-icon ${switchToken ? 'swap-icon-spin' : ''}`} onClick={switchTokenChange} />
          <div className="input-group">
            <Select name="receive-token" className='receive-token select' onChange={receiveTokenChange} value={receiveToken} options={chain.value === "Solana" ? solanaTokenOptions : ethereumTokenOptions} />
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
