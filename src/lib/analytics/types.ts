import type { Timestamp } from 'firebase/firestore';
import type { DeviceType } from './parse-ua';

export type WebVitalName = 'CLS' | 'INP' | 'LCP' | 'FCP' | 'TTFB';
export type WebVitalRating = 'good' | 'needs-improvement' | 'poor';

/** Raw shape of a `page-views` Firestore document. */
export interface PageViewDoc {
  id: string;
  path: string;
  referrerSource: string;
  device: DeviceType;
  browser: string;
  os: string;
  sessionId: string;
  visitorId: string;
  isNewVisitor: boolean;
  timestamp: Timestamp | null;
}

/** Raw shape of a `web-vitals` Firestore document. */
export interface WebVitalDoc {
  id: string;
  name: WebVitalName;
  value: number;
  rating: WebVitalRating;
  path: string;
  sessionId: string;
  timestamp: Timestamp | null;
}

/** A page view with its Firestore Timestamp resolved to a plain Date. */
export interface PageViewRecord extends Omit<PageViewDoc, 'timestamp'> {
  timestamp: Date;
}

export interface WebVitalRecord extends Omit<WebVitalDoc, 'timestamp'> {
  timestamp: Date;
}

export function toPageViewRecords(docs: PageViewDoc[]): PageViewRecord[] {
  return docs
    .filter((d) => !!d.timestamp)
    .map((d) => ({ ...d, timestamp: d.timestamp!.toDate() }));
}

export function toWebVitalRecords(docs: WebVitalDoc[]): WebVitalRecord[] {
  return docs
    .filter((d) => !!d.timestamp)
    .map((d) => ({ ...d, timestamp: d.timestamp!.toDate() }));
}
