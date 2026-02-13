#!/usr/bin/env node

/**
 * KashPilot Installation Verification Script
 * Run this after installation to verify everything is set up correctly
 */

const fs = require('fs');
const path = require('path');

console.log('\n[VERIFY] KashPilot Installation Verification\n');
console.log('=' .repeat(50));

let allChecksPassed = true;

// Check 1: Node.js version
console.log('\n[CHECK] Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].replace('v', ''));

if (majorVersion >= 18) {
  console.log(`[OK] Node.js ${nodeVersion} (>= 18.0.0)`);
} else {
  console.log(`[ERROR] Node.js ${nodeVersion} (need >= 18.0.0)`);
  allChecksPassed = false;
}

// Check 2: Dependencies
console.log('\n[CHECK] Checking dependencies...');
const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fs.existsSync(packageJsonPath)) {
  console.log('[OK] package.json found');
  
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('[OK] node_modules installed');
  } else {
    console.log('[ERROR] node_modules not found - run npm install');
    allChecksPassed = false;
  }
} else {
  console.log('[ERROR] package.json not found');
  allChecksPassed = false;
}

// Check 3: Configuration files
console.log('\n[CHECK] Checking configuration files...');
const configFiles = [
  'tsconfig.json',
  'tailwind.config.js',
  'next.config.js',
  'postcss.config.js',
];

configFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`[OK] ${file}`);
  } else {
    console.log(`[ERROR] ${file} missing`);
    allChecksPassed = false;
  }
});

// Check 4: Environment setup
console.log('\n[CHECK] Checking environment setup...');

if (fs.existsSync(path.join(process.cwd(), '.env.example'))) {
  console.log('[OK] .env.example found');
} else {
  console.log('[ERROR] .env.example missing');
  allChecksPassed = false;
}

if (fs.existsSync(path.join(process.cwd(), '.env'))) {
  console.log('[OK] .env file exists');
  
  require('dotenv').config();
  
  const requiredVars = [
    'NEXT_PUBLIC_CELO_RPC_URL',
    'OPENAI_API_KEY',
    'AGENT_PRIVATE_KEY',
    'AGENT_WALLET_ADDRESS',
  ];
  
  let configured = 0;
  requiredVars.forEach(varName => {
    if (process.env[varName] && 
        process.env[varName] !== 'your_value_here' && 
        !process.env[varName].includes('your_')) {
      configured++;
    }
  });
  
  if (configured === requiredVars.length) {
    console.log(`[OK] All environment variables configured (${configured}/${requiredVars.length})`);
  } else {
    console.log(`[WARNING] Environment partially configured (${configured}/${requiredVars.length})`);
  }
} else {
  console.log('[WARNING] .env file not found (run: cp .env.example .env)');
}

// Check 5: Directory structure
console.log('\n[CHECK] Checking directory structure...');
const directories = [
  'app',
  'lib',
  'components',
  'contracts',
  'scripts',
  'docs',
];

directories.forEach(dir => {
  if (fs.existsSync(path.join(process.cwd(), dir))) {
    console.log(`[OK] ${dir}/`);
  } else {
    console.log(`[ERROR] ${dir}/ missing`);
    allChecksPassed = false;
  }
});

// Check 6: Key files
console.log('\n[CHECK] Checking key files...');
const keyFiles = [
  'README.md',
  'SETUP.md',
  'package.json',
  'app/page.tsx',
  'lib/blockchain/celo.ts',
  'lib/ai/agent.ts',
];

keyFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`[OK] ${file}`);
  } else {
    console.log(`[ERROR] ${file} missing`);
    allChecksPassed = false;
  }
});

// Check 7: Data directory
console.log('\n[CHECK] Checking data directory...');
const dataDir = path.join(process.cwd(), 'data');

if (fs.existsSync(dataDir)) {
  console.log('[OK] data/ directory exists');
} else {
  console.log('[INFO] data/ directory will be created on first run');
}

// Check 8: Smart contracts
console.log('\n[CHECK] Checking smart contracts...');
const contracts = [
  'contracts/AgentIdentity.sol',
  'contracts/X402Payment.sol',
];

contracts.forEach(contract => {
  if (fs.existsSync(path.join(process.cwd(), contract))) {
    console.log(`[OK] ${contract}`);
  } else {
    console.log(`[ERROR] ${contract} missing`);
    allChecksPassed = false;
  }
});

// Check 9: Scripts
console.log('\n[CHECK] Checking utility scripts...');
const scripts = [
  'scripts/generate-wallet.js',
  'scripts/agent-runner.js',
  'scripts/setup-env.js',
];

scripts.forEach(script => {
  if (fs.existsSync(path.join(process.cwd(), script))) {
    console.log(`[OK] ${script}`);
  } else {
    console.log(`[ERROR] ${script} missing`);
    allChecksPassed = false;
  }
});

// Check 10: Documentation
console.log('\n[CHECK] Checking documentation...');
const docs = [
  'README.md',
  'SETUP.md',
  'DEPLOYMENT.md',
  'docs/API.md',
  'docs/CONTRACTS.md',
];

let docsFound = 0;
docs.forEach(doc => {
  if (fs.existsSync(path.join(process.cwd(), doc))) {
    docsFound++;
  }
});

if (docsFound === docs.length) {
  console.log(`[OK] All documentation files present (${docsFound}/${docs.length})`);
} else {
  console.log(`[WARNING] Some documentation missing (${docsFound}/${docs.length})`);
}

// Final summary
console.log('\n' + '='.repeat(50));
console.log('\n[SUMMARY] Verification Summary\n');

if (allChecksPassed) {
  console.log('[SUCCESS] All critical checks passed!');
  console.log('\n[SUCCESS] KashPilot is ready to use!\n');
  console.log('Next steps:');
  console.log('1. Configure .env file (if not done)');
  console.log('2. Run: npm run dev');
  console.log('3. Run: npm run agent (in separate terminal)');
  console.log('4. Open: http://localhost:3000\n');
} else {
  console.log('[WARNING] Some checks failed.');
  console.log('\nPlease fix the issues above and run this script again.\n');
  console.log('For help, see:');
  console.log('- README.md - Complete documentation');
  console.log('- SETUP.md - Quick setup guide');
  console.log('- GitHub Issues - Report problems\n');
}

console.log('[INFO] Documentation: README.md');
console.log('[INFO] Quick help: QUICKREF.md');
console.log('[INFO] Deployment: DEPLOYMENT.md\n');

process.exit(allChecksPassed ? 0 : 1);
