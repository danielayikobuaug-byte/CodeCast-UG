'use client';

/**
 * Anonymous visitor/session identity, entirely client-side.
 *
 * - `visitorId` lives in localStorage and is used only to distinguish
 *   "new" vs "returning" visitors — it is a random opaque token, never
 *   tied to any personal information.
 * - `sessionId` lives in sessionStorage and resets when the browser tab
 *   closes, letting us count sessions and de-dupe "active now" numbers.
 */

const VISITOR_KEY = 'ccug_vid';
const SESSION_KEY = 'ccug_sid';

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getOrCreateVisitorId(): { id: string; isNew: boolean } {
  if (typeof window === 'undefined') return { id: 'server', isNew: false };
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return { id: existing, isNew: false };
    const id = randomId();
    window.localStorage.setItem(VISITOR_KEY, id);
    return { id, isNew: true };
  } catch {
    // Storage disabled (private mode, etc.) — fall back to a per-call id.
    return { id: randomId(), isNew: true };
  }
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = randomId();
    window.sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return randomId();
  }
}
