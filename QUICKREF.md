# KashPilot - Quick Reference

## Commands Cheatsheet

### Development
\`\`\`bash
npm install              # Install dependencies
npm run dev             # Start dev server (localhost:3000)
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint
npm run agent           # Start autonomous agent
\`\`\`

### Setup Scripts
\`\`\`bash
node scripts/setup-env.js           # Check environment setup
node scripts/generate-wallet.js     # Generate new wallet
node scripts/register-agent.js      # Register with ERC-8004
node scripts/deploy-agent-identity.js  # Deploy AgentIdentity
node scripts/deploy-x402.js         # Deploy X402Payment
\`\`\`

## Environment Variables

### Required
\`\`\`env
NEXT_PUBLIC_CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
OPENAI_API_KEY=sk-your-key-here
AGENT_PRIVATE_KEY=0xYourPrivateKey
AGENT_WALLET_ADDRESS=0xYourAddress
\`\`\`

### Optional
\`\`\`env
NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT=0xContractAddress
NEXT_PUBLIC_X402_PAYMENT_CONTRACT=0xContractAddress
AGENT_ID=kashpilot-1234567890
\`\`\`

## File Locations

### Configuration
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript config
- `tailwind.config.js` - TailwindCSS config
- `next.config.js` - Next.js config
- `.env` - Environment variables

### Source Code
- `app/` - Next.js pages & routes
- `lib/` - Core business logic
- `components/` - UI components
- `contracts/` - Smart contracts
- `scripts/` - Utility scripts

### Data
- `data/transactions.json` - Transaction history
- `data/agent-logs.json` - Agent activity logs
- `data/agent-status.json` - Agent state

### Documentation
- `README.md` - Main documentation
- `SETUP.md` - Quick setup guide
- `DEPLOYMENT.md` - Deployment checklist
- `DEVELOPMENT.md` - Developer guide
- `docs/API.md` - API reference
- `docs/CONTRACTS.md` - Smart contracts

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Wallet
- `POST /api/wallet/connect` - Connect wallet

### Agent
- `GET /api/agent/status` - Get agent status
- `POST /api/agent/toggle` - Start/pause agent
- `POST /api/agent/mode` - Change mode
- `GET /api/agent/logs` - Get thinking logs
- `POST /api/agent/command` - Execute command

### Transactions
- `GET /api/transactions?filter=all` - Get transactions

## Agent Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Autopilot** | Balanced strategy | General use |
| **Earn** | Maximize activity | Build reputation |
| **Save** | Accumulate funds | Grow balance |
| **Protection** | Conservative | Preserve capital |

## Blockchain Functions

### Wallet
\`\`\`typescript
import { getBalance, sendTransaction, generateWallet } from '@/lib/blockchain/celo'

const balance = await getBalance(address)
const txHash = await sendTransaction(privateKey, to, amount)
const wallet = generateWallet()
\`\`\`

### ERC-8004
\`\`\`typescript
import { registerAgent, recordAgentTransaction, getAgentInfo } from '@/lib/blockchain/erc8004'

await registerAgent(privateKey, agentId)
await recordAgentTransaction(privateKey)
const info = await getAgentInfo(address)
\`\`\`

### x402
\`\`\`typescript
import { createX402Payment, getPaymentStats } from '@/lib/blockchain/x402'

await createX402Payment(privateKey, to, amount, metadata)
const stats = await getPaymentStats(address)
\`\`\`

## AI Functions

\`\`\`typescript
import { getAgentDecision, getAgentThinking } from '@/lib/ai/agent'

const decision = await getAgentDecision(context)
const thinking = await getAgentThinking(prompt)
\`\`\`

## Common Tasks

### Start Fresh Development

\`\`\`bash
rm -rf data/
node scripts/generate-wallet.js
node scripts/setup-env.js
npm run dev
npm run agent
\`\`\`

### Deploy to Production

\`\`\`bash
npm run build
npm start
# or deploy to Vercel
\`\`\`

### Reset Agent State

\`\`\`bash
rm data/agent-status.json
rm data/agent-logs.json
\`\`\`

### View Logs

\`\`\`bash
tail -f data/agent-logs.json
tail -f data/transactions.json
\`\`\`

### Check Wallet Balance

\`\`\`bash
node -e "require('./lib/blockchain/celo').getBalance(process.env.AGENT_WALLET_ADDRESS).then(console.log)"
\`\`\`

## URLs

### Development
- Web App: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Agent: http://localhost:3000/agent
- Activity: http://localhost:3000/activity

### Resources
- Celo Faucet: https://faucet.celo.org/alfajores
- CeloScan: https://alfajores.celoscan.io
- OpenAI: https://platform.openai.com
- Celo Docs: https://docs.celo.org

## Troubleshooting

### Build Fails
\`\`\`bash
rm -rf node_modules .next
npm install
npm run build
\`\`\`

### Agent Doesn't Run
- Check AGENT_PRIVATE_KEY in .env
- Verify wallet has CELO balance
- Check OPENAI_API_KEY is valid
- Look at data/agent-logs.json

### No Transactions
- Wait for cron cycle (3 minutes)
- Check agent is active in UI
- Verify wallet has funds
- Check OpenAI API credits

## Keyboard Shortcuts

*In development mode:*
- `Cmd/Ctrl + R` - Reload page
- `Cmd/Ctrl + Shift + R` - Hard reload
- `F12` - Open DevTools

## Tips & Tricks

1. **Fast Testing**: Change cron to `*/1 * * * *` for 1-minute cycles
2. **Debug Mode**: Add `console.log()` in agent-runner.js
3. **Mock Mode**: Comment out blockchain calls to test UI
4. **Local RPC**: Run local Celo node for faster development
5. **Hot Reload**: Next.js auto-reloads on file changes

## Support Contacts

- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Email: hello@kashpilot.app
- Discord: Join community server

## Quick Links

- [README](README.md) - Full documentation
- [Setup Guide](SETUP.md) - Installation
- [API Docs](docs/API.md) - API reference
- [Deployment](DEPLOYMENT.md) - Deploy guide
- [Contributing](CONTRIBUTING.md) - How to contribute

---

**Keep this reference handy while developing!** 📚
