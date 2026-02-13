import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KashPilot - Voice Split Bills & AI Payments',
  description: 'Autonomous AI agent for voice-enabled bill splitting. Say it, split it, settle it.',
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'KashPilot',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  )
}
