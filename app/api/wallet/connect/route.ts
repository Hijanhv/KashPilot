import { NextRequest, NextResponse } from 'next/server'
import { getBalance } from '@/lib/blockchain/celo'

export async function POST(request: NextRequest) {
  try {
    const agentAddress = process.env.AGENT_WALLET_ADDRESS
    
    if (!agentAddress) {
      return NextResponse.json({
        success: false,
        error: 'Wallet not configured',
      })
    }

    const balance = await getBalance(agentAddress)

    return NextResponse.json({
      success: true,
      address: agentAddress,
      balance,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
