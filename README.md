# Nordek Exchange

## To Start the App

- `npm install`
- `npm start`

## Project Highlights

- **Multi-chain Functionality**: Implemented simple chain Select components to switch to different chains ( Solana, Ethereum)
- **Wallet Integration**: Integrated wallet adapters for both Solana and Ethereum with @solana/web3.js, @solana/wallet-adapter, @web3modal/ethers
- **Token Support**: Have add 5 tokens from each chain
- **Token price**: Leveraged api from Jupier exchange and CryptoCompare
- **Website assets**: Add favicon & logos
- **Notification**: Used react-toastify for Errors and Success messages
- **Dropdown**: Select-react component for dropdown inputs
- **Input validation**: Enforced onChange & onBlur validation the token quantity inputs

### Environment Setup

Create a .env file in the root directory of your project
REACT_APP_CRYPTO_COMPARE_API_KEY = CryptoCompare Api key requried (https://www.cryptocompare.com/)
