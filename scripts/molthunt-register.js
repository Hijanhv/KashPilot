#!/usr/bin/env node

console.log('🔥 KashPilot Molthunt Registration Helper\n');

const projectData = {
  name: "KashPilot",
  tagline: "Gamified autonomous economic AI agent with lego block aesthetics",
  description: `KashPilot combines serious AI agent capabilities with delightful gamified UX. Features include:

🎮 Gamified Interface: Interactive lego blocks, 8-bit sound effects, coin rewards
🤖 Autonomous Operations: Smart economic decisions, savings optimization  
🎤 Voice Control: Hands-free financial management
📊 Smart Analytics: Beautiful insights with real-time data visualization
🔗 Multi-Device Sync: Seamless experience across all platforms
🐨 Koala Mascot: Friendly personality that guides users

Built for the Celo "Build Agents for Real World" hackathon with complete ERC-8004 and x402 payment protocol integration. This is the future of financial AI - where powerful autonomous agents meet engaging, game-like user experiences.`,
  
  logo_url: "https://kash-pilot.vercel.app/koala.png",
  github_url: "https://github.com/Hijanhv/KashPilot", 
  website_url: "https://kash-pilot.vercel.app",
  demo_url: "https://kash-pilot.vercel.app",
  category_ids: ["cat_ai", "cat_fintech"],
  
  // Screenshots and additional media
  screenshot_url: "https://kash-pilot.vercel.app/screenshot.png", // You'll need this
  video_url: "", // Optional YouTube/Loom demo
  twitter_url: "" // Optional X handle
};

console.log('📋 KashPilot Project Data for Molthunt:\n');

console.log('🎯 Project Details:');
console.log(`   Name: ${projectData.name}`);
console.log(`   Tagline: ${projectData.tagline}`);
console.log(`   GitHub: ${projectData.github_url}`);
console.log(`   Demo: ${projectData.demo_url}`);
console.log('');

console.log('🔐 REQUIRED: ERC-8004 Agent Identity');
console.log('   1. Go to: https://siwa.id');
console.log('   2. Register your agent identity');
console.log('   3. Get your agent ID and wallet address');
console.log('');

console.log('📝 MOLTHUNT REGISTRATION STEPS:');
console.log('');

console.log('Step 1: Get Authentication Nonce');
console.log('curl -X POST https://www.molthunt.com/api/v1/siwa/nonce \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"address": "YOUR_WALLET_ADDRESS", "agentId": YOUR_AGENT_ID}\'');
console.log('');

console.log('Step 2: Sign and Verify (after signing nonce with wallet)');
console.log('curl -X POST https://www.molthunt.com/api/v1/siwa/verify \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"message": "SIWA_MESSAGE", "signature": "YOUR_SIGNATURE"}\'');
console.log('');

console.log('Step 3: Create Project');
console.log('curl -X POST https://www.molthunt.com/api/v1/projects \\');
console.log('  -H "Authorization: Bearer SIWA_RECEIPT" \\');
console.log('  -H "Content-Type: application/json" \\');
console.log(`  -d '${JSON.stringify(projectData, null, 2)}'`);
console.log('');

console.log('Step 4: Deploy Token via Clawnch');
console.log('curl -s https://clawn.ch/skill.md');
console.log('# Follow Clawnch instructions to deploy KashPilot token');
console.log('');

console.log('Step 5: Register Token → Auto-Launch! 🚀');
console.log('curl -X POST https://www.molthunt.com/api/v1/projects/PROJECT_ID/token \\');
console.log('  -H "Authorization: Bearer SIWA_RECEIPT" \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"token_address": "0x...", "symbol": "KASH", "name": "KashPilot", "chain": "base", "launched_via": "clawnch"}\'');
console.log('');

console.log('🎯 ALTERNATIVE: Manual Registration');
console.log('   If API seems complex, try the manual option:');
console.log('   1. Go to: https://www.molthunt.com'); 
console.log('   2. Click the "manual" tab in "Get Your Agent on Molthunt"');
console.log('   3. Fill out the form with the project data above');
console.log('');

console.log('🏆 After registration, your KashPilot will be live on Molthunt!');
console.log('   This gives you extra visibility for the Celo hackathon.');
console.log('');