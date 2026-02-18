'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  Mic,
  PlusCircle,
  Settings,
  Zap,
  DollarSign,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'agent'
  content: string
  timestamp: number
  action?: {
    type: 'transaction' | 'analysis' | 'suggestion'
    data: any
  }
}

export default function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [agentTyping, setAgentTyping] = useState(false)

  useEffect(() => {
    // Load initial conversation
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        type: 'agent',
        content: "Hi! I'm your KashPilot AI agent. I can help you with transactions, market analysis, and financial decisions. What would you like to do today?",
        timestamp: Date.now() - 1000 * 60 * 10
      },
      {
        id: '2', 
        type: 'user',
        content: "What's my current portfolio performance?",
        timestamp: Date.now() - 1000 * 60 * 8
      },
      {
        id: '3',
        type: 'agent',
        content: "Your portfolio is performing well! Here's the summary:",
        timestamp: Date.now() - 1000 * 60 * 7,
        action: {
          type: 'analysis',
          data: {
            totalValue: '$2,451.23',
            change24h: '+12.3%',
            bestPerformer: 'CELO (+18.5%)',
            recommendation: 'Consider taking profits on CELO position'
          }
        }
      }
    ]
    setMessages(initialMessages)
  }, [])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setAgentTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = generateAgentResponse(inputMessage)
      setMessages(prev => [...prev, agentResponse])
      setAgentTyping(false)
    }, 2000)
  }

  const generateAgentResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase()
    
    if (input.includes('send') || input.includes('transfer')) {
      return {
        id: Date.now().toString(),
        type: 'agent',
        content: "I can help you send funds. Let me analyze the optimal gas fees and timing for this transaction.",
        timestamp: Date.now(),
        action: {
          type: 'transaction',
          data: {
            suggestedGas: 'Low (2-3 min)',
            estimatedCost: '$0.12',
            confidence: '94%'
          }
        }
      }
    }
    
    if (input.includes('market') || input.includes('price')) {
      return {
        id: Date.now().toString(),
        type: 'agent',
        content: "Here's the current market analysis:",
        timestamp: Date.now(),
        action: {
          type: 'analysis',
          data: {
            celoPrice: '$0.62',
            change24h: '+5.2%',
            volume: '$12.4M',
            sentiment: 'Bullish'
          }
        }
      }
    }

    return {
      id: Date.now().toString(),
      type: 'agent',
      content: "I understand. Let me analyze that for you and provide the best recommendations based on current market conditions.",
      timestamp: Date.now()
    }
  }

  const startVoiceInput = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setInputMessage("Send 0.5 CELO to Alice")
      setIsListening(false)
    }, 2000)
  }

  const renderActionCard = (action: any) => {
    if (action.type === 'analysis') {
      return (
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-blue-600 font-medium mb-1">Portfolio Value</div>
              <div className="text-lg font-bold text-blue-900">{action.data.totalValue}</div>
            </div>
            <div>
              <div className="text-xs text-blue-600 font-medium mb-1">24h Change</div>
              <div className="text-lg font-bold text-green-600">{action.data.change24h}</div>
            </div>
            <div>
              <div className="text-xs text-blue-600 font-medium mb-1">Best Performer</div>
              <div className="text-sm font-medium text-blue-900">{action.data.bestPerformer}</div>
            </div>
            <div>
              <div className="text-xs text-blue-600 font-medium mb-1">AI Suggestion</div>
              <div className="text-xs text-blue-700">{action.data.recommendation}</div>
            </div>
          </div>
        </div>
      )
    }

    if (action.type === 'transaction') {
      return (
        <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Transaction Ready</span>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {action.data.confidence} confidence
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-green-600">Gas Fee:</span>
              <span className="text-green-900 font-medium ml-2">{action.data.estimatedCost}</span>
            </div>
            <div>
              <span className="text-green-600">Speed:</span>
              <span className="text-green-900 font-medium ml-2">{action.data.suggestedGas}</span>
            </div>
          </div>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
            Execute Transaction
          </button>
        </div>
      )
    }

    return null
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const quickActions = [
    { icon: DollarSign, label: 'Send Money', action: 'send' },
    { icon: TrendingUp, label: 'Market Analysis', action: 'market' },
    { icon: Shield, label: 'Security Check', action: 'security' },
    { icon: Clock, label: 'Transaction History', action: 'history' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-black">KashPilot</h1>
              </Link>
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl text-gray-600">AI Agent</h2>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">
                Dashboard
              </Link>
              <button className="p-2 text-gray-600 hover:text-black">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Chat Messages */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'agent' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {message.type === 'agent' ? (
                    <Bot className="h-5 w-5 text-blue-600" />
                  ) : (
                    <User className="h-5 w-5 text-gray-600" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-lg ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.type === 'agent' 
                      ? 'bg-gray-100 text-black' 
                      : 'bg-black text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.action && renderActionCard(message.action)}
                  
                  <div className={`text-xs text-gray-500 mt-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {agentTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(`${action.label.toLowerCase()}`)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 whitespace-nowrap transition"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your AI agent anything..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
              />
              <button
                onClick={startVoiceInput}
                className={`p-2 rounded-full transition ${
                  isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200 text-gray-500'
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-black text-white rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}