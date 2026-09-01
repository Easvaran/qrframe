import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import FrameDisplay from '../components/FrameDisplay'
import QRScanner from '../components/QRScanner'
import StartAR from '../components/StartAR'
import { getMemory } from '../data/memories'

const MEMORY_ID = 'wedding-001'

export default function FrameViewerPage() {
  const memory = getMemory(MEMORY_ID)
  const [showScanner, setShowScanner] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [deviceError, setDeviceError] = useState('')

  const handleQrScanned = (qrValue) => {
    console.log('QR Scanned:', qrValue)
    setShowScanner(false)
    setVideoReady(true)
  }

  const handlePlayToggle = () => {
    const video = document.querySelector('video[playsinline]')
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    const video = document.querySelector('video[playsinline]')
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[#0f0c0a]">
      {/* Show Start Screen initially */}
      {!showScanner && !videoReady && (
        <StartAR onStart={() => setShowScanner(true)} />
      )}

      {/* Show Scanner */}
      {showScanner && !videoReady && (
        <div className="h-full w-full">
          <QRScanner onQrDetected={handleQrScanned} title="Scan QR Code" />
        </div>
      )}

      {/* Show Frame with Video */}
      {videoReady && (
        <FrameDisplay
          videoSrc={memory.video}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlayToggle={handlePlayToggle}
          onMuteToggle={handleMuteToggle}
        />
      )}

      {/* Error Display */}
      {deviceError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
          <div className="max-w-sm rounded-[24px] border border-[#d8b789]/50 bg-[#1b1715]/90 p-5 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#e2bf85]" />
            <h2 className="mt-4 text-xl font-medium text-white">Error</h2>
            <p className="mt-2 text-sm text-[#f0e6df]">{deviceError}</p>
          </div>
        </div>
      )}
    </main>
  )
}
