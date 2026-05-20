# Handoff : Les Diablotins — Site vitrine

## Overview

Site vitrine pour **Les Diablotins**, un chausseur pour enfants à Brest (29) en activité depuis 2009. Le site présente la boutique, ses 4 marques partenaires, ses rayons par tranche d'âge, et permet aux familles de prendre contact ou de venir essayer en magasin.

Cible : parents et grands-parents de la région brestoise cherchant des chaussures de qualité pour des enfants de 0 à 16 ans (pointures 19 à 40).

Ton : familial, chaleureux, artisanal — pas corporate. Le langage visuel s'inspire des cahiers d'écoliers, des tampons de rentrée et des illustrations enfantines, tout en restant lisible et moderne.

## About the Design Files

Les fichiers fournis dans `prototype/` sont des **références de design réalisées en HTML/JSX** — un prototype illustrant l'apparence et le comportement attendus, **pas du code de production à recopier tel quel**.

L'environnement cible n'est pas fixé. Si le projet existe déjà (Next.js, Astro, Nuxt, SvelteKit…), recréez les écrans dans la stack existante en suivant ses conventions. Sinon, **Astro ou Next.js (App Router)** sont de bons choix pour un site vitrine quasi statique avec un formulaire de contact.

> Le prototype utilise React + Babel chargés via `<script>` pour un développement sans build. La version de production doit être bundlée correctement (Vite, Next.js, Astro, etc.) et SEO-friendly (rendu côté serveur recommandé — c'est un site vitrine local).

## Fidelity

**High-fidelity (hifi).** Couleurs, typographie, espacements, ombres, arrondis et interactions sont définitifs. Le développeur doit recréer l'UI au pixel près en utilisant les outils du codebase cible (Tailwind, CSS modules, vanilla CSS, etc.), mais la palette, la typo et le système visuel ne sont pas à réinventer.

## Stack & Architecture (recommandée)

- **Framework** : Astro ou Next.js (App Router) avec rendu statique. Le site n'a pas besoin de SSR dynamique.
- **Styles** : CSS variables pour les tokens (palette switchable), Tailwind ou CSS modules au choix.
- **Polices** : Google Fonts (Caprasimo, Outfit, Caveat).
- **Formulaire de contact** : à brancher sur un service léger (Formspree, Resend, ou une route API simple).
- **Images** : optimisation `<Image>` du framework, formats WebP/AVIF.
- **i18n** : tout est en français (FR uniquement).

## Pages & Sections

Le site est **mono-page** (one-pager) avec ancres internes. Sections dans l'ordre :

### 1. Barre utilitaire (`.util`)
Bande noire fine en haut de page.
- **Gauche** : pin + `50 rue d'Aiguillon, Brest` · point séparateur · `02 98 46 27 38`
- **Droite** : `Ouvert mardi–samedi · 10h–12h15 / 14h–19h` · point · *du 19 au 40 ✦* (en Caveat, jaune)
- Hauteur ~36px, fond `--ink`, texte `--bg`, font 12.5px.
- Sur mobile (< 720px), masquer la partie droite.

### 2. Navigation (`.nav`)
Sticky avec backdrop-blur, fond `--bg` à 88% d'opacité.
- Logo à gauche (variante "multicolor" par défaut, voir Logo)
- Liens centre : `Nos marques`, `Pour qui ?`, `Pourquoi nous`, `La boutique`
  - Hover : couleur `--accent` + soulignement animé (`scaleX` 0→1 depuis la gauche)
- CTA droite : bouton noir "Venir nous voir →"
- Sur mobile (< 900px), masquer les liens (à remplacer par un burger menu en prod)

### 3. Hero (`#top` / `.hero--collage`)
**Variante par défaut : collage.** Grille 2 colonnes (1.05fr / 0.95fr), gap responsive.

**Colonne gauche** :
- Eyebrow : "Chausseur enfants · Brest · depuis 2009" (12px, uppercase, letter-spacing .18em, avec une barre horizontale de 24×1px avant le texte)
- H1 (Caprasimo, clamp 48–116px, line-height .96, letter-spacing -.02em) sur 3 lignes :
  - `15 ans à chausser`
  - `les petits` (avec un surlignage jaune `--accent-2` à 55% d'opacité derrière, type Stabilo)
  - `diables ♥` (mot "diables" en `--accent`, cœur en Caveat, jaune)
- Sous-titre : 18px, `--ink-soft`, max-width 52ch
- 2 boutons : "Venir nous voir" (rouge, fond accent) + "Nos marques" (fantôme blanc)
- 4 stats horizontales en bas avec bordure haute en pointillés :
  - `15+` années
  - `19 → 40` pointures
  - `4` marques choisies
  - `0 → 16` ans
  - Chiffres en Caprasimo 34px, labels en Outfit 12px uppercase letter-spacing .12em

**Colonne droite (collage)** :
- 3 cartes photo qui se chevauchent, légèrement rotées :
  - c1 : 58% large, top 5%, rotation -3°
  - c2 : 46% large, top 0, right 0, rotation +2.5°
  - c3 : 50% large, bottom 0, left 22%, rotation +1.5°
- Coins arrondis `--radius` (14px), ombre douce
- Hover : la carte se redresse + monte (-6px), z-index 5
- Un blob radial `--accent-2` derrière en `z-index: -1`
- Un "sticker" tampon (`HeritageStamp`, 128px) en bas à droite, rotation -8°

Variantes alternatives existantes : `editorial` (typo géante) et `stamp` (badge centré). Ne pas implémenter sauf demande.

### 4. Brand Wall (`#marques`)
Grille de 4 cartes (responsive 4 → 2 sur < 900px).

Chaque marque (`Bellamy`, `babybotte`, `nörvik`, `Kickers`) :
- Carte fond `--paper`, bordure 1px `--line`, radius 14px, padding 28px 24px
- Logo en haut (hauteur 50–92px selon marque, contenu dans `object-fit: contain`, `object-position: left`)
- Catégorie en eyebrow (uppercase, letter-spacing .08em, `--muted`)
- Blurb (15px, `--ink-soft`)
- Pied : "Depuis 1933" en Caveat 22px `--accent` + flèche
- Hover : translation -4px, ombre 0 18px 40px -22px

**Logos à inclure** (dans `uploads/`) : `bellamy.png`, `babybotte.png`, `norvik.png`, `kickers.svg`.

Eyebrow de section : "Nos marques" · H2 : "Quatre maisons, *choisies une à une.*" (le second segment en italique, couleur `--ink-soft`).

### 5. Categories (`#categories`) — fond `--bg-alt`
**3 cartes d'âge** (grid 3 colonnes → 1 sur mobile) puis **1 strip "Types"** en dessous.

#### Cartes d'âge
Cartes 3:4, photo plein cadre, masque dégradé bas (`rgba(31,26,23,.78)` → transparent).
- **Premiers Pas** — 0 → 3 ans · pointures **19 → 23** · hint *"le tout premier pas"*
- **Juniors** — 3 → 10 ans · pointures **24 → 34** · hint *"école & aventures"*
- **Ados** — 10 → 16 ans · pointures **35 → 40** · hint *"style à eux"*

Sur chaque carte :
- Badge "Bébés · 19 → 23" en haut-gauche (pilule fond `--bg`, texte `--ink`, 12px uppercase)
- En bas : hint en Caveat `--accent-2` 28px + titre H3 38px blanc + tranche d'âge en Outfit 14px
- Bouton rond 44px (fond `--bg`, flèche) à droite
- Hover : la carte monte -6px, l'image zoome scale(1.04)

#### Strip "Types"
Deux cartes pleine largeur (grid `auto 1fr 1fr`) après les cartes d'âge :
- Lead : `<span class="hand">Aussi chez nous —</span>` en Caveat 32px `--ink-soft`
- **Chaussons** : fond jaune doux (`mix(--accent-2 22%, --paper)`), icône `slippers.png` dans cercle bordé, titre Caprasimo 22px, sous-titre 14px "Bellamy, du 19 au 35 — pour la maison et la crèche."
- **Bottes caoutchouc** : fond bleu ciel (`mix(--accent-4 22%, --paper)`), icône `rain-boots.png`, "Pour les flaques bretonnes — du 22 au 38."

Style des type-cards : bordure **2px solid --ink**, ombre offset **4px 4px 0 --ink**, hover translation -2px -2px + ombre 6px. Flèche dans rond noir à droite.

### 6. Why Us (`#pourquoi`)
Grille 4 colonnes (→ 2 → 1).

4 raisons, chacune dans une carte fond `--paper`, bordure `--line`, radius 14px :
1. **Mesure du pied** — icône `footprint-blue.png` dans bloc 88×88 fond `--bg-alt` radius 22px
2. **Conseil familial** — icône `customer-support.png`
3. **Marques choisies** — icône `validation.png`
4. **Depuis 2009** — icône `alarm.png`

Icônes 64×64. Titre H3 22px (Caprasimo). Body 15px `--ink-soft`.

### 7. Marquee (bandeau défilant)
Pleine largeur, fond `--accent`, texte blanc, padding 22px 0.
- Items en Caprasimo 34px : `"Mesure du pied offerte"`, `"Bellamy · babybotte · nörvik · Kickers"`, `"Du 19 au 40"`, `"Conseil personnalisé"`, `"Boutique familiale depuis 2009"`, `"50 rue d'Aiguillon · Brest"`
- Séparateur ✦ en `--accent-2` 30px
- Animation : `translateX(0)` → `translateX(-50%)` sur 28s linear infinite (dupliquer le contenu pour seamless loop)
- Respecter `prefers-reduced-motion` / désactivable via `[data-no-anim="true"]`

### 8. Boutique (`#boutique`)
Grille 2 colonnes (1.1fr / 0.9fr), gap clamp(28px, 4vw, 64px).

**Colonne gauche — `boutique-card`** : fond `--ink` (noir), texte clair, radius `--radius-lg` (26px), padding clamp(28px, 4vw, 48px).
- Titre H2 "Venir nous voir." en `--bg`
- 4 rangées d'info, chacune avec icône ronde 42px (fond `--bg` à 12%) + label uppercase + valeur :
  - 📍 Adresse : `50 rue d'Aiguillon` / `29200 Brest`
  - 📞 Téléphone : `02 98 46 27 38`
  - ✉️ Email : `lesdiablotins29@orange.fr`
  - 🕐 Horaires : tableau jour/heure
- Tableau horaires : ligne par jour, séparateur dashed semi-transparent, jours fermés en gris atténué
  - Lundi : 14h00 — 19h00
  - Mardi à Samedi : 10h00 — 12h15 · 14h00 — 19h00
  - Dimanche : Fermé
- Bouton "Itinéraire" (Google Maps deeplink) en bas

**Colonne droite — Formulaire de contact (`boutique-contact`)** : fond `--paper`, radius 26px, bordure `--line`, padding clamp(28px, 3.6vw, 44px).
- Header :
  - "Écrivez-nous —" en Caveat 28px `--accent`
  - H3 Caprasimo "Une question ? Une pointure ?"
  - P 15px `--ink-soft` : "On vous répond dans la journée, du mardi au samedi."
- Champs (gap 18px) :
  - **Prénom & Nom** — `input type="text"` required (placeholder "Camille Le Goff")
  - **Email** + **Téléphone (optionnel)** — sur 2 colonnes (1 colonne < 540px)
  - **Votre message** — `textarea` rows 5, min-height 124px, resize vertical
- Inputs : fond `--bg`, bordure 1.5px `--line`, radius 10px, padding 13px 16px, font 16px Outfit
  - Hover : bordure mix `--ink 35% --line`
  - **Focus** : fond `--paper`, bordure `--ink`, **`box-shadow: 3px 3px 0 --accent`** (signature visuelle — l'ombre offset rouge)
- Labels : uppercase 11px letter-spacing .16em font-weight 600 `--muted`
- Footer du form :
  - Bouton "Envoyer le message" (variante `btn--accent` = fond rouge, bordure noire 2px, ombre `4px 4px 0 --ink`)
  - À droite : "ou appelez-nous au **02 98 46 27 38**" (15px, le numéro souligné dashed)
- Sur submit : afficher "Message envoyé ✦" pendant 4.2s puis reset (en prod, brancher sur backend réel)

### 9. Footer
Fond `--ink`, texte `--bg`, padding 80px var(--pad-x) 28px.

Top : grille 4 colonnes (1.4fr / 1fr / 1fr / 1fr) → 2 sur mobile :
1. Logo (même variante que header) + tagline "Chausseur enfants à Brest depuis 2009. Du premier pas au lycée, du 19 au 40."
2. Navigation : Nos marques · Catégories · Pourquoi nous · La boutique
3. La boutique : adresse, téléphone, email
4. Marques : Bellamy, babybotte, nörvik, Kickers

Bottom : © 2026 Les Diablotins · Mentions légales · Confidentialité

## Logo (« Les Diablotins »)

Trois variantes (la **multicolor** est la version par défaut active sur le site) :

1. **`wordmark`** — wordmark "diablotins" en Caprasimo avec le "i" remplacé par deux petites cornes rouges (SVG inline), précédé d'un mini badge mascotte rouge.
2. **`stacked`** — mascotte (`Diablotin` SVG, cercle rouge avec yeux + sourire) + wordmark "les diablotins" en ligne.
3. **`multicolor`** — wordmark "les diablotins" lettre par lettre, chaque lettre dans une couleur cyclique des 4 accents : `--accent-4` (bleu), `--accent-3` (vert), `--accent-2` (jaune), `--accent` (rouge). Police Caprasimo, font-size = `42 * size * 0.7`, letter-spacing -.01em, gap 4px entre lettres.

**Important** : le footer doit utiliser la **même variante** que le header (props partagé). Le prototype expose `Logo({variant, size, dark})` — voir `logo.jsx`.

Le SVG mascotte `Diablotin` est défini dans `icons.jsx` : cercle rouge ~46r, deux cornes en pointes au-dessus, deux yeux noirs, sourire.

## Design Tokens

### Couleurs — Palette par défaut "Diablotin" (vive & enfantine)

| Token         | Hex      | Usage                                    |
|---------------|----------|------------------------------------------|
| `--bg`        | `#FFF5DC`| Fond principal (crème chaud)             |
| `--bg-alt`    | `#FFE6B5`| Fond alterné des sections (Categories)   |
| `--ink`       | `#1F1A17`| Texte principal, bordures fortes         |
| `--ink-soft`  | `#4A4138`| Texte secondaire                         |
| `--muted`     | `#9C8B73`| Labels, métadonnées                      |
| `--line`      | `#F2DEB3`| Bordures, séparateurs                    |
| `--accent`    | `#FF4D3B`| **Tomate punch** — CTA, marquee, "diables" |
| `--accent-2`  | `#FFC430`| **Soleil** — highlights, surlignages     |
| `--accent-3`  | `#7DC264`| **Pré** — détails verts                  |
| `--accent-4`  | `#5EB4E3`| **Ciel** — détails bleus                 |
| `--accent-5`  | `#C879D6`| **Bubblegum** — accent secondaire        |
| `--paper`     | `#FFFFFF`| Cartes blanches                          |

### Palettes alternatives (proposées comme tweaks)

- **Récré · candy** : `#FFF1F4` bg, `#FF5C8A` accent (rose), `#FFB42B` jaune, `#5BCBA0` vert, `#6FB3D9` bleu, encre `#3D2147` (violet sombre).
- **Primaire · Crayola** : `#FFFDF5` bg, `#FF3A2D`, `#FFD23F`, `#3FBF6B`, `#3CA7E0` (très saturés).
- **Atelier · doux** : `#F5EFE5` bg, `#A3422E`, `#C97B3E`, `#6E6A4A`, `#7E6A4C` (terre cuite, plus sobre).

Implémenter via `[data-palette="..."]` sur `<html>` ou variables CSS scopées. En prod, on peut simplement garder la palette "Diablotin" par défaut sauf si l'option de switcher est conservée.

### Typographie

| Famille                       | Usage                                     | Google Fonts                                             |
|-------------------------------|-------------------------------------------|----------------------------------------------------------|
| **Caprasimo** (display)       | H1, H2, H3, H4, chiffres stat, marquee    | `Caprasimo:wght@400`                                     |
| **Outfit** (body)             | Texte courant, boutons, labels, inputs    | `Outfit:wght@300;400;500;600;700;800`                    |
| **Caveat** (hand)             | Accents manuscrits, signatures            | `Caveat:wght@500;700`                                    |

```html
<link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Outfit:wght@300;400;500;600;700;800&family=Caveat:wght@500;700&display=swap" rel="stylesheet">
```

**Échelles** :
- H1 : `clamp(48px, 8vw, 116px)` / line-height .96 / letter-spacing -.02em
- H2 : `clamp(36px, 5vw, 72px)` / 1.02
- H3 : `clamp(24px, 2.4vw, 34px)` / 1.1
- Body : 17px / 1.55
- Eyebrow : 12px uppercase letter-spacing .18em
- `.hand` : font-family Caveat, taille 1.4em du contexte, couleur `--accent`

### Espacement & rayons

- `--pad-x` : `clamp(20px, 5vw, 72px)` — padding horizontal des conteneurs
- `--section-y` : `clamp(72px, 9vw, 140px)` — espacement vertical des sections
- `--radius-sm` : 8px · `--radius` : 14px · `--radius-lg` : 26px · `--radius-pill` : 999px

### Ombres signature

- **Stamp shadow** : `box-shadow: 4px 4px 0 --ink` (boutons primaires, type-cards, focus rings)
- **Stamp shadow large** : `6px 6px 0 --ink` (hover des boutons)
- **Stamp shadow accent** : `3px 3px 0 --accent` (focus des inputs)
- **Soft shadow** : `0 24px 60px -22px rgba(31,26,23,.35)` (collage cards)
- **Card hover** : `0 18px 40px -22px rgba(31,26,23,.3)`

### Transitions

- `--t-fast` : `.18s cubic-bezier(.4,0,.2,1)` (hover, focus, micro-interactions)
- `--t-med`  : `.35s cubic-bezier(.4,0,.2,1)` (cartes, images, layouts)

## Boutons

```
.btn          → fond --ink, texte --bg, bordure 2px --ink, ombre 4px 4px 0 --ink
.btn:hover    → translate(-2px,-2px), ombre 6px 6px 0 --ink, fond --accent
.btn:active   → translate(2px,2px), ombre 0
.btn--ghost   → fond --paper, texte --ink (sinon idem)
.btn--accent  → fond --accent, texte blanc
```

Toujours afficher une petite flèche `→` (icône stroke) à droite ; au hover, elle translate +4px.

## Interactions & Animations

- **Reveal au scroll** : tous les blocs principaux ont `.reveal` (opacity 0 → 1, translateY 14px → 0, 0.8s cubic-bezier(.2,.7,.2,1)). Délais staggered via `data-d="1..5"` (0.05s, 0.12s, 0.20s, 0.28s, 0.36s). En prod, déclencher via IntersectionObserver une seule fois par élément.
- **Marquee** : `translateX(0 → -50%)` linear infinite 28s, dupliquer le contenu pour boucle continue.
- **Collage hover** : cartes individuelles → `rotate(0deg) translateY(-6px)` + z-index 5.
- **Underline jaune du H1** : pseudo-élément `::after` positionné en bas du span, `height: 14px`, fond `--accent-2`, opacity .55, z-index -1.
- **Stamp shadow press** : tous les boutons à ombre offset ont l'effet appui (translate vers l'ombre + ombre disparaît).
- **Respect `prefers-reduced-motion`** : désactiver marquee et reveal.

## Formulaire de contact — Validation & Backend

Champs et règles :
- **Nom** : required, min 2 caractères
- **Email** : required, regex email standard
- **Téléphone** : optionnel, accepter formats français (espaces, points, tirets autorisés)
- **Message** : required, min 10 caractères

États à gérer :
- **Idle** (par défaut)
- **Submitting** : disable le bouton, afficher "Envoi…"
- **Success** : afficher "Message envoyé ✦" pendant 4.2s, reset les champs
- **Error** : afficher un message rouge sous le bouton, conserver les champs

Backend suggéré : **Resend** ou **Formspree** pour la simplicité (pas besoin de DB). L'email est envoyé à `lesdiablotins29@orange.fr`.

## Responsive

| Breakpoint | Changement |
|------------|------------|
| < 900px    | Nav links cachés (à remplacer par burger en prod), brand wall en 2 colonnes, why en 2 colonnes, hero en 1 colonne, boutique en 1 colonne |
| < 760px    | Footer en 2 colonnes |
| < 720px    | Util-bar : masquer la partie droite |
| < 540px    | Why en 1 colonne, type-strip en 1 colonne, cf-row (email/téléphone) empilés |

Le site doit rester confortable jusqu'à 360px de large.

## Assets

Dans `prototype/uploads/` :

**Photos** (à remplacer par vraies photos de la boutique en prod — actuellement des photos stock) :
- `premiers-pas-1..6.webp`
- `junior-1..8.webp`
- `ado-1..5.webp`
- `diablotins.jpg` (devanture / non utilisée actuellement)

**Logos marques** :
- `bellamy.png`
- `babybotte.png`
- `norvik.png`
- `kickers.svg`

**Icônes** (illustrations enfantines en PNG, style Flaticon-like — à remplacer en prod par des SVG redessinés si possible pour cohérence et performance) :
- `slippers.png`, `rain-boots.png` (types)
- `footprint-blue.png`, `customer-support.png`, `validation.png`, `alarm.png` (why us)
- `sneakers.png`, `shoes.png`, `letter*.png`, `phone-call.png`, etc. (disponibles, non utilisés actuellement)

Origine : photos stock libres + assets icônes type Flaticon. **À valider/remplacer pour la prod** : vraies photos de la boutique et icônes propres.

## SEO & Accessibilité

- Lang : `fr`, titre : "Les Diablotins · Chausseur enfants à Brest depuis 2009"
- Meta description : courte, mentionnant Brest, chaussures enfants, premiers pas
- Open Graph : à ajouter pour partages sociaux
- Schema.org `LocalBusiness` recommandé (adresse, horaires, téléphone)
- Tous les `<img>` ont des `alt` ; les boutons sans texte ont `aria-label`
- Contraste : tous les couples (texte/fond) testés AA. Le rouge sur jaune/crème doit être validé pour les CTA (utiliser blanc sur rouge).
- Navigation clavier : focus-visible sur tous les liens/boutons/inputs

## Fichiers du prototype

Dans `prototype/` :
- `index.html` — entrée, charge React + Babel + scripts
- `app.jsx` — composant racine, panneau Tweaks, défauts
- `hero.jsx` — 3 variantes de hero (collage / editorial / stamp)
- `sections.jsx` — BrandWall, Categories (+ Types), WhyUs, Marquee, Boutique (+ ContactForm), Footer
- `logo.jsx` — 3 variantes de logo (wordmark / stacked / multicolor)
- `icons.jsx` — Icônes SVG (Arrow, Pin, Phone, Mail, Clock, Diablotin mascot, HeritageStamp…)
- `tweaks-panel.jsx` — panneau de tweaks (à **ne pas porter** en prod, c'est uniquement pour l'exploration design)
- `styles.css` — design tokens + tous les styles
- `uploads/` — assets images et logos

## Pour démarrer (Claude Code)

1. Ouvrir le prototype en local : `npx serve prototype/` puis aller sur `http://localhost:3000`. Naviguer pour comprendre le langage visuel.
2. Choisir une stack (Astro recommandé pour ce type de site) et scaffolder le projet.
3. Importer les polices Google Fonts dans le layout.
4. Créer un fichier de tokens (`tokens.css` ou Tailwind config) avec **la palette "Diablotin" par défaut** et les autres palettes accessibles via `[data-palette]` si on garde le switcher.
5. Implémenter section par section dans l'ordre du fichier. Le contact form est la seule pièce qui demande du backend.
6. Brancher l'envoi du formulaire (Resend/Formspree) avec validation côté client + serveur.
7. Optimiser les images (formats modernes, lazy loading hors hero).
8. Ajouter le Schema.org `LocalBusiness` pour le SEO local.

Bon dev ✦
