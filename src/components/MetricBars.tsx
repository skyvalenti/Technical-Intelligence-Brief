import React from 'react';
import type { Metrics } from '../types';

const trackConfig: Record<string, { color: string }> = {
  sev_1: { color: 'bg-[#FF4D6A]' },
  opp_1: { color: 'bg-[#00E676]' },
  sev_2: { color: 'bg-[#FFAA00]' },
  opp_2: { color: 'bg-[#00B4D8]' }
};

interface MetricBarsProps {
  metrics: Metrics;
}

export default function MetricBars({ metrics }: MetricBarsProps) {
  return (
    <div className="border border-[#1E2638] bg-[#0B0F17] p-4 space-y-3 font-mono">
      {Object.entries(metrics).map(([key, item]) => {
        const config = trackConfig[key] || { color: 'bg-cyan-500' };
        return (
          <div key={key} className="flex items-center justify-between gap-4 text-xs">
            {/* Dynamic Label and Driver */}
            <div className="w-96 text-[#C9D1D9] font-medium tracking-wide truncate">
              <span className="font-semibold text-white">{item.level}</span>{' '}
              <span className="text-[#8B949E]">({item.driver})</span>
            </div>

            {/* Visual Bar Track */}
            <div className="flex-1 bg-[#161D2A] h-2.5 rounded-full overflow-hidden">
              <div
                className={`${config.color} h-full rounded-full transition-all duration-500`}
                style={{ width: `${item.value}%` }}
              />
            </div>

            {/* Percentage Output */}
            <span className="w-12 text-right text-[#8B949E] font-bold">
              {item.value}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
