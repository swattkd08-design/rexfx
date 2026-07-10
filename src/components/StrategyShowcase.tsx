import React, { useState } from 'react';
import { FOREX_STRATEGIES } from '../data/mockData';
import { StrategyCard } from '../types';
import { sfx } from '../utils/audio';
import { Zap, Target, Activity, ShieldCheck, TrendingUp, Cpu, ArrowUpRight, Play } from 'lucide-react';
import StrategyBacktestModal from './StrategyBacktestModal';

interface StrategyShowcaseProps {
  onSelectStrategy?: (s: StrategyCard) => void;
  isFriendly?: boolean;
}

export default function StrategyShowcase({ onSelectStrategy, isFriendly = false }: StrategyShowcaseProps) {
  const [backtestStrategy, setBacktestStrategy] = useState<StrategyCard | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "Target": return <Target className="w-6 h-6 text-[#D4AF37]" />;
      case "Zap": return <Zap className="w-6 h-6 text-emerald-400" />;
      case "Activity": return <Activity className="w-6 h-6 text-cyan-400" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      default: return <Cpu className="w-6 h-6 text-purple-400" />;
    }
  };

  const friendlyStrategiesMap: Record<string, { title: string; subtitle: string; description: string; sharpeLabel: string; sharpeVal: string; keyMetrics: string[] }> = {
    "SMC Liquidity Sweep Orderblock": {
      title: "The Smart Money Flow",
      subtitle: "Institutional Buy/Sell Areas",
      description: "This strategy waits for big banks to trap emotional retail traders by pushing prices beyond common support levels. Once the trap is set and big orders are filled, we enter safely in the same direction as the banks.",
      sharpeLabel: "SAFETY LEVEL",
      sharpeVal: "Very High",
      keyMetrics: ["BANK TRACKING", "TRAP AVOIDANCE", "SAFE ENTRIES", "GOLD & FX"]
    },
    "FVG Inversion Rebalance Engine": {
      title: "The Gap Rebalance Guide",
      subtitle: "Restoring Price Balance",
      description: "When news breaks, price can move so fast that it leaves behind structural 'gaps' or imbalance holes. Markets naturally love to return and 'fill' these gaps later. We wait for price to re-enter these zones to take super clean, high-precision trades.",
      sharpeLabel: "SAFETY LEVEL",
      sharpeVal: "Excellent",
      keyMetrics: ["GAP REFILLS", "FAST NEWS RESPONSE", "CLEAR TARGETS", "LOW RISK"]
    }
  };

  return (
    <section id="strategies" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
          {isFriendly ? "PROVEN TRADING BLUEPRINTS" : "PROPRIETARY LIQUIDITY ENGINES"}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-5 tracking-tight">
          {isFriendly ? "My Two Favorite " : "SMC Algorithmic & "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">{isFriendly ? "Ways to Find Trades" : "Tactical Strategies"}</span>
        </h2>
        <p className="text-slate-400 mt-4 text-base font-sans leading-relaxed">
          {isFriendly 
            ? "Here are the exact rules I use to inspect charts. I have simplified these two powerful approaches so anyone can learn how to predict price movements with minimal stress."
            : "Engineered for zero market directional bias. Capturing institutional volume imbalances, fair value gaps (FVG), and session killzone liquidity pools."
          }
        </p>
      </div>

      {/* Futuristic Strategy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {FOREX_STRATEGIES.map((st) => {
          const matched = friendlyStrategiesMap[st.title];
          const displayTitle = isFriendly && matched ? matched.title : st.title;
          const displaySubtitle = isFriendly && matched ? matched.subtitle : st.subtitle;
          const displayDesc = isFriendly && matched ? matched.description : st.description;
          const displaySharpeLabel = isFriendly && matched ? matched.sharpeLabel : "SHARPE RATIO";
          const displaySharpeVal = isFriendly && matched ? matched.sharpeVal : st.sharpeRatio;
          const displayKeyMetrics = isFriendly && matched ? matched.keyMetrics : st.keyMetrics;

          return (
            <div
              key={st.id}
              onMouseEnter={() => sfx.playHover()}
              className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-[#D4AF37]/50 transition-all duration-300 relative group flex flex-col justify-between hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(212,175,55,0.08)] overflow-hidden"
            >
              {/* Top Glowing Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#050816]/90 border border-slate-800 group-hover:border-[#D4AF37]/40 flex items-center justify-center shadow-lg transition-colors">
                    {getIcon(st.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 uppercase tracking-widest">
                    {isFriendly ? "STUDY CONCEPT" : st.category}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {displayTitle}
                </h3>
                <p className="text-xs font-mono text-emerald-400 mt-1 uppercase tracking-wider font-bold">
                  {displaySubtitle}
                </p>

                <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans">
                  {displayDesc}
                </p>
              </div>

              {/* Key Metrics Badges */}
              <div className="mt-8 pt-6 border-t border-slate-900">
                <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">{isFriendly ? "WIN ACCURACY" : "EST WIN RATE"}</span>
                    <span className="text-base font-bold text-emerald-400">{st.winRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">{displaySharpeLabel}</span>
                    <span className="text-base font-bold text-white">{displaySharpeVal}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {displayKeyMetrics.map((km, idx) => (
                    <span key={idx} className="text-[9px] font-mono bg-slate-950/80 text-slate-300 px-2.5 py-1 rounded border border-slate-900/60 font-semibold uppercase">
                      {km}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => { sfx.playClick(); onSelectStrategy && onSelectStrategy(st); }}
                    className="flex-1 py-3 px-2 rounded-xl bg-black/60 hover:bg-slate-900 text-slate-300 border border-slate-800/80 hover:border-[#D4AF37]/50 font-mono text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                  >
                    <span>{isFriendly ? "HOW IT WORKS" : "SPECIFICATIONS"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => { sfx.playClick(); setBacktestStrategy(st); }}
                    className="flex-[2] py-3 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-emerald-400/15 hover:from-[#D4AF37] hover:to-emerald-400 text-white hover:text-black border border-[#D4AF37]/40 hover:border-transparent font-mono text-[11px] font-black transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-pointer group/bt"
                  >
                    <Play className="w-3.5 h-3.5 fill-current group-hover/bt:scale-110 transition-transform" />
                    <span>{isFriendly ? "TEST HISTORICAL DATA" : "RUN DYNAMIC AI BACKTEST"}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      <StrategyBacktestModal
        isOpen={!!backtestStrategy}
        strategy={backtestStrategy}
        onClose={() => setBacktestStrategy(null)}
      />
    </section>
  );
}
