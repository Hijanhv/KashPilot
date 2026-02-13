# KashPilot - Development Guide

## Project Architecture

### Tech Stack Overview

\`\`\`
Frontend: Next.js 14 (React) + TailwindCSS
Backend: Next.js API Routes (Node.js)
Blockchain: Celo (ethers.js)
AI: OpenAI GPT-4
Automation: node-cron
Storage: File-based JSON
\`\`\`

### Directory Structure

\`\`\`
kashpilot/
│
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── dashboard/         # Dashboard route
│   ├── agent/             # Agent control route
│   ├── activity/          # Activity route
│   └── api/               # API routes
│       ├── dashboard/
│       ├── wallet/
│       ├── agent/
│       └── transactions/
│
├── lib/                    # Core business logic
│   ├── blockchain/        # Blockchain utilities
│   │   ├── celo.ts       # Celo network functions
│   │   ├── erc8004.ts    # ERC-8004 integration
│   │   └── x402.ts       # x402 payment protocol
│   ├── ai/                # AI logic
│   │   └── agent.ts      # OpenAI integration
│   ├── agent/             # Agent core
│   │   ├── economic-agent.ts  # Main agent class
│   │   └── storage.ts         # Data persistence
│   ├── utils.ts           # Helper functions
│   └── constants.ts       # App constants
│
├── components/            # Reusable UI components
│   └── ui.tsx            # UI component library
│
├── contracts/             # Smart contracts
│   ├── AgentIdentity.sol # ERC-8004 implementation
│   └── X402Payment.sol   # x402 payment
│
├── scripts/               # Utility scripts
│   ├── agent-runner.js   # Cron scheduler
│   ├── generate-wallet.js
│   ├── register-agent.js
│   ├── deploy-agent-identity.js
│   └── deploy-x402.js
│
├── data/                  # Local storage
│   ├── transactions.json
│   ├── agent-logs.json
│   └── agent-status.json
│
└── docs/                  # Documentation
    ├── API.md
    └── CONTRACTS.md
\`\`\`

## Development Workflow

### 1. Local Setup

\`\`\`bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate wallet
node scripts/generate-wallet.js

# Add credentials to .env
\`\`\`

### 2. Development Server

\`\`\`bash
# Terminal 1: Web app
npm run dev

# Terminal 2: Agent runner
npm run agent
\`\`\`

### 3. Making Changes

#### Adding a New Feature

1. Create feature branch
\`\`\`bash
git checkout -b feature/new-agent-mode
\`\`\`

2. Implement feature
3. Test thoroughly
4. Update documentation
5. Commit and push
6. Create pull request

#### Adding a New Page

\`\`\`bash
# Create new route
mkdir app/new-page
touch app/new-page/page.tsx
\`\`\`

\`\`\`typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>
}
\`\`\`

#### Adding a New API Endpoint

\`\`\`bash
# Create API route
mkdir app/api/new-endpoint
touch app/api/new-endpoint/route.ts
\`\`\`

\`\`\`typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true })
}
\`\`\`

### 4. Adding Agent Functionality

#### Create New Agent Action

\`\`\`typescript
// lib/agent/economic-agent.ts

private async newAction() {
  // Implement your action
  return {
    success: true,
    message: 'Action completed'
  }
}

// Add to executeAction() switch statement
case 'new_action':
  result = await this.newAction()
  break
\`\`\`

#### Modify AI Decision Making

\`\`\`typescript
// lib/ai/agent.ts

export async function getAgentDecision(context: AgentContext) {
  // Modify prompt or add new decision logic
  const prompt = `Your custom prompt...`
  
  // Rest of the function
}
\`\`\`

## Key Components

### Economic Agent

The core agent class that makes decisions and executes actions.

\`\`\`typescript
import { EconomicAgent } from '@/lib/agent/economic-agent'

const agent = new EconomicAgent({
  privateKey: process.env.AGENT_PRIVATE_KEY,
  address: process.env.AGENT_WALLET_ADDRESS,
  mode: 'autopilot',
  isActive: true,
})

await agent.executeAction()
\`\`\`

### AI Decision System

Uses OpenAI to make intelligent decisions based on context.

\`\`\`typescript
import { getAgentDecision } from '@/lib/ai/agent'

const decision = await getAgentDecision({
  balance: '1.5',
  recentActivity: ['send', 'save'],
  mode: 'autopilot',
  reputation: 150,
})
\`\`\`

### Blockchain Utilities

\`\`\`typescript
import { getBalance, sendTransaction } from '@/lib/blockchain/celo'

const balance = await getBalance(address)
const txHash = await sendTransaction(privateKey, to, amount)
\`\`\`

## Testing

### Manual Testing

\`\`\`bash
# Test build
npm run build

# Test TypeScript
npx tsc --noEmit

# Test linting
npm run lint
\`\`\`

### Testing Checklist

- [ ] Web app loads without errors
- [ ] Dashboard shows correct data
- [ ] Agent starts/stops correctly
- [ ] Mode changes work
- [ ] Transactions execute
- [ ] Logs appear in real-time
- [ ] Mobile responsive
- [ ] All links work

## Debugging

### Common Issues

**Agent doesn't execute:**
\`\`\`bash
# Check agent status file
cat data/agent-status.json

# Check if cron is running
ps aux | grep node

# Check logs
tail -f data/agent-logs.json
\`\`\`

**Transaction fails:**
\`\`\`bash
# Check balance
node -e "
const { getBalance } = require('./lib/blockchain/celo.ts')
getBalance(process.env.AGENT_WALLET_ADDRESS)
  .then(console.log)
"
\`\`\`

**OpenAI errors:**
\`\`\`bash
# Test API key
curl https://api.openai.com/v1/models \\
  -H "Authorization: Bearer $OPENAI_API_KEY"
\`\`\`

### Debug Mode

Add to `.env`:
\`\`\`
DEBUG=true
LOG_LEVEL=verbose
\`\`\`

## Performance Optimization

### Frontend

- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Lazy load images
- Code splitting with dynamic imports

### Backend

- Cache API responses
- Batch blockchain calls
- Use database for production
- Implement request queuing

### Blockchain

- Batch transactions
- Use multicall
- Cache provider responses
- Optimize gas usage

## Best Practices

### Code Quality

- Write TypeScript for type safety
- Use meaningful variable names
- Keep functions small (< 50 lines)
- Add comments for complex logic
- Follow DRY principle

### Git Workflow

\`\`\`bash
# Feature development
git checkout -b feature/name
git add .
git commit -m "feat: description"
git push origin feature/name

# Bug fixes
git checkout -b fix/bug-name
git add .
git commit -m "fix: description"
git push origin fix/bug-name
\`\`\`

### Component Design

- Keep components focused
- Use composition over inheritance
- Implement proper TypeScript types
- Handle loading and error states
- Make components reusable

## Deployment

### Environment Variables

Production requires:
\`\`\`
NEXT_PUBLIC_CELO_RPC_URL
OPENAI_API_KEY
AGENT_PRIVATE_KEY
AGENT_WALLET_ADDRESS
NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT
NEXT_PUBLIC_X402_PAYMENT_CONTRACT
\`\`\`

### Build Process

\`\`\`bash
npm run build
npm start
\`\`\`

### Deployment Platforms

- **Vercel** (Recommended)
- Railway
- DigitalOcean
- AWS
- Custom VPS

See DEPLOYMENT.md for full guide.

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Celo Docs](https://docs.celo.org)
- [OpenAI API](https://platform.openai.com/docs)
- [ethers.js](https://docs.ethers.org)

### Tools
- [CeloScan](https://alfajores.celoscan.io)
- [Celo Faucet](https://faucet.celo.org)
- [OpenAI Playground](https://platform.openai.com/playground)

## Getting Help

- GitHub Issues
- GitHub Discussions
- Discord Community
- Email: dev@kashpilot.app

Happy coding.
