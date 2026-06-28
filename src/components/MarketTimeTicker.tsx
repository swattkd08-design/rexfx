import React, { useState, useEffect } from 'react';
import { Clock, Globe, Activity, Zap, CheckCircle2 } from 'lucide-react';

interface Session {
  name: string;
  city: string;
  startHourUtc: number; // 0 - 23
  endHourUtc: number;
  color: string;
}

const SESSIONS: Session[] = [
  { name: "Sydney", city: "SYD", startHourUtc: 22, endHourUtc: 7, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { name: "Tokyo", city: "TYO", startHourUtc: 0, endHourUtc: 9, color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
  { name: "London", city: "LON", startHourUtc: 8, endHourUtc: 17, color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
  { name: "New York", city: "NYC", startHourUtc: 13, endHourUtc: 22, color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
];

export default function MarketTimeTicker() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHourUtc = now.getUTCHours();
  
  // Format times
  const formatTime = (timeZone: string) => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
    } catch {
      return now.toISOString().slice(11, 19);
    }
  };

  const utcTime = now.toISOString().slice(11, 19) + " UTC";
  const nycTime = formatTime("America/New_York") + " EST";
  const lonTime = formatTime("Europe/London") + " GMT";
  const tyoTime = formatTime("Asia/Tokyo") + " JST";

  const isSessionActive = (s: Session) => {
    if (s.startHourUtc < s.endHourUtc) {
      return currentHourUtc >= s.startHourUtc && currentHourUtc < s.endHourUtc;
    } else {
      // Wraps around midnight (e.g. Sydney 22 to 7)
      return currentHourUtc >= s.startHourUtc || currentHourUtc < s.endHourUtc;
    }
  };

  // Determine market overlap
  const activeCount = SESSIONS.filter(isSessionActive).length;

  return (
    <div className="w-full bg-[#0B1120] border-y border-slate-800/80 py-2.5 px-4 font-mono select-none overflow-x-auto no-scrollbar shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-[760px] text-xs">
        
        {/* Left: Master UTC Clock */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-emerald-400 font-bold">
            <Clock className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>{utcTime}</span>
          </div>
          <span className="text-slate-500 text-[11px] hidden md:inline">GLOBAL MARKET SYNCHRONIZATION</span>
        </div>

        {/* Center: Active Trading Sessions */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[10px] uppercase tracking-wider mr-1 flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-400" /> SESSIONS:
          </span>
          {SESSIONS.map((s) => {
            const active = isSessionActive(s);
            return (
              <div 
                key={s.name}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
                  active 
                    ? `${s.color} shadow-[0_0_12px_rgba(0,255,170,0.15)] ring-1 ring-white/10` 
                    : "text-slate-500 border-slate-800 bg-slate-950/40 opacity-50"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-current animate-ping" : "bg-slate-600"}`} />
                <span>{s.city}</span>
                <span className="text-[9px] opacity-75">({active ? "OPEN" : "CLOSED"})</span>
              </div>
            );
          })}
        </div>

        {/* Right: Key Financial Hub Clocks */}
        <div className="flex items-center gap-3 shrink-0 text-slate-300 text-[11px]">
          <div className="flex items-center gap-1">
            <span className="text-slate-500">NYC:</span>
            <span className="font-bold text-white">{nycTime.split(" ")[0]}</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">LON:</span>
            <span className="font-bold text-white">{lonTime.split(" ")[0]}</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">TYO:</span>
            <span className="font-bold text-white">{tyoTime.split(" ")[0]}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
