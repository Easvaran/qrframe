/**
 * Central configuration for Wedding Memory AR application URLs
 * This ensures consistent URL handling across development and production
 */

// Get the app's base URL based on environment
const getAppUrl = () => {
  // First priority: Explicit VITE_APP_URL from environment (for custom domains)
  if (import.meta.env.VITE_APP_URL && import.meta.env.VITE_APP_URL !== 'https://your-domain.com') {
    return import.meta.env.VITE_APP_URL
  }

  // Second priority: Always use window.location if available
  // This works for:
  // - Vercel deployment (https://qrframe-23fm.vercel.app)
  // - Local development with IP (https://192.168.31.249:8001)
  // - Localhost (https://localhost:8001)
  if (typeof window !== 'undefined' && window.location) {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port

    if (port) {
      return `${protocol}//${hostname}:${port}`
    }
    return `${protocol}//${hostname}`
  }

  // Fallback only if window is not available (SSR/build time)
  return 'https://your-domain.com'
}

export const APP_CONFIG = {
  // Base URL of the application
  baseUrl: getAppUrl(),

  // Production domain (set this in .env.production)
  productionUrl: import.meta.env.VITE_APP_URL || 'https://your-domain.com',

  // QR code configuration
  qr: {
    // Main memory unlock path
    getMemoryUrl: (memoryId = 'wedding-001') => {
      const baseUrl = getAppUrl()
      return `${baseUrl}/?memory=${memoryId}`
    },

    // Alternative direct path
    getFrameViewerUrl: (memoryId = 'wedding-001') => {
      const baseUrl = getAppUrl()
      return `${baseUrl}/?viewer=${memoryId}`
    },
  },

  // Logging configuration
  debug: isDevelopment,

  // API endpoints (for future use)
  api: {
    baseUrl: getAppUrl(),
  },
}

/**
 * Get device-friendly instructions for local testing
 */
export const getLocalTestingUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://192.168.x.x:8001'
  }

  const hostname = window.location.hostname

  // If already on a local IP address, just return it
  if (/^192\.168|^10\.|^172\./.test(hostname)) {
    return window.location.href
  }

  // If on localhost, tell user to use their PC's IP
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'Run: ipconfig (Windows) or ifconfig (Mac/Linux) to find your local IP, then use http://[YOUR_IP]:8001'
  }

  return getAppUrl()
}
