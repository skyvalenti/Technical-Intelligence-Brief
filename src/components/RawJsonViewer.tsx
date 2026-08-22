import React, { useState } from 'react';
import { Terminal, Copy, Check, FileJson } from 'lucide-react';
import type { SkyTechnicalIntelligenceReport } from '../types';

interface RawJsonViewerProps {
  report: SkyTechnicalIntelligenceReport;
}

export const RawJsonViewer: React.FC<RawJsonViewerProps> = ({ report }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const jsonString = JSON.stringify(report, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 font-mono">
      <div className="bg-[#080d1a] border border-[#162238] rounded-lg p-3 hud-corner-tl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <FileJson className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 font-bold">src/data/report.json</span>
          <span className="text-slate-500">// {report.dispatch_id}</span>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 bg-[#0e172a] hover:bg-[#1e293b] border border-cyan-500/40 text-cyan-300 rounded flex items-center gap-1.5 transition-all text-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY RAW JSON'}</span>
        </button>
      </div>

      <div className="bg-[#040711] border border-[#162238] rounded-lg overflow-hidden">
        <div className="bg-[#060a16] px-4 py-2 border-b border-[#121c2e] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a5f]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb000]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66]" />
            <span className="ml-2 text-cyan-300 font-bold">report.json</span>
          </div>
          <span className="text-slate-500">UTF-8 // JSON PAYLOAD</span>
        </div>

        <pre className="p-4 text-[12px] text-emerald-400/90 leading-relaxed overflow-x-auto max-h-[560px] overflow-y-auto bg-[#02050d] select-all">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
