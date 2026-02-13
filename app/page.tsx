'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pink-50/90 backdrop-blur-md border-b border-pink-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-['Satisfy'] text-black font-bold tracking-wide">KashPilot</h1>
            <img src="/koala.png" alt="Koala Logo" className="w-12 h-12 rounded-lg" />
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-700">
            <a href="#vision" className="hover:text-[#ff6b35] transition">Vision</a>
            <a href="#demo" className="hover:text-[#ff6b35] transition">Demo</a>
            <a href="/split" className="hover:text-[#ff6b35] transition">Try It</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-7xl font-['Crimson_Text'] font-bold mb-8 text-[#1a1a1a] leading-tight">
            An AI that handles
            <br />
            your <span className="italic">Dynamic Money</span>.
          </h2>
          <p className="text-xl text-[#666666] max-w-2xl mx-auto mb-12 font-light">
            Set it and forget it. Your money moves on autopilot.
          </p>

          {/* Phone Mockup with Demo */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-gray-50 rounded-[3rem] p-4 shadow-2xl border border-gray-200">
              <div className="bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-white px-6 py-3 flex justify-between items-center text-xs text-gray-600">
                  <span className="font-medium">4:31</span>
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-3 border-2 border-gray-600 rounded-sm relative">
                      <div className="absolute right-[-2px] top-1/2 transform -translate-y-1/2 w-1 h-1 bg-gray-600"></div>
                    </div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="px-6 py-12 bg-white min-h-[600px]">
                  <div className="text-center mb-12">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Play className="w-10 h-10 text-white" fill="white" />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Watch me split a</p>
                    <h3 className="text-3xl font-['Crimson_Text'] font-bold text-gray-900 mb-8">$100 dinner bill</h3>
                  </div>

                  {/* Voice Interaction Demo */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                      <p className="text-sm text-gray-600 mb-1">You speak:</p>
                      <p className="text-gray-900 font-medium">"Split $100 between Alice, Bob, and me equally"</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <p className="text-sm text-gray-600 mb-1">Agent responds:</p>
                      <p className="text-gray-900 font-medium">"Got it. Each person owes $33.33. Requesting payment now."</p>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                      <p className="text-sm text-gray-600 mb-1">5 seconds later:</p>
                      <p className="text-gray-900 font-medium">"Alice paid. Bob paid. Settled."</p>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    All on-chain, all autonomous, all hands-free.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-5xl font-['Crimson_Text'] font-bold mb-8 text-[#1a1a1a]">
            creating human-like, safe,
            <br />and the future of payments.
          </h3>
          <p className="text-xl text-[#999999] mb-16 font-light">
            Say it. Split it. Settle it. Your money moves at the speed of conversation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
            <p className="text-lg text-[#1a1a1a] leading-relaxed mb-8">
              We are building the future where money moves as naturally as conversation. No more splitting bills manually, no more awkward payment requests, no more waiting for friends to pay you back.
            </p>
            <p className="text-lg text-[#1a1a1a] leading-relaxed mb-8">
              <span className="font-semibold">"Just speak, and your AI agent handles everything.</span> From splitting dinner bills to managing group expenses, KashPilot makes payments effortless through voice. Our mission is to make everyone comfortable with voice-powered money, from tech-savvy millennials to your grandparents." ~ Janhavi Chavada
            </p>
            <p className="text-lg text-[#1a1a1a] leading-relaxed">
              Built on Celo blockchain with autonomous AI agents. Secured by ERC-8004 identity protocol. Powered by your voice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl font-['Crimson_Text'] font-bold mb-8 text-[#1a1a1a]">
            Ready to experience
            <br />money on autopilot?
          </h3>
          {deferredPrompt ? (
            <button
              onClick={handleInstall}
              className="px-12 py-4 bg-[#ff6b35] text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition shadow-lg"
            >
              Download App
            </button>
          ) : (
            <a
              href="/split"
              className="inline-block px-12 py-4 bg-[#ff6b35] text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition shadow-lg"
            >
              Try Demo
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-3xl font-['Satisfy'] text-black font-bold">KashPilot</h4>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#vision" className="hover:text-[#ff6b35] transition">Vision</a>
              <a href="https://github.com/Hijanhv/KashPilot" className="hover:text-[#ff6b35] transition">GitHub</a>
              <a href="/agent" className="hover:text-[#ff6b35] transition">Dashboard</a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 KashPilot. Built on Celo blockchain with ERC-8004.</p>
            <p className="mt-2">By Janhavi Chavada</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
