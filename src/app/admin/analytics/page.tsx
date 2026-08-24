'use client';

import { useMemo, useState } from 'react';
import { collection, limit, orderBy, query } from 'firebase/firestore';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Eye,
  Users,
  RefreshCcw,
  Sparkles,
  Gauge,
  Globe2,
  MonitorSmartphone,
  History,
  Loader2,
  Clock,
} from 'lucide-react';
import {
  buildUpdateHistory,
  filterSince,
  getActiveNow,
  getBrowserBreakdown,
  getDailySeries,
  getDeviceBreakdown,
  getTopPages,
  getTrafficSources,
  getTrendKpi,
  getVitalsSummary,
} from '@/lib/analytics/aggregate';
import { toPageViewRecords, toWebVitalRecords, type PageViewDoc, type WebVitalDoc } from '@/lib/analytics/types';
import { ShareBarChart, ShareDonutChart, VisitsTrendChart } from './_components/charts';
import { KpiTile, LiveActivityFeed, TopPagesList, UpdateHistoryTimeline, WebVitalCard } from './_components/widgets';

const RANGE_OPTIONS = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
] as const;

export default function AdminAnalyticsPage() {
  const db = useFirestore();
  const [rangeDays, setRangeDays] = useState<number>(30);

  // Fetch enough recent raw events to compute the widest range client-side.
  const pageViewsQuery = useMemoFirebase(
    () => query(collection(db, 'page-views'), orderBy('timestamp', 'desc'), limit(6000)),
    [db]
  );
  const webVitalsQuery = useMemoFirebase(
    () => query(collection(db, 'web-vitals'), orderBy('timestamp', 'desc'), limit(3000)),
    [db]
  );

  const projectsQuery = useMemoFirebase(() => collection(db, 'projects'), [db]);
  const postsQuery = useMemoFirebase(() => collection(db, 'blog-posts'), [db]);
  const logosQuery = useMemoFirebase(() => collection(db, 'client-logos'), [db]);
  const messagesQuery = useMemoFirebase(
    () => query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(20)),
    [db]
  );
  const subscribersQuery = useMemoFirebase(
    () => query(collection(db, 'subscribers'), orderBy('timestamp', 'desc'), limit(20)),
    [db]
  );

  const { data: pageViewDocs, loading: viewsLoading } = useCollection(pageViewsQuery);
  const { data: webVitalDocs, loading: vitalsLoading } = useCollection(webVitalsQuery);
  const { data: projects } = useCollection(projectsQuery);
  const { data: posts } = useCollection(postsQuery);
  const { data: logos } = useCollection(logosQuery);
  const { data: messages } = useCollection(messagesQuery);
  const { data: subscribers } = useCollection(subscribersQuery);

  const allViews = useMemo(
    () => toPageViewRecords((pageViewDocs ?? []) as PageViewDoc[]),
    [pageViewDocs]
  );
  const allVitals = useMemo(
    () => toWebVitalRecords((webVitalDocs ?? []) as WebVitalDoc[]),
    [webVitalDocs]
  );

  const rangedViews = useMemo(() => filterSince(allViews, rangeDays), [allViews, rangeDays]);
  const rangedVitals = useMemo(() => filterSince(allVitals, rangeDays), [allVitals, rangeDays]);

  const dailySeries = useMemo(() => getDailySeries(allViews, rangeDays), [allViews, rangeDays]);
  const visitsTrend = useMemo(() => getTrendKpi(allViews, rangeDays, 'visits'), [allViews, rangeDays]);
  const visitorsTrend = useMemo(() => getTrendKpi(allViews, rangeDays, 'uniqueVisitors'), [allViews, rangeDays]);
  const sessionsTrend = useMemo(() => getTrendKpi(allViews, rangeDays, 'sessions'), [allViews, rangeDays]);
  const newVisitorsTrend = useMemo(() => getTrendKpi(allViews, rangeDays, 'newVisitors'), [allViews, rangeDays]);

  const topPages = useMemo(() => getTopPages(rangedViews, 8), [rangedViews]);
  const trafficSources = useMemo(() => getTrafficSources(rangedViews, 5), [rangedViews]);
  const deviceBreakdown = useMemo(() => getDeviceBreakdown(rangedViews), [rangedViews]);
  const browserBreakdown = useMemo(() => getBrowserBreakdown(rangedViews, 5), [rangedViews]);
  const vitalsSummary = useMemo(() => getVitalsSummary(rangedVitals), [rangedVitals]);
  const activeNow = useMemo(() => getActiveNow(allViews, 5), [allViews]);

  const updateHistory = useMemo(
    () => buildUpdateHistory({ projects, posts, logos, messages, subscribers }),
    [projects, posts, logos, messages, subscribers]
  );

  const loading = viewsLoading || vitalsLoading;
  const capNote = (pageViewDocs?.length ?? 0) >= 6000;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Site Analytics</h1>
          <p className="text-muted-foreground">Real visitor traffic, engagement and performance — updated live.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="w-fit px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Live data
          </Badge>
          <Tabs value={String(rangeDays)} onValueChange={(v) => setRangeDays(Number(v))}>
            <TabsList className="rounded-full">
              {RANGE_OPTIONS.map((opt) => (
                <TabsTrigger key={opt.value} value={String(opt.value)} className="rounded-full text-xs font-bold">
                  {opt.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* KPI Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiTile title="Total Visits" icon={<Eye className="w-5 h-5" />} trend={visitsTrend} />
            <KpiTile title="Unique Visitors" icon={<Users className="w-5 h-5" />} trend={visitorsTrend} />
            <KpiTile title="Sessions" icon={<RefreshCcw className="w-5 h-5" />} trend={sessionsTrend} />
            <KpiTile title="New Visitors" icon={<Sparkles className="w-5 h-5" />} trend={newVisitorsTrend} />
          </div>

          {/* Visits trend + Live feed */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-3xl border-muted shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Visits Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {rangedViews.length === 0 ? (
                  <div className="h-[280px] flex flex-col items-center justify-center text-center gap-1 text-muted-foreground">
                    <span className="text-sm font-bold">No visits recorded yet</span>
                    <span className="text-xs">This chart fills in automatically as real traffic arrives.</span>
                  </div>
                ) : (
                  <VisitsTrendChart data={dailySeries} />
                )}
                {capNote && (
                  <p className="text-[11px] text-muted-foreground mt-3">
                    Showing the most recent 6,000 tracked events.
                  </p>
                )}
              </CardContent>
            </Card>

            <LiveActivityFeed views={allViews} activeNow={activeNow} />
          </div>

          {/* Traffic sources / device / browser */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="rounded-3xl border-muted shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ShareDonutChart data={trafficSources} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-muted shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <MonitorSmartphone className="w-5 h-5 text-primary" />
                  Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ShareDonutChart data={deviceBreakdown} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-muted shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  Browsers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ShareBarChart data={browserBreakdown} />
              </CardContent>
            </Card>
          </div>

          {/* Top pages + Web Vitals */}
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 rounded-3xl border-muted shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TopPagesList data={topPages} />
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-muted shadow-sm overflow-hidden h-full">
              <CardHeader className="border-b bg-secondary/10 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Update History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 max-h-[420px] overflow-y-auto">
                <UpdateHistoryTimeline entries={updateHistory} />
              </CardContent>
            </Card>
          </div>

          {/* Core Web Vitals */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Core Web Vitals</h2>
              <p className="text-sm text-muted-foreground">Real performance measured from actual visitor sessions (p75).</p>
            </div>
            {vitalsSummary.length === 0 ? (
              <Card className="rounded-3xl border-muted shadow-sm">
                <CardContent className="p-10 text-center text-muted-foreground text-sm">
                  No performance samples yet — vitals populate as visitors browse the live site.
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {vitalsSummary.map((v) => (
                  <WebVitalCard key={v.name} summary={v} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
