'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Smartphone, 
  Laptop, 
  Tablet,
  Globe,
  Scan,
  Copy,
  Download,
  ExternalLink,
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react'

interface DeviceConnection {
  id: string
  name: string
  type: 'mobile' | 'desktop' | 'tablet'
  lastActive: number
  status: 'connected' | 'disconnected'
  location: string
  browser: string
}

export default function MultiDevice() {
  const [connections, setConnections] = useState<DeviceConnection[]>([])
  const [qrCode, setQrCode] = useState('')
  const [syncCode, setSyncCode] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadDeviceConnections()
    generateSyncCodes()
  }, [])

  const loadDeviceConnections = () => {
    const mockConnections: DeviceConnection[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        type: 'mobile',
        lastActive: Date.now() - 1000 * 60 * 5,
        status: 'connected',
        location: 'San Francisco, CA',
        browser: 'Safari'
      },
      {
        id: '2', 
        name: 'MacBook Pro',
        type: 'desktop',
        lastActive: Date.now() - 1000 * 60 * 1,
        status: 'connected',
        location: 'San Francisco, CA',
        browser: 'Chrome'
      },
      {
        id: '3',
        name: 'iPad Air',
        type: 'tablet', 
        lastActive: Date.now() - 1000 * 60 * 60 * 2,
        status: 'disconnected',
        location: 'San Francisco, CA',
        browser: 'Safari'
      }
    ]
    setConnections(mockConnections)
  }

  const generateSyncCodes = () => {
    // Generate QR code data and sync code
    const baseUrl = window.location.origin
    const deviceId = Math.random().toString(36).substring(7)
    setQrCode(`${baseUrl}/sync?device=${deviceId}`)
    setSyncCode(deviceId.toUpperCase())
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-5 w-5" />
      case 'desktop': return <Laptop className="h-5 w-5" />
      case 'tablet': return <Tablet className="h-5 w-5" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  const formatLastActive = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 24) return 'More than a day ago'
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const disconnectDevice = (deviceId: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === deviceId 
        ? { ...conn, status: 'disconnected' as const }
        : conn
    ))
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
              <h2 className="text-xl text-gray-600">Multi-Device Sync</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">
                Dashboard
              </Link>
              <button
                onClick={() => setShowQR(!showQR)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Scan className="h-4 w-4" />
                Add Device
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Device Section */}
        {showQR && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-black mb-2">Connect New Device</h3>
              <p className="text-gray-600">Scan the QR code or enter the sync code on your new device</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-4">
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Scan className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">QR Code</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Open KashPilot on your device and scan</p>
              </div>

              {/* Sync Code */}
              <div>
                <h4 className="font-semibold text-black mb-4">Manual Sync Code</h4>
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg text-black tracking-wider">{syncCode}</span>
                    <button
                      onClick={() => copyToClipboard(syncCode)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center">1</span>
                    Open KashPilot on your new device
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center">2</span>
                    Go to Settings → Sync Devices
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-black text-white rounded-full text-xs flex items-center justify-center">3</span>
                    Enter the code above
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connected Devices */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-black">Connected Devices</h3>
            <button
              onClick={loadDeviceConnections}
              className="text-gray-500 hover:text-black transition"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {connections.map((device) => (
              <div key={device.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      device.status === 'connected' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {getDeviceIcon(device.type)}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-black">{device.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          device.status === 'connected'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {device.status === 'connected' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{device.browser} • {device.location}</p>
                        <p>Last active: {formatLastActive(device.lastActive)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {device.status === 'connected' ? (
                      <button
                        onClick={() => disconnectDevice(device.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <span className="px-3 py-1 text-sm text-gray-500">Disconnected</span>
                    )}
                  </div>
                </div>

                {device.status === 'connected' && device.id === '2' && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-700">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Current Device</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Device verification required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Automatic session timeout</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">Remote disconnect capability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}