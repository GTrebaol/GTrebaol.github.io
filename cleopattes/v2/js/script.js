'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Helpers ──────────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Header scroll shrink ─────────────────────────────────── */
function initHeader() {
    const header = $('#header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ── Mobile nav ───────────────────────────────────────────── */
function initNav() {
    const toggle = $('#nav-toggle');
    const menu   = $('#nav-menu');
    if (!toggle || !menu) return;

    const open  = () => { menu.classList.add('open'); toggle.classList.add('open'); toggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
    const close = () => { menu.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };

    toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());

    $$('.nav__link', menu).forEach(link => link.addEventListener('click', close));

    document.addEventListener('click', e => {
        if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) close();
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Smooth scroll (offset for fixed header) ─────────────── */
function initSmoothScroll() {
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

/* ── Scroll reveal (Intersection Observer) ───────────────── */
function initScrollReveal() {
    const els = $$('[data-aos]');
    if (!els.length) return;

    if (reducedMotion) {
        els.forEach(el => el.classList.add('aos-visible'));
        return;
    }

    const io = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el    = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('aos-visible'), Number(delay));
            io.unobserve(el);
        }),
        { threshold: 0.12 }
    );

    els.forEach(el => io.observe(el));
}

/* ── Animated stat counters ──────────────────────────────── */
function initCounters() {
    const nums = $$('.stat__num[data-count]');
    if (!nums.length) return;

    if (reducedMotion) {
        nums.forEach(el => {
            el.textContent = el.dataset.count + (el.dataset.suffix || '');
        });
        return;
    }

    const io = new IntersectionObserver(
        entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = Number(el.dataset.count);
            const suffix = el.dataset.suffix || '';
            const dur    = 1400;
            const step   = 16;
            const inc    = target / (dur / step);
            let cur      = 0;

            const tick = () => {
                cur = Math.min(cur + inc, target);
                el.textContent = (Number.isInteger(target) ? Math.floor(cur) : cur.toFixed(1)) + suffix;
                if (cur < target) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
        }),
        { threshold: 0.5 }
    );

    nums.forEach(el => io.observe(el));
}

/* ── FAQ accordion ───────────────────────────────────────── */
function initFaq() {
    $$('.faq__item').forEach(item => {
        const btn = $('.faq__q', item);
        const ans = $('.faq__a', item);
        if (!btn || !ans) return;

        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            $$('.faq__q[aria-expanded="true"]').forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    $('.faq__a', other.closest('.faq__item')).hidden = true;
                }
            });

            btn.setAttribute('aria-expanded', String(!isOpen));
            ans.hidden = isOpen;
        });
    });
}

/* ── Reviews slider ──────────────────────────────────────── */
function initSlider() {
    const track    = $('#slider-track');
    const dotsWrap = $('#slider-dots');
    const btnPrev  = $('#slider-prev');
    const btnNext  = $('#slider-next');
    if (!track) return;

    const slides = $$('.review', track);
    const total  = slides.length;
    let current  = 0;
    let autoId   = null;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Avis ${i + 1}`);
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        $$('.slider__dot', dotsWrap).forEach((d, i) => {
            d.classList.toggle('active', i === current);
            d.setAttribute('aria-selected', String(i === current));
        });
    }

    function startAuto() { autoId = setInterval(() => goTo(current + 1), 5000); }
    function stopAuto()  { clearInterval(autoId); }

    btnNext?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    btnPrev?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    });

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    if (!reducedMotion) startAuto();
}

/* ── Parrainage reveal ───────────────────────────────────── */
function initParrainage() {
    const select = document.getElementById('heard-about');
    const reveal = document.getElementById('parrainage-reveal');
    if (!select || !reveal) return;

    select.addEventListener('change', () => {
        const show = select.value === 'recommandation';
        reveal.hidden = !show;
    });
}

/* ── Contact form ────────────────────────────────────────── */
function initForm() {
    const form    = $('#contact-form');
    const success = $('#form-success');
    const btn     = $('#submit-btn');
    const btnText = $('#btn-text');
    if (!form || !btn) return;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.checkValidity()) { form.reportValidity(); return; }

        btn.disabled        = true;
        btnText.textContent = 'Envoi en cours…';

        try {
            const res = await fetch(form.action, {
                method:  'POST',
                body:    new FormData(form),
                headers: { Accept: 'application/json' }
            });

            if (res.ok) {
                form.hidden    = true;
                success.hidden = false;
            } else {
                throw new Error('server error');
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        } finally {
            btn.disabled        = false;
            btnText.textContent = 'Envoyer le message';
        }
    }

    form.addEventListener('submit', handleSubmit);
}

/* ── Cookie banner ───────────────────────────────────────── */
function initCookies() {
    const banner = $('#cookie-banner');
    if (!banner) return;

    if (localStorage.getItem('cookie-consent')) return;

    banner.hidden = false;

    $('#cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        banner.hidden = true;
    });
    $('#cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'declined');
        banner.hidden = true;
    });
}

/* ── Back to top ─────────────────────────────────────────── */
function initBackTop() {
    const btn = $('#back-top');
    if (!btn) return;

    window.addEventListener('scroll', () => { btn.hidden = window.scrollY < 400; }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Footer year ─────────────────────────────────────────── */
function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initNav();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initFaq();
    initSlider();
    initParrainage();
    initForm();
    initCookies();
    initBackTop();
    initFooterYear();
});
