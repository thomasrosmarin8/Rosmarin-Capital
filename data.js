// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Portfolio Data
// Update this file to keep the site current.
// ─────────────────────────────────────────────

const PORTFOLIO_DATA = {

  // ── Performance chart data ──────────────────
  // Both series indexed to 100 at inception.
  // Overall P/L since inception: +7.25% ($14,491.95 on $200,000)
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
  // Weights based on cost / $200,000 total portfolio
  // gainLoss = P/L Open % from brokerage
  positions: [
    {
      ticker: 'GOOG',
      name: 'Alphabet Inc.',
      sector: 'Search / Cloud / AI',
      weight: 17.8,
      gainLoss: 19.01,
      thesis: "Google's search monopoly generates the cash to fund the best AI lab in the world. Cloud accelerating, Waymo optionality, and a PE of 30 for a business growing 15%+ — still undervalued.",
    },
    {
      ticker: 'META',
      name: 'Meta Platforms, Inc.',
      sector: 'Social Media / AI',
      weight: 17.8,
      gainLoss: -8.18,
      thesis: "3B+ daily users across Instagram, WhatsApp, and Facebook create an advertising moat no competitor can replicate. AI-driven Advantage+ is driving ad efficiency higher each quarter.",
    },
    {
      ticker: 'MU',
      name: 'Micron Technology, Inc.',
      sector: 'Semiconductors / Memory',
      weight: 15.0,
      gainLoss: 60.05,
      thesis: "AI servers require exponentially more HBM memory — Micron is one of only three suppliers globally. The DRAM upcycle is structural, not cyclical, driven by inference infrastructure buildout.",
    },
    {
      ticker: 'UBER',
      name: 'Uber Technologies, Inc.',
      sector: 'Platform Economy',
      weight: 10.1,
      gainLoss: 1.16,
      thesis: "The dominant global mobility platform with network effects that compound with every new driver and rider. Expanding into freight and autonomous partnerships positions Uber for the AV transition rather than against it.",
    },
    {
      ticker: 'LMB',
      name: 'Limbach Holdings, Inc.',
      sector: 'Industrial Services',
      weight: 9.9,
      gainLoss: -17.13,
      thesis: "A hidden gem in mechanical and HVAC services. Transitioning toward higher-margin owner-direct relationships. Data center construction boom creates a multi-year demand tailwind few analysts are covering.",
    },
    {
      ticker: 'RTX',
      name: 'RTX Corporation',
      sector: 'Defense & Aerospace',
      weight: 9.9,
      gainLoss: -14.78,
      thesis: "A tier-1 defense prime with Pratt & Whitney engines powering a huge installed base of commercial aircraft. NATO spending increases and geopolitical complexity drive a durable multi-year order backlog.",
    },
    {
      ticker: 'LEU',
      name: 'Centrus Energy Corp.',
      sector: 'Nuclear Energy',
      weight: 9.9,
      gainLoss: -8.36,
      thesis: "One of the only US-licensed producers of HALEU — the advanced fuel needed for next-generation nuclear reactors. As AI data centers seek reliable clean energy, nuclear is the answer and Centrus is a critical enabler.",
    },
    {
      ticker: 'BIP',
      name: 'Brookfield Infrastructure Partners',
      sector: 'Global Infrastructure',
      weight: 7.0,
      gainLoss: 2.93,
      thesis: "Inflation-protected cash flows from utilities, toll roads, ports, and data infrastructure across five continents. Brookfield's operational expertise consistently recycles capital into higher-returning assets.",
    },
    {
      ticker: 'CASH',
      name: 'Cash & Equivalents',
      sector: 'Liquidity Reserve',
      weight: 2.7,
      gainLoss: 0,
      thesis: 'Dry powder held for opportunistic deployment during market dislocations.',
    },
  ],

};
