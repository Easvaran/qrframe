import { useEffect, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'

export default function FallbackVideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.src = src
    video.load()
    video.playsInline = true
    video.controls = true
    video.loop = true
    video.muted = true
    video.volume = 1

    video.play().catch(() => {
      setAudioEnabled(false)
    })
  }, [src])

  const enableSound = async () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.muted = false
    video.volume = 1
    setAudioEnabled(true)
    try {
      await video.play()
    } catch {
      setAudioEnabled(false)
    }
  }

  return (
    <div className="relative h-[100dvh] w-[100vw] overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={src}
        className="h-[100dvh] w-[100vw] bg-black object-contain"
        playsInline
        controls
        loop
        muted
      />

      {!audioEnabled && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-[#d9c4a3] bg-[#201d1c]/75 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f9f3ed] shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md"
        >
          <Volume2 className="h-4 w-4" />
          Tap to enable sound
        </button>
      )}
    </div>
  )
}
