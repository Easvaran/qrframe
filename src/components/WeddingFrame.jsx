import { motion } from 'framer-motion'
import { useMemo } from 'react'
import MemoryVideo from './MemoryVideo'

export default function WeddingFrame({
  videoSrc,
  frameImage,
  posterImage,
  autoplay = true,
  muted = true,
  videoPosition = { top: '11%', left: '11%', width: '78%', height: '68%' },
  altText = 'Wedding memory frame',
}) {
  const frameStyle = useMemo(
    () => ({
      backgroundImage: frameImage ? `url(${frameImage})` : undefined,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }),
    [frameImage],
  )

  const mediaStyle = {
    top: videoPosition.top,
    left: videoPosition.left,
    width: videoPosition.width,
    height: videoPosition.height,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[620px]"
      aria-label={altText}
    >
      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-[2.2rem]"
        style={frameStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_42%)]" />

        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),0_28px_80px_rgba(57,39,27,0.18)]" />

        <div className="absolute overflow-hidden rounded-[1.75rem]" style={mediaStyle}>
          <MemoryVideo src={videoSrc} poster={posterImage} autoplay={autoplay} muted={muted} />
        </div>
      </div>
    </motion.div>
  )
}
