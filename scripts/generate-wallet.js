const { generateWallet } = require('../lib/blockchain/celo.ts')

console.log('Generating new Celo wallet...\n')

const wallet = generateWallet()

console.log('Wallet Address:', wallet.address)
console.log('Private Key:', wallet.privateKey)
console.log('Mnemonic:', wallet.mnemonic)
console.log('\nIMPORTANT: Save these credentials securely!')
console.log('Add the private key to your .env file as AGENT_PRIVATE_KEY')
console.log('Add the address to your .env file as AGENT_WALLET_ADDRESS')
console.log('\nFund this wallet with Celo Alfajores testnet tokens:')
console.log('https://faucet.celo.org/alfajores')
