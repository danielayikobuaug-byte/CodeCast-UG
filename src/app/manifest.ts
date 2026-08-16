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
        src: 'https://i.pinimg.com/736x/b3/2d/58/b32d58f94b4dbdf83307e0844238c6f6.jpg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://i.pinimg.com/736x/b3/2d/58/b32d58f94b4dbdf83307e0844238c6f6.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}