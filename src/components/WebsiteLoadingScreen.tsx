import React, { useState, useEffect } from 'react';
import { Component as IsometricLoader } from './ui/loader-3';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

export default function WebsiteLoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("BOOTSTRAPPING ASAM FX CORE DESK...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 9) + 4;
        return next > 100 ? 100 : next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("INJECTING INTERBANK LIQUIDITY ROUTING MATRIX...");
    } else if (progress < 55) {
      setStatusText("ESTABLISHING LONDON FIBER CO-LOCATION (< 0.4ms)...");
    } else if (progress < 85) {
      setStatusText("MAPPING SMC ORDERBLOCKS & FVGs FOR XAU/USD...");
    } else if (progress < 100) {
      setStatusText("VERIFYING AUDITED CAPITAL POOLS ($18.4M AUM)...");
    } else if (progress === 100) {
      setStatusText("SYSTEMS GREEN. WELCOME, ALLOCATOR.");
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onLoaded();
        }, 700);
      }, 400);
    }
  }, [progress, onLoaded]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#03050C] flex flex-col items-center justify-center p-6 select-none transition-all duration-700 ease-in-out ${
      isFadingOut ? "opacity-0 scale-105 pointer-events-none blur-sm" : "opacity-100 scale-100"
    }`}>
      {/* Background Subtle Luxury Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-emerald-500/5 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between font-mono text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[#D4AF37] font-bold tracking-widest">ASAM FX v4.0</span>
        </div>
        <span>SECURE BOOT // ID: #ASAM-FX-01</span>
      </div>

      {/* Main Center Content Container */}
      <div className="flex flex-col items-center justify-center my-auto">
        
        {/* 3D Isometric Boxes Loader */}
        <div className="mb-8 relative flex items-center justify-center h-[280px] w-[200px]">
          <IsometricLoader />
        </div>

        {/* Brand Title */}
        <h1 className="text-4xl sm:text-5xl font-display font-black tracking-widest text-white text-center mb-1">
          ASAM <span className="text-[#D4AF37]">FX</span>
        </h1>
        <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-10">
          Sovereign Wealth Advisory
        </p>

        {/* Progress Bar & Status */}
        <div className="w-full max-w-sm space-y-3 font-mono">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5 truncate pr-4">
              <Terminal className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 animate-pulse" />
              <span>{statusText}</span>
            </span>
            <span className="text-[#D4AF37] font-bold shrink-0">{progress}%</span>
          </div>

          {/* Glowing Gold Track */}
          <div className="w-full h-2 rounded-full bg-slate-950 p-0.5 overflow-hidden relative border border-slate-900/60 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-emerald-400 transition-all duration-150 relative shadow-[0_0_15px_rgba(212,175,55,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Footer Security Note */}
      <div className="absolute bottom-8 text-center font-mono text-[10px] text-slate-500">
        <span className="flex items-center justify-center gap-1.5 text-slate-500 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>PGP ENCRYPTED COMMUNICATIONS • PRIVATE MULTI-SIG VAULT</span>
        </span>
      </div>

    </div>
  );
}
