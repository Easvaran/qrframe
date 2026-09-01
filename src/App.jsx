import { useEffect, useState } from 'react'
import QRScanner from './components/QRScanner'
import ARMemoryPage from './pages/ARMemoryPage'

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
    return <ARMemoryPage />
  }

  const handleQrDetected = (value) => {
    console.log('QR detected:', value)
  }

  return (
    <div className="h-[100dvh] w-[100vw] bg-black">
      <QRScanner onQrDetected={handleQrDetected} title="Scan QR Code" />
    </div>
  )
}

export default App
