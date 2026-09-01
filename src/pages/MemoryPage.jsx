import { motion } from 'framer-motion'
import { CalendarDays, MapPin } from 'lucide-react'
import { useMemo } from 'react'
import QRSection from '../components/QRSection'
import WeddingFrame from '../components/WeddingFrame'
import { MEMORY_URL, getMemoryForPath } from '../data/memories'

export default function MemoryPage() {
  const memory = useMemo(() => getMemoryForPath(window.location.pathname), [])

  const frameStyles = {
    top: '11.5%',
    left: '11.3%',
    width: '77.4%',
    height: '67.5%',
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_52%),linear-gradient(180deg,#f5efe8_0%,#efe4d7_32%,#f9f6f3_100%)] text-[#1b1816]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="w-full"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16">
            <div className="order-2 w-full max-w-xl lg:order-1">
              <div className="mb-4 text-center lg:text-left">
                <p className="text-[10px] font-medium uppercase tracking-[0.52em] text-[#90714a]">
                  Wedding Memory
                </p>
                <h1 className="mt-3 text-4xl font-medium tracking-[-0.07em] text-[#191412] sm:text-5xl lg:text-[4.2rem]">
                  {memory.title}
                </h1>
              </div>

              <p className="mt-4 text-center text-base leading-7 text-[#54473f] lg:text-left lg:text-lg">
                {memory.message}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-[#5f5049] lg:justify-start">
                <div className="flex items-center gap-2 rounded-full border border-[#d5c4b0] bg-white/35 px-3 py-2">
                  <CalendarDays className="h-4 w-4 text-[#8d6b43]" aria-hidden="true" />
                  <span>{memory.date}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#d5c4b0] bg-white/35 px-3 py-2">
                  <MapPin className="h-4 w-4 text-[#8d6b43]" aria-hidden="true" />
                  <span>{memory.place}</span>
                </div>
              </div>

              <div className="mt-8">
                <QRSection value={MEMORY_URL} />
              </div>
            </div>

            <div className="order-1 flex w-full max-w-[620px] justify-center lg:order-2">
              <WeddingFrame
                videoSrc={memory.video}
                frameImage={memory.frame}
                posterImage={memory.poster}
                autoplay
                muted
                videoPosition={frameStyles}
                altText={`${memory.coupleName} wedding memory frame`}
              />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
