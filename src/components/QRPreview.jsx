import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'

export default function QRPreview({ data, options = {} }) {
  const containerRef = useRef(null)
  const qrRef = useRef(null)

  const mergedOptions = {
    width: 280,
    height: 280,
    data: data || ' ',
    dotsOptions: {
      color: options.fgColor || '#000000',
      type: options.dotStyle || 'rounded',
    },
    backgroundOptions: {
      color: options.bgColor || '#ffffff',
    },
    cornersSquareOptions: {
      type: 'extra-rounded',
      color: options.fgColor || '#000000',
    },
    cornersDotOptions: {
      type: 'dot',
      color: options.fgColor || '#000000',
    },
    qrOptions: {
      errorCorrectionLevel: options.errorCorrection || 'M',
    },
  }

  if (options.logo) {
    mergedOptions.image = options.logo
    mergedOptions.imageOptions = {
      crossOrigin: 'anonymous',
      margin: 5,
      imageSize: 0.3,
    }
  }

  useEffect(() => {
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(mergedOptions)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
        qrRef.current.append(containerRef.current)
      }
    } else {
      qrRef.current.update(mergedOptions)
    }
  }, [data, options.fgColor, options.bgColor, options.dotStyle, options.errorCorrection, options.logo])

  const handleDownload = async (format) => {
    if (qrRef.current) {
      await qrRef.current.download({
        name: 'doaide-qr-code',
        extension: format,
      })
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.previewBox}>
        <div ref={containerRef} style={styles.qrContainer} data-testid="qr-preview" />
      </div>
      <div style={styles.downloadRow}>
        <button className="btn btn-primary btn-sm" onClick={() => handleDownload('png')}>PNG</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleDownload('svg')}>SVG</button>
        <button className="btn btn-secondary btn-sm" onClick={() => handleDownload('webp')}>WebP</button>
      </div>
      {data && data.trim() !== '' && (
        <ShareButtons data={data} />
      )}
    </div>
  )
}

function ShareButtons({ data }) {
  const shareText = 'Check out this QR code I made with DoAide QR!'
  const shareUrl = 'https://qr.doaide.com'

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  return (
    <div style={styles.shareRow}>
      <span style={styles.shareLabel}>Share:</span>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: '#25D366', color: '#fff' }}>
        WhatsApp
      </a>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: '#1DA1F2', color: '#fff' }}>
        Twitter
      </a>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  previewBox: {
    background: '#ffffff',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrContainer: {
    width: 280,
    height: 280,
  },
  downloadRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  shareRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  shareLabel: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
  },
}
