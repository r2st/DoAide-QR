import { useState, useRef, useEffect } from 'react'
import SEO from '../components/SEO'

export default function Scanner() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [mode, setMode] = useState('upload')
  const videoRef = useRef(null)
  const scannerRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop?.().catch(() => {})
      }
    }
  }, [])

  const startCamera = async () => {
    setError(null)
    setResult(null)
    setMode('camera')
    setScanning(true)

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scanner = new Html5Qrcode('scanner-container')
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setResult(decodedText)
          scanner.stop().catch(() => {})
          setScanning(false)
        },
        () => {}
      )
    } catch (err) {
      setError('Could not access camera. Please check permissions.')
      setScanning(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setResult(null)

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scanner = new Html5Qrcode('scanner-file')
      const decoded = await scanner.scanFile(file, true)
      setResult(decoded)
    } catch {
      setError('No QR code found in this image.')
    }
  }

  const stopCamera = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(() => {})
      setScanning(false)
    }
  }

  const isUrl = result && /^https?:\/\//i.test(result)

  return (
    <>
      <SEO
        title="QR Code Scanner"
        description="Scan QR codes using your camera or upload an image. Free online QR code reader."
        path="/scanner"
      />
      <div className="container" style={{ padding: '2rem 0 4rem', maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>QR Code Scanner</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Scan a QR code using your camera or upload an image file.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            className={`btn ${mode === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setMode('upload'); stopCamera() }}
          >
            Upload Image
          </button>
          <button
            className={`btn ${mode === 'camera' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={startCamera}
          >
            Use Camera
          </button>
        </div>

        {mode === 'upload' && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
              Choose Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <div id="scanner-file" style={{ display: 'none' }} />
          </div>
        )}

        {mode === 'camera' && (
          <div className="card">
            <div id="scanner-container" style={{ width: '100%', borderRadius: 'var(--radius)' }} />
            {scanning && (
              <button className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%' }} onClick={stopCamera}>
                Stop Camera
              </button>
            )}
          </div>
        )}

        {error && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#2a1010', borderRadius: 'var(--radius)', color: 'var(--error)' }}>
            {error}
          </div>
        )}

        {result && (
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Result</h3>
            <p style={{ wordBreak: 'break-all', fontSize: '1.05rem' }}>
              {isUrl ? (
                <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
              ) : (
                result
              )}
            </p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '0.75rem' }}
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </>
  )
}
