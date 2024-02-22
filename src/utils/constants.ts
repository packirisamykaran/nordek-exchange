export interface OptionType {
  value: string;
  label: string;
}

const solanaTokenOptions: OptionType[] = [
  { value: "SOL", label: "SOL" },
  { value: "USDC", label: "USDC" },
  { value: "JUP", label: "JUP" },
  { value: "mSOL", label: "mSOL" },
  { value: "WEN", label: "WEN" },
];

const ethereumTokenOptions: OptionType[] = [
  { value: "ETH", label: "ETH" },
  { value: "MATIC", label: "MATIC" },
  { value: "LINK", label: "LINK" },
  { value: "LTC", label: "LTC" },
  { value: "BNB", label: "BNB" },
];

export { solanaTokenOptions, ethereumTokenOptions };
