const messages = {
  INITIAL: 'Tap Start AR',
  STARTING_CAMERA: 'Starting camera...',
  SEARCHING_FRAME: 'Point your camera at the wedding frame',
  FRAME_FOUND: 'Frame detected',
  SEARCHING_QR: 'Scan the QR on the frame',
  QR_FOUND: 'Memory unlocked',
  PLAYING: 'Reliving the moment...',
  ERROR: 'Unable to start AR',
}

export default function ARStatus({ state }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.3em] text-white/90 backdrop-blur-md">
      {messages[state] ?? messages.INITIAL}
    </div>
  )
}
