import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error("Failed to initialize Gemini Client", e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "AEX Quantum Apex Workstation Server" });
  });

  // Live Crypto Prices Simulation API (Returns institutional synthetic live ticks)
  app.get("/api/market-tickers", (req, res) => {
    const time = Date.now();
    const btcNoise = Math.sin(time / 2000) * 120 + (Math.random() - 0.5) * 45;
    const ethNoise = Math.cos(time / 1800) * 45 + (Math.random() - 0.5) * 12;
    const solNoise = Math.sin(time / 1500) * 8 + (Math.random() - 0.5) * 3;
    
    res.json({
      timestamp: time,
      tickers: [
        { symbol: "BTC/USDT", name: "Bitcoin", price: 98450.20 + btcNoise, change24h: 4.82, volume24h: "42.8B", high24h: 99120.00, low24h: 94210.50 },
        { symbol: "ETH/USDT", name: "Ethereum", price: 3420.80 + ethNoise, change24h: 6.15, volume24h: "21.4B", high24h: 3495.00, low24h: 3180.20 },
        { symbol: "SOL/USDT", name: "Solana", price: 218.45 + solNoise, change24h: 12.40, volume24h: "8.9B", high24h: 224.80, low24h: 191.10 },
        { symbol: "SUI/USDT", name: "Sui Network", price: 3.82 + (Math.random() - 0.5)*0.08, change24h: 18.90, volume24h: "2.1B", high24h: 3.98, low24h: 3.10 },
        { symbol: "RENDER/USDT", name: "Render", price: 11.45 + (Math.random() - 0.5)*0.2, change24h: 9.45, volume24h: "890M", high24h: 11.90, low24h: 10.15 },
        { symbol: "AVAX/USDT", name: "Avalanche", price: 42.10 + (Math.random() - 0.5)*0.5, change24h: -1.20, volume24h: "650M", high24h: 44.20, low24h: 41.05 }
      ],
      sentiment: { score: 82, label: "Extreme Greed", dominanceBTC: 58.4, totalMarketCap: "3.42T", gasGwei: 16 }
    });
  });

  // Gemini AI Market Oracle Endpoint
  app.post("/api/ai-oracle", async (req, res) => {
    const { prompt, preset } = req.body;
    const client = getAIClient();

    if (!client) {
      // Return institutional quantitative synthetic intelligence fallback
      await new Promise(r => setTimeout(r, 800)); // Simulate thinking
      return res.json({
        success: true,
        isSimulated: true,
        analysis: `[QUANTUM SENTINEL AI // INSTITUTIONAL ADVISORY MODE]\n\n**Executive Market Assessment:**\nBased on current orderbook depth and gamma exposure across major derivatives desks, Bitcoin ($98.4k) is consolidating in a high-liquidity accumulation pocket.\n\n**Alpha Strategy Recommendation:**\n• **Core Allocation:** Maintain 65% spot exposure anchored by BTC & ETH perps hedged with delta-neutral funding rate arb (yielding ~18.4% APR).\n• **Asymmetric Play:** Rotate 15% profits into high-beta L1 ecosystem tokens (SUI, SOL) showing relative strength on the 4H DOM.\n• **Risk Guardrails:** Hard stop-loss triggers mapped at $94,200 (liquidity sweep zone). Target breakout expansion towards $108,000.\n\n*(Note: Configure GEMINI_API_KEY in AI Studio Settings for live LLM market inference.)*`
      });
    }

    try {
      const systemInstruction = `You are "AEX QUANTUM MARKET SENTINEL", an institutional-grade AI crypto trading oracle and quantitative risk advisor created for an elite crypto portfolio managing $45M+ capital.
Your tone is sophisticated, razor-sharp, analytical (like Bloomberg Terminal meets elite fintech hedge fund quant).
Use bullet points, bold key financial metrics, and quantitative reasoning (orderflow, liquidity sweeps, open interest, Funding rates, SMC concepts).
Keep responses punchy, concise (around 150-250 words maximum), and formatted beautifully in Markdown.`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt ||preset || "Give an institutional market overview.",
        config: {
          systemInstruction,
          temperature: 0.4,
        }
      });

      res.json({
        success: true,
        isSimulated: false,
        analysis: response.text || "No analysis generated."
      });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Failed to generate market insight."
      });
    }
  });

  // Gemini AI Strategy Backtest Simulation Endpoint
  app.post("/api/backtest", async (req, res) => {
    const { strategyTitle = "Proprietary Alpha Strategy", strategyCategory = "Quantitative", winRate = "84.2%", sharpeRatio = "4.10", description = "" } = req.body;
    const client = getAIClient();

    const getFallbackData = () => {
      const baseReturn = parseFloat(winRate) > 80 ? 148.5 : 92.4;
      return {
        success: true,
        isSimulated: true,
        result: {
          strategyTitle,
          period: "Jan 2024 - Jan 2025 (12 Months)",
          initialCapitalUsd: 100000,
          finalCapitalUsd: Math.round(100000 * (1 + baseReturn / 100)),
          totalReturnPct: `+${baseReturn}%`,
          maxDrawdownPct: "-3.42%",
          winRatePct: winRate || "82.5%",
          sharpeRatio: sharpeRatio || "4.12",
          sortinoRatio: "7.45",
          profitFactor: "3.98",
          totalTradesExecuted: 1342,
          alphaVsBtcPct: `+${(baseReturn - 78.2).toFixed(1)}%`,
          executiveSummary: `### Quantitative Backtest Audit // ${strategyTitle}\n\n**Performance Attribution:**\nThe algorithmic engine navigated 2024 macro shifts with zero directional bias. During the sharp Q3 unwinding event, delta-neutral funding rate arbitrage captured peak annualized yield while spot gamma hedging suppressed drawdown to -3.42%.\n\n**Key Regime Observations:**\n* **High Volatility Expansion (Q1/Q4):** Captured 84% of upside momentum via high-frequency orderflow imbalance sweeps.\n* **Choppy Consolidation (Q2/Q3):** Compounded steady basis yield while retail long positions suffered heavy funding decay.\n* **Execution Quality:** Average slippage remained under 0.8 bps across $42M simulated volume.\n\n*(Note: Configure GEMINI_API_KEY in AI Studio Settings for live LLM dynamic backtest simulations.)*`,
          monthlyPerformance: [
            { month: "Jan 24", equity: 104500, btcBenchmark: 102100, returnPct: "+4.5%" },
            { month: "Feb 24", equity: 114200, btcBenchmark: 110500, returnPct: "+9.3%" },
            { month: "Mar 24", equity: 125800, btcBenchmark: 124000, returnPct: "+10.2%" },
            { month: "Apr 24", equity: 129400, btcBenchmark: 116000, returnPct: "+2.9%" },
            { month: "May 24", equity: 138100, btcBenchmark: 125000, returnPct: "+6.7%" },
            { month: "Jun 24", equity: 145200, btcBenchmark: 118000, returnPct: "+5.1%" },
            { month: "Jul 24", equity: 154800, btcBenchmark: 130000, returnPct: "+6.6%" },
            { month: "Aug 24", equity: 161200, btcBenchmark: 121000, returnPct: "+4.1%" },
            { month: "Sep 24", equity: 172500, btcBenchmark: 135000, returnPct: "+7.0%" },
            { month: "Oct 24", equity: 191000, btcBenchmark: 154000, returnPct: "+10.7%" },
            { month: "Nov 24", equity: 224000, btcBenchmark: 182000, returnPct: "+17.3%" },
            { month: "Dec 24", equity: Math.round(100000 * (1 + baseReturn / 100)), btcBenchmark: 178200, returnPct: "+11.0%" }
          ],
          simulatedRecentTrades: [
            { timestamp: "2025-01-14 14:22 UTC", pair: "BTC/USDT Perp", type: "LONG BASIS ARB", entry: "$96,420", exit: "$98,110", pnlUsd: "+$4,820", roi: "+14.2%" },
            { timestamp: "2025-01-13 09:15 UTC", pair: "SOL/USDT Perp", type: "SHORT LIQ SWEEP", entry: "$212.40", exit: "$204.80", pnlUsd: "+$3,150", roi: "+22.4%" },
            { timestamp: "2025-01-12 18:40 UTC", pair: "ETH/USDT Perp", type: "DELTA HEDGE", entry: "$3,380", exit: "$3,410", pnlUsd: "+$1,220", roi: "+8.5%" },
            { timestamp: "2025-01-11 04:10 UTC", pair: "SUI/USDT Perp", type: "MOMENTUM LONG", entry: "$3.45", exit: "$3.82", pnlUsd: "+$6,400", roi: "+34.0%" },
            { timestamp: "2025-01-10 11:30 UTC", pair: "BTC/USDT Perp", type: "LONG BASIS ARB", entry: "$94,100", exit: "$93,800", pnlUsd: "-$850", roi: "-2.1%" }
          ]
        }
      };
    };

    if (!client) {
      await new Promise(r => setTimeout(r, 1000));
      return res.json(getFallbackData());
    }

    try {
      const prompt = `Run a synthetic 12-month quantitative trading backtest simulation for this crypto strategy:
Title: ${strategyTitle}
Category: ${strategyCategory}
Claimed Win Rate: ${winRate}
Claimed Sharpe: ${sharpeRatio}
Description: ${description}

Generate a realistic historical performance simulation assuming an initial capital of $100,000 USD across Jan 2024 to Jan 2025.
Return ONLY valid JSON matching this exact structure:
{
  "strategyTitle": "${strategyTitle}",
  "period": "Jan 2024 - Jan 2025 (12 Months)",
  "initialCapitalUsd": 100000,
  "finalCapitalUsd": 245000,
  "totalReturnPct": "+145.0%",
  "maxDrawdownPct": "-3.8%",
  "winRatePct": "${winRate}",
  "sharpeRatio": "${sharpeRatio}",
  "sortinoRatio": "7.20",
  "profitFactor": "3.90",
  "totalTradesExecuted": 1280,
  "alphaVsBtcPct": "+66.8%",
  "executiveSummary": "### Quantitative Backtest Audit // ${strategyTitle}\\n\\n**Performance Attribution:**\\nThe engine captured alpha during volatility expansion...",
  "monthlyPerformance": [
    { "month": "Jan 24", "equity": 104500, "btcBenchmark": 102000, "returnPct": "+4.5%" }
  ],
  "simulatedRecentTrades": [
    { "timestamp": "2025-01-14 14:22 UTC", "pair": "BTC/USDT Perp", "type": "LONG BASIS ARB", "entry": "$96,420", "exit": "$98,110", "pnlUsd": "+$4,820", "roi": "+14.2%" }
  ]
}
Ensure monthlyPerformance has exactly 12 items (Jan 24 to Dec 24) with rising equity curve starting at 100000. Ensure simulatedRecentTrades has 5 items.`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5
        }
      });

      let parsed = null;
      try {
        const text = response.text || "";
        parsed = JSON.parse(text);
      } catch (e) {
        // fallback
      }

      if (!parsed || !parsed.monthlyPerformance) {
        return res.json(getFallbackData());
      }

      res.json({
        success: true,
        isSimulated: false,
        result: parsed
      });
    } catch (err) {
      console.error("Gemini Backtest Error:", err);
      res.json(getFallbackData());
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Apex Crypto Workstation Server running on http://localhost:${PORT}`);
  });
}

startServer();
