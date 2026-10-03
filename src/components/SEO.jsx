import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, path, jsonLd }) {
  const siteUrl = 'https://qr.doaide.com'
  const fullTitle = title ? `${title} | DoAide QR` : 'DoAide QR — Free QR Code Generator'
  const url = path ? `${siteUrl}${path}` : siteUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Generate QR codes for free. URL, WiFi, vCard, UPI, WhatsApp, and more. No login required.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DoAide QR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
