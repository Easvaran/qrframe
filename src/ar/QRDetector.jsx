import { useEffect, useRef } from 'react'
import jsQR from 'jsqr'

export default function QRDetector({ videoElement, expectedValue, onQrCode, enabled }) {
  const rafRef = useRef(null)
  const lastDecodedRef = useRef('')

  useEffect(() => {
    if (!enabled || !videoElement) {
      return undefined
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (!ctx) {
      return undefined
    }

    const scan = () => {
      const { videoWidth, videoHeight } = videoElement
      if (!videoWidth || !videoHeight) {
        rafRef.current = requestAnimationFrame(scan)
        return
      }

      canvas.width = videoWidth
      canvas.height = videoHeight
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, canvas.width, canvas.height, { inversionAttempts: 'dontInvert' })

      if (code) {
        const value = code.data?.trim()
        if (value && value !== lastDecodedRef.current) {
          lastDecodedRef.current = value
          onQrCode(value)
        }
      }

      rafRef.current = requestAnimationFrame(scan)
    }

    rafRef.current = requestAnimationFrame(scan)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lastDecodedRef.current = ''
    }
  }, [enabled, expectedValue, onQrCode, videoElement])

  return null
}
