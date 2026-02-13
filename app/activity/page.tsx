'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react'

export default function ActivityPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'payments' | 'savings' | 'agent'>('all')

  useEffect(() => {
    fetchTransactions()
  }, [filter])

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?filter=${filter}`)
      const data = await response.json()
      
      if (data.success) {
        setTransactions(data.transactions)
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
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
              <Link href="/agent" className="text-sm font-medium text-gray-700 hover:text-black transition">
                Agent
              </Link>
              <Link href="/activity" className="text-sm font-medium text-black">
                Activity
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Transaction Activity</h1>
            <p className="text-gray-600">Complete history of agent actions</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
            >
              <option value="all">All Transactions</option>
              <option value="payments">Payments</option>
              <option value="savings">Savings</option>
              <option value="agent">Agent Actions</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Wallet</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">TX Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {tx.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tx.type === 'send' ? 'bg-red-50' : 'bg-green-50'
                        }`}>
                          {tx.type === 'send' ? (
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{tx.action}</div>
                          <div className="text-xs text-gray-500">{tx.reason}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{tx.amount} CELO</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-gray-600">
                        {tx.wallet}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {tx.status === 'completed' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            <span className="text-sm text-accent font-medium">Completed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-500 font-medium">Failed</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {tx.txHash ? (
                        <a
                          href={`https://alfajores.celoscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline font-mono"
                        >
                          {tx.txHash.slice(0, 10)}...
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
