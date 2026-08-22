import React, { useState, useEffect } from 'react';
import domainsConfig from '../config/domains.json';
import data3d from '../data/sky_tib_3d.json';
import data2d from '../data/sky_tib_2d.json';
import dataDsAi from '../data/sky_tib_ds_ai.json';
import dataHardware from '../data/sky_tib_hardware.json';
import type { SkyTechnicalIntelligenceReport } from '../types';
import MetricBars from './MetricBars';
import { Terminal, Clock, Copy, Check, Layers, Cpu, Radio } from 'lucide-react';

const badgeMap: Record<string, string> = {
  'SEV-1': 'text-red-400 border-red-500/50 bg-red-950/40',
  'SEV-2': 'text-amber-400 border-amber-500/50 bg-amber-950/40',
  'OPP-1': 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
  'OPP-2': 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
  'ROLE': 'text-purple-400 border-purple-500/50 bg-purple-950/40'
};

const domainDataRegistry: Record<string, SkyTechnicalIntelligenceReport> = {
  '3d_graphics': data3d as unknown as SkyTechnicalIntelligenceReport,
  '2d_animation': data2d as unknown as SkyTechnicalIntelligenceReport,
  'data_science_ai': dataDsAi as unknown as SkyTechnicalIntelligenceReport,
  'hardware_infra': dataHardware as unknown as SkyTechnicalIntelligenceReport,
};

interface DomainItem {
  id: string;
  label: string;
  sector: string;
  data_file: string;
}

export default function SkyTibDashboard() {
  const [activeDomainKey, setActiveDomainKey] = useState<string>('3d_graphics');
  const [data, setData] = useState<SkyTechnicalIntelligenceReport>(domainDataRegistry['3d_graphics']);
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry'>('overview');
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [utcTime, setUtcTime] = useState<string>('');

  // Dynamic payload loading based on selected domain
  useEffect(() => {
    if (domainDataRegistry[activeDomainKey]) {
      setData(domainDataRegistry[activeDomainKey]);
    }
  }, [activeDomainKey]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyJson = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#070A0F] text-white p-6 font-mono flex items-center justify-center">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Radio className="w-5 h-5 animate-pulse" />
          <span>Initializing Telemetry Stream...</span>
        </div>
      </div>
    );
  }

  const currentDomainConfig = (domainsConfig.domains as Record<string, DomainItem>)[activeDomainKey];

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#C9D1D9] font-mono p-4 md:p-6 text-xs leading-relaxed bg-tactical-grid scanlines selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header telemetry */}
      <header className="border-b border-[#1E2638] pb-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase">
                SKY TECHNICAL INTELLIGENCE BRIEF
              </h1>
            </div>
            <div className="text-cyan-400 mt-1.5 text-xs font-mono leading-relaxed">
              <p>
                DISPATCH: <span className="font-bold">{data.dispatch_id}</span> // STATUS: <span className="text-[#00E676] font-bold">{data.status}</span>
              </p>
              <p className="text-[10px] text-[#58A6FF] mt-0.5 tracking-wide">
                SECTOR: <span className="font-bold">{currentDomainConfig?.sector || data.sector}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* Domain Selection Dropdown */}
            <div className="flex items-center gap-2 bg-[#0B0F17] border border-[#1E2638] p-1.5 rounded-sm">
              <span className="text-[10px] text-[#8B949E] uppercase font-bold">VERTICAL:</span>
              <select
                value={activeDomainKey}
                onChange={(e) => setActiveDomainKey(e.target.value)}
                className="bg-[#161D2A] border border-[#30363D] text-cyan-400 text-xs px-2 py-1 focus:outline-none rounded-sm font-mono cursor-pointer"
              >
                {Object.entries(domainsConfig.domains).map(([key, domain]) => (
                  <option key={key} value={key} className="bg-[#161D2A] text-cyan-300">
                    {domain.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3 text-[10px] text-[#8B949E]">
              <span className="flex items-center gap-1 text-cyan-300">
                <Clock className="w-3 h-3 text-cyan-400" />
                {utcTime || 'SYNCING UTC...'}
              </span>
              <span>//</span>
              <button
                onClick={() => setShowJsonModal(!showJsonModal)}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Terminal className="w-3 h-3" />
                {showJsonModal ? 'HIDE [RAW JSON]' : 'VIEW [RAW JSON]'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controls directly above content */}
        <div className="mt-4 flex border border-[#1E2638] bg-[#0B0F17] p-1 rounded-sm gap-1">
          <button
            onClick={() => {
              setActiveTab('overview');
              setShowJsonModal(false);
            }}
            className={`flex-1 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-sm flex items-center justify-center gap-2 ${
              activeTab === 'overview' && !showJsonModal
                ? 'bg-[#161D2A] text-cyan-400 border border-cyan-500/50 shadow-sm'
                : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#161D2A]/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>EXECUTIVE OVERVIEW</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('telemetry');
              setShowJsonModal(false);
            }}
            className={`flex-1 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all rounded-sm flex items-center justify-center gap-2 ${
              activeTab === 'telemetry' && !showJsonModal
                ? 'bg-[#161D2A] text-cyan-400 border border-cyan-500/50 shadow-sm'
                : 'text-[#8B949E] hover:text-[#C9D1D9] hover:bg-[#161D2A]/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL TELEMETRY & SECTORS (1–5)</span>
          </button>
        </div>
      </header>

      {/* Raw JSON View if toggled */}
      {showJsonModal ? (
        <div className="space-y-3 font-mono mb-6">
          <div className="flex justify-between items-center bg-[#10141C] border border-[#21262D] p-3 rounded">
            <span className="text-cyan-400 font-bold">
              src/data/{currentDomainConfig?.data_file || 'sky_tib_latest.json'}
            </span>
            <button
              onClick={handleCopyJson}
              className="px-3 py-1 bg-[#161B22] border border-[#30363D] hover:border-cyan-500/50 text-cyan-300 rounded text-xs flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
            </button>
          </div>
          <pre className="p-4 bg-[#05070A] border border-[#21262D] text-emerald-400/90 text-[11px] overflow-x-auto max-h-[650px] overflow-y-auto">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      ) : activeTab === 'overview' ? (
        /* TAB 1: EXECUTIVE OVERVIEW */
        <div className="space-y-6">
          {/* MetricBars nested exclusively inside overview */}
          <MetricBars metrics={data.metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compound Impact Analysis */}
            <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm">
              <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1 flex items-center justify-between">
                <span>COMPOUND IMPACT ANALYSIS</span>
                <span className="text-[10px] text-cyan-400 font-normal">{data.compound_impact_analysis.length} VECTORS</span>
              </h2>
              <div className="space-y-3">
                {data.compound_impact_analysis.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-cyan-500 pl-3">
                    <div className="font-semibold text-white">{item.vector}</div>
                    <p className="text-[#8B949E] mt-1">{item.synthesis}</p>
                    <div className="flex flex-wrap gap-3 mt-1.5">
                      {item.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          ↗ {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Executive Brief */}
            <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm">
              <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1 flex items-center justify-between">
                <span>TODAY'S EXECUTIVE BRIEF</span>
                <span className="text-[10px] text-amber-400 font-normal">{data.executive_brief.length} BULLETINS</span>
              </h2>
              <div className="space-y-3">
                {data.executive_brief.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-amber-500 pl-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[#8B949E]">[{item.tag}]</span>
                      <span className="text-white font-medium">{item.title}</span>
                      <span className={`px-1 text-[9px] border ${badgeMap[item.severity] || 'border-slate-700 text-slate-300'}`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-[#8B949E] mt-1">{item.detail}</p>
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-cyan-400 hover:underline inline-block mt-1"
                    >
                      ↗ Source: {item.link.label}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Cross-Industry Impact Snapshot */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm overflow-hidden">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1 flex items-center justify-between">
              <span>CROSS-INDUSTRY IMPACT SNAPSHOT</span>
              <span className="text-[10px] text-[#8B949E] font-normal">{data.impact_matrix.length} SECTORS</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#21262D] text-[#8B949E] text-[10px] uppercase">
                    <th className="pb-2 font-normal">SECTOR</th>
                    <th className="pb-2 font-normal">IMPACT VECTOR</th>
                    <th className="pb-2 font-normal">RATING</th>
                    <th className="pb-2 font-normal">OPERATIONAL CONSEQUENCE</th>
                    <th className="pb-2 font-normal">LINK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262D]">
                  {data.impact_matrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#161B22] transition-colors">
                      <td className="py-2.5 text-white font-medium whitespace-nowrap">{row.sector}</td>
                      <td className="py-2.5 text-[#8B949E] max-w-xs">{row.vector}</td>
                      <td className="py-2.5 whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 text-[9px] border rounded-sm font-bold ${badgeMap[row.rating] || 'border-slate-700 text-slate-300'}`}>
                          {row.rating}
                        </span>
                      </td>
                      <td className="py-2.5 text-[#8B949E]">{row.consequence}</td>
                      <td className="py-2.5 whitespace-nowrap">
                        <a href={row.source_url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-[10px]">
                          ↗ Source
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        /* TAB 2: TECHNICAL TELEMETRY & SECTORS 1-5 */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Research & Open Standards */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1">
              1. RESEARCH & OPEN STANDARDS (TECHNICAL TELEMETRY)
            </h2>
            {data.research_telemetry.map((res, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-white font-semibold">[{res.domain}] {res.title}</span>
                  <span className={`px-1.5 py-0.5 text-[9px] border rounded-sm ${badgeMap[res.severity] || 'border-slate-700 text-slate-300'}`}>
                    {res.severity}
                  </span>
                </div>
                <div className="text-[10px] text-[#8B949E]">
                  PROFILING: [VRAM: {res.specs.vram || 'N/A'}] | [LIC: {res.specs.license || 'N/A'}] | [INTEROP: {res.specs.interop || 'N/A'}]
                </div>
                <pre className="bg-[#05070A] p-2.5 border border-[#21262D] text-[#58A6FF] text-[11px] overflow-x-auto rounded-sm leading-normal">
                  {res.lineage.join('\n')}
                </pre>
                <a href={res.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline block text-[10px]">
                  ↗ Reference Publication ({res.url})
                </a>
              </div>
            ))}
          </section>

          {/* Section 2: Infrastructure & Commit Watch */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1">
              2. INFRASTRUCTURE, TOOLING & COMMIT WATCH
            </h2>
            {data.infrastructure_watch.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">[{item.domain}] {item.entity}</span>
                  <span className={`px-1.5 py-0.5 text-[9px] border rounded-sm ${badgeMap[item.rating] || 'border-slate-700 text-slate-300'}`}>
                    {item.rating}
                  </span>
                </div>
                <div className="text-[10px] text-[#8B949E]">
                  PROFILING: [LIC: {item.specs.license || 'N/A'}] | [INTEROP: {item.specs.interop || 'N/A'}]
                </div>
                <p className="text-[#8B949E]">Governance: {item.governance}</p>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline block text-[10px]">
                  ↗ Upstream Repository ({item.url})
                </a>
              </div>
            ))}
          </section>

          {/* Section 3: Compute Grants & TTE Matrix */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm overflow-hidden">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1">
              3. COMPUTE GRANTS, CREDITS & TTE MATRIX
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#21262D] text-[#8B949E] text-[10px] uppercase">
                    <th className="pb-2 font-normal">PLATFORM</th>
                    <th className="pb-2 font-normal">ALLOCATION</th>
                    <th className="pb-2 font-normal">TTE</th>
                    <th className="pb-2 font-normal">THRESHOLD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#21262D]">
                  {data.compute_matrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#161B22] transition-colors">
                      <td className="py-2.5 text-white whitespace-nowrap">
                        <a href={row.url} target="_blank" rel="noreferrer" className="hover:underline text-cyan-400">
                          {row.platform}
                        </a>
                      </td>
                      <td className="py-2.5 text-[#8B949E]">{row.allocation}</td>
                      <td className="py-2.5 text-red-400 font-bold whitespace-nowrap">{row.tte}</td>
                      <td className="py-2.5 text-[#8B949E]">{row.threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Grants & Talent Desks */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 rounded-sm">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1">
              4. GRANTS & TALENT DESKS
            </h2>
            <div className="space-y-2">
              {data.grants_talent.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start border-b border-[#21262D] pb-2 last:border-b-0">
                  <div>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-white font-medium hover:underline text-cyan-400">
                      {item.title}
                    </a>
                    <p className="text-[#8B949E] text-[11px] mt-0.5">{item.detail}</p>
                  </div>
                  <span className={`px-1.5 py-0.5 text-[9px] border rounded-sm ml-2 shrink-0 ${badgeMap[item.rating] || 'border-slate-700 text-slate-300'}`}>
                    {item.rating}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Training & Communications */}
          <section className="border border-[#21262D] bg-[#10141C] p-4 lg:col-span-2 rounded-sm">
            <h2 className="text-white font-bold tracking-wider mb-3 border-b border-[#21262D] pb-1">
              5. TRAINING & COMMUNICATIONS (OPERATIONAL DIRECTIVES)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.talking_points.map((tp, idx) => (
                <div key={idx} className="bg-[#161B22] p-3 border border-[#30363D] rounded-sm">
                  <span className="text-[10px] text-cyan-400 uppercase font-semibold block">{tp.audience}</span>
                  <p className="text-[#8B949E] mt-1 italic">"{tp.script}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#21262D] pt-4 mt-8 text-[10px] text-[#8B949E] flex flex-wrap justify-between items-center gap-2">
        <span>SKY TECHNICAL INTELLIGENCE BRIEF // {data.dispatch_id}</span>
        <span className="text-emerald-400 font-semibold">ALL TELEMETRY STREAMS VERIFIED</span>
      </footer>
    </div>
  );
}
