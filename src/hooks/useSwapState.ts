import { useState } from "react";
import { solanaTokenOptions } from "../utils/constants";

const useSwapState = () => {
  // Tokens
  const [sendToken, setSendToken] = useState(solanaTokenOptions[0]);
  const [receiveToken, setReceiveToken] = useState(solanaTokenOptions[1]);

  // Amounts
  const [sendAmount, setSendAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");

  // Price
  const [price, setPrice] = useState(0);
  const [USDvalue, setUSDvalue] = useState(0);

  return {
    sendToken,
    setSendToken,
    receiveToken,
    setReceiveToken,
    sendAmount,
    setSendAmount,
    receiveAmount,
    setReceiveAmount,
    price,
    setPrice,
    USDvalue,
    setUSDvalue,
  };
};

export default useSwapState;
