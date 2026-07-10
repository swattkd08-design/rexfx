import React from 'react';
import { TRADING_SERVICES } from '../data/mockData';
import { sfx } from '../utils/audio';
import { 
  UserCheck, 
  Radio, 
  Briefcase, 
  FileCheck, 
  HelpCircle, 
  Code, 
  Globe, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface TradingServicesProps {
  isFriendly?: boolean;
}

export default function TradingServices({ isFriendly = false }: TradingServicesProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "UserCheck": return <UserCheck className="w-6 h-6 text-[#D4AF37]" />;
      case "Radio": return <Radio className="w-6 h-6 text-emerald-400" />;
      case "Briefcase": return <Briefcase className="w-6 h-6 text-cyan-400" />;
      case "FileCheck": return <FileCheck className="w-6 h-6 text-amber-400" />;
      case "HelpCircle": return <HelpCircle className="w-6 h-6 text-pink-400" />;
      case "Code": return <Code className="w-6 h-6 text-purple-400" />;
      case "Globe": return <Globe className="w-6 h-6 text-teal-400" />;
      default: return <UserCheck className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const handleApply = (serviceTitle: string) => {
    sfx.playClick();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Plain-English translations of services for friendly view
  const friendlyServicesMap: Record<string, { title: string; description: string; features: string[] }> = {
    "1-on-1 Elite Mentorship": {
      title: "1-on-1 Personal Coaching",
      description: "Learn how to read charts step-by-step from scratch. We work together live to build a custom trading system that fits your lifestyle.",
      features: ["Private weekly live study sessions", "Help creating a personalized trading plan", "Mindset coaching for emotional control", "Direct 24/7 chat support with Vidollar"]
    },
    "Institutional Signal Service": {
      title: "Real-Time Trading Alerts",
      description: "Receive instant notifications when I find high-probability trade setups, so you can copy and learn from them.",
      features: ["Focus on Gold and major currencies", "Plain explanation of why the trade is taken", "Instant alerts via WhatsApp or Telegram", "Step-by-step instructions of when to close"]
    },
    "Sovereign Portfolio Management": {
      title: "Capital Growth Services",
      description: "Let a professional handle the charts for you. Focused on protecting and growing your hard-earned wealth steadily.",
      features: ["Absolute safety nets to protect your cash", "Bi-weekly progress updates", "Professional risk strategies", "Fair profit-sharing terms"]
    },
    "Advanced Account Audit": {
      title: "Trading History Check-up",
      description: "Let us analyze your past trades to find common mistakes, bad habits, and help you fix them immediately.",
      features: ["Pinpointing why a trade went wrong", "Simple charts of your performance", "Advice on correct sizing of trades", "Clear and easy action steps to improve"]
    },
    "Trading Consultation": {
      title: "Trading Strategy Consult",
      description: "Book an hour to ask any questions you have, get help with professional challenges, or optimize your setup.",
      features: ["Step-by-step guidance", "Optimizing your trading hours", "Finding the best low-cost brokers", "Making your strategy clean and simple"]
    },
    "Strategy Formulation & Dev": {
      title: "Custom Trading Tools",
      description: "We help turn your manual rules and ideas into custom chart indicators or automated alerts.",
      features: ["Programming support for TradingView", "Historical testing reports", "Simplifying chart signals", "Written rulebooks for your strategies"]
    },
    "Weekly Institutional Outlook": {
      title: "Weekly Market Guide",
      description: "A simple overview sent before the market opens so you know what major price moves to expect in the week ahead.",
      features: ["Highlights of major news events", "Key support levels explained simply", "Simplifying complex bank reports", "Gold targets to watch out for"]
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* section header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
            {isFriendly ? "HOW WE CAN WORK TOGETHER" : "PROFESSIONAL TRADING PROGRAMS"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
            {isFriendly ? "Simple " : "Premium "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">{isFriendly ? "Services & Learning Tools" : "Services & Solutions"}</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm font-mono max-w-sm mt-4 md:mt-0 leading-relaxed">
          {isFriendly 
            ? "Choose the perfect way to fast-track your success. From personalized teaching to copying live trades, we keep things simple."
            : "Tailored vehicles to secure your market funding, pass institution evaluations, and leverage private capital compounding."
          }
        </p>
      </div>

      {/* Grid of 7 services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TRADING_SERVICES.map((serv) => {
          const matched = friendlyServicesMap[serv.title];
          const displayTitle = isFriendly && matched ? matched.title : serv.title;
          const displayDesc = isFriendly && matched ? matched.description : serv.description;
          const displayFeatures = isFriendly && matched ? matched.features : serv.features;

          return (
            <div
              key={serv.id}
              onMouseEnter={() => sfx.playHover()}
              className="glass-panel rounded-3xl p-8 border border-slate-800 bg-[#070C1B]/50 hover:border-[#D4AF37]/50 hover:bg-[#070C1B]/80 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              {/* Top right gold bar accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black/60 border border-slate-800 group-hover:border-[#D4AF37]/40 flex items-center justify-center transition-colors shadow-lg">
                    {getIcon(serv.iconName)}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {displayTitle}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[48px]">
                  {displayDesc}
                </p>

                {/* Feature bullets */}
                <div className="space-y-2.5 pt-2 border-t border-slate-900 font-mono text-xs text-slate-300">
                  {displayFeatures.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application action button */}
              <button
                onClick={() => handleApply(serv.title)}
                className="w-full mt-8 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-black hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-emerald-400 hover:border-transparent font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>{isFriendly ? "SEND AN INQUIRY" : "INQUIRE & APPLY"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
}
