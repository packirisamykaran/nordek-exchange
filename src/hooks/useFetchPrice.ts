import { toast } from "react-toastify";
import { useEffect } from "react";
import { OptionType } from "../utils/types";

interface fetchPriceParams {
  chain: OptionType;
  sendToken: any;
  setPrice: (price: any) => void;
  sendAmount: any;
  setReceiveAmount: { (amount: any): void };
  setUSDvalue: { (value: any): void };
  receiveToken: any;
}

const useFetchPrice = ({
  chain,
  sendToken,
  setPrice,
  sendAmount,
  setReceiveAmount,
  setUSDvalue,
  receiveToken,
}: fetchPriceParams) => {
  // Fetch price
  const fetchSolanaData = async () => {
    try {
      // Swap pricing
      const url = `https://price.jup.ag/v4/price?ids=${sendToken.value}&vsToken=${receiveToken.value}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.data[sendToken.value].price) {
        setPrice(data.data[sendToken.value].price);

        setReceiveAmount(
          (
            parseFloat(sendAmount) * data.data[sendToken.value].price
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6,
          })
        );

        let usdValueResponse = await fetch(
          `https://price.jup.ag/v4/price?ids=${sendToken.value}&vsToken=USDC`
        );
        let usdValueData = await usdValueResponse.json();
        setUSDvalue(usdValueData.data[sendToken.value].price.toFixed(2));
      }
    } catch (error) {
      console.log(error);

      toast.error("Error fetching Solana Token price");
    }
  };

  const fetchEthereumData = async () => {
    try {
      const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sendToken.value}&tsyms=${receiveToken.value}&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data[sendToken.value][receiveToken.value]) {
        setPrice(data[sendToken.value][receiveToken.value]);
        setReceiveAmount(
          (
            parseFloat(sendAmount) * data[sendToken.value][receiveToken.value]
          ).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6,
          })
        );

        let usdValueResponse = await fetch(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sendToken.value}&tsyms=USD&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`
        );
        let usdValueData = await usdValueResponse.json();
        setUSDvalue(usdValueData[sendToken.value].USD.toFixed(2));
      }
    } catch (error) {
      toast.error("Error fetching Ethereum Token price");
    }
  };

  // Fetch price on token change
  useEffect(() => {
    const fetchPrice = async () => {
      if (chain.value === "Solana") {
        await fetchSolanaData();
      } else if (chain.value === "Ethereum") {
        await fetchEthereumData();
      }
    };

    fetchPrice();
  }, [sendToken, receiveToken]);
};

export default useFetchPrice;
