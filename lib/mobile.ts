// Mobile detection and utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const isAndroid = () => {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

export const isPWA = () => {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

export const canInstallPWA = () => {
  if (typeof window === 'undefined') return false
  return 'serviceWorker' in navigator && 'PushManager' in window
}

// Safe area utilities for mobile
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement)
  return {
    top: parseInt(style.getPropertyValue('--sat') || '0'),
    bottom: parseInt(style.getPropertyValue('--sab') || '0'),
    left: parseInt(style.getPropertyValue('--sal') || '0'),
    right: parseInt(style.getPropertyValue('--sar') || '0'),
  }
}

// Vibration API wrapper
export const hapticFeedback = (pattern: number | number[] = 100) => {
  if (typeof window === 'undefined') return
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

// Screen wake lock for crypto operations
export const requestWakeLock = async () => {
  if ('wakeLock' in navigator) {
    try {
      const wakeLock = await (navigator as any).wakeLock.request('screen')
      return wakeLock
    } catch (err) {
      console.warn('Wake lock failed:', err)
    }
  }
}

// Network status
export const getNetworkStatus = () => {
  if (typeof window === 'undefined') return { online: true, effectiveType: '4g' }
  return {
    online: navigator.onLine,
    effectiveType: (navigator as any).connection?.effectiveType || '4g'
  }
}

// Device capabilities
export const getDeviceCapabilities = () => {
  if (typeof window === 'undefined') return {}
  
  return {
    hasCamera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    hasMicrophone: 'mediaDevices' in navigator,
    hasGeolocation: 'geolocation' in navigator,
    hasMotion: 'DeviceMotionEvent' in window,
    hasOrientation: 'DeviceOrientationEvent' in window,
    hasBattery: 'getBattery' in navigator,
    hasShare: 'share' in navigator,
    hasBluetooth: 'bluetooth' in navigator,
    hasNFC: 'nfc' in navigator,
  }
}