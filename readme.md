# ChainRun

**ChainRun** is a universal CLI tool to interact with smart contracts on any EVM-compatible chain — without writing code or using a frontend.

---

## 🚀 Features

- 🧠 Call any smart contract method
- 🔗 Works with any EVM RPC (Ethereum, Polygon, BSC, etc.)
- 🧾 Accepts local `.json` ABI files or auto-fetches from Etherscan
- 🔐 Optional private key support for sending transactions
- ⛽ Gas estimation with `--estimate` flag
- 🌍 No setup required — fully portable

---

## 📦 Usage

### Call `name()` on USDC via Infura

```bash
node chainrun.js \
  --rpc https://mainnet.infura.io/v3/YOUR_KEY \
  --contract 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 \
  --abi ./usdc.json \
  --method name
