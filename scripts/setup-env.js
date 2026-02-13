#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('KashPilot Environment Setup\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].replace('v', ''));

if (majorVersion < 18) {
  console.error('[ERROR] Node.js 18 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  console.error('   Please upgrade: https://nodejs.org/');
  process.exit(1);
}

console.log(`[OK] Node.js version: ${nodeVersion}`);

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('Creating .env file from .env.example...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('[OK] .env file created');
  } else {
    console.error('[ERROR] .env.example not found');
    process.exit(1);
  }
} else {
  console.log('[OK] .env file exists');
}

// Create data directory
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('[OK] Data directory created');
} else {
  console.log('[OK] Data directory exists');
}

// Check for required environment variables
console.log('\n🔍 Checking environment configuration...\n');

require('dotenv').config();

const requiredVars = [
  'NEXT_PUBLIC_CELO_RPC_URL',
  'OPENAI_API_KEY',
  'AGENT_PRIVATE_KEY',
  'AGENT_WALLET_ADDRESS',
];

const missingVars = [];
const configuredVars = [];

requiredVars.forEach(varName => {
  if (process.env[varName] && process.env[varName] !== 'your_value_here' && !process.env[varName].includes('your_')) {
    console.log(`[OK] ${varName} is configured`);
    configuredVars.push(varName);
  } else {
    console.log(`[WARNING] ${varName} needs configuration`);
    missingVars.push(varName);
  }
});

console.log('\nSetup Summary:\n');
console.log(`Configured: ${configuredVars.length}/${requiredVars.length}`);
console.log(`Missing: ${missingVars.length}/${requiredVars.length}`);

if (missingVars.length > 0) {
  console.log('\n[WARNING] Next Steps:\n');
  
  if (missingVars.includes('AGENT_PRIVATE_KEY') || missingVars.includes('AGENT_WALLET_ADDRESS')) {
    console.log('1. Generate a wallet:');
    console.log('   node scripts/generate-wallet.js\n');
  }
  
  if (missingVars.includes('OPENAI_API_KEY')) {
    console.log('2. Get OpenAI API key:');
    console.log('   https://platform.openai.com/api-keys\n');
  }
  
  console.log('3. Update .env file with your credentials');
  console.log('4. Fund your wallet with testnet tokens:');
  console.log('   https://faucet.celo.org/alfajores\n');
  
  console.log('5. Run setup again:');
  console.log('   node scripts/setup-env.js\n');
} else {
  console.log('\nEnvironment is fully configured!\n');
  console.log('Next steps:');
  console.log('1. npm run dev     - Start development server');
  console.log('2. npm run agent   - Start autonomous agent\n');
}

console.log('Documentation: README.md');
console.log('Need help? Check SETUP.md\n');
