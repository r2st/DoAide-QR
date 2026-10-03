import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>◻</span>
          <span>DoAide <span style={styles.gold}>QR</span></span>
        </Link>
        <button
          style={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <nav style={{ ...styles.nav, ...(menuOpen ? styles.navOpen : {}) }}>
          <Link to="/" style={styles.navLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/scanner" style={styles.navLink} onClick={() => setMenuOpen(false)}>Scanner</Link>
          <Link to="/bulk" style={styles.navLink} onClick={() => setMenuOpen(false)}>Bulk Generate</Link>
          <Link to="/blog" style={styles.navLink} onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/embed" style={styles.navLink} onClick={() => setMenuOpen(false)}>Embed</Link>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    position: 'relative',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.5rem',
    color: 'var(--gold)',
  },
  gold: {
    color: 'var(--gold)',
  },
  menuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    padding: '0.5rem',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  navOpen: {},
  navLink: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
}

const mobileCSS = `
@media (max-width: 768px) {
  header nav {
    display: none !important;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }
  header nav[style*="flex"] {
    display: flex !important;
  }
  header button[aria-label="Toggle menu"] {
    display: block !important;
  }
}
`

if (typeof document !== 'undefined') {
  const styleEl = document.getElementById('header-mobile-css') || document.createElement('style')
  styleEl.id = 'header-mobile-css'
  styleEl.textContent = mobileCSS
  if (!document.getElementById('header-mobile-css')) {
    document.head.appendChild(styleEl)
  }
}
