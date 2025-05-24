# ChainRun

**ChainRun** is a universal, zero-setup command-line tool that lets you interact with any smart contract on any EVM-compatible blockchain — directly from your terminal.

Whether you're reading token data, estimating gas, or sending on-chain transactions, ChainRun is built to get it done fast.

---

## 🚀 Key Features

- ⚡️ Call any smart contract method (read/write)
- 🌐 Compatible with all EVM chains (Ethereum, Polygon, BNB, Arbitrum, etc.)
- 📦 Load ABI from `.json` or auto-fetch from Etherscan with your API key
- 🔐 Supports private key signing for sending transactions
- ⛽ Estimate gas before committing with `--estimate`
- 🧠 No coding required — just one CLI command

---

## 📦 Usage Examples

### 🧠 Read a value (token name from USDC)

```bash
node chainrun.js \
  --rpc https://mainnet.infura.io/v3/YOUR_KEY \
  --contract 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 \
  --abi ./usdc.json \
  --method name
```

---

### 🔍 Use Etherscan ABI (no local file)

```bash
node chainrun.js \
  --rpc https://mainnet.infura.io/v3/YOUR_KEY \
  --contract 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 \
  --abi YOUR_ETHERSCAN_API_KEY \
  --method symbol
```

> 🔐 Get your free Etherscan key: https://etherscan.io/myapikey

---

### 📟 Send a transaction (e.g., transfer)

```bash
node chainrun.js \
  --rpc https://sepolia.infura.io/v3/YOUR_KEY \
  --contract 0xYourContractAddress \
  --abi ./mycontract.json \
  --method transfer \
  --args 0xRecipientAddress 1000000000000000000 \
  --pk 0xYourPrivateKey
```

> 💡 Add `--estimate` to preview gas usage before sending.

---

## 🛠️ Install Globally (Optional)

```bash
npm install -g
chainrun --help
```

---
