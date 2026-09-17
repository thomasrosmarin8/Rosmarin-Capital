// ─────────────────────────────────────────────
// ROSMARIN CAPITAL — Main Script
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
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

  setTimeout(() => {
    document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
  }, 100);
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

  grid.querySelectorAll('.reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    obs.observe(el);
  });
}
