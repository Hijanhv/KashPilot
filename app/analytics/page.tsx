'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  Eye,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  AlertCircle,
  CheckCircle,
  Bot,
  Wallet,
  Activity,
  Shield
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'send' | 'receive' | 'agent_action'
  amount: string
  token: string
  from?: string
  to?: string
  timestamp: number
  status: 'pending' | 'confirmed' | 'failed'
  agentDecision?: string
  txHash?: string
}

interface AgentInsight {
  type: 'opportunity' | 'warning' | 'success' | 'info'
  title: string
  description: string
  action?: string
  confidence: number
}

export default function Analytics() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [insights, setInsights] = useState<AgentInsight[]>([])
  const [stats, setStats] = useState({
    totalValue: '2,451.23',
    totalTransactions: 47,
    agentSuccessRate: 94.7,
    avgDecisionTime: '2.3s',
    profitLoss: '+$342.18',
    gasOptimization: '23%'
  })

  useEffect(() => {
    loadAnalyticsData()
  }, [timeframe])

  const loadAnalyticsData = async () => {
    // Simulate data loading
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'agent_action',
        amount: '0.025',
        token: 'CELO',
        to: '0x742d35Cc6798C9532c63...',
        timestamp: Date.now() - 1000 * 60 * 15,
        status: 'confirmed',
        agentDecision: 'Optimal gas timing detected - saved 12%',
        txHash: '0xabc123...'
      },
      {
        id: '2',
        type: 'receive',
        amount: '1.2',
        token: 'cUSD',
        from: '0x8f3Cf7ad23Cd3CaDbD9735...',
        timestamp: Date.now() - 1000 * 60 * 45,
        status: 'confirmed'
      },
      {
        id: '3',
        type: 'agent_action',
        amount: '0.15',
        token: 'CELO',
        to: 'Agent Pool',
        timestamp: Date.now() - 1000 * 60 * 120,
        status: 'confirmed',
        agentDecision: 'Staking opportunity identified - 12% APY'
      }
    ]

    const mockInsights: AgentInsight[] = [
      {
        type: 'opportunity',
        title: 'Liquidity Pool Opportunity',
        description: 'Agent detected 15.2% APY opportunity in CELO-cUSD pool',
        action: 'Consider allocating 0.5 CELO',
        confidence: 87
      },
      {
        type: 'success',
        title: 'Gas Optimization Success',
        description: 'Saved $12.45 in gas fees this week through smart timing',
        confidence: 100
      },
      {
        type: 'warning',
        title: 'Unusual Network Activity',
        description: 'High congestion detected - delaying non-urgent transactions',
        confidence: 92
      }
    ]

    setTransactions(mockTransactions)
    setInsights(mockInsights)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'success': return <CheckCircle className="h-5 w-5 text-blue-500" />
      default: return <Eye className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-black">KashPilot</h1>
              </Link>
              <h2 className="text-xl text-gray-600">Analytics</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['24h', '7d', '30d'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      timeframe === period
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <Link href="/dashboard" className="text-gray-600 hover:text-black">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-green-600 font-medium">+12.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">${stats.totalValue}</h3>
            <p className="text-sm text-gray-600">Total Value</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-blue-600 font-medium">{stats.totalTransactions}</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{stats.agentSuccessRate}%</h3>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Bot className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-green-600 font-medium">{stats.profitLoss}</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{stats.avgDecisionTime}</h3>
            <p className="text-sm text-gray-600">Avg Decision Time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-green-600 font-medium">-{stats.gasOptimization}</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">Gas Saved</h3>
            <p className="text-sm text-gray-600">This {timeframe}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-black mb-6">AI Agent Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getInsightIcon(insight.type)}
                      <h4 className="font-semibold text-black">{insight.title}</h4>
                    </div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {insight.confidence}% confidence
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{insight.description}</p>
                  {insight.action && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-blue-600 font-medium">{insight.action}</p>
                      <button className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition">
                        Execute
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-6">Agent Activity</h3>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {tx.type === 'agent_action' ? (
                        <Bot className="h-4 w-4 text-blue-500" />
                      ) : tx.type === 'send' ? (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm font-medium text-black">
                        {tx.type === 'agent_action' ? 'Agent Action' :
                         tx.type === 'send' ? 'Sent' : 'Received'}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      tx.status === 'confirmed' ? 'text-green-600' :
                      tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  
                  <div className="text-lg font-bold text-black mb-1">
                    {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                  </div>
                  
                  {tx.agentDecision && (
                    <p className="text-xs text-blue-600 mb-2">{tx.agentDecision}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{formatTimestamp(tx.timestamp)}</span>
                    {tx.txHash && (
                      <span className="text-xs text-gray-400 font-mono">
                        {tx.txHash}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}