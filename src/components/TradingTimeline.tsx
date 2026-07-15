import React, { useState } from 'react';
import { TRADING_TIMELINE } from '../data/mockData';
import { sfx } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Cpu, Award } from 'lucide-react';

interface TradingTimelineProps {
  isFriendly?: boolean;
}

export default function TradingTimeline({ isFriendly = false }: TradingTimelineProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const getPhaseIcon = (tag: string) => {
    switch (tag) {
      case "Phase I": return <TrendingUp className="w-4 h-4 text-slate-400" />;
      case "Phase II": return <Award className="w-4 h-4 text-[#D4AF37]" />;
      case "Phase III": return <Cpu className="w-4 h-4 text-cyan-400" />;
      case "Phase IV": return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-yellow-400" />;
    }
  };

  const friendlyEvents = [
    {
      year: "2018",
      title: "First Steps & Finding My Way",
      description: "Began studying the currency market using standard trading indicators. Quickly realized that general formulas didn't work consistently and switched to learning raw chart signals directly.",
      tag: "Phase I"
    },
    {
      year: "2020",
      title: "Learning How Big Banks Trade",
      description: "Deep dived into 'Smart Money Concepts' to understand how major commercial banks handle order volumes. Developed a strict, mechanical set of rules to safely follow their moves.",
      tag: "Phase II"
    },
    {
      year: "2022",
      title: "Succeeding with Professional Capital",
      description: "Passed rigorous trading evaluations with leading global prop firms. Secured over $1.2M in professional active capital, earning consistent payouts and proving my trading system works.",
      tag: "Phase III"
    },
    {
      year: "2024",
      title: "Launching Asam FX",
      description: "Incorporated my private trading firm. Launched a highly-rated signals channel and began managing capital for private families and high-net-worth clients.",
      tag: "Phase IV"
    },
    {
      year: "2026",
      title: "Clean Technology & Peak Accuracy",
      description: "Fitted our systems with automated scanning and AI filters to help avoid bad market hours. Currently managing gold portfolios with historically low risk and peak safety.",
      tag: "Phase V"
    }
  ];

  const displayEvents = isFriendly ? friendlyEvents : TRADING_TIMELINE;

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
          {isFriendly ? "MY MILESTONES & HISTORY" : "THE ROAD TO EDGE"}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
          Asam FX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">{isFriendly ? "My Trading Journey" : "Trading Journey"}</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base font-sans">
          {isFriendly 
            ? "Here is a quick look at my professional timeline, from learning the basics to managing millions in capital."
            : "Tracing the evolution from standard retail indicators to institutional algorithmic pricing edge."
          }
        </p>
      </div>

      {/* Main Timeline Deck */}
      <div className="relative max-w-4xl mx-auto mt-12">
        {/* Core central timeline track line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/80 via-emerald-500/50 to-[#0B1120] -translate-x-1/2 hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37]/80 via-emerald-500/50 to-[#0B1120] md:hidden" />

        <div className="space-y-12">
          {displayEvents.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const isActive = activeIdx === idx;

            return (
              <div 
                key={idx}
                onMouseEnter={() => { sfx.playHover(); setActiveIdx(idx); }}
                onMouseLeave={() => setActiveIdx(null)}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                } group`}
              >
                
                {/* Visual Timeline central node */}
                <div className={`absolute left-6 md:left-1/2 w-6 h-6 rounded-full border-2 transition-all duration-300 -translate-x-1/2 flex items-center justify-center z-20 ${
                  isActive 
                    ? 'bg-[#D4AF37] border-[#D4AF37] scale-125 shadow-[0_0_15px_rgba(212,175,55,0.8)]' 
                    : 'bg-[#050816] border-slate-700 group-hover:border-[#D4AF37]'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-slate-600 group-hover:bg-[#D4AF37]'}`} />
                </div>

                {/* Milestone Card Frame */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                  isLeft ? 'md:pr-10 text-left' : 'md:pl-10 text-left'
                }`}>
                  
                  <div className={`glass-card rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden bg-[#0B1120]/30 hover:bg-[#0B1120]/60 ${
                    isActive 
                      ? 'border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.08)] -translate-y-1' 
                      : 'border-slate-800/80 hover:border-slate-700'
                  }`}>
                    
                    {/* Corner gradient shade */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />

                    {/* Badge header */}
                    <div className="flex items-center justify-between gap-4 mb-3 font-mono text-xs">
                      <span className="text-[#D4AF37] font-bold text-base">{event.year}</span>
                      <span className="px-2.5 py-1 rounded bg-[#050816] border border-slate-800 text-slate-400 flex items-center gap-1.5 text-[10px]">
                        {getPhaseIcon(event.tag)}
                        {isFriendly ? `STAGE ${idx + 1}` : event.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mt-3">
                      {event.description}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
