import React, { useState, useEffect } from 'react';
import { CandlestickData } from '../types';
import { generateCandlestickData } from '../data/mockData';
import { sfx } from '../utils/audio';
import { TrendingUp, TrendingDown, Layers, Activity, Zap, BarChart2, Maximize2 } from 'lucide-react';

export default function InteractiveChart({ symbol = "BTC/USDT" }: { symbol?: string }) {
  const [timeframe, setTimeframe] = useState<"1M" | "15M" | "1H" | "4H" | "1D">("15M");
  const [data, setData] = useState<CandlestickData[]>([]);
  const [hoverPoint, setHoverPoint] = useState<CandlestickData | null>(null);
  const [isLiveIndicator, setIsLiveIndicator] = useState(true);

  useEffect(() => {
    // Generate realistic institutional candlestick history
    const base = symbol.includes("ETH") ? 3420 : symbol.includes("SOL") ? 218 : symbol.includes("SUI") ? 3.82 : 98450;
    const pts = timeframe === "1M" ? 40 : timeframe === "15M" ? 60 : timeframe === "1H" ? 80 : 100;
    setData(generateCandlestickData(pts, base));
  }, [timeframe, symbol]);

  // Simulate incoming sub-second ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        const last = { ...prev[prev.length - 1] };
        const change = (Math.random() - 0.48) * (last.close * 0.002);
        last.close = Number((last.close + change).toFixed(2));
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        last.volume += Math.floor(Math.random() * 5);
        return [...prev.slice(0, prev.length - 1), last];
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const latest = data[data.length - 1] || { close: 0, open: 0, high: 0, low: 0, volume: 0, time: "" };
  const isBullish = latest.close >= latest.open;
  const priceChange = latest.close - data[0]?.open || 0;
  const pctChange = ((priceChange / (data[0]?.open || 1)) * 100).toFixed(2);

  // Min/Max for chart normalization
  const allLow = Math.min(...data.map(d => d.low));
  const allHigh = Math.max(...data.map(d => d.high));
  const priceRange = Math.max(1, allHigh - allLow);

  return (
    <div className="glass-panel rounded-2xl p-6 border neon-border-emerald relative overflow-hidden group">
      {/* Background Holographic Grid Accent */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Chart Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              INSTITUTIONAL FEED // SUB-10MS
            </span>
            <span className="text-xs font-mono text-slate-400">ORDERBOOK: BINANCE VIP</span>
          </div>
          <div className="flex items-baseline gap-4 mt-2">
            <h3 className="text-3xl font-display font-bold text-white tracking-tight">
              {symbol} <span className="text-xl font-mono text-slate-300">${(hoverPoint?.close || latest.close).toLocaleString()}</span>
            </h3>
            <span className={`flex items-center gap-1 font-mono text-sm px-2 py-0.5 rounded ${Number(pctChange) >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              {Number(pctChange) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Number(pctChange) >= 0 ? "+" : ""}{pctChange}%
            </span>
          </div>
        </div>

        {/* Timeframe Switcher & Tools */}
        <div className="flex items-center gap-2 bg-[#0B1120]/80 p-1.5 rounded-xl border border-slate-700/60 backdrop-blur-md">
          {(["1M", "15M", "1H", "4H", "1D"] as const).map(tf => (
            <button
              key={tf}
              onClick={() => { sfx.playClick(); setTimeframe(tf); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                timeframe === tf
                  ? "bg-emerald-400 text-[#050816] shadow-[0_0_15px_rgba(0,255,170,0.5)] font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Candlestick Display Canvas (SVG Rendered for crispness) */}
      <div className="h-[340px] w-full relative pt-4 pb-8 select-none">
        {/* Y-Axis Price Labels */}
        <div className="absolute right-0 top-2 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-500 text-right pointer-events-none z-10 pr-1">
          <span>${allHigh.toLocaleString()}</span>
          <span>${(allHigh - priceRange * 0.25).toLocaleString()}</span>
          <span>${(allHigh - priceRange * 0.5).toLocaleString()}</span>
          <span>${(allHigh - priceRange * 0.75).toLocaleString()}</span>
          <span>${allLow.toLocaleString()}</span>
        </div>

        {/* SVG Candles */}
        <svg className="w-full h-full overflow-visible pr-12">
          {data.map((c, idx) => {
            const xPct = (idx / (data.length - 1 || 1)) * 100;
            const openY = 100 - ((c.open - allLow) / priceRange) * 100;
            const closeY = 100 - ((c.close - allLow) / priceRange) * 100;
            const highY = 100 - ((c.high - allLow) / priceRange) * 100;
            const lowY = 100 - ((c.low - allLow) / priceRange) * 100;
            
            const isUp = c.close >= c.open;
            const color = isUp ? "#00FFAA" : "#FF3366";
            const candleTop = Math.min(openY, closeY);
            const candleHeight = Math.max(0.8, Math.abs(openY - closeY));
            const candleWidth = Math.max(1.5, 75 / data.length);

            return (
              <g
                key={idx}
                onMouseEnter={() => { setHoverPoint(c); sfx.playHover(); }}
                onMouseLeave={() => setHoverPoint(null)}
                className="cursor-crosshair transition-opacity hover:opacity-100"
              >
                {/* Wick */}
                <line
                  x1={`${xPct}%`}
                  y1={`${highY}%`}
                  x2={`${xPct}%`}
                  y2={`${lowY}%`}
                  stroke={color}
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                {/* Body */}
                <rect
                  x={`calc(${xPct}% - ${candleWidth / 2}px)`}
                  y={`${candleTop}%`}
                  width={`${candleWidth}px`}
                  height={`${candleHeight}%`}
                  fill={color}
                  rx="1"
                  className="transition-all duration-150"
                  filter={isUp && idx === data.length - 1 ? "drop-shadow(0 0 4px rgba(0,255,170,0.6))" : undefined}
                />
                {/* Volume Bar at bottom */}
                <rect
                  x={`calc(${xPct}% - ${candleWidth / 2}px)`}
                  y={`${100 - (c.volume / 1000) * 18}%`}
                  width={`${candleWidth}px`}
                  height={`${(c.volume / 1000) * 18}%`}
                  fill={color}
                  opacity="0.2"
                />
              </g>
            );
          })}

          {/* Current Live Price Dashed Line */}
          {data.length > 0 && (
            <line
              x1="0%"
              y1={`${100 - ((latest.close - allLow) / priceRange) * 100}%`}
              x2="100%"
              y2={`${100 - ((latest.close - allLow) / priceRange) * 100}%`}
              stroke={isBullish ? "#00FFAA" : "#FF3366"}
              strokeDasharray="4 4"
              strokeWidth="1"
              opacity="0.6"
            />
          )}
        </svg>

        {/* Hover Inspector Bar */}
        {hoverPoint && (
          <div className="absolute top-0 left-0 bg-[#0B1120]/95 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-xs font-mono flex items-center gap-3 z-20 pointer-events-none shadow-xl">
            <span className="text-slate-400">TIME: {hoverPoint.time}</span>
            <span>O: <b className="text-white">${hoverPoint.open}</b></span>
            <span>H: <b className="text-emerald-400">${hoverPoint.high}</b></span>
            <span>L: <b className="text-red-400">${hoverPoint.low}</b></span>
            <span>C: <b className="text-cyan-400">${hoverPoint.close}</b></span>
            <span className="text-slate-400">VOL: {hoverPoint.volume}K</span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
        <div className="bg-[#050816]/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">24H HIGH</span>
          <span className="text-sm font-mono font-bold text-emerald-400">${allHigh.toLocaleString()}</span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">24H LOW</span>
          <span className="text-sm font-mono font-bold text-red-400">${allLow.toLocaleString()}</span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">AGGREGATED DOM DEPTH</span>
          <span className="text-sm font-mono font-bold text-cyan-400">$142.8M Ask // $189.2M Bid</span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block">DESK FUNDING RATE</span>
          <span className="text-sm font-mono font-bold text-amber-400">+0.0148% (Longs Pay)</span>
        </div>
      </div>
    </div>
  );
}
