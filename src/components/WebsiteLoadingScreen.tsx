import React, { useState, useEffect } from 'react';
import { Component as IsometricLoader } from './ui/loader-3';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

export default function WebsiteLoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("BOOTSTRAPPING APEX.QUANT CORE ENGINE...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 3;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("BOOTSTRAPPING APEX.QUANT CORE ENGINE...");
    } else if (progress < 55) {
      setStatusText("CONNECTING TO BINANCE VIP COLOCATION NODE (< 8ms)...");
    } else if (progress < 85) {
      setStatusText("SYNCING CME BITCOIN FUTURES DERIVATIVES ORDERBOOK...");
    } else if (progress < 100) {
      setStatusText("VERIFYING MULTI-SIG VAULT BALANCES ($45.2M AUM)...");
    } else if (progress === 100) {
      setStatusText("SYSTEMS GREEN. INITIALIZING WORKSTATION.");
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onLoaded();
        }, 700);
      }, 400);
    }
  }, [progress, onLoaded]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center p-6 select-none transition-all duration-700 ease-in-out ${
      isFadingOut ? "opacity-0 scale-105 pointer-events-none blur-sm" : "opacity-100 scale-100"
    }`}>
      {/* Background Subtle Cyber Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between font-mono text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold tracking-widest">REX.FX v2035</span>
        </div>
        <span>SECURE BOOT // ID: #AEX-01</span>
      </div>

      {/* Main Center Content Container */}
      <div className="flex flex-col items-center justify-center relative my-auto">
        
        {/* 3D Isometric Boxes Loader */}
        <div className="mb-12 relative flex items-center justify-center h-[340px] w-[240px]">
          <IsometricLoader />
        </div>

        {/* Brand Title */}
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-wider text-white text-center mb-2">
          REX<span className="text-emerald-400">.FX</span>
        </h1>
        <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-10">
          Algorithmic Wealth Workstation
        </p>

        {/* Progress Bar & Status */}
        <div className="w-full max-w-md space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 truncate pr-4">
              <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{statusText}</span>
            </span>
            <span className="text-emerald-400 font-bold shrink-0">{progress}%</span>
          </div>

          {/* Glowing Track */}
          <div className="w-full h-2 rounded-full bg-slate-900/90 border border-slate-800 p-0.5 overflow-hidden relative shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 transition-all duration-150 relative shadow-[0_0_15px_rgba(0,255,170,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Footer Security Note */}
      <div className="absolute bottom-8 text-center font-mono text-[11px] text-slate-600">
        <span className="flex items-center justify-center gap-1.5 text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
          <span>PGP ENCRYPTED COMM-LINK • ZERO DIRECTIONAL BIAS</span>
        </span>
      </div>

    </div>
  );
}
