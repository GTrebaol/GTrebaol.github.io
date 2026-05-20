# Spec — Les Diablotins v3 : Site vitrine Astro

**Date** : 2026-05-17  
**Référence design** : `v3/prototype/` + `v3/README.md`  
**Stack cible** : Astro (statique) + CSS vanilla + vanilla JS

---

## Contexte

Site vitrine one-page pour Les Diablotins, chausseur enfants à Brest depuis 2009. Cible : parents/grands-parents cherchant chaussures qualité (0–16 ans, pointures 19–40). Ton : familial, artisanal, chaleureux.

Le prototype `v3/prototype/` est la référence de design haute fidélité (HTML + React + Babel, sans build). Ce spec décrit comment le porter en Astro.

---

## Architecture

```
v3/
├── public/
│   ├── uploads/          ← images + logos (copiés depuis prototype/uploads/)
│   └── icons/            ← icônes PNG (depuis v2/public/assets/icons/)
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── UtilBar.astro
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── BrandWall.astro
│   │   ├── Categories.astro
│   │   ├── WhyUs.astro
│   │   ├── Marquee.astro
│   │   ├── Boutique.astro
│   │   └── Footer.astro
│   ├── styles/
│   │   └── tokens.css
│   └── pages/
│       └── index.astro
├── astro.config.mjs
└── package.json
```

---

## Sections (ordre d'affichage)

1. **UtilBar** — bande noire 36px, adresse + tel gauche, horaires + "du 19 au 40 ✦" droite (masqué < 720px)
2. **Nav** — sticky, backdrop-blur, logo multicolor + liens + CTA "Venir nous voir →" (liens masqués < 900px)
3. **Hero (collage)** — grille 2 col, H1 Caprasimo 48–116px, collage 3 photos rotées, HeritageStamp sticker, 4 stats
4. **BrandWall** — 4 cartes marques (Bellamy, babybotte, nörvik, Kickers), grille 4→2 col
5. **Categories** — 3 cartes 3:4 par âge + strip 2 types (chaussons / bottes)
6. **WhyUs** — 4 raisons, grille 4→2→1 col, icônes PNG 64px
7. **Marquee** — bandeau défilant rouge, 6 items + séparateurs ✦
8. **Boutique** — info boutique (carte noire) + formulaire de contact
9. **Footer** — grille 4→2 col, logo + tagline + nav + adresse + marques

---

## Styles

### Approche
CSS vanilla uniquement. Les tokens et styles de `prototype/styles.css` sont portés intégralement dans `src/styles/tokens.css`. Import global dans `Layout.astro`.

Pas de Tailwind. Pas de CSS modules. Les classes du prototype (`.btn`, `.nav`, `.hero-grid`, etc.) sont réutilisées à l'identique.

### Tokens palette "Diablotin" (défaut)
```css
--bg: #FFF5DC; --bg-alt: #FFE6B5; --ink: #1F1A17; --ink-soft: #4A4138;
--muted: #9C8B73; --line: #F2DEB3; --accent: #FF4D3B; --accent-2: #FFC430;
--accent-3: #7DC264; --accent-4: #5EB4E3; --paper: #FFFFFF;
--font-display: "Caprasimo"; --font-body: "Outfit"; --font-hand: "Caveat";
```

Palettes alternatives (`atelier`, `recre`, `primaire`) portées via `[data-palette]` — présentes dans le CSS mais non exposées en UI prod (TweaksPanel non porté).

### Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Outfit:wght@300;400;500;600;700;800&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
```

---

## Logo

Trois variantes SVG inline dans un composant `Logo` (props : `variant`, `size`, `dark`) :
- **wordmark** — mascotte Diablotin + "diablotins" Caprasimo avec "i" cornes
- **stacked** — mascotte + wordmark horizontal
- **multicolor** — lettres colorées cycliques (défaut prod, header + footer)

SVGs portés depuis `prototype/logo.jsx` et `prototype/icons.jsx` en SVG statique Astro.

---

## Interactions & Animations

### Reveal scroll
`IntersectionObserver` dans un `<script>` global dans `Layout.astro`. Une fois visible, ajoute `.visible` sur `.reveal`. Délais staggered via `data-d="1..5"` → `animation-delay`.

```js
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
```

`@media (prefers-reduced-motion)` → `animation: none` sur `.reveal`.

### Marquee
CSS `@keyframes marquee` translateX(0 → -50%), 28s linear infinite. Contenu doublé pour loop seamless. Stoppé via `[data-no-anim="true"]` sur `<html>` (non exposé en prod, mais le CSS le supporte).

### Collage hover
CSS pur : `.card:hover { transform: rotate(0deg) translateY(-6px); z-index: 5; }`.

### Boutons stamp
Tous les `.btn` : hover → translate(-2px,-2px) + ombre 6px. Active → translate(2px,2px) + ombre 0.

---

## Formulaire de contact

### Composant
Dans `Boutique.astro`. HTML form standard, géré par `<script>` vanilla inline.

### États
- **idle** — bouton "Envoyer le message →"
- **submitting** — bouton disabled, texte "Envoi…"
- **success** — "Message envoyé ✦" pendant 4.2s, reset champs
- **error** — message rouge sous le bouton, champs conservés

### Validation client
- Nom : required, min 2 chars
- Email : required, pattern email
- Téléphone : optionnel, pattern français
- Message : required, min 10 chars

### Backend
POST vers `formToMail` (service existant dans `DEV/formToMail`, Express + nodemailer). URL configurée via variable d'environnement `PUBLIC_FORM_URL`. Destination : `lesdiablotins29@orange.fr`.

---

## Assets

### Images
Copiées depuis `prototype/uploads/` vers `public/uploads/` :
- Photos : `premiers-pas-1..6.webp`, `junior-1..8.webp`, `ado-1..5.webp`
- Logos : `bellamy.png`, `babybotte.png`, `norvik.png`, `kickers.svg`

### Icônes
Depuis `v2/public/assets/icons/` vers `public/icons/` :
- Used : `slippers.png`, `rain-boots.png`, `footprint-blue.png`, `customer-support.png`, `validation.png`, `alarm.png`

---

## SEO

Dans `Layout.astro` :
- `lang="fr"`
- `<title>Les Diablotins · Chausseur enfants à Brest depuis 2009</title>`
- Meta description : "Boutique de chaussures pour enfants à Brest depuis 2009. Premiers pas, juniors, ados — du 19 au 40. Conseil personnalisé, mesure du pied offerte."
- Open Graph basique (titre, description, type)
- Schema.org `LocalBusiness` (adresse, horaires, tel, email)

---

## Responsive

| Breakpoint | Changement |
|---|---|
| < 900px | Nav links masqués, hero 1 col, brands 2 col, why 2 col, boutique 1 col |
| < 760px | Footer 2 col |
| < 720px | UtilBar droite masquée |
| < 540px | Why 1 col, types-strip 1 col, form email+tel empilés |

---

## Ce qui n'est PAS porté

- **TweaksPanel** — outil de design seulement, hors prod
- **Variantes hero editorial/stamp** — collage uniquement
- **Palette switcher UI** — tokens alternatifs dans le CSS mais sans contrôle utilisateur
