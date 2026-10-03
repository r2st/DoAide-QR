import { useState } from 'react'
import SEO from '../components/SEO'

export default function Embed() {
  const [type, setType] = useState('url')
  const [width, setWidth] = useState('400')
  const [height, setHeight] = useState('500')

  const embedCode = `<iframe src="https://qr.doaide.com/qr/${type}" width="${width}" height="${height}" frameborder="0" style="border:none;border-radius:12px;" title="DoAide QR Code Generator"></iframe>`

  return (
    <>
      <SEO
        title="Embed QR Code Generator"
        description="Embed DoAide QR code generator widget on your website. Free, customizable, responsive."
        path="/embed"
      />
      <div className="container" style={{ padding: '2rem 0 4rem', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Embed QR Generator</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Add a free QR code generator to your website with a simple embed code.
        </p>

        <div className="card">
          <div className="grid-2">
            <div className="input-group">
              <label htmlFor="embedType">QR Type</label>
              <select id="embedType" value={type} onChange={e => setType(e.target.value)}>
                <option value="url">URL</option>
                <option value="text">Text</option>
                <option value="wifi">WiFi</option>
                <option value="vcard">vCard</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="upi">UPI Payment</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="embedWidth">Width (px)</label>
              <input id="embedWidth" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            </div>
          </div>
          <div className="input-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="embedHeight">Height (px)</label>
            <input id="embedHeight" type="number" value={height} onChange={e => setHeight(e.target.value)} />
          </div>

          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <label>Embed Code</label>
            <textarea
              value={embedCode}
              readOnly
              rows={4}
              style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
              onClick={e => e.target.select()}
            />
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: '0.75rem' }}
            onClick={() => navigator.clipboard.writeText(embedCode)}
          >
            Copy Embed Code
          </button>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Preview</h3>
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius)', padding: '1rem', overflow: 'auto' }}>
            <iframe
              src={`/qr/${type}`}
              width={width}
              height={height}
              frameBorder="0"
              style={{ border: 'none', borderRadius: 12, maxWidth: '100%' }}
              title="DoAide QR Code Generator Preview"
            />
          </div>
        </div>
      </div>
    </>
  )
}
