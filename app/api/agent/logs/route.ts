import { NextRequest, NextResponse } from 'next/server'
import { getRecentLogs } from '@/lib/agent/storage'

export async function GET(request: NextRequest) {
  try {
    const logs = await getRecentLogs(50)
    
    return NextResponse.json({
      success: true,
      logs,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
