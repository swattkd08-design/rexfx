import React from 'react';
import { FOREX_ALLOCATIONS, FOREX_EXECUTED_TRADES, ASAM_FX_STATS } from '../data/mockData';
import { sfx } from '../utils/audio';
import { PieChart, ShieldAlert, CheckCircle2, TrendingUp, Layers, DollarSign, BarChart3, Clock, ArrowUpRight } from 'lucide-react';

export default function PortfolioDashboard() {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 tracking-widest uppercase">
            SOVEREIGN TREASURY DESK
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-5 tracking-tight">
            Live Capital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-emerald-400">Allocation & Orders</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm font-mono max-w-md mt-4 md:mt-0 leading-relaxed">
          Audited real-time multi-signature custody balances. Strategically distributed across spot liquidity and institutional settlement vaults.
        </p>
      </div>

      {/* Top Stat Cards with animated circular progress indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Stat 1: Managed AUM */}
        <div className="glass-card rounded-3xl p-6 border border-[#D4AF37]/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-[#D4AF37]">
            <DollarSign className="w-16 h-16" />
          </div>
          <span className="text-xs font-mono text-slate-400 block uppercase">Sovereign Capital Pool</span>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-white mt-2 tracking-tight">{ASAM_FX_STATS.totalProfit}</h3>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-3.5 font-bold">
            <TrendingUp className="w-4 h-4" /> +$1.84M (+10.2%) this month
          </span>
        </div>

        {/* Stat 2: Monthly Yield */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-emerald-400">
            <BarChart3 className="w-16 h-16" />
          </div>
          <span className="text-xs font-mono text-slate-400 block uppercase">Monthly Compound Return</span>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-emerald-400 mt-2 tracking-tight">{ASAM_FX_STATS.monthlyGrowth}</h3>
          <span className="text-[11px] font-mono text-slate-400 block mt-3.5 font-semibold">Average Sharpe Ratio: 4.35</span>
        </div>

        {/* Stat 3: Accuracy */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-cyan-400">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <span className="text-xs font-mono text-slate-400 block uppercase">Execution accuracy</span>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-[#D4AF37] mt-2 tracking-tight">{ASAM_FX_STATS.tradingAccuracy}</h3>
          <span className="text-[11px] font-mono text-slate-400 block mt-3.5 font-semibold">Based on 8,420+ logged trades</span>
        </div>

        {/* Stat 4: Drawdown */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-15 text-red-500">
            <ShieldAlert className="w-16 h-16" />
          </div>
          <span className="text-xs font-mono text-slate-400 block uppercase">Max Historical Drawdown</span>
          <h3 className="text-3xl sm:text-4xl font-display font-black text-red-400 mt-2 tracking-tight">{ASAM_FX_STATS.maxDrawdown}</h3>
          <span className="text-[11px] font-mono text-slate-400 block mt-3.5 font-semibold">Strict 0.5% risk limit per block</span>
        </div>

      </div>

      {/* Main Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Portfolio Allocation Bar Chart Block */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 lg:col-span-1 flex flex-col justify-between bg-[#070B16]/50">
          <div>
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#D4AF37]" />
              <span>Asset Allocation Wheel</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">Multi-currency desk distribution</p>

            <div className="space-y-6 mt-8 font-mono">
              {FOREX_ALLOCATIONS.map((al) => (
                <div key={al.symbol} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">{al.asset}</span>
                    <span className="text-slate-300 font-bold">{al.percentage}%</span>
                  </div>
                  {/* Custom themed progress bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800/80">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${al.percentage}%`, backgroundColor: al.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{al.symbol}</span>
                    <span className="text-emerald-400 font-semibold">24h delta: {al.pnl24h}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> AUDITED POSITIONS
            </span>
            <span>SYNC: 5 SECONDS AGO</span>
          </div>
        </div>

        {/* Right: Live Institutional Block Trades Table */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 lg:col-span-2 overflow-hidden flex flex-col bg-[#070B16]/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span>Recent Sovereign Executed Orders</span>
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">Direct Prime Broker Fill Logs</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-950 text-emerald-400 border border-slate-900 animate-pulse">
              LIVE STREAM
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse font-mono text-[11px]">
              <thead>
                <tr className="border-b border-slate-900 text-slate-500 font-bold">
                  <th className="pb-3 pr-4">TIMESTAMP</th>
                  <th className="pb-3 pr-4">PAIR // CODE</th>
                  <th className="pb-3 pr-4">TYPE</th>
                  <th className="pb-3 pr-4">NOTIONAL SIZE</th>
                  <th className="pb-3 pr-4">ENTRY → EXIT</th>
                  <th className="pb-3 pr-4 text-emerald-400">REALIZED PNL</th>
                  <th className="pb-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {FOREX_EXECUTED_TRADES.map((tr) => (
                  <tr key={tr.id} onMouseEnter={() => sfx.playHover()} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 pr-4 text-slate-500">{tr.timestamp}</td>
                    <td className="py-4 pr-4 font-bold text-white">{tr.pair}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        tr.type === "LONG" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        tr.type === "SHORT" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}>
                        {tr.type}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-300 font-bold">{tr.sizeUsd}</td>
                    <td className="py-4 pr-4 text-slate-400">{tr.entryPrice} <b className="text-slate-700">→</b> {tr.exitPrice}</td>
                    <td className="py-4 pr-4 font-bold text-emerald-400">{tr.pnlUsd} ({tr.roi})</td>
                    <td className="py-4">
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {tr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
