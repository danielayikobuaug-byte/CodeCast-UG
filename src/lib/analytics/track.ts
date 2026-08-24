'use client';

import { addDoc, collection, serverTimestamp, type Firestore } from 'firebase/firestore';
import { parseUserAgent, resolveReferrerSource } from './parse-ua';
import { getOrCreateSessionId, getOrCreateVisitorId } from './identity';
import type { WebVitalName, WebVitalRating } from './types';

/**
 * Analytics writes are always best-effort: a blocked write (ad-blocker,
 * offline, Firestore hiccup) must never surface an error to a real visitor
 * or break the page they're on.
 */

const PAGE_VIEWS_COLLECTION = 'page-views';
const WEB_VITALS_COLLECTION = 'web-vitals';

function isTrackablePath(path: string): boolean {
  // Don't count admin staff browsing their own dashboard as site traffic.
  return !path.startsWith('/admin');
}

export function trackPageView(firestore: Firestore, path: string): void {
  if (typeof window === 'undefined' || !isTrackablePath(path)) return;

  try {
    const { device, browser, os } = parseUserAgent(navigator.userAgent);
    const { id: visitorId, isNew } = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const referrerSource = resolveReferrerSource(document.referrer, window.location.hostname);

    void addDoc(collection(firestore, PAGE_VIEWS_COLLECTION), {
      path,
      device,
      browser,
      os,
      sessionId,
      visitorId,
      isNewVisitor: isNew,
      referrerSource,
      timestamp: serverTimestamp(),
    }).catch(() => {
      // Swallow — analytics must be invisible to the visitor.
    });
  } catch {
    // Ignore — never let tracking break the page.
  }
}

export function reportWebVital(
  firestore: Firestore,
  path: string,
  metric: { name: WebVitalName; value: number; rating: WebVitalRating }
): void {
  if (typeof window === 'undefined' || !isTrackablePath(path)) return;

  try {
    const sessionId = getOrCreateSessionId();
    void addDoc(collection(firestore, WEB_VITALS_COLLECTION), {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path,
      sessionId,
      timestamp: serverTimestamp(),
    }).catch(() => {
      // Swallow.
    });
  } catch {
    // Ignore.
  }
}
