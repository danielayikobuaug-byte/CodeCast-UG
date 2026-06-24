import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Street Pulse',
    short_name: 'StreetPulse',
    description: 'Live City Intelligence Platform',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F4FA',
    theme_color: '#501CEB',
    icons: [
      {
        src: 'https://picsum.photos/seed/streetpulse-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/streetpulse-icon-large/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
