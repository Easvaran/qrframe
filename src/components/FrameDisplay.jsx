import { useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function FrameDisplay({ videoSrc, isPlaying, isMuted, onPlayToggle, onMuteToggle, videoRef }) {
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    if (videoRef?.current && isPlaying) {
      videoRef.current.play().catch((err) => console.log('Play error:', err))
    }
  }, [isPlaying, videoRef])

  return (
    <div className="flex h-full w-full gap-6 p-4 sm:p-6 bg-[#0f0c0a]">
      {/* Frame Display - Left Side */}
      <div className="flex flex-1 items-center justify-center min-h-0">
        <div className="relative w-full max-w-md">
          {/* Outer Frame */}
          <div className="relative aspect-video overflow-hidden rounded-3xl border-[20px] border-[#2a1810] bg-black shadow-2xl">
            {/* Frame Border Gradient */}
            <div className="absolute inset-0 rounded-3xl border-[1px] border-[#8b7355]/30 pointer-events-none"></div>

            {/* Inner Frame Decorative */}
            <div className="absolute inset-0 rounded-2xl border-[8px] border-[#d4a574]/20 pointer-events-none"></div>

            {/* Video Container */}
            <div className="relative h-full w-full bg-black">
              {videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  onLoadedMetadata={() => setIsVideoReady(true)}
                  playsInline
                  onError={(e) => console.error('Video error:', e)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#1a0f08] to-black">
                  <div className="text-center">
                    <Play className="mx-auto mb-4 h-16 w-16 text-[#8b7355]/40" />
                    <p className="text-sm text-[#8b7355]/60">Waiting for video...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-[#d4a574]/40"></div>
            <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-[#d4a574]/40"></div>
            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[#d4a574]/40"></div>
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-[#d4a574]/40"></div>
          </div>

          {/* Frame Stand */}
          <div className="mx-auto mt-4 flex items-end justify-center gap-8">
            <div className="h-2 w-32 rounded-full bg-[#3a2517]/60"></div>
            <div className="h-3 w-2 bg-[#3a2517]"></div>
            <div className="h-2 w-32 rounded-full bg-[#3a2517]/60"></div>
          </div>
        </div>
      </div>

      {/* Control Panel - Right Side */}
      <div className="flex w-80 flex-col items-center justify-center gap-6 rounded-2xl border border-[#d4a574]/20 bg-[#0f0c0a]/60 p-8 backdrop-blur-sm min-h-0 overflow-y-auto">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Wedding Memory</h2>
          <p className="text-sm text-[#d4a574]/70">QR Scanned ✓</p>
        </div>

        {/* Status Indicator */}
        <div className="w-full rounded-lg bg-[#1a0f08]/50 p-4 text-center">
          {videoSrc && isVideoReady ? (
            <div>
              <div className="mb-2 flex justify-center">
                <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
              </div>
              <p className="text-xs text-green-400">Video Playing</p>
            </div>
          ) : videoSrc ? (
            <div>
              <div className="mb-2 flex justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse"></div>
              </div>
              <p className="text-xs text-yellow-400">Loading...</p>
            </div>
          ) : (
            <div>
              <div className="mb-2 flex justify-center">
                <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse"></div>
              </div>
              <p className="text-xs text-red-400">No Video</p>
            </div>
          )}
        </div>

        {/* Playback Controls */}
        {videoSrc && (
          <div className="w-full space-y-3">
            <button
              onClick={onPlayToggle}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e2c08a] px-6 py-3 font-semibold text-[#1c1714] transition hover:bg-[#f0d09c]"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play
                </>
              )}
            </button>

            <button
              onClick={onMuteToggle}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d4a574]/40 bg-[#1a0f08]/50 px-6 py-3 font-semibold text-[#d4a574] transition hover:bg-[#2a1810]"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-5 w-5" />
                  Unmute
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" />
                  Mute
                </>
              )}
            </button>
          </div>
        )}

        {/* Info Text */}
        <div className="text-center text-[10px] text-[#8b7355]/60 space-y-1 pt-4 border-t border-[#3a2517]">
          <p>Enjoy your wedding memory</p>
          <p>Use controls to pause</p>
          <p>and control audio</p>
        </div>
      </div>
    </div>
  )
}
