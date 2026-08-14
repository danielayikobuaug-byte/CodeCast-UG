'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const STATS_DATA = [
  { target: 100, label: "Projects Delivered", suffix: "+" },
  { target: 50, label: "Happy Clients", suffix: "+" },
  { target: 12, label: "Core Services", suffix: "" },
  { target: 24, label: "Support", suffix: "/7" },
];

export function StatsBand({ className }: { className?: string }) {
  const [counts, setCounts] = useState(STATS_DATA.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = 1 - Math.pow(1 - currentFrame / totalFrames, 3); // Ease out cubic animation

      setCounts(STATS_DATA.map(stat => Math.floor(stat.target * progress)));

      if (currentFrame === totalFrames) {
        clearInterval(timer);
        setCounts(STATS_DATA.map(stat => stat.target));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={cn("py-20 bg-foreground text-white relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-primary/10" />
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent mb-3 tracking-tighter">
                {counts[idx]}{stat.suffix}
              </p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
