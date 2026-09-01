import { AlertTriangle, WifiOff, RotateCw } from 'lucide-react'

export default function NetworkError({ onRetry, errorMessage }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0c0a]">
      <div className="max-w-md rounded-3xl border border-[#d8b789]/30 bg-[#1b1715]/95 p-8 text-center backdrop-blur-sm">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <WifiOff className="h-16 w-16 text-[#e2bf85]" />
            <AlertTriangle className="absolute -bottom-2 -right-2 h-8 w-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-2xl font-semibold text-white">Unable to Open</h2>

        {/* Message */}
        <p className="mb-6 text-sm leading-relaxed text-[#f0e6df]">
          {errorMessage || 'We couldn\'t reach the wedding memory. Please check your connection and try again.'}
        </p>

        {/* Troubleshooting Tips */}
        <div className="mb-6 space-y-2 rounded-lg bg-[#0f0c0a]/50 p-4 text-left">
          <p className="text-xs font-semibold text-[#d7c29a] uppercase tracking-wide">Troubleshooting:</p>
          <ul className="space-y-2 text-xs text-[#c9b5a0]">
            <li>✓ Check your internet connection</li>
            <li>✓ Make sure you're on the same Wi-Fi network</li>
            <li>✓ If testing locally, verify the QR code URL</li>
            <li>✓ Try refreshing the page</li>
          </ul>
        </div>

        {/* Local Testing Info */}
        <div className="mb-6 rounded-lg bg-blue-950/30 p-3 text-left border border-blue-400/20">
          <p className="text-xs text-blue-300">
            <span className="font-semibold">Local Testing:</span> Android phone and computer must be on the same Wi-Fi network. Use your PC's IP address, not localhost.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e2c08a] px-6 py-3 font-semibold text-[#1c1714] transition hover:bg-[#f0d09c]"
          >
            <RotateCw className="h-4 w-4" />
            Try Again
          </button>

          <a
            href="/"
            className="block rounded-full border border-[#d4a574]/40 bg-[#1a0f08]/50 px-6 py-3 text-sm font-semibold text-[#d4a574] transition hover:bg-[#2a1810]"
          >
            Go to Start
          </a>
        </div>

        {/* Support Text */}
        <p className="mt-6 text-[10px] text-[#8b7355]/60">
          If the problem persists, please check the QR code or contact support.
        </p>
      </div>
    </div>
  )
}
