export default function QRTypeFields({ type, fields, onChange }) {
  const update = (key, value) => {
    onChange({ ...fields, [key]: value })
  }

  switch (type) {
    case 'url':
      return (
        <div className="input-group">
          <label htmlFor="url">URL</label>
          <input id="url" type="url" placeholder="https://example.com" value={fields.url || ''} onChange={e => update('url', e.target.value)} />
        </div>
      )

    case 'text':
      return (
        <div className="input-group">
          <label htmlFor="text">Text</label>
          <textarea id="text" placeholder="Enter your text..." value={fields.text || ''} onChange={e => update('text', e.target.value)} rows={4} />
        </div>
      )

    case 'wifi':
      return (
        <>
          <div className="input-group">
            <label htmlFor="ssid">Network Name (SSID)</label>
            <input id="ssid" placeholder="MyWiFi" value={fields.ssid || ''} onChange={e => update('ssid', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="wifiPassword">Password</label>
            <input id="wifiPassword" type="password" placeholder="Password" value={fields.password || ''} onChange={e => update('password', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="encryption">Encryption</label>
            <select id="encryption" value={fields.encryption || 'WPA'} onChange={e => update('encryption', e.target.value)}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
          <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" id="hidden" checked={fields.hidden || false} onChange={e => update('hidden', e.target.checked)} />
            <label htmlFor="hidden" style={{ margin: 0 }}>Hidden Network</label>
          </div>
        </>
      )

    case 'vcard':
      return (
        <>
          <div className="grid-2">
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" placeholder="John" value={fields.firstName || ''} onChange={e => update('firstName', e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" placeholder="Doe" value={fields.lastName || ''} onChange={e => update('lastName', e.target.value)} />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="vcardPhone">Phone</label>
            <input id="vcardPhone" type="tel" placeholder="+1234567890" value={fields.phone || ''} onChange={e => update('phone', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="vcardEmail">Email</label>
            <input id="vcardEmail" type="email" placeholder="john@example.com" value={fields.email || ''} onChange={e => update('email', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="organization">Organization</label>
            <input id="organization" placeholder="Acme Inc." value={fields.organization || ''} onChange={e => update('organization', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="vcardTitle">Title</label>
            <input id="vcardTitle" placeholder="CEO" value={fields.title || ''} onChange={e => update('title', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="website">Website</label>
            <input id="website" type="url" placeholder="https://example.com" value={fields.website || ''} onChange={e => update('website', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" placeholder="123 Main St, City, Country" value={fields.address || ''} onChange={e => update('address', e.target.value)} rows={2} />
          </div>
        </>
      )

    case 'email':
      return (
        <>
          <div className="input-group">
            <label htmlFor="emailTo">Email Address</label>
            <input id="emailTo" type="email" placeholder="hello@example.com" value={fields.email || ''} onChange={e => update('email', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="emailSubject">Subject</label>
            <input id="emailSubject" placeholder="Hello!" value={fields.subject || ''} onChange={e => update('subject', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="emailBody">Body</label>
            <textarea id="emailBody" placeholder="Message body..." value={fields.body || ''} onChange={e => update('body', e.target.value)} rows={3} />
          </div>
        </>
      )

    case 'sms':
      return (
        <>
          <div className="input-group">
            <label htmlFor="smsPhone">Phone Number</label>
            <input id="smsPhone" type="tel" placeholder="+1234567890" value={fields.phone || ''} onChange={e => update('phone', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="smsMessage">Message</label>
            <textarea id="smsMessage" placeholder="Your message..." value={fields.message || ''} onChange={e => update('message', e.target.value)} rows={3} />
          </div>
        </>
      )

    case 'whatsapp':
      return (
        <>
          <div className="input-group">
            <label htmlFor="waPhone">Phone Number (with country code)</label>
            <input id="waPhone" type="tel" placeholder="+919876543210" value={fields.phone || ''} onChange={e => update('phone', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="waMessage">Message (optional)</label>
            <textarea id="waMessage" placeholder="Hi! I found your contact via QR code." value={fields.message || ''} onChange={e => update('message', e.target.value)} rows={3} />
          </div>
        </>
      )

    case 'upi':
      return (
        <>
          <div className="input-group">
            <label htmlFor="upiId">UPI ID</label>
            <input id="upiId" placeholder="name@upi" value={fields.upiId || ''} onChange={e => update('upiId', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="upiName">Payee Name</label>
            <input id="upiName" placeholder="Store Name" value={fields.name || ''} onChange={e => update('name', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="upiAmount">Amount (optional)</label>
            <input id="upiAmount" type="number" placeholder="100" value={fields.amount || ''} onChange={e => update('amount', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="upiNote">Transaction Note</label>
            <input id="upiNote" placeholder="Payment for..." value={fields.note || ''} onChange={e => update('note', e.target.value)} />
          </div>
        </>
      )

    case 'phone':
      return (
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input id="phoneNumber" type="tel" placeholder="+1234567890" value={fields.phone || ''} onChange={e => update('phone', e.target.value)} />
        </div>
      )

    case 'location':
      return (
        <>
          <div className="grid-2">
            <div className="input-group">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" type="number" step="any" placeholder="40.7128" value={fields.latitude || ''} onChange={e => update('latitude', e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" type="number" step="any" placeholder="-74.0060" value={fields.longitude || ''} onChange={e => update('longitude', e.target.value)} />
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.25rem 0 0.5rem' }}>— or —</p>
          <div className="input-group">
            <label htmlFor="mapsUrl">Google Maps URL</label>
            <input id="mapsUrl" type="url" placeholder="https://maps.google.com/..." value={fields.mapsUrl || ''} onChange={e => update('mapsUrl', e.target.value)} />
          </div>
        </>
      )

    case 'event':
      return (
        <>
          <div className="input-group">
            <label htmlFor="eventTitle">Event Title</label>
            <input id="eventTitle" placeholder="Team Meeting" value={fields.title || ''} onChange={e => update('title', e.target.value)} />
          </div>
          <div className="grid-2">
            <div className="input-group">
              <label htmlFor="startDate">Start Date & Time</label>
              <input id="startDate" type="datetime-local" value={fields.startDate || ''} onChange={e => update('startDate', e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End Date & Time</label>
              <input id="endDate" type="datetime-local" value={fields.endDate || ''} onChange={e => update('endDate', e.target.value)} />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="eventLocation">Location</label>
            <input id="eventLocation" placeholder="Conference Room A" value={fields.location || ''} onChange={e => update('location', e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="eventDescription">Description</label>
            <textarea id="eventDescription" placeholder="Event details..." value={fields.description || ''} onChange={e => update('description', e.target.value)} rows={3} />
          </div>
        </>
      )

    case 'appstore':
      return (
        <div className="input-group">
          <label htmlFor="storeUrl">App Store or Google Play URL</label>
          <input id="storeUrl" type="url" placeholder="https://apps.apple.com/app/..." value={fields.storeUrl || ''} onChange={e => update('storeUrl', e.target.value)} />
        </div>
      )

    default:
      return null
  }
}
