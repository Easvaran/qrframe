import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js'

export default function MindARScene({ videoSrc, targetSrc, onTracking, onQrReady, onVideoReady, onError }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const videoRef = useRef(null)
  const [status, setStatus] = useState('INITIAL')

  const videoConfig = useMemo(
    () => ({
      width: 1.0,
      height: 1.0,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
    }),
    [],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    let mindar = null
    let animationFrame = null
    let targetAnchor = null
    let videoTexture = null

    const init = async () => {
      try {
        setStatus('STARTING_CAMERA')
        onTracking('STARTING_CAMERA')

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
        sceneRef.current = { scene, camera, renderer }

        const video = document.createElement('video')
        video.src = videoSrc
        video.crossOrigin = 'anonymous'
        video.playsInline = true
        video.loop = true
        video.muted = false
        video.preload = 'auto'
        videoRef.current = video

        await new Promise((resolve, reject) => {
          video.onloadeddata = () => resolve()
          video.onerror = () => reject(new Error('Video load failed'))
          video.load()
        })

        videoTexture = new THREE.VideoTexture(video)
        videoTexture.colorSpace = THREE.LinearSRGBColorSpace
        videoTexture.needsUpdate = true

        const material = new THREE.MeshBasicMaterial({ map: videoTexture, transparent: true, side: THREE.DoubleSide })
        const geometry = new THREE.PlaneGeometry(videoConfig.width, videoConfig.height)
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(videoConfig.offsetX, videoConfig.offsetY, 0)
        plane.rotation.set(0, 0, THREE.MathUtils.degToRad(videoConfig.rotation))

        const anchor = mindar.addAnchor(0)
        targetAnchor = anchor
        anchor.group.add(plane)

        anchor.onTargetFound = () => {
          setStatus('QR_FOUND')
          onTracking('QR_FOUND')
          onQrReady(true)
          if (video) {
            video.play().catch(() => {
              onTracking('PLAYING')
              setStatus('PLAYING')
            })
          }
        }

        anchor.onTargetLost = () => {
          setStatus('SEARCHING_FRAME')
          onTracking('SEARCHING_FRAME')
          onQrReady(false)
        }

        const startRender = () => {
          const renderLoop = () => {
            if (mindar && scene && camera && renderer) {
              renderer.render(scene, camera)
            }
            animationFrame = requestAnimationFrame(renderLoop)
          }
          renderLoop()
        }

        startRender()
        setStatus('SEARCHING_FRAME')
        onTracking('SEARCHING_FRAME')
        onVideoReady(true)
      } catch (error) {
        console.error(error)
        setStatus('ERROR')
        onError(error)
        onTracking('ERROR')
      }
    }

    init()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      if (videoTexture) videoTexture.dispose()
      if (targetAnchor && targetAnchor.group) targetAnchor.group.clear()
      if (mindar) {
        mindar.stop()
      }
      if (videoRef.current) {
        videoRef.current.pause()
      }
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [onError, onQrReady, onTracking, onVideoReady, targetSrc, videoConfig, videoSrc])

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full bg-black" aria-label="AR camera view" />
  )
}
