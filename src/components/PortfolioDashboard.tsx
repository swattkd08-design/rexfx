import React from 'react';
import { INITIAL_ALLOCATION, EXECUTED_BLOCK_TRADES } from '../data/mockData';
import { sfx } from '../utils/audio';
import { PieChart, ShieldAlert, CheckCircle2, TrendingUp, Layers, DollarSign, BarChart3, Clock, ArrowUpRight } from 'lucide-react';

export default function PortfolioDashboard() {
  const totalAum = "$45,280,000";
  const monthlyRoi = "+28.4%";
  const winRate = "88.4%";

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
            INSTITUTIONAL TREASURY
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4 tracking-tight">
            Live Capital <span className="text-emerald-400">Allocation & PnL</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm font-mono max-w-md mt-4 md:mt-0">
          Audited real-time multi-sig vault balances. Hedged across CME Bitcoin Futures and Binance VIP spot colocation servers.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 text-emerald-400">
            <DollarSign className="w-16 h-16" />
          </div>
          <span className="text-xs font-mono text-slate-400">TOTAL CAPITAL MANAGED</span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mt-2 tracking-tight">{totalAum}</h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 mt-3">
            <TrendingUp className="w-4 h-4" /> +$4.2M (+10.2%) this month
          </span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-800">
          <span className="text-xs font-mono text-slate-400">MONTHLY COMPOUND ROI</span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-cyan-400 mt-2 tracking-tight">{monthlyRoi}</h3>
          <span className="text-xs font-mono text-slate-400 block mt-3">Sharpe Ratio: 4.12 (Audited)</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-800">
          <span className="text-xs font-mono text-slate-400">EXECUTION WIN RATE</span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-amber-400 mt-2 tracking-tight">{winRate}</h3>
          <span className="text-xs font-mono text-slate-400 block mt-3">1,482 Trades Executed</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-800">
          <span className="text-xs font-mono text-slate-400">MAX DRAWDOWN (ALL TIME)</span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-emerald-400 mt-2 tracking-tight">-4.2%</h3>
          <span className="text-xs font-mono text-slate-400 block mt-3">During FTX & Terra Black Swans</span>
        </div>
      </div>

      {/* Main Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Portfolio Allocation Donut/Bars */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-400" />
              <span>Asset Allocation Wheel</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">Multi-strat vault distribution</p>

            <div className="space-y-6 mt-8 font-mono">
              {INITIAL_ALLOCATION.map((al) => (
                <div key={al.symbol} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-bold">{al.asset} ({al.symbol})</span>
                    <span className="text-slate-300">{al.percentage}% // {al.valueUsd}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${al.percentage}%`, backgroundColor: al.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> COLD HEDGED
            </span>
            <span>UPDATED: 5 SECONDS AGO</span>
          </div>
        </div>

        {/* Right: Live Institutional Block Trades Table */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Recent Institutional Executed Orders</span>
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">Direct Colocation Fill Logs</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-800">
              LIVE STREAM
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="pb-3 pr-4">TIME</th>
                  <th className="pb-3 pr-4">PAIR // DESK</th>
                  <th className="pb-3 pr-4">SIDE</th>
                  <th className="pb-3 pr-4">SIZE</th>
                  <th className="pb-3 pr-4">ENTRY → EXIT</th>
                  <th className="pb-3 pr-4">REALIZED PNL</th>
                  <th className="pb-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {EXECUTED_BLOCK_TRADES.map((tr) => (
                  <tr key={tr.id} onMouseEnter={() => sfx.playHover()} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 pr-4 text-slate-400">{tr.timestamp}</td>
                    <td className="py-4 pr-4 font-bold text-white">{tr.pair}</td>
                    <td className="py-4 pr-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tr.type === "LONG" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                        tr.type === "SHORT" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                        "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      }`}>
                        {tr.type}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-300 font-bold">{tr.sizeUsd}</td>
                    <td className="py-4 pr-4 text-slate-400">{tr.entryPrice} <b className="text-slate-600">→</b> {tr.exitPrice}</td>
                    <td className="py-4 pr-4 font-bold text-emerald-400">{tr.pnlUsd} ({tr.roi})</td>
                    <td className="py-4">
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
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
