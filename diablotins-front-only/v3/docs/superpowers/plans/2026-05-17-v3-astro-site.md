# Les Diablotins v3 — Astro Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Porter le prototype `v3/prototype/` en site Astro statique haute fidélité, déployable sur GitHub Pages.

**Architecture:** One-pager Astro static, CSS vanilla (tokens portés depuis prototype/styles.css), composants Astro par section, formulaire de contact avec fetch vanilla vers formToMail.

**Tech Stack:** Astro 4.x, CSS custom properties, vanilla JS (IntersectionObserver + fetch), Google Fonts (Caprasimo / Outfit / Caveat)

**Working directory:** `C:\Users\Gwen\Documents\DEV\GTrebaol.github.io\diablotins-front-only\v3\`

---

## File Map

```
v3/
├── public/
│   ├── uploads/                    ← copié depuis prototype/uploads/
│   └── icons/                      ← copié depuis v2/public/assets/icons/ (6 icônes utilisées)
├── src/
│   ├── layouts/
│   │   └── Layout.astro            ← <head>, fonts, SEO, Schema.org, IntersectionObserver
│   ├── components/
│   │   ├── Diablotin.astro         ← mascot SVG (réutilisé dans Logo)
│   │   ├── HeritageStamp.astro     ← badge circulaire SVG (réutilisé dans Hero)
│   │   ├── Logo.astro              ← 3 variantes (wordmark / stacked / multicolor)
│   │   ├── UtilBar.astro           ← bande noire utilitaire
│   │   ├── Nav.astro               ← navigation sticky + Logo + CTA
│   │   ├── Hero.astro              ← hero collage (2 colonnes)
│   │   ├── BrandWall.astro         ← 4 cartes marques
│   │   ├── Categories.astro        ← 3 cartes âge + strip types
│   │   ├── WhyUs.astro             ← 4 raisons
│   │   ├── Marquee.astro           ← bandeau défilant
│   │   ├── Boutique.astro          ← info boutique + formulaire contact
│   │   └── Footer.astro            ← pied de page 4 colonnes
│   ├── styles/
│   │   └── tokens.css              ← design tokens + classes utilitaires (depuis prototype/styles.css)
│   └── pages/
│       └── index.astro             ← composition de tous les composants
├── .env.example
├── astro.config.mjs
└── package.json
```

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `src/env.d.ts`

- [ ] **Créer `package.json`**

```json
{
  "name": "diablotins-v3",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.16.0"
  }
}
```

- [ ] **Créer `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
});
```

- [ ] **Créer `src/env.d.ts`**

```ts
/// <reference types="astro/client" />
```

- [ ] **Créer `.env.example`**

```
PUBLIC_FORM_URL=http://localhost:3001/contact
```

- [ ] **Installer les dépendances**

```bash
npm install
```

Expected: `node_modules/` créé, pas d'erreurs.

- [ ] **Vérifier que le dev server démarre**

```bash
npm run dev
```

Expected: `http://localhost:4321` accessible (page vide OK à ce stade).

- [ ] **Commit**

```bash
git add package.json astro.config.mjs src/env.d.ts .env.example
git commit -m "feat(v3): scaffold Astro project"
```

---

## Task 2: Copier les assets

**Files:**
- Create: `public/uploads/` (contenu copié)
- Create: `public/icons/` (contenu copié)

- [ ] **Copier les images depuis le prototype**

```bash
cp -r prototype/uploads/* public/uploads/
```

Vérifier que ces fichiers existent dans `public/uploads/` :
- `premiers-pas-1.webp` … `premiers-pas-6.webp`
- `junior-1.webp` … `junior-8.webp`
- `ado-1.webp` … `ado-5.webp`
- `bellamy.png`, `babybotte.png`, `norvik.png`, `kickers.svg`
- `slippers.png`, `rain-boots.png`, `footprint-blue.png`, `customer-support.png`, `validation.png`, `alarm.png`

- [ ] **Copier les icônes depuis v2**

```bash
mkdir -p public/icons
cp ../v2/public/assets/icons/slippers.png public/icons/
cp ../v2/public/assets/icons/rain-boots.png public/icons/
cp ../v2/public/assets/icons/footprint-blue.png public/icons/
cp ../v2/public/assets/icons/customer-support.png public/icons/
cp ../v2/public/assets/icons/validation.png public/icons/
cp ../v2/public/assets/icons/alarm.png public/icons/
```

Note : les icônes sont aussi dans `prototype/uploads/` — la copy depuis le prototype suffit si déjà faite à l'étape précédente. Vérifier la présence des 6 fichiers dans `public/uploads/`.

- [ ] **Commit**

```bash
git add public/
git commit -m "feat(v3): add public assets (images + icons)"
```

---

## Task 3: Design tokens CSS

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Créer `src/styles/tokens.css`** avec le contenu complet ci-dessous

Ce fichier est le prototype `styles.css` porté tel quel, avec une modification : `.reveal` passe de keyframe animation à transition déclenchée par IntersectionObserver.

```css
/* =========================================================
   LES DIABLOTINS — design tokens & base styles
   ========================================================= */

:root {
  --bg:        #FFF5DC;
  --bg-alt:    #FFE6B5;
  --ink:       #1F1A17;
  --ink-soft:  #4A4138;
  --muted:     #9C8B73;
  --line:      #F2DEB3;
  --accent:    #FF4D3B;
  --accent-2:  #FFC430;
  --accent-3:  #7DC264;
  --accent-4:  #5EB4E3;
  --accent-5:  #C879D6;
  --paper:     #FFFFFF;

  --font-display: "Caprasimo", Georgia, serif;
  --font-body:    "Outfit", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-hand:    "Caveat", cursive;

  --radius-sm:   8px;
  --radius:      14px;
  --radius-lg:   26px;
  --radius-pill: 999px;

  --pad-x:     clamp(20px, 5vw, 72px);
  --section-y: clamp(72px, 9vw, 140px);

  --t-fast: .18s cubic-bezier(.4,0,.2,1);
  --t-med:  .35s cubic-bezier(.4,0,.2,1);
}

/* palettes alternatives */
:root[data-palette="atelier"] {
  --bg:#F5EFE5; --bg-alt:#EBE2D2; --ink:#1A1410; --ink-soft:#3D3225;
  --muted:#857562; --line:#DECCAF;
  --accent:#A3422E; --accent-2:#C97B3E; --accent-3:#6E6A4A; --accent-4:#7E6A4C;
}
:root[data-palette="recre"] {
  --bg:#FFF1F4; --bg-alt:#FFDDE9; --ink:#3D2147; --ink-soft:#5C3A6B;
  --muted:#A892B5; --line:#FCC8D8;
  --accent:#FF5C8A; --accent-2:#FFB42B; --accent-3:#5BCBA0; --accent-4:#6FB3D9;
}
:root[data-palette="primaire"] {
  --bg:#FFFDF5; --bg-alt:#FFE9D2; --ink:#1A1410; --ink-soft:#3F352B;
  --muted:#8C7E69; --line:#F3E0BD;
  --accent:#FF3A2D; --accent-2:#FFD23F; --accent-3:#3FBF6B; --accent-4:#3CA7E0;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--ink);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }

/* paper grain overlay */
body::before {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  mix-blend-mode: multiply;
  opacity: .55;
  z-index: 1;
}
body > * { position: relative; z-index: 2; }

/* typography */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 0;
  text-wrap: balance;
}
h1 { font-size: clamp(48px, 8vw, 116px); line-height: .96; letter-spacing: -0.02em; }
h2 { font-size: clamp(36px, 5vw, 72px); line-height: 1.02; }
h3 { font-size: clamp(24px, 2.4vw, 34px); line-height: 1.1; }
.eyebrow {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  display: inline-flex; align-items: center; gap: 10px;
}
.eyebrow::before {
  content: "";
  width: 24px; height: 1px; background: currentColor;
}
.hand {
  font-family: var(--font-hand);
  font-weight: 500;
  color: var(--accent);
  font-size: 1.4em;
  line-height: 1;
}

/* layout */
.container {
  width: 100%;
  padding-left: var(--pad-x);
  padding-right: var(--pad-x);
}
section { padding-top: var(--section-y); padding-bottom: var(--section-y); }
.divider {
  border: 0; height: 1px; background: var(--line); margin: 0 var(--pad-x);
}

/* buttons */
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: .01em;
  border: 2px solid var(--ink);
  background: var(--ink);
  color: var(--bg);
  box-shadow: 4px 4px 0 var(--ink);
  transition: transform var(--t-fast), box-shadow var(--t-fast), background var(--t-fast), color var(--t-fast);
}
.btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); background: var(--accent); border-color: var(--ink); color: white; }
.btn:active { transform: translate(2px, 2px); box-shadow: 0 0 0 var(--ink); }
.btn--ghost { background: var(--paper); color: var(--ink); }
.btn--ghost:hover { background: var(--ink); color: var(--bg); }
.btn--accent { background: var(--accent); border-color: var(--ink); color: white; box-shadow: 4px 4px 0 var(--ink); }
.btn--accent:hover { background: var(--ink); border-color: var(--ink); }
.btn .arrow { transition: transform var(--t-fast); display: inline-flex; }
.btn:hover .arrow { transform: translateX(4px); }

/* utility bar */
.util {
  background: var(--ink);
  color: var(--bg);
  font-size: 12.5px;
  padding: 9px var(--pad-x);
  display: flex; justify-content: space-between; align-items: center;
  letter-spacing: .02em;
}
.util .util-l, .util .util-r { display: flex; gap: 22px; align-items: center; }
.util .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent-2); display: inline-block; }
@media (max-width: 720px) { .util .util-r { display: none; } }

/* nav */
.nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 22px var(--pad-x);
  position: sticky; top: 0;
  z-index: 50;
  background: color-mix(in oklab, var(--bg) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid color-mix(in oklab, var(--line) 60%, transparent);
}
.nav-links { display: flex; gap: 30px; align-items: center; font-weight: 500; font-size: 15px; }
.nav-links a { position: relative; padding: 4px 0; transition: color var(--t-fast); }
.nav-links a:hover { color: var(--accent); }
.nav-links a::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -3px;
  height: 2px; background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--t-med);
}
.nav-links a:hover::after { transform: scaleX(1); }
.nav-cta { display: flex; gap: 12px; align-items: center; }
@media (max-width: 900px) { .nav-links { display: none; } }

/* hero */
.hero { padding-top: 56px; padding-bottom: var(--section-y); }
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}
@media (max-width: 880px) { .hero-grid { grid-template-columns: 1fr; } }
.hero h1 .accent { color: var(--accent); }
.hero h1 .underline { position: relative; display: inline-block; }
.hero h1 .underline::after {
  content: "";
  position: absolute; left: -2%; right: -2%; bottom: 4%;
  height: 14px;
  background: var(--accent-2);
  border-radius: 999px;
  opacity: .55;
  z-index: -1;
}
.hero-sub {
  max-width: 52ch;
  margin-top: 26px;
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1.6;
}
.hero-cta { display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }
.hero-meta {
  margin-top: 38px;
  display: flex;
  gap: 28px; flex-wrap: wrap;
  padding-top: 28px;
  border-top: 1px solid var(--line);
}
.hero-meta .mblock { display: flex; flex-direction: column; gap: 2px; }
.hero-meta .mnum { font-family: var(--font-display); font-size: 34px; line-height: 1; color: var(--ink); }
.hero-meta .mlbl { font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }

/* hero collage */
.collage {
  position: relative;
  aspect-ratio: 4 / 5;
  min-height: 420px;
}
.collage .card {
  position: absolute;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--paper);
  box-shadow: 0 24px 60px -22px rgba(31,26,23,.35), 0 2px 0 rgba(31,26,23,.04);
  transition: transform var(--t-med);
}
.collage .card img { width: 100%; height: 100%; object-fit: cover; }
.collage .card.c1 { left: 0; top: 5%; width: 58%; aspect-ratio: 4/5; transform: rotate(-3deg); }
.collage .card.c2 { right: 0; top: 0; width: 46%; aspect-ratio: 4/5; transform: rotate(2.5deg); }
.collage .card.c3 { left: 22%; bottom: 0; width: 50%; aspect-ratio: 4/4.4; transform: rotate(1.5deg); }
.collage .card:hover { transform: rotate(0deg) translateY(-6px); z-index: 5; }
.collage .sticker {
  position: absolute;
  width: 128px; height: 128px;
  right: -10px; bottom: 16%;
  z-index: 6;
  display: grid; place-items: center;
  transform: rotate(-8deg);
}
.collage .horn-blob {
  position: absolute;
  width: 130%; aspect-ratio: 1;
  left: -15%; top: -10%;
  background: radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent-2) 35%, transparent) 0%, transparent 60%);
  z-index: -1;
  pointer-events: none;
}

/* section head */
.s-head {
  display: flex; align-items: end; justify-content: space-between;
  gap: 30px; margin-bottom: 56px; flex-wrap: wrap;
}
.s-head h2 { max-width: 18ch; }
.s-head .s-intro { max-width: 44ch; color: var(--ink-soft); font-size: 17px; }

/* brand wall */
.brands {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
@media (max-width: 900px) { .brands { grid-template-columns: repeat(2, 1fr); } }
.brand-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px 24px 24px;
  display: flex; flex-direction: column; gap: 14px;
  transition: transform var(--t-fast), box-shadow var(--t-fast);
}
.brand-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -22px rgba(31,26,23,.3); }
.brand-mark { height: 96px; display: flex; align-items: center; justify-content: flex-start; }
.brand-mark img { display: block; }
.brand-card h4 {
  font-family: var(--font-body); font-weight: 600; font-size: 14px;
  letter-spacing: .08em; text-transform: uppercase;
  margin: 0; color: var(--muted);
}
.brand-card .blurb { font-size: 15px; color: var(--ink-soft); line-height: 1.5; }
.brand-card .since { font-family: var(--font-hand); color: var(--accent); font-size: 22px; }

/* categories */
.cats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
@media (max-width: 900px) { .cats { grid-template-columns: 1fr; } }
.cat-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 3/4;
  background: var(--bg-alt);
  transition: transform var(--t-med);
  display: block;
}
.cat-card:hover { transform: translateY(-6px); }
.cat-card img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--t-med); }
.cat-card:hover img { transform: scale(1.04); }
.cat-card .cat-mask {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(31,26,23,0) 35%, rgba(31,26,23,.78) 100%);
  pointer-events: none;
}
.cat-card .cat-meta {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 26px 26px 24px;
  color: var(--bg);
  display: flex; align-items: flex-end; justify-content: space-between; gap: 16px;
}
.cat-card .cat-meta h3 { font-size: 38px; color: var(--bg); }
.cat-card .cat-meta .range { font-family: var(--font-hand); font-size: 28px; color: var(--accent-2); }
.cat-card .age-tag {
  position: absolute; top: 22px; left: 22px;
  background: var(--bg); color: var(--ink);
  font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  padding: 8px 14px; border-radius: var(--radius-pill);
}
.cat-arrow {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--bg); color: var(--ink);
  display: grid; place-items: center; flex: none;
}

/* types strip */
.types-strip {
  margin-top: 28px;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 18px;
  align-items: stretch;
}
@media (max-width: 900px) { .types-strip { grid-template-columns: 1fr 1fr; } .types-lead { grid-column: 1 / -1; } }
@media (max-width: 540px) { .types-strip { grid-template-columns: 1fr; } }
.types-lead { display: flex; align-items: center; padding: 0 8px 0 4px; }
.types-lead .hand { font-size: 32px; line-height: 1; color: var(--ink-soft); }
.type-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: var(--radius);
  box-shadow: 4px 4px 0 var(--ink);
  transition: transform var(--t-fast), box-shadow var(--t-fast);
  text-decoration: none;
  color: var(--ink);
}
.type-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--ink); }
.type-card--chaussons { background: color-mix(in oklab, var(--accent-2) 22%, var(--paper)); }
.type-card--chaussons:hover { background: color-mix(in oklab, var(--accent-2) 38%, var(--paper)); }
.type-card--bottes { background: color-mix(in oklab, var(--accent-4) 22%, var(--paper)); }
.type-card--bottes:hover { background: color-mix(in oklab, var(--accent-4) 38%, var(--paper)); }
.type-ic {
  width: 60px; height: 60px;
  display: grid; place-items: center;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 50%;
}
.type-ic img { width: 38px; height: 38px; display: block; }
.type-body h4 { font-family: var(--font-display); font-weight: 400; font-size: 22px; line-height: 1; margin: 0 0 4px; }
.type-body p { margin: 0; font-size: 14px; color: var(--ink-soft); line-height: 1.35; }
.type-arrow {
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--ink); color: var(--bg);
  transition: transform var(--t-fast);
}
.type-card:hover .type-arrow { transform: translateX(3px); }

/* why us */
.why { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
@media (max-width: 900px) { .why { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 540px) { .why { grid-template-columns: 1fr; } }
.why-item {
  padding: 28px 24px 26px;
  border-radius: var(--radius);
  background: var(--paper);
  border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 14px;
}
.why-item .ic {
  width: 88px; height: 88px;
  display: grid; place-items: center;
  border-radius: 22px;
  background: var(--bg-alt);
}
.why-item .ic img { display: block; width: 64px; height: 64px; }
.why-item h3 { font-size: 22px; }
.why-item p { margin: 0; color: var(--ink-soft); font-size: 15px; }

/* boutique */
.boutique-grid {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: clamp(28px, 4vw, 64px);
  align-items: stretch;
}
@media (max-width: 880px) { .boutique-grid { grid-template-columns: 1fr; } }
.boutique-card {
  background: var(--ink); color: var(--bg);
  border-radius: var(--radius-lg);
  padding: clamp(28px, 4vw, 48px);
  display: flex; flex-direction: column; gap: 24px;
}
.boutique-card h2 { color: var(--bg); }
.boutique-card .info-rows { display: flex; flex-direction: column; gap: 18px; }
.boutique-card .info-row { display: flex; gap: 16px; align-items: flex-start; }
.boutique-card .info-row .lbl {
  font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
  color: color-mix(in oklab, var(--bg) 55%, transparent); margin-bottom: 2px;
}
.boutique-card .info-row .val { font-size: 18px; }
.boutique-card .info-row .ic-circle {
  width: 42px; height: 42px; border-radius: 50%;
  background: color-mix(in oklab, var(--bg) 12%, transparent);
  display: grid; place-items: center; flex: none;
}
.boutique-contact {
  background: var(--paper);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  padding: clamp(28px, 3.6vw, 44px);
  display: flex;
  box-shadow: 0 24px 60px -32px rgba(31,26,23,.25);
}

/* hours table */
.hours-table { font-variant-numeric: tabular-nums; }
.hours-table .hrow {
  display: flex; justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed color-mix(in oklab, var(--bg) 22%, transparent);
}
.hours-table .hrow:last-child { border-bottom: 0; }
.hours-table .hrow.closed .day,
.hours-table .hrow.closed .h { color: color-mix(in oklab, var(--bg) 45%, transparent); }

/* contact form */
.contact-form { display: flex; flex-direction: column; gap: 18px; width: 100%; }
.cf-head { margin-bottom: 4px; }
.cf-head .hand { display: block; font-size: 28px; margin-bottom: 2px; line-height: 1; }
.cf-head h3 { font-size: clamp(26px, 2.4vw, 34px); line-height: 1.05; }
.cf-head p { color: var(--ink-soft); margin: 10px 0 0; font-size: 15px; max-width: 38ch; }
.cf-field { display: flex; flex-direction: column; gap: 7px; }
.cf-lbl {
  font-size: 11px; letter-spacing: .16em; text-transform: uppercase;
  font-weight: 600; color: var(--muted);
}
.cf-lbl em { font-style: normal; text-transform: none; letter-spacing: 0; color: var(--muted); opacity: .75; font-weight: 500; }
.contact-form input,
.contact-form textarea {
  font: inherit; font-size: 16px; color: var(--ink);
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 13px 16px;
  width: 100%;
  transition: border-color var(--t-fast), box-shadow var(--t-fast), background var(--t-fast);
}
.contact-form textarea { resize: vertical; min-height: 124px; line-height: 1.5; }
.contact-form input::placeholder,
.contact-form textarea::placeholder { color: color-mix(in oklab, var(--muted) 80%, transparent); }
.contact-form input:hover,
.contact-form textarea:hover { border-color: color-mix(in oklab, var(--ink) 35%, var(--line)); }
.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  background: var(--paper);
  border-color: var(--ink);
  box-shadow: 3px 3px 0 var(--accent);
}
.cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 540px) { .cf-row { grid-template-columns: 1fr; } }
.cf-actions {
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px; flex-wrap: wrap; margin-top: 8px;
}
.cf-note { font-size: 14px; color: var(--ink-soft); }
.cf-note a { border-bottom: 1px dashed var(--muted); padding-bottom: 1px; }
.cf-note a:hover { color: var(--accent); border-color: var(--accent); }
.cf-error { font-size: 14px; color: var(--accent); margin-top: 4px; display: none; }
.cf-error.visible { display: block; }

/* marquee */
.marquee {
  background: var(--accent); color: white;
  padding: 22px 0;
  overflow: hidden; white-space: nowrap;
  border-top: 1px solid color-mix(in oklab, var(--ink) 90%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--ink) 90%, transparent);
}
.marquee-track {
  display: inline-flex; gap: 48px; align-items: center;
  animation: marquee 28s linear infinite;
  font-family: var(--font-display);
  font-size: 34px;
  padding-left: 48px;
}
.marquee-track .star { color: var(--accent-2); font-size: 30px; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }

/* footer */
footer { background: var(--ink); color: var(--bg); padding: 80px var(--pad-x) 28px; }
.foot-top {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 36px; align-items: start;
  padding-bottom: 40px;
  border-bottom: 1px solid color-mix(in oklab, var(--bg) 14%, transparent);
}
@media (max-width: 760px) { .foot-top { grid-template-columns: 1fr 1fr; } }
.foot-col h5 {
  font-family: var(--font-body); font-size: 12px; font-weight: 600;
  letter-spacing: .16em; text-transform: uppercase;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  margin: 0 0 16px;
}
.foot-col a { display: block; margin-bottom: 8px; font-size: 15px; opacity: .85; }
.foot-col a:hover { opacity: 1; color: var(--accent-2); }
.foot-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 24px;
  font-size: 13px; color: color-mix(in oklab, var(--bg) 55%, transparent);
  flex-wrap: wrap; gap: 16px;
}

/* reveal — IntersectionObserver driven */
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1);
}
.reveal[data-d="1"] { transition-delay: .05s; }
.reveal[data-d="2"] { transition-delay: .12s; }
.reveal[data-d="3"] { transition-delay: .20s; }
.reveal[data-d="4"] { transition-delay: .28s; }
.reveal[data-d="5"] { transition-delay: .36s; }
.reveal.visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Vérifier que le dev server ne plante pas** (import sera fait dans Layout)

- [ ] **Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat(v3): add design tokens CSS"
```

---

## Task 4: Layout.astro

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Créer `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Les Diablotins · Chausseur enfants à Brest depuis 2009",
  description = "Boutique de chaussures pour enfants à Brest depuis 2009. Premiers pas, juniors, ados — du 19 au 40. Conseil personnalisé, mesure du pied offerte.",
} = Astro.props;

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Les Diablotins",
  "description": description,
  "url": "https://gtrebaol.github.io/diablotins-front-only/v3",
  "telephone": "+33298462738",
  "email": "lesdiablotins29@orange.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "50 rue d'Aiguillon",
    "addressLocality": "Brest",
    "postalCode": "29200",
    "addressCountry": "FR"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "14:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "10:00", "closes": "19:00" }
  ]
};
---
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:locale" content="fr_FR" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Outfit:wght@300;400;500;600;700;800&family=Caveat:wght@500;700&display=swap" rel="stylesheet" />

  <!-- Schema.org -->
  <script type="application/ld+json" set:html={JSON.stringify(schemaOrg)} />
</head>
<body id="top">
  <slot />
</body>
</html>

<style is:global>
  @import '../styles/tokens.css';
</style>

<script>
  // IntersectionObserver pour .reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
</script>
```

- [ ] **Créer `src/pages/index.astro` minimal pour tester**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
  <p style="padding: 40px; font-family: Caprasimo, serif; font-size: 48px;">Les Diablotins</p>
</Layout>
```

- [ ] **Ouvrir `http://localhost:4321` — vérifier :**
  - Police Caprasimo chargée (texte arrondi, childlike)
  - Fond crème `#FFF5DC` visible
  - Pas d'erreur console

- [ ] **Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat(v3): add Layout with fonts, SEO, IntersectionObserver"
```

---

## Task 5: Composants SVG (Diablotin, HeritageStamp, Logo)

**Files:**
- Create: `src/components/Diablotin.astro`
- Create: `src/components/HeritageStamp.astro`
- Create: `src/components/Logo.astro`

- [ ] **Créer `src/components/Diablotin.astro`**

```astro
---
interface Props {
  size?: number;
  color?: string;
}
const { size = 80, color = "var(--accent)" } = Astro.props;
---
<svg width={size} height={size} viewBox="0 0 80 80" fill="none">
  <path d="M22 18c-1-6 0-12 4-14 1 5 2 9 5 14" fill={color} stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M58 18c1-6 0-12-4-14-1 5-2 9-5 14" fill={color} stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M14 38c0-13 12-22 26-22s26 9 26 22c0 14-12 24-26 24S14 52 14 38Z" fill={color} stroke="var(--ink)" stroke-width="2.2"/>
  <ellipse cx="24" cy="46" rx="5" ry="3" fill="var(--accent-2)" opacity="0.65"/>
  <ellipse cx="56" cy="46" rx="5" ry="3" fill="var(--accent-2)" opacity="0.65"/>
  <g fill="var(--ink)">
    <circle cx="30" cy="38" r="3.2"/>
    <circle cx="50" cy="38" r="3.2"/>
    <circle cx="31" cy="37" r="1" fill="var(--bg)"/>
    <circle cx="51" cy="37" r="1" fill="var(--bg)"/>
  </g>
  <path d="M30 50c3 4 7 5 10 5s7-1 10-5" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <circle cx="40" cy="54" r="2" fill="var(--accent-2)" stroke="var(--ink)" stroke-width="1.2"/>
</svg>
```

- [ ] **Créer `src/components/HeritageStamp.astro`**

```astro
---
interface Props {
  size?: number;
}
const { size = 180 } = Astro.props;
---
<svg width={size} height={size} viewBox="0 0 180 180" fill="none">
  <defs>
    <path id="hs-circ" d="M90,90 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0"/>
  </defs>
  <circle cx="90" cy="90" r="86" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 5"/>
  <circle cx="90" cy="90" r="76" fill="var(--accent-2)" stroke="var(--ink)" stroke-width="2"/>
  <circle cx="90" cy="90" r="62" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.5"/>
  <text fill="var(--ink)" font-family="Outfit, sans-serif" font-weight="600" font-size="11" letter-spacing="3">
    <textPath href="#hs-circ" startOffset="0%">DEPUIS 15 ANS · BREST · DEPUIS 15 ANS · BREST · </textPath>
  </text>
  <g transform="translate(90 90)">
    <text text-anchor="middle" font-family="Caprasimo, Georgia, serif" font-size="42" fill="var(--accent)" y="2">15</text>
    <text text-anchor="middle" font-family="Outfit, sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="var(--ink)" y="22">ANNÉES</text>
    <path d="M-20 30 L20 30" stroke="var(--ink)" stroke-width="1"/>
    <text text-anchor="middle" font-family="Caveat, cursive" font-size="16" fill="var(--ink)" y="46">à chausser</text>
  </g>
</svg>
```

- [ ] **Créer `src/components/Logo.astro`**

Props : `variant` ("wordmark" | "stacked" | "multicolor"), `size` (number, scale factor, défaut 1), `dark` (bool, défaut false).

```astro
---
import Diablotin from './Diablotin.astro';

interface Props {
  variant?: 'wordmark' | 'stacked' | 'multicolor';
  size?: number;
  dark?: boolean;
}
const { variant = 'multicolor', size = 1, dark = false } = Astro.props;
const inkVar = dark ? 'var(--bg)' : 'var(--ink)';

// multicolor letter colors
const colors = [
  'var(--accent-4)', 'var(--accent-3)', 'var(--accent-2)', ' ',
  'var(--accent)',   'var(--accent-4)', 'var(--accent-3)', 'var(--accent-2)',
  'var(--accent)',   'var(--accent-4)', 'var(--accent-3)', 'var(--accent-2)',
  'var(--accent)',   'var(--accent-4)',
];
const text = 'les diablotins';
---

{variant === 'multicolor' && (
  <div style={`display:inline-flex;align-items:baseline;gap:4px;line-height:1;font-family:var(--font-display);font-size:${42 * size * 0.7}px;letter-spacing:-0.01em;`}>
    {text.split('').map((ch, i) =>
      ch === ' '
        ? <span style={`width:${42 * size * 0.18}px;display:inline-block;`}>&nbsp;</span>
        : <span style={`color:${colors[i]};display:inline-block;`}>{ch}</span>
    )}
  </div>
)}

{variant === 'wordmark' && (
  <div style={`display:inline-flex;align-items:center;gap:${10 * size}px;line-height:1;position:relative;`}>
    <div style={`width:${38 * size * 1.05}px;height:${38 * size * 1.05}px;flex:none;`}>
      <Diablotin size={38 * size * 1.05} color="var(--accent)" />
    </div>
    <div style="display:flex;flex-direction:column;gap:0;line-height:1;">
      <span style={`font-family:var(--font-body);font-size:${10 * size}px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${inkVar};opacity:.65;margin-bottom:2px;`}>les</span>
      <span style={`font-family:var(--font-display);font-size:${38 * size * 0.7}px;color:${inkVar};letter-spacing:-0.02em;position:relative;`}>
        diablot<span style="position:relative;display:inline-block;">i<svg width={`${38 * size * 0.32}`} height={`${38 * size * 0.28}`} viewBox="0 0 16 14" fill="none" style={`position:absolute;left:50%;top:-${38 * size * 0.18}px;transform:translateX(-50%);`}><path d="M4 12c-1-5 0-9 2-11 1 4 1 7 3 11" fill="var(--accent)" stroke={inkVar} stroke-width="1.5" stroke-linejoin="round"/><path d="M12 12c1-5 0-9-2-11-1 4-1 7-3 11" fill="var(--accent)" stroke={inkVar} stroke-width="1.5" stroke-linejoin="round"/></svg></span>ns
      </span>
    </div>
  </div>
)}

{variant === 'stacked' && (
  <div style={`display:inline-flex;align-items:center;gap:${14 * size}px;line-height:1;`}>
    <div style="flex:none;">
      <Diablotin size={44 * size} color="var(--accent)" />
    </div>
    <div style={`font-family:var(--font-display);font-size:${44 * size * 0.66}px;color:${inkVar};letter-spacing:-0.02em;line-height:1;`}>
      les diablotins
    </div>
  </div>
)}
```

- [ ] **Tester Logo dans index.astro** — ajouter temporairement :

```astro
---
import Layout from '../layouts/Layout.astro';
import Logo from '../components/Logo.astro';
---
<Layout>
  <div style="padding: 40px; background: var(--bg); display: flex; flex-direction: column; gap: 20px;">
    <Logo variant="multicolor" size={1} />
    <Logo variant="wordmark" size={1} />
    <Logo variant="stacked" size={1} />
  </div>
</Layout>
```

Vérifier que les 3 variantes s'affichent correctement.

- [ ] **Commit**

```bash
git add src/components/Diablotin.astro src/components/HeritageStamp.astro src/components/Logo.astro
git commit -m "feat(v3): add SVG components (Diablotin, HeritageStamp, Logo)"
```

---

## Task 6: UtilBar.astro

**Files:**
- Create: `src/components/UtilBar.astro`

- [ ] **Créer `src/components/UtilBar.astro`**

```astro
<div class="util">
  <div class="util-l">
    <span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;margin-right:6px;">
        <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/>
      </svg>
      50 rue d'Aiguillon, Brest
    </span>
    <span class="dot"></span>
    <span>02 98 46 27 38</span>
  </div>
  <div class="util-r">
    <span>Ouvert mardi–samedi · 10h–12h15 / 14h–19h</span>
    <span class="dot"></span>
    <span class="hand" style="font-size:18px;color:var(--accent-2);">du 19 au 40 ✦</span>
  </div>
</div>
```

- [ ] **Commit**

```bash
git add src/components/UtilBar.astro
git commit -m "feat(v3): add UtilBar component"
```

---

## Task 7: Nav.astro

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Créer `src/components/Nav.astro`**

```astro
---
import Logo from './Logo.astro';
---
<nav class="nav">
  <a href="#top" aria-label="Les Diablotins — accueil">
    <Logo variant="multicolor" size={0.85} />
  </a>
  <div class="nav-links">
    <a href="#marques">Nos marques</a>
    <a href="#categories">Pour qui&nbsp;?</a>
    <a href="#pourquoi">Pourquoi nous</a>
    <a href="#boutique">La boutique</a>
  </div>
  <div class="nav-cta">
    <a href="#boutique" class="btn">
      Venir nous voir
      <span class="arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
        </svg>
      </span>
    </a>
  </div>
</nav>
```

- [ ] **Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat(v3): add Nav component"
```

---

## Task 8: Hero.astro

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Créer `src/components/Hero.astro`**

```astro
---
import HeritageStamp from './HeritageStamp.astro';
---
<section class="hero hero--collage">
  <div class="container hero-grid">

    <!-- Texte -->
    <div class="hero-text">
      <span class="eyebrow reveal" data-d="1">Chausseur enfants · Brest · depuis 2009</span>
      <h1 class="reveal" data-d="2" style="margin-top:18px;">
        15 ans à chausser <br/>
        <span class="underline">les petits</span> <br/>
        <span class="accent">diables</span>
        <span class="hand" style="vertical-align:middle;"> ♥</span>
      </h1>
      <p class="hero-sub reveal" data-d="3">
        Une boutique familiale au cœur de Brest où chaque pied trouve chaussure à son pied.
        Du premier pas au lycée, on mesure, on conseille, on bichonne — comme à la maison.
      </p>
      <div class="hero-cta reveal" data-d="4">
        <a href="#boutique" class="btn btn--accent">
          Venir nous voir
          <span class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
            </svg>
          </span>
        </a>
        <a href="#marques" class="btn btn--ghost">Nos marques</a>
      </div>
      <div class="hero-meta reveal" data-d="5">
        <div class="mblock"><span class="mnum">15+</span><span class="mlbl">années</span></div>
        <div class="mblock"><span class="mnum">19 → 40</span><span class="mlbl">pointures</span></div>
        <div class="mblock"><span class="mnum">4</span><span class="mlbl">marques choisies</span></div>
        <div class="mblock"><span class="mnum">0 → 16</span><span class="mlbl">ans</span></div>
      </div>
    </div>

    <!-- Collage -->
    <div class="collage reveal" data-d="3">
      <div class="horn-blob"></div>
      <div class="card c1">
        <img src="/uploads/premiers-pas-1.webp" alt="chaussons bébé" loading="eager" />
      </div>
      <div class="card c2">
        <img src="/uploads/junior-7.webp" alt="sneakers enfant" loading="eager" />
      </div>
      <div class="card c3">
        <img src="/uploads/ado-1.webp" alt="bottines ado" loading="eager" />
      </div>
      <div class="sticker">
        <HeritageStamp size={128} />
      </div>
    </div>

  </div>
</section>
```

- [ ] **Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(v3): add Hero collage component"
```

---

## Task 9: BrandWall.astro

**Files:**
- Create: `src/components/BrandWall.astro`

- [ ] **Créer `src/components/BrandWall.astro`**

```astro
---
const BRANDS = [
  {
    name: "Bellamy",
    logo: "/uploads/bellamy.png",
    logoH: 54,
    cat: "Premiers pas · Chaussons",
    blurb: "Fabriqué en France. Le chausson qui accompagne les tout premiers pas, depuis trois générations.",
    since: "Made in France",
  },
  {
    name: "babybotte",
    logo: "/uploads/babybotte.png",
    logoH: 50,
    cat: "Souliers premiers pas",
    blurb: "L'expertise française des premiers pas — cuirs souples et conseils de podologue.",
    since: "Depuis 1933",
  },
  {
    name: "nörvik",
    logo: "/uploads/norvik.png",
    logoH: 92,
    cat: "Ados · Style affirmé",
    blurb: "Du caractère pour les pieds qui poussent — bottines, baskets montantes, modèles affirmés.",
    since: "Children's shoes",
  },
  {
    name: "Kickers",
    logo: "/uploads/kickers.svg",
    logoH: 32,
    cat: "Icône de cour de récré",
    blurb: "L'icône de la rentrée scolaire. La Kick Lo, encore et toujours — du CP au lycée.",
    since: "Depuis 1970",
  },
];
---

<section id="marques">
  <div class="container">
    <div class="s-head reveal">
      <div>
        <span class="eyebrow">Nos marques</span>
        <h2 style="margin-top:14px;">
          Quatre maisons, <br/>
          <em style="font-style:italic;color:var(--ink-soft);">choisies une à une.</em>
        </h2>
      </div>
      <p class="s-intro">
        On ne vend pas tout. On choisit les maisons en qui on a confiance — fabrication soignée,
        tailles cohérentes, et des modèles qui tiennent la saison.
      </p>
    </div>

    <div class="brands">
      {BRANDS.map((b, i) => (
        <div class="brand-card reveal" data-d={String(i + 1)}>
          <div class="brand-mark">
            <img
              src={b.logo}
              alt={b.name}
              style={`height:${b.logoH}px;max-width:100%;object-fit:contain;object-position:left center;`}
              loading="lazy"
            />
          </div>
          <h4>{b.cat}</h4>
          <p class="blurb">{b.blurb}</p>
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;padding-top:10px;">
            <span class="since">{b.since}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Commit**

```bash
git add src/components/BrandWall.astro
git commit -m "feat(v3): add BrandWall component"
```

---

## Task 10: Categories.astro

**Files:**
- Create: `src/components/Categories.astro`

- [ ] **Créer `src/components/Categories.astro`**

```astro
---
const CATS = [
  { id: "premiers-pas", title: "Premiers Pas", range: "0 → 3 ans", sizes: "19 → 23", hint: "le tout premier pas", img: "/uploads/premiers-pas-1.webp", tag: "Bébés" },
  { id: "juniors",      title: "Juniors",       range: "3 → 10 ans", sizes: "24 → 34", hint: "école & aventures",    img: "/uploads/junior-1.webp",        tag: "Enfants" },
  { id: "ados",         title: "Ados",          range: "10 → 16 ans", sizes: "35 → 40", hint: "style à eux",         img: "/uploads/ado-1.webp",            tag: "Ados" },
];

const arrowSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>`;
---

<section id="categories" style="background:var(--bg-alt);">
  <div class="container">
    <div class="s-head reveal">
      <div>
        <span class="eyebrow">Pour qui ?</span>
        <h2 style="margin-top:14px;">
          Du premier pas <br/>
          <em style="font-style:italic;color:var(--ink-soft);">au lycée.</em>
        </h2>
      </div>
      <p class="s-intro">
        Trois âges, trois rayons, une seule manière de faire&nbsp;: prendre le temps, mesurer le pied,
        essayer plusieurs paires, et trouver la bonne. Toujours du 19 au 40.
      </p>
    </div>

    <div class="cats">
      {CATS.map((c, i) => (
        <a href={`#${c.id}`} class="cat-card reveal" data-d={String(i + 1)}>
          <img src={c.img} alt={c.title} loading="lazy" />
          <span class="age-tag">{c.tag} · {c.sizes}</span>
          <div class="cat-mask"></div>
          <div class="cat-meta">
            <div>
              <span class="range">— {c.hint}</span>
              <h3>{c.title}</h3>
              <div style="font-family:var(--font-body);font-size:14px;opacity:.8;margin-top:6px;">{c.range}</div>
            </div>
            <div class="cat-arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>

    <!-- Types strip -->
    <div class="types-strip reveal" data-d="4">
      <span class="types-lead"><span class="hand">Aussi chez nous —</span></span>

      <a href="#chaussons" class="type-card type-card--chaussons">
        <div class="type-ic">
          <img src="/uploads/slippers.png" alt="" width="38" height="38" />
        </div>
        <div class="type-body">
          <h4>Chaussons</h4>
          <p>Bellamy, du 19 au 35 — pour la maison et la crèche.</p>
        </div>
        <span class="type-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
          </svg>
        </span>
      </a>

      <a href="#bottes" class="type-card type-card--bottes">
        <div class="type-ic">
          <img src="/uploads/rain-boots.png" alt="" width="38" height="38" />
        </div>
        <div class="type-body">
          <h4>Bottes caoutchouc</h4>
          <p>Pour les flaques bretonnes — du 22 au 38.</p>
        </div>
        <span class="type-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
          </svg>
        </span>
      </a>
    </div>
  </div>
</section>
```

- [ ] **Commit**

```bash
git add src/components/Categories.astro
git commit -m "feat(v3): add Categories component with types strip"
```

---

## Task 11: WhyUs.astro

**Files:**
- Create: `src/components/WhyUs.astro`

- [ ] **Créer `src/components/WhyUs.astro`**

```astro
---
const REASONS = [
  { icon: "/uploads/footprint-blue.png", title: "Mesure du pied",   body: "On mesure chaque pied avant d'essayer. C'est gratuit, ça prend deux minutes, et ça change tout." },
  { icon: "/uploads/customer-support.png", title: "Conseil familial", body: "Quinze ans à voir grandir les enfants du quartier. On connaît les bonnes pointures et les bonnes idées." },
  { icon: "/uploads/validation.png",     title: "Marques choisies", body: "Bellamy fabriqué en France, babybotte maison historique. On choisit la qualité, pas la quantité." },
  { icon: "/uploads/alarm.png",          title: "Depuis 2009",      body: "Plus de quinze ans dans la même rue. Les enfants reviennent, et ramènent leurs enfants." },
];
---

<section id="pourquoi">
  <div class="container">
    <div class="s-head reveal">
      <div>
        <span class="eyebrow">Pourquoi venir nous voir</span>
        <h2 style="margin-top:14px;">
          Le bon conseil, <br/>
          <em style="font-style:italic;color:var(--ink-soft);">en vrai.</em>
        </h2>
      </div>
      <p class="s-intro">
        Acheter une paire pour son enfant, c'est plus qu'une transaction. C'est un moment.
        On le prend au sérieux — sans se prendre au sérieux.
      </p>
    </div>

    <div class="why">
      {REASONS.map((r, i) => (
        <div class="why-item reveal" data-d={String(i + 1)}>
          <div class="ic">
            <img src={r.icon} alt="" width="64" height="64" loading="lazy" />
          </div>
          <h3>{r.title}</h3>
          <p>{r.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Commit**

```bash
git add src/components/WhyUs.astro
git commit -m "feat(v3): add WhyUs component"
```

---

## Task 12: Marquee.astro

**Files:**
- Create: `src/components/Marquee.astro`

- [ ] **Créer `src/components/Marquee.astro`**

```astro
---
const ITEMS = [
  "Mesure du pied offerte",
  "Bellamy · babybotte · nörvik · Kickers",
  "Du 19 au 40",
  "Conseil personnalisé",
  "Boutique familiale depuis 2009",
  "50 rue d'Aiguillon · Brest",
];
const loop = [...ITEMS, ...ITEMS];
---

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    {loop.map((item) => (
      <>
        <span>{item}</span>
        <span class="star">✦</span>
      </>
    ))}
  </div>
</div>
```

- [ ] **Commit**

```bash
git add src/components/Marquee.astro
git commit -m "feat(v3): add Marquee component"
```

---

## Task 13: Boutique.astro (info + formulaire)

**Files:**
- Create: `src/components/Boutique.astro`

- [ ] **Créer `src/components/Boutique.astro`**

```astro
---
const HOURS = [
  { day: "Lundi",    hours: "14h00 — 19h00",                          closed: false },
  { day: "Mardi",    hours: "10h00 — 12h15 · 14h00 — 19h00",         closed: false },
  { day: "Mercredi", hours: "10h00 — 12h15 · 14h00 — 19h00",         closed: false },
  { day: "Jeudi",    hours: "10h00 — 12h15 · 14h00 — 19h00",         closed: false },
  { day: "Vendredi", hours: "10h00 — 12h15 · 14h00 — 19h00",         closed: false },
  { day: "Samedi",   hours: "10h00 — 12h15 · 14h00 — 19h00",         closed: false },
  { day: "Dimanche", hours: "Fermé",                                    closed: true },
];

const formUrl = import.meta.env.PUBLIC_FORM_URL ?? '';
---

<section id="boutique">
  <div class="container">
    <div class="s-head reveal" style="margin-bottom:36px;">
      <div>
        <span class="eyebrow">La boutique</span>
        <h2 style="margin-top:14px;">
          50 rue d'Aiguillon, <br/>
          <em style="font-style:italic;color:var(--ink-soft);">Brest.</em>
        </h2>
      </div>
      <p class="s-intro">
        On vous accueille du mardi au samedi en plein centre. Une visite vaut mille photos —
        venez essayer, on a toujours un café pour les parents et un sourire pour les enfants.
      </p>
    </div>

    <div class="boutique-grid">

      <!-- Info card -->
      <div class="boutique-card reveal" data-d="1">
        <h2>Venir nous voir.</h2>
        <div class="info-rows">

          <div class="info-row">
            <div class="ic-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/>
              </svg>
            </div>
            <div>
              <div class="lbl">Adresse</div>
              <div class="val">50 rue d'Aiguillon<br/>29200 Brest</div>
            </div>
          </div>

          <div class="info-row">
            <div class="ic-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5.5 4h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z"/>
              </svg>
            </div>
            <div>
              <div class="lbl">Téléphone</div>
              <div class="val"><a href="tel:+33298462738" style="color:inherit;">02 98 46 27 38</a></div>
            </div>
          </div>

          <div class="info-row">
            <div class="ic-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
              </svg>
            </div>
            <div>
              <div class="lbl">Email</div>
              <div class="val"><a href="mailto:lesdiablotins29@orange.fr" style="color:inherit;">lesdiablotins29@orange.fr</a></div>
            </div>
          </div>

          <div class="info-row">
            <div class="ic-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
              </svg>
            </div>
            <div style="flex:1;">
              <div class="lbl">Horaires</div>
              <div class="hours-table" style="margin-top:8px;">
                {HOURS.map(({ day, hours, closed }) => (
                  <div class={`hrow${closed ? ' closed' : ''}`}>
                    <span class="day">{day}</span>
                    <span class="h">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href="https://www.google.com/maps/search/?api=1&query=50+rue+d%27Aiguillon+29200+Brest"
           target="_blank" rel="noreferrer noopener"
           class="btn btn--accent" style="align-self:flex-start;margin-top:4px;">
          Itinéraire
          <span class="arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
            </svg>
          </span>
        </a>
      </div>

      <!-- Contact form -->
      <div class="boutique-contact reveal" data-d="2">
        <form class="contact-form" id="contact-form" novalidate>
          <div class="cf-head">
            <span class="hand">Écrivez-nous —</span>
            <h3>Une question ? Une pointure&nbsp;?</h3>
            <p>On vous répond dans la journée, du mardi au samedi.</p>
          </div>

          <label class="cf-field">
            <span class="cf-lbl">Prénom &amp; Nom</span>
            <input type="text" name="name" required minlength="2" placeholder="Camille Le Goff" autocomplete="name" />
          </label>

          <div class="cf-row">
            <label class="cf-field">
              <span class="cf-lbl">Email</span>
              <input type="email" name="email" required placeholder="vous@exemple.fr" autocomplete="email" />
            </label>
            <label class="cf-field">
              <span class="cf-lbl">Téléphone <em>(optionnel)</em></span>
              <input type="tel" name="phone" placeholder="02 ·· ·· ·· ··" autocomplete="tel" />
            </label>
          </div>

          <label class="cf-field">
            <span class="cf-lbl">Votre message</span>
            <textarea name="message" rows="5" required minlength="10" placeholder="Bonjour, je cherche des premières chaussures pour mon enfant…"></textarea>
          </label>

          <div class="cf-actions">
            <button type="submit" class="btn btn--accent" id="cf-submit">
              <span id="cf-btn-text">Envoyer le message</span>
              <span class="arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
                </svg>
              </span>
            </button>
            <span class="cf-note">
              ou appelez-nous au <a href="tel:+33298462738"><strong>02 98 46 27 38</strong></a>
            </span>
          </div>
          <p class="cf-error" id="cf-error" role="alert"></p>
        </form>
      </div>

    </div>
  </div>
</section>

<script define:vars={{ formUrl }}>
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('cf-submit');
  const btnText = document.getElementById('cf-btn-text');
  const errorEl = document.getElementById('cf-error');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[\d\s.\-+()]*$/;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }
  function clearError() {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
  function setSubmitting(on) {
    submitBtn.disabled = on;
    btnText.textContent = on ? 'Envoi…' : 'Envoyer le message';
  }
  function resetForm() {
    form.reset();
    btnText.textContent = 'Message envoyé ✦';
    setTimeout(() => { btnText.textContent = 'Envoyer le message'; }, 4200);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const data = Object.fromEntries(new FormData(form));

    if (!data.name || data.name.trim().length < 2) {
      return showError('Prénom & Nom requis (min. 2 caractères).');
    }
    if (!EMAIL_RE.test(data.email)) {
      return showError('Adresse email invalide.');
    }
    if (data.phone && !PHONE_RE.test(data.phone)) {
      return showError('Numéro de téléphone invalide.');
    }
    if (!data.message || data.message.trim().length < 10) {
      return showError('Message requis (min. 10 caractères).');
    }

    setSubmitting(true);

    try {
      const res = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          message: data.message,
          destination: 'lesdiablotins29@orange.fr',
        }),
      });

      if (!res.ok) throw new Error(`Erreur serveur (${res.status})`);

      resetForm();
    } catch (err) {
      showError('Envoi impossible. Réessayez ou appelez-nous directement.');
    } finally {
      setSubmitting(false);
    }
  });
</script>
```

- [ ] **Commit**

```bash
git add src/components/Boutique.astro
git commit -m "feat(v3): add Boutique component with contact form"
```

---

## Task 14: Footer.astro

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Créer `src/components/Footer.astro`**

```astro
---
import Logo from './Logo.astro';
---
<footer>
  <div class="foot-top">
    <div class="foot-col">
      <Logo variant="multicolor" size={0.9} dark={true} />
      <p style="margin-top:18px;max-width:36ch;color:rgba(255,255,255,.7);font-size:15px;">
        Chausseur enfants à Brest depuis 2009. Du premier pas au lycée, du 19 au 40.
      </p>
    </div>
    <div class="foot-col">
      <h5>Navigation</h5>
      <a href="#marques">Nos marques</a>
      <a href="#categories">Catégories</a>
      <a href="#pourquoi">Pourquoi nous</a>
      <a href="#boutique">La boutique</a>
    </div>
    <div class="foot-col">
      <h5>La boutique</h5>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">50 rue d'Aiguillon</span>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">29200 Brest</span>
      <a href="tel:+33298462738">02 98 46 27 38</a>
      <a href="mailto:lesdiablotins29@orange.fr">lesdiablotins29@orange.fr</a>
    </div>
    <div class="foot-col">
      <h5>Marques</h5>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">Bellamy</span>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">babybotte</span>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">nörvik</span>
      <span style="display:block;margin-bottom:8px;font-size:15px;opacity:.85;">Kickers</span>
    </div>
  </div>
  <div class="foot-bottom">
    <div>© 2026 Les Diablotins · Tous droits réservés</div>
    <div style="display:flex;gap:24px;">
      <span>Mentions légales</span>
      <span>Confidentialité</span>
    </div>
  </div>
</footer>
```

- [ ] **Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(v3): add Footer component"
```

---

## Task 15: index.astro — composition finale

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Remplacer le contenu de `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import UtilBar from '../components/UtilBar.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import BrandWall from '../components/BrandWall.astro';
import Categories from '../components/Categories.astro';
import WhyUs from '../components/WhyUs.astro';
import Marquee from '../components/Marquee.astro';
import Boutique from '../components/Boutique.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <UtilBar />
  <Nav />
  <main>
    <Hero />
    <BrandWall />
    <Categories />
    <WhyUs />
    <Marquee />
    <Boutique />
  </main>
  <Footer />
</Layout>
```

- [ ] **Lancer le dev server et vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:4321` et vérifier :
- UtilBar noire en haut, adresse + horaires
- Nav sticky avec logo multicolor + liens + bouton CTA
- Hero : H1 Caprasimo, collage 3 photos rotées, HeritageStamp en bas-droite, 4 stats
- BrandWall : 4 cartes avec logos
- Categories : 3 cartes 3:4 + strip chaussons/bottes
- WhyUs : 4 raisons avec icônes
- Marquee rouge défilant
- Boutique : carte noire + formulaire
- Footer : 4 colonnes sombres
- Reveal : éléments apparaissent au scroll
- Responsive : réduire à 375px → vérifier que hero passe en 1 col, nav links masqués

- [ ] **Build de production**

```bash
npm run build
```

Expected : `dist/` créé sans erreurs.

- [ ] **Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(v3): compose full one-page site"
```

---

## Task 16: Vérifications finales & .env

**Files:**
- Verify: tous les fichiers créés

- [ ] **Vérifier l'accessibilité clavier** — Tab à travers la page, tous les liens/boutons/inputs reçoivent un focus-visible. Si focus-visible manque, ajouter dans `tokens.css` :

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

- [ ] **Vérifier `prefers-reduced-motion`** — dans DevTools, activer "Emulate CSS media feature prefers-reduced-motion: reduce", vérifier que le marquee s'arrête et les reveals n'animent pas.

- [ ] **Vérifier mobile 375px** — toutes les sections en 1 colonne, pas de scroll horizontal.

- [ ] **Créer `.env.development`** (non commité) pour tests locaux du formulaire :

```
PUBLIC_FORM_URL=http://localhost:3001/contact
```

Ajouter `.env.development` et `.env` au `.gitignore` :

```bash
echo ".env" >> .gitignore
echo ".env.development" >> .gitignore
```

- [ ] **Vérifier le build final**

```bash
npm run build && npm run preview
```

Ouvrir `http://localhost:4321` en preview mode — vérifier que tout fonctionne comme en dev.

- [ ] **Commit final**

```bash
git add .gitignore
git commit -m "feat(v3): final checks and env config"
```

---

## Spec coverage check

| Spec section | Tâche couverte |
|---|---|
| UtilBar (adresse, horaires, mobile) | Task 6 |
| Nav (sticky, blur, logo, liens, CTA) | Task 7 |
| Hero collage (h1, collage 3 photos, stamp, 4 stats) | Task 8 |
| BrandWall (4 marques, logos, hover) | Task 9 |
| Categories (3 cartes âge + types strip) | Task 10 |
| WhyUs (4 raisons, icônes) | Task 11 |
| Marquee (loop, reduced-motion) | Task 12 |
| Boutique (info, horaires, form, états) | Task 13 |
| Footer (4 colonnes, logo dark) | Task 14 |
| Design tokens CSS | Task 3 |
| Fonts (Caprasimo, Outfit, Caveat) | Task 4 |
| SEO (title, meta, OG, Schema.org) | Task 4 |
| IntersectionObserver reveal | Task 4 |
| Logo 3 variantes | Task 5 |
| Assets copiés | Task 2 |
| Form validation client + états | Task 13 |
| Responsive (4 breakpoints) | CSS dans Task 3 |
| focus-visible, a11y | Task 16 |
| prefers-reduced-motion | Task 3 (CSS) + Task 16 (vérif) |
