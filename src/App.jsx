import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import DirectVideoPage from './pages/DirectVideoPage'
import { APP_CONFIG } from './config/appConfig'

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname)
    updatePath()
    window.addEventListener('popstate', updatePath)

    return () => {
      window.removeEventListener('popstate', updatePath)
    }
  }, [])

  const isMemoryRoute = /^\/memory\//.test(pathname)

  if (isMemoryRoute) {
    return <DirectVideoPage />
  }

  const qrValue = APP_CONFIG.qr.getMemoryUrl('wedding-001')

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#120d14] px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-[#d9c4a3]/20 bg-[#1b1719]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.52em] text-[#d9c39a]">
          Wedding Memory
        </p>

        <div className="mt-6 flex justify-center rounded-[20px] bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
          <QRCodeSVG value={qrValue} size={220} level="H" includeMargin={false} />
        </div>

        <p className="mt-6 text-center text-sm uppercase tracking-[0.2em] text-[#f5e5d1]">
          Scan to watch the wedding memory
        </p>
      </div>
    </main>
  )
}

export default App
