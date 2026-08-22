import React, { useState, useEffect } from 'react';
import { Terminal, Radio, Clock, Layers, Sparkles } from 'lucide-react';
import type { SkyTechnicalIntelligenceReport } from '../types';

interface HeaderBannerProps {
  report: SkyTechnicalIntelligenceReport;
  activeView: 'dashboard' | 'executive' | 'matrix' | 'json';
  setActiveView: (view: 'dashboard' | 'executive' | 'matrix' | 'json') => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  report,
  activeView,
  setActiveView,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-[#162238] bg-[#050914] text-xs sticky top-0 z-50">
      {/* Top Telemetry Classification & Cadence Bar */}
      <div className="bg-[#070e1c] border-b border-[#121c2e] px-4 py-1.5 flex flex-wrap items-center justify-between text-slate-300 font-mono text-[11px] gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="font-bold text-cyan-300 tracking-wider">SKY TECHNICAL INTELLIGENCE BRIEF</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-400 uppercase">{report.cadence}</span>
          <span className="text-slate-600">//</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            STATUS: {report.status.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-slate-400">
          <div className="flex items-center space-x-1.5 bg-[#03060f] px-2 py-0.5 rounded border border-[#162540] text-cyan-300 font-mono">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{utcTime || 'SYNCING UTC...'}</span>
          </div>
        </div>
      </div>

      {/* Main Mission Header */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-950/50 border border-cyan-500/40 rounded text-cyan-300 glow-cyan">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-100 font-mono tracking-wider">
                {report.dispatch_id}
              </h1>
              <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-[10px] font-mono">
                DISPATCH RUN
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span className="text-slate-500">DOMAIN:</span>
              <span className="text-cyan-300 font-bold tracking-wide">{report.sector}</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1 bg-[#080e1c] p-1 border border-[#162238] rounded">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-3 py-1.5 rounded transition-all font-mono flex items-center gap-1.5 ${
              activeView === 'dashboard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 glow-cyan'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>FULL TELEMETRY</span>
          </button>
          <button
            onClick={() => setActiveView('executive')}
            className={`px-3 py-1.5 rounded transition-all font-mono flex items-center gap-1.5 ${
              activeView === 'executive'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 glow-cyan'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE BRIEF</span>
          </button>
          <button
            onClick={() => setActiveView('matrix')}
            className={`px-3 py-1.5 rounded transition-all font-mono flex items-center gap-1.5 ${
              activeView === 'matrix'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 glow-cyan'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>IMPACT & COMPUTE</span>
          </button>
          <button
            onClick={() => setActiveView('json')}
            className={`px-3 py-1.5 rounded transition-all font-mono flex items-center gap-1.5 ${
              activeView === 'json'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 glow-cyan'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>RAW JSON</span>
          </button>
        </div>
      </div>
    </header>
  );
};
