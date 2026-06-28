import React, { useState } from 'react';
import { INSTITUTIONAL_TESTIMONIALS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { ShieldCheck, Award, UserCheck, Send, CheckCircle2, MessageSquare, Twitter, Linkedin, ExternalLink, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutAndContact() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", aum: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const stats = [
    { label: "TOTAL ASSETS MANAGED", val: "$45.2M+" },
    { label: "YEARS QUANT EXPERIENCE", val: "12 Years" },
    { label: "SHARPE RATIO AUDIT", val: "4.12" },
    { label: "SYSTEM WIN RATE", val: "88.4%" },
    { label: "ZERO-LOSS MONTHS", val: "28 Consecutive" },
    { label: "ALGO EXECUTION LATENCY", val: "< 8ms" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    sfx.playSuccess();
    setSubmitted(true);
  };

  const nextTestimonial = () => {
    sfx.playClick();
    setActiveTestimonialIdx((prev) => (prev + 1) % INSTITUTIONAL_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    sfx.playClick();
    setActiveTestimonialIdx((prev) => (prev - 1 + INSTITUTIONAL_TESTIMONIALS.length) % INSTITUTIONAL_TESTIMONIALS.length);
  };

  const currentTest = INSTITUTIONAL_TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="relative z-10 space-y-28 pb-32">
      
      {/* ==========================================
          ABOUT SECTION // THE QUANTUM ARCHITECT
      ========================================== */}
      <section id="about" className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: 3D Cyber Avatar Framing Card */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-3 rounded-[32px] border border-emerald-500/30 relative group shadow-[0_0_60px_rgba(0,255,170,0.1)]">
              <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-900 relative">
                {/* Unsplash Cyberpunk Portrait */}
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  alt="Apex Quantum Architect"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-emerald-500/10" />
                
                {/* Floating Holographic Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0B1120]/90 backdrop-blur-md border border-emerald-500/40 text-xs font-mono">
                  <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> MULTI-SIG AUDITED
                    </span>
                    <span>DESK ID: #AEX-01</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Former Quant Lead at Citadel & Deribit Market Maker Desk.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio & Institutional Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
              EXECUTIVE BIOGRAPHY
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Engineering Asymmetric <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Crypto Wealth</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              "Most market participants trade emotions. I engineer deterministic statistical edge. By fusing ultra-low latency orderflow colocation with mathematical delta-neutral basis hedging, we extract continuous compounding yield regardless of market direction."
            </p>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Over the past 12 years managing capital across traditional derivatives desks and decentralized L1 ecosystems, my risk mandate has remained singular: **absolute capital preservation anchored by institutional risk guardrails**.
            </p>

            {/* Stat Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              {stats.map((s, idx) => (
                <div key={idx} className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">{s.label}</span>
                  <span className="text-xl font-mono font-bold text-emerald-400 mt-1 block">{s.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS // INSTITUTIONAL AUDITORS
      ========================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
            SOVEREIGN AUDITS & ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4 tracking-tight">
            Trusted by Family Offices & <span className="text-amber-400">Venture Funds</span>
          </h2>
        </div>

        {/* Glassmorphic Testimonial Slider Card */}
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-[36px] border border-amber-500/20 relative shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={currentTest.avatar}
                alt={currentTest.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50"
              />
              <div>
                <h4 className="text-xl font-display font-bold text-white">{currentTest.name}</h4>
                <p className="text-xs font-mono text-amber-400">{currentTest.role}</p>
                <p className="text-xs font-mono text-slate-400">{currentTest.institution}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                {currentTest.allocatedCapital}
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-200 font-sans italic my-8 leading-relaxed">
            "{currentTest.content}"
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-slate-400 ml-2">(Verified Institutional Treasury Allocation)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 flex items-center justify-center text-slate-300 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 flex items-center justify-center text-slate-300 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT SECTION // SECURE OTC COMM-LINK
      ========================================== */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-[40px] p-8 sm:p-16 border border-emerald-500/40 neon-border-emerald relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Institutional Links */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                  ENCRYPTED COMM-LINK
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4 tracking-tight">
                  Initiate Mandate or <span className="text-emerald-400">Vault Allocation</span>
                </h2>
                <p className="text-slate-400 text-sm mt-3 font-sans">
                  Minimum institutional advisory ticket: **$1,000,000 USD equivalent**. For OTC block orders or custom WebGL quant terminal licensing, connect below.
                </p>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 font-mono text-xs">
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between text-slate-300 hover:text-emerald-300 transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>TELEGRAM VIP DESK (@apex_quant_vip)</span>
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </a>

                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-slate-300 hover:text-cyan-300 transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span>DISCORD ALPHA SYNDICATE</span>
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </a>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 flex items-center justify-center gap-2 text-slate-300 hover:text-white"
                  >
                    <Twitter className="w-4 h-4 text-cyan-400" />
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 flex items-center justify-center gap-2 text-slate-300 hover:text-white"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400/90">
                🔒 PGP KEY FINGERPRINT: `A4E2 89B1 C440 9102 88AA`
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 bg-[#050816]/80 p-8 rounded-3xl border border-slate-800">
              {submitted ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(0,255,170,0.5)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">Encrypted Mandate Transmitted</h3>
                  <p className="text-slate-400 text-sm max-w-md font-sans">
                    Our sovereign advisory desk has received your allocation request. An executive partner will reach out via encrypted comms within 4 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300 pt-4"
                  >
                    Send another dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400">EXECUTIVE / FUND NAME</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="Sovereign Capital LLC"
                        className="w-full bg-slate-900/90 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400">INSTITUTIONAL EMAIL</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        placeholder="cio@sovereigncap.io"
                        className="w-full bg-slate-900/90 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">PROPOSED CAPITAL ALLOCATION TICKET</label>
                    <select
                      value={formState.aum}
                      onChange={(e) => setFormState({...formState, aum: e.target.value})}
                      className="w-full bg-slate-900/90 px-4 py-3.5 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-400 transition-colors font-mono"
                    >
                      <option value="$1M - $5M">$1,000,000 - $5,000,000 USD</option>
                      <option value="$5M - $20M">$5,000,000 - $20,000,000 USD</option>
                      <option value="$20M+">$20,000,000+ USD Sovereign Mandate</option>
                      <option value="Licensing">Custom WebGL Workstation Terminal Licensing</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">EXECUTIVE MANDATE & OBJECTIVES</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="Detail vault custody preferences, target Sharpe ratio, or API integration requirements..."
                      className="w-full bg-slate-900/90 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-[#050816] font-display font-extrabold text-sm hover:opacity-95 transition-all shadow-[0_0_30px_rgba(0,255,170,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>DISPATCH SECURE ENCRYPTED MANDATE</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Footer Copyright */}
      <footer className="pt-12 text-center text-xs font-mono text-slate-600 border-t border-slate-900 max-w-7xl mx-auto px-4">
        <p>© 2035 APEX QUANTUM WORKSTATIONS // BILLION DOLLAR FINTECH ENGINEERING. ALL RIGHTS RESERVED.</p>
        <p className="mt-1 text-slate-700">POWERED BY REACT THREE FIBER, SHADCN UI & GEMINI NEURAL ORACLES.</p>
      </footer>

    </div>
  );
}
