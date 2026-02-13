'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mic, Users, ArrowLeft, Check, Clock } from 'lucide-react'

export default function SplitBillPage() {
  const [greeting, setGreeting] = useState('Good Evening!')
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [splitResult, setSplitResult] = useState<any>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning!')
    else if (hour < 18) setGreeting('Good Afternoon!')
    else setGreeting('Good Evening!')
  }, [])

  const startVoiceInput = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript("Split $120 dinner between Alice, Bob, and me")
      setIsListening(false)
      processVoiceCommand()
    }, 2000)
  }

  const processVoiceCommand = () => {
    setTimeout(() => {
      setSplitResult({
        total: 120,
        people: ['You', 'Alice', 'Bob'],
        perPerson: 40,
        status: 'pending'
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="px-6 py-8 border-b border-gray-900">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <img src="/logo.svg" alt="KashPilot" className="w-8 h-8" />
          </Link>
          <div className="text-xs text-gray-500">9:41</div>
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">{greeting}</h1>
        <p className="text-gray-500">Ready to split bills</p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        {/* Voice Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={startVoiceInput}
            disabled={isListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isListening
                ? 'bg-gradient-to-r from-orange-600 to-pink-600 animate-pulse scale-110'
                : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105'
            }`}
          >
            <Mic className="w-12 h-12 text-white" />
          </button>
        </div>

        {/* Status */}
        {isListening && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Listening...</span>
            </div>
          </div>
        )}

        {/* Transcript */}
        {transcript && (
          <div className="mb-8 p-4 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">You said:</p>
            <p className="text-white">{transcript}</p>
          </div>
        )}

        {/* Split Result */}
        {splitResult && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Split Details</h3>
                <div className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                  {splitResult.status === 'pending' ? 'Pending' : 'Settled'}
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  ${splitResult.total}
                </div>
                <div className="text-sm text-gray-500">
                  {splitResult.people.length} people • ${splitResult.perPerson} each
                </div>
              </div>

              {splitResult.people.map((person: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-t border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">{person}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">${splitResult.perPerson}</span>
                    {index > 0 && (
                      <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-2xl hover:from-orange-600 hover:to-pink-600 transition">
              Request Payments
            </button>
          </div>
        )}

        {/* Recent Splits */}
        {!splitResult && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            
            {[
              { name: 'Dinner Split', people: 3, amount: 120, status: 'settled' },
              { name: 'Uber Ride', people: 2, amount: 45, status: 'settled' },
              { name: 'Groceries', people: 4, amount: 85, status: 'pending' },
            ].map((split, index) => (
              <div
                key={index}
                className="p-4 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl hover:border-gray-700 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{split.name}</p>
                      <p className="text-sm text-gray-500">
                        {split.people} people • ${split.amount}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    split.status === 'settled'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {split.status === 'settled' ? 'Settled' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-gray-900 px-6 py-4">
        <div className="flex items-center justify-around">
          <Link href="/split" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-white">Split</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <Mic className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">Agent</span>
          </Link>
          <Link href="/activity" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xs text-gray-400">History</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
