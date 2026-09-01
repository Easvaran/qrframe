import { APP_CONFIG } from '../config/appConfig'

// Direct video URL used by the QR display and memory page.
export const MEMORY_URL = APP_CONFIG.qr.getMemoryUrl('wedding-001')

export const memories = {
  'wedding-001': {
    id: 'wedding-001',
    qrValue: APP_CONFIG.qr.getMemoryUrl('wedding-001'),
    video: '/assets/video/wedding-video.mp4',
    title: 'Wedding Memory',
  },
  'wedding-002': {
    id: 'wedding-002',
    qrValue: APP_CONFIG.qr.getMemoryUrl('wedding-002'),
    video: '/assets/video/wedding-video.mp4',
    title: 'Wedding Memory 2',
  },
}

export function getMemory(memoryId = 'wedding-001') {
  return memories[memoryId] ?? memories['wedding-001']
}

export function getMemoryForPath(pathname = '/') {
  const match = pathname.match(/\/memory\/([^/?#]+)/)
  const memoryId = match ? match[1] : 'wedding-001'

  return memories[memoryId] ?? memories['wedding-001']
}

// Debug: Log the current QR URL in development
if (import.meta.env.DEV) {
  console.log('📱 QR URL:', MEMORY_URL)
  console.log('🖥️ App Config:', APP_CONFIG)
}
