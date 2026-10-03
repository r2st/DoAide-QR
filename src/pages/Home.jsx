import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { QR_TYPES } from '../utils/qrTypes'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DoAide QR',
    url: 'https://qr.doaide.com',
    description: 'Free QR code generator. Create QR codes for URLs, WiFi, vCards, UPI payments, WhatsApp, and more.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <>
      <SEO
        description="Generate QR codes for free — URL, WiFi, vCard, UPI, WhatsApp, and 8 more types. No signup. Download as PNG, SVG, or PDF."
        keywords="qr code generator, free qr code, qr code maker, create qr code online"
        path="/"
        jsonLd={jsonLd}
      />
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <h1 style={styles.heroTitle}>
            Generate QR Codes<br />
            <span style={styles.gold}>Free, Instant, No Login</span>
          </h1>
          <p style={styles.heroSub}>
            Create beautiful QR codes for URLs, WiFi, contacts, payments, and more.
            Download as PNG, SVG, or PDF. 100% free, works offline.
          </p>
          <div style={styles.heroCtas}>
            <Link to="/qr/url" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Create QR Code
            </Link>
            <Link to="/scanner" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Scan QR Code
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.typesSection}>
        <div className="container">
          <h2 style={styles.sectionTitle}>12 QR Code Types</h2>
          <p style={styles.sectionSub}>Choose the type that fits your needs</p>
          <div style={styles.typesGrid}>
            {QR_TYPES.map(t => (
              <Link key={t.id} to={t.path} style={styles.typeCard}>
                <span style={styles.typeIcon}>{t.icon}</span>
                <h3 style={styles.typeName}>{t.name}</h3>
                <p style={styles.typeDesc}>{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Why DoAide QR?</h2>
          <div style={styles.featuresGrid}>
            {[
              { icon: '⚡', title: 'Instant', desc: 'QR codes generate in real-time as you type. No waiting.' },
              { icon: '🔒', title: 'Private', desc: 'Everything runs in your browser. No data sent to servers.' },
              { icon: '🎨', title: 'Customizable', desc: 'Change colors, dot styles, and add your logo.' },
              { icon: '📦', title: 'Bulk Generation', desc: 'Generate hundreds of QR codes at once from a URL list.' },
              { icon: '📷', title: 'QR Scanner', desc: 'Scan QR codes with your camera or upload an image.' },
              { icon: '💾', title: 'Multiple Formats', desc: 'Download as PNG, SVG, or WebP.' },
            ].map((f, i) => (
              <div key={i} style={styles.featureCard}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    padding: '5rem 0 4rem',
    textAlign: 'center',
    background: 'radial-gradient(ellipse at top, #1a1600 0%, var(--bg-primary) 70%)',
  },
  heroInner: {
    maxWidth: 700,
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '1.25rem',
  },
  gold: {
    color: 'var(--gold)',
  },
  heroSub: {
    fontSize: '1.15rem',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    lineHeight: 1.7,
  },
  heroCtas: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  typesSection: {
    padding: '4rem 0',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  sectionSub: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  typesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  typeCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    transition: 'border-color 0.2s, transform 0.2s',
    display: 'block',
  },
  typeIcon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.75rem',
  },
  typeName: {
    fontSize: '1.05rem',
    fontWeight: 600,
    marginBottom: '0.375rem',
  },
  typeDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  featuresSection: {
    padding: '4rem 0',
    background: 'var(--bg-secondary)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  featureCard: {
    padding: '1.5rem',
  },
  featureIcon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: '0.5rem',
  },
  featureTitle: {
    fontSize: '1.05rem',
    fontWeight: 600,
    marginBottom: '0.375rem',
  },
  featureDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
}
