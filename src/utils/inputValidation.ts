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
