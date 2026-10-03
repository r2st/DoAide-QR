import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import QRPreview from '../components/QRPreview'
import QRCustomizer from '../components/QRCustomizer'
import QRTypeFields from '../components/QRTypeFields'
import { QR_TYPES } from '../utils/qrTypes'
import { generateQRData } from '../utils/qrDataGenerators'

export default function QRGenerator() {
  const { type } = useParams()
  const qrType = QR_TYPES.find(t => t.id === type)
  const [fields, setFields] = useState({})
  const [options, setOptions] = useState({})

  const qrData = useMemo(() => generateQRData(type, fields), [type, fields])

  if (!qrType) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>QR Type Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>The QR code type "{type}" doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: qrType.title,
    url: `https://qr.doaide.com${qrType.path}`,
    description: qrType.metaDescription,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <>
      <SEO
        title={qrType.title}
        description={qrType.metaDescription}
        keywords={qrType.keywords}
        path={qrType.path}
        jsonLd={jsonLd}
      />
      <div className="container" style={styles.page}>
        <div style={styles.breadcrumb}>
          <Link to="/">Home</Link> / <span>{qrType.name} QR Code</span>
        </div>
        <h1 style={styles.title}>
          {qrType.icon} {qrType.title}
        </h1>
        <p style={styles.description}>{qrType.description}</p>

        <div style={styles.layout}>
          <div style={styles.formSide}>
            <div className="card">
              <QRTypeFields type={type} fields={fields} onChange={setFields} />
              <QRCustomizer options={options} onChange={setOptions} />
            </div>
          </div>
          <div style={styles.previewSide}>
            <div className="card" style={{ position: 'sticky', top: '80px' }}>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center' }}>Preview</h3>
              <QRPreview data={qrData} options={options} />
            </div>
          </div>
        </div>

        <div style={styles.otherTypes}>
          <h2 style={styles.otherTitle}>Other QR Code Types</h2>
          <div style={styles.otherGrid}>
            {QR_TYPES.filter(t => t.id !== type).map(t => (
              <Link key={t.id} to={t.path} style={styles.otherCard} onClick={() => { setFields({}); setOptions({}) }}>
                <span>{t.icon}</span> {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  page: {
    padding: '2rem 0 4rem',
  },
  breadcrumb: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  description: {
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    alignItems: 'start',
  },
  formSide: {},
  previewSide: {},
  otherTypes: {
    marginTop: '4rem',
  },
  otherTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  otherGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  otherCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '0.5rem 1rem',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s',
  },
}

const mobileCSS = `
@media (max-width: 768px) {
  [style*="grid-template-columns: 1fr 380px"] {
    grid-template-columns: 1fr !important;
  }
}
`
if (typeof document !== 'undefined') {
  const el = document.getElementById('qrgen-mobile-css') || document.createElement('style')
  el.id = 'qrgen-mobile-css'
  el.textContent = mobileCSS
  if (!document.getElementById('qrgen-mobile-css')) document.head.appendChild(el)
}
