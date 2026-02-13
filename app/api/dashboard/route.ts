import { NextRequest, NextResponse } from 'next/server'
import { getBalance } from '@/lib/blockchain/celo'
import { getAgentInfo } from '@/lib/blockchain/erc8004'
import { getAllTransactions } from '@/lib/agent/storage'

export async function GET(request: NextRequest) {
  try {
    const agentAddress = process.env.AGENT_WALLET_ADDRESS || ''
    
    if (!agentAddress) {
      return NextResponse.json({
        success: false,
        error: 'Agent wallet not configured',
      })
    }

    // Get wallet balance
    const balance = await getBalance(agentAddress)
    
    // Get agent info from ERC-8004 contract
    const agentInfo = await getAgentInfo(agentAddress)
    
    // Get recent transactions
    const transactions = await getAllTransactions(agentAddress)
    
    // Calculate stats
    const totalTransactions = transactions.length
    const earnings = transactions
      .filter(tx => tx.action === 'earn')
      .reduce((sum, tx) => sum + parseFloat(tx.amount || '0'), 0)
    
    // Get recent activity
    const recentActivity = transactions.slice(0, 10).map(tx => ({
      action: tx.action,
      amount: tx.amount,
      reason: tx.reason,
      type: tx.action === 'send' ? 'send' : 'receive',
      time: new Date(tx.timestamp).toLocaleString(),
    }))

    return NextResponse.json({
      success: true,
      wallet: {
        balance,
        address: agentAddress,
        isConnected: true,
      },
      stats: {
        totalTransactions,
        reputationScore: agentInfo?.reputationScore || 100,
        earnings: earnings.toFixed(4),
        agentStatus: 'active',
      },
      recentActivity,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
