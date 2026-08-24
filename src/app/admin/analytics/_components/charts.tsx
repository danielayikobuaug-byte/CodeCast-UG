'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { DailyPoint, ShareSlice, TrendKpi } from '@/lib/analytics/aggregate';
import { cn } from '@/lib/utils';

const SERIES_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const visitsChartConfig = {
  visits: { label: 'Visits', color: 'hsl(var(--chart-1))' },
  uniqueVisitors: { label: 'Unique visitors', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

export function VisitsTrendChart({ data }: { data: DailyPoint[] }) {
  return (
    <ChartContainer config={visitsChartConfig} className="aspect-auto h-[280px] w-full">
      <AreaChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.28} />
            <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillUnique" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-uniqueVisitors)" stopOpacity={0.22} />
            <stop offset="95%" stopColor="var(--color-uniqueVisitors)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={32}
          fontSize={11}
        />
        <ChartTooltip cursor={{ stroke: 'hsl(var(--border))' }} content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="visits"
          type="monotone"
          fill="url(#fillVisits)"
          stroke="var(--color-visits)"
          strokeWidth={2}
        />
        <Area
          dataKey="uniqueVisitors"
          type="monotone"
          fill="url(#fillUnique)"
          stroke="var(--color-uniqueVisitors)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

export function ShareDonutChart({ data }: { data: ShareSlice[] }) {
  const config = data.reduce((acc, slice, i) => {
    acc[slice.label] = { label: slice.label, color: SERIES_COLORS[i % SERIES_COLORS.length] };
    return acc;
  }, {} as ChartConfig);

  if (data.length === 0) {
    return <EmptyChartState />;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <ChartContainer config={config} className="aspect-square h-[200px] w-[200px] shrink-0">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="label" />} />
          <Pie data={data} dataKey="count" nameKey="label" innerRadius={52} outerRadius={80} strokeWidth={2} stroke="hsl(var(--card))">
            {data.map((slice, i) => (
              <Cell key={slice.label} fill={SERIES_COLORS[i % SERIES_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <ul className="flex-1 w-full space-y-2.5">
        {data.map((slice, i) => (
          <li key={slice.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
              />
              <span className="font-medium truncate">{slice.label}</span>
            </span>
            <span className="text-muted-foreground font-bold tabular-nums shrink-0">
              {slice.pct.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const barChartConfig = {
  count: { label: 'Views', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

export function ShareBarChart({ data }: { data: ShareSlice[] }) {
  if (data.length === 0) return <EmptyChartState />;
  return (
    <ChartContainer config={barChartConfig} className="aspect-auto h-[220px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
        <CartesianGrid horizontal={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <XAxis type="number" hide />
        <ChartTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel nameKey="label" />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 6, 6, 0]} barSize={16} />
      </BarChart>
    </ChartContainer>
  );
}

/** Small inline trend line used inside a KPI tile — the "slope" indicator. */
export function SlopeSparkline({ points, positive }: { points: number[]; positive: boolean }) {
  const data = points.map((v, i) => ({ i, v }));
  const color = positive ? 'hsl(var(--status-good))' : 'hsl(var(--status-critical))';
  const config = { v: { label: 'Value', color } } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="h-10 w-24 aspect-auto">
      <LineChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
        <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  );
}

function EmptyChartState() {
  return (
    <div className="h-[200px] w-full flex flex-col items-center justify-center text-center gap-1 text-muted-foreground">
      <span className="text-sm font-bold">No data yet</span>
      <span className="text-xs">Numbers will appear as real visitors arrive.</span>
    </div>
  );
}
