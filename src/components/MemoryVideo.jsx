import { useEffect, useRef, useState } from 'react'
import { Fullscreen, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import AudioButton from './AudioButton'

export default function MemoryVideo({ src, poster, autoplay = true, muted = true }) {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(muted)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTapHint, setShowTapHint] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return undefined
    }

    const handleTimeUpdate = () => {
      const nextProgress = video.duration ? (video.currentTime / video.duration) * 100 : 0
      setProgress(nextProgress)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    video.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (autoplay) {
      video
        .play()
        .then(() => {
          setShowTapHint(false)
        })
        .catch(() => {
          setShowTapHint(true)
          setIsPlaying(false)
        })
    }
  }, [autoplay, src])

  const togglePlay = async () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (video.paused) {
      try {
        await video.play()
        setShowTapHint(false)
      } catch {
        setShowTapHint(true)
      }
      return
    }

    video.pause()
  }

  const toggleMute = () => {
    setIsMuted((value) => !value)
  }

  const handleSeek = (event) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) {
      return
    }

    const nextValue = Number(event.target.value)
    const nextTime = (nextValue / 100) * video.duration
    video.currentTime = nextTime
    setProgress(nextValue)
  }

  const handleRetry = () => {
    setVideoError(false)
    const video = videoRef.current
    if (video) {
      video.load()
      if (autoplay) {
        video.play().catch(() => setShowTapHint(true))
      }
    }
  }

  const toggleFullscreen = async () => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    if (video.requestFullscreen) {
      await video.requestFullscreen()
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#111111]">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        playsInline
        autoPlay={autoplay}
        preload="auto"
        className="h-full w-full object-cover"
        aria-label="Wedding memory video"
        onError={() => setVideoError(true)}
      />

      {videoError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#201b18]/90 px-6 text-center text-white">
          <div className="space-y-2">
            <p className="text-lg font-medium">Unable to load this memory.</p>
            <p className="text-sm text-[#e9d8c8]">Please try again.</p>
          </div>

          <button
            type="button"
            onClick={handleRetry}
            className="rounded-full border border-[#d7b888] bg-[#e3c08e]/20 px-5 py-2 text-sm font-medium text-[#f5e7d7] transition hover:bg-[#e3c08e]/35"
          >
            Try again
          </button>
        </div>
      )}

      {!videoError && showTapHint && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#1d1714]/15 text-center text-xl font-medium tracking-[0.08em] text-white backdrop-blur-[2px]"
        >
          Tap to Relive the Moment <span aria-hidden="true">❤️</span>
        </button>
      )}

      <div className="absolute inset-x-3 bottom-3 z-20 rounded-full border border-white/20 bg-[#090909]/35 px-3 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.25)] backdrop-blur-md sm:inset-x-4 sm:bottom-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </button>

            <AudioButton muted={isMuted} onToggle={toggleMute} ariaLabel={isMuted ? 'Unmute video' : 'Mute video'} />
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="View video fullscreen"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <Fullscreen className="h-4 w-4" />
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={Math.min(Math.max(progress, 0), 100)}
          onChange={handleSeek}
          aria-label="Video progress"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-[#d7b888]"
        />
      </div>
    </div>
  )
}
