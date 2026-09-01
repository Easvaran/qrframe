export default function SoundButton({ onEnableSound, enabled }) {
  return (
    <button
      type="button"
      onClick={onEnableSound}
      className="absolute bottom-5 right-5 z-20 rounded-full border border-[#d9c4a3] bg-[#201d1c]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f9f3ed] shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:bg-[#2a2522]/80"
    >
      {enabled ? 'Sound on' : 'Tap to play sound'}
    </button>
  )
}
