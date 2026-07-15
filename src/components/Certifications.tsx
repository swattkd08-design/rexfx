import React from 'react';
import { ASAM_FX_CERTIFICATIONS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { Award, ShieldCheck, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

export default function Certifications() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Award": return <Award className="w-6 h-6 text-[#D4AF37]" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case "CheckCircle2": return <CheckCircle2 className="w-6 h-6 text-cyan-400" />;
      default: return <Trophy className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase">
          CREDENTIALS & MERIT
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
          Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">Certifications & Awards</span>
        </h2>
        <p className="text-slate-400 mt-4 text-sm sm:text-base font-sans">
          Audited qualifications and historic awards certifying institutional competence in precious metal trading and smart money concepts.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ASAM_FX_CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            onMouseEnter={() => sfx.playHover()}
            className="glass-panel rounded-2xl p-6 border border-slate-800 bg-[#0B1120]/30 hover:border-[#D4AF37]/50 hover:bg-[#0B1120]/60 transition-all duration-300 relative group flex flex-col justify-between h-full"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none rounded-tr-2xl" />

            <div className="space-y-4">
              {/* Icon & Year */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-black/60 border border-slate-800 group-hover:border-[#D4AF37]/30 flex items-center justify-center transition-colors">
                  {getIcon(cert.iconName)}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-500">
                  {cert.year}
                </span>
              </div>

              {/* Course Info */}
              <div className="space-y-1.5">
                <h3 className="text-base font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  {cert.issuer}
                </p>
              </div>
            </div>

            {/* Achievement Grade */}
            <div className="mt-6 pt-4 border-t border-slate-900/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">GRADE:</span>
              <span className="text-emerald-400 font-bold uppercase">{cert.grade}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
