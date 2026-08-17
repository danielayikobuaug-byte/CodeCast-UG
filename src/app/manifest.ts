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
        src: 'https://i.pinimg.com/736x/53/cc/92/53cc92958e2c64b52694d8818de161e3.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: 'https://i.pinimg.com/736x/53/cc/92/53cc92958e2c64b52694d8818de161e3.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}