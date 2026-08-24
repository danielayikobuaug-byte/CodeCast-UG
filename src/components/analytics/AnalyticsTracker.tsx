'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { trackPageView, reportWebVital } from '@/lib/analytics/track';
import type { WebVitalName, WebVitalRating } from '@/lib/analytics/types';

/**
 * Mounted once near the root of the app. Silently records a page-view on
 * every route change and reports Core Web Vitals for the first page of
 * each visit. Renders nothing.
 */
export function AnalyticsTracker() {
  const firestore = useFirestore();
  const pathname = usePathname();
  const vitalsWired = useRef(false);

  useEffect(() => {
    if (pathname) trackPageView(firestore, pathname);
  }, [firestore, pathname]);

  useEffect(() => {
    if (vitalsWired.current) return;
    vitalsWired.current = true;

    let cancelled = false;

    import('web-vitals')
      .then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
        if (cancelled) return;
        const handler = (metric: { name: string; value: number; rating: string }) => {
          reportWebVital(firestore, window.location.pathname, {
            name: metric.name as WebVitalName,
            value: metric.value,
            rating: metric.rating as WebVitalRating,
          });
        };
        onCLS(handler);
        onINP(handler);
        onLCP(handler);
        onFCP(handler);
        onTTFB(handler);
      })
      .catch(() => {
        // web-vitals failed to load — not worth surfacing.
      });

    return () => {
      cancelled = true;
    };
  }, [firestore]);

  return null;
}
