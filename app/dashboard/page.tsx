'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  Activity, 
  TrendingUp, 
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react'

export default function Dashboard() {
  const [walletData, setWalletData] = useState({
    balance: '0.00',
    address: '',
    isConnected: false,
  })
  
  const [stats, setStats] = useState({
    totalTransactions: 0,
    reputationScore: 100,
    earnings: '0.00',
    agentStatus: 'inactive',
  })

  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    // Load wallet data
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      const data = await response.json()
      
      if (data.success) {
        setWalletData(data.wallet)
        setStats(data.stats)
        setRecentActivity(data.recentActivity)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  const connectWallet = async () => {
    try {
      const response = await fetch('/api/wallet/connect', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.success) {
        setWalletData({
          balance: data.balance,
          address: data.address,
          isConnected: true,
        })
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
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
              <Link href="/dashboard" className="text-sm font-medium text-black">
                Dashboard
              </Link>
              <Link href="/agent" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Agent
              </Link>
              <Link href="/activity" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Activity
              </Link>
              {walletData.isConnected ? (
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-mono">
                  {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor your autonomous economic agent</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Balance Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-accent">+2.4%</span>
            </div>
            <div className="text-3xl font-bold mb-1">{walletData.balance}</div>
            <div className="text-sm text-gray-600">CELO Balance</div>
          </div>

          {/* Agent Status Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className={`w-2 h-2 rounded-full ${stats.agentStatus === 'active' ? 'bg-accent' : 'bg-gray-300'}`} />
            </div>
            <div className="text-2xl font-bold mb-1 capitalize">{stats.agentStatus}</div>
            <div className="text-sm text-gray-600">Agent Status</div>
          </div>

          {/* Transactions Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalTransactions}</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
          </div>

          {/* Reputation Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-accent">↑ {stats.reputationScore}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.reputationScore}</div>
            <div className="text-sm text-gray-600">Reputation Score</div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'send' ? 'bg-red-50' : 'bg-green-50'
                      }`}>
                        {activity.type === 'send' ? (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.reason}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{activity.amount} CELO</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No activity yet</p>
                  <p className="text-sm mt-1">Start your agent to see transactions</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/agent"
                className="block w-full px-4 py-3 bg-black text-white text-center rounded-xl hover:bg-gray-800 transition font-medium"
              >
                Launch Agent
              </Link>
              <button className="w-full px-4 py-3 border border-gray-200 text-center rounded-xl hover:border-gray-300 transition font-medium">
                View Analytics
              </button>
              <button className="w-full px-4 py-3 border border-gray-200 text-center rounded-xl hover:border-gray-300 transition font-medium">
                Transaction History
              </button>
            </div>

            {/* Agent Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-500 mb-3">Agent Info</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode</span>
                  <span className="font-medium">Autopilot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earnings</span>
                  <span className="font-medium text-accent">+{stats.earnings} CELO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-medium">2m ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
