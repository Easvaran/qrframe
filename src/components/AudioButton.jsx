import { Volume2, VolumeX } from 'lucide-react'

export default function AudioButton({ muted, onToggle, ariaLabel = 'Toggle audio' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:border-white/70 hover:bg-black/30"
    >
      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  )
}
