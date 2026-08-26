'use client';

import React, { useState, useEffect } from 'react';

const STATS_DATA = [
  { target: 165, label: "Clients Served", suffix: "+" },
  { target: 126, label: "Projects Delivered", suffix: "+" },
  { target: 7, label: "Years Experience", suffix: "+" },
  { target: 9, label: "Countries Served", suffix: "+" },
];

export function HeroStats() {
  const [counts, setCounts] = useState(STATS_DATA.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = 1 - Math.pow(1 - currentFrame / totalFrames, 3); // Ease out cubic

      setCounts(STATS_DATA.map(stat => Math.floor(stat.target * progress)));

      if (currentFrame === totalFrames) {
        clearInterval(timer);
        setCounts(STATS_DATA.map(stat => stat.target));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[240px] ml-auto">
      <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-none overflow-hidden divide-y divide-white/5 shadow-2xl">
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className="p-5 group hover:bg-white/5 transition-colors">
            <h4 className="text-2xl lg:text-3xl font-black text-white mb-0.5 tracking-tighter">
              {counts[idx]}{stat.suffix}
            </h4>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
