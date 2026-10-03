import { useRef } from 'react'

export default function QRCustomizer({ options, onChange }) {
  const fileInputRef = useRef(null)

  const update = (key, value) => {
    onChange({ ...options, [key]: value })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => update('logo', reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Customize</h3>
      <div style={styles.grid}>
        <div className="input-group">
          <label htmlFor="fgColor">Foreground Color</label>
          <div style={styles.colorRow}>
            <input
              type="color"
              id="fgColor"
              value={options.fgColor || '#000000'}
              onChange={e => update('fgColor', e.target.value)}
              style={styles.colorInput}
            />
            <input
              type="text"
              value={options.fgColor || '#000000'}
              onChange={e => update('fgColor', e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="bgColor">Background Color</label>
          <div style={styles.colorRow}>
            <input
              type="color"
              id="bgColor"
              value={options.bgColor || '#ffffff'}
              onChange={e => update('bgColor', e.target.value)}
              style={styles.colorInput}
            />
            <input
              type="text"
              value={options.bgColor || '#ffffff'}
              onChange={e => update('bgColor', e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="dotStyle">Dot Style</label>
          <select
            id="dotStyle"
            value={options.dotStyle || 'rounded'}
            onChange={e => update('dotStyle', e.target.value)}
          >
            <option value="rounded">Rounded</option>
            <option value="dots">Dots</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy Rounded</option>
            <option value="square">Square</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="errorCorrection">Error Correction</label>
          <select
            id="errorCorrection"
            value={options.errorCorrection || 'M'}
            onChange={e => update('errorCorrection', e.target.value)}
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>
      <div style={styles.logoSection}>
        <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()}>
          {options.logo ? 'Change Logo' : 'Add Logo'}
        </button>
        {options.logo && (
          <button className="btn btn-sm" style={{ color: 'var(--error)' }} onClick={() => update('logo', null)}>
            Remove
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    marginTop: '1rem',
  },
  heading: {
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: 'var(--text-secondary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.75rem',
  },
  colorRow: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  colorInput: {
    width: 40,
    height: 40,
    border: 'none',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    padding: 0,
  },
  logoSection: {
    marginTop: '0.75rem',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
}
