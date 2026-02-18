import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filter = searchParams.get('filter') || 'all'
    
    // Mock transaction data for deployment
    let transactions = [
      {
        time: new Date(Date.now() - 3600000).toLocaleString(),
        action: 'earn',
        amount: '50 CELO',
        wallet: '0x1234...5678',
        status: 'completed',
        txHash: '0xabc123def456789',
        timestamp: Date.now() - 3600000
      },
      {
        time: new Date(Date.now() - 7200000).toLocaleString(),
        action: 'save',
        amount: '100 CELO',
        wallet: '0x9876...5432',
        status: 'completed',
        txHash: '0xdef456abc123789',
        timestamp: Date.now() - 7200000
      },
      {
        time: new Date(Date.now() - 10800000).toLocaleString(),
        action: 'send',
        amount: '25 CELO',
        wallet: '0x1111...2222',
        status: 'completed',
        txHash: '0x789abc456def123',
        timestamp: Date.now() - 10800000
      }
    ]
    
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

    return NextResponse.json({
      success: true,
      transactions,
      count: transactions.length,
      filter
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 })
  }
}
