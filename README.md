# KashPilot

**Your money. On autopilot.**

KashPilot is an autonomous economic AI agent that transacts and earns for you on the Celo blockchain. Built with ERC-8004 agent identity and x402 payment protocol.

![KashPilot](https://img.shields.io/badge/blockchain-Celo-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![OpenAI](https://img.shields.io/badge/AI-OpenAI-blue)

## Features

### Blockchain & Agent Features
- **Agent Wallet** - Autonomous wallet on Celo Alfajores testnet
- **ERC-8004 Identity** - On-chain agent registration and reputation
- **x402 Payments** - Agent-to-agent payment protocol
- **Autonomous Transactions**
  - Send micro-payments
  - Auto-save funds
  - Recurring transfers
  - Agent-to-agent payments
- **Reputation System** - Build on-chain reputation through activity
- **Transaction History** - Complete audit trail of all agent actions

### AI Agent Features
- **OpenAI Integration** - GPT-4 powered decision making
- **Autonomous Actions** - Agent analyzes and acts independently
- **Multiple Modes**
  - **Autopilot** - Balanced autonomous strategy
  - **Earn** - Focus on building activity and earnings
  - **Save** - Prioritize accumulating funds
  - **Protection** - Conservative mode, minimal transactions
- **Activity Logs** - Real-time agent thinking and decision logs
- **Cron Scheduler** - Automatic execution every 3 minutes

### UI/UX Design
- **Ultra-minimal Apple/Stripe/OpenAI style design**
- **Clean white interface** with premium feel
- **Fully responsive** - Works on all devices
- **Fast and modern** - Built with Next.js 14 and TailwindCSS

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Blockchain**: Celo Alfajores Testnet, ethers.js
- **AI**: OpenAI GPT-4
- **Automation**: node-cron
- **Smart Contracts**: Solidity (ERC-8004, x402)

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Celo Alfajores testnet tokens

### Step 1: Clone and Install

\`\`\`bash
git clone https://github.com/yourusername/kashpilot.git
cd kashpilot
npm install
\`\`\`

### Step 2: Environment Setup

Copy the example environment file:

\`\`\`bash
cp .env.example .env
\`\`\`

### Step 3: Generate Agent Wallet

\`\`\`bash
node scripts/generate-wallet.js
\`\`\`

This will generate:
- Wallet address
- Private key
- Mnemonic phrase

**IMPORTANT: Save these credentials securely!**

Add to your `.env` file:
\`\`\`
AGENT_PRIVATE_KEY=your_private_key_here
AGENT_WALLET_ADDRESS=your_wallet_address_here
\`\`\`

### Step 4: Fund Your Wallet

Get Celo Alfajores testnet tokens:
Visit https://faucet.celo.org/alfajores

### Step 5: Add OpenAI API Key

Get your API key from: https://platform.openai.com/api-keys

Add to `.env`:
\`\`\`
OPENAI_API_KEY=sk-your-key-here
\`\`\`

### Step 6: Deploy Smart Contracts (Optional)

The app works without deploying contracts, but for full functionality:

1. Deploy `contracts/AgentIdentity.sol` to Celo Alfajores
2. Deploy `contracts/X402Payment.sol` to Celo Alfajores
3. Add contract addresses to `.env`:

\`\`\`
NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT=0x...
NEXT_PUBLIC_X402_PAYMENT_CONTRACT=0x...
\`\`\`

### Step 7: Register Agent (If contracts deployed)

\`\`\`bash
node scripts/register-agent.js
\`\`\`

## Running the App

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### Run Autonomous Agent

In a separate terminal:

\`\`\`bash
npm run agent
\`\`\`

This starts the cron scheduler that executes agent actions every 3 minutes.

### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage Guide

### 1. Landing Page
- Modern hero section introducing KashPilot
- Feature highlights
- Call-to-action to launch app

### 2. Dashboard
- View wallet balance
- Monitor agent status
- Track reputation score
- See total transactions and earnings
- Recent activity feed

### 3. Agent Control Panel
- **Start/Pause Agent** - Control autonomous execution
- **Mode Selection** - Choose agent strategy
- **Command Input** - Give natural language commands
- **Thinking Logs** - Watch agent decisions in real-time

### 4. Activity Page
- Complete transaction history
- Filter by type (payments, savings, agent actions)
- View transaction details and hashes
- Link to block explorer

## How the Agent Works

### Decision Making Process

1. **Context Gathering**
   - Current wallet balance
   - Recent transaction history
   - Agent mode and reputation

2. **AI Analysis**
   - OpenAI GPT-4 analyzes context
   - Considers mode-specific goals
   - Evaluates risk and opportunity

3. **Action Execution**
   - Send micro-payments
   - Save funds
   - Execute earning strategies
   - Wait for better conditions

4. **On-Chain Recording**
   - Records action in ERC-8004 contract
   - Increases reputation score
   - Logs transaction locally

### Agent Modes Explained

#### Autopilot Mode
Balanced strategy that:
- Maintains healthy balance
- Makes strategic transactions
- Builds reputation gradually

#### Earn Mode
Aggressive earning focus:
- Frequent micro-transactions
- Maximizes on-chain activity
- Rapid reputation building

#### Save Mode
Conservative accumulation:
- Minimizes outgoing transactions
- Focuses on balance growth
- Strategic earning only

#### Protection Mode
Maximum safety:
- Minimal transactions
- Only essential operations
- Preserves capital

## Project Structure

\`\`\`
kashpilot/
├── app/                      # Next.js 14 app directory
│   ├── page.tsx             # Landing page
│   ├── dashboard/           # Dashboard page
│   ├── agent/               # Agent control panel
│   ├── activity/            # Transaction history
│   ├── api/                 # API routes
│   │   ├── dashboard/       # Dashboard data
│   │   ├── agent/           # Agent control
│   │   ├── wallet/          # Wallet operations
│   │   └── transactions/    # Transaction data
│   └── globals.css          # Global styles
├── lib/                      # Core libraries
│   ├── blockchain/          # Blockchain utilities
│   │   ├── celo.ts         # Celo integration
│   │   ├── erc8004.ts      # ERC-8004 agent identity
│   │   └── x402.ts         # x402 payment protocol
│   ├── ai/                  # AI agent logic
│   │   └── agent.ts        # OpenAI integration
│   └── agent/               # Agent core
│       ├── economic-agent.ts # Main agent class
│       └── storage.ts       # Data persistence
├── contracts/               # Smart contracts
│   ├── AgentIdentity.sol   # ERC-8004 implementation
│   └── X402Payment.sol     # x402 payment protocol
├── scripts/                 # Utility scripts
│   ├── agent-runner.js     # Cron scheduler
│   ├── generate-wallet.js  # Wallet generator
│   └── register-agent.js   # Agent registration
├── data/                    # Local data storage
│   ├── transactions.json   # Transaction history
│   └── agent-logs.json     # Agent activity logs
└── public/                  # Static assets
\`\`\`

## Security Notes

**IMPORTANT SECURITY CONSIDERATIONS:**

1. **Private Keys** - Never commit `.env` to Git
2. **Testnet Only** - This is built for Celo Alfajores testnet
3. **API Keys** - Keep OpenAI API key secure
4. **Production** - Extensive security audit required before mainnet
5. **Wallet Safety** - Use separate wallet for agent, not your main wallet

## Configuration

### Environment Variables

\`\`\`bash
# Celo Network
NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org

# OpenAI
OPENAI_API_KEY=sk-your-key-here

# Agent Wallet
AGENT_PRIVATE_KEY=your_private_key
AGENT_WALLET_ADDRESS=0xYourAddress

# Smart Contracts (Optional)
NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT=0x...
NEXT_PUBLIC_X402_PAYMENT_CONTRACT=0x...

# Agent ID (After registration)
AGENT_ID=kashpilot-1234567890
\`\`\`

### Customizing Agent Behavior

Edit `lib/ai/agent.ts` to modify:
- Decision-making prompts
- Action thresholds
- Risk parameters
- Mode behaviors

### Adjusting Cron Schedule

Edit `scripts/agent-runner.js`:

\`\`\`javascript
// Run every 3 minutes (default)
cron.schedule('*/3 * * * *', async () => { ... })

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => { ... })

// Run every hour
cron.schedule('0 * * * *', async () => { ... })
\`\`\`

## Design System

### Colors
- Background: `#FFFFFF`
- Text: `#000000`
- Accent: `#22c55e` (green)
- Secondary: `#6B7280` (gray)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, 600-700 weight
- Body: Regular, 400 weight

### Components
- Cards: White with subtle shadow
- Buttons: Black background, white text
- Inputs: Border with focus states
- Rounded corners: 12-16px

## Monitoring & Analytics

### Agent Activity Logs

View real-time logs:
- Agent decisions
- Executed actions
- Errors and warnings
- Timestamp tracking

### Transaction History

Monitor:
- All on-chain transactions
- Agent-initiated actions
- Payment details
- Block explorer links

### Reputation Tracking

Watch your agent build reputation:
- ERC-8004 reputation score
- Total on-chain actions
- Activity trends
- Comparison metrics

## Testing

### Test Agent Locally

\`\`\`bash
# Run dev server
npm run dev

# In another terminal, run agent
npm run agent
\`\`\`

### Manual Testing Checklist

- Wallet connection works
- Dashboard displays correct data
- Agent starts and pauses
- Mode changes update behavior
- Commands execute properly
- Transactions appear in activity
- Logs show in real-time

## Roadmap

### v1.0 - Current
- Basic agent functionality
- UI/UX design
- Celo integration
- OpenAI integration

### v2.0 - Planned
- Multi-agent coordination
- Advanced earning strategies
- DeFi protocol integration
- Mobile app
- Mainnet deployment

### v3.0 - Future
- DAO governance
- Agent marketplace
- Cross-chain support
- Advanced AI models

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Celo Foundation for blockchain infrastructure
- OpenAI for AI capabilities
- Next.js team for the framework
- Community contributors

## Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Twitter**: @kashpilot
- **Discord**: Join our server

## Contact

- **Website**: https://kashpilot.app
- **Email**: hello@kashpilot.app
- **GitHub**: @yourusername

---

Built by the KashPilot team

**Your money. On autopilot.**
