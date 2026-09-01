import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f1ea]/90 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c8a56a]/60 bg-white/70 shadow-[0_12px_40px_rgba(85,68,57,0.12)]"
            >
              <Sparkles className="h-7 w-7 text-[#8b6b42]" />
            </motion.div>

            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#866b44]">
                Wedding Memory
              </p>
              <h2 className="text-2xl font-medium tracking-[0.08em] text-[#201c1a] sm:text-3xl">
                Preserving a Beautiful Memory...
              </h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
