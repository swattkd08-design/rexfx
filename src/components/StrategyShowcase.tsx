import React from 'react';
import { QUANTUM_STRATEGIES } from '../data/mockData';
import { StrategyCard } from '../types';
import { sfx } from '../utils/audio';
import { Zap, Target, Activity, ShieldCheck, TrendingUp, Cpu, ArrowUpRight } from 'lucide-react';

export default function StrategyShowcase({ onSelectStrategy }: { onSelectStrategy?: (s: StrategyCard) => void }) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Zap": return <Zap className="w-6 h-6 text-emerald-400" />;
      case "Target": return <Target className="w-6 h-6 text-cyan-400" />;
      case "Activity": return <Activity className="w-6 h-6 text-amber-400" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-orange-400" />;
      default: return <Cpu className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="strategies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
          PROPRIETARY ALPHA ENGINES
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4 tracking-tight">
          Algorithmic Trading & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">Quantitative Strategies</span>
        </h2>
        <p className="text-slate-400 mt-4 text-base font-sans">
          Engineered for zero market directional bias. Exploiting orderbook microstructure, derivatives basis discrepancies, and macro liquidity sweeps.
        </p>
      </div>

      {/* Futuristic Strategy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {QUANTUM_STRATEGIES.map((st) => (
          <div
            key={st.id}
            onMouseEnter={() => sfx.playHover()}
            className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 relative group flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,255,170,0.1)] overflow-hidden"
          >
            {/* Top Glowing Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#050816] border border-slate-700/80 group-hover:border-emerald-500/60 flex items-center justify-center shadow-lg transition-colors">
                  {getIcon(st.iconName)}
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700">
                  {st.category}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                {st.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                {st.subtitle}
              </p>

              <p className="text-slate-400 text-sm mt-4 leading-relaxed font-sans">
                {st.description}
              </p>
            </div>

            {/* Key Metrics Badges */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="grid grid-cols-2 gap-3 mb-6 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">WIN RATE</span>
                  <span className="text-base font-bold text-emerald-400">{st.winRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SHARPE RATIO</span>
                  <span className="text-base font-bold text-white">{st.sharpeRatio}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {st.keyMetrics.map((km, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-slate-900/80 text-slate-300 px-2.5 py-1 rounded border border-slate-800">
                    {km}
                  </span>
                ))}
              </div>

              <button
                onClick={() => { sfx.playClick(); onSelectStrategy && onSelectStrategy(st); }}
                className="w-full py-3.5 rounded-xl bg-[#050816] hover:bg-emerald-400 text-slate-300 hover:text-[#050816] border border-slate-700 hover:border-emerald-400 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>INSPECT STRATEGY SPECS</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
