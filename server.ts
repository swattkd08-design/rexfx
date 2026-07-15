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
    res.json({ status: "ok", service: "Asam FX Sovereign Advisory Workstation Server" });
  });

  // Live Forex Ticker Simulation API (Returns institutional synthetic live ticks)
  app.get("/api/market-tickers", (req, res) => {
    const time = Date.now();
    const goldNoise = Math.sin(time / 2000) * 4.5 + (Math.random() - 0.5) * 1.2;
    const gbpNoise = Math.cos(time / 1800) * 0.0015 + (Math.random() - 0.5) * 0.0004;
    const eurNoise = Math.sin(time / 1500) * 0.0011 + (Math.random() - 0.5) * 0.0003;
    const jpyNoise = Math.cos(time / 1600) * 0.12 + (Math.random() - 0.5) * 0.04;
    
    res.json({
      timestamp: time,
      tickers: [
        { symbol: "XAU/USD", name: "Gold Spot vs Dollar", price: 2342.10 + goldNoise, change24h: 1.14, volume24h: "85K Lots", high24h: 2365.80, low24h: 2321.40 },
        { symbol: "GBP/USD", name: "British Pound vs Dollar", price: 1.26420 + gbpNoise, change24h: 0.34, volume24h: "42K Lots", high24h: 1.26950, low24h: 1.25840 },
        { symbol: "EUR/USD", name: "Euro vs Dollar", price: 1.08210 + eurNoise, change24h: -0.18, volume24h: "68K Lots", high24h: 1.08850, low24h: 1.07920 },
        { symbol: "USD/JPY", name: "US Dollar vs Yen", price: 158.200 + jpyNoise, change24h: -0.45, volume24h: "39K Lots", high24h: 159.120, low24h: 157.950 }
      ],
      sentiment: { score: 88, label: "Extreme Bullish Gold", dominanceDXY: 104.2, totalVolumeLots: "234K Lots", spreadAvg: "0.2 Pips" }
    });
  });

  // Gemini AI Market Oracle Endpoint for Asam FX
  app.post("/api/ai-oracle", async (req, res) => {
    const { prompt, preset } = req.body;
    const client = getAIClient();

    if (!client) {
      // Return institutional quantitative synthetic intelligence fallback
      await new Promise(r => setTimeout(r, 800)); // Simulate thinking
      return res.json({
        success: true,
        isSimulated: true,
        analysis: `[ASAM FX AI ORACLE // ADVISORY CO-LINK ACTIVATED]\n\n**Executive Market Assessment:**\nOn Gold Spot (XAU/USD), a significant retail buy-side liquidity pool near $2,365 has been swept. Higher timeframe market structure remains bullish but mid-timeframe charts reveal an unmitigated 4-Hour Fair Value Gap (FVG) and orderblock resting between $2,330 - $2,335.\n\n**Strategic Recommendation:**\n• **Core Execution:** Do not chase current breakouts. Set sniper limit buy orders inside the premium discount zone ($2,332.50) aligned with London session open liquidity.\n• **Dynamic Risk Management:** Place hard stop-losses at $2,324.50 (below the breaker block level). Target a structural sweep expansion towards new swing highs near $2,385.\n• **Session bias:** Focus exclusively on the London/New York session open overlap (13:00 - 16:00 UTC) for peak lot volatility delivery.\n\n*(Note: Configure GEMINI_API_KEY in Settings to enable live, real-time Gemini LLM analysis.)*`
      });
    }

    try {
      const systemInstruction = `You are "ASAM FX AI ORACLE", an institutional-grade Forex trading advisor and precious metal specialist created for Asam FX's private sovereign workspace.
Your tone is highly professional, razor-sharp, analytical, and authoritative (Bloomberg meets elite institutional prop trading advisor).
Use bullet points, bold key metrics, and speak explicitly in Smart Money Concepts (SMC), Fair Value Gaps (FVG), orderblocks, session Killzones, lot sizing, and risk-to-reward matrices.
Keep responses concise (around 150-250 words maximum) and formatted beautifully in Markdown. Do not talk about cryptocurrency unless specifically asked. Focus heavily on Gold (XAU/USD) and major currency pairs.`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt || preset || "Provide an institutional Gold and Forex outlook.",
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

  // Gemini AI Strategy Backtest Simulation Endpoint for Asam FX
  app.post("/api/backtest", async (req, res) => {
    const { strategyTitle = "Proprietary SMC Strategy", strategyCategory = "Quantitative", winRate = "88.4%", sharpeRatio = "4.35", description = "" } = req.body;
    const client = getAIClient();

    const getFallbackData = () => {
      const baseReturn = parseFloat(winRate) > 85 ? 245.6 : 142.8;
      return {
        success: true,
        isSimulated: true,
        result: {
          strategyTitle,
          period: "Jan 2024 - Jan 2025 (12 Months)",
          initialCapitalUsd: 100000,
          finalCapitalUsd: Math.round(100000 * (1 + baseReturn / 100)),
          totalReturnPct: `+${baseReturn}%`,
          maxDrawdownPct: "-3.80%",
          winRatePct: winRate || "88.4%",
          sharpeRatio: sharpeRatio || "4.35",
          sortinoRatio: "8.12",
          profitFactor: "4.12",
          totalTradesExecuted: 840,
          alphaVsBtcPct: `+${(baseReturn - 78.2).toFixed(1)}%`,
          executiveSummary: `### Smart Money Concepts Backtest Audit // ${strategyTitle}\n\n**Performance Attribution:**\nThe strategy successfully captured peak intraday trends during high impact news releases. By aligning limit orders inside high-timeframe Fair Value Gaps (FVG) and utilizing London session opens (Killzones), the system achieved sub-pip entry slippage and locked in premium compound gains.\n\n**Key Regime Observations:**\n* **Trend Expansions (Q1/Q4):** Captured 91.5% of Gold Spot bullish waves via precise swing sweeps.\n* **Session Choppiness (Q2/Q3):** Bypassed retail traps by sitting on hands during Asian consolidation ranges, maintaining capital preservation.\n* **Execution Precision:** Average trade drawdown remained under 4.2 pips with tight, non-negotiable stop-losses.\n\n*(Note: Configure GEMINI_API_KEY in AI Studio Settings to enable dynamic backtest generation via the Gemini API.)*`,
          monthlyPerformance: [
            { month: "Jan 24", equity: 106500, btcBenchmark: 102100, returnPct: "+6.5%" },
            { month: "Feb 24", equity: 118400, btcBenchmark: 110500, returnPct: "+11.1%" },
            { month: "Mar 24", equity: 129800, btcBenchmark: 124000, returnPct: "+9.6%" },
            { month: "Apr 24", equity: 135400, btcBenchmark: 116000, returnPct: "+4.3%" },
            { month: "May 24", equity: 148100, btcBenchmark: 125000, returnPct: "+9.3%" },
            { month: "Jun 24", equity: 154200, btcBenchmark: 118000, returnPct: "+4.1%" },
            { month: "Jul 24", equity: 168800, btcBenchmark: 130000, returnPct: "+9.4%" },
            { month: "Aug 24", equity: 175200, btcBenchmark: 121000, returnPct: "+3.7%" },
            { month: "Sep 24", equity: 191500, btcBenchmark: 135000, returnPct: "+9.3%" },
            { month: "Oct 24", equity: 212000, btcBenchmark: 154000, returnPct: "+10.7%" },
            { month: "Nov 24", equity: 228000, btcBenchmark: 182000, returnPct: "+7.5%" },
            { month: "Dec 24", equity: Math.round(100000 * (1 + baseReturn / 100)), btcBenchmark: 178200, returnPct: "+14.6%" }
          ],
          simulatedRecentTrades: [
            { timestamp: "2025-01-14 14:22 UTC", pair: "XAU/USD (Gold Spot)", type: "BUY LIMIT (SMC)", entry: "$2342.10", exit: "$2365.80", pnlUsd: "+$354,200", roi: "+23.7%" },
            { timestamp: "2025-01-13 09:15 UTC", pair: "GBP/USD (Cable)", type: "SELL BLOCK (Orderblock)", entry: "1.26420", exit: "1.25840", pnlUsd: "+$82,400", roi: "+4.57%" },
            { timestamp: "2025-01-12 18:40 UTC", pair: "EUR/USD (Fiber)", type: "BUY LIMIT (SMC)", entry: "1.08210", exit: "1.08750", pnlUsd: "+$118,800", roi: "+5.40%" },
            { timestamp: "2025-01-11 04:10 UTC", pair: "USD/JPY (Ninja)", type: "SELL LIMIT (Breaker)", entry: "158.200", exit: "158.450", pnlUsd: "-$23,500", roi: "-1.58%" },
            { timestamp: "2025-01-10 11:30 UTC", pair: "XAU/USD (Gold Spot)", type: "BUY TARGET (Liquidity)", entry: "$2321.40", exit: "Active", pnlUsd: "+$189,500", roi: "+4.74% Float" }
          ]
        }
      };
    };

    if (!client) {
      await new Promise(r => setTimeout(r, 1000));
      return res.json(getFallbackData());
    }

    try {
      const prompt = `Run a synthetic 12-month Forex/SMC trading backtest simulation for this strategy:
Title: ${strategyTitle}
Category: ${strategyCategory}
Claimed Win Rate: ${winRate}
Claimed Sharpe Ratio: ${sharpeRatio}
Description: ${description}

Generate a realistic historical performance simulation assuming an initial capital of $100,000 USD across Jan 2024 to Jan 2025 on Gold and major Forex pairs.
Return ONLY valid JSON matching this exact structure:
{
  "strategyTitle": "${strategyTitle}",
  "period": "Jan 2024 - Jan 2025 (12 Months)",
  "initialCapitalUsd": 100000,
  "finalCapitalUsd": 345600,
  "totalReturnPct": "+245.6%",
  "maxDrawdownPct": "-3.80%",
  "winRatePct": "${winRate}",
  "sharpeRatio": "${sharpeRatio}",
  "sortinoRatio": "8.12",
  "profitFactor": "4.12",
  "totalTradesExecuted": 840,
  "alphaVsBtcPct": "+167.4%",
  "executiveSummary": "### SMC Backtest Audit // ${strategyTitle}\\n\\n**Performance Attribution:**\\nThe engine captured major liquidity waves on XAU/USD...",
  "monthlyPerformance": [
    { "month": "Jan 24", "equity": 106500, "btcBenchmark": 102100, "returnPct": "+6.5%" }
  ],
  "simulatedRecentTrades": [
    { "timestamp": "2025-01-14 14:22 UTC", "pair": "XAU/USD (Gold Spot)", "type": "BUY LIMIT (SMC)", "entry": "$2342.10", "exit": "$2365.80", "pnlUsd": "+$354,200", "roi": "+23.7%" }
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
    console.log(`Asam FX Server running on http://localhost:${PORT}`);
  });
}

startServer();
