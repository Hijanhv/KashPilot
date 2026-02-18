import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock logs for deployment
    const logs = [
      { timestamp: Date.now(), message: "Agent initialized", type: "info" },
      { timestamp: Date.now() - 3600000, message: "KashPilot ready for hackathon", type: "success" },
      { timestamp: Date.now() - 7200000, message: "Celo integration complete", type: "info" }
    ]
    
    return NextResponse.json({
      success: true,
      logs,
      count: logs.length
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 })
  }
}
