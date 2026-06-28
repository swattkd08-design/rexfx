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
