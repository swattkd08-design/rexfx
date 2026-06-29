import React, { useState, useEffect } from 'react';
import { sfx } from '../utils/audio';
import { ShieldCheck, Cpu, Volume2, VolumeX, Sparkles, Terminal, Activity, Menu, X } from 'lucide-react';

export default function InstitutionalNavbar({ onOpenOracle }: { onOpenOracle: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sentimentScore, setSentimentScore] = useState(82);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Terminal", href: "#hero" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Alpha Engines", href: "#strategies" },
    { label: "WebGL Lab", href: "#webgl-lab" },
    { label: "Audit & Bio", href: "#about" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sfx.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? "bg-[#050816]/85 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(0,255,170,0.3)]">
            <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center text-emerald-400 font-display font-extrabold text-xl group-hover:bg-transparent group-hover:text-[#050816] transition-colors">
              R
            </div>
          </div>
          <div>
            <span className="font-display font-bold text-white tracking-wider text-lg block">REX<span className="text-emerald-400">.FX</span></span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block -mt-1">Workstation v2035</span>
          </div>
        </a>

        {/* Live Market Metrics Bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 bg-[#0B1120]/80 px-4 py-1.5 rounded-full border border-slate-800 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">CAPITAL:</span>
            <span className="text-emerald-400 font-bold">$45,280,000</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">SENTIMENT:</span>
            <span className="text-amber-400 font-bold">{sentimentScore}/100 (Greed)</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-700" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">GAS:</span>
            <span className="text-cyan-300">16 Gwei</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => sfx.playHover()}
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-900/80 transition-all relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          
          {/* Sound Synthesizer Mute Toggle */}
          <button
            onClick={() => {
              const isM = sfx.toggleMute();
              setMuted(isM);
              sfx.playClick();
            }}
            title={muted ? "Unmute Audio Synth" : "Mute Audio Synth"}
            className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* AI Oracle Trigger Button */}
          <button
            onClick={() => { sfx.playClick(); onOpenOracle(); }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,255,170,0.2)] transition-all cursor-pointer hover:scale-105"
          >
            <Cpu className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>AI ORACLE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#050816] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2.5 text-sm text-slate-300 hover:text-emerald-400 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOracle(); }}
              className="w-full mt-4 py-3 rounded-xl bg-emerald-400 text-[#050816] font-bold flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>LAUNCH AI ORACLE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
