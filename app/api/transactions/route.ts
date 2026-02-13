import { NextRequest, NextResponse } from 'next/server'
import { getAllTransactions } from '@/lib/agent/storage'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    const agentAddress = process.env.AGENT_WALLET_ADDRESS || ''
    
    let transactions = await getAllTransactions(agentAddress)
    
    // Apply filter
    if (filter !== 'all') {
      if (filter === 'payments') {
        transactions = transactions.filter(tx => tx.action === 'send')
      } else if (filter === 'savings') {
        transactions = transactions.filter(tx => tx.action === 'save')
      } else if (filter === 'agent') {
        transactions = transactions.filter(tx => ['earn', 'send', 'save'].includes(tx.action))
      }
    }
    
    // Format for display
    const formattedTransactions = transactions.map(tx => ({
      time: new Date(tx.timestamp).toLocaleString(),
      action: tx.action,
      amount: tx.amount,
      wallet: tx.recipient ? `${tx.recipient.slice(0, 6)}...${tx.recipient.slice(-4)}` : '-',
      status: tx.txHash ? 'completed' : 'pending',
      txHash: tx.txHash,
      reason: tx.reason,
      type: tx.action === 'send' ? 'send' : 'receive',
    }))

    return NextResponse.json({
      success: true,
      transactions: formattedTransactions,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      transactions: [],
    })
  }
}
