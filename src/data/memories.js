export const MEMORY_URL = 'https://your-domain.com/memory/wedding-001'

export const memories = {
  'wedding-001': {
    id: 'wedding-001',
    qrValue: 'https://your-domain.com/memory/wedding-001',
    video: '/assets/video/wedding-video.mp4',
    target: '/targets/wedding-frame.mind',
    title: 'Wedding Memory',
  },
  'wedding-002': {
    id: 'wedding-002',
    qrValue: 'https://your-domain.com/memory/wedding-002',
    video: '/assets/video/wedding-video.mp4',
    target: '/targets/wedding-frame.mind',
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
