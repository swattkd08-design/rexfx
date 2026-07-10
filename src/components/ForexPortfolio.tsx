import React, { useRef } from 'react';
import { FOREX_PORTFOLIO } from '../data/mockData';
import { sfx } from '../utils/audio';
import { BookOpen, Calendar, TrendingUp, Compass, ShieldAlert, Award, FileText } from 'lucide-react';

interface TiltCardProps {
  item: typeof FOREX_PORTFOLIO[0];
  isFriendly?: boolean;
}

function TiltCard({ item, isFriendly = false }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around zero (-0.5 to 0.5)
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;
    
    // Calculate rotation angles (max 10 degrees tilt)
    const rotateX = -normalizedY * 12;
    const rotateY = normalizedX * 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transition = 'none'; // Remove transitions during movement for instantaneous feel
    sfx.playHover();
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Gold Analysis": return <TrendingUp className="w-4 h-4 text-[#D4AF37]" />;
      case "Risk Management": return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
      case "Weekly Outlook": return <Calendar className="w-4 h-4 text-cyan-400" />;
      case "Trading Journal": return <BookOpen className="w-4 h-4 text-orange-400" />;
      case "Trade Recaps": return <Award className="w-4 h-4 text-pink-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    if (!isFriendly) return cat;
    switch (cat) {
      case "Gold Analysis": return "Gold Guide";
      case "Risk Management": return "Safe Trading Rules";
      case "Weekly Outlook": return "Weekly Map";
      case "Trading Journal": return "My Trading Notes";
      case "Trade Recaps": return "Success Stories";
      default: return cat;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-panel rounded-3xl overflow-hidden bg-[#0A0E1A]/40 border border-slate-800/80 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl flex flex-col justify-between select-none h-full relative cursor-pointer"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div>
        {/* Card Cover Image */}
        <div className="aspect-[16/10] overflow-hidden bg-slate-950 relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent" />
          
          {/* Tag Category overlay */}
          <span className="absolute top-4 left-4 text-[10px] font-mono px-2.5 py-1 rounded bg-black/85 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5 font-semibold">
            {getCategoryIcon(item.category)}
            {getCategoryLabel(item.category)}
          </span>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
            {isFriendly ? "📁 STUDY FILE" : "📁 VIDOLLAR ARCHIVE"} // {item.readTime}
          </span>
          <h3 className="text-lg font-display font-bold text-white leading-snug hover:text-[#D4AF37] transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* Stats footer block */}
      {item.stats && (
        <div className="px-6 pb-6 pt-3 border-t border-slate-900/80 mt-4 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
          <span>{isFriendly ? "RECORDED OUTCOME:" : "METRICS AUDIT:"}</span>
          <span>{item.stats}</span>
        </div>
      )}

    </div>
  );
}

interface ForexPortfolioProps {
  isFriendly?: boolean;
}

export default function ForexPortfolio({ isFriendly = false }: ForexPortfolioProps) {
  return (
    <section id="portfolio-list" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* section header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
          {isFriendly ? "LEARNING LIBRARY & CASE STUDIES" : "VERIFIED ARCHIVES & PLANS"}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
          {isFriendly ? "Real Examples & " : "Trading "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400">{isFriendly ? "Interactive Guides" : "Portfolio & Case Studies"}</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base font-sans">
          {isFriendly 
            ? "Look through real-life examples of how I plan, manage risk, and record outcomes on the actual chart."
            : "Deep diagnostic logs, Gold setups, and dynamic trading plans audited for systemic execution metrics."
          }
        </p>
      </div>

      {/* Grid of 6 portfolio item cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FOREX_PORTFOLIO.map((item) => (
          <TiltCard key={item.id} item={item} isFriendly={isFriendly} />
        ))}
      </div>

    </section>
  );
}
