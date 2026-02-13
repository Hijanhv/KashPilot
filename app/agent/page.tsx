'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Play, 
  Pause, 
  Zap, 
  TrendingUp, 
  Shield,
  Sparkles,
  Brain,
  Activity
} from 'lucide-react'

export default function AgentPage() {
  const [agentStatus, setAgentStatus] = useState<'active' | 'paused'>('paused')
  const [mode, setMode] = useState<'autopilot' | 'earn' | 'save' | 'protect'>('autopilot')
  const [thinkingLogs, setThinkingLogs] = useState<any[]>([])
  const [command, setCommand] = useState('')

  useEffect(() => {
    // Load agent status and logs
    fetchAgentStatus()
    
    // Poll for new logs
    const interval = setInterval(fetchLogs, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchAgentStatus = async () => {
    try {
      const response = await fetch('/api/agent/status')
      const data = await response.json()
      
      if (data.success) {
        setAgentStatus(data.isActive ? 'active' : 'paused')
        setMode(data.mode)
      }
    } catch (error) {
      console.error('Failed to fetch agent status:', error)
    }
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/agent/logs')
      const data = await response.json()
      
      if (data.success) {
        setThinkingLogs(data.logs)
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    }
  }

  const toggleAgent = async () => {
    try {
      const response = await fetch('/api/agent/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: agentStatus === 'active' ? 'pause' : 'start' }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAgentStatus(data.isActive ? 'active' : 'paused')
      }
    } catch (error) {
      console.error('Failed to toggle agent:', error)
    }
  }

  const changeMode = async (newMode: typeof mode) => {
    setMode(newMode)
    
    try {
      await fetch('/api/agent/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode }),
      })
    } catch (error) {
      console.error('Failed to change mode:', error)
    }
  }

  const executeCommand = async () => {
    if (!command.trim()) return
    
    try {
      const response = await fetch('/api/agent/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setCommand('')
        fetchLogs()
      }
    } catch (error) {
      console.error('Failed to execute command:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              KashPilot
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Dashboard
              </Link>
              <Link href="/agent" className="text-sm font-medium text-black">
                Agent
              </Link>
              <Link href="/activity" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Activity
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">KashPilot Agent</h1>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${agentStatus === 'active' ? 'bg-accent animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium capitalize">{agentStatus}</span>
            </div>
          </div>
          <p className="text-gray-600">Command your autonomous economic AI agent</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Command Input */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6" />
                <h2 className="text-xl font-bold">Tell KashPilot what to do...</h2>
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  placeholder="e.g., Send 0.01 CELO to savings, Analyze my wallet..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 transition"
                />
                <button
                  onClick={executeCommand}
                  className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium"
                >
                  Execute
                </button>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Agent Control</h3>
              <div className="flex gap-3">
                <button
                  onClick={toggleAgent}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                    agentStatus === 'active'
                      ? 'bg-gray-100 hover:bg-gray-200'
                      : 'bg-accent text-white hover:bg-accent-hover'
                  }`}
                >
                  {agentStatus === 'active' ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pause Agent
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Agent
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Agent Mode</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => changeMode('autopilot')}
                  className={`p-4 rounded-xl border-2 transition ${
                    mode === 'autopilot'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Sparkles className="w-6 h-6 mb-2" />
                  <div className="font-semibold">Autopilot</div>
                  <div className="text-xs text-gray-600 mt-1">Balanced strategy</div>
                </button>

                <button
                  onClick={() => changeMode('earn')}
                  className={`p-4 rounded-xl border-2 transition ${
                    mode === 'earn'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <div className="font-semibold">Earn Mode</div>
                  <div className="text-xs text-gray-600 mt-1">Maximize earnings</div>
                </button>

                <button
                  onClick={() => changeMode('save')}
                  className={`p-4 rounded-xl border-2 transition ${
                    mode === 'save'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Zap className="w-6 h-6 mb-2" />
                  <div className="font-semibold">Save Mode</div>
                  <div className="text-xs text-gray-600 mt-1">Accumulate funds</div>
                </button>

                <button
                  onClick={() => changeMode('protect')}
                  className={`p-4 rounded-xl border-2 transition ${
                    mode === 'protect'
                      ? 'border-black bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <Shield className="w-6 h-6 mb-2" />
                  <div className="font-semibold">Protection</div>
                  <div className="text-xs text-gray-600 mt-1">Conservative mode</div>
                </button>
              </div>
            </div>
          </div>

          {/* Thinking Logs Panel */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5" />
              <h2 className="text-lg font-bold">Agent Thinking</h2>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {thinkingLogs.length > 0 ? (
                thinkingLogs.map((log, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-sm ${
                      log.type === 'decision' 
                        ? 'bg-blue-50 border border-blue-100'
                        : log.type === 'action'
                        ? 'bg-green-50 border border-green-100'
                        : log.type === 'error'
                        ? 'bg-red-50 border border-red-100'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="font-medium mb-1">{log.message}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Agent is idle</p>
                  <p className="text-xs mt-1">Start the agent to see activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
