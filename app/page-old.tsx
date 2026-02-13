'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Mic, Users, Zap, Shield, TrendingUp, Sparkles, Download, Smartphone } from 'lucide-react'

export default function LandingPage() {
  const [greeting, setGreeting] = useState('Good Evening!')
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning!')
    else if (hour < 18) setGreeting('Good Afternoon!')
    else setGreeting('Good Evening!')

    // PWA install prompt
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }
    
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="border-b border-gray-900 backdrop-blur-xl bg-black/50 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-display font-bold text-white">KashPilot</div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition">
                Features
              </a>
              <a href="#download" className="text-sm font-medium text-gray-400 hover:text-white transition">
                Download
              </a>
              <a href="#how" className="text-sm font-medium text-gray-400 hover:text-white transition">
                How It Works
              </a>
            </div>
            {isInstallable && (
              <button
                onClick={handleInstall}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:from-orange-600 hover:to-pink-600 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Install App
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
        <div className="mb-8">
          <p className="text-xl text-gray-500 mb-4 font-display">{greeting}</p>
        </div>
        
        <h1 className="text-7xl font-display font-bold mb-6 text-balance leading-tight text-white">
          Split bills with<br />your voice.
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto text-balance">
          Autonomous AI agent for voice-enabled bill splitting. Say it, split it, settle it.
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <button 
            onClick={handleInstall}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-pink-600 transition flex items-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            Download App
          </button>
          <Link href="/dashboard" className="px-8 py-4 border border-gray-700 text-gray-300 font-medium rounded-xl hover:border-gray-600 transition">
            Try Web Version
          </Link>
        </div>

        {/* Phone Mockup with Voice Demo */}
        <div className="relative max-w-sm mx-auto" id="download">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[3rem] p-3 shadow-2xl">
            <div className="bg-black rounded-[2.5rem] overflow-hidden border border-gray-900">
              {/* Phone Screen */}
              <div className="aspect-[9/19] flex flex-col">
                {/* Status Bar */}
                <div className="px-8 py-4 flex items-center justify-between text-xs text-gray-400">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="flex-1 px-6 py-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">{greeting}</h2>
                    <p className="text-sm text-gray-500">Ready to split bills</p>
                  </div>

                  {/* Voice Button - Prominent */}
                  <div className="mb-8 flex justify-center">
                    <button className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
                      <Mic className="w-10 h-10 text-white" />
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-400 mb-6">
                    "Split $120 dinner between Alice, Bob, and me"
                  </p>

                  {/* Recent Activity Card */}
                  <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Dinner Split</p>
                          <p className="text-xs text-gray-500">3 people • $120</p>
                        </div>
                      </div>
                      <span className="text-xs text-green-400">Settled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20" id="features">
        <h2 className="text-4xl font-display font-bold text-center mb-4" style={{color: '#ff8c42'}}>
          How It Works
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          The only app that combines voice AI, autonomous agents, and blockchain payments
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl hover:border-orange-500/40 transition backdrop-blur-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Voice Input</h3>
            <p className="text-gray-400">
              Just speak naturally: "Split $120 dinner between me, Alice, and Bob"
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition backdrop-blur-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">AI Agent</h3>
            <p className="text-gray-400">
              Autonomous agent calculates splits, confirms verbally, and executes payment
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl hover:border-green-500/40 transition backdrop-blur-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Instant Settlement</h3>
            <p className="text-gray-400">
              Payments via Celo stablecoins - fast, cheap, and no volatility
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gray-900 rounded-3xl p-12 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-white">24/7</div>
              <div className="text-gray-400">Active Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">100%</div>
              <div className="text-gray-400">Autonomous</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-white">$0</div>
              <div className="text-gray-400">Setup Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">KashPilot</div>
            <div className="text-sm text-gray-500">
              Built on Celo
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
