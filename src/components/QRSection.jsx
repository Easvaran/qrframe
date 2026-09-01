import { QRCodeSVG } from 'qrcode.react'
import { ScanLine } from 'lucide-react'

export function QRCard({ value, title = 'WEDDING MEMORY', label = 'SCAN TO RELIVE THE MOMENT' }) {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-[20px] border border-[#d7c1a1] bg-[linear-gradient(180deg,#fefdfb,#efe5db)] p-4 text-[#1d1714] shadow-[0_18px_36px_rgba(61,42,28,0.08)] print:shadow-none">
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7b5e3a]">
          {title}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center rounded-[14px] border border-[#e6d7c6] bg-white p-3">
        <QRCodeSVG
          value={value}
          size={170}
          bgColor="#ffffff"
          fgColor="#191614"
          level="M"
          includeMargin
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-center">
        <ScanLine className="h-4 w-4 text-[#8a6742]" aria-hidden="true" />
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] sm:text-[10px]">
          {label}
        </p>
      </div>
    </div>
  )
}

export default function QRSection({ value, label = 'SCAN TO RELIVE THE MOMENT' }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-[28px] border border-[#c7b39b]/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(246,238,229,0.78))] p-4 shadow-[0_18px_60px_rgba(87,63,47,0.12)] backdrop-blur-sm sm:p-6">
      <div className="rounded-[24px] border border-[#d9c7ae] bg-[#f9f5f1] p-3 shadow-inner shadow-[#f5eae1]">
        <div className="flex items-center justify-center rounded-[18px] border border-[#e5d7c8] bg-white p-3 sm:p-4">
          <div className="rounded-[12px] bg-white p-2 shadow-[0_12px_26px_rgba(66,48,36,0.08)]">
            <QRCodeSVG
              value={value}
              size={170}
              bgColor="#ffffff"
              fgColor="#191614"
              level="M"
              includeMargin
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-[#1f1a16]">
        <ScanLine className="h-4 w-4 text-[#8a6742]" aria-hidden="true" />
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.38em] sm:text-[11px]">
          {label}
        </p>
      </div>
    </div>
  )
}
