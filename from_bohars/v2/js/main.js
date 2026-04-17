// ===========================================
// FROM BOHARS — V2 — main.js
// ===========================================

const RECAPTCHA_KEY = '6LcqoiMrAAAAAE1dpWIEDheFNVGkugVc4cc6a0Up';
const FORM_URL = 'https://p01--formtomail--9x6pdlz5xy7c.code.run/contact';

const IMG_CONFIG = {
  plateau: { count: 13, prefix: 'plateau-', label: 'Plateaux de Fromages' },
  buffet:  { count: 3,  prefix: 'buffet-',  label: 'Buffets Fromagers' },
  epicerie:{ count: 3,  prefix: 'epicerie-',label: 'Épicerie Fine' },
  cave:    { count: 5,  prefix: 'cave-',    label: 'Cave à Vins' }
};

// ---- Navbar (always visible) ----
(function () {
  // navbar is permanently styled via CSS — no scroll toggle needed
})();

// ---- Mobile menu ----
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  function getFocusable() { return [...menu.querySelectorAll('a, button')]; }

  function open() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    getFocusable()[0]?.focus();
  }
  function close() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { close(); toggle.focus(); }
    if (e.key === 'Tab' && menu.classList.contains('open')) {
      const els = getFocusable();
      if (!els.length) return;
      if (e.shiftKey && document.activeElement === els[0]) { e.preventDefault(); els.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === els.at(-1)) { e.preventDefault(); els[0].focus(); }
    }
  });
})();

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ---- Scroll reveal ----
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
})();

// ---- Animated counters ----
(function () {
  if (!('IntersectionObserver' in window)) return;
  const ease = t => 1 - Math.pow(1 - t, 3);
  function animate(el) {
    const target = +el.dataset.target;
    const dur = 1400;
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(ease(p) * target);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n[data-target]').forEach(el => obs.observe(el));
})();

// ---- Gallery modal ----
(function () {
  const modal   = document.getElementById('gallery-modal');
  const overlay = modal?.querySelector('.gmodal-overlay');
  const closeBtn= modal?.querySelector('.gmodal-close');
  const imgWrap = document.getElementById('gmodal-imgs');
  const prevBtn = modal?.querySelector('.gmodal-prev');
  const nextBtn = modal?.querySelector('.gmodal-next');
  const titleEl = document.getElementById('gmodal-title');
  const curEl   = document.getElementById('gmodal-cur');
  const totEl   = document.getElementById('gmodal-tot');
  if (!modal) return;

  let imgs = [], cur = 0;

  function getImgs(cat) {
    const cfg = IMG_CONFIG[cat];
    if (!cfg) return [];
    return Array.from({ length: cfg.count }, (_, i) =>
      ({ src: `../images/webp/${cat}/${cfg.prefix}${i + 1}.webp`, alt: `${cfg.label} ${i + 1}` })
    );
  }

  function openModal(cat) {
    imgs = getImgs(cat);
    if (!imgs.length) return;
    cur = 0;
    titleEl.textContent = IMG_CONFIG[cat]?.label || 'Galerie';
    imgWrap.innerHTML = imgs.map((im, i) =>
      `<img src="${im.src}" alt="${im.alt}" ${i === 0 ? 'class="active"' : ''} loading="lazy">`
    ).join('');
    totEl.textContent = imgs.length;
    curEl.textContent = 1;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function go(dir) {
    imgWrap.querySelectorAll('img')[cur].classList.remove('active');
    cur = (cur + dir + imgs.length) % imgs.length;
    imgWrap.querySelectorAll('img')[cur].classList.add('active');
    curEl.textContent = cur + 1;
  }

  // Attach to service cards
  document.querySelectorAll('.scard').forEach(card => {
    const handler = () => openModal(card.dataset.cat);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  });

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape')      closeModal();
    if (e.key === 'ArrowLeft')   go(-1);
    if (e.key === 'ArrowRight')  go(1);
  });
})();

// ---- Contact form ----
(function () {
  const form     = document.getElementById('contact-form');
  if (!form) return;
  const btn      = document.getElementById('submit-btn');
  const label    = btn?.querySelector('.btn-label');
  const loading  = btn?.querySelector('.btn-loading');
  const ok       = document.getElementById('form-success');
  const err      = document.getElementById('form-error');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    label.style.display  = 'none';
    loading.style.display = 'inline-flex';
    btn.disabled = true;
    ok.style.display  = 'none';
    err.style.display = 'none';

    try {
      const token = await grecaptcha.enterprise.execute(RECAPTCHA_KEY, { action: 'contact' });
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: form.subject?.value || 'Message du formulaire de contact',
          name:    form.name.value.trim(),
          email:   form.email.value.trim(),
          phone:   form.phone.value.trim(),
          message: form.message.value.trim(),
          privacy: form.privacy.checked,
          'g-recaptcha-response': token
        })
      });
      if (!res.ok) throw new Error('server');
      ok.style.display = 'flex';
      form.reset();
    } catch (e) {
      console.error('Form error:', e);
      err.style.display = 'flex';
    } finally {
      label.style.display   = '';
      loading.style.display = 'none';
      btn.disabled = false;
    }
  });
})();

// ---- Reserve event (called from events.js buttons) ----
window.reserveEvent = function (title, dateStr) {
  const msg = document.getElementById('message');
  if (msg) msg.value = `Bonjour,\n\nJe souhaite réserver pour l'événement : "${title}" (${dateStr}).\n\nNombre de personnes : \nInformations complémentaires : `;
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => document.getElementById('name')?.focus(), 800);
};

// ---- Pré-remplissage via paramètres URL (?name=...&email=...&message=...&subject=...) ----
(function () {
  const params = new URLSearchParams(window.location.search);
  if (!params.toString()) return;

  const fields = ['name', 'email', 'phone', 'message'];
  const hasParam = fields.some(f => params.has(f)) || params.has('subject');
  if (!hasParam) return;

  function prefill() {
    fields.forEach(id => {
      const val = params.get(id);
      if (!val) return;
      const el = document.getElementById(id);
      if (el) el.value = decodeURIComponent(val);
    });

    // Sujet injecté dans le message si présent et message vide
    const subject = params.get('subject');
    const msg = document.getElementById('message');
    if (subject && msg && !msg.value) {
      msg.value = `Bonjour,\n\nJe vous contacte concernant : ${decodeURIComponent(subject)}\n\n`;
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => document.getElementById('name')?.focus(), 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefill);
  } else {
    prefill();
  }
})();
