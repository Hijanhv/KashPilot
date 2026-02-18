import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KashPilot - Autonomous AI Financial Agent',
  description: 'Autonomous AI agent for crypto transactions, bill splitting, and financial management on Celo blockchain',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KashPilot',
    startupImage: '/icon-512.png',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
    shortcut: '/icon-192.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  keywords: ['crypto', 'AI', 'autonomous agent', 'Celo', 'DeFi', 'bill splitting', 'Web3'],
  category: 'finance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA and Mobile App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KashPilot" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* iOS Splash Screen */}
        <link rel="apple-touch-startup-image" href="/icon-512.png" />
        
        {/* Safe Area CSS Variables */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --sat: env(safe-area-inset-top);
              --sab: env(safe-area-inset-bottom); 
              --sal: env(safe-area-inset-left);
              --sar: env(safe-area-inset-right);
            }
            
            /* Prevent zoom on focus for mobile */
            input[type="color"],
            input[type="date"],
            input[type="datetime"],
            input[type="datetime-local"],
            input[type="email"],
            input[type="month"],
            input[type="number"],
            input[type="password"],
            input[type="search"],
            input[type="tel"],
            input[type="text"],
            input[type="time"],
            input[type="url"],
            input[type="week"],
            select:focus,
            textarea {
              font-size: 16px !important;
            }
          `
        }} />
      </head>
      <body className="h-full overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
