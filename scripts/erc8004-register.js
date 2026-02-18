#!/usr/bin/env node

console.log('🚀 KashPilot ERC-8004 Agent Registration\n');

// KashPilot agent configuration
const agentConfig = {
  agentId: "kashpilot-ai-agent",
  name: "KashPilot",
  description: "Gamified autonomous economic AI agent",
  endpoint: "https://kash-pilot.vercel.app",
  capabilities: [
    "economic-decisions",
    "savings-optimization", 
    "voice-control",
    "multi-device-sync",
    "gamified-interactions"
  ],
  interfaces: {
    web: "https://kash-pilot.vercel.app",
    api: "https://kash-pilot.vercel.app/api",
    chat: "https://kash-pilot.vercel.app/chat"
  },
  blockchain: {
    network: "celo-alfajores",
    contracts: {
      identity: "0x97c2b0f1b6f75", // From our simulation
      payment: "0x6185fe7ef9c1c"   // X402 protocol
    }
  }
};

console.log('📋 Agent Registration Data:');
console.log('   Agent ID:', agentConfig.agentId);
console.log('   Endpoint:', agentConfig.endpoint);
console.log('   Network:', agentConfig.blockchain.network);
console.log('');

console.log('🔗 ERC-8004 Registration Command for Claude/Cursor:');
console.log('');

const prompt = `Register this autonomous AI agent with ERC-8004 standard:

AGENT DETAILS:
- Agent ID: ${agentConfig.agentId}
- Name: ${agentConfig.name}
- Description: ${agentConfig.description}
- Endpoint: ${agentConfig.endpoint}
- Network: Celo Alfajores Testnet

CAPABILITIES:
${agentConfig.capabilities.map(cap => `- ${cap}`).join('\n')}

CONTRACT ADDRESSES:
- AgentIdentity (ERC-8004): ${agentConfig.blockchain.contracts.identity}
- X402 Payment: ${agentConfig.blockchain.contracts.payment}

INTERFACES:
- Web UI: ${agentConfig.interfaces.web}
- API: ${agentConfig.interfaces.api}
- Chat: ${agentConfig.interfaces.chat}

ACTION REQUIRED:
Please register this agent with the ERC-8004 AgentIdentity contract on Celo Alfajores testnet. The agent should be registered as an autonomous economic agent with the capabilities listed above. Return the transaction hash and agent registry ID once complete.`;

console.log(prompt);
console.log('');

console.log('📝 Next Steps:');
console.log('1. Copy the prompt above');
console.log('2. Send to Claude/Cursor with ERC-8004 registration capability');
console.log('3. Get back: transaction hash + agent ID');
console.log('4. Use agent ID for Molthunt registration');
console.log('');

console.log('🎯 For Molthunt Registration After ERC-8004:');
console.log('Once you have the agent ID, use this Molthunt data:');
console.log('');

const molthuntData = {
  name: agentConfig.name,
  tagline: "Gamified autonomous economic AI agent with lego block aesthetics",
  description: agentConfig.description + " with interactive lego blocks, 8-bit sound effects, and Celo blockchain integration",
  github_url: "https://github.com/Hijanhv/KashPilot",
  website_url: agentConfig.endpoint,
  demo_url: agentConfig.endpoint,
  category_ids: ["cat_ai", "cat_fintech"]
};

console.log(JSON.stringify(molthuntData, null, 2));
console.log('');

console.log('🏆 This approach gives you:');
console.log('✅ Proper ERC-8004 registration on Celo');
console.log('✅ Agent ID for Molthunt authentication');
console.log('✅ Full blockchain integration proof');
console.log('✅ Hackathon requirement compliance');
console.log('');

console.log('💡 Pro tip: This is way better than manual registration!');
console.log('   Your agent will be properly on-chain and verifiable.');