import { subDays, startOfDay, format, isAfter } from 'date-fns';
import type { PageViewRecord, WebVitalRecord, WebVitalName } from './types';

export interface DailyPoint {
  key: string;
  label: string;
  visits: number;
  uniqueVisitors: number;
  sessions: number;
  newVisitors: number;
}

export interface TrendKpi {
  total: number;
  changePct: number | null;
  direction: 'up' | 'down' | 'flat';
  sparkline: number[];
}

export interface ShareSlice {
  label: string;
  count: number;
  pct: number;
}

const OTHER_LABEL = 'Other';

function dayKey(d: Date): string {
  return format(startOfDay(d), 'yyyy-MM-dd');
}

export function filterSince<T extends { timestamp: Date }>(records: T[], days: number): T[] {
  const cutoff = subDays(new Date(), days);
  return records.filter((r) => isAfter(r.timestamp, cutoff));
}

/** Builds a zero-filled daily series of visits + unique visitors for the last N days. */
export function getDailySeries(views: PageViewRecord[], days: number): DailyPoint[] {
  const buckets = new Map<
    string,
    { visits: number; visitors: Set<string>; sessions: Set<string>; newVisitors: number }
  >();
  const today = startOfDay(new Date());

  for (let i = days - 1; i >= 0; i--) {
    const d = subDays(today, i);
    buckets.set(dayKey(d), { visits: 0, visitors: new Set(), sessions: new Set(), newVisitors: 0 });
  }

  const cutoff = subDays(today, days - 1);
  for (const v of views) {
    if (isAfter(cutoff, v.timestamp)) continue;
    const key = dayKey(v.timestamp);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.visits += 1;
    bucket.visitors.add(v.visitorId);
    bucket.sessions.add(v.sessionId);
    if (v.isNewVisitor) bucket.newVisitors += 1;
  }

  return Array.from(buckets.entries()).map(([key, val]) => ({
    key,
    label: format(new Date(key), 'MMM d'),
    visits: val.visits,
    uniqueVisitors: val.visitors.size,
    sessions: val.sessions.size,
    newVisitors: val.newVisitors,
  }));
}

/** Current vs. previous equal-length period, for KPI slope/trend tiles. */
export function getTrendKpi(
  views: PageViewRecord[],
  days: number,
  metric: 'visits' | 'uniqueVisitors' | 'sessions' | 'newVisitors' = 'visits'
): TrendKpi {
  const series = getDailySeries(views, days * 2);
  const previous = series.slice(0, days);
  const current = series.slice(days);

  const sum = (pts: DailyPoint[]) => pts.reduce((acc, p) => acc + p[metric], 0);
  const currentTotal = sum(current);
  const previousTotal = sum(previous);

  let changePct: number | null = null;
  if (previousTotal > 0) {
    changePct = ((currentTotal - previousTotal) / previousTotal) * 100;
  } else if (currentTotal > 0) {
    changePct = 100;
  }

  const direction: TrendKpi['direction'] =
    changePct === null || Math.abs(changePct) < 0.5 ? 'flat' : changePct > 0 ? 'up' : 'down';

  return {
    total: currentTotal,
    changePct,
    direction,
    sparkline: current.map((p) => p[metric]),
  };
}

function topNWithOther(counts: Map<string, number>, topN: number): ShareSlice[] {
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, topN);
  const rest = sorted.slice(topN);
  const otherCount = rest.reduce((acc, [, c]) => acc + c, 0);

  const slices: ShareSlice[] = head.map(([label, count]) => ({
    label,
    count,
    pct: (count / total) * 100,
  }));

  if (otherCount > 0) {
    slices.push({ label: OTHER_LABEL, count: otherCount, pct: (otherCount / total) * 100 });
  }

  return slices;
}

export function getTopPages(views: PageViewRecord[], limit = 8): ShareSlice[] {
  const counts = new Map<string, number>();
  for (const v of views) counts.set(v.path, (counts.get(v.path) ?? 0) + 1);
  return topNWithOther(counts, limit);
}

export function getTrafficSources(views: PageViewRecord[], topN = 5): ShareSlice[] {
  const counts = new Map<string, number>();
  for (const v of views) {
    if (v.referrerSource === 'Internal') continue;
    counts.set(v.referrerSource, (counts.get(v.referrerSource) ?? 0) + 1);
  }
  return topNWithOther(counts, topN);
}

export function getDeviceBreakdown(views: PageViewRecord[]): ShareSlice[] {
  const counts = new Map<string, number>();
  for (const v of views) counts.set(v.device, (counts.get(v.device) ?? 0) + 1);
  return topNWithOther(counts, 3);
}

export function getBrowserBreakdown(views: PageViewRecord[], topN = 5): ShareSlice[] {
  const counts = new Map<string, number>();
  for (const v of views) counts.set(v.browser, (counts.get(v.browser) ?? 0) + 1);
  return topNWithOther(counts, topN);
}

export function getActiveNow(views: PageViewRecord[], minutes = 5): number {
  const cutoff = new Date(Date.now() - minutes * 60 * 1000);
  const sessions = new Set<string>();
  for (const v of views) {
    if (v.timestamp >= cutoff) sessions.add(v.sessionId);
  }
  return sessions.size;
}

export function getNewVsReturning(views: PageViewRecord[]): ShareSlice[] {
  const seen = new Set<string>();
  let fresh = 0;
  let returning = 0;
  for (const v of views) {
    if (seen.has(v.visitorId)) continue;
    seen.add(v.visitorId);
    if (v.isNewVisitor) fresh += 1;
    else returning += 1;
  }
  const total = fresh + returning;
  if (total === 0) return [];
  return [
    { label: 'New', count: fresh, pct: (fresh / total) * 100 },
    { label: 'Returning', count: returning, pct: (returning / total) * 100 },
  ];
}

// --- Web Vitals -------------------------------------------------------

export const VITAL_META: Record<
  WebVitalName,
  { label: string; unit: 'ms' | ''; thresholds: [number, number]; description: string }
> = {
  LCP: { label: 'Largest Contentful Paint', unit: 'ms', thresholds: [2500, 4000], description: 'Loading speed' },
  INP: { label: 'Interaction to Next Paint', unit: 'ms', thresholds: [200, 500], description: 'Responsiveness' },
  CLS: { label: 'Cumulative Layout Shift', unit: '', thresholds: [0.1, 0.25], description: 'Visual stability' },
  FCP: { label: 'First Contentful Paint', unit: 'ms', thresholds: [1800, 3000], description: 'First paint' },
  TTFB: { label: 'Time to First Byte', unit: 'ms', thresholds: [800, 1800], description: 'Server response' },
};

export interface VitalSummary {
  name: WebVitalName;
  p75: number;
  sampleSize: number;
  goodPct: number;
  needsImprovementPct: number;
  poorPct: number;
  overallRating: 'good' | 'needs-improvement' | 'poor';
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[Math.max(0, idx)];
}

export function getVitalsSummary(vitals: WebVitalRecord[]): VitalSummary[] {
  const names: WebVitalName[] = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'];
  const summaries: VitalSummary[] = [];

  for (const name of names) {
    const samples = vitals.filter((v) => v.name === name);
    if (samples.length === 0) continue;

    const p75 = percentile(samples.map((s) => s.value), 75);
    const good = samples.filter((s) => s.rating === 'good').length;
    const poor = samples.filter((s) => s.rating === 'poor').length;
    const needsImprovement = samples.length - good - poor;

    const [goodThreshold, poorThreshold] = VITAL_META[name].thresholds;
    const overallRating: VitalSummary['overallRating'] =
      p75 <= goodThreshold ? 'good' : p75 <= poorThreshold ? 'needs-improvement' : 'poor';

    summaries.push({
      name,
      p75,
      sampleSize: samples.length,
      goodPct: (good / samples.length) * 100,
      needsImprovementPct: (needsImprovement / samples.length) * 100,
      poorPct: (poor / samples.length) * 100,
      overallRating,
    });
  }

  return summaries;
}

// --- Update history -----------------------------------------------------

export type UpdateKind = 'project' | 'post' | 'logo' | 'message' | 'subscriber';

export interface UpdateHistoryEntry {
  id: string;
  kind: UpdateKind;
  title: string;
  date: Date;
}

/** Numeric-string doc IDs in this app are `Date.now().toString()` at creation. */
function dateFromNumericId(id: string): Date | null {
  return /^\d{10,}$/.test(id) ? new Date(Number(id)) : null;
}

export function buildUpdateHistory(input: {
  projects?: any[];
  posts?: any[];
  logos?: any[];
  messages?: any[];
  subscribers?: any[];
}): UpdateHistoryEntry[] {
  const entries: UpdateHistoryEntry[] = [];

  for (const p of input.projects ?? []) {
    const date = dateFromNumericId(p.id);
    if (!date) continue;
    entries.push({ id: `project-${p.id}`, kind: 'project', title: p.title || 'Untitled project', date });
  }

  for (const post of input.posts ?? []) {
    const date = post.date?.toDate ? post.date.toDate() : dateFromNumericId(post.id);
    if (!date) continue;
    entries.push({ id: `post-${post.id}`, kind: 'post', title: post.title || 'Untitled post', date });
  }

  for (const logo of input.logos ?? []) {
    const date = dateFromNumericId(logo.id);
    if (!date) continue;
    entries.push({ id: `logo-${logo.id}`, kind: 'logo', title: logo.name || 'Partner logo', date });
  }

  for (const msg of input.messages ?? []) {
    const date = msg.timestamp?.toDate ? msg.timestamp.toDate() : null;
    if (!date) continue;
    entries.push({ id: `message-${msg.id}`, kind: 'message', title: msg.name || msg.email || 'New inquiry', date });
  }

  for (const sub of input.subscribers ?? []) {
    const date = sub.timestamp?.toDate ? sub.timestamp.toDate() : null;
    if (!date) continue;
    entries.push({ id: `subscriber-${sub.id}`, kind: 'subscriber', title: sub.email || 'New subscriber', date });
  }

  return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
}
