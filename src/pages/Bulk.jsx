import { useState, useCallback } from 'react'
import SEO from '../components/SEO'

export default function Bulk() {
  const [urls, setUrls] = useState('')
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [options, setOptions] = useState({ fgColor: '#000000', bgColor: '#ffffff' })

  const handleGenerate = useCallback(async () => {
    const lines = urls.split('\n').map(l => l.trim()).filter(Boolean)
    if (lines.length === 0) return

    setGenerating(true)
    setProgress(0)

    try {
      const JSZip = (await import('jszip')).default
      const QRCodeStyling = (await import('qr-code-styling')).default

      const zip = new JSZip()

      for (let i = 0; i < lines.length; i++) {
        const qr = new QRCodeStyling({
          width: 400,
          height: 400,
          data: lines[i],
          dotsOptions: { color: options.fgColor, type: 'rounded' },
          backgroundOptions: { color: options.bgColor },
          qrOptions: { errorCorrectionLevel: 'M' },
        })

        const blob = await qr.getRawData('png')
        if (blob) {
          const safeName = lines[i]
            .replace(/^https?:\/\//, '')
            .replace(/[^a-zA-Z0-9.-]/g, '_')
            .slice(0, 50)
          zip.file(`${String(i + 1).padStart(3, '0')}_${safeName}.png`, blob)
        }
        setProgress(Math.round(((i + 1) / lines.length) * 100))
      }

      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = 'doaide-qr-codes.zip'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Bulk generation failed:', err)
    } finally {
      setGenerating(false)
    }
  }, [urls, options])

  const lineCount = urls.split('\n').filter(l => l.trim()).length

  return (
    <>
      <SEO
        title="Bulk QR Code Generator"
        description="Generate multiple QR codes at once. Paste a list of URLs and download a ZIP file of QR codes."
        path="/bulk"
      />
      <div className="container" style={{ padding: '2rem 0 4rem', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bulk QR Code Generator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Paste one URL per line. We'll generate QR codes for all of them and package them in a ZIP file.
        </p>

        <div className="card">
          <div className="input-group">
            <label htmlFor="bulkUrls">URLs (one per line)</label>
            <textarea
              id="bulkUrls"
              value={urls}
              onChange={e => setUrls(e.target.value)}
              rows={10}
              placeholder={'https://example.com\nhttps://google.com\nhttps://github.com'}
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            {lineCount} URL{lineCount !== 1 ? 's' : ''} detected
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <div className="input-group" style={{ flex: 0 }}>
              <label htmlFor="bulkFg">FG</label>
              <input type="color" id="bulkFg" value={options.fgColor} onChange={e => setOptions(p => ({ ...p, fgColor: e.target.value }))} style={{ width: 40, height: 36 }} />
            </div>
            <div className="input-group" style={{ flex: 0 }}>
              <label htmlFor="bulkBg">BG</label>
              <input type="color" id="bulkBg" value={options.bgColor} onChange={e => setOptions(p => ({ ...p, bgColor: e.target.value }))} style={{ width: 40, height: 36 }} />
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: '1.5rem', width: '100%' }}
            onClick={handleGenerate}
            disabled={generating || lineCount === 0}
          >
            {generating ? `Generating... ${progress}%` : `Generate ${lineCount} QR Code${lineCount !== 1 ? 's' : ''}`}
          </button>

          {generating && (
            <div style={{ marginTop: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <div style={{ height: 4, background: 'var(--gold)', width: `${progress}%`, transition: 'width 0.3s' }} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
