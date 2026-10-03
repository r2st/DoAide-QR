export const BLOG_POSTS = [
  {
    slug: 'qr-code-best-practices',
    title: '10 QR Code Best Practices for 2025',
    excerpt: 'Learn how to create effective QR codes that people actually scan. From sizing to error correction, these tips will maximize your QR code engagement.',
    date: '2025-01-15',
    readTime: '5 min read',
    content: `
## Why QR Code Design Matters

QR codes are everywhere — restaurant menus, product packaging, business cards, and billboards. But not all QR codes are created equal. A well-designed QR code gets scanned; a poorly designed one gets ignored.

## 1. Size Matters

The minimum recommended size for a printed QR code is 2 x 2 cm (about 0.8 x 0.8 inches). For scanning from a distance, follow the 10:1 rule — the scanning distance should be no more than 10 times the QR code width. A billboard QR code needs to be at least 30 cm wide for scanning from 3 meters away.

## 2. Use High Error Correction

QR codes have four error correction levels: L (7%), M (15%), Q (25%), and H (30%). Higher levels mean the QR code can still be read even if partially damaged or obscured. Use level H if you're adding a logo on top of the QR code.

## 3. Maintain Contrast

The foreground should be significantly darker than the background. Black on white gives the best results. If using colors, keep a minimum contrast ratio of 4:1. Never use light-colored dots on a light background.

## 4. Add a Quiet Zone

Every QR code needs a white border (quiet zone) of at least 4 modules wide around it. This helps scanners identify where the code starts and ends. Never crop the QR code too tightly.

## 5. Test Before Printing

Always test your QR code with at least three different scanning apps before printing. What works on one phone might fail on another. Test at the actual scanning distance too.

## 6. Use a Short URL

Shorter data creates simpler QR codes with larger modules, which are easier to scan. Use a URL shortener for long links, or better yet, create a short redirect on your own domain.

## 7. Add a Call to Action

Don't just put a QR code on something — tell people why they should scan it. "Scan for menu," "Scan for 20% off," or "Scan to connect" gives people a reason to pull out their phone.

## 8. Choose the Right Format

Use SVG for print materials (infinite scaling with no quality loss) and PNG for digital displays. Avoid JPEG — the compression artifacts can make QR codes unscannable.

## 9. Track Your QR Codes

Use URL parameters or dedicated short links to track how many people scan each QR code. This helps you understand which placements work and which don't.

## 10. Keep the Destination Mobile-Friendly

The person scanning your QR code is on a phone. Make sure the landing page is responsive, loads fast, and provides immediate value. A desktop-only page after a QR scan is a wasted opportunity.
    `,
  },
  {
    slug: 'upi-qr-codes-for-business',
    title: 'UPI QR Codes for Businesses: The Complete Guide',
    excerpt: 'How Indian businesses use UPI QR codes to accept payments instantly. Setup guide for Google Pay, PhonePe, and Paytm QR codes.',
    date: '2025-02-20',
    readTime: '7 min read',
    content: `
## The UPI Revolution

India processes over 10 billion UPI transactions per month, making it the largest real-time payment system in the world. At the heart of this revolution is the simple UPI QR code — a static image that lets anyone pay instantly using their phone.

## How UPI QR Codes Work

A UPI QR code encodes a payment URI in this format:

\`\`\`
upi://pay?pa=merchant@upi&pn=Store%20Name&am=100&cu=INR
\`\`\`

Key parameters:
- **pa** — The payee's UPI ID (required)
- **pn** — The payee's name (displayed to the payer)
- **am** — Amount (optional for static QR codes)
- **tn** — Transaction note
- **cu** — Currency (always INR)

## Static vs. Dynamic QR Codes

**Static QR codes** have no amount encoded — the customer enters the amount. Perfect for retail shops, street vendors, and service providers where the price varies.

**Dynamic QR codes** include a specific amount. Ideal for invoices, fixed-price products, and online checkout flows.

## Setting Up for Your Business

### Step 1: Get a UPI ID
Every Indian bank account comes with a default UPI ID (like mobilenumber@upi). You can also create custom IDs through apps like Google Pay, PhonePe, or Paytm Business.

### Step 2: Generate Your QR Code
Use DoAide QR's UPI QR code generator to create a branded QR code with your business name and optional fixed amount.

### Step 3: Display Prominently
Print your QR code and display it at every point of sale — the counter, near the billing area, on invoices, and at the entrance.

## Benefits for Small Businesses

1. **Zero setup cost** — No POS machine needed
2. **Instant settlement** — Money arrives in seconds
3. **No transaction fees** — UPI payments are free for merchants
4. **Digital records** — Every transaction is automatically logged
5. **Works offline** — The QR code is a static image; only the customer needs internet

## Tips for Maximum Adoption

- Print the QR code large enough (at least 5 cm x 5 cm)
- Add "Pay via UPI" text below the QR code
- Include logos of popular UPI apps (GPay, PhonePe, Paytm)
- Display the UPI ID as text too, for manual entry
- Test with all major UPI apps before printing

## Security Best Practices

- Never share your UPI PIN with anyone
- Set up transaction notifications on your phone
- Verify the payment amount before marking the transaction as complete
- Use a separate UPI ID for business transactions
- Report any unauthorized transactions to your bank immediately
    `,
  },
  {
    slug: 'wifi-qr-code-guide',
    title: 'WiFi QR Codes: Share Your Network Without Sharing Your Password',
    excerpt: 'Create WiFi QR codes that let guests connect to your network instantly. Perfect for cafes, hotels, offices, and homes.',
    date: '2025-03-10',
    readTime: '4 min read',
    content: `
## The Problem with WiFi Passwords

Every cafe, hotel, and office faces the same problem: guests need WiFi, and sharing passwords is awkward. You either print it on a card (which gets lost), announce it verbally (which gets forgotten), or type it in for each guest (which wastes time).

WiFi QR codes solve this completely.

## How WiFi QR Codes Work

A WiFi QR code encodes your network credentials in a standard format:

\`\`\`
WIFI:T:WPA;S:NetworkName;P:Password123;H:false;;
\`\`\`

When someone scans this QR code with their phone camera:
- **Android** — Automatically connects to the network
- **iPhone (iOS 11+)** — Shows a notification to join the network with one tap
- **Most QR scanner apps** — Offer to connect to the network

## Creating Your WiFi QR Code

### What You Need
1. Your WiFi network name (SSID)
2. Your WiFi password
3. Your encryption type (usually WPA/WPA2)

### Steps
1. Go to DoAide QR's WiFi QR code generator
2. Enter your SSID and password
3. Select your encryption type
4. Customize colors to match your brand
5. Download and print

## Best Use Cases

### Cafes and Restaurants
Print the QR code on table tents, receipts, or the wall near the entrance. Update it when you change the password — just reprint the QR code.

### Hotels
Place WiFi QR codes on the desk in each room, in the lobby, and at the reception. Different rooms can have different network credentials.

### Offices
Share the guest WiFi QR code in meeting rooms and reception areas. Keep the internal network QR code on the company intranet only.

### Home
Stick a QR code on your fridge or near the router. When guests visit, they scan instead of asking for the password.

## Security Considerations

- **Guest networks**: Always create a separate guest network. Never share your primary network credentials via QR code.
- **Regular rotation**: Change your WiFi password periodically and reprint the QR code.
- **Physical security**: Only display the QR code in areas where you want people to have access.
- **Encryption**: Always use WPA2 or WPA3 encryption. Never use WEP or no encryption.

## Pro Tips

1. **Add your logo** — A branded WiFi QR code looks more professional and trustworthy
2. **Include a label** — Add "Scan for WiFi" text near the QR code
3. **Use high error correction** — Printed QR codes can get smudged; higher error correction helps
4. **Test it first** — Scan the QR code with different phones before printing 100 copies
5. **Laminate it** — Protect printed QR codes from wear and tear, especially in high-traffic areas
    `,
  },
]
