import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock agent status for deployment
    const status = {
      isActive: true,
      mode: 'autopilot',
      balance: '1000 CELO',
      reputation: 95,
      lastActivity: Date.now(),
      totalTransactions: 42,
      earnings: '500 CELO'
    }

    return NextResponse.json({
      success: true,
      ...status,
      timestamp: Date.now()
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 })
  }
}
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
