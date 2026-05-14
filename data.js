// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Portfolio Data
// Update this file to keep the site current.
// ─────────────────────────────────────────────

const PORTFOLIO_DATA = {

  // ── Performance chart data ──────────────────
  // Add one entry per month: { date: 'YYYY-MM', portfolio: <indexed value>, sp500: <indexed value> }
  // Both series start at 100 at inception.
  performance: [
    { date: '2024-01', portfolio: 100.0,  sp500: 100.0  },
    { date: '2024-02', portfolio: 107.2,  sp500: 105.3  },
    { date: '2024-03', portfolio: 113.5,  sp500: 110.1  },
    { date: '2024-04', portfolio: 109.8,  sp500: 105.6  },
    { date: '2024-05', portfolio: 118.4,  sp500: 111.2  },
    { date: '2024-06', portfolio: 124.7,  sp500: 114.8  },
    { date: '2024-07', portfolio: 121.3,  sp500: 112.9  },
    { date: '2024-08', portfolio: 130.6,  sp500: 117.4  },
    { date: '2024-09', portfolio: 128.2,  sp500: 119.0  },
    { date: '2024-10', portfolio: 134.9,  sp500: 121.5  },
    { date: '2024-11', portfolio: 145.3,  sp500: 128.7  },
    { date: '2024-12', portfolio: 141.8,  sp500: 124.3  },
    { date: '2025-01', portfolio: 152.4,  sp500: 129.1  },
    { date: '2025-02', portfolio: 148.9,  sp500: 125.6  },
    { date: '2025-03', portfolio: 158.7,  sp500: 127.9  },
    { date: '2025-04', portfolio: 163.2,  sp500: 130.4  },
    { date: '2025-05', portfolio: 171.5,  sp500: 133.8  },
  ],

  // ── Current positions ───────────────────────
  // Fields: ticker, name, sector, weight (%), gainLoss (%), thesis (short string)
  positions: [
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      sector: 'Semiconductors',
      weight: 22.4,
      gainLoss: 84.3,
      thesis: 'The dominant platform for AI compute. Data center demand has years of runway with no credible competitor at scale.',
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Cloud / AI',
      weight: 18.7,
      gainLoss: 31.2,
      thesis: "Azure + Copilot positions Microsoft as the enterprise AI layer. Durable cash flows fund the best R&D budget in tech.",
    },
    {
      ticker: 'AMZN',
      name: 'Amazon.com, Inc.',
      sector: 'Cloud / E-Commerce',
      weight: 15.3,
      gainLoss: 42.8,
      thesis: "AWS is the world's most profitable cloud. The retail flywheel keeps spinning, and advertising is becoming a high-margin third leg.",
    },
    {
      ticker: 'META',
      name: 'Meta Platforms, Inc.',
      sector: 'Social Media / AI',
      weight: 13.1,
      gainLoss: 67.5,
      thesis: 'Near-monopoly on social attention with 3B+ daily users. AI-driven ad targeting improvements still have significant upside.',
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      sector: 'Search / Cloud / AI',
      weight: 11.8,
      gainLoss: 24.6,
      thesis: 'Search moat remains intact. Google Cloud accelerating. Waymo and DeepMind are option value the market underappreciates.',
    },
    {
      ticker: 'CRWD',
      name: 'CrowdStrike Holdings',
      sector: 'Cybersecurity',
      weight: 8.9,
      gainLoss: 38.1,
      thesis: 'Best-in-class AI-native security platform. Every enterprise expanding digital footprint needs Falcon. Rule of 40+ compounder.',
    },
    {
      ticker: 'CASH',
      name: 'Cash & Equivalents',
      sector: 'Liquidity Reserve',
      weight: 9.8,
      gainLoss: 0,
      thesis: 'Dry powder for opportunistic deployment during dislocations.',
    },
  ],

};
