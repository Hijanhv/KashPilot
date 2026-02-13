# KashPilot Smart Contracts

## Overview

KashPilot uses two main smart contracts for on-chain agent functionality:

1. **AgentIdentity.sol** - ERC-8004 agent identity and reputation
2. **X402Payment.sol** - x402 payment protocol for agent transactions

## Deployment Guide

### Prerequisites

- Hardhat or Foundry
- Celo Alfajores RPC URL
- Deployer wallet with CELO tokens

### Using Hardhat

1. Install Hardhat:
\`\`\`bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
\`\`\`

2. Create `hardhat.config.js`:
\`\`\`javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
      chainId: 44787,
    },
  },
};
\`\`\`

3. Deploy AgentIdentity:
\`\`\`bash
npx hardhat run scripts/deploy-agent-identity.js --network alfajores
\`\`\`

4. Deploy X402Payment:
\`\`\`bash
npx hardhat run scripts/deploy-x402.js --network alfajores
\`\`\`

### Using Remix

1. Go to https://remix.ethereum.org
2. Create new file `AgentIdentity.sol`
3. Paste contract code
4. Compile with Solidity 0.8.20
5. Deploy to Celo Alfajores using MetaMask
6. Repeat for `X402Payment.sol`

## Contract Addresses

After deployment, add to `.env`:

\`\`\`
NEXT_PUBLIC_AGENT_IDENTITY_CONTRACT=0xYourAgentIdentityAddress
NEXT_PUBLIC_X402_PAYMENT_CONTRACT=0xYourX402PaymentAddress
\`\`\`

## Contract Functions

### AgentIdentity.sol

#### registerAgent(string agentId)
Register a new agent with unique ID.

#### recordTransaction()
Record a transaction and increase reputation.

#### getAgentInfo(address)
Get agent information including reputation score.

### X402Payment.sol

#### createPayment(address to, string metadata) payable
Create and execute a payment to another agent.

#### getPayment(bytes32 paymentId)
Get payment details by ID.

#### getStats(address)
Get total sent and received amounts.

## Verification

Verify contracts on CeloScan:

\`\`\`bash
npx hardhat verify --network alfajores DEPLOYED_ADDRESS
\`\`\`

## Testing Contracts

Run local tests:

\`\`\`bash
npx hardhat test
\`\`\`

## Security Considerations

**WARNING: These contracts are for testnet demonstration only.**

Before mainnet deployment:
- Professional security audit required
- Add access controls
- Implement emergency pause mechanism
- Add reentrancy guards
- Comprehensive testing

## Gas Optimization

Current contracts prioritize clarity over gas optimization.

For production:
- Optimize storage layout
- Use events efficiently
- Batch operations where possible
- Consider upgradeable patterns
