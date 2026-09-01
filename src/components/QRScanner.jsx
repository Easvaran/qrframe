import { useEffect, useRef, useState } from 'react'
import { Loader, AlertCircle } from 'lucide-react'
import jsQR from 'jsqr'

export default function QRScanner({ onQrDetected, title = 'Scan QR Code' }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const rafRef = useRef(null)
  const lastDecodedRef = useRef('')
  const [scanning, setScanning] = useState(true)
  const [error, setError] = useState('')
  const [found, setFound] = useState(false)

  useEffect(() => {
    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream

          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play()
            startQRScan()
          }
        }
      } catch (err) {
        setError('Unable to access camera. Please check permissions.')
        setScanning(false)
        console.error(err)
      }
    }

    const startQRScan = () => {
      const canvas = canvasRef.current
      const video = videoRef.current

      if (!canvas || !video) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      const scan = () => {
        const { videoWidth, videoHeight } = video
        if (!videoWidth || !videoHeight) {
          rafRef.current = requestAnimationFrame(scan)
          return
        }

        canvas.width = videoWidth
        canvas.height = videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, canvas.width, canvas.height, { inversionAttempts: 'dontInvert' })

        if (code && code.data) {
          const value = code.data.trim()
          if (value && value !== lastDecodedRef.current) {
            lastDecodedRef.current = value
            setFound(true)
            onQrDetected(value)
          }
        }

        rafRef.current = requestAnimationFrame(scan)
      }

      rafRef.current = requestAnimationFrame(scan)
    }

    startScanning()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [onQrDetected])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      {/* Scanner Frame Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-64 w-64">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-green-400"></div>
          <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-green-400"></div>
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-green-400"></div>
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-green-400"></div>

          {/* Center circle with pulse */}
          {scanning && !found && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse"></div>
                <Loader className="absolute inset-4 text-green-400 animate-spin" />
              </div>
            </div>
          )}

          {/* Success indicator */}
          {found && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl text-green-400 mb-2">✓</div>
                <p className="text-white text-sm font-semibold">QR Code Found!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-12 w-12 text-red-400" />
            <p className="text-center text-white text-sm font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="absolute top-6 left-0 right-0 flex justify-center">
        <div className="rounded-full bg-black/60 px-6 py-2 backdrop-blur-sm">
          <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">{title}</p>
        </div>
      </div>

      {/* Instructions */}
      {scanning && !found && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
            <p className="text-white/70 text-xs text-center">Point camera at QR code</p>
          </div>
        </div>
      )}
    </div>
  )
}
