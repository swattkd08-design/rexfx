import React, { useState, useEffect } from 'react';
import { CandlestickData } from '../types';
import { generateForexCandlestickData } from '../data/mockData';
import { sfx } from '../utils/audio';
import { TrendingUp, TrendingDown, Layers, Activity, Zap, BarChart2, Maximize2 } from 'lucide-react';

export default function InteractiveChart({ symbol = "XAU/USD" }: { symbol?: string }) {
  const [timeframe, setTimeframe] = useState<"1M" | "15M" | "1H" | "4H" | "1D">("15M");
  const [data, setData] = useState<CandlestickData[]>([]);
  const [hoverPoint, setHoverPoint] = useState<CandlestickData | null>(null);

  // Determine base prices & decimals for Forex vs Gold
  const getBaseMetrics = (sym: string) => {
    if (sym === "XAU/USD") return { base: 2342.10, decimals: 2, isGold: true };
    if (sym === "GBP/USD") return { base: 1.26420, decimals: 5, isGold: false };
    if (sym === "EUR/USD") return { base: 1.08210, decimals: 5, isGold: false };
    if (sym === "USD/JPY") return { base: 158.200, decimals: 3, isGold: false };
    return { base: 1.00000, decimals: 5, isGold: false };
  };

  const metrics = getBaseMetrics(symbol);

  useEffect(() => {
    const pts = timeframe === "1M" ? 40 : timeframe === "15M" ? 60 : timeframe === "1H" ? 80 : 100;
    setData(generateForexCandlestickData(pts, metrics.base));
  }, [timeframe, symbol]);

  // Simulate incoming sub-second ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        const last = { ...prev[prev.length - 1] };
        
        // Simulating sub-pip/volatility changes
        const changeRatio = symbol === "XAU/USD" ? 0.001 : symbol === "USD/JPY" ? 0.0008 : 0.0004;
        const change = (Math.random() - 0.49) * (last.close * changeRatio);
        
        last.close = Number((last.close + change).toFixed(metrics.decimals));
        last.high = Math.max(last.high, last.close);
        last.low = Math.min(last.low, last.close);
        last.volume += Math.floor(Math.random() * 8);
        
        return [...prev.slice(0, prev.length - 1), last];
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [symbol, metrics.decimals]);

  const latest = data[data.length - 1] || { close: 0, open: 0, high: 0, low: 0, volume: 0, time: "" };
  const isBullish = latest.close >= latest.open;
  const priceChange = latest.close - (data[0]?.open || 0);
  const pctChange = ((priceChange / (data[0]?.open || 1)) * 100).toFixed(3);

  // Min/Max for chart normalization
  const allLow = Math.min(...data.map(d => d.low));
  const allHigh = Math.max(...data.map(d => d.high));
  const priceRange = Math.max(0.0001, allHigh - allLow);

  // Price formatting helper
  const formatPrice = (val: number) => {
    const formatted = val.toFixed(metrics.decimals);
    return metrics.isGold ? `$${formatted}` : formatted;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 bg-[#070B16]/80 relative overflow-hidden group shadow-[0_0_50px_rgba(212,175,55,0.05)]">
      {/* Background Holographic Grid Accent */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Chart Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              SOVEREIGN FEED // CO-LOCATED
            </span>
            <span className="text-[10px] font-mono text-slate-500">LIQUIDITY: CME GROUP</span>
          </div>
          <div className="flex items-baseline gap-4 mt-2">
            <h3 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-baseline gap-3">
              <span>{symbol}</span>
              <span className="text-xl font-mono font-bold text-slate-300">
                {formatPrice(hoverPoint?.close || latest.close)}
              </span>
            </h3>
            <span className={`flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-md font-bold ${Number(pctChange) >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              {Number(pctChange) >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Number(pctChange) >= 0 ? "+" : ""}{pctChange}%
            </span>
          </div>
        </div>

        {/* Timeframe Switcher & Tools */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-slate-800/80 backdrop-blur-md">
          {(["1M", "15M", "1H", "4H", "1D"] as const).map(tf => (
            <button
              key={tf}
              onClick={() => { sfx.playClick(); setTimeframe(tf); }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Candlestick Display Canvas (SVG Rendered for crispness) */}
      <div className="h-[320px] w-full relative pt-4 pb-8 select-none">
        {/* Y-Axis Price Labels */}
        <div className="absolute right-0 top-2 bottom-8 flex flex-col justify-between text-[9px] font-mono text-slate-500 text-right pointer-events-none z-10 pr-1">
          <span>{formatPrice(allHigh)}</span>
          <span>{formatPrice(allHigh - priceRange * 0.25)}</span>
          <span>{formatPrice(allHigh - priceRange * 0.5)}</span>
          <span>{formatPrice(allHigh - priceRange * 0.75)}</span>
          <span>{formatPrice(allLow)}</span>
        </div>

        {/* SVG Candles */}
        <svg className="w-full h-full overflow-visible pr-14">
          {data.map((c, idx) => {
            const xPct = (idx / (data.length - 1 || 1)) * 100;
            const openY = 100 - ((c.open - allLow) / priceRange) * 100;
            const closeY = 100 - ((c.close - allLow) / priceRange) * 100;
            const highY = 100 - ((c.high - allLow) / priceRange) * 100;
            const lowY = 100 - ((c.low - allLow) / priceRange) * 100;
            
            const isUp = c.close >= c.open;
            // High-contrast gold & red candle themes for supreme look
            const color = isUp ? "#10B981" : "#EF4444";
            const candleTop = Math.min(openY, closeY);
            const candleHeight = Math.max(0.8, Math.abs(openY - closeY));
            const candleWidth = Math.max(1.8, 80 / data.length);

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
                  rx="1.5"
                  className="transition-all duration-150"
                  filter={isUp && idx === data.length - 1 ? "drop-shadow(0 0 6px rgba(16,185,129,0.5))" : undefined}
                />
                {/* Volume Bar at bottom */}
                <rect
                  x={`calc(${xPct}% - ${candleWidth / 2}px)`}
                  y={`${100 - (c.volume / 1000) * 15}%`}
                  width={`${candleWidth}px`}
                  height={`${(c.volume / 1000) * 15}%`}
                  fill={color}
                  opacity="0.12"
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
              stroke={isBullish ? "#10B981" : "#EF4444"}
              strokeDasharray="4 4"
              strokeWidth="1"
              opacity="0.6"
            />
          )}
        </svg>

        {/* Hover Inspector Bar */}
        {hoverPoint && (
          <div className="absolute top-0 left-0 bg-[#0B1120]/95 px-3 py-2 rounded-xl border border-[#D4AF37]/50 text-[10px] font-mono flex items-center gap-3 z-20 pointer-events-none shadow-xl">
            <span className="text-slate-500 font-bold">TIME: {hoverPoint.time}</span>
            <span>O: <b className="text-white">{formatPrice(hoverPoint.open)}</b></span>
            <span>H: <b className="text-emerald-400">{formatPrice(hoverPoint.high)}</b></span>
            <span>L: <b className="text-red-400">{formatPrice(hoverPoint.low)}</b></span>
            <span>C: <b className="text-cyan-400">{formatPrice(hoverPoint.close)}</b></span>
            <span className="text-slate-500 font-bold">VOL: {hoverPoint.volume} LOTS</span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-900/80">
        <div className="bg-[#050816]/60 p-3 rounded-2xl border border-slate-900">
          <span className="text-[9px] font-mono text-slate-500 block">PERIOD HIGH</span>
          <span className="text-xs font-mono font-bold text-emerald-400">{formatPrice(allHigh)}</span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-2xl border border-slate-900">
          <span className="text-[9px] font-mono text-slate-500 block">PERIOD LOW</span>
          <span className="text-xs font-mono font-bold text-red-400">{formatPrice(allLow)}</span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-2xl border border-slate-900">
          <span className="text-[9px] font-mono text-slate-500 block">MARKET IMPACT PIPS</span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {symbol === "XAU/USD" 
              ? `${Math.abs(priceChange * 10).toFixed(1)} Pips` 
              : `${Math.abs(priceChange * 10000).toFixed(1)} Pips`}
          </span>
        </div>
        <div className="bg-[#050816]/60 p-3 rounded-2xl border border-slate-900">
          <span className="text-[9px] font-mono text-slate-500 block">DESK TICK LATENCY</span>
          <span className="text-xs font-mono font-bold text-[#D4AF37]">0.4ms fiber cross-connect</span>
        </div>
      </div>
    </div>
  );
}
