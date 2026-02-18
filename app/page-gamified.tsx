"use client";

import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import Link from "next/link";

// Gamified sound effects
const playSound = (type: 'click' | 'success' | 'coin' | 'level' | 'power') => {
  if (typeof window !== 'undefined') {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const frequencies: Record<string, number[]> = {
      click: [800, 600],
      success: [523, 659, 784],
      coin: [1047, 1319],
      level: [659, 784, 880, 1047],
      power: [1320, 1760, 2093]
    };
    
    frequencies[type].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
      
      oscillator.start(audioContext.currentTime + i * 0.1);
      oscillator.stop(audioContext.currentTime + i * 0.1 + 0.3);
    });
  }
};

export default function GameHome() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [gameLevel, setGameLevel] = useState(1);
  const [coins, setCoins] = useState(42);
  const [showHackathonInfo, setShowHackathonInfo] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    playSound('power');
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setCoins(coins + 50);
      setAchievements([...achievements, 'PWA Installed']);
    }
  };

  const earnCoins = (amount: number) => {
    playSound('coin');
    setCoins(coins + amount);
    if (coins + amount > gameLevel * 100) {
      setGameLevel(gameLevel + 1);
      playSound('level');
      setAchievements([...achievements, `Level ${gameLevel + 1} Unlocked`]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-800 relative overflow-hidden">
      {/* Floating Lego Blocks Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 15}).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div 
              className="w-8 h-8 rounded-lg shadow-lg border-2 border-white/20 relative"
              style={{backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][i % 6]}}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Gamified Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-white/20 relative">
              <span className="text-white font-bold text-xl">K</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse border border-white/50"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">KashPilot</h1>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-cyan-300 font-bold">Level {gameLevel}</span>
                <span className="text-yellow-400 font-bold">🪙 {coins}</span>
                <span className="text-green-400 text-xs">🏆 {achievements.length}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-sm font-medium text-white/80">
              <button 
                onClick={() => {
                  playSound('click');
                  earnCoins(2);
                }} 
                className="hover:text-cyan-400 transition-all transform hover:scale-105"
              >
                🎯 Vision
              </button>
              <Link 
                href="/dashboard" 
                onClick={() => earnCoins(3)}
                className="hover:text-cyan-400 transition-all transform hover:scale-105"
              >
                📊 Dashboard
              </Link>
              <Link 
                href="/chat" 
                onClick={() => earnCoins(5)}
                className="hover:text-cyan-400 transition-all transform hover:scale-105"
              >
                🤖 AI Chat
              </Link>
            </div>
            
            <button
              onClick={() => {
                playSound('click');
                setShowHackathonInfo(!showHackathonInfo);
              }}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 border-2 border-white/20 shadow-lg"
            >
              🏆 Hackathon
            </button>
          </div>
        </div>
      </nav>

      {/* Hackathon Info Banner */}
      {showHackathonInfo && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 border-b border-orange-300 animate-slideDown">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-bold mb-2 flex items-center">
              🏆 Celo "Build Agents for Real World" Hackathon Submission
              <button 
                onClick={() => {
                  playSound('click');
                  setShowHackathonInfo(false);
                }}
                className="ml-auto text-white hover:bg-white/20 px-2 py-1 rounded"
              >
                ✕
              </button>
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 p-3 rounded-lg border-2 border-white/20">
                <h4 className="font-semibold mb-1">📝 Karma Project</h4>
                <a 
                  href="https://www.karmahq.xyz/community/celo?programId=1044" 
                  target="_blank"
                  className="text-orange-200 hover:text-white underline"
                  onClick={() => earnCoins(10)}
                >
                  Register on Karma →
                </a>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border-2 border-white/20">
                <h4 className="font-semibold mb-1">🆔 ERC-8004 AgentID</h4>
                <p className="text-orange-200">Identity: Deploying...</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border-2 border-white/20">
                <h4 className="font-semibold mb-1">🔐 SelfClaw Verify</h4>
                <a 
                  href="https://selfclaw.app/?v=1" 
                  className="text-orange-200 hover:text-white underline" 
                  target="_blank"
                  onClick={() => earnCoins(15)}
                >
                  Verify Agent →
                </a>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border-2 border-white/20">
                <h4 className="font-semibold mb-1">🔥 Molthunt</h4>
                <a 
                  href="https://www.molthunt.com/" 
                  className="text-orange-200 hover:text-white underline" 
                  target="_blank"
                  onClick={() => earnCoins(20)}
                >
                  Register Agent →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating Achievement Badges */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
            🤖
          </div>
          
          <h2 className="text-7xl font-bold mb-8 text-white leading-tight relative">
            An AI that handles
            <br />
            your <span className="italic bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Dynamic Money</span>
            <div className="absolute -right-8 top-0 text-3xl animate-pulse">✨</div>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-light">
            Set it and forget it. Your money moves on autopilot while you level up! 🚀
          </p>

          {/* Gamified Stats */}
          <div className="flex justify-center space-x-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-cyan-400/30 transform hover:scale-105 transition-all cursor-pointer"
                 onClick={() => earnCoins(1)}>
              <div className="text-cyan-400 text-2xl font-bold">🎯 Level {gameLevel}</div>
              <div className="text-white/80 text-sm">AI Pilot Mastery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-400/30 transform hover:scale-105 transition-all cursor-pointer"
                 onClick={() => earnCoins(1)}>
              <div className="text-yellow-400 text-2xl font-bold">🪙 {coins}</div>
              <div className="text-white/80 text-sm">Smart Coins</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-green-400/30 transform hover:scale-105 transition-all cursor-pointer"
                 onClick={() => earnCoins(1)}>
              <div className="text-green-400 text-2xl font-bold">🏆 {achievements.length}</div>
              <div className="text-white/80 text-sm">Achievements</div>
            </div>
          </div>

          {/* Phone Mockup - Gamified */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-[3rem] p-4 shadow-2xl border-4 border-white/30 relative">
              {/* Lego studs on phone frame */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              </div>
              
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar - Gamified */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 flex justify-between items-center text-xs text-white">
                  <span className="font-bold">🎮 4:31</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-yellow-300">⚡ 100%</span>
                    <div className="w-4 h-3 border-2 border-white rounded-sm bg-green-400"></div>
                  </div>
                </div>
                
                {/* App Content - Gamified */}
                <div className="px-6 py-12 bg-gradient-to-br from-blue-50 to-purple-50 min-h-[600px]">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white/50 relative">
                      <Play className="w-10 h-10 text-white" fill="white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">
                        🎯
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">🎮 Watch the AI Agent in Action</p>
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      $100 Dinner Split Quest
                    </h3>
                  </div>

                  {/* Voice Interaction Demo - Gamified */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-4 border-2 border-orange-200 relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-orange-400 rounded-full border-2 border-white flex items-center justify-center text-xs">
                        🎤
                      </div>
                      <p className="text-sm text-orange-600 mb-1 font-bold">Player speaks:</p>
                      <p className="text-gray-900 font-medium">"Split $100 between Alice, Bob, and me equally"</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border-2 border-blue-200 relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs">
                        🤖
                      </div>
                      <p className="text-sm text-blue-600 mb-1 font-bold">AI Agent responds:</p>
                      <p className="text-gray-900 font-medium">"Quest accepted! Each person owes $33.33. Requesting payment now..."</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border-2 border-green-200 relative">
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-xs">
                        ✅
                      </div>
                      <p className="text-sm text-green-600 mb-1 font-bold">Quest Complete:</p>
                      <p className="text-gray-900 font-medium">"Alice paid ✓ Bob paid ✓ Mission accomplished! +50 coins earned!"</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white/30">
                      <span>🎮 All on-chain, autonomous & gamified!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Lego Block Style */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 text-white flex items-center justify-center">
              🧠 Intelligent Features
              <div className="ml-3 flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded border border-white/30"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded border border-white/30"></div>
                <div className="w-3 h-3 bg-green-400 rounded border border-white/30"></div>
              </div>
            </h3>
            <p className="text-xl text-white/80">
              Level up your financial game with AI-powered features! 🚀
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI Agent Chat",
                description: "Conversational AI that understands your financial needs and executes commands",
                href: "/chat",
                color: "from-purple-500 to-pink-500",
                level: "Pro",
                coins: 25,
                achievement: "Chat Master"
              },
              {
                icon: "📊",
                title: "Smart Analytics", 
                description: "Advanced insights into your agent's performance and optimization opportunities",
                href: "/analytics",
                color: "from-blue-500 to-cyan-500",
                level: "Advanced",
                coins: 30,
                achievement: "Data Wizard"
              },
              {
                icon: "📱",
                title: "Multi-Device Sync",
                description: "Seamless synchronization across all your devices with end-to-end encryption", 
                href: "/devices",
                color: "from-green-500 to-teal-500",
                level: "Elite",
                coins: 35,
                achievement: "Sync Champion"
              },
              {
                icon: "🎤",
                title: "Voice Control",
                description: "Advanced voice commands for hands-free financial management",
                href: "#voice",
                color: "from-orange-500 to-red-500",
                level: "Expert",
                coins: 20,
                achievement: "Voice Commander"
              },
              {
                icon: "📈",
                title: "Agent Dashboard",
                description: "Comprehensive overview of your AI agent's activities and performance",
                href: "/dashboard",
                color: "from-indigo-500 to-purple-500",
                level: "Master",
                coins: 40,
                achievement: "Dashboard Lord"
              },
              {
                icon: "📲",
                title: "PWA Mobile",
                description: "Install as a native app with offline capabilities and push notifications",
                href: "#pwa",
                color: "from-pink-500 to-rose-500",
                level: "Premium",
                coins: 50,
                achievement: "Mobile Master"
              }
            ].map((feature, index) => (
              <Link 
                key={index} 
                href={feature.href}
                className="block"
                onClick={() => {
                  playSound('success');
                  earnCoins(feature.coins);
                  if (!achievements.includes(feature.achievement)) {
                    setAchievements([...achievements, feature.achievement]);
                  }
                }}
              >
                <div className={`bg-gradient-to-br ${feature.color} p-6 rounded-xl text-white hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-white/20 relative overflow-hidden group cursor-pointer`}>
                  {/* Lego studs */}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  </div>
                  
                  {/* Level badge */}
                  <div className="absolute top-2 left-2 bg-black/30 text-xs px-2 py-1 rounded-full border border-white/30 font-bold">
                    {feature.level}
                  </div>
                  
                  <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-white/90 leading-relaxed mb-3 text-sm">{feature.description}</p>
                  
                  {/* Rewards */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70 font-medium">Click to unlock</span>
                    <div className="bg-yellow-400/20 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-400/30 font-bold">
                      +{feature.coins} 🪙
                    </div>
                  </div>
                  
                  {/* Achievement unlock notification */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                      🏆 {feature.achievement}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* PWA Install Button - Gamified */}
          {deferredPrompt && (
            <div className="text-center mt-12">
              <button
                onClick={handleInstall}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-bold transition-all transform hover:scale-105 border-4 border-white/20 shadow-2xl relative"
              >
                <span className="absolute -top-2 -left-2 text-2xl animate-bounce">🚀</span>
                📲 Install KashPilot PWA (+50 🪙)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Achievement Notifications */}
      {achievements.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {achievements.slice(-3).map((achievement, index) => (
            <div key={achievement} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-bold shadow-lg border-2 border-white/30 animate-slideIn">
              🏆 {achievement} Unlocked!
            </div>
          ))}
        </div>
      )}
    </main>
  );
}