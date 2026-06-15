// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Main Script
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initAnalytics();
  initReads();
});

// ── Navbar scroll & mobile toggle ─────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ── Scroll reveal (IntersectionObserver) ──────
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Hero elements visible immediately after load
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
  }, 100);
}

// ── Hero & perf stats ─────────────────────────
function initStats() {
  const perf      = PORTFOLIO_DATA.performance;
  const positions = PORTFOLIO_DATA.positions.filter(p => p.ticker !== 'CASH');
  const sign      = v => Number(v) >= 0 ? '+' : '';

  const start  = perf[0].portfolio;
  const latest = perf[perf.length - 1].portfolio;
  const sinceInception = ((latest - start) / start * 100).toFixed(1);

  const currentYear = new Date().getFullYear();
  const ytdStart    = perf.find(p => p.date.startsWith(String(currentYear))) || perf[0];
  const ytdVal      = ((latest - ytdStart.portfolio) / ytdStart.portfolio * 100).toFixed(1);

  const sp500Start  = perf[0].sp500;
  const sp500Latest = perf[perf.length - 1].sp500;
  const sp500Return = ((sp500Latest - sp500Start) / sp500Start * 100).toFixed(1);
  const alpha       = (parseFloat(sinceInception) - parseFloat(sp500Return)).toFixed(1);

  let bestMonth = -Infinity;
  for (let i = 1; i < perf.length; i++) {
    const r = (perf[i].portfolio - perf[i - 1].portfolio) / perf[i - 1].portfolio * 100;
    if (r > bestMonth) bestMonth = r;
  }

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val;
    el.classList.add(String(val).startsWith('-') ? 'negative' : 'positive');
  };

  set('ytd-perf',       sign(ytdVal) + ytdVal + '%');
  set('inception-perf', sign(sinceInception) + sinceInception + '%');
  set('alpha-perf',     sign(alpha) + alpha + '%');
  set('best-month',     '+' + bestMonth.toFixed(1) + '%');
}

// ── Performance Chart ─────────────────────────
function initPerformanceChart() {
  const perf   = PORTFOLIO_DATA.performance;
  const labels = perf.map(p => {
    const [year, month] = p.date.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  });

  new Chart(document.getElementById('performanceChart').getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Rosmarin Capital',
          data: perf.map(p => p.portfolio),
          borderColor: '#c9a84c',
          backgroundColor: 'rgba(201, 168, 76, 0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#c9a84c',
        },
        {
          label: 'S&P 500',
          data: perf.map(p => p.sp500),
          borderColor: 'rgba(143, 160, 188, 0.6)',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [5, 4],
          fill: false,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: '#8fa0bc',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true, position: 'top', align: 'end',
          labels: { color: '#8fa0bc', font: { family: 'Inter', size: 12 }, boxWidth: 24, padding: 20 },
        },
        tooltip: {
          backgroundColor: '#0d1c35',
          titleColor: '#c9a84c',
          bodyColor: '#eef2f8',
          borderColor: '#c9a84c',
          borderWidth: 1,
          padding: 12,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)} (indexed)` },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#516180', font: { family: 'Inter', size: 11 }, maxRotation: 0 },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#516180', font: { family: 'Inter', size: 11 }, callback: v => v.toFixed(0) },
        },
      },
    },
  });
}

// ── Analytics ─────────────────────────────────
function initAnalytics() {
  const positions      = PORTFOLIO_DATA.positions;
  const closed         = PORTFOLIO_DATA.closedTrades || [];
  const totalValue     = 220203.39;
  const portfolioStart = new Date(2024, 8); // Sep 2024
  const monthsActive   = 2;
  const bestClosed     = closed.length > 0 ? closed.reduce((a, b) => b.gainLoss > a.gainLoss ? b : a) : null;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const largest = positions.reduce((a, b) => b.weight > a.weight ? b : a);
  set('an-total-value',      '$' + Math.round(totalValue).toLocaleString());
  set('an-best-closed',      bestClosed ? bestClosed.ticker + ' +' + bestClosed.gainLoss + '%' : '--');
  set('an-largest-holding',  largest.ticker + ' · ' + largest.weight + '%');
  set('an-sectors',          PORTFOLIO_DATA.sectors.length + ' Sectors');
  set('an-portfolio-age',    monthsActive + ' Months');

  initClosedTrades(closed);
  initSectorChart();
  initAttributionChart([...positions].sort((a, b) => b.gainLoss - a.gainLoss));
}

function initClosedTrades(closed) {
  const container = document.getElementById('closed-trades-list');
  if (!container || !closed.length) return;
  container.innerHTML = '';
  closed.forEach(trade => {
    const glPrefix = trade.gainLoss >= 0 ? '+' : '';
    container.innerHTML += `
      <div class="closed-trade-inner">
        <div class="ct-left">
          <span class="ct-ticker">${trade.ticker}</span>
          <span class="ct-name">${trade.name}</span>
          <span class="ct-sector">${trade.sector}</span>
        </div>
        <div class="ct-center">
          <p class="ct-note">${trade.note}</p>
        </div>
        <div class="ct-right">
          <span class="ct-return gain">${glPrefix}${trade.gainLoss}%</span>
          <span class="ct-status">Realized Gain</span>
        </div>
      </div>
    `;
  });
}

function initSectorChart() {
  const sectors = PORTFOLIO_DATA.sectors;
  new Chart(document.getElementById('sectorChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: sectors.map(s => s.label),
      datasets: [{
        data: sectors.map(s => s.weight),
        backgroundColor: sectors.map(s => s.color),
        borderColor: '#07101f',
        borderWidth: 3,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0d1c35',
          titleColor: '#c9a84c',
          bodyColor: '#eef2f8',
          borderColor: '#c9a84c',
          borderWidth: 1,
          padding: 10,
          callbacks: { label: ctx => `  ${ctx.label}: ${ctx.parsed}%` },
        },
      },
    },
  });

  const legend = document.getElementById('sector-legend');
  PORTFOLIO_DATA.sectors.forEach(s => {
    const row = document.createElement('div');
    row.className = 'legend-row';
    row.innerHTML = `<span class="legend-dot" style="background:${s.color}"></span><span class="legend-label">${s.label}</span><span class="legend-val">${s.weight}%</span>`;
    legend.appendChild(row);
  });
}

function initAttributionChart(sortedPositions) {
  const labels = sortedPositions.map(p => p.ticker);
  const values = sortedPositions.map(p => p.gainLoss);
  const colors = values.map(v => v >= 0 ? 'rgba(74, 222, 128, 0.7)' : 'rgba(248, 113, 113, 0.7)');

  new Chart(document.getElementById('attributionChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: colors, borderColor: colors, borderWidth: 1.5, borderRadius: 4 }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0d1c35',
          titleColor: '#c9a84c',
          bodyColor: '#eef2f8',
          borderColor: '#c9a84c',
          borderWidth: 1,
          padding: 10,
          callbacks: { label: ctx => `  P/L Open: ${ctx.parsed.x > 0 ? '+' : ''}${ctx.parsed.x}%` },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#516180', font: { family: 'Inter', size: 11 }, callback: v => (v > 0 ? '+' : '') + v + '%' },
        },
        y: { grid: { display: false }, ticks: { color: '#c9a84c', font: { family: 'Inter', size: 12, weight: '600' } } },
      },
    },
  });
}

// ── Recommended Reads ─────────────────────────
function initReads() {
  const grid = document.getElementById('reads-grid');
  if (!grid || !PORTFOLIO_DATA.reads) return;

  PORTFOLIO_DATA.reads.forEach((r, i) => {
    const card = document.createElement('a');
    card.className = 'read-card reveal';
    card.href      = r.url;
    card.target    = '_blank';
    card.rel       = 'noopener';
    if (i > 0) card.style.transitionDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="read-icon">${r.icon}</div>
      <div class="read-category">${r.category}</div>
      <div class="read-title">${r.title}</div>
      <p class="read-desc">${r.description}</p>
      <div class="read-link">Read on Substack &rarr;</div>
    `;
    grid.appendChild(card);
  });

  // Register newly created cards with the observer
  grid.querySelectorAll('.reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    obs.observe(el);
  });
}

// ── Positions grid ────────────────────────────
function initPositions() {
  const grid = document.getElementById('positions-grid');
  PORTFOLIO_DATA.positions.forEach(pos => {
    const card    = document.createElement('div');
    card.className = 'position-card';
    const glClass  = pos.gainLoss > 0 ? 'gain' : pos.gainLoss < 0 ? 'loss' : 'neutral';
    const glPrefix = pos.gainLoss > 0 ? '+' : '';
    card.innerHTML = `
      <div class="pos-header">
        <div class="pos-ticker">${pos.ticker}</div>
        <div class="pos-gl ${glClass}">${glPrefix}${pos.gainLoss}%</div>
      </div>
      <div class="pos-name">${pos.name}</div>
      <div class="pos-sector">${pos.sector}</div>
      <div class="pos-weight-bar">
        <div class="pos-weight-fill" style="width:${Math.min(pos.weight, 100)}%"></div>
      </div>
      <div class="pos-weight-label">${pos.weight}% of portfolio</div>
      <p class="pos-thesis">${pos.thesis}</p>
    `;
    grid.appendChild(card);
  });
}
