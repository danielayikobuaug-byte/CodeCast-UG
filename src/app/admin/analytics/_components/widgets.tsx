'use client';

import { formatDistanceToNow } from 'date-fns';
import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  Radio,
  Monitor,
  Smartphone,
  Tablet,
  FolderKanban,
  Newspaper,
  ShieldCheck,
  MessageSquare,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SlopeSparkline } from './charts';
import {
  VITAL_META,
  type ShareSlice,
  type TrendKpi,
  type UpdateHistoryEntry,
  type VitalSummary,
} from '@/lib/analytics/aggregate';
import type { PageViewRecord } from '@/lib/analytics/types';

// --- KPI tile with slope sparkline --------------------------------------

export function KpiTile({
  title,
  icon,
  trend,
  format = (n: number) => n.toLocaleString(),
}: {
  title: string;
  icon: React.ReactNode;
  trend: TrendKpi;
  format?: (n: number) => string;
}) {
  const positive = trend.direction !== 'down';
  const hasSignal = trend.changePct !== null;

  return (
    <Card className="rounded-3xl border-muted shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            {icon}
          </div>
          <SlopeSparkline points={trend.sparkline.length ? trend.sparkline : [0, 0]} positive={positive} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-foreground tabular-nums">{format(trend.total)}</span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</span>
            {hasSignal && (
              <span
                className={cn(
                  'flex items-center text-[10px] font-bold px-2 py-1 rounded-full shrink-0',
                  trend.direction === 'up' && 'bg-green-100 text-green-700',
                  trend.direction === 'down' && 'bg-red-100 text-red-700',
                  trend.direction === 'flat' && 'bg-muted text-muted-foreground'
                )}
              >
                {trend.direction === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                {trend.direction === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {trend.direction === 'flat' && <Minus className="w-3 h-3 mr-0.5" />}
                {Math.abs(trend.changePct ?? 0).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Top pages table ------------------------------------------------------

export function TopPagesList({ data }: { data: ShareSlice[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground p-6 text-center">No page views recorded yet.</p>;
  }
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className="divide-y divide-muted">
      {data.map((row) => (
        <div key={row.label} className="p-4 md:p-5 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{row.label}</p>
            <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${max ? (row.count / max) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div className="text-right shrink-0 w-16">
            <span className="text-sm font-black tabular-nums block">{row.count.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground font-bold">{row.pct.toFixed(0)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Web Vitals ------------------------------------------------------------

const RATING_STYLES: Record<VitalSummary['overallRating'], { icon: React.ReactNode; label: string; className: string }> = {
  good: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, label: 'Good', className: 'bg-[hsl(var(--status-good))]/10 text-[hsl(var(--status-good))]' },
  'needs-improvement': {
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    label: 'Needs improvement',
    className: 'bg-[hsl(var(--status-warning))]/15 text-[hsl(var(--status-warning))]',
  },
  poor: { icon: <XCircle className="w-3.5 h-3.5" />, label: 'Poor', className: 'bg-[hsl(var(--status-critical))]/10 text-[hsl(var(--status-critical))]' },
};

function formatVitalValue(name: VitalSummary['name'], value: number): string {
  const unit = VITAL_META[name].unit;
  if (unit === 'ms') {
    return value >= 1000 ? `${(value / 1000).toFixed(2)}s` : `${Math.round(value)}ms`;
  }
  return value.toFixed(3);
}

export function WebVitalCard({ summary }: { summary: VitalSummary }) {
  const meta = VITAL_META[summary.name];
  const style = RATING_STYLES[summary.overallRating];

  return (
    <Card className="rounded-3xl border-muted shadow-sm overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{summary.name}</p>
            <p className="text-[11px] text-muted-foreground">{meta.description}</p>
          </div>
          <Badge className={cn('border-none flex items-center gap-1 px-2.5 py-1 font-bold text-[10px]', style.className)}>
            {style.icon}
            {style.label}
          </Badge>
        </div>
        <p className="text-2xl font-black tabular-nums">{formatVitalValue(summary.name, summary.p75)}
          <span className="text-xs font-bold text-muted-foreground ml-1.5">p75</span>
        </p>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded-full overflow-hidden bg-secondary flex">
            <div className="h-full bg-[hsl(var(--status-good))]" style={{ width: `${summary.goodPct}%` }} />
            <div className="h-full bg-[hsl(var(--status-warning))]" style={{ width: `${summary.needsImprovementPct}%` }} />
            <div className="h-full bg-[hsl(var(--status-critical))]" style={{ width: `${summary.poorPct}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground font-bold">{summary.sampleSize.toLocaleString()} samples</p>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Live activity feed -----------------------------------------------------

const DEVICE_ICON: Record<string, React.ReactNode> = {
  desktop: <Monitor className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
  tablet: <Tablet className="w-4 h-4" />,
};

export function LiveActivityFeed({ views, activeNow }: { views: PageViewRecord[]; activeNow: number }) {
  const recent = views.slice(0, 12);

  return (
    <Card className="rounded-3xl border-muted shadow-sm overflow-hidden h-full">
      <CardHeader className="border-b bg-secondary/10 p-6 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary" />
          Live Activity
        </CardTitle>
        <Badge className="bg-green-100 text-green-700 border-none px-3 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600" />
          </span>
          {activeNow} active now
        </Badge>
      </CardHeader>
      <CardContent className="p-0 max-h-[420px] overflow-y-auto">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground p-8 text-center">No visits recorded yet.</p>
        ) : (
          <div className="divide-y divide-muted">
            {recent.map((v) => (
              <div key={v.id} className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  {DEVICE_ICON[v.device] ?? <Monitor className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{v.path}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {v.browser} &middot; {v.referrerSource}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground shrink-0">
                  {formatDistanceToNow(v.timestamp, { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Update history timeline -----------------------------------------------

const KIND_META: Record<UpdateHistoryEntry['kind'], { icon: React.ReactNode; label: (title: string) => string; color: string }> = {
  project: { icon: <FolderKanban className="w-4 h-4" />, label: (t) => `Project added: ${t}`, color: 'bg-[hsl(var(--chart-1))]/10 text-[hsl(var(--chart-1))]' },
  post: { icon: <Newspaper className="w-4 h-4" />, label: (t) => `Blog post published: ${t}`, color: 'bg-[hsl(var(--chart-3))]/10 text-[hsl(var(--chart-3))]' },
  logo: { icon: <ShieldCheck className="w-4 h-4" />, label: (t) => `Partner logo added: ${t}`, color: 'bg-[hsl(var(--chart-4))]/15 text-[hsl(var(--chart-4))]' },
  message: { icon: <MessageSquare className="w-4 h-4" />, label: (t) => `New inquiry from ${t}`, color: 'bg-[hsl(var(--chart-2))]/10 text-[hsl(var(--chart-2))]' },
  subscriber: { icon: <Users className="w-4 h-4" />, label: (t) => `New subscriber: ${t}`, color: 'bg-[hsl(var(--chart-5))]/15 text-[hsl(var(--chart-5))]' },
};

export function UpdateHistoryTimeline({ entries }: { entries: UpdateHistoryEntry[] }) {
  const items = entries.slice(0, 20);

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground p-8 text-center">No content updates recorded yet.</p>;
  }

  return (
    <ol className="relative border-l border-muted ml-4 space-y-6 py-2">
      {items.map((entry) => {
        const meta = KIND_META[entry.kind];
        return (
          <li key={entry.id} className="ml-6">
            <span className={cn('absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-card', meta.color)}>
              {meta.icon}
            </span>
            <p className="text-sm font-bold leading-snug">{meta.label(entry.title)}</p>
            <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
              {formatDistanceToNow(entry.date, { addSuffix: true })}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
