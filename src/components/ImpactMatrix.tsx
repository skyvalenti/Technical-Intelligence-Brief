import React from 'react';
import { Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import type { ImpactMatrixItem } from '../types';

interface ImpactMatrixProps {
  impacts: ImpactMatrixItem[];
}

export const ImpactMatrix: React.FC<ImpactMatrixProps> = ({ impacts }) => {
  const getRatingBadge = (rating: string) => {
    switch (rating.toUpperCase()) {
      case 'SEV-1':
        return 'bg-red-950/80 text-[#ff4b72] border-red-500/40';
      case 'SEV-2':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'OPP-1':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      case 'OPP-2':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-[#080d1a] border border-[#162238] rounded-lg overflow-hidden hud-corner-tl font-mono">
      <div className="bg-[#050812] px-4 py-3 border-b border-[#162238] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
            CROSS-INDUSTRY IMPACT SNAPSHOT
          </span>
        </div>
        <span className="text-[10px] text-slate-400">
          {impacts.length} DOMAIN VECTORS EVALUATED
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#03060f] text-[10px] text-slate-400 border-b border-[#121c2e] uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-4 font-bold">SECTOR</th>
              <th className="py-2.5 px-4 font-bold">TECHNICAL VECTOR</th>
              <th className="py-2.5 px-4 font-bold">RATING</th>
              <th className="py-2.5 px-4 font-bold">OPERATIONAL CONSEQUENCE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#101928] text-xs">
            {impacts.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-100 whitespace-nowrap">
                  {item.sector}
                </td>
                <td className="py-3 px-4 text-cyan-300 max-w-xs">
                  {item.vector}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${getRatingBadge(item.rating)}`}>
                    {item.rating}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 leading-relaxed">
                  {item.consequence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
