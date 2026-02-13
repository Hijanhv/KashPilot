import { NextRequest, NextResponse } from 'next/server'
import { getAgentThinking } from '@/lib/ai/agent'
import { saveAgentLog } from '@/lib/agent/storage'

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json()
    
    // Get AI response to command
    const thinking = await getAgentThinking(command)
    
    // Save log
    await saveAgentLog({
      timestamp: Date.now(),
      message: `Command: ${command}\nResponse: ${thinking}`,
      type: 'info',
    })

    return NextResponse.json({
      success: true,
      response: thinking,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
