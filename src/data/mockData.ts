import { StrategyCard, PortfolioAllocation, ExecutedTrade, Testimonial, CandlestickData } from "../types";

export const INITIAL_ALLOCATION: PortfolioAllocation[] = [
  { asset: "Bitcoin Core Vault", symbol: "BTC", percentage: 42.5, valueUsd: "$19,125,000", color: "#FFC857", pnl24h: "+$924,100" },
  { asset: "Ethereum L1 Perps", symbol: "ETH", percentage: 28.0, valueUsd: "$12,600,000", color: "#00C8FF", pnl24h: "+$774,900" },
  { asset: "Solana Ecosystem Alpha", symbol: "SOL", percentage: 15.2, valueUsd: "$6,840,000", color: "#00FFAA", pnl24h: "+$848,160" },
  { asset: "High-Beta DeFi & L1s", symbol: "SUI / RENDER", percentage: 9.3, valueUsd: "$4,185,000", color: "#9D4EDD", pnl24h: "+$394,400" },
  { asset: "Delta-Neutral Arbitrage", symbol: "USDC / USDT", percentage: 5.0, valueUsd: "$2,250,000", color: "#3A86EF", pnl24h: "+$1,130 (Yield)" }
];

export const QUANTUM_STRATEGIES: StrategyCard[] = [
  {
    id: "hft-orderflow",
    title: "High-Frequency Orderflow Imbalance",
    subtitle: "Level 2 DOM & Microstructure Exploitation",
    category: "High-Frequency",
    winRate: "88.4%",
    avgReturn: "+42.1% Monthly Avg",
    sharpeRatio: "4.12",
    description: "Executes sub-10ms latency trades capturing fleeting liquidity imbalances across Binance Pro, Bybit, and Coinbase institutional orderbooks.",
    keyMetrics: ["Sub-10ms Execution", "Zero Overnight Holding", "DOM Heatmap Tracking", "MEV Protection"],
    executionTimeframe: "50ms - 4 Seconds",
    riskProfile: "Low-Medium",
    iconName: "Zap",
    accentColor: "#00FFAA"
  },
  {
    id: "macro-sweeps",
    title: "Macro Liquidity Sweeps & Stop Runs",
    subtitle: "Institutional Stop-Loss Cluster Absorption",
    category: "Macro",
    winRate: "82.1%",
    avgReturn: "+310% Annualized ROI",
    sharpeRatio: "3.45",
    description: "Identifies retail stop-loss liquidity pools near major psychological levels (e.g., $100k BTC) and enters alongside market maker block orders.",
    keyMetrics: ["Aggregated Open Interest", "Derivatives Gamma Exposure", "Whale Wallet Ping", "Asymmetric R:R"],
    executionTimeframe: "4 Hours - 3 Days",
    riskProfile: "Asymmetric High",
    iconName: "Target",
    accentColor: "#00C8FF"
  },
  {
    id: "smc-orderblocks",
    title: "Quantum Smart Money Concepts (SMC)",
    subtitle: "Fair Value Gaps (FVG) & Breaker Blocks",
    category: "Quantitative",
    winRate: "85.6%",
    avgReturn: "+18.5% Monthly Avg",
    sharpeRatio: "3.88",
    description: "Algorithmic mapping of institutional orderblocks and fair value repricing gaps on 1H and 4H timeframes for sniper entries.",
    keyMetrics: ["Premium/Discount Pricing", "Market Structure Shifts (MSS)", "Algorithmic Fibonacci", "Auto Trailing Stop"],
    executionTimeframe: "15 Min - 12 Hours",
    riskProfile: "Medium",
    iconName: "Activity",
    accentColor: "#FFC857"
  },
  {
    id: "delta-neutral-arb",
    title: "Perpetual Funding Rate & Basis Arb",
    subtitle: "Zero Directional Exposure Yield Engine",
    category: "DeFi Alpha",
    winRate: "99.8%",
    avgReturn: "+24.2% Fixed APR",
    sharpeRatio: "6.20",
    description: "Long spot vs short perpetual futures whenever funding rates spike into extreme greed. Captures pure institutional yield with zero market directional risk.",
    keyMetrics: ["Delta-Neutral Hedging", "Auto Rebalancing", "Multi-Exchange Colocation", "Capital Preservation"],
    executionTimeframe: "Continuous Compound",
    riskProfile: "Low-Medium",
    iconName: "ShieldCheck",
    accentColor: "#00FFAA"
  },
  {
    id: "gamma-breakouts",
    title: "Derivatives Gamma Squeeze & Expansion",
    subtitle: "Options Expiry Volatility Breakout",
    category: "Quantitative",
    winRate: "79.4%",
    avgReturn: "+145% per Expansion Phase",
    sharpeRatio: "3.62",
    description: "Tracks Deribit options dealer gamma hedging levels around monthly expiries to ride explosive volatility squeezes.",
    keyMetrics: ["Max Pain Calculation", "Put/Call Skew Ratios", "Implied vs Realized Vol", "Trailing Take-Profits"],
    executionTimeframe: "1 Day - 5 Days",
    riskProfile: "Asymmetric High",
    iconName: "TrendingUp",
    accentColor: "#FF5722"
  },
  {
    id: "ai-sentiment-whale",
    title: "Gemini On-Chain Whale & NLP Sentinel",
    subtitle: "Real-time Telegram/X Sentiment Ingestion",
    category: "DeFi Alpha",
    winRate: "84.2%",
    avgReturn: "+68% Altcoin Season Alpha",
    sharpeRatio: "3.70",
    description: "Ingests real-time NLP sentiment from Discord alpha leaks, Telegram OTC desks, and Arkham whale movements to front-run sector rotations.",
    keyMetrics: ["LLM Sentiment Scoring", "Memepool Sniping", "Smart Contract Auditing", "Whale Cluster Ping"],
    executionTimeframe: "1 Min - 6 Hours",
    riskProfile: "Asymmetric High",
    iconName: "Cpu",
    accentColor: "#9D4EDD"
  }
];

export const EXECUTED_BLOCK_TRADES: ExecutedTrade[] = [
  { id: "tr-901", timestamp: "14:22:04 UTC", pair: "BTC/USDT (Perp)", type: "LONG", sizeUsd: "$2,450,000", entryPrice: "$97,840.50", exitPrice: "$98,620.00", pnlUsd: "+$19,520", roi: "+19.5% (20x)", status: "CLOSED" },
  { id: "tr-902", timestamp: "13:45:12 UTC", pair: "SOL/USDT (Spot)", type: "LONG", sizeUsd: "$1,200,000", entryPrice: "$204.20", exitPrice: "$218.40", pnlUsd: "+$83,440", roi: "+6.95%", status: "CLOSED" },
  { id: "tr-903", timestamp: "12:10:55 UTC", pair: "ETH/USDC (Basis Arb)", type: "ARB", sizeUsd: "$5,000,000", entryPrice: "$3,380.00", exitPrice: "Active", pnlUsd: "+$4,210 /day", roi: "+18.4% APR", status: "FILLED" },
  { id: "tr-904", timestamp: "10:18:30 UTC", pair: "SUI/USDT (Breakout)", type: "LONG", sizeUsd: "$850,000", entryPrice: "$3.42", exitPrice: "$3.84", pnlUsd: "+$104,380", roi: "+12.28%", status: "TAKE-PROFIT HIT" },
  { id: "tr-905", timestamp: "08:05:19 UTC", pair: "BTC/USDT (Hedge)", type: "SHORT", sizeUsd: "$1,500,000", entryPrice: "$99,100.00", exitPrice: "$97,200.00", pnlUsd: "+$28,750", roi: "+19.1% (10x)", status: "CLOSED" }
];

export const INSTITUTIONAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Alexander Vance",
    role: "Chief Investment Officer",
    institution: "Vance Global Family Office ($1.2B AUM)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    content: "Allocating $10M of our proprietary treasury to Apex's quantitative derivatives vault was the single highest Sharpe-ratio decision our investment committee made this decade. Pristine execution and zero downside surprises.",
    allocatedCapital: "$10,000,000 Allocation",
    verifiedAudit: true
  },
  {
    id: "test-2",
    name: "Elena Rostova",
    role: "Managing Partner",
    institution: "Nexus Venture Capital",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    content: "His microstructure orderflow models captured alpha during the steepest market liquidations. While retail traders panicked, Apex's delta-neutral engines compounded double-digit returns in pure stablecoin yield.",
    allocatedCapital: "$5,500,000 Allocation",
    verifiedAudit: true
  },
  {
    id: "test-3",
    name: "Marcus Chen",
    role: "Head of Digital Assets",
    institution: "Orion Sovereign Wealth Advisory",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    content: "The combination of Bloomberg-terminal discipline with cutting-edge WebGL analytics sets a benchmark for what modern crypto asset management should look like. Institutional transparency at its finest.",
    allocatedCapital: "$15,000,000 Allocation",
    verifiedAudit: true
  },
  {
    id: "test-4",
    name: "Dr. Julian Thorne",
    role: "Quantitative Lead",
    institution: "Aura Alpha Capital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    content: "We backtested his Smart Money Concept algorithms across 4 years of tick data. The drawdown metrics defy standard crypto volatility curves. Truly billion-dollar fintech engineering.",
    allocatedCapital: "$8,250,000 Allocation",
    verifiedAudit: true
  }
];

// Generates institutional realistic candlestick chart history
export function generateCandlestickData(points: number = 60, basePrice: number = 98400): CandlestickData[] {
  const data: CandlestickData[] = [];
  let currentClose = basePrice;
  const now = Date.now();
  const intervalMs = 15 * 60 * 1000; // 15 min candles

  for (let i = points; i >= 0; i--) {
    const time = new Date(now - i * intervalMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const volatility = basePrice * 0.008;
    const open = currentClose;
    const change = (Math.random() - 0.48) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
    const volume = Math.floor(Math.random() * 850 + 120);

    data.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentClose = close;
  }
  return data;
}
