// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Main Script
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initStats();
  initPerformanceChart();
  initPositions();
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
