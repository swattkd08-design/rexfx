import { StrategyCard, PortfolioAllocation, ExecutedTrade, Testimonial, CandlestickData } from "../types";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stats?: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  grade: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Forex-focused Allocations
export const FOREX_ALLOCATIONS: PortfolioAllocation[] = [
  { asset: "Gold Spot vs USD", symbol: "XAU/USD", percentage: 45.0, valueUsd: "$20,376,000", color: "#D4AF37", pnl24h: "+$1,248,000" },
  { asset: "British Pound vs US Dollar", symbol: "GBP/USD", percentage: 22.5, valueUsd: "$10,188,000", color: "#10B981", pnl24h: "+$382,500" },
  { asset: "Euro vs US Dollar", symbol: "EUR/USD", percentage: 18.0, valueUsd: "$8,150,400", color: "#00C8FF", pnl24h: "+$194,200" },
  { asset: "US Dollar vs Japanese Yen", symbol: "USD/JPY", percentage: 9.5, valueUsd: "$4,301,600", color: "#9D4EDD", pnl24h: "-$84,000" },
  { asset: "Liquidity Reserve Buffer", symbol: "USD Cash", percentage: 5.0, valueUsd: "$2,264,000", color: "#3A86EF", pnl24h: "+$0 (Hedged)" }
];

// Vidollar Forex Strategies (SMC, Liquidity, Price Action)
export const FOREX_STRATEGIES: StrategyCard[] = [
  {
    id: "smc-liquidity",
    title: "Institutional Liquidity Sweeps",
    subtitle: "Stop Hunts & Premium/Discount Rebalancing",
    category: "Quantitative",
    winRate: "89.2%",
    avgReturn: "+31.4% Monthly Avg",
    sharpeRatio: "4.35",
    description: "Identifies retail stop-loss liquidity pools near major psychological levels (e.g., key swing highs/lows) and enters alongside central bank market maker blocks on XAU/USD.",
    keyMetrics: ["Daily bias alignment", "Liquidity pool sweep target", "Premium vs Discount pricing", "Symmetric 1:4 R:R minimum"],
    executionTimeframe: "15 Min - 4 Hours",
    riskProfile: "Low-Medium",
    iconName: "Target",
    accentColor: "#D4AF37"
  },
  {
    id: "price-action-snipers",
    title: "Price Action Sniper Entries",
    subtitle: "Orderblocks & Fair Value Gaps (FVG)",
    category: "Macro",
    winRate: "84.6%",
    avgReturn: "+22.8% Monthly Avg",
    sharpeRatio: "3.82",
    description: "Algorithmic mapping of institutional orderblocks, breaker blocks, and fair value gaps on high-timeframes (4H/1D) for highly precise execution on major pairs.",
    keyMetrics: ["Fair value gap closure", "Market structure shifts (MSS)", "Fibonacci discount entry", "Sub-pip slippage triggers"],
    executionTimeframe: "1 Hour - 12 Hours",
    riskProfile: "Medium",
    iconName: "Zap",
    accentColor: "#10B981"
  },
  {
    id: "ict-market-structure",
    title: "ICT Judgement & Killzones",
    subtitle: "London & New York Session Open Imbalances",
    category: "High-Frequency",
    winRate: "82.5%",
    avgReturn: "+19.2% Monthly Avg",
    sharpeRatio: "3.65",
    description: "Capitalizes on structural session openings (Killzones) to capture volatility expansions. Combines daily range projections with institutional pricing loops.",
    keyMetrics: ["Killzone hour tracking", "Judas swing detection", "Asia Range sweeps", "Strict intraday exit rule"],
    executionTimeframe: "5 Min - 1 Hour",
    riskProfile: "Asymmetric High",
    iconName: "Activity",
    accentColor: "#00C8FF"
  },
  {
    id: "risk-management-engine",
    title: "Dynamic Equity Protection",
    subtitle: "Asymmetric Risk Distribution Engine",
    category: "DeFi Alpha",
    winRate: "99.9%",
    avgReturn: "+14.5% Risk Adjusted",
    sharpeRatio: "6.80",
    description: "An ironclad algorithmic risk-budgeting system that dynamically scales exposure based on historical daily drawdown limits, preserving core capital in any environment.",
    keyMetrics: ["Max 0.5% risk per trade", "Breakeven trailing triggers", "Correlation matrix shields", "Dynamic hedging per pair"],
    executionTimeframe: "Continuous Auto-Pilot",
    riskProfile: "Low-Medium",
    iconName: "ShieldCheck",
    accentColor: "#3A86EF"
  }
];

// Executed block trades for Forex
export const FOREX_EXECUTED_TRADES: ExecutedTrade[] = [
  { id: "tr-fx-101", timestamp: "12:45:18 UTC", pair: "XAU/USD (Gold Spot)", type: "LONG", sizeUsd: "$3,500,000", entryPrice: "$2342.10", exitPrice: "$2365.80", pnlUsd: "+$354,200", roi: "+23.7% (100x)", status: "TAKE-PROFIT HIT" },
  { id: "tr-fx-102", timestamp: "11:15:02 UTC", pair: "GBP/USD (Cable)", type: "SHORT", sizeUsd: "$1,800,000", entryPrice: "1.26420", exitPrice: "1.25840", pnlUsd: "+$82,400", roi: "+4.57%", status: "CLOSED" },
  { id: "tr-fx-103", timestamp: "09:30:44 UTC", pair: "EUR/USD (Fiber)", type: "LONG", sizeUsd: "$2,200,000", entryPrice: "1.08210", exitPrice: "1.08750", pnlUsd: "+$118,800", roi: "+5.40%", status: "CLOSED" },
  { id: "tr-fx-104", timestamp: "07:12:30 UTC", pair: "USD/JPY (Ninja)", type: "SHORT", sizeUsd: "$1,500,000", entryPrice: "158.200", exitPrice: "158.450", pnlUsd: "-$23,500", roi: "-1.58%", status: "CLOSED" },
  { id: "tr-fx-105", timestamp: "04:05:12 UTC", pair: "XAU/USD (Gold Spot)", type: "LONG", sizeUsd: "$4,000,000", entryPrice: "$2321.40", exitPrice: "Active", pnlUsd: "+$189,500", roi: "+4.74% Float", status: "FILLED" }
];

// About Vidollar Statistics
export const VIDOLLAR_STATS = {
  tradesExecuted: "8,420+",
  yearsTrading: "8+ Years",
  happyClients: "1,200+",
  tradingAccuracy: "88.4%",
  totalProfit: "$18,450,200",
  maxDrawdown: "-3.8%",
  riskReward: "1:3.5 Avg",
  monthlyGrowth: "+24.6%"
};

// Skills List
export const TRADING_SKILLS = [
  { name: "Smart Money Concepts", level: "Expert", desc: "Algorithmic pricing alignments, mitigation patterns, orderblocks, and institutional volume." },
  { name: "Supply & Demand", level: "Expert", desc: "Pinpointing fresh imbalance zones where institutional orders lie unfulfilled." },
  { name: "Price Action", level: "Expert", desc: "Mastering pure candlestick dynamics, trends, and market patterns without lagging indicators." },
  { name: "Risk Management", level: "Master", desc: "Strict R:R ratio management, position sizing engines, and capital preservation matrices." },
  { name: "Scalping", level: "Expert", desc: "Intraday high-frequency executions during session openings, capturing sub-hour moves." },
  { name: "Swing Trading", level: "Expert", desc: "Capturing multi-day/weekly trend expansions and macro market swings on major currency pairs." },
  { name: "ICT Concepts", level: "Expert", desc: "Killzones, Judas Swings, Liquidity sweeps, and algorithmic delivery models." },
  { name: "Market Structure", level: "Master", desc: "Mapping of Swing Highs/Lows, Break of Structure (BOS), and Change of Character (CHoCH)." },
  { name: "Liquidity Analysis", level: "Master", desc: "Identifying sell-side and buy-side liquidity pools for high-probability sniper entries." },
  { name: "Fibonacci", level: "Expert", desc: "Utilizing Premium/Discount equilibrium metrics and Optimal Trade Entry (OTE) ranges." },
  { name: "Volume Analysis", level: "Expert", desc: "Decoding volume profile, order flow, delta, and spot-derivatives contract imbalances." },
  { name: "Trading Psychology", level: "Master", desc: "Iron-clad emotional discipline, system adherence, and cognitive bias prevention." }
];

// Services Offered
export const TRADING_SERVICES: ServiceItem[] = [
  {
    id: "mentorship",
    title: "1-on-1 Elite Mentorship",
    description: "An intensive, personalized private coaching program covering SMC, advanced price action, and institutional market geometry.",
    iconName: "UserCheck",
    features: ["Private weekly live backtesting", "Custom trading plan drafting", "Trading psychology evaluation", "Direct 24/7 Slack link to Vidollar"]
  },
  {
    id: "signals",
    title: "Institutional Signal Service",
    description: "Receive real-time, institutional-grade trade ideas with precise entry, take-profit, and stop-loss targets.",
    iconName: "Radio",
    features: ["Gold and major pairs focus", "Clear technical rationale maps", "Instant Telegram/WhatsApp alerts", "Live trade adjustment pings"]
  },
  {
    id: "portfolio-mgmt",
    title: "Sovereign Portfolio Management",
    description: "Bespoke wealth management and capital compounding for high-net-worth individuals and family offices.",
    iconName: "Briefcase",
    features: ["Absolute downside guardrails", "Bi-weekly audited balance statements", "Delta-neutral hedging integrations", "Custom profit-share structures"]
  },
  {
    id: "account-review",
    title: "Advanced Account Audit",
    description: "Deep diagnostic review of your previous trading history to eliminate structural leakage and performance drag.",
    iconName: "FileCheck",
    features: ["Slippage and execution analysis", "Risk distribution graphing", "Trade size optimization diagnostics", "Detailed action-step playbook"]
  },
  {
    id: "consultation",
    title: "Trading Consultation",
    description: "Professional hourly strategic consultations covering custom indicators, systems development, or prop firm challenges.",
    iconName: "HelpCircle",
    features: ["Prop firm passing blueprints", "Session timing optimization", "Broker spreads audit", "Algorithm optimization consultations"]
  },
  {
    id: "strategy-dev",
    title: "Strategy Formulation & Dev",
    description: "Drafting, testing, and algorithmic coding of proprietary custom trading indicators and scripts.",
    iconName: "Code",
    features: ["PineScript / MQL dev support", "Rigorous historic backtesting reports", "Execution latency tuning", "Rules-of-engagement documents"]
  },
  {
    id: "market-analysis",
    title: "Weekly Institutional Outlook",
    description: "Receive deep multi-timeframe directional macro assessments and liquidity map alerts before market open.",
    iconName: "Globe",
    features: ["CME commitment of traders maps", "High impact news filters", "Session-level key support/resistances", "Gold liquidity cluster targets"]
  }
];

// Trading Journey Timeline
export const TRADING_TIMELINE: TimelineEvent[] = [
  {
    year: "2018",
    title: "The Genesis & Foundations",
    description: "Initiated trading retail charts using classic indicators. Discovered structural flaws of retail technical analysis and transitioned to pure price action studies.",
    tag: "Phase I"
  },
  {
    year: "2020",
    title: "The SMC Shift & Edge Discovery",
    description: "Deep dived into Smart Money Concepts, Inner Circle Trader (ICT) delivery, and institutional volume profiling. Formulated the baseline 'Liquidity Sweep' algorithm.",
    tag: "Phase II"
  },
  {
    year: "2022",
    title: "Prop Firm Scaling & Funding",
    description: "Passed multiple tier-1 prop firm challenges (FTMO, MFF), securing over $1.2M in active managed funding. Achieved consistent monthly payouts and built a public reputation.",
    tag: "Phase III"
  },
  {
    year: "2024",
    title: "Vidollar Sovereign Capital & Advisory",
    description: "Incorporated private advisory firm. Launched specialized signal services and co-managed sovereign family treasury desk. Expanded active capital pool above $18M USD.",
    tag: "Phase IV"
  },
  {
    year: "2026",
    title: "The 3D Quant Workstation Integration",
    description: "Integrated real-time machine learning models (Gemini API) to automate session liquidity scanning. Managing institutional Forex portfolios with peak historical accuracy.",
    tag: "Phase V"
  }
];

// Portfolio Journals, Studies & Recaps
export const FOREX_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Institutional Gold Liquidity Sweeps Study",
    category: "Gold Analysis",
    description: "A comprehensive breakdown of how market makers sweep retail buy-stops at psychological resistance lines ($2,400+) before aggressive short-reversal block distributions.",
    image: "https://images.unsplash.com/photo-1610375228911-c4abb002a241?w=800&auto=format&fit=crop&q=80",
    stats: "Win Rate: 91.2% // Average R:R: 1:4.8",
    readTime: "8 min read"
  },
  {
    id: "p2",
    title: "Risk Management Case Studies: Capital Sizing Matrix",
    category: "Risk Management",
    description: "Examines correlation risk during high impact macroeconomic releases (e.g., FOMC, NFP) and demonstrates how dynamic sizing protects master equity curves.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    stats: "Max DD: -1.2% // Profit Factor: 4.12",
    readTime: "12 min read"
  },
  {
    id: "p3",
    title: "Weekly Market Outlook: Cross-Currency Imbalances",
    category: "Weekly Outlook",
    description: "Mapping of key institutional imbalance ranges, Fair Value Gaps, and liquidity voids for GBP/USD, EUR/USD and AUD/USD in preparation for London openings.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
    stats: "Total Pairs: 8 // Projected Weekly Pips: 450",
    readTime: "6 min read"
  },
  {
    id: "p4",
    title: "Proprietary Smart Money Trading Journal",
    category: "Trading Journal",
    description: "The complete digitized journal of 40 consecutive winning trades on Gold Spot using the 'Judas opening range sweep' setup. Explores entry and mental milestones.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80",
    stats: "Account Growth: +142.8% // Duration: 4 Months",
    readTime: "15 min read"
  },
  {
    id: "p5",
    title: "Intraday Trade Recaps: Scalping major Killzones",
    category: "Trade Recaps",
    description: "Deep anatomical review of the high-probability scalp setups executed on EUR/USD during New York PM sessions, leveraging retail session exhaustion dynamics.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    stats: "Average Duration: 42 Min // Total Return: +3.4% Equity",
    readTime: "10 min read"
  },
  {
    id: "p6",
    title: "Sovereign Trading Plans: Institutional Rules of Engagement",
    category: "Trading Plans",
    description: "Unveiling the structural, mechanical trade checklist checklist used before executing single-order sizing above 250 standard lots on major central banks pools.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    stats: "Checklist Steps: 9 // Max Leverage Cap: 50x",
    readTime: "5 min read"
  }
];

// High-end trading lifestyle and chart images for Gallery
export const TRADING_GALLERY: GalleryItem[] = [
  {
    id: "gal1",
    title: "Forex Workstation terminal",
    category: "Trading Desk",
    image: "data:image/jpeg;base64,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",
    description: "Triple monitor workstation running custom orderflow overlays, Bloomberg indices, and proprietary indicators."
  },
  {
    id: "gal2",
    title: "Gold Spot Candle Patterns",
    category: "Charts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43x8Y2Aeuesgc9fLhz6fybiCH3dUxp238kL7bG-A6Zg&s=10",
    description: "SMC structure mapping of an institutional sweep on XAU/USD leading to a rapid +350-pip downside contraction."
  },
  {
    id: "gal3",
    title: "High-Rise Office Outlook",
    category: "Trading Lifestyle",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgZ7zKqm_0fNfUg6HjTvTxWdEP768caoYHzzXjyrd7Ug&s=10",
    description: "Advisory desk headquarters looking out over the London financial district, syncing session openings."
  },
  {
    id: "gal4",
    title: "High-Probability Setup Review",
    category: "Market Analysis",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlDjribS8FQHl1pzSsBEk-ovV0u2qZNMzeFwbfR9BXg&s=10",
    description: "Plotting monthly fair value gaps and premium zones ahead of high impact interest rate decisions."
  },
  {
    id: "gal5",
    title: "Laptop Workspace Anywhere",
    category: "Laptop Workstation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOBDnPdgT-Ng9fd1XP3xME3Ychl_R-9kb5_YPLDBeEKg&s=10",
    description: "Compact trading node configured with encrypted VPN links, ensuring immediate block execution on the move."
  },
  {
    id: "gal6",
    title: "Gold Vault Safeguards",
    category: "Gold Charts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1IB6NdU2TEgMmKotYjO_lGabwLOgCf64def1pOnWX1A&s=10",
    description: "Physical sovereign gold reserves. The ultimate anchor asset of Vidollar's long-term macro hedging operations."
  }
];

// Forex Trader Testimonials
export const FOREX_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-fx-1",
    name: "Arthur Pendelton",
    role: "Senior Asset Manager",
    institution: "Starlight Asset Management ($400M AUM)",
    avatar: "https://www.instagram.com/vidollar_ads/p/DafxKpBja6d/",
    content: "Enrolling our core macro analysts in Vidollar's private Smart Money Concepts mentorship completely redefined our execution models. Our average entry precision skyrocketed from 15 pips of drawdown to less than 2.8 pips.",
    allocatedCapital: "$5,000,000 Managed Fund",
    verifiedAudit: true
  },
  {
    id: "t-fx-2",
    name: "Sarah Lin",
    role: "Prop Firm Trader",
    institution: "Independent Trader & FTMO Legend",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    content: "Vidollar's session alerts and price action frameworks are pure magic. I passed both FTMO phases on a $200k account in just 8 trading days, maintaining strict risk limits. His understanding of liquidity pools is unmatched.",
    allocatedCapital: "$200,000 Prop Funded",
    verifiedAudit: true
  },
  {
    id: "t-fx-3",
    name: "Vikram Malhotra",
    role: "Managing Director",
    institution: "Malhotra Wealth Advisers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    content: "We hired Vidollar to review our high-frequency EUR/USD execution strategy. His diagnostics identified a severe systemic drag in our session timings. After integrating his suggestions, our monthly yield grew by +4.8% net.",
    allocatedCapital: "$12,000,000 Corporate Allocation",
    verifiedAudit: true
  }
];

// Certifications & Achievements
export const VIDOLLAR_CERTIFICATIONS: CertificationItem[] = [
  { id: "cert1", title: "Chartered Financial Analyst (CFA) Level I", issuer: "CFA Institute", year: "2019", grade: "Pass (Top 10%)", iconName: "Award" },
  { id: "cert2", title: "Masterclass in Smart Money Concepts (SMC)", issuer: "ICT Academy", year: "2021", grade: "Distinction Mark", iconName: "ShieldCheck" },
  { id: "cert3", title: "Apex Institutional Gold Execution Advisor", issuer: "Forex Alliance Desk", year: "2023", grade: "Certified Specialist", iconName: "CheckCircle2" },
  { id: "cert4", title: "Best Forex Mentor of the Year", issuer: "Sovereign FinTech Expo", year: "2025", grade: "Gold Medalist", iconName: "Award" }
];

// FAQs for Forex Trader
export const VIDOLLAR_FAQS: FAQItem[] = [
  {
    id: "faq1",
    category: "Mentorship",
    question: "What makes Vidollar's SMC mentorship different from online courses?",
    answer: "Most courses sell generalized rules that lag behind the live market. My mentorship is a 1-on-1, interactive feedback loop. We build a personalized trading checklist based on your lifestyle, diagnose your mental and technical errors, and practice directly on real-time charts. You learn to see the institutional foot-prints, not retail drawings."
  },
  {
    id: "faq2",
    category: "Trading Style",
    question: "What is your typical holding time and execution style?",
    answer: "I am a multi-timeframe structural trader. For active signals and scalping, holding times average 15 minutes to 4 hours (London/NY Killzones). For sovereign fund portfolios, we execute macro swing positions on Gold Spot and GBP/USD with holding periods spanning 2 to 5 days, anchored by 4H/Daily orderblock pools."
  },
  {
    id: "faq3",
    category: "Risk Management",
    question: "How do you protect capital during intense market events?",
    answer: "Capital preservation is my ultimate directive. We never risk more than 0.5% to 1.0% of master equity on any single position. Every trade has a hard, non-negotiable stop-loss. During major economic bulletins (FOMC, NFP), we either sit on hands or dynamically reduce sizing by 75% to eliminate broker slippage risks."
  },
  {
    id: "faq4",
    category: "Account Size",
    question: "What is the minimum account size for your managed signals?",
    answer: "While signals can be executed on accounts as small as $2,000, our statistical formulas are mathematically optimized for accounts above $10,000, including prop firm funding challenges. For fully managed sovereign custody accounts, our institutional advisory gate is $1,000,000 USD."
  },
  {
    id: "faq5",
    category: "Signals",
    question: "How many signals are sent weekly and are they easy to follow?",
    answer: "We focus heavily on quality over quantity. On average, expect 3 to 6 highly analyzed sniper setups per week. Each alert includes exact entry points, multiple take-profit milestones, and direct stop-loss values, along with a full technical blueprint diagram sent via Telegram/WhatsApp."
  },
  {
    id: "faq6",
    category: "Psychology",
    question: "How do you assist with trader psychology and emotional discipline?",
    answer: "Trading is 80% psychology. We integrate specific performance check-ins, journal analysis, and automated risk breakers to prevent revenge trading or over-leverage. We treat trading as a professional, mechanical business rather than a casino game, replacing anxiety with statistical expectation."
  }
];

// Helper to generate Forex Candlestick history
export function generateForexCandlestickData(points: number = 60, basePrice: number = 2340): CandlestickData[] {
  const data: CandlestickData[] = [];
  let currentClose = basePrice;
  const now = Date.now();
  const intervalMs = 15 * 60 * 1000; // 15 min candles

  for (let i = points; i >= 0; i--) {
    const time = new Date(now - i * intervalMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const volatility = basePrice * 0.005; // 0.5% volatility for Gold Spot
    const open = currentClose;
    const change = (Math.random() - 0.49) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.3);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.3);
    const volume = Math.floor(Math.random() * 600 + 80);

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
