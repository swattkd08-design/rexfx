import React, { useState } from 'react';
import InstitutionalNavbar from './components/InstitutionalNavbar';
import GlassTunnel3D from './components/ui/liquid-glass-boxes';
import InteractiveChart from './components/InteractiveChart';
import PortfolioDashboard from './components/PortfolioDashboard';
import StrategyShowcase from './components/StrategyShowcase';
import AboutAndContact from './components/AboutAndContact';
import AIOracleModal from './components/AIOracleModal';
import GlobalTubesCursor from './components/GlobalTubesCursor';
import StellarCardGallerySingle from './components/ui/3d-image-gallery';
import WebsiteLoadingScreen from './components/WebsiteLoadingScreen';
import MarketTimeTicker from './components/MarketTimeTicker';
import { StrategyCard } from './types';
import { sfx } from './utils/audio';
import { ShieldCheck, Cpu, TrendingUp, Sparkles, Activity, Layers, ArrowDownRight, Zap, Target, ExternalLink, Check, X } from 'lucide-react';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [oracleOpen, setOracleOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USDT");
  const [activeStrategyModal, setActiveStrategyModal] = useState<StrategyCard | null>(null);

  const quickTickers = [
    { s: "BTC/USDT", p: "$98,450", c: "+4.82%", color: "text-emerald-400" },
    { s: "ETH/USDT", p: "$3,420", c: "+6.15%", color: "text-emerald-400" },
    { s: "SOL/USDT", p: "$218.45", c: "+12.4%", color: "text-cyan-400" },
    { s: "SUI/USDT", p: "$3.82", c: "+18.9%", color: "text-purple-400" },
    { s: "RENDER/USDT", p: "$11.45", c: "+9.45%", color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] relative selection:bg-emerald-400 selection:text-black overflow-x-hidden font-sans">
      
      {/* 0. Full Website Initial Loading Screen */}
      {isInitialLoading && (
        <WebsiteLoadingScreen onLoaded={() => setIsInitialLoading(false)} />
      )}

      {/* 1. Global Navigation Bar */}
      <InstitutionalNavbar onOpenOracle={() => setOracleOpen(true)} />

      {/* 2. Liquid Glass Tunnel 3D Background over whole website */}
      <div className="fixed inset-0 z-0 opacity-85 pointer-events-none">
        <GlassTunnel3D />
      </div>

      {/* 2.5 Global Three.js Volumetric Raymarched Tubes Cursor over whole website */}
      <GlobalTubesCursor />

      {/* 3. Hero Section // 2035 Bloomberg Vision Pro Terminal */}
      <section id="hero" className="relative z-10 pt-32 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Ticker Ribbon */}
        <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-none border-b border-slate-800/80 mb-12">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE QUANT DESK TICKERS
          </span>
          {quickTickers.map((qt) => (
            <button
              key={qt.s}
              onClick={() => { sfx.playClick(); setSelectedSymbol(qt.s); }}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer font-mono text-xs ${
                selectedSymbol === qt.s
                  ? "bg-slate-800/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,170,0.2)]"
                  : "bg-[#0B1120]/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
            >
              <span className="font-bold">{qt.s}</span>
              <span className="text-white">{qt.p}</span>
              <span className={qt.color}>{qt.c}</span>
            </button>
          ))}
        </div>

        {/* Master Headline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Typography & Institutional Value Proposition */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>INSTITUTIONAL CRYPTO PORTFOLIO // $45M AUM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-white">
              I Trade Markets. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                I Build Wealth.
              </span> <br />
              I Engineer Opportunity.
            </h1>

            <p className="text-slate-300 text-base sm:text-xl font-mono tracking-wide max-w-2xl mx-auto lg:mx-0">
              Professional Crypto Trader • Quantitative Risk Manager • Market Analyst
            </p>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to my digital headquarters. Fusing sub-10ms colocation orderflow models with WebGL visual analytics to compound billion-dollar institutional capital.
            </p>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 font-mono">
              <a
                href="#contact"
                onClick={() => sfx.playClick()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-[#050816] font-display font-bold text-sm hover:scale-105 transition-all shadow-[0_0_35px_rgba(0,255,170,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>REQUEST VAULT ALLOCATION</span>
              </a>

              <button
                onClick={() => { sfx.playClick(); setOracleOpen(true); }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-bold text-sm hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>QUERY GEMINI AI ORACLE</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 font-mono text-xs">
              <div>
                <span className="text-slate-500 block">WIN RATE</span>
                <span className="text-emerald-400 font-bold text-sm">88.4%</span>
              </div>
              <div>
                <span className="text-slate-500 block">AVG MONTHLY ROI</span>
                <span className="text-cyan-400 font-bold text-sm">+28.4%</span>
              </div>
              <div>
                <span className="text-slate-500 block">MAX DRAWDOWN</span>
                <span className="text-amber-400 font-bold text-sm">-4.2%</span>
              </div>
            </div>

          </div>

          {/* Right: Floating Holographic Candlestick Workstation */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur-2xl pointer-events-none" />
            <InteractiveChart symbol={selectedSymbol} />
          </div>

        </div>
      </section>

      {/* 4. Institutional Treasury & PnL Dashboard */}
      <PortfolioDashboard />

      {/* 5. Alpha Strategies Showcase Grid */}
      <StrategyShowcase onSelectStrategy={(s) => setActiveStrategyModal(s)} />

      {/* 6. WebGL Lab Experience Showcase (#webgl-lab) // 3D Spatial Asset Vault */}
      <section id="webgl-lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <StellarCardGallerySingle />
      </section>

      {/* 7. Executive Bio, Institutional Testimonials & Encrypted Contact Form */}
      <AboutAndContact />

      {/* 8. Gemini AI Oracle Modal */}
      <AIOracleModal isOpen={oracleOpen} onClose={() => setOracleOpen(false)} />

      {/* 9. Strategy Specification Modal */}
      {activeStrategyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full bg-[#0B1120] rounded-3xl border border-emerald-500/50 p-8 shadow-2xl relative">
            
            <button
              onClick={() => setActiveStrategyModal(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
              {activeStrategyModal.category} ENGINE SPECS
            </span>

            <h3 className="text-3xl font-display font-bold text-white mt-4">
              {activeStrategyModal.title}
            </h3>
            <p className="text-sm font-mono text-cyan-400 mt-1">{activeStrategyModal.subtitle}</p>

            <p className="text-slate-300 text-sm mt-6 leading-relaxed font-sans">
              {activeStrategyModal.description}
            </p>

            <div className="grid grid-cols-3 gap-4 my-8 p-4 rounded-2xl bg-[#050816] border border-slate-800 font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">WIN RATE</span>
                <span className="text-lg font-bold text-emerald-400">{activeStrategyModal.winRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">SHARPE RATIO</span>
                <span className="text-lg font-bold text-white">{activeStrategyModal.sharpeRatio}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">AVG RETURN</span>
                <span className="text-lg font-bold text-cyan-400">{activeStrategyModal.avgReturn}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">⚡ STRUCTURAL GUARANTIES</span>
              <div className="grid grid-cols-2 gap-2">
                {activeStrategyModal.keyMetrics.map((km, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{km}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setActiveStrategyModal(null); setOracleOpen(true); }}
              className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-[#050816] font-display font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>SIMULATE THIS STRATEGY WITH AI ORACLE</span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
