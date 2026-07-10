import React, { useState, useEffect } from 'react';
import { FOREX_TESTIMONIALS, VIDOLLAR_STATS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Instagram, 
  ExternalLink, 
  Sparkles, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Compass, 
  Eye, 
  Check, 
  Activity 
} from 'lucide-react';

interface AboutAndContactProps {
  isFriendly?: boolean;
}

export default function AboutAndContact({ isFriendly = false }: AboutAndContactProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", size: "Under $10k", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Auto-play for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % FOREX_TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    sfx.playSuccess();
    setSubmitted(true);
  };

  const nextTestimonial = () => {
    sfx.playClick();
    setActiveTestimonialIdx((prev) => (prev + 1) % FOREX_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    sfx.playClick();
    setActiveTestimonialIdx((prev) => (prev - 1 + FOREX_TESTIMONIALS.length) % FOREX_TESTIMONIALS.length);
  };

  const currentTest = FOREX_TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="relative z-10 space-y-32 pb-32">
      
      {/* ==========================================
          ABOUT ME SECTION
      ========================================== */}
      <section id="about" className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Premium Profile Frame with Golden Accents & 3D Glass Shadow */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-emerald-500 to-[#D4AF37]/50 rounded-[40px] blur-2xl opacity-30 pointer-events-none animate-pulse" />
            <div className="glass-panel p-3 rounded-[36px] border border-[#D4AF37]/30 bg-black/40 relative group shadow-[0_0_60px_rgba(212,175,55,0.15)]">
              <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-[#0A0E1A] relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdtEyJl2G43i96NXeizfcePrU0tl4PB5pY0lOEwhokA&s=10"
                  alt="Vidollar Professional Trader Portrait"
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                {/* Golden Radial Shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/10 to-transparent" />
                
                {/* Floating Institutional Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#D4AF37] font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> {isFriendly ? "VERIFIED TRADER" : "PRIVATE DESK"}
                    </span>
                    <span>ID: #VIDOLLAR-01</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {isFriendly 
                      ? "Professional Trader. Simple step-by-step Chart Teacher."
                      : "Sovereign Capital Allocator. Smart Money Concepts (SMC) Specialist."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Biography, Philosophy, Mission, Vision, Values */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase inline-block font-bold">
                {isFriendly ? "A PERSONAL NOTE" : "THE TRADING ARCHITECT"}
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400">Vidollar</span>
              </h2>
            </div>

            <p className="text-slate-200 text-lg sm:text-xl font-sans leading-relaxed">
              {isFriendly 
                ? `"Markets follow logical patterns of supply and demand. My goal is to teach you how to spot these moves easily, protect your capital, and trade with total calm and confidence."`
                : `"Markets do not move randomly. They are driven by central bank pricing algorithms and systemic liquidity pools. My goal is to map these footprints, bypass retail noise, and execute trades with absolute precision."`
              }
            </p>

            <div className="text-slate-400 text-sm sm:text-base space-y-4 leading-relaxed font-sans">
              <p>
                {isFriendly 
                  ? "With over 8 years of experience reading charts, Vidollar has built a clear and simple system based on following real-world market movements."
                  : "With over 8 years of active screen-time navigating the foreign exchange and precious metal desks, Vidollar has established a pristine edge anchored in Smart Money Concepts (SMC) and Price Action."
                }
              </p>
              <p>
                {isFriendly 
                  ? "Vidollar has successfully passed professional trading challenges, managed private client assets, and coached thousands of everyday beginners to help them trade safely."
                  : "Vidollar has successfully passed multiple top-tier institutional prop challenges, securing substantial active capital and mentoring thousands of aspiring retail traders to achieve professional status."
                }
              </p>
            </div>

            {/* Mission, Vision & Values Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#0F1424]/40 border border-slate-800/80 hover:border-[#D4AF37]/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-display font-bold text-white">{isFriendly ? "My Approach" : "Our Mission"}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {isFriendly 
                    ? "Making charts easy to read so anyone can trade with confidence and clarity."
                    : "Demystifying institutional orderflow to empower traders with actionable, algorithmic market understanding."
                  }
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1424]/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-display font-bold text-white">{isFriendly ? "My Vision" : "Our Vision"}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {isFriendly 
                    ? "Setting a standard of complete honesty, verified results, and safe trading guides."
                    : "Establishing a global gold standard of verified, transparent Forex execution and high-Sharpe trading programs."
                  }
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F1424]/40 border border-slate-800/80 hover:border-[#D4AF37]/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-display font-bold text-white">{isFriendly ? "My Values" : "Core Values"}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {isFriendly 
                    ? "Putting safety first, controlling emotions, and showing honest, verified results."
                    : "Discipline above greed, relentless risk hedging, and absolute transparency in audit payouts."
                  }
                </p>
              </div>
            </div>

            {/* Live Stats Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 font-mono">
              <div className="bg-[#0B1120]/40 p-4 rounded-2xl border border-slate-800/80 hover:border-[#D4AF37]/20 transition-all">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isFriendly ? "TRADES RECORDED" : "TRADES EXECUTED"}</span>
                <span className="text-2xl font-bold text-[#D4AF37] mt-1.5 block">{VIDOLLAR_STATS.tradesExecuted}</span>
              </div>
              <div className="bg-[#0B1120]/40 p-4 rounded-2xl border border-slate-800/80 hover:border-emerald-400/20 transition-all">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isFriendly ? "YEARS OF EXPERIENCE" : "YEARS TRADING"}</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1.5 block">{VIDOLLAR_STATS.yearsTrading}</span>
              </div>
              <div className="bg-[#0B1120]/40 p-4 rounded-2xl border border-slate-800/80 hover:border-[#D4AF37]/20 transition-all">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isFriendly ? "STUDENTS HELPED" : "HAPPY CLIENTS"}</span>
                <span className="text-2xl font-bold text-[#D4AF37] mt-1.5 block">{VIDOLLAR_STATS.happyClients}</span>
              </div>
              <div className="bg-[#0B1120]/40 p-4 rounded-2xl border border-slate-800/80 hover:border-emerald-400/20 transition-all">
                <span className="text-[10px] text-slate-500 block uppercase tracking-wider">{isFriendly ? "WIN ACCURACY" : "ACCURACY RATE"}</span>
                <span className="text-2xl font-bold text-emerald-400 mt-1.5 block">{VIDOLLAR_STATS.tradingAccuracy}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          TESTIMONIALS SECTION
      ========================================== */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16 font-bold">
          <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase">
            {isFriendly ? "WHAT MY STUDENTS & CO-TRADERS SAY" : "SOVEREIGN AUDITS & ENDORSEMENTS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-5 tracking-tight">
            {isFriendly ? "Real Success Stories from " : "Endorsed by Global Forex "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">{isFriendly ? "Around the World" : "Fund Managers"}</span>
          </h2>
        </div>

        {/* Glassmorphic Auto-playing Testimonial Card */}
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-[36px] border border-[#D4AF37]/20 bg-[#0B1120]/60 backdrop-blur-xl relative shadow-2xl hover:border-[#D4AF37]/40 transition-colors duration-500 group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <img
                src={currentTest.avatar}
                alt={currentTest.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37]/50"
              />
              <div>
                <h4 className="text-xl font-display font-bold text-white">{currentTest.name}</h4>
                <p className="text-xs font-mono text-[#D4AF37]">{currentTest.role}</p>
                <p className="text-xs font-mono text-slate-400">{currentTest.institution}</p>
              </div>
            </div>

            <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 font-bold self-start sm:self-auto">
              {currentTest.allocatedCapital}
            </span>
          </div>

          <p className="text-lg sm:text-xl text-slate-200 font-sans italic my-8 leading-relaxed">
            "{currentTest.content}"
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs font-mono">
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37]" />
              <span className="text-slate-500 ml-2">
                {isFriendly ? "(Verified Success Feedback)" : "(Verified Institutional Audited Account)"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-11 h-11 rounded-xl bg-[#050816] border border-slate-800 hover:border-[#D4AF37] flex items-center justify-center text-slate-300 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-11 h-11 rounded-xl bg-[#050816] border border-slate-800 hover:border-[#D4AF37] flex items-center justify-center text-slate-300 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT SECTION
      ========================================== */}
      <section id="contact" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card rounded-[40px] p-8 sm:p-16 border border-[#D4AF37]/30 shadow-[0_0_80px_rgba(212,175,55,0.08)] bg-[#070B16] relative overflow-hidden">
          
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
            
            {/* Left Column: Direct Links & Coordinates */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                  {isFriendly ? "LET'S STAY IN TOUCH" : "SECURE OTC COMMUNICATIONS"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-4 tracking-tight">
                  {isFriendly ? "Send a Message or " : "Initiate Advisory or "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">{isFriendly ? "Join My Community" : "Join Mentorship"}</span>
                </h2>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed font-sans">
                  {isFriendly 
                    ? "Connect with me directly! If you want to ask about beginner classes, free tips, or premium support, fill out the form or reach out through my official accounts below."
                    : "Connect through our secure direct links. For mentorship applications, signals access, or portfolio management inquiries, fill out the form or reach out via official handles below."
                  }
                </p>
              </div>

              {/* Verified Handles */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playClick()}
                  className="p-4 rounded-2xl bg-black/40 hover:bg-[#D4AF37]/10 border border-slate-800/80 hover:border-[#D4AF37]/50 flex items-center justify-between text-slate-300 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span>TELEGRAM OTC DESK // @Vidollar_Desk</span>
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playClick()}
                  className="p-4 rounded-2xl bg-black/40 hover:bg-[#10B981]/10 border border-slate-800/80 hover:border-[#10B981]/50 flex items-center justify-between text-slate-300 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#10B981]" />
                    <span>WHATSAPP SUPPORT // Direct chat link</span>
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.playClick()}
                  className="p-4 rounded-2xl bg-black/40 hover:bg-pink-500/10 border border-slate-800/80 hover:border-pink-500/50 flex items-center justify-between text-slate-300 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    <span>INSTAGRAM TRADING LIFE // @vidollar</span>
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </a>

                {/* Email & Location Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-xl bg-black/40 border border-slate-800/80 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">EMAIL SUPPORT</span>
                      <span className="text-slate-300 font-bold block text-[11px] truncate">support@vidollar.com</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-slate-800/80 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-[9px] text-slate-500 block">DESK OFFICE</span>
                      <span className="text-slate-300 font-bold block text-[11px]">London, City of</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Premium Google Map Iframe Card (Custom styled inside luxury frame) */}
              <div className="rounded-2xl overflow-hidden border border-slate-800/90 h-[150px] relative group">
                <iframe 
                  title="Vidollar London Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.7281065701!2d-0.24168142340898517!3d51.52877184091605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk" 
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-60 group-hover:opacity-80 transition-opacity" 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-[#050816]/10 pointer-events-none" />
                <span className="absolute bottom-2.5 left-2.5 text-[9px] font-mono bg-[#050816] border border-slate-800 px-2 py-1 rounded text-slate-400">
                  HQ CENTRAL LONDON CO-LOCATION
                </span>
              </div>
            </div>

            {/* Right Column: Encrypted Contact Form */}
            <div className="lg:col-span-7 bg-black/30 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-sm">
              {submitted ? (
                <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {isFriendly ? "Message Sent!" : "Transmission Successful"}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md font-sans">
                    {isFriendly 
                      ? "Thank you! I have received your message. I or my support helper will reach out to you by email very soon (usually within a couple of hours)."
                      : "Your trader blueprint portfolio dispatch has been registered. Vidollar or our private desk advisor will reach out via email or secure handles within 4 hours."
                    }
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-[#D4AF37] underline hover:text-[#D4AF37]/80 pt-4 cursor-pointer font-bold"
                  >
                    {isFriendly ? "Send another message" : "Transmit another dispatch"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400">
                        {isFriendly ? "YOUR FULL NAME" : "YOUR FULL NAME"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="Johnathan Doe"
                        className="w-full bg-slate-900/60 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-400">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        placeholder={isFriendly ? "yourname@example.com" : "johndoe@sovereign.com"}
                        className="w-full bg-slate-900/60 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">
                      {isFriendly ? "WHAT SERVICE ARE YOU INTERESTED IN?" : "DESIRED ACCOUNT SIZE / SERVICE PREFERENCE"}
                    </label>
                    <select
                      value={formState.size}
                      onChange={(e) => setFormState({...formState, size: e.target.value})}
                      className="w-full bg-slate-900/60 px-4 py-3.5 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors font-mono"
                    >
                      {isFriendly ? (
                        <>
                          <option value="Under $10k">Beginner Learning & Free Lessons</option>
                          <option value="$10k - $100k">1-on-1 Trading Coaching & Practice Programs</option>
                          <option value="$100k - $1M">Advanced Pro Practice Challenges</option>
                          <option value="Above $1M">Institutional Private Access & Custom Tools</option>
                        </>
                      ) : (
                        <>
                          <option value="Under $10k">Under $10,000 USD (SMC Mentorship / Signals)</option>
                          <option value="$10k - $100k">$10,000 - $100,000 USD (Elite Private Program)</option>
                          <option value="$100k - $1M">$100,000 - $1,000,000 USD (Prop Firm Coaching)</option>
                          <option value="Above $1M">Above $1,000,000 USD (Private Fund Custody Portfolio)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">
                      {isFriendly ? "TELL ME ABOUT YOUR TRADING GOALS" : "DESCRIBE YOUR TRADING OBJECTIVES / INQUIRY"}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder={isFriendly 
                        ? "Tell me a bit about yourself! What are you hoping to learn? E.g., 'I am completely new and want to learn how charts work...' or 'I want to build a secondary income stream...'"
                        : "Please details your trading style, challenges, or targets. E.g., 'Want to pass my $100k challenge...' or 'Inquiring about Gold portfolio management...'"
                      }
                      className="w-full bg-slate-900/60 px-4 py-3.5 rounded-xl border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400 text-black font-display font-extrabold text-sm hover:opacity-95 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2.5 cursor-pointer relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isFriendly ? "SEND SECURE MESSAGE" : "DISPATCH SECURE ADVISORY LINE"}
                    </span>
                    <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
