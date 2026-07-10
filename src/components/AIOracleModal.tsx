import React, { useState } from 'react';
import { sfx } from '../utils/audio';
import { Cpu, Sparkles, X, Send, ShieldAlert, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function AIOracleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    "Analyze Gold (XAU/USD) institutional orderblocks near $2,350.",
    "Explain London session Judas swings and typical sweep target ranges.",
    "Map optimal risk sizing metrics before high-impact FOMC rate hikes.",
    "Assess USD/JPY market structure shift (CHoCH) on the 4H timeframe."
  ];

  const handleAsk = async (textToSend?: string) => {
    const q = textToSend || prompt;
    if (!q.trim()) return;
    sfx.playScan();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai-oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: q })
      });
      const json = await res.json();
      setResponse(json.analysis || "Unable to retrieve oracle synthesis.");
      sfx.playSuccess();
    } catch (err) {
      setResponse("**Oracle Comm-Link Error:** Unable to reach Vidollar AI Advisory API. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-3xl glass-panel bg-[#0B1120] rounded-3xl border border-[#D4AF37]/40 shadow-[0_0_80px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#D4AF37]/10 via-emerald-500/10 to-transparent border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                VIDOLLAR AI MARKET ORACLE <Sparkles className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs font-mono text-emerald-400">GEMINI 2.5 FOREX QUANT INTEL SENTINEL</p>
            </div>
          </div>
          <button
            onClick={() => { sfx.playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 font-sans">
          
          {/* Quick Query Presets */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">⚡ SECURE ADVISORY CHANNELS</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setPrompt(p); handleAsk(p); }}
                  className="text-left p-3 rounded-xl bg-slate-900/80 hover:bg-[#D4AF37]/10 border border-slate-850 hover:border-[#D4AF37]/40 text-xs text-slate-300 hover:text-[#D4AF37] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="line-clamp-2">{p}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37] shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Output Panel */}
          {loading && (
            <div className="p-8 rounded-2xl bg-[#050816] border border-[#D4AF37]/30 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin" />
              <div>
                <p className="text-sm font-mono font-bold text-white animate-pulse">MAP-REDUCING LIQUIDITY POOLS & IMMITIGABLE GAPS...</p>
                <p className="text-xs font-mono text-slate-500 mt-1">Parsing Interbank Feed, Premium pricing indices, and High Impact events</p>
              </div>
            </div>
          )}

          {response && !loading && (
            <div className="p-6 rounded-2xl bg-[#050816] border border-[#D4AF37]/30 text-slate-200 text-sm leading-relaxed relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-[10px] rounded-bl-xl border-l border-b border-[#D4AF37]/30">
                ORACLE BLUEPRINT DESCRIPT
              </div>
              <div className="prose prose-invert max-w-none font-sans whitespace-pre-line">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar Footer */}
        <div className="p-4 bg-[#050816] border-t border-slate-900">
          <form
            onSubmit={(e) => { e.preventDefault(); handleAsk(); }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Query about orderblocks, liquidity clusters, or session timing rules..."
              className="flex-1 bg-slate-900 px-4 py-3 rounded-xl border border-slate-850 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-emerald-400 text-black font-display font-extrabold text-sm hover:opacity-95 transition-opacity disabled:opacity-40 flex items-center gap-2 cursor-pointer shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span>Transmit</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
