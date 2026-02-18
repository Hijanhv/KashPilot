import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo
let agentState = {
  isActive: true,
  mode: 'autopilot',
  lastToggle: Date.now()
}

export async function POST(request: NextRequest) {
  try {
    const { action, mode } = await request.json()
    
    if (action === 'toggle') {
      agentState.isActive = !agentState.isActive
      agentState.lastToggle = Date.now()
    }
    
    if (mode) {
      agentState.mode = mode
    }

    return NextResponse.json({
      success: true,
      status: agentState,
      message: `Agent ${agentState.isActive ? 'activated' : 'deactivated'}${mode ? ` in ${mode} mode` : ''}`
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    status: agentState
  })
}
