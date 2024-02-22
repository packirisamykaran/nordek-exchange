import React, { useState, useEffect } from 'react';

import Select from 'react-select';


import { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { ReactComponent as SwapSVG } from '../assets/swap icon.svg';
import { OptionType } from '../utils/types';
import { solanaTokenOptions, ethereumTokenOptions } from '../utils/constants';


interface SwapProps {

  chain: OptionType;
  chainOptions: { value: string, label: string }[];
  handleChainChange: (option: SingleValue<OptionType>) => void;

}

export default function Swap({ chain, chainOptions, handleChainChange }: SwapProps) {



  // Tokens
  const [sendToken, setSendToken] = useState(solanaTokenOptions[0]);
  const [receiveToken, setReceiveToken] = useState(solanaTokenOptions[1]);

  // Price
  const [price, setPrice] = useState(0);
  const [USDvalue, setUSDvalue] = useState(0);


  // Amounts
  const [sendAmount, setSendAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");


  // Animation
  const [switchToken, setSwitchToken] = useState(false);


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

    if (value === "") {
      setSendAmount("");
      setReceiveAmount("");
      return
    }
    if (value === ".") {
      value = "0.";

    }
    if (value === "00") {
      value = "0";
    }


    if (/^[0-9]*\.?[0-9]*$/.test(value)) {

      if (event.target.name === "send-amount") {
        setSendAmount(value);
        setReceiveAmount((parseFloat(value) * price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));


      } else if (event.target.name === "receive-amount") {
        setReceiveAmount(value);
        setSendAmount((parseFloat(value) / price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));
      }

    }
  };


  // input onblur validation
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Remove leading zeros, unnecessary trailing zeros, and trailing dot
    let formattedValue = value.replace(/^0+/, ''); // Remove leading zeros
    if (formattedValue.includes('.')) {

      if (formattedValue === ".") {
        formattedValue = "0";
      }

      formattedValue = parseFloat(formattedValue).toString();
    }

    if (formattedValue === "") {
      setSendAmount("");
      setReceiveAmount("");
      return
    }

    if (event.target.name === "send-amount") {
      setSendAmount(formattedValue);

    } else if (event.target.name === "receive-amount") {
      setReceiveAmount(formattedValue);

    }
  }





  // Switch token
  const switchTokenChange = () => {
    setSwitchToken(!switchToken);
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
  };



  // Fetch price
  const fetchSolanaData = async () => {

    try {
      // Swap pricing
      const url = `https://price.jup.ag/v4/price?ids=${sendToken.value}&vsToken=${receiveToken.value}`;
      const response = await fetch(url);
      const data = await response.json();


      if (data && data.data[sendToken.value].price) {
        setPrice(data.data[sendToken.value].price);

        setReceiveAmount((parseFloat(sendAmount) * data.data[sendToken.value].price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));

        let usdValueResponse = await fetch(`https://price.jup.ag/v4/price?ids=${sendToken.value}&vsToken=USDC`);
        let usdValueData = await usdValueResponse.json();
        setUSDvalue(usdValueData.data[sendToken.value].price.toFixed(2));

      }
    } catch (error) {
      console.log(error)

      toast.error('Error fetching Solana Token price');
    }
  }

  const fetchEthereumData = async () => {
    try {
      const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sendToken.value}&tsyms=${receiveToken.value}&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data[sendToken.value][receiveToken.value]) {
        setPrice(data[sendToken.value][receiveToken.value]);
        setReceiveAmount((parseFloat(sendAmount) * data[sendToken.value][receiveToken.value]).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 }));

        let usdValueResponse = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sendToken.value}&tsyms=USD&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`);
        let usdValueData = await usdValueResponse.json();
        setUSDvalue(usdValueData[sendToken.value].USD.toFixed(2));


      }
    }
    catch (error) {
      toast.error('Error fetching Ethereum Token price');
    }
  }

  // Fetch price on token change
  useEffect(() => {
    const fetchPrice = async () => {

      if (chain.value === "Solana") {
        await fetchSolanaData();

      }

      else if (chain.value === "Ethereum") {

        await fetchEthereumData();

      }
    };


    fetchPrice();
  }, [sendToken, receiveToken]);



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




  // Swap Function
  const swap = async () => {

    // Swap value validation
    if (sendAmount === "" || receiveAmount === "" || parseFloat(sendAmount) === 0 || parseFloat(receiveAmount) === 0) {
      toast.error('Enter Token Amount to Swap');
      return;
    }

    // Same token validation
    if (sendToken.value === receiveToken.value) {
      toast.error('Cannot Swap Same Token');
      return;
    }


    // Success message
    toast.success('Swap Successful');

  }








  return (
    <div className="main-section" >

      <Select
        className='select-chain select'
        value={chain}
        onChange={handleChainChange}
        options={chainOptions}
        styles={{
          singleValue: (provided) => ({
            ...provided,
            color: 'white',
          }),
          option: (provided) => ({
            ...provided,
            color: 'white',
          }),
        }}
      />



      <div className="swap-section">
        <div className="input-group">
          <Select styles={{
            singleValue: (provided) => ({
              ...provided,
              color: 'white',
            }),
            option: (provided) => ({
              ...provided,
              color: 'white',
            }),
          }} name="send-token" className='send-token select' onChange={sendTokenChange} value={sendToken} options={chain.value === "Solana" ? solanaTokenOptions : ethereumTokenOptions} />
          <input type="text" name="send-amount" className='send-amount' onChange={handleAmountChange} value={sendAmount} placeholder='0.00' onBlur={handleBlur} />
        </div>
        <SwapSVG className={`swap-icon ${switchToken ? 'swap-icon-spin' : ''}`} onClick={switchTokenChange} />
        <div className="input-group">
          <Select styles={{
            singleValue: (provided) => ({
              ...provided,
              color: 'white',
            }),
            option: (provided) => ({
              ...provided,
              color: 'white',
            }),
          }} name="receive-token" className='receive-token select' onChange={receiveTokenChange} value={receiveToken} options={chain.value === "Solana" ? solanaTokenOptions : ethereumTokenOptions} />
          <input type="text" name="receive-amount" className='receive-amount' onChange={handleAmountChange} value={receiveAmount} placeholder='0.00' onBlur={handleBlur} />
        </div>
        <div className="usd-value">
          {`$${sendAmount ? (USDvalue * parseFloat(sendAmount)).toFixed(2) : "0"} USD`}
        </div>
      </div>


      <button onClick={swap} >
        <span>
          Swap
        </span>
      </button>

    </div>
  )
}
