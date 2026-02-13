# KashPilot - Getting Started Guide

This guide covers installation and configuration. Expected time: 10 minutes.

## Quick Start (3 Steps)

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Run setup wizard
npm run setup

# 3. Follow the prompts
\`\`\`

Then open two terminals:
\`\`\`bash
# Terminal 1
npm run dev

# Terminal 2
npm run agent
\`\`\`

Visit **http://localhost:3000**

---

## Detailed Setup

### [STEP 1] Installation

\`\`\`bash
# Clone the repository (if you haven't)
git clone https://github.com/yourusername/kashpilot.git
cd kashpilot

# Install dependencies
npm install

# Verify installation
npm run verify
\`\`\`

### [STEP 2] Environment Configuration

\`\`\`bash
# Copy environment template
cp .env.example .env

# Run setup wizard
npm run setup
\`\`\`

### [STEP 3] Generate Wallet

\`\`\`bash
# Generate a new Celo wallet
npm run wallet
\`\`\`

**[WARNING]** Save the output. You'll need:
- Private Key
- Wallet Address

Add these to your `.env` file:
\`\`\`env
AGENT_PRIVATE_KEY=0xYourPrivateKeyHere
AGENT_WALLET_ADDRESS=0xYourAddressHere
\`\`\`

### [STEP 4] Fund Your Wallet

1. Go to the Celo Alfajores faucet: https://faucet.celo.org/alfajores
2. Enter your wallet address (from step 3)
3. Request testnet CELO tokens
4. Wait for confirmation (~30 seconds)

### [STEP 5] Get OpenAI API Key

1. Visit: https://platform.openai.com/api-keys
2. Sign up / Log in
3. Create a new API key
4. Copy the key

Add to your `.env` file:
\`\`\`env
OPENAI_API_KEY=sk-YourKeyHere
\`\`\`

### [STEP 6] Verify Configuration

\`\`\`bash
# Check everything is configured
npm run setup
\`\`\`

[OK] All checks should pass with green checkmarks.

### [STEP 7] Launch KashPilot

Open two terminal windows:

**Terminal 1 - Web Application:**
\`\`\`bash
npm run dev
\`\`\`

**Terminal 2 - AI Agent:**
\`\`\`bash
npm run agent
\`\`\`

### [STEP 8] Access the App

Open your browser to:
- **Main App**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Agent Control**: http://localhost:3000/agent
- **Activity**: http://localhost:3000/activity

---

## First Time Using KashPilot

### 1. Connect Your Wallet

- Click "Connect Wallet" in the top right
- Agent wallet connects automatically

### 2. Go to Dashboard

- See your wallet balance
- View agent status
- Check reputation score

### 3. Launch the Agent

- Go to "Agent" page
- Click "Start Agent"
- Select a mode (start with "Autopilot")
- Monitor the thinking logs

### 4. Monitor Activity

- Go to "Activity" page
- View transactions as they happen
- Filter by type
- View on CeloScan

---

## Common Commands

\`\`\`bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run agent       # Start autonomous agent
npm run build       # Build for production
npm run setup       # Environment setup wizard
npm run verify      # Verify installation
npm run wallet      # Generate new wallet
\`\`\`

---

## Understanding the Interface

### Landing Page
- Hero section with project intro
- Feature highlights
- Call-to-action buttons

### Dashboard
- **Wallet Balance** - Your current CELO balance
- **Agent Status** - Active/Paused indicator
- **Total Transactions** - Number of transactions
- **Reputation Score** - On-chain reputation
- **Recent Activity** - Latest agent actions

### Agent Control Panel
- **Command Input** - Natural language commands
- **Start/Pause** - Control agent execution
- **Mode Selection** - Choose strategy
  - Autopilot: Balanced approach
  - Earn: Maximize activity
  - Save: Accumulate funds
  - Protection: Conservative mode
- **Thinking Logs** - Real-time AI decisions

### Activity Page
- Complete transaction history
- Filter by type
- Transaction details
- CeloScan links

---

## [INFO] Tips for Success

### 1. Start Small
- Begin with Autopilot mode
- Let agent run for 15-30 minutes
- Observe behavior before changing modes

### 2. Monitor Your Balance
- Check wallet balance regularly
- Fund with more testnet CELO if needed
- Agent pauses if balance is too low

### 3. Read the Logs
- Agent thinking logs show decision process
- Understand why agent takes actions
- Spot any issues early

### 4. Experiment with Modes
- Test different modes
- See how behavior changes
- Find what works for your goals

### 5. Check Transaction History
- Review all agent actions
- Verify transactions on CeloScan
- Track reputation growth

---

## Troubleshooting

### Agent Won't Start
**Problem:** Agent stays paused
**Solution:**
\`\`\`bash
# Check environment
npm run setup

# Verify wallet has balance
# Check OpenAI API key is valid
\`\`\`

### No Transactions Happening
**Problem:** Agent running but no activity
**Solution:**
- Wait for cron cycle (3 minutes)
- Check agent mode is set
- Verify wallet has CELO
- Check thinking logs for errors

### OpenAI Errors
**Problem:** API errors in logs
**Solution:**
- Verify API key is correct
- Check API key has credits
- Test key at platform.openai.com

### Build Fails
**Problem:** npm run build fails
**Solution:**
\`\`\`bash
rm -rf node_modules .next
npm install
npm run build
\`\`\`

### Port Already in Use
**Problem:** Port 3000 already in use
**Solution:**
\`\`\`bash
# Use different port
PORT=3001 npm run dev
\`\`\`

---

## Next Steps

### Learn More
- Read the full [README.md](README.md)
- Check [API Documentation](docs/API.md)
- Review [Smart Contracts](docs/CONTRACTS.md)

### Customize
- Modify agent behavior in `lib/ai/agent.ts`
- Adjust UI in `app/` directory
- Change cron schedule in `scripts/agent-runner.js`

### Deploy
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production
- Deploy to Vercel (recommended)
- Set up custom domain

### Contribute
- Fork the repository
- Make improvements
- Submit pull requests
- See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Getting Help

### Documentation
- **Main Guide**: [README.md](README.md)
- **Quick Reference**: [QUICKREF.md](QUICKREF.md)
- **API Docs**: [docs/API.md](docs/API.md)

### Support Channels
- **GitHub Issues**: Report bugs
- **GitHub Discussions**: Ask questions
- **Discord**: Join the community
- **Email**: hello@kashpilot.app

### Useful Links
- [Celo Faucet](https://faucet.celo.org/alfajores)
- [CeloScan Explorer](https://alfajores.celoscan.io)
- [OpenAI Platform](https://platform.openai.com)
- [Next.js Docs](https://nextjs.org/docs)

---

## Pre-Flight Checklist

Before you start, make sure:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] .env file created and configured
- [ ] Wallet generated
- [ ] Wallet funded with testnet CELO
- [ ] OpenAI API key added
- [ ] Installation verified (`npm run verify`)
- [ ] Dev server running (`npm run dev`)
- [ ] Agent running (`npm run agent`)
- [ ] Browser open at localhost:3000

---

## Setup Complete

Your KashPilot agent is now running and making autonomous decisions.

---

*Questions? Check the FAQ in README.md or reach out to the community.*
