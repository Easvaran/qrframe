import QRScanner from './components/QRScanner'

function App() {
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
