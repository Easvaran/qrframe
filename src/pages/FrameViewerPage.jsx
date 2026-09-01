import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import MindARScene from '../ar/MindARScene'
import NetworkError from '../components/NetworkError'
import { getMemory } from '../data/memories'

const MEMORY_ID = 'wedding-001'

export default function FrameViewerPage() {
  const memory = getMemory(MEMORY_ID)
  const [networkError, setNetworkError] = useState('')
  const [deviceError, setDeviceError] = useState('')

  useEffect(() => {
    if (memory?.video) {
      fetch(memory.video, { method: 'HEAD' }).catch((err) => {
        console.error('Video asset not accessible:', err)
        setNetworkError('Video assets could not be loaded. Check your network connection.')
      })
    }
  }, [memory])

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-black">
      {networkError && (
        <NetworkError
          errorMessage={networkError}
          onRetry={() => {
            setNetworkError('')
            window.location.reload()
          }}
        />
      )}

      {!networkError && memory && (
        <MindARScene
          videoSrc={memory.video}
          targetSrc={memory.target}
          onTracking={() => undefined}
          onVideoReady={() => undefined}
          onError={(error) => {
            setDeviceError(error)
            console.error('AR Error:', error)
          }}
        />
      )}

      {deviceError && !networkError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
          <div className="max-w-sm rounded-[24px] border border-[#d8b789]/50 bg-[#1b1715]/90 p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#e2bf85]" />
            <h2 className="mt-4 text-xl font-medium text-white">Error</h2>
            <p className="mt-2 text-sm text-[#f0e6df]">{String(deviceError)}</p>
          </div>
        </div>
      )}
    </main>
  )
}
