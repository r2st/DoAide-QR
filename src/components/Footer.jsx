import { Link } from 'react-router-dom'
import { QR_TYPES } from '../utils/qrTypes'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.grid}>
          <div>
            <h3 style={styles.brand}>DoAide <span style={{ color: 'var(--gold)' }}>QR</span></h3>
            <p style={styles.desc}>
              Free, instant QR code generator. No login required. Part of the DoAide suite of tools.
            </p>
          </div>
          <div>
            <h4 style={styles.heading}>QR Code Types</h4>
            <div style={styles.linkGrid}>
              {QR_TYPES.map(t => (
                <Link key={t.id} to={t.path} style={styles.link}>{t.icon} {t.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={styles.heading}>Tools</h4>
            <Link to="/scanner" style={styles.link}>QR Scanner</Link>
            <Link to="/bulk" style={styles.link}>Bulk Generate</Link>
            <Link to="/embed" style={styles.link}>Embed Widget</Link>
          </div>
          <div>
            <h4 style={styles.heading}>Resources</h4>
            <Link to="/blog" style={styles.link}>Blog</Link>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={styles.link}>DoAide Suite</a>
          </div>
        </div>
        <div style={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} DoAide. All rights reserved.</p>
          <div style={styles.socialRow}>
            <a href="https://twitter.com/doaborai" target="_blank" rel="noopener noreferrer" style={styles.link}>Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border)',
    padding: '3rem 0 1.5rem',
    marginTop: '4rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  desc: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    lineHeight: 1.6,
  },
  heading: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: 'var(--text-secondary)',
  },
  linkGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
  },
  link: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.25rem',
  },
  bottom: {
    borderTop: '1px solid var(--border)',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
  socialRow: {
    display: 'flex',
    gap: '1rem',
  },
}
