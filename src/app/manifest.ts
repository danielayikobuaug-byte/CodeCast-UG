import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodeCast UG LTD',
    short_name: 'CodeCast',
    description: 'Technology & Entertainment Solutions in Kampala, Uganda',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E1D30',
    theme_color: '#0E1D30',
    icons: [
      {
        src: 'https://picsum.photos/seed/codecast-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/codecast-icon-large/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}