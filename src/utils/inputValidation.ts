import { PublicKey } from "@solana/web3.js";
import { OptionType } from "./types";
import { toast } from "react-toastify";

interface SwapValidation {
  sendAmount: any;
  receiveAmount: any;
  sendToken: OptionType;
  receiveToken: OptionType;
  publicKey: PublicKey | null;
  isConnected: boolean;
  chain: OptionType;
}

export function swapValidation({
  sendAmount,
  receiveAmount,
  sendToken,
  receiveToken,
  publicKey,
  isConnected,
  chain,
}: SwapValidation) {
  // Swap value validation
  if (
    sendAmount === "" ||
    receiveAmount === "" ||
    parseFloat(sendAmount) === 0 ||
    parseFloat(receiveAmount) === 0
  ) {
    toast.error("Enter Token Amount to Swap");
    return false;
  }

  // Same token validation
  if (sendToken.value === receiveToken.value) {
    toast.error("Cannot Swap Same Token");
    return false;
  }

  // Wallet connected validation
  if (
    (chain.value === "Ethereum" && !isConnected) ||
    (chain.value === "Solana" && !publicKey)
  ) {
    toast.error("Connect Wallet to Swap");
    return false;
  }

  return true;
}

interface AmountChangeValidation {
  event: React.ChangeEvent<HTMLInputElement>;
  setSendAmount: { (amount: any): void };
  setReceiveAmount: { (amount: any): void };
  price: any;
}

export function amountChangeValidation({
  event,
  setSendAmount,
  setReceiveAmount,
  price,
}: AmountChangeValidation) {
  let value = event.target.value;

  if (value === "") {
    setSendAmount("");
    setReceiveAmount("");
    return;
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
      setReceiveAmount(
        (parseFloat(value) * price).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        })
      );
    } else if (event.target.name === "receive-amount") {
      setReceiveAmount(value);
      setSendAmount(
        (parseFloat(value) / price).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 6,
        })
      );
    }
  }
}
