import React from 'react';
import { Award, Briefcase, Zap, ExternalLink } from 'lucide-react';
import type { GrantsTalentItem } from '../types';

interface GrantsTalentProps {
  items: GrantsTalentItem[];
}

export const GrantsTalent: React.FC<GrantsTalentProps> = ({ items }) => {
  return (
    <div className="bg-[#080d1a] border border-[#162238] rounded-lg p-4 hud-corner-tl font-mono">
      <div className="flex items-center justify-between border-b border-[#162238] pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
            GRANTS & TALENT DESKS // OPPORTUNITY PIPELINE
          </span>
        </div>
        <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded">
          {items.length} ACTIVE LISTINGS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item, index) => {
          const isGrant = item.rating === 'OPP-1';
          return (
            <div
              key={index}
              className="bg-[#050812] border border-[#142033] hover:border-cyan-500/40 rounded p-3 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-1.5">
                    {isGrant ? (
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span className="text-[10px] text-slate-400 uppercase font-bold">
                      {isGrant ? 'GRANT FUNDING' : 'TALENT DESK'}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${
                      isGrant
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                        : 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                    }`}
                  >
                    {item.rating}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 mb-2">
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-300 leading-relaxed bg-[#03060f] p-2 rounded border border-[#101828]">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
