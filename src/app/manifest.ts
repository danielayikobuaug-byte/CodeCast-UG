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
        src: 'https://i.pinimg.com/736x/2a/ed/42/2aed427a3ca30fbe9661b25b867fc532.jpg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://i.pinimg.com/736x/2a/ed/42/2aed427a3ca30fbe9661b25b867fc532.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}