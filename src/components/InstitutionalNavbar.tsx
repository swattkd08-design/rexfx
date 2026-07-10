import React, { useState, useEffect } from 'react';
import { sfx } from '../utils/audio';
import { ShieldCheck, Cpu, Volume2, VolumeX, Sparkles, Terminal, Activity, Menu, X } from 'lucide-react';

export default function InstitutionalNavbar({ 
  onOpenOracle,
  isFriendly,
  onToggleFriendly
}: { 
  onOpenOracle: () => void;
  isFriendly: boolean;
  onToggleFriendly: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { label: "SMC Strategies", href: "#strategies" },
    { label: "Timeline", href: "#timeline" },
    { label: "Advisory", href: "#services" },
    { label: "FAQs & Contact", href: "#about" },
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
      isScrolled ? "bg-[#03050C]/90 backdrop-blur-xl border-b border-slate-900/80 py-3 shadow-2xl" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-emerald-400 p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <div className="w-full h-full bg-[#03050C] rounded-[11px] flex items-center justify-center text-[#D4AF37] font-display font-black text-xl group-hover:bg-transparent group-hover:text-black transition-colors">
              V
            </div>
          </div>
          <div>
            <span className="font-display font-extrabold text-white tracking-wider text-lg block">VIDO<span className="text-[#D4AF37]">LLAR</span></span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block -mt-1">Sovereign Desk</span>
          </div>
        </a>

        {/* Live Market Metrics Bar (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 bg-[#0B1120]/80 px-5 py-2 rounded-full border border-slate-800/80 font-mono text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">POOL:</span>
            <span className="text-[#D4AF37] font-extrabold">$18,450,200</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">GOLD BIAS:</span>
            <span className="text-emerald-400 font-extrabold">92% Bullish</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">SPREADS:</span>
            <span className="text-cyan-300 font-extrabold">0.1 PIPS</span>
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
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 hover:text-[#D4AF37] hover:bg-slate-900/60 transition-all relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
            className="w-9 h-9 rounded-xl bg-slate-950/90 border border-slate-900/80 hover:border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>

          {/* AI Oracle Trigger Button */}
          <button
            onClick={() => { sfx.playClick(); onOpenOracle(); }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/15 to-emerald-400/15 hover:from-[#D4AF37]/35 hover:to-emerald-400/35 border border-[#D4AF37]/40 text-white font-mono text-xs font-black shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all cursor-pointer hover:scale-105"
          >
            <Cpu className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>AI ORACLE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel bg-[#03050C] border-b border-slate-900 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2 font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2.5 text-sm text-slate-300 hover:text-[#D4AF37] border-b border-slate-900/60"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOracle(); }}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-emerald-400 text-black font-black flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>LAUNCH VIDOLLAR AI ORACLE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
