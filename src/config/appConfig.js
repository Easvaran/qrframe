/**
 * Central configuration for Wedding Memory AR application URLs
 * This ensures consistent URL handling across development and production
 */

// Detect if running in development mode
const isDevelopment = !import.meta.env.PROD

// Get the app's base URL based on environment
const getAppUrl = () => {
  // Production: use explicit VITE_APP_URL from .env
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL
  }

  // Development: use window.location for network access
  if (isDevelopment && typeof window !== 'undefined') {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port

    // If accessing via local IP (like 192.168.x.x), use as-is
    // If accessing via localhost/127.0.0.1, still use as-is (it will work on the same machine)
    if (port) {
      return `${protocol}//${hostname}:${port}`
    }
    return `${protocol}//${hostname}`
  }

  // Fallback to production URL
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
