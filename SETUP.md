# KashPilot Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup Environment
\`\`\`bash
cp .env.example .env
\`\`\`

### 3. Generate Wallet
\`\`\`bash
node scripts/generate-wallet.js
\`\`\`

Copy the output to `.env`:
\`\`\`
AGENT_PRIVATE_KEY=0xYourPrivateKey
AGENT_WALLET_ADDRESS=0xYourAddress
\`\`\`

### 4. Get Testnet Tokens
Visit: https://faucet.celo.org/alfajores
Enter your wallet address

### 5. Add OpenAI Key
Get key from: https://platform.openai.com/api-keys

Add to `.env`:
\`\`\`
OPENAI_API_KEY=sk-your-key-here
\`\`\`

### 6. Run the App
\`\`\`bash
# Terminal 1: Web app
npm run dev

# Terminal 2: Agent
npm run agent
\`\`\`

Open http://localhost:3000

## Setup Complete

The autonomous AI agent should now be running.

## Troubleshooting

**Wallet Generation Issues**
- Ensure Node.js 18+ is installed
- Run: `npm install ethers`

**Agent Not Executing**
- Verify agent is started in the UI
- Confirm AGENT_PRIVATE_KEY in .env is correct
- Verify wallet has CELO balance

**OpenAI API Errors**
- Verify API key is correct
- Check API key has credits available
- Check for typos in .env

**Missing Transactions**
- Agent runs on a 3-minute cron interval
- Wait for first execution cycle
- Review agent logs in UI

## Need Help?

Check the main README.md for detailed documentation.
