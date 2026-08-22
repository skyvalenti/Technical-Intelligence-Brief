import React from 'react';
import { Cpu, Server, Clock, ShieldAlert } from 'lucide-react';
import type { ComputeMatrixItem } from '../types';

interface ComputeMatrixProps {
  computes: ComputeMatrixItem[];
}

export const ComputeMatrix: React.FC<ComputeMatrixProps> = ({ computes }) => {
  return (
    <div className="bg-[#080d1a] border border-[#162238] rounded-lg overflow-hidden hud-corner-tl font-mono">
      <div className="bg-[#050812] px-4 py-3 border-b border-[#162238] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
            COMPUTE GRANTS & TTE (TIME-TO-EXPIRY) MATRIX
          </span>
        </div>
        <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded">
          {computes.length} POOLS MONITORED
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#03060f] text-[10px] text-slate-400 border-b border-[#121c2e] uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-4 font-bold">PLATFORM / CLOUD</th>
              <th className="py-2.5 px-4 font-bold">ALLOCATION & HARDWARE</th>
              <th className="py-2.5 px-4 font-bold">TTE / EXPIRY</th>
              <th className="py-2.5 px-4 font-bold">THRESHOLD / DRIFT ENFORCEMENT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#101928] text-xs">
            {computes.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-100 whitespace-nowrap flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{item.platform}</span>
                </td>
                <td className="py-3 px-4 text-cyan-300 font-mono">
                  {item.allocation}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="text-[10px] px-2 py-0.5 rounded border border-amber-500/40 bg-amber-950/70 text-amber-300 font-bold flex items-center gap-1 w-fit">
                    <Clock className="w-2.5 h-2.5" />
                    {item.tte}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                    <span>{item.threshold}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
