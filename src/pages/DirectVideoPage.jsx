import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { getMemoryForPath } from '../data/memories'

export default function DirectVideoPage() {
  const memory = getMemoryForPath(window.location.pathname)
  const videoRef = useRef(null)
  const [showSoundButton, setShowSoundButton] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return undefined
    }

    video.muted = false
    video.volume = 1
    video.play().then(() => {
      setShowSoundButton(false)
    }).catch(() => {
      setShowSoundButton(true)
    })

    return undefined
  }, [])

  const playWithSound = () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.muted = false
    video.volume = 1
    video.play().then(() => {
      setShowSoundButton(false)
    }).catch(() => {
      setShowSoundButton(true)
    })
  }

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={memory.video}
        className="h-full w-full object-contain"
        autoPlay
        playsInline
        controls
        preload="auto"
        aria-label="Wedding memory video"
        onPlay={() => setShowSoundButton(false)}
        onError={() => setShowSoundButton(false)}
      />

      {showSoundButton && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/75 px-5 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
        >
          <Volume2 className="h-4 w-4" />
          TAP TO PLAY WITH SOUND
        </button>
      )}
    </main>
  )
}
