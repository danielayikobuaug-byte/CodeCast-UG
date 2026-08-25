import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodeCast UG LTD',
    short_name: 'CodeCast',
    description: 'TV and IT Solutions in Uganda',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E1D30',
    theme_color: '#0E1D30',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}