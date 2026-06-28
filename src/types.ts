export interface CryptoTicker {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
  high24h: number;
  low24h: number;
}

export interface MarketSentiment {
  score: number;
  label: "Extreme Greed" | "Greed" | "Neutral" | "Fear" | "Extreme Fear";
  dominanceBTC: number;
  totalMarketCap: string;
  gasGwei: number;
}

export interface StrategyCard {
  id: string;
  title: string;
  subtitle: string;
  category: "High-Frequency" | "Macro" | "Quantitative" | "DeFi Alpha";
  winRate: string;
  avgReturn: string;
  sharpeRatio: string;
  description: string;
  keyMetrics: string[];
  executionTimeframe: string;
  riskProfile: "Low-Medium" | "Medium" | "Asymmetric High";
  iconName: string;
  accentColor: string;
}

export interface PortfolioAllocation {
  asset: string;
  symbol: string;
  percentage: number;
  valueUsd: string;
  color: string;
  pnl24h: string;
}

export interface ExecutedTrade {
  id: string;
  timestamp: string;
  pair: string;
  type: "LONG" | "SHORT" | "ARB" | "HEDGE";
  sizeUsd: string;
  entryPrice: string;
  exitPrice: string;
  pnlUsd: string;
  roi: string;
  status: "FILLED" | "CLOSED" | "TAKE-PROFIT HIT";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  avatar: string;
  content: string;
  allocatedCapital: string;
  verifiedAudit: boolean;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
