import { getBalance, sendTransaction } from '../blockchain/celo'
import { recordAgentTransaction } from '../blockchain/erc8004'
import { createX402Payment } from '../blockchain/x402'
import { getAgentDecision, AgentContext } from '../ai/agent'
import { saveTransaction, getRecentTransactions } from './storage'

export interface AgentConfig {
  privateKey: string
  address: string
  mode: 'autopilot' | 'earn' | 'save' | 'protect'
  isActive: boolean
}

export class EconomicAgent {
  private config: AgentConfig
  private isRunning: boolean = false

  constructor(config: AgentConfig) {
    this.config = config
  }

  async start() {
    this.isRunning = true
    console.log('[START] KashPilot Agent started in', this.config.mode, 'mode')
  }

  async stop() {
    this.isRunning = false
    console.log('[PAUSE] KashPilot Agent paused')
  }

  async executeAction() {
    if (!this.isRunning || !this.config.isActive) {
      return { success: false, message: 'Agent is not active' }
    }

    try {
      // Get current context
      const balance = await getBalance(this.config.address)
      const recentTxs = await getRecentTransactions(this.config.address)
      
      const context: AgentContext = {
        balance,
        recentActivity: recentTxs.map(tx => tx.action),
        mode: this.config.mode,
        reputation: 100, // Will be fetched from ERC-8004 contract
      }

      // Get AI decision
      const decision = await getAgentDecision(context)
      
      console.log('🧠 Agent Decision:', decision)

      // Execute decision
      let result

      switch (decision.action) {
        case 'send':
          if (decision.amount && decision.recipient) {
            result = await this.sendMicroPayment(decision.recipient, decision.amount)
          }
          break

        case 'save':
          result = await this.autoSave(decision.amount || '0.01')
          break

        case 'earn':
          result = await this.performEarnAction()
          break

        case 'wait':
          result = { success: true, message: decision.reason }
          break

        default:
          result = { success: true, message: 'No action taken' }
      }

      // Record transaction on-chain
      if (result?.success) {
        await recordAgentTransaction(this.config.privateKey)
      }

      // Save to local storage
      await saveTransaction({
        address: this.config.address,
        action: decision.action,
        amount: decision.amount || '0',
        recipient: decision.recipient || '',
        timestamp: Date.now(),
        reason: decision.reason,
        txHash: result?.txHash || '',
      })

      return {
        success: true,
        decision,
        result,
      }
    } catch (error: any) {
      console.error('Agent execution error:', error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  private async sendMicroPayment(to: string, amount: string) {
    try {
      const txHash = await sendTransaction(this.config.privateKey, to, amount)
      return { success: true, txHash, message: `Sent ${amount} CELO` }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  private async autoSave(amount: string) {
    // In real implementation, this would transfer to a savings contract
    // For now, just log the action
    return { 
      success: true, 
      message: `Saved ${amount} CELO to savings`,
      action: 'save' 
    }
  }

  private async performEarnAction() {
    // Simulate earning action (could be staking, providing liquidity, etc.)
    return {
      success: true,
      message: 'Executed earning strategy',
      action: 'earn',
    }
  }

  async recurringTransfer(to: string, amount: string) {
    return await createX402Payment(this.config.privateKey, to, amount, 'Recurring transfer')
  }

  async agentToAgentPayment(toAgent: string, amount: string) {
    return await createX402Payment(
      this.config.privateKey,
      toAgent,
      amount,
      'Agent-to-agent payment via x402'
    )
  }
}
