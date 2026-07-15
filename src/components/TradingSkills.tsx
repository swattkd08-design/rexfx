import React from 'react';
import { TRADING_SKILLS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { 
  Coins, 
  ArrowUpDown, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Target, 
  Layers, 
  Activity, 
  Grid, 
  BarChart3, 
  Sparkles 
} from 'lucide-react';

export default function TradingSkills({ isFriendly = false }: { isFriendly?: boolean }) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Smart Money Concepts": return <Coins className="w-6 h-6 text-[#D4AF37]" />;
      case "Supply & Demand": return <ArrowUpDown className="w-6 h-6 text-emerald-400" />;
      case "Price Action": return <TrendingUp className="w-6 h-6 text-cyan-400" />;
      case "Risk Management": return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case "Scalping": return <Zap className="w-6 h-6 text-yellow-400" />;
      case "Swing Trading": return <Clock className="w-6 h-6 text-[#D4AF37]" />;
      case "ICT Concepts": return <Target className="w-6 h-6 text-red-400" />;
      case "Market Structure": return <Layers className="w-6 h-6 text-emerald-400" />;
      case "Liquidity Analysis": return <Activity className="w-6 h-6 text-cyan-400" />;
      case "Fibonacci": return <Grid className="w-6 h-6 text-orange-400" />;
      case "Volume Analysis": return <BarChart3 className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const friendlyTitles: Record<string, string> = {
    "Smart Money Concepts": "Smart Money Concepts (Bank Tracking)",
    "Supply & Demand": "Supply & Demand (Buy/Sell Zones)",
    "Price Action": "Price Action (Pure Chart Signals)",
    "Risk Management": "Risk Management (Money Safety)",
    "Scalping": "Scalping (Quick Minutes-Trades)",
    "Swing Trading": "Swing Trading (Multi-Day Waves)",
    "ICT Concepts": "ICT Concepts (Advanced Timing)",
    "Market Structure": "Market Structure (Trend Following)",
    "Liquidity Analysis": "Liquidity Analysis (Order Tracking)",
    "Fibonacci": "Fibonacci (Buying at a Discount)",
    "Volume Analysis": "Volume Analysis (Market Activity)",
    "Trading Psychology": "Trading Psychology (Stay Calm & Disciplined)"
  };

  const friendlyDescs: Record<string, string> = {
    "Smart Money Concepts": "Tracking where large commercial banks and institutions place their trades so we can follow them.",
    "Supply & Demand": "Identifying price levels where there is an excess of buyers or sellers, leading to explosive moves.",
    "Price Action": "Reading charts directly using raw candlestick shapes instead of relying on slow, confusing indicators.",
    "Risk Management": "Using math-backed rules to protect our accounts and ensure we never lose more than a safe fraction of capital.",
    "Scalping": "Making very quick trades that last minutes to catch small price movements, perfect for fast-paced markets.",
    "Swing Trading": "Holding trades for days or weeks to ride big economic cycles, requiring patience and high profit potential.",
    "ICT Concepts": "Advanced trading strategies based on specific times of day and major institutional price movements.",
    "Market Structure": "Mapping if the market is going up, down, or sideways, to make sure we always trade with the trend.",
    "Liquidity Analysis": "Finding where majority of retail stop-losses are clustered to buy when others are forced to sell.",
    "Fibonacci": "A math tool used to find optimal discount prices so we always buy low and sell high.",
    "Volume Analysis": "Measuring total transaction volumes to confirm if a price move has real strength or is just a trap.",
    "Trading Psychology": "Mastering greed, fear, and discipline to execute our plans consistently without emotional stress."
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* section header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
          {isFriendly ? "TRADING DISCIPLINE MADE EASY" : "DISCIPLINE & DOMINANCE"}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
          Asam FX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400">{isFriendly ? "Trading Specialties" : "Core Expertise"}</span>
        </h2>
        <p className="text-slate-400 mt-4 text-base font-sans leading-relaxed">
          {isFriendly 
            ? "Here are the proven pillars of how I analyze the chart. No complicated guessing, just logical and safe rule-based principles designed to help anyone understand the market."
            : "The structural, mechanical blocks of our edge. Fusing price delivery models with algorithmic risk filters to outpace generic market participants."
          }
        </p>
      </div>

      {/* Grid of 12 skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRADING_SKILLS.map((skill, idx) => (
          <div
            key={idx}
            onMouseEnter={() => sfx.playHover()}
            className="glass-card rounded-2xl p-6 border border-slate-800 bg-[#0B1120]/40 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient hover glow */}
            <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors pointer-events-none" />
            
            <div className="space-y-4">
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-black/50 border border-slate-800 group-hover:border-[#D4AF37]/30 flex items-center justify-center transition-colors">
                  {getIcon(skill.name)}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
                  {isFriendly && skill.level === "Master" ? "Top Level" : skill.level}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-base font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {isFriendly ? friendlyTitles[skill.name] || skill.name : skill.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {isFriendly ? friendlyDescs[skill.name] || skill.desc : skill.desc}
                </p>
              </div>
            </div>

            {/* Bottom mini border track */}
            <div className="h-0.5 w-full bg-slate-900 mt-5 rounded-full overflow-hidden relative">
              <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 transition-all duration-500 rounded-full" />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
