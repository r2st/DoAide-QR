import { describe, it, expect } from 'vitest'
import { QR_TYPES } from '../utils/qrTypes'

describe('QR_TYPES', () => {
  it('has 12 QR types', () => {
    expect(QR_TYPES).toHaveLength(12)
  })

  it('each type has required fields', () => {
    for (const type of QR_TYPES) {
      expect(type.id).toBeTruthy()
      expect(type.name).toBeTruthy()
      expect(type.title).toBeTruthy()
      expect(type.path).toMatch(/^\/qr\//)
      expect(type.metaDescription).toBeTruthy()
    }
  })

  it('has unique IDs', () => {
    const ids = QR_TYPES.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique paths', () => {
    const paths = QR_TYPES.map(t => t.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('includes all expected types', () => {
    const ids = QR_TYPES.map(t => t.id)
    expect(ids).toContain('url')
    expect(ids).toContain('wifi')
    expect(ids).toContain('vcard')
    expect(ids).toContain('whatsapp')
    expect(ids).toContain('upi')
    expect(ids).toContain('event')
  })
})
