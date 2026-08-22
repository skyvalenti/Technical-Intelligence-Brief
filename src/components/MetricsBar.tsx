import React from 'react';
import { AlertCircle, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import type { Metrics } from '../types';

interface MetricsBarProps {
  metrics: Metrics;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {/* SEV-1 Metric */}
      <div className="bg-[#080d1a] border border-[#2a1320] p-3 rounded hud-corner-tl relative overflow-hidden font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-[#ff4b72] font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            {metrics.sev_1.level}
          </span>
          <span className="text-[10px] bg-red-950/80 text-[#ff8099] px-1.5 py-0.5 rounded border border-red-500/30">
            {metrics.sev_1.driver}
          </span>
        </div>
        <div className="text-2xl font-bold text-[#ff3366] mt-1 text-glow-crimson flex items-baseline gap-1">
          {metrics.sev_1.value}<span className="text-xs text-slate-400 font-normal">%</span>
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 truncate">
          CRITICAL BREAKING SHIFT
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-red-950">
          <div
            className="bg-gradient-to-r from-red-600 to-[#ff3366] h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.sev_1.value}%` }}
          />
        </div>
      </div>

      {/* OPP-1 Metric */}
      <div className="bg-[#080d1a] border border-[#0d2a2d] p-3 rounded hud-corner-tl relative overflow-hidden font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            {metrics.opp_1.level}
          </span>
          <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
            {metrics.opp_1.driver}
          </span>
        </div>
        <div className="text-2xl font-bold text-cyan-300 mt-1 text-glow-cyan flex items-baseline gap-1">
          {metrics.opp_1.value}<span className="text-xs text-slate-400 font-normal">%</span>
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 truncate">
          PRIORITY STRATEGIC ADVANTAGE
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-cyan-950">
          <div
            className="bg-gradient-to-r from-cyan-600 to-cyan-300 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.opp_1.value}%` }}
          />
        </div>
      </div>

      {/* SEV-2 Metric */}
      <div className="bg-[#080d1a] border border-[#2a2210] p-3 rounded hud-corner-tl relative overflow-hidden font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            {metrics.sev_2.level}
          </span>
          <span className="text-[10px] bg-amber-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
            {metrics.sev_2.driver}
          </span>
        </div>
        <div className="text-2xl font-bold text-amber-400 mt-1 text-glow-amber flex items-baseline gap-1">
          {metrics.sev_2.value}<span className="text-xs text-slate-400 font-normal">%</span>
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 truncate">
          ELEVATED ARCHITECTURE SHIFT
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-amber-950">
          <div
            className="bg-gradient-to-r from-amber-600 to-amber-300 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.sev_2.value}%` }}
          />
        </div>
      </div>

      {/* OPP-2 Metric */}
      <div className="bg-[#080d1a] border border-[#142038] p-3 rounded hud-corner-tl relative overflow-hidden font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Lightbulb className="w-3.5 h-3.5" />
            {metrics.opp_2.level}
          </span>
          <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
            {metrics.opp_2.driver}
          </span>
        </div>
        <div className="text-2xl font-bold text-emerald-400 mt-1 text-glow-emerald flex items-baseline gap-1">
          {metrics.opp_2.value}<span className="text-xs text-slate-400 font-normal">%</span>
        </div>
        <div className="text-[10px] text-slate-500 mt-0.5 truncate">
          INFRASTRUCTURE YIELD
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-emerald-950">
          <div
            className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${metrics.opp_2.value}%` }}
          />
        </div>
      </div>
    </div>
  );
};
