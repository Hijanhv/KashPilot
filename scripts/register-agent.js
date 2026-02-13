const { registerAgent } = require('../lib/blockchain/erc8004.ts')
require('dotenv').config()

async function register() {
  const privateKey = process.env.AGENT_PRIVATE_KEY
  const agentId = `kashpilot-${Date.now()}`

  if (!privateKey) {
    console.error('[ERROR] AGENT_PRIVATE_KEY not found in .env')
    return
  }

  console.log('Registering agent with ERC-8004...')
  console.log('Agent ID:', agentId)

  try {
    const result = await registerAgent(privateKey, agentId)
    
    if (result.success) {
      console.log('[SUCCESS] Agent registered successfully!')
      console.log('Transaction Hash:', result.txHash)
      console.log('\nAdd this to your .env:')
      console.log(`AGENT_ID=${agentId}`)
    } else {
      console.error('[ERROR] Registration failed:', result.error)
    }
  } catch (error) {
    console.error('[ERROR]', error.message)
  }
}

register()
