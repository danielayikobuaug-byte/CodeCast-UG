/**
 * Lightweight, dependency-free user-agent parsing.
 *
 * We deliberately avoid pulling in a full UA-parser library just to bucket
 * visits into a handful of device/browser/OS categories for the analytics
 * dashboard — this keeps the tracker's client bundle tiny.
 */

export type DeviceType = 'desktop' | 'mobile' | 'tablet';

export interface ParsedUserAgent {
  device: DeviceType;
  browser: string;
  os: string;
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  const s = ua || '';

  const isTablet = /iPad/i.test(s) || (/Android/i.test(s) && !/Mobile/i.test(s));
  const isMobile = !isTablet && (/Mobi|iPhone|iPod|Android/i.test(s));
  const device: DeviceType = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

  let browser = 'Other';
  if (/EdgA|Edg\//i.test(s)) browser = 'Edge';
  else if (/OPR\/|Opera/i.test(s)) browser = 'Opera';
  else if (/SamsungBrowser/i.test(s)) browser = 'Samsung Internet';
  else if (/FBAN|FBAV/i.test(s)) browser = 'Facebook App';
  else if (/Instagram/i.test(s)) browser = 'Instagram App';
  else if (/CriOS|Chrome\//i.test(s)) browser = 'Chrome';
  else if (/Firefox|FxiOS/i.test(s)) browser = 'Firefox';
  else if (/Safari/i.test(s) && !/Chrome/i.test(s)) browser = 'Safari';

  let os = 'Other';
  if (/Windows/i.test(s)) os = 'Windows';
  else if (/Android/i.test(s)) os = 'Android';
  else if (/iPhone|iPad|iPod|iOS/i.test(s)) os = 'iOS';
  else if (/Mac OS X|Macintosh/i.test(s)) os = 'macOS';
  else if (/Linux/i.test(s)) os = 'Linux';

  return { device, browser, os };
}

const KNOWN_SOURCES: Array<{ match: RegExp; label: string }> = [
  { match: /google\./i, label: 'Google' },
  { match: /bing\./i, label: 'Bing' },
  { match: /duckduckgo\./i, label: 'DuckDuckGo' },
  { match: /yahoo\./i, label: 'Yahoo' },
  { match: /facebook\.|fb\.com|l\.facebook/i, label: 'Facebook' },
  { match: /instagram\./i, label: 'Instagram' },
  { match: /(^|\.)x\.com|twitter\./i, label: 'X (Twitter)' },
  { match: /linkedin\./i, label: 'LinkedIn' },
  { match: /whatsapp\.|wa\.me/i, label: 'WhatsApp' },
  { match: /youtube\.|youtu\.be/i, label: 'YouTube' },
  { match: /tiktok\./i, label: 'TikTok' },
];

/**
 * Buckets a raw `document.referrer` value into a friendly traffic-source
 * label. Same-site referrers are labelled "Internal" so they don't inflate
 * external acquisition numbers.
 */
export function resolveReferrerSource(referrer: string, siteHost?: string): string {
  if (!referrer) return 'Direct';
  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, '');
    if (siteHost && host === siteHost.replace(/^www\./, '')) return 'Internal';
    const known = KNOWN_SOURCES.find((k) => k.match.test(host));
    if (known) return known.label;
    return host;
  } catch {
    return 'Direct';
  }
}
