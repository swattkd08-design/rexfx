import React, { useState } from 'react';
import { TRADING_GALLERY, GalleryItem } from '../data/mockData';
import { sfx } from '../utils/audio';
import { Maximize2, X, Sparkles, LayoutGrid, Award, Monitor } from 'lucide-react';

interface TradingGalleryProps {
  isFriendly?: boolean;
}

export default function TradingGallery({ isFriendly = false }: TradingGalleryProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const handleOpenLightbox = (item: GalleryItem) => {
    sfx.playClick();
    setActiveItem(item);
  };

  const handleCloseLightbox = () => {
    sfx.playClick();
    setActiveItem(null);
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase font-bold">
            {isFriendly ? "PHOTOS FROM MY WORKSTATION" : "VISUAL DISPATCHES"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-5 tracking-tight">
            {isFriendly ? "Where the " : "The Trading "}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">{isFriendly ? "Trading Happens" : "Lifestyle & Workspace"}</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm font-mono max-w-sm mt-4 md:mt-0 leading-relaxed">
          {isFriendly 
            ? "Take a look at my real-world trading setups, physical gold reserves, and study desks. I believe in complete transparency."
            : "A glimpse into the high-end institutional workstation, Gold reserves, and market structure analysis nodes of Asam FX."
          }
        </p>
      </div>

      {/* Grid of gallery assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TRADING_GALLERY.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenLightbox(item)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-800 bg-[#0B1120]/30 transition-all duration-500 hover:border-[#D4AF37]/50 shadow-xl"
          >
            {/* Image container with zoom hover effect */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Hover overlay icon */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-lg scale-90 group-hover:scale-100 transition-transform">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom info banner */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1 z-10 pointer-events-none">
              <span className="text-[9px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase bg-[#050816]/90 border border-[#D4AF37]/20 px-2.5 py-0.5 rounded-full inline-block">
                {item.category}
              </span>
              <h3 className="text-base font-display font-bold text-white pt-1">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Lightbox Overlay Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Close trigger button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#0B1120] border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer shadow-2xl hover:border-[#D4AF37] z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Centered Image Card Box */}
          <div
            className="max-w-4xl w-full bg-[#0B1120] rounded-[32px] border border-[#D4AF37]/30 overflow-hidden shadow-2xl relative flex flex-col md:flex-row group"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side: large image */}
            <div className="md:w-[60%] bg-black flex items-center justify-center relative overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover max-h-[70vh]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1120]/10 pointer-events-none" />
            </div>

            {/* Right side: details and descriptive text */}
            <div className="md:w-[40%] p-8 flex flex-col justify-between bg-[#0B1120] border-t md:border-t-0 md:border-l border-slate-800">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#D4AF37] px-2.5 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full font-bold uppercase tracking-widest">
                    {activeItem.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">EXHIBIT // ID #{activeItem.id}</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-display font-bold text-white">
                    {activeItem.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-[#D4AF37] rounded" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeItem.description}
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-6 border-t border-slate-900 flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-6 md:mt-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-bold block">VERIFIED SOURCE</span>
                  <span>Asam FX Private Archive</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
