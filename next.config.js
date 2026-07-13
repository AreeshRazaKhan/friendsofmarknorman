/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // The guide funnel route was renamed /voter-guide → /socialism-101.
  // Redirect the old paths so existing links (bio, print, QR) keep working.
  async redirects() {
    return [
      { source: '/voter-guide', destination: '/socialism-101', permanent: true },
      {
        source: '/voter-guide/thank-you',
        destination: '/socialism-101/thank-you',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
