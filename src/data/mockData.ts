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

// Asam FX Forex Strategies (SMC, Liquidity, Price Action)
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

// About Asam FX Statistics
export const ASAM_FX_STATS = {
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
    features: ["Private weekly live backtesting", "Custom trading plan drafting", "Trading psychology evaluation", "Direct 24/7 Slack link to Asam FX"]
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
    title: "Asam FX Sovereign Capital & Advisory",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHKUa3gzp1WybjWSlX2xxf0icIM5igh2de_pnRX78koA&s=10",
    stats: "Win Rate: 91.2% // Average R:R: 1:4.8",
    readTime: "8 min read"
  },
  {
    id: "p2",
    title: "Risk Management Case Studies: Capital Sizing Matrix",
    category: "Risk Management",
    description: "Examines correlation risk during high impact macroeconomic releases (e.g., FOMC, NFP) and demonstrates how dynamic sizing protects master equity curves.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5V-4Pm173bZAJLcUcUuvIzz1u3B7qDoKLev0HBhz9_g&s=10",
    stats: "Max DD: -1.2% // Profit Factor: 4.12",
    readTime: "12 min read"
  },
  {
    id: "p3",
    title: "Weekly Market Outlook: Cross-Currency Imbalances",
    category: "Weekly Outlook",
    description: "Mapping of key institutional imbalance ranges, Fair Value Gaps, and liquidity voids for GBP/USD, EUR/USD and AUD/USD in preparation for London openings.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdX9NqgGQtAmrivjQfyiLt4EANGQgSBsfwDbVliyZYQ&s=10",
    stats: "Total Pairs: 8 // Projected Weekly Pips: 450",
    readTime: "6 min read"
  },
  {
    id: "p4",
    title: "Proprietary Smart Money Trading Journal",
    category: "Trading Journal",
    description: "The complete digitized journal of 40 consecutive winning trades on Gold Spot using the 'Judas opening range sweep' setup. Explores entry and mental milestones.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReBQBhCk7lKbAdJ9mwO9B-fUEEyS-dE4jLnURolgTBJw&s=10",
    stats: "Account Growth: +142.8% // Duration: 4 Months",
    readTime: "15 min read"
  },
  {
    id: "p5",
    title: "Intraday Trade Recaps: Scalping major Killzones",
    category: "Trade Recaps",
    description: "Deep anatomical review of the high-probability scalp setups executed on EUR/USD during New York PM sessions, leveraging retail session exhaustion dynamics.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGH7dUH_bcjRJEmDRcyvVK5r_L20Qe5w0cjTxS5yVGA&s=10",
    stats: "Average Duration: 42 Min // Total Return: +3.4% Equity",
    readTime: "10 min read"
  },
  {
    id: "p6",
    title: "Sovereign Trading Plans: Institutional Rules of Engagement",
    category: "Trading Plans",
    description: "Unveiling the structural, mechanical trade checklist checklist used before executing single-order sizing above 250 standard lots on major central banks pools.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiup7EFlmjr4LHfDCV6RcaaZNd2x-E4rzVZh4qzz09ZQ&s=10",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgaSJllCsbENeOIi1rlgDySAriL_Hmz12P4HP-6gVZQ&s=10",
    description: "Triple monitor workstation running custom orderflow overlays, Bloomberg indices, and proprietary indicators."
  },
  {
    id: "gal2",
    title: "Gold Spot Candle Patterns",
    category: "Charts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQT0hRyCNZblUCIadqbf1LgZsT1nEISPdcwdtP2NGTQ&s=10",
    description: "SMC structure mapping of an institutional sweep on XAU/USD leading to a rapid +350-pip downside contraction."
  },
  {
    id: "gal3",
    title: "High-Rise Office Outlook",
    category: "Trading Lifestyle",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXZ_nMo-Qvk0mgkljEcYeBPnKVYRFPjHRXop8iZLX4A&s=10",
    description: "Advisory desk headquarters looking out over the London financial district, syncing session openings."
  },
  {
    id: "gal4",
    title: "High-Probability Setup Review",
    category: "Market Analysis",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3JVpn978UedJdkwTgkcDgek8ak5SY5siCJ2jrCqB6yQ&s=10",
    description: "Plotting monthly fair value gaps and premium zones ahead of high impact interest rate decisions."
  },
  {
    id: "gal5",
    title: "Laptop Workspace Anywhere",
    category: "Laptop Workstation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3S90sp31t8je4YtbnwQppUof02kAZd_-xSt7aRMwxg&s=10",
    description: "Compact trading node configured with encrypted VPN links, ensuring immediate block execution on the move."
  },
  {
    id: "gal6",
    title: "Gold Vault Safeguards",
    category: "Gold Charts",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KcJesu1kqLy5ugUcII3rToGNs23wi6JKioCHcCFi3A&s",
    description: "Physical sovereign gold reserves. The ultimate anchor asset of Asam FX's long-term macro hedging operations."
  }
];

// Forex Trader Testimonials
export const FOREX_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-fx-1",
    name: "Arthur Pendelton",
    role: "Senior Asset Manager",
    institution: "Starlight Asset Management ($400M AUM)",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKuanmjqlWBA27JVf8Box7OUvk8Fna7NoVeIEO6i4WUA&s=10",
    content: "Enrolling our core macro analysts in Asam FX's private Smart Money Concepts mentorship completely redefined our execution models. Our average entry precision skyrocketed from 15 pips of drawdown to less than 2.8 pips.",
    allocatedCapital: "$5,000,000 Managed Fund",
    verifiedAudit: true
  },
  {
    id: "t-fx-2",
    name: "Sarah Lin",
    role: "Prop Firm Trader",
    institution: "Independent Trader & FTMO Legend",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgaSJllCsbENeOIi1rlgDySAriL_Hmz12P4HP-6gVZQ&s=10",
    content: "Asam FX's session alerts and price action frameworks are pure magic. I passed both FTMO phases on a $200k account in just 8 trading days, maintaining strict risk limits. His understanding of liquidity pools is unmatched.",
    allocatedCapital: "$200,000 Prop Funded",
    verifiedAudit: true
  },
  {
    id: "t-fx-3",
    name: "Vikram Malhotra",
    role: "Managing Director",
    institution: "Malhotra Wealth Advisers",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6QPj05vLx6KuRoq9kgBty34odlx29_QJXT5Nq8ydAZQ&s",
    content: "We hired Asam FX to review our high-frequency EUR/USD execution strategy. His diagnostics identified a severe systemic drag in our session timings. After integrating his suggestions, our monthly yield grew by +4.8% net.",
    allocatedCapital: "$12,000,000 Corporate Allocation",
    verifiedAudit: true
  }
];

// Certifications & Achievements
export const ASAM_FX_CERTIFICATIONS: CertificationItem[] = [
  { id: "cert1", title: "Chartered Financial Analyst (CFA) Level I", issuer: "CFA Institute", year: "2019", grade: "Pass (Top 10%)", iconName: "Award" },
  { id: "cert2", title: "Masterclass in Smart Money Concepts (SMC)", issuer: "ICT Academy", year: "2021", grade: "Distinction Mark", iconName: "ShieldCheck" },
  { id: "cert3", title: "Apex Institutional Gold Execution Advisor", issuer: "Forex Alliance Desk", year: "2023", grade: "Certified Specialist", iconName: "CheckCircle2" },
  { id: "cert4", title: "Best Forex Mentor of the Year", issuer: "Sovereign FinTech Expo", year: "2025", grade: "Gold Medalist", iconName: "Award" }
];

// FAQs for Forex Trader
export const ASAM_FX_FAQS: FAQItem[] = [
  {
    id: "faq1",
    category: "Mentorship",
    question: "What makes Asam FX's SMC mentorship different from online courses?",
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
