import React from 'react';
import { Sparkles, Terminal, ShieldAlert, Cpu, Box } from 'lucide-react';
import type { ExecutiveBriefItem } from '../types';

interface ExecutiveBriefProps {
  briefs: ExecutiveBriefItem[];
}

export const ExecutiveBrief: React.FC<ExecutiveBriefProps> = ({ briefs }) => {
  return (
    <div className="bg-[#080d1a] border border-[#162238] rounded-lg p-4 hud-corner-tl">
      <div className="flex items-center justify-between border-b border-[#162238] pb-3 mb-4 font-mono">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
            EXECUTIVE TELEMETRY FEED // KEY STRATEGIC SHIFTS
          </span>
        </div>
        <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-mono">
          {briefs.length} ACTIVE INTELLIGENCE BULLETINS
        </span>
      </div>

      <div className="space-y-4">
        {briefs.map((item, index) => (
          <div
            key={index}
            className="bg-[#050812] border border-[#142033] hover:border-cyan-500/40 rounded p-3.5 transition-all group font-mono"
          >
            {/* Header: Tag, Severity, and Icon */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="p-1 bg-cyan-950/60 rounded text-cyan-400 border border-cyan-500/30">
                  <Box className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-bold text-cyan-300 tracking-wider">
                  {item.tag}
                </span>
              </div>
              <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                {item.severity}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-200 transition-colors mb-2">
              {item.title}
            </h3>

            {/* Detail */}
            <p className="text-xs text-slate-300 leading-relaxed bg-[#03060f] p-2.5 rounded border border-[#101828]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
