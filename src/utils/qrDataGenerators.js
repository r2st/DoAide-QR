export function generateQRData(type, fields) {
  switch (type) {
    case 'url':
      return fields.url || ''

    case 'text':
      return fields.text || ''

    case 'wifi':
      return `WIFI:T:${fields.encryption || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};H:${fields.hidden ? 'true' : 'false'};;`

    case 'vcard': {
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
      ]
      if (fields.firstName || fields.lastName) {
        lines.push(`N:${fields.lastName || ''};${fields.firstName || ''};;;`)
        lines.push(`FN:${[fields.firstName, fields.lastName].filter(Boolean).join(' ')}`)
      }
      if (fields.phone) lines.push(`TEL:${fields.phone}`)
      if (fields.email) lines.push(`EMAIL:${fields.email}`)
      if (fields.organization) lines.push(`ORG:${fields.organization}`)
      if (fields.title) lines.push(`TITLE:${fields.title}`)
      if (fields.website) lines.push(`URL:${fields.website}`)
      if (fields.address) lines.push(`ADR:;;${fields.address};;;;`)
      lines.push('END:VCARD')
      return lines.join('\n')
    }

    case 'email': {
      let mailto = `mailto:${fields.email || ''}`
      const params = []
      if (fields.subject) params.push(`subject=${encodeURIComponent(fields.subject)}`)
      if (fields.body) params.push(`body=${encodeURIComponent(fields.body)}`)
      if (params.length) mailto += '?' + params.join('&')
      return mailto
    }

    case 'sms': {
      let sms = `sms:${fields.phone || ''}`
      if (fields.message) sms += `?body=${encodeURIComponent(fields.message)}`
      return sms
    }

    case 'whatsapp': {
      const phone = (fields.phone || '').replace(/[^0-9]/g, '')
      let url = `https://wa.me/${phone}`
      if (fields.message) url += `?text=${encodeURIComponent(fields.message)}`
      return url
    }

    case 'upi': {
      const params = [`pa=${fields.upiId || ''}`]
      if (fields.name) params.push(`pn=${encodeURIComponent(fields.name)}`)
      if (fields.amount) params.push(`am=${fields.amount}`)
      if (fields.note) params.push(`tn=${encodeURIComponent(fields.note)}`)
      params.push('cu=INR')
      return `upi://pay?${params.join('&')}`
    }

    case 'phone':
      return `tel:${fields.phone || ''}`

    case 'location': {
      if (fields.latitude && fields.longitude) {
        return `geo:${fields.latitude},${fields.longitude}`
      }
      return fields.mapsUrl || ''
    }

    case 'event': {
      const formatDate = (dateStr) => {
        if (!dateStr) return ''
        return dateStr.replace(/[-:]/g, '').replace(/\.\d{3}/, '') + (dateStr.includes('T') ? '' : 'T000000')
      }
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
      ]
      if (fields.title) lines.push(`SUMMARY:${fields.title}`)
      if (fields.startDate) lines.push(`DTSTART:${formatDate(fields.startDate)}`)
      if (fields.endDate) lines.push(`DTEND:${formatDate(fields.endDate)}`)
      if (fields.location) lines.push(`LOCATION:${fields.location}`)
      if (fields.description) lines.push(`DESCRIPTION:${fields.description}`)
      lines.push('END:VEVENT', 'END:VCALENDAR')
      return lines.join('\n')
    }

    case 'appstore':
      return fields.storeUrl || ''

    default:
      return ''
  }
}
