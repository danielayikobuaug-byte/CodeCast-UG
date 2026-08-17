import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News & Blog',
  description: 'Insights, updates and practical tips from the CodeCast UG LTD team on software, technology and entertainment in Uganda.',
  alternates: { canonical: '/news' },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
