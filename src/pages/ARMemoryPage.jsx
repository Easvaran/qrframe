import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Camera, Volume2 } from 'lucide-react'
import MindARScene from '../ar/MindARScene'
import { getMemoryForPath } from '../data/memories'

const MESSAGE_COPY = {
  PREPARING: 'Preparing your memory...',
  REQUESTING_PERMISSION: 'Camera access is needed to bring this frame to life.',
  SEARCHING_FRAME: 'Point your camera at the wedding frame.',
  FRAME_FOUND: '✨ Memory unlocked',
  PLAYING: 'Reliving the moment...',
  ERROR: 'Unable to start AR',
}

export default function ARMemoryPage() {
  const memory = useMemo(() => getMemoryForPath(window.location.pathname), [])
  const [arState, setArState] = useState('PREPARING')
  const [isStarted, setIsStarted] = useState(false)
  const [showStartButton, setShowStartButton] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [deviceError, setDeviceError] = useState('')

  const startExperience = async () => {
    setIsStarted(true)
    setShowStartButton(false)
    setDeviceError('')
    setArState('REQUESTING_PERMISSION')

    if (!navigator.mediaDevices?.getUserMedia) {
      setArState('ERROR')
      setDeviceError('Camera access is not supported on this device.')
      return
    }

    try {
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setArState('SEARCHING_FRAME')
    } catch (error) {
      console.error('Camera prompt blocked:', error)
      setIsStarted(false)
      setShowStartButton(true)
      setArState('REQUESTING_PERMISSION')
      setDeviceError('Camera access is needed to bring this frame to life.')
    }
  }

  useEffect(() => {
    let cancelled = false

    const autoStart = async () => {
      if (cancelled || !memory) {
        return
      }

      try {
        await startExperience()
      } catch (error) {
        console.error('Auto-start failed:', error)
        if (!cancelled) {
          setShowStartButton(true)
          setArState('REQUESTING_PERMISSION')
        }
      }
    }

    autoStart()

    return () => {
      cancelled = true
    }
  }, [memory])

  const handleTracking = (nextState) => {
    setArState(nextState)
  }

  const handleVideoReady = (ready) => {
    setVideoReady(ready)
  }

  const enableSound = () => {
    const video = document.querySelector('video[playsinline]')
    if (!video) {
      return
    }

    video.muted = false
    video.volume = 1
    setAudioEnabled(true)
    video.play().catch(() => undefined)
  }

  const renderStatusText = MESSAGE_COPY[arState] ?? MESSAGE_COPY.PREPARING

  return (
    <main className="relative h-[100dvh] w-[100vw] overflow-hidden bg-black text-white">
      {isStarted && memory && (
        <MindARScene
          videoSrc={memory.video}
          targetSrc={memory.target}
          onTracking={handleTracking}
          onVideoReady={handleVideoReady}
          onError={(error) => {
            console.error('AR initialization failed:', error)
            setArState('ERROR')
            setDeviceError('AR failed to initialize. Please try again.')
          }}
        />
      )}

      {!isStarted && !showStartButton && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 px-6">
          <p className="text-center text-sm uppercase tracking-[0.34em] text-[#f3e7d8]">
            {MESSAGE_COPY.PREPARING}
          </p>
        </div>
      )}

      {showStartButton && (
        <button
          type="button"
          onClick={startExperience}
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/90 px-6 text-xl font-medium uppercase tracking-[0.22em] text-[#f7e6cf]"
        >
          START MEMORY
        </button>
      )}

      {!showStartButton && !deviceError && (
        <div className="pointer-events-none absolute left-1/2 top-5 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-center text-[10px] uppercase tracking-[0.32em] text-white/90 backdrop-blur-md">
          {renderStatusText}
        </div>
      )}

      {deviceError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
          <div className="max-w-sm rounded-[24px] border border-[#d8b789]/50 bg-[#1b1715]/90 p-5 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#e2bf85]" />
            <h2 className="mt-4 text-xl font-medium text-white">Camera access required</h2>
            <p className="mt-2 text-sm leading-6 text-[#f0e6df]">{deviceError}</p>
            <button
              type="button"
              onClick={startExperience}
              className="mt-5 rounded-full border border-[#d9b77d] bg-[#e0c18a] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1b1714]"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {isStarted && videoReady && !audioEnabled && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-[#d9c4a3] bg-[#201d1c]/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f9f3ed] shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          <Volume2 className="h-4 w-4" />
          Tap to enable sound
        </button>
      )}

      {isStarted && videoReady && audioEnabled && (
        <div className="absolute bottom-5 right-5 z-20 rounded-full border border-[#d9c4a3] bg-[#201d1c]/75 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#f9f3ed] shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md">
          Sound on
        </div>
      )}

      {isStarted && !deviceError && (
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center px-4">
          <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm">
            {arState === 'PLAYING' ? 'Reliving the moment...' : 'Point your camera at the wedding frame.'}
          </div>
        </div>
      )}

      {arState === 'ERROR' && !deviceError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 px-6">
          <div className="text-center">
            <Camera className="mx-auto mb-3 h-10 w-10 text-[#efc98d]" />
            <p className="text-lg font-medium">Unable to start AR</p>
          </div>
        </div>
      )}
    </main>
  )
}
