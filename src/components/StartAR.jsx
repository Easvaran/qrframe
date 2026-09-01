import { QRCodeSVG } from 'qrcode.react'

export default function StartAR({ onStart }) {
  const qrValue = 'https://wedding-memory.example.com/unlock?id=wedding-001'

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#120f0d]/78 px-5">
      <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-white/8 p-6 text-center text-white shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-[#d7c29a]">
          Wedding Memory
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-[-0.06em] text-white">
          Unlock Memory
        </h1>

        {/* QR Code Section */}
        <div className="mt-6 flex justify-center">
          <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <QRCodeSVG
              value={qrValue}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        <p className="mt-5 text-xs leading-5 text-[#f2e4d5]">
          Scan this QR code with your camera to start the AR experience
        </p>

        <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.32em] text-[#d7c29a]">
          Or
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#e2c08a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#1c1714] shadow-[0_18px_35px_rgba(211,172,108,0.4)] transition hover:scale-[1.01]"
        >
          Start Scanner
        </button>
      </div>
    </div>
  )
}
