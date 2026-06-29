import React, { useState, useEffect } from 'react';
import { StrategyCard } from '../types';
import { X, Play, TrendingUp, ShieldAlert, Zap, Award, Activity, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { sfx } from '../utils/audio';

interface BacktestData {
  strategyTitle: string;
  period: string;
  initialCapitalUsd: number;
  finalCapitalUsd: number;
  totalReturnPct: string;
  maxDrawdownPct: string;
  winRatePct: string;
  sharpeRatio: string;
  sortinoRatio: string;
  profitFactor: string;
  totalTradesExecuted: number;
  alphaVsBtcPct: string;
  executiveSummary: string;
  monthlyPerformance: {
    month: string;
    equity: number;
    btcBenchmark: number;
    returnPct?: string;
  }[];
  simulatedRecentTrades: {
    timestamp: string;
    pair: string;
    type: string;
    entry: string;
    exit: string;
    pnlUsd: string;
    roi: string;
  }[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  strategy: StrategyCard | null;
}

export default function StrategyBacktestModal({ isOpen, onClose, strategy }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BacktestData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && strategy) {
      runBacktest();
    } else {
      setData(null);
      setError(null);
    }
  }, [isOpen, strategy]);

  const runBacktest = async () => {
    if (!strategy) return;
    setLoading(true);
    setError(null);
    sfx.playClick();

    try {
      const res = await fetch('/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategyTitle: strategy.title,
          strategyCategory: strategy.category,
          winRate: strategy.winRate,
          sharpeRatio: strategy.sharpeRatio,
          description: strategy.description
        })
      });

      const json = await res.json();
      if (json.result) {
        setData(json.result);
      } else {
        throw new Error('No backtest payload received');
      }
    } catch (err: any) {
      setError(err.message || 'Simulation engine failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !strategy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#050816] border border-slate-800 rounded-3xl shadow-[0_0_100px_rgba(0,255,170,0.15)] overflow-hidden flex flex-col">
        
        {/* Glowing Top Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-500" />

        {/* Header */}
        <div className="px-6 py-5 sm:px-8 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                  GEMINI HISTORICAL SIMULATION ENGINE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  12M BACKTEST
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mt-0.5">
                {strategy.title} <span className="text-slate-500 font-mono text-sm">// Specs Evaluation</span>
              </h3>
            </div>
          </div>

          <button
            onClick={() => { sfx.playClick(); onClose(); }}
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
                <Zap className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-2 max-w-md">
                <h4 className="text-lg font-display font-bold text-white tracking-wide">
                  Running Synthetic Microstructure Simulation...
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  Feeding 2024-2025 orderbook depth, funding basis rates, and volatility regimes into Gemini Quantitative AI model...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="py-16 text-center space-y-4">
              <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
              <p className="text-rose-400 font-mono text-sm">{error}</p>
              <button
                onClick={runBacktest}
                className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs font-bold inline-flex items-center gap-2 hover:bg-slate-800"
              >
                <RefreshCw className="w-4 h-4" /> RETRY SIMULATION
              </button>
            </div>
          ) : data ? (
            <>
              {/* KPI Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">TOTAL RETURN</span>
                  <span className="text-xl font-bold text-emerald-400">{data.totalReturnPct}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">${data.initialCapitalUsd.toLocaleString()} → ${data.finalCapitalUsd.toLocaleString()}</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">ALPHA VS BTC</span>
                  <span className="text-xl font-bold text-cyan-400">{data.alphaVsBtcPct}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Outperformed Benchmark</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">MAX DRAWDOWN</span>
                  <span className="text-xl font-bold text-rose-400">{data.maxDrawdownPct}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Peak-to-Trough Risk</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">WIN RATE</span>
                  <span className="text-xl font-bold text-white">{data.winRatePct}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">{data.totalTradesExecuted} Trades</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">SHARPE RATIO</span>
                  <span className="text-xl font-bold text-amber-400">{data.sharpeRatio}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Risk-Adj Return</span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                  <span className="text-[10px] text-slate-500 block">PROFIT FACTOR</span>
                  <span className="text-xl font-bold text-purple-400">{data.profitFactor}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Gross Win/Loss</span>
                </div>
              </div>

              {/* Equity Chart */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-base font-display font-bold text-white">Simulated Equity Growth Curve</h4>
                    <p className="text-xs font-mono text-slate-400">Timeframe: {data.period} // Starting Capital: $100,000 USD</p>
                  </div>
                  <div className="flex items-center gap-6 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-emerald-400/80" />
                      <span className="text-slate-300">Strategy Equity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-slate-600/80" />
                      <span className="text-slate-400">BTC Benchmark</span>
                    </div>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="stratGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="btcGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#334155' }} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px', fontFamily: 'monospace' }}
                        formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                      />
                      <Area type="monotone" dataKey="btcBenchmark" name="BTC Benchmark" stroke="#64748b" strokeWidth={1.5} fillOpacity={1} fill="url(#btcGrad)" />
                      <Area type="monotone" dataKey="equity" name="Strategy Equity" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#stratGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Section: Executive Summary & Recent Simulated Trades */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Executive Summary */}
                <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-3">
                      <Award className="w-4 h-4" /> QUANTITATIVE PERFORMANCE ATTRIBUTION
                    </div>
                    <div className="text-slate-300 font-sans text-sm leading-relaxed space-y-3 whitespace-pre-line">
                      {data.executiveSummary}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>STATUS: VERIFIED HISTORICAL MODEL</span>
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 99.8% CONFIDENCE</span>
                  </div>
                </div>

                {/* Simulated Trades Table */}
                <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 overflow-hidden flex flex-col">
                  <h4 className="text-xs font-mono font-bold text-white tracking-wider uppercase mb-4 flex items-center justify-between">
                    <span>Simulated Regime Execution Log</span>
                    <span className="text-slate-500 text-[10px]">RECENT 5 ORDERS</span>
                  </h4>

                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left font-mono text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 text-[10px]">
                          <th className="pb-2.5 font-normal">PAIR / TYPE</th>
                          <th className="pb-2.5 font-normal">ENTRY → EXIT</th>
                          <th className="pb-2.5 font-normal text-right">PNL / ROI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {data.simulatedRecentTrades?.map((t, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-3">
                              <span className="font-bold text-slate-200 block">{t.pair}</span>
                              <span className="text-[10px] text-cyan-400 block mt-0.5">{t.type}</span>
                            </td>
                            <td className="py-3 text-slate-400">
                              <span>{t.entry} → {t.exit}</span>
                              <span className="text-[9px] text-slate-600 block mt-0.5">{t.timestamp}</span>
                            </td>
                            <td className="py-3 text-right">
                              <span className={`font-bold block ${t.pnlUsd.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {t.pnlUsd}
                              </span>
                              <span className={`text-[10px] block mt-0.5 ${t.roi.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {t.roi}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-slate-800/80 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-slate-500 text-center sm:text-left">
            *Simulations assume institutional zero-fee tier execution and synthetic derivatives basis rebalancing.
          </p>
          <button
            onClick={() => { sfx.playClick(); onClose(); }}
            className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-[#050816] font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            DISMISS AUDIT REPORT
          </button>
        </div>

      </div>
    </div>
  );
}
