import { useEffect, useState } from 'react'
import { AlertTriangle, Camera, CheckCircle2, PlayCircle } from 'lucide-react'
import { AR_CONFIG } from '../ar/arConfig'
import MindARScene from '../ar/MindARScene'
import ARStatus from '../components/ARStatus'
import SoundButton from '../components/SoundButton'
import StartAR from '../components/StartAR'
import { getMemory } from '../data/memories'

const MEMORY_ID = 'wedding-001'

export default function ARMemoryPage() {
  const memory = getMemory(MEMORY_ID)
  const [hasStarted, setHasStarted] = useState(false)
  const [arState, setArState] = useState('INITIAL')
  const [isMobile, setIsMobile] = useState(false)
  const [qrReady, setQrReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [deviceError, setDeviceError] = useState('')

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || ''
      const isPhone = /Android|iPhone|iPad|iPod/i.test(userAgent)
      setIsMobile(isPhone)
    }

    checkMobile()
  }, [])

  const handleStart = async () => {
    setHasStarted(true)
    setArState('STARTING_CAMERA')
    setDeviceError('')

    if (!navigator.mediaDevices?.getUserMedia) {
      setArState('ERROR')
      setDeviceError('Camera access is not supported on this device.')
      return
    }

    try {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      setArState('SEARCHING_FRAME')
    } catch (error) {
      setArState('ERROR')
      setDeviceError('Camera permission is required to unlock the wedding memory.')
      console.error(error)
    }
  }

  const handleTracking = (nextState) => {
    setArState(nextState)
  }

  const handleQrReady = (ready) => {
    setQrReady(ready)
    if (ready) {
      setArState('QR_FOUND')
    }
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
    setAudioEnabled(true)
    video.play().catch(() => undefined)
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 hidden items-end justify-center pb-5 md:flex">
        <p className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] uppercase tracking-[0.36em] text-white/80 backdrop-blur-md">
          Open this page on your phone to experience AR.
        </p>
      </div>

      {hasStarted && (
        <>
          <MindARScene
            videoSrc={memory.video}
            targetSrc={memory.target}
            onTracking={handleTracking}
            onQrReady={handleQrReady}
            onVideoReady={handleVideoReady}
            onError={(error) => {
              setArState('ERROR')
              setDeviceError('AR failed to initialize. Please try again.')
              console.error(error)
            }}
          />

          <ARStatus state={arState} />

          {!videoReady && arState !== 'ERROR' && (
            <div className="absolute inset-x-0 bottom-24 z-20 flex justify-center px-4">
              <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-center text-[10px] uppercase tracking-[0.32em] text-[#f5e7d5] backdrop-blur-md">
                {qrReady ? 'QR found' : 'Point your camera at the frame'}
              </div>
            </div>
          )}

          {qrReady && !audioEnabled && (
            <SoundButton onEnableSound={enableSound} enabled={audioEnabled} />
          )}
        </>
      )}

      {!hasStarted && <StartAR onStart={handleStart} />}

      {deviceError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 px-6">
          <div className="max-w-sm rounded-[24px] border border-[#d8b789]/50 bg-[#1b1715]/90 p-5 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
            <AlertTriangle className="mx-auto h-8 w-8 text-[#e2bf85]" />
            <h2 className="mt-4 text-xl font-medium text-white">Camera access required</h2>
            <p className="mt-2 text-sm leading-6 text-[#f0e6df]">{deviceError}</p>
            <button
              type="button"
              onClick={handleStart}
              className="mt-5 rounded-full border border-[#d9b77d] bg-[#e0c18a] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1b1714]"
            >
              Try again
            </button>
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

      {qrReady && (
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#cda86a]/40 bg-[#171411]/80 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-[#f7ebdf]">
          {audioEnabled ? <CheckCircle2 className="mr-2 inline h-3.5 w-3.5" /> : <PlayCircle className="mr-2 inline h-3.5 w-3.5" />}
          {audioEnabled ? 'Sound on' : 'Video ready'}
        </div>
      )}

      {!isMobile && !hasStarted && (
        <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <p className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.26em] text-white/80 backdrop-blur-sm">
            Desktop preview only
          </p>
        </div>
      )}
    </main>
  )
}
