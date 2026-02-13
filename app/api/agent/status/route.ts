import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATUS_FILE = path.join(process.cwd(), 'data', 'agent-status.json')

function getAgentStatus() {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      const data = fs.readFileSync(STATUS_FILE, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading agent status:', error)
  }
  
  return {
    isActive: false,
    mode: 'autopilot',
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = getAgentStatus()

    return NextResponse.json({
      success: true,
      ...status,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
