import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js'
import { AR_VIDEO_CONFIG } from './arConfig'

export default function MindARScene({
  videoSrc,
  targetSrc,
  onTracking,
  onVideoReady,
  onTargetFound,
  onTargetLost,
  onError,
}) {
  const containerRef = useRef(null)

  const videoConfig = useMemo(() => AR_VIDEO_CONFIG, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    let mindar = null
    let animationFrame = null
    let targetAnchor = null
    let videoTexture = null
    let video = null

    const init = async () => {
      try {
        if (!videoSrc || !targetSrc) {
          throw new Error('Missing AR video or target source.')
        }

        onTracking('REQUESTING_PERMISSION')

        mindar = new MindARThree({
          container,
          imageTargetSrc: targetSrc,
          maxTrack: 1,
          uiLoading: 'no',
          uiScanning: 'no',
          uiError: 'no',
        })

        await mindar.start()

        const { scene, camera, renderer } = mindar

        video = document.createElement('video')
        video.src = videoSrc
        video.crossOrigin = 'anonymous'
        video.playsInline = true
        video.webkitPlaysInline = true
        video.loop = true
        video.muted = false
        video.volume = 1
        video.autoplay = true
        video.preload = 'auto'

        await new Promise((resolve, reject) => {
          video.onloadeddata = () => resolve()
          video.onerror = () => reject(new Error('Video load failed'))
          video.load()
        })

        videoTexture = new THREE.VideoTexture(video)
        videoTexture.colorSpace = THREE.SRGBColorSpace
        videoTexture.needsUpdate = true

        const material = new THREE.MeshBasicMaterial({
          map: videoTexture,
          transparent: true,
          side: THREE.DoubleSide,
        })
        const geometry = new THREE.PlaneGeometry(videoConfig.width, videoConfig.height)
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(videoConfig.offsetX, videoConfig.offsetY, 0)
        plane.rotation.set(0, 0, THREE.MathUtils.degToRad(videoConfig.rotation))

        const anchor = mindar.addAnchor(0)
        targetAnchor = anchor
        anchor.group.add(plane)

        anchor.onTargetFound = () => {
          console.log('Physical frame detected')
          onTargetFound?.()
          onTracking('FRAME_FOUND')
          onVideoReady(true)
          video.play().then(() => {
            onTracking('PLAYING')
          }).catch(() => {
            onTracking('PLAYING')
          })
        }

        anchor.onTargetLost = () => {
          console.log('Physical frame lost')
          onTargetLost?.()
          onTracking('SEARCHING_FRAME')
          if (!video.paused) {
            video.pause()
          }
          onVideoReady(false)
        }

        const renderLoop = () => {
          if (mindar && scene && camera && renderer) {
            renderer.render(scene, camera)
          }
          animationFrame = requestAnimationFrame(renderLoop)
        }
        renderLoop()

        console.log('AR started')
        console.log('Searching for physical frame...')
        onTracking('SEARCHING_FRAME')
        onVideoReady(true)
      } catch (error) {
        console.error(error)
        onError(error)
        onTracking('ERROR')
      }
    }

    init()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (videoTexture) {
        videoTexture.dispose()
      }
      if (targetAnchor && targetAnchor.group) {
        targetAnchor.group.clear()
      }
      if (mindar) {
        mindar.stop()
      }
      if (video) {
        video.pause()
      }
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [onError, onTargetFound, onTargetLost, onTracking, onVideoReady, targetSrc, videoConfig, videoSrc])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full w-full bg-black"
      style={{ width: '100vw', height: '100dvh' }}
      aria-label="AR camera view"
    />
  )
}
