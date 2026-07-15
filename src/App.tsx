import React, { useState } from 'react';
import InstitutionalNavbar from './components/InstitutionalNavbar';
import GlassTunnel3D from './components/ui/liquid-glass-boxes';
import PortfolioDashboard from './components/PortfolioDashboard';
import StrategyShowcase from './components/StrategyShowcase';
import AboutAndContact from './components/AboutAndContact';
import AIOracleModal from './components/AIOracleModal';
import WebsiteLoadingScreen from './components/WebsiteLoadingScreen';
import MarketTimeTicker from './components/MarketTimeTicker';

// Dynamic newly created Forex sub-modules
import TradingSkills from './components/TradingSkills';
import TradingServices from './components/TradingServices';
import TradingTimeline from './components/TradingTimeline';
import ForexPortfolio from './components/ForexPortfolio';
import TradingGallery from './components/TradingGallery';
import Certifications from './components/Certifications';
import FAQSection from './components/FAQSection';

import { StrategyCard } from './types';
import { sfx } from './utils/audio';
import { ShieldCheck, Cpu, TrendingUp, Sparkles, Activity, Layers, ArrowDownRight, Zap, Target, ExternalLink, Check, X } from 'lucide-react';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [oracleOpen, setOracleOpen] = useState(false);
  const [isFriendly, setIsFriendly] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("XAU/USD");
  const [activeStrategyModal, setActiveStrategyModal] = useState<StrategyCard | null>(null);

  const quickTickers = [
    { s: "XAU/USD", p: "$2,342.10", c: "+1.14%", color: "text-emerald-400" },
    { s: "GBP/USD", p: "1.26420", c: "+0.34%", color: "text-emerald-400" },
    { s: "EUR/USD", p: "1.08210", c: "-0.18%", color: "text-red-400" },
    { s: "USD/JPY", p: "158.200", c: "-0.45%", color: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-[#03050C] text-[#F8FAFC] relative selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans">
      
      {/* 0. Full Website Initial Loading Screen */}
      {isInitialLoading && (
        <WebsiteLoadingScreen onLoaded={() => setIsInitialLoading(false)} />
      )}

      {/* 1. Global Navigation Bar */}
      <InstitutionalNavbar 
        onOpenOracle={() => setOracleOpen(true)} 
        isFriendly={isFriendly}
        onToggleFriendly={() => setIsFriendly(!isFriendly)}
      />

      {/* 2. Liquid Glass Tunnel 3D Background over whole website */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <GlassTunnel3D />
      </div>

      {/* 3. Hero Section // 2035 Bloomberg Vision Pro Terminal */}
      <section id="hero" className="relative z-10 pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Ticker Ribbon */}
        <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-none border-b border-slate-900/60 mb-12">
          <span className="text-[10px] font-mono px-3 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35 shrink-0 font-extrabold flex items-center gap-1.5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            LIVE SOVEREIGN DESK FEED
          </span>
          {quickTickers.map((qt) => (
            <button
              key={qt.s}
              onClick={() => { sfx.playClick(); setSelectedSymbol(qt.s); }}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer font-mono text-xs ${
                selectedSymbol === qt.s
                  ? "bg-slate-950 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-white hover:border-slate-800"
              }`}
            >
              <span className="font-bold">{qt.s}</span>
              <span className="text-white font-semibold">{qt.p}</span>
              <span className={qt.color}>{qt.c}</span>
            </button>
          ))}
        </div>

        {/* Friendly Explanation Banner */}
        {isFriendly && (
          <div className="mb-10 p-6 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                <span className="font-display font-extrabold text-[#D4AF37]">Simple & Beginner-Friendly Mode is active!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                We have translated advanced institutional terms (like SMC, FVG, or Orderblocks) into clear, everyday definitions. Use the "SIMPLIFY" toggle in the menu to switch back anytime.
              </p>
            </div>
            <button
              onClick={() => { sfx.playClick(); setIsFriendly(false); }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-850 text-slate-300 hover:text-white hover:border-[#D4AF37] font-mono text-[11px] font-bold cursor-pointer transition-colors shrink-0"
            >
              Back to Expert Mode
            </button>
          </div>
        )}

        {/* Master Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Typography & Institutional Value Proposition */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span>{isFriendly ? "SOVEREIGN TRADING DESK // COMPASSIONATE RISK CONTROL" : "SOVEREIGN CAPITAL DESK // $18.4M AUM"}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.05] text-white">
              {isFriendly ? "I Trade Safely." : "I Trade Markets."} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400">
                {isFriendly ? "I Create Security." : "I Deliver Yield."}
              </span> <br />
              {isFriendly ? "I Teach Success." : "I Master Liquidity."}
            </h1>

            <p className="text-slate-300 text-base sm:text-xl font-mono tracking-wide max-w-2xl mx-auto lg:mx-0">
              {isFriendly ? "Professional Trading, Made Clean & Simple" : "Elite Gold Specialist • SMC Practitioner • Quantitative Strategist"}
            </p>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {isFriendly 
                ? "Welcome! I am Asam FX. I trade currency and gold. This platform acts as a educational portfolio to show you how professional markets work, explaining rules and risk control in plain, easy-to-understand terms."
                : "Welcome to my private digital trading workstation. Fusing sub-millisecond liquidity routing sweeps with interbank orderflow and high-precision execution to compound institutional wealth."
              }
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 font-mono">
              <a
                href="#about"
                onClick={() => sfx.playClick()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-emerald-400 text-black font-display font-black text-sm hover:scale-105 transition-all shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2.5 cursor-pointer animate-pulse"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{isFriendly ? "INQUIRE ABOUT PERSONAL MENTORSHIP" : "REQUEST SECURE CAPITAL ALLOCATION"}</span>
              </a>

              <button
                onClick={() => { sfx.playClick(); setOracleOpen(true); }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] font-bold text-sm hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Cpu className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>{isFriendly ? "ASK QUESTIONS TO OUR AI ASSISTANT" : "QUERY ASAM FX AI ORACLE"}</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900 max-w-lg mx-auto lg:mx-0 font-mono text-xs">
              <div>
                <span className="text-slate-500 block">{isFriendly ? "ACCURACY" : "WIN RATE"}</span>
                <span className="text-emerald-400 font-bold text-sm">88.4%</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isFriendly ? "AVG GROWTH" : "AVG MONTHLY ROI"}</span>
                <span className="text-[#D4AF37] font-bold text-sm">+24.6%</span>
              </div>
              <div>
                <span className="text-slate-500 block">{isFriendly ? "RISK PROTECTED" : "MAX DRAWDOWN"}</span>
                <span className="text-red-400 font-bold text-sm">{isFriendly ? "Maximum" : "-3.8%"}</span>
              </div>
            </div>

          </div>

          {/* Right: High-End Sovereign Owner Portrait Card */}
          <div className="lg:col-span-6 relative group">
            {/* Glowing atmosphere effect */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#D4AF37]/20 via-emerald-500/15 to-transparent blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Main Luxury Frame */}
            <div className="relative rounded-3xl border border-slate-800/80 bg-[#0B1120]/60 p-3 backdrop-blur-xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl">
              
              {/* Internal Tech Borders and Corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

              {/* Secure Desk Status Header Overlay */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl border border-slate-800/80 text-[10px] font-mono tracking-widest text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SOVEREIGN OWNER DESK // ONLINE</span>
              </div>

              {/* Apex Specialist Badge Overlay */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#D4AF37]/20 to-yellow-500/10 backdrop-blur-md rounded-xl border border-[#D4AF37]/30 text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CHIEF TRADER</span>
              </div>

              {/* The Portrait Image */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgb7_7IzWz0DeYy30qpemebmWgIZOjpC3LU1NPpuYrAQ&s=10"
                  alt="Asam FX - Sovereign Owner & Chief Advisory"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Visual grid accent overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.15)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay" />
                
                {/* Premium Radial vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
              </div>

              {/* Bottom Owner Signature and Meta Board */}
              <div className="p-4 sm:p-6 bg-slate-950/90 rounded-2xl border border-slate-900/80 mt-3 relative overflow-hidden">
                {/* Decorative circuit line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      WEBSITE OWNER & FOUNDER
                    </span>
                    <h3 className="text-2xl font-display font-black text-white tracking-wider">
                      ASAM FX
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-0.5">
                      {isFriendly 
                        ? "Experienced Professional Trader, Mentor & Portfolio Strategist" 
                        : "Sovereign Asset Manager & Elite Smart Money Concepts (SMC) Advisor"
                      }
                    </p>
                  </div>
                  
                  {/* Miniature stats panel */}
                  <div className="bg-black/50 p-2.5 rounded-xl border border-slate-900 flex items-center gap-3 shrink-0 self-start sm:self-center">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 shrink-0">
                      <Activity className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="font-mono">
                      <span className="text-[9px] text-slate-500 block uppercase leading-none">VERIFIED TRACK</span>
                      <span className="text-[11px] text-emerald-400 font-extrabold block mt-0.5">8+ Yrs Screen Time</span>
                    </div>
                  </div>
                </div>

                {/* Micro tech details footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                  <span>SYSTEM // PRIVATE KEY CO-LINK</span>
                  <span>BUILD_v4.0_2026 // ADVISORY_ACTIVE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. Live Capital Allocation & Orders */}
      <PortfolioDashboard />

      {/* 5. Trading Skills & disciplines */}
      <TradingSkills isFriendly={isFriendly} />

      {/* 6. Professional Trading Services & Programs */}
      <TradingServices isFriendly={isFriendly} />

      {/* 7. Interactive Evolution Timeline */}
      <TradingTimeline isFriendly={isFriendly} />

      {/* 8. Portfolio Showcase (Logs, Maps, Cases) */}
      <ForexPortfolio isFriendly={isFriendly} />

      {/* 9. Smart Money SMC Strategy Showcase & AI Backtest */}
      <StrategyShowcase onSelectStrategy={(s) => setActiveStrategyModal(s)} isFriendly={isFriendly} />

      {/* 11. Trading Desk Setup & setup analysis Gallery */}
      <TradingGallery isFriendly={isFriendly} />

      {/* 12. Credentials, Courses and Awards */}
      <Certifications />

      {/* 13. Interactive FAQ accordion */}
      <FAQSection isFriendly={isFriendly} />

      {/* 14. Executive Bio, Testimonials and Contact Page */}
      <AboutAndContact isFriendly={isFriendly} />

      {/* 15. Gemini AI Oracle Modal */}
      <AIOracleModal isOpen={oracleOpen} onClose={() => setOracleOpen(false)} />

      {/* 16. Strategy Specification Modal */}
      {activeStrategyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03050C]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full bg-[#0B1120] rounded-3xl border border-[#D4AF37]/50 p-8 shadow-2xl relative">
            
            <button
              onClick={() => setActiveStrategyModal(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30 font-bold">
              {isFriendly ? "STRATEGY DETAILS" : `${activeStrategyModal.category} ENGINE SPECS`}
            </span>

            <h3 className="text-3xl font-display font-bold text-white mt-4">
              {activeStrategyModal.title}
            </h3>
            <p className="text-sm font-mono text-[#D4AF37] mt-1">{activeStrategyModal.subtitle}</p>

            <p className="text-slate-300 text-sm mt-6 leading-relaxed font-sans">
              {activeStrategyModal.description}
            </p>

            <div className="grid grid-cols-3 gap-4 my-8 p-4 rounded-2xl bg-slate-950 border border-slate-900 font-mono text-center">
              <div>
                <span className="text-[10px] text-slate-500 block">{isFriendly ? "WIN ACCURACY" : "EST WIN RATE"}</span>
                <span className="text-lg font-black text-emerald-400">{activeStrategyModal.winRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">{isFriendly ? "STABILITY SCORE" : "SHARPE RATIO"}</span>
                <span className="text-lg font-black text-white">{isFriendly ? "Excellent" : activeStrategyModal.sharpeRatio}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">{isFriendly ? "AVG SWING" : "AVG DRAWDOWN"}</span>
                <span className="text-lg font-black text-red-400">{activeStrategyModal.avgReturn}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                {isFriendly ? "⚡ BUILT-IN SAFETY FEATURES" : "⚡ GUARANTEED RISK SPECIFICATIONS"}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {activeStrategyModal.keyMetrics.map((km, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 font-medium">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{km}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setActiveStrategyModal(null); setOracleOpen(true); }}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-emerald-400 text-black font-display font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform font-bold"
            >
              <Cpu className="w-4 h-4 text-black animate-spin" />
              <span>{isFriendly ? "TEST THIS METHOD WITH THE AI COMPANION" : "SIMULATE THIS STRATEGY WITH AI ORACLE"}</span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
