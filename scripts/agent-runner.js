const cron = require('node-cron')
const { EconomicAgent } = require('../lib/agent/economic-agent.ts')
const { saveAgentLog } = require('../lib/agent/storage.ts')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config()

const STATUS_FILE = path.join(process.cwd(), 'data', 'agent-status.json')

function getAgentStatus() {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      const data = fs.readFileSync(STATUS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading agent status:', error)
  }
  
  return {
    isActive: false,
    mode: 'autopilot',
  }
}

async function runAgent() {
  const status = getAgentStatus()
  
  if (!status.isActive) {
    console.log('[INFO] Agent is paused')
    return
  }

  try {
    const agentConfig = {
      privateKey: process.env.AGENT_PRIVATE_KEY || '',
      address: process.env.AGENT_WALLET_ADDRESS || '',
      mode: status.mode || 'autopilot',
      isActive: status.isActive,
    }

    if (!agentConfig.privateKey || !agentConfig.address) {
      console.error('[ERROR] Agent wallet not configured')
      return
    }

    const agent = new EconomicAgent(agentConfig)
    
    console.log(`[INFO] Running KashPilot Agent in ${agentConfig.mode} mode...`)
    
    await saveAgentLog({
      timestamp: Date.now(),
      message: `Agent executing action in ${agentConfig.mode} mode`,
      type: 'info',
    })

    const result = await agent.executeAction()
    
    if (result.success) {
      console.log('[SUCCESS] Agent action executed:', result.decision)
      
      await saveAgentLog({
        timestamp: Date.now(),
        message: `Decision: ${result.decision.action} - ${result.decision.reason}`,
        type: 'decision',
      })
      
      if (result.result) {
        await saveAgentLog({
          timestamp: Date.now(),
          message: result.result.message || 'Action completed',
          type: 'action',
        })
      }
    } else {
      console.error('[ERROR] Agent action failed:', result.error)
      
      await saveAgentLog({
        timestamp: Date.now(),
        message: `Error: ${result.error}`,
        type: 'error',
      })
    }
  } catch (error) {
    console.error('[ERROR] Agent error:', error)
    
    await saveAgentLog({
      timestamp: Date.now(),
      message: `Fatal error: ${error.message}`,
      type: 'error',
    })
  }
}

console.log('[STARTUP] KashPilot Agent Runner started')
console.log('[STARTUP] Cron schedule: Every 3 minutes')

// Run every 3 minutes to build on-chain activity
cron.schedule('*/3 * * * *', async () => {
  console.log('\n[CRON] Triggered at', new Date().toLocaleString())
  await runAgent()
})

// Run immediately on startup
runAgent()

// Keep the process alive
process.on('SIGINT', () => {
  console.log('\n[SHUTDOWN] Shutting down agent runner...')
  process.exit(0)
})
