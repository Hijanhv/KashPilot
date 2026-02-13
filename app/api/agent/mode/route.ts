import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const STATUS_FILE = path.join(process.cwd(), 'data', 'agent-status.json')

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function saveAgentStatus(status: any) {
  ensureDataDir()
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2))
}

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

export async function POST(request: NextRequest) {
  try {
    const { mode } = await request.json()
    
    const currentStatus = getAgentStatus()
    const newStatus = {
      ...currentStatus,
      mode,
    }
    
    saveAgentStatus(newStatus)

    return NextResponse.json({
      success: true,
      mode,
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
