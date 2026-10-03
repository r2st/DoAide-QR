import { describe, it, expect } from 'vitest'
import { generateQRData } from '../utils/qrDataGenerators'

describe('generateQRData', () => {
  it('generates URL data', () => {
    expect(generateQRData('url', { url: 'https://example.com' })).toBe('https://example.com')
  })

  it('returns empty string for empty URL', () => {
    expect(generateQRData('url', {})).toBe('')
  })

  it('generates text data', () => {
    expect(generateQRData('text', { text: 'Hello World' })).toBe('Hello World')
  })

  it('generates WiFi data with WPA encryption', () => {
    const result = generateQRData('wifi', { ssid: 'MyNetwork', password: 'pass123', encryption: 'WPA' })
    expect(result).toBe('WIFI:T:WPA;S:MyNetwork;P:pass123;H:false;;')
  })

  it('generates WiFi data with hidden network', () => {
    const result = generateQRData('wifi', { ssid: 'Hidden', password: 'secret', encryption: 'WPA', hidden: true })
    expect(result).toContain('H:true')
  })

  it('generates WiFi data with WEP encryption', () => {
    const result = generateQRData('wifi', { ssid: 'Old', password: 'wep123', encryption: 'WEP' })
    expect(result).toContain('T:WEP')
  })

  it('generates vCard data with full contact info', () => {
    const result = generateQRData('vcard', {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      organization: 'Acme',
      title: 'CEO',
      website: 'https://example.com',
      address: '123 Main St',
    })
    expect(result).toContain('BEGIN:VCARD')
    expect(result).toContain('FN:John Doe')
    expect(result).toContain('TEL:+1234567890')
    expect(result).toContain('EMAIL:john@example.com')
    expect(result).toContain('ORG:Acme')
    expect(result).toContain('TITLE:CEO')
    expect(result).toContain('END:VCARD')
  })

  it('generates vCard with partial data', () => {
    const result = generateQRData('vcard', { firstName: 'Jane' })
    expect(result).toContain('FN:Jane')
    expect(result).not.toContain('TEL:')
  })

  it('generates email mailto link', () => {
    const result = generateQRData('email', { email: 'hi@example.com', subject: 'Hello', body: 'Test' })
    expect(result).toBe('mailto:hi@example.com?subject=Hello&body=Test')
  })

  it('generates email with only address', () => {
    const result = generateQRData('email', { email: 'hi@example.com' })
    expect(result).toBe('mailto:hi@example.com')
  })

  it('generates SMS link', () => {
    const result = generateQRData('sms', { phone: '+1234567890', message: 'Hello' })
    expect(result).toBe('sms:+1234567890?body=Hello')
  })

  it('generates SMS without message', () => {
    const result = generateQRData('sms', { phone: '+1234567890' })
    expect(result).toBe('sms:+1234567890')
  })

  it('generates WhatsApp link', () => {
    const result = generateQRData('whatsapp', { phone: '+91 98765 43210', message: 'Hi there' })
    expect(result).toBe('https://wa.me/919876543210?text=Hi%20there')
  })

  it('generates WhatsApp link without message', () => {
    const result = generateQRData('whatsapp', { phone: '919876543210' })
    expect(result).toBe('https://wa.me/919876543210')
  })

  it('generates UPI payment link', () => {
    const result = generateQRData('upi', { upiId: 'merchant@upi', name: 'My Store', amount: '500', note: 'Order 42' })
    expect(result).toContain('upi://pay?')
    expect(result).toContain('pa=merchant@upi')
    expect(result).toContain('am=500')
    expect(result).toContain('cu=INR')
  })

  it('generates UPI without amount', () => {
    const result = generateQRData('upi', { upiId: 'test@upi' })
    expect(result).toContain('pa=test@upi')
    expect(result).not.toContain('am=')
  })

  it('generates phone call link', () => {
    expect(generateQRData('phone', { phone: '+1234567890' })).toBe('tel:+1234567890')
  })

  it('generates location with coordinates', () => {
    const result = generateQRData('location', { latitude: '40.7128', longitude: '-74.0060' })
    expect(result).toBe('geo:40.7128,-74.0060')
  })

  it('generates location with maps URL', () => {
    const result = generateQRData('location', { mapsUrl: 'https://maps.google.com/?q=40.7128,-74.0060' })
    expect(result).toBe('https://maps.google.com/?q=40.7128,-74.0060')
  })

  it('generates calendar event', () => {
    const result = generateQRData('event', {
      title: 'Team Meeting',
      startDate: '2025-03-15T10:00',
      endDate: '2025-03-15T11:00',
      location: 'Room A',
      description: 'Weekly sync',
    })
    expect(result).toContain('BEGIN:VCALENDAR')
    expect(result).toContain('SUMMARY:Team Meeting')
    expect(result).toContain('LOCATION:Room A')
    expect(result).toContain('END:VCALENDAR')
  })

  it('generates app store link', () => {
    expect(generateQRData('appstore', { storeUrl: 'https://apps.apple.com/app/test' })).toBe('https://apps.apple.com/app/test')
  })

  it('returns empty string for unknown type', () => {
    expect(generateQRData('unknown', {})).toBe('')
  })
})
