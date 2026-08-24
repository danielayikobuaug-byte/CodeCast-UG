import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

const routes = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services/tv', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services/tv/smarttv', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/tv/streaming', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/tv/vod', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/tv/iptv', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/tv/tvinterface', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/tv/installation', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/services/software/web', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software/mobile', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software/systems', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software/marketing', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software/caller', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/services/software/tracking', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/partnership', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/news', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
