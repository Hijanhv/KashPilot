'use client';

import { useState, useEffect } from 'react';

interface VoiceLogoProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

export default function VoiceLogo({ size = 120, isActive = false, className = '' }: VoiceLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow ring */}
      <div 
        className={`absolute inset-0 rounded-full ${isActive ? 'animate-pulse' : ''}`}
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(255,107,53,0.1) 50%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Main orb */}
      <div 
        className={`absolute inset-0 rounded-full flex items-center justify-center ${isActive ? 'scale-105' : 'scale-100'} transition-transform duration-300`}
        style={{
          background: 'radial-gradient(circle at 40% 35%, #FFB366 0%, #FF8C42 30%, #FF6B35 60%, #E85A2B 100%)',
          boxShadow: '0 20px 60px rgba(255, 107, 53, 0.4), inset 0 -10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Highlight */}
        <div 
          className="absolute top-[20%] left-[25%] w-[40%] h-[30%] rounded-full opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          }}
        />
        
        {/* Voice wave bars */}
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`bg-white rounded-full ${isActive ? 'animate-voice-wave' : ''}`}
              style={{
                width: 3,
                height: i === 3 ? size * 0.35 : i === 2 || i === 4 ? size * 0.28 : size * 0.2,
                animationDelay: `${i * 100}ms`,
                opacity: i === 3 ? 1 : 0.9,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating particles */}
      {isActive && (
        <div className="absolute inset-0">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const distance = size * 0.65;
            const x = Math.cos(rad) * distance + size / 2;
            const y = Math.sin(rad) * distance + size / 2;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-float"
                style={{
                  left: x,
                  top: y,
                  animationDelay: `${i * 200}ms`,
                  opacity: 0.6,
                }}
              />
            );
          })}
        </div>
      )}
      
      <style jsx>{`
        @keyframes voice-wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.6);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(0, -10px);
            opacity: 1;
          }
        }
        
        .animate-voice-wave {
          animation: voice-wave 0.8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
