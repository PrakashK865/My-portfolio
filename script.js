const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== TYPED TEXT ===== */
const roles = ['Financial Analyst', 'FP&A Analyst', 'Business Analyst'];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function typeLoop() {
  if (!typedEl) return;
  const cur = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 55 : 95);
}
typeLoop();

/* ===== SIDEBAR DRAWER ===== */
const sidebar      = document.getElementById('sidebar');
const overlay      = document.getElementById('sidebarOverlay');
const navToggle    = document.getElementById('navToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

if (navToggle)    navToggle.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (overlay)      overlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(l => l.addEventListener('click', closeSidebar));

/* ===== HELPER: make observer ===== */
function makeObs(cb, options = {}) {
  return new IntersectionObserver(cb, { threshold: 0.12, ...options });
}

/* ===== SECTION ENTRANCE ===== */
const secObs = makeObs(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('sec-visible');
      secObs.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.sec').forEach(s => secObs.observe(s));

/* ===== SECTION HEADINGS STAGGER ===== */
const headings = document.querySelectorAll('.sec-label,.sec-label-icon,.sec-title,.sec-sub,.skills-group-title');
headings.forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .5s ease;';
});
const hObs = makeObs(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const group = entry.target.closest('.text-center, .container') || entry.target.parentElement;
    const els = group.querySelectorAll('.sec-label,.sec-label-icon,.sec-title,.sec-sub,.skills-group-title');
    els.forEach((el, i) => {
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, i * 100);
    });
    hObs.unobserve(entry.target);
  });
});
headings.forEach(el => hObs.observe(el));

/* ===== UNIVERSAL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-fade,.reveal-zoom');
const revObs = makeObs(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
});
revealEls.forEach(el => revObs.observe(el));

/* ===== SKILL BARS ===== */
const skillSec = document.getElementById('skills');
const skillObs = makeObs(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.sbar-fill').forEach((b, i) => {
        setTimeout(() => { b.style.width = b.dataset.width + '%'; }, i * 130);
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
if (skillSec) skillObs.observe(skillSec);

/* ===== ABOUT INFO CARDS ===== */
const aboutCards = document.querySelectorAll('.about-info-card');
aboutCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease;'; });
const aboutRow = document.querySelector('.about-info-row');
if (aboutRow) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        aboutCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 100));
      }
    });
  }).observe(aboutRow);
}

/* ===== EDUCATION ROWS ===== */
const eduRows = document.querySelectorAll('.edu-row');
eduRows.forEach(r => { r.style.cssText += 'opacity:0;transform:translateX(-30px);transition:opacity .6s ease,transform .6s ease;'; });
const eduList = document.querySelector('.edu-list');
if (eduList) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        eduRows.forEach((r, i) => setTimeout(() => { r.style.opacity='1'; r.style.transform='none'; }, i * 160));
      }
    });
  }).observe(eduList);
}

/* ===== CERT CARDS ===== */
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(24px) scale(.96);transition:opacity .55s ease,transform .55s ease;'; });
const certGrid = document.querySelector('.cert-grid');
if (certGrid) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        certCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 100));
      }
    });
  }).observe(certGrid);
}

/* ===== SKILL CARDS (Tools & Soft Skills) ===== */
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease;'; });
document.querySelectorAll('.skill-cards-grid').forEach(grid => {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.skill-card');
        cards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 70));
      }
    });
  }).observe(grid);
});

/* ===== EXP CARDS ===== */
const expCards = document.querySelectorAll('.exp-card');
expCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease;'; });
const expList = document.querySelector('.exp-list');
if (expList) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        expCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 150));
      }
    });
  }).observe(expList);
}

/* ===== ACTIVITY CARDS ===== */
const actCards = document.querySelectorAll('.act-card');
actCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateX(-24px);transition:opacity .6s ease,transform .6s ease;'; });
const actList = document.querySelector('.act-list');
if (actList) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        actCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 130));
      }
    });
  }).observe(actList);
}

/* ===== CONTACT CARDS ===== */
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease;'; });
const contactGrid = document.querySelector('.contact-grid');
if (contactGrid) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        contactCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 100));
      }
    });
  }).observe(contactGrid);
}

/* ===== PROJ CARDS ===== */
const projCards = document.querySelectorAll('.proj-card');
projCards.forEach(c => { c.style.cssText += 'opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease;'; });
const projList = document.querySelector('.proj-list');
if (projList) {
  makeObs(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        projCards.forEach((c, i) => setTimeout(() => { c.style.opacity='1'; c.style.transform='none'; }, i * 120));
      }
    });
  }).observe(projList);
}

/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links .nav-link, .sidebar-nav a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
});

/* ===== SCROLL TOP ===== */
const btn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400));
btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
