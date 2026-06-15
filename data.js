// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Portfolio Data
// Update this file to keep the site current.
// ─────────────────────────────────────────────

const PORTFOLIO_DATA = {

  // ── Performance chart data ──────────────────
  performance: [
    { date: '2024-09', portfolio: 100.0,  sp500: 100.0  },
    { date: '2024-10', portfolio: 103.4,  sp500: 102.1  },
    { date: '2024-11', portfolio: 109.8,  sp500: 106.7  },
    { date: '2024-12', portfolio: 106.2,  sp500: 103.9  },
    { date: '2025-01', portfolio: 110.5,  sp500: 105.2  },
    { date: '2025-02', portfolio: 105.8,  sp500: 101.4  },
    { date: '2025-03', portfolio: 101.3,  sp500:  97.8  },
    { date: '2025-04', portfolio: 104.7,  sp500:  99.3  },
    { date: '2025-05', portfolio: 107.25, sp500: 101.6  },
  ],

  // ── Current positions ───────────────────────
  // Weights based on Net Liq / Total Portfolio Value (~$219,363)
  // gainLoss = P/L Open % from brokerage
  positions: [
    {
      ticker: 'GOOG',
      name: 'Alphabet Inc.',
      sector: 'Search / Cloud / AI',
      weight: 18.0,
      gainLoss: 11.04,
      thesis: "Google's search monopoly generates the cash to fund the best AI lab in the world. Cloud accelerating, Waymo optionality, and a PE of 28 for a business growing 15%+; still undervalued.",
    },
    {
      ticker: 'META',
      name: 'Meta Platforms, Inc.',
      sector: 'Social Media / AI',
      weight: 14.3,
      gainLoss: -11.89,
      thesis: "3B+ daily users across Instagram, WhatsApp, and Facebook create an advertising moat no competitor can replicate. AI-driven Advantage+ is driving ad efficiency higher each quarter.",
    },
    {
      ticker: 'LLY',
      name: 'Eli Lilly & Company',
      sector: 'Pharmaceuticals',
      weight: 13.9,
      gainLoss: -0.09,
      thesis: "Mounjaro and Zepbound dominate the GLP-1 market with best-in-class efficacy data. The obesity and diabetes TAM could exceed $150B globally. A deep pipeline spanning oncology and Alzheimer's adds optionality. One of the most compelling 5-year compounders in any sector.",
    },
    {
      ticker: 'AMZN',
      name: 'Amazon.com, Inc.',
      sector: 'E-Commerce / Cloud / AI',
      weight: 12.5,
      gainLoss: 0.09,
      thesis: "AWS is the world's dominant cloud infrastructure platform and the engine funding everything else Amazon does. AI is accelerating enterprise cloud migration, and Amazon's logistics network is impossible to replicate. A business with decades of compounding ahead of it.",
    },
    {
      ticker: 'UBER',
      name: 'Uber Technologies, Inc.',
      sector: 'Platform Economy',
      weight: 8.9,
      gainLoss: -2.74,
      thesis: "The dominant global mobility platform with network effects that compound with every new driver and rider. Expanding into freight and autonomous partnerships positions Uber for the AV transition rather than against it.",
    },
    {
      ticker: 'LMB',
      name: 'Limbach Holdings, Inc.',
      sector: 'Industrial Services',
      weight: 8.2,
      gainLoss: -9.59,
      thesis: "A hidden gem in mechanical and HVAC services. Transitioning toward higher-margin owner-direct relationships. Data center construction boom creates a multi-year demand tailwind few analysts are covering.",
    },
    {
      ticker: 'RTX',
      name: 'RTX Corporation',
      sector: 'Defense & Aerospace',
      weight: 8.2,
      gainLoss: -8.90,
      thesis: "A tier-1 defense prime with Pratt & Whitney engines powering a huge installed base of commercial aircraft. NATO spending increases and geopolitical complexity drive a durable multi-year order backlog.",
    },
    {
      ticker: 'LEU',
      name: 'Centrus Energy Corp.',
      sector: 'Nuclear Energy',
      weight: 8.1,
      gainLoss: -10.40,
      thesis: "One of the only US-licensed producers of HALEU; the advanced fuel needed for next-generation nuclear reactors. As AI data centers seek reliable clean energy, nuclear is the answer and Centrus is a critical enabler.",
    },
    {
      ticker: 'TTWO',
      name: 'Take-Two Interactive Software',
      sector: 'Interactive Gaming',
      weight: 7.9,
      gainLoss: -4.64,
      thesis: "GTA VI is one of the most anticipated software releases in history. Take-Two's IP portfolio (GTA, Red Dead, NBA 2K) is best-in-class. The stock has been punished for delays, but the eventual launch represents a massive catalyst.",
    },
  ],

  // ── Sector allocation (for doughnut chart) ──
  sectors: [
    { label: 'AI / Technology',     weight: 32.3, color: '#C9A84C' },
    { label: 'Pharmaceuticals',     weight: 13.9, color: '#a78bfa' },
    { label: 'E-Commerce / Cloud',  weight: 12.5, color: '#38bdf8' },
    { label: 'Platform Economy',    weight:  8.9, color: '#60a5fa' },
    { label: 'Industrial Services', weight:  8.2, color: '#34d399' },
    { label: 'Defense & Aerospace', weight:  8.2, color: '#64748b' },
    { label: 'Nuclear Energy',      weight:  8.1, color: '#fb923c' },
    { label: 'Interactive Gaming',  weight:  7.9, color: '#f472b6' },
  ],

  // ── Closed / Exited Positions ───────────────
  closedTrades: [
    {
      ticker: 'MU',
      name: 'Micron Technology, Inc.',
      sector: 'Semiconductors / Memory',
      gainLoss: 95,
      note: 'AI memory demand was undervalued by the market and we caught the wave. Micron valuation got too high and became unattractive.',
    },
  ],

  // ── Watchlist ───────────────────────────────
  watchlist: [
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Cloud / AI',
      status: 'Awaiting Entry',
      statusClass: 'status-waiting',
      why: "Azure and Copilot are the clearest enterprise AI monetization story in tech. GitHub's AI tools and M365 Copilot integration give Microsoft a seat in every knowledge worker's workflow. Watching for a better entry; the business is exceptional, the multiple demands patience.",
    },
    {
      ticker: 'SOFI',
      name: 'SoFi Technologies, Inc.',
      sector: 'Fintech / Banking',
      status: 'Watching',
      statusClass: 'status-watching',
      why: "A fully integrated digital bank that recently turned profitable. The banking charter significantly lowers cost of capital vs. fintech peers. Market is pricing in near-zero long-term growth; looks like a misunderstood turnaround story with multiple years of re-rating potential.",
    },
    {
      ticker: 'NBIS',
      name: 'Nebius Group N.V.',
      sector: 'AI Infrastructure',
      status: 'High Conviction',
      statusClass: 'status-conviction',
      why: "Formerly Yandex's international arm, now a focused AI cloud infrastructure company building GPU compute clusters across Europe. One of the few credible alternatives to US hyperscalers for European AI workloads. Early-stage and high-risk; but the opportunity is enormous.",
    },
    {
      ticker: 'LULU',
      name: 'Lululemon Athletica Inc.',
      sector: 'Consumer / Retail',
      status: 'Watching',
      statusClass: 'status-watching',
      why: "Premium athletic brand with cult-like customer loyalty and exceptional repeat purchase rates. Slowing US growth has hammered the stock, but international expansion (particularly China) remains a significant untapped runway. A best-in-class brand at a much more interesting price.",
    },
  ],

  // ── Recommended Reads ──────────────────────────
  reads: [
    {
      title: 'Gene Editing: What It Is & Why It Matters',
      category: 'Biotech / Science',
      description: "How an investor should actually think about CRISPR and who's positioned to win.",
      url: 'https://rosmarincapital.substack.com/p/gene-editing-what-it-is-why-it-matters',
      icon: '&#129516;',
    },
    {
      title: 'Quantum Computing: What It Is & Why It Matters',
      category: 'Technology / Science',
      description: 'Quantum is the future. Are you going to get in on it?',
      url: 'https://rosmarincapital.substack.com/p/quantum-computing-what-it-is-why',
      icon: '&#9883;',
    },
    {
      title: 'Position Deep Dive: Micron Technology',
      category: 'Investment Research',
      description: 'The full thesis behind a position that returned over 100%.',
      url: 'https://rosmarincapital.substack.com/p/position-deep-dive-micron-technology',
      icon: '&#128202;',
    },
  ],

};
