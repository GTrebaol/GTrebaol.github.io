'use strict';

/* ============================================================
   CLÉOPATTES v2 — Seasonal Themes
   ============================================================ */

const THEMES = [
    {
        id:    'nouvel-an',
        label: '🎆 Nouvel An',
        check: (m, d) => (m === 12 && d === 31) || (m === 1 && d === 1),
        particles: ['✨', '🎉', '⭐', '✦', '·', '★'],
        count: 70,
        buildParticle(el) {
            const left   = Math.random() * 100;
            const delay  = Math.random() * 4;
            const dur    = 2.5 + Math.random() * 2;
            const drift  = (Math.random() - .5) * 300;
            const rot    = 360 + Math.random() * 720;
            const size   = .7 + Math.random() * 1.2;
            const startY = -(Math.random() * 30);
            el.style.cssText = `left:${left}%;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;--rot:${rot}deg;--op:${.6+Math.random()*.4};
                --start-y:${startY}px;`;
        }
    },
    {
        id:    'noel',
        label: '🎄 Noël',
        check: (m, d) => m === 12 && d <= 30,
        particles: ['❄', '❅', '❆', '·', '*'],
        count: 45,
        buildParticle(el) {
            const left  = Math.random() * 100;
            const delay = Math.random() * 12;
            const dur   = 7 + Math.random() * 8;
            const drift = (Math.random() - .5) * 80;
            const size  = .5 + Math.random() * 1.1;
            el.style.cssText = `left:${left}%;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;--op:${.4+Math.random()*.6};--rot:${Math.random()*360}deg;`;
        }
    },
    {
        id:    'saint-valentin',
        label: '❤️ Saint-Valentin',
        check: (m, d) => m === 2 && d <= 14,
        particles: ['❤', '💕', '♥', '❣', '✦'],
        count: 28,
        buildParticle(el) {
            const left  = Math.random() * 100;
            const delay = Math.random() * 10;
            const dur   = 6 + Math.random() * 8;
            const drift = (Math.random() - .5) * 60;
            const size  = .8 + Math.random() * 1.2;
            el.style.cssText = `left:${left}%;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;--op:${.5+Math.random()*.5};`;
        }
    },
    {
        id:    'paques',
        label: '🐣 Pâques',
        check: (m, d) => (m === 3 && d >= 15) || (m === 4 && d <= 20),
        particles: ['🌸', '🌷', '✿', '🦋', '🌼'],
        count: 22,
        buildParticle(el) {
            const left  = Math.random() * 100;
            const delay = Math.random() * 12;
            const dur   = 8 + Math.random() * 10;
            const drift = (Math.random() - .5) * 120;
            const size  = .9 + Math.random() * 1;
            el.style.cssText = `left:${left}%;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;--op:${.6+Math.random()*.4};--rot:${Math.random()*360}deg;`;
        }
    },
    {
        id:    'fete-nationale',
        label: '🇫🇷 14 Juillet',
        check: (m, d) => m === 7 && d === 14,
        particles: ['✦', '★', '·', '✨', '⭐'],
        count: 50,
        buildParticle(el) {
            const cx    = 10 + Math.random() * 80;
            const cy    = 10 + Math.random() * 50;
            const angle = Math.random() * 2 * Math.PI;
            const dist  = 40 + Math.random() * 80;
            const tx    = Math.cos(angle) * dist;
            const ty    = Math.sin(angle) * dist - 20;
            const delay = Math.random() * 6;
            const dur   = .8 + Math.random() * .8;
            const size  = .6 + Math.random() * 1;
            const colors = ['#ed2939', '#ffffff', '#002395'];
            el.style.cssText = `left:${cx}%;top:${cy}vh;font-size:${size}rem;
                color:${colors[Math.floor(Math.random() * 3)]};
                animation-delay:${delay}s;animation-duration:${dur}s;
                --tx:${tx}px;--ty:${ty}px;`;
        }
    },
    {
        id:    'octobre-rose',
        label: '🎀 Octobre Rose',
        check: (m, d) => m === 10 && d <= 14,
        particles: ['🎀', '✿', '♥', '·', '✦'],
        count: 30,
        buildParticle(el) {
            const left  = Math.random() * 100;
            const delay = Math.random() * 10;
            const dur   = 6 + Math.random() * 8;
            const drift = (Math.random() - .5) * 80;
            const size  = .7 + Math.random() * 1;
            el.style.cssText = `left:${left}%;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;--op:${.5+Math.random()*.5};--rot:${Math.random()*360}deg;`;
        }
    },
    {
        id:    'halloween',
        label: '🎃 Halloween',
        check: (m, d) => m === 10 && d >= 15,
        particles: ['🦇', '🦇', '🦇', '👻', '🕷'],
        count: 16,
        buildParticle(el) {
            const yPos  = 5 + Math.random() * 75;
            const delay = Math.random() * 14;
            const dur   = 8 + Math.random() * 10;
            const drift = (Math.random() - .5) * 120;
            const size  = 1 + Math.random() * 1.4;
            el.style.cssText = `top:${yPos}vh;left:0;font-size:${size}rem;
                animation-delay:${delay}s;animation-duration:${dur}s;
                --drift:${drift}px;`;
        }
    },
];

/* ── Particle engine ────────────────────────────────────── */
function clearTheme() {
    document.getElementById('theme-particles')?.remove();
    document.querySelector('.theme-banner')?.remove();
    THEMES.forEach(t => document.body.classList.remove(`theme-${t.id}`));
}

function spawnParticles(theme) {
    const wrap = document.createElement('div');
    wrap.id = 'theme-particles';
    wrap.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wrap);
    for (let i = 0; i < theme.count; i++) {
        const el = document.createElement('span');
        el.className = 'particle';
        el.textContent = theme.particles[Math.floor(Math.random() * theme.particles.length)];
        theme.buildParticle(el, i);
        wrap.appendChild(el);
    }
}

function showBanner(theme) {
    const b = document.createElement('div');
    b.className = 'theme-banner';
    b.textContent = theme.label;
    document.body.appendChild(b);
    setTimeout(() => { b.style.transition = 'opacity 1s'; b.style.opacity = '0'; }, 4000);
    setTimeout(() => b.remove(), 5000);
}

function applyTheme(theme) {
    clearTheme();
    document.body.classList.add(`theme-${theme.id}`);
    spawnParticles(theme);
    showBanner(theme);
}

/* ── Preview buttons (dev / admin) ─────────────────────── */
function buildPreviewPanel() {
    const panel = document.createElement('div');
    panel.id = 'theme-panel';
    panel.innerHTML = `
        <button class="theme-panel__toggle" id="theme-panel-toggle" aria-label="Thèmes saisonniers">
            🎨
        </button>
        <div class="theme-panel__drawer" id="theme-panel-drawer" hidden>
            <p class="theme-panel__title">Thèmes</p>
            ${THEMES.map(t => `
                <button class="theme-panel__btn" data-theme="${t.id}">${t.label}</button>
            `).join('')}
            <button class="theme-panel__btn theme-panel__btn--reset" data-theme="">✖ Aucun thème</button>
        </div>`;
    document.body.appendChild(panel);

    document.getElementById('theme-panel-toggle').addEventListener('click', () => {
        const drawer = document.getElementById('theme-panel-drawer');
        drawer.hidden = !drawer.hidden;
    });

    panel.querySelectorAll('[data-theme]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.theme;
            if (!id) { clearTheme(); return; }
            const theme = THEMES.find(t => t.id === id);
            if (theme) applyTheme(theme);
        });
    });
}

/* ── Auto-detect & init ─────────────────────────────────── */
function initThemes() {
    const cfg = window.THEME_CONFIG || { activeTheme: 'auto', showPreviewButtons: false };

    if (cfg.showPreviewButtons) buildPreviewPanel();

    if (!cfg.activeTheme) return;

    if (cfg.activeTheme === 'auto') {
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const match = THEMES.find(t => t.check(m, d));
        if (match) applyTheme(match);
    } else {
        const forced = THEMES.find(t => t.id === cfg.activeTheme);
        if (forced) applyTheme(forced);
    }
}

document.addEventListener('DOMContentLoaded', initThemes);
