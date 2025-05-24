#!/usr/bin/env node

const fs = require('fs');
const axios = require('axios');
const { ethers } = require('ethers');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --rpc <url> --contract <address> --abi <path or api-key> --method <name> [--args <values...>] [--pk <key>]')
  .option('rpc', { type: 'string', describe: 'RPC URL (default: Cloudflare ETH)', default: 'https://cloudflare-eth.com' })
  .option('contract', { type: 'string', demandOption: true, describe: 'Contract address' })
  .option('abi', { type: 'string', demandOption: true, describe: 'ABI file path or Etherscan API key' })
  .option('method', { type: 'string', demandOption: true, describe: 'Contract method to call' })
  .option('args', { type: 'array', default: [], describe: 'Arguments for the method' })
  .option('pk', { type: 'string', describe: 'Private key for sending transactions' })
  .option('estimate', { type: 'boolean', default: false, describe: 'Estimate gas only' })
  .help()
  .argv;

function parseArg(arg) {
  if (arg === 'true') return true;
  if (arg === 'false') return false;
  if (!isNaN(arg)) return arg.includes('.') ? parseFloat(arg) : BigInt(arg);
  return arg;
}

(async () => {
  try {
    const args = argv.args.map(parseArg);
    const provider = new ethers.JsonRpcProvider(argv.rpc);

    let abi;

    if (argv.abi.endsWith('.json')) {
      abi = JSON.parse(fs.readFileSync(argv.abi));
    } else {
      console.log('🔍 Fetching ABI from Etherscan...');
      const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${argv.contract}&apikey=${argv.abi}`;
      const res = await axios.get(url);

      if (res.data.status !== '1' || !res.data.result) {
        throw new Error(`Failed to fetch ABI from Etherscan: ${res.data.message || 'Unknown error'}`);
      }

      try {
        abi = JSON.parse(res.data.result);
      } catch (e) {
        throw new Error('ABI response could not be parsed — possibly malformed JSON');
      }
    }

    const contract = new ethers.Contract(argv.contract, abi, provider);

    if (typeof contract[argv.method] !== 'function') {
      const methodNames = Object.keys(contract.interface.functions);
      throw new Error(`Method '${argv.method}' not found. Available methods: ${methodNames.join(', ')}`);
    }

    if (argv.pk) {
      const signer = new ethers.Wallet(argv.pk, provider);
      const txContract = contract.connect(signer);

      if (argv.estimate) {
        const gas = await txContract[argv.method].estimateGas(...args);
        return console.log(`⛽ Gas estimate: ${gas.toString()}`);
      }

      const tx = await txContract[argv.method](...args);
      console.log(`🚀 TX sent: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`✅ TX confirmed in block ${receipt.blockNumber}`);
    } else {
      const result = await contract[argv.method](...args);
      console.log('📦 Result:', result);
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
