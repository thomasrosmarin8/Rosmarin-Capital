// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Main Script
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initStats();
  initPerformanceChart();
  initAnalytics();
  initPositions();
  initWatchlist();
});

// ── Navbar scroll & mobile toggle ─────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── Hero stats ────────────────────────────────
function initStats() {
  const perf = PORTFOLIO_DATA.performance;
  const positions = PORTFOLIO_DATA.positions.filter(p => p.ticker !== 'CASH');

  const start = perf[0].portfolio;
  const latest = perf[perf.length - 1].portfolio;
  const sinceInception = ((latest - start) / start * 100).toFixed(1);

  // YTD: find Jan of current year or earliest available
  const currentYear = new Date().getFullYear();
  const ytdStart = perf.find(p => p.date.startsWith(String(currentYear))) || perf[0];
  const ytdVal = ((latest - ytdStart.portfolio) / ytdStart.portfolio * 100).toFixed(1);

  const sign = v => v >= 0 ? '+' : '';

  document.getElementById('ytd-stat').textContent = sign(ytdVal) + ytdVal + '%';
  document.getElementById('inception-stat').textContent = sign(sinceInception) + sinceInception + '%';
  document.getElementById('positions-stat').textContent = positions.length;

  // Perf metrics section
  const sp500Start = perf[0].sp500;
  const sp500Latest = perf[perf.length - 1].sp500;
  const sp500Return = ((sp500Latest - sp500Start) / sp500Start * 100).toFixed(1);
  const alpha = (parseFloat(sinceInception) - parseFloat(sp500Return)).toFixed(1);

  // Best month
  let bestMonth = -Infinity;
  for (let i = 1; i < perf.length; i++) {
    const monthReturn = (perf[i].portfolio - perf[i - 1].portfolio) / perf[i - 1].portfolio * 100;
    if (monthReturn > bestMonth) bestMonth = monthReturn;
  }

  document.getElementById('ytd-perf').textContent = sign(ytdVal) + ytdVal + '%';
  document.getElementById('inception-perf').textContent = sign(sinceInception) + sinceInception + '%';
  document.getElementById('alpha-perf').textContent = sign(alpha) + alpha + '%';
  document.getElementById('best-month').textContent = '+' + bestMonth.toFixed(1) + '%';

  [document.getElementById('ytd-stat'),
   document.getElementById('inception-stat'),
   document.getElementById('ytd-perf'),
   document.getElementById('inception-perf'),
   document.getElementById('alpha-perf'),
   document.getElementById('best-month')].forEach(el => {
    if (el) el.classList.add(el.textContent.startsWith('-') ? 'negative' : 'positive');
  });
}

// ── Performance Chart ─────────────────────────
function initPerformanceChart() {
  const perf = PORTFOLIO_DATA.performance;
  const labels = perf.map(p => {
    const [year, month] = p.date.split('-');
    return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  });

  const ctx = document.getElementById('performanceChart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Rosmarin Capital',
          data: perf.map(p => p.portfolio),
          borderColor: '#C9A84C',
          backgroundColor: 'rgba(201, 168, 76, 0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#C9A84C',
        },
        {
          label: 'S&P 500',
          data: perf.map(p => p.sp500),
          borderColor: 'rgba(160, 174, 192, 0.7)',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [5, 4],
          fill: false,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointBackgroundColor: '#a0aec0',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: '#cbd5e0', font: { family: 'Inter', size: 13 }, boxWidth: 24, padding: 20 },
        },
        tooltip: {
          backgroundColor: '#1a2744',
          titleColor: '#C9A84C',
          bodyColor: '#e2e8f0',
          borderColor: '#C9A84C',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)} (indexed)`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#718096', font: { family: 'Inter', size: 11 }, maxRotation: 0 },
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#718096',
            font: { family: 'Inter', size: 11 },
            callback: v => v.toFixed(0),
          },
        },
      },
    },
  });
}

// ── Analytics ─────────────────────────────────
function initAnalytics() {
  const perf = PORTFOLIO_DATA.performance;
  const positions = PORTFOLIO_DATA.positions.filter(p => p.ticker !== 'CASH');
  const sign = v => v >= 0 ? '+' : '';

  // Compute overall figures
  const inceptionReturn = 7.25;
  const totalCost = 200000;
  const totalValue = totalCost * (1 + inceptionReturn / 100);
  const totalGain = totalValue - totalCost;

  const winners = positions.filter(p => p.gainLoss > 0);
  const winRate = Math.round(winners.length / positions.length * 100);

  const sp500Start = perf[0].sp500;
  const sp500Latest = perf[perf.length - 1].sp500;
  const sp500Return = (sp500Latest - sp500Start) / sp500Start * 100;
  const alpha = (inceptionReturn - sp500Return).toFixed(1);

  const sorted = [...positions].sort((a, b) => b.gainLoss - a.gainLoss);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  document.getElementById('an-total-value').textContent = '$' + Math.round(totalValue).toLocaleString();
  document.getElementById('an-total-gain').textContent = '+$' + Math.round(totalGain).toLocaleString();
  document.getElementById('an-win-rate').textContent = winRate + '%  (' + winners.length + '/' + positions.length + ')';
  document.getElementById('an-alpha').textContent = sign(alpha) + alpha + '%';
  document.getElementById('an-best').textContent = best.ticker + '  ' + sign(best.gainLoss) + best.gainLoss + '%';
  document.getElementById('an-worst').textContent = worst.ticker + '  ' + sign(worst.gainLoss) + worst.gainLoss + '%';

  initSectorChart();
  initAttributionChart(sorted);
}

function initSectorChart() {
  const sectors = PORTFOLIO_DATA.sectors;
  const ctx = document.getElementById('sectorChart').getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sectors.map(s => s.label),
      datasets: [{
        data: sectors.map(s => s.weight),
        backgroundColor: sectors.map(s => s.color),
        borderColor: '#0a1628',
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
          backgroundColor: '#1a2744',
          titleColor: '#C9A84C',
          bodyColor: '#e2e8f0',
          borderColor: '#C9A84C',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => `  ${ctx.label}: ${ctx.parsed}%`,
          },
        },
      },
    },
  });

  // Custom legend
  const legend = document.getElementById('sector-legend');
  PORTFOLIO_DATA.sectors.forEach(s => {
    const row = document.createElement('div');
    row.className = 'legend-row';
    row.innerHTML = `
      <span class="legend-dot" style="background:${s.color}"></span>
      <span class="legend-label">${s.label}</span>
      <span class="legend-val">${s.weight}%</span>
    `;
    legend.appendChild(row);
  });
}

function initAttributionChart(sortedPositions) {
  const labels = sortedPositions.map(p => p.ticker);
  const values = sortedPositions.map(p => p.gainLoss);
  const colors = values.map(v => v >= 0 ? 'rgba(74, 222, 128, 0.75)' : 'rgba(248, 113, 113, 0.75)');
  const borderColors = values.map(v => v >= 0 ? '#4ade80' : '#f87171');

  const ctx = document.getElementById('attributionChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 4,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a2744',
          titleColor: '#C9A84C',
          bodyColor: '#e2e8f0',
          borderColor: '#C9A84C',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => `  P/L Open: ${ctx.parsed.x > 0 ? '+' : ''}${ctx.parsed.x}%`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#718096',
            font: { family: 'Inter', size: 11 },
            callback: v => (v > 0 ? '+' : '') + v + '%',
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: '#C9A84C', font: { family: 'Inter', size: 12, weight: '600' } },
        },
      },
    },
  });
}

// ── Watchlist ─────────────────────────────────
function initWatchlist() {
  const grid = document.getElementById('watchlist-grid');
  PORTFOLIO_DATA.watchlist.forEach(stock => {
    const card = document.createElement('div');
    card.className = 'watchlist-card';
    card.innerHTML = `
      <div class="wl-header">
        <div class="wl-ticker">${stock.ticker}</div>
        <div class="wl-status ${stock.statusClass}">${stock.status}</div>
      </div>
      <div class="wl-name">${stock.name}</div>
      <div class="wl-sector">${stock.sector}</div>
      <p class="wl-why">${stock.why}</p>
    `;
    grid.appendChild(card);
  });
}

// ── Positions grid ────────────────────────────
function initPositions() {
  const grid = document.getElementById('positions-grid');
  PORTFOLIO_DATA.positions.forEach(pos => {
    const card = document.createElement('div');
    card.className = 'position-card';

    const glClass = pos.gainLoss > 0 ? 'gain' : pos.gainLoss < 0 ? 'loss' : 'neutral';
    const glPrefix = pos.gainLoss > 0 ? '+' : '';

    card.innerHTML = `
      <div class="pos-header">
        <div class="pos-ticker">${pos.ticker}</div>
        <div class="pos-gl ${glClass}">${glPrefix}${pos.gainLoss}%</div>
      </div>
      <div class="pos-name">${pos.name}</div>
      <div class="pos-sector">${pos.sector}</div>
      <div class="pos-weight-bar">
        <div class="pos-weight-fill" style="width: ${Math.min(pos.weight, 100)}%"></div>
      </div>
      <div class="pos-weight-label">${pos.weight}% of portfolio</div>
      <p class="pos-thesis">${pos.thesis}</p>
    `;
    grid.appendChild(card);
  });
}
