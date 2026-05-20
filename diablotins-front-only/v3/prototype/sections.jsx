// sections.jsx — brand wall, categories, why-us, boutique, marquee, footer

// ─────────────────────────────────────────────
// Brand Wall
// ─────────────────────────────────────────────
const BRANDS = [
  {
    name: "Bellamy",
    logo: "uploads/bellamy.png",
    logoH: 54,
    cat: "Premiers pas · Chaussons",
    blurb: "Fabriqué en France. Le chausson qui accompagne les tout premiers pas, depuis trois générations.",
    since: "Made in France",
  },
  {
    name: "babybotte",
    logo: "uploads/babybotte.png",
    logoH: 50,
    cat: "Souliers premiers pas",
    blurb: "L'expertise française des premiers pas — cuirs souples et conseils de podologue.",
    since: "Depuis 1933",
  },
  {
    name: "nörvik",
    logo: "uploads/norvik.png",
    logoH: 92,
    cat: "Ados · Style affirmé",
    blurb: "Du caractère pour les pieds qui poussent — bottines, baskets montantes, modèles affirmés.",
    since: "Children's shoes",
  },
  {
    name: "Kickers",
    logo: "uploads/kickers.svg",
    logoH: 32,
    cat: "Icône de cour de récré",
    blurb: "L'icône de la rentrée scolaire. La Kick Lo, encore et toujours — du CP au lycée.",
    since: "Depuis 1970",
  },
];

const BrandWall = () => (
  <section id="marques">
    <div className="container">
      <div className="s-head reveal">
        <div>
          <span className="eyebrow">Nos marques</span>
          <h2 style={{ marginTop: 14 }}>Quatre maisons, <br/><em style={{fontStyle:"italic", color:"var(--ink-soft)"}}>choisies une à une.</em></h2>
        </div>
        <p className="s-intro">
          On ne vend pas tout. On choisit les maisons en qui on a confiance — fabrication soignée,
          tailles cohérentes, et des modèles qui tiennent la saison.
        </p>
      </div>
      <div className="brands">
        {BRANDS.map((b, i) => (
          <div key={b.name} className={"brand-card reveal" + (b.feat ? " feat" : "")} data-d={i+1}>
            <div className="brand-mark">
              <img src={b.logo} alt={b.name}
                   style={{ height: b.logoH, maxWidth: "100%", objectFit: "contain", objectPosition: "left center" }} />
            </div>
            <h4>{b.cat}</h4>
            <p className="blurb">{b.blurb}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto", paddingTop: 10 }}>
              <span className="since" style={ b.feat ? { color: "var(--accent-2)" } : {} }>{b.since}</span>
              <span style={{ color: b.feat ? "rgba(255,255,255,.6)" : "var(--muted)" }}>
                <IconArrow size={20} stroke={2}/>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Categories (Premiers pas / Juniors / Ados)
// ─────────────────────────────────────────────
const CATS = [
  {
    id: "premiers-pas",
    title: "Premiers Pas",
    range: "0 → 3 ans",
    sizes: "19 → 23",
    hint: "le tout premier pas",
    img: "uploads/premiers-pas-1.webp",
    tag: "Bébés",
  },
  {
    id: "juniors",
    title: "Juniors",
    range: "3 → 10 ans",
    sizes: "24 → 34",
    hint: "école & aventures",
    img: "uploads/junior-1.webp",
    tag: "Enfants",
  },
  {
    id: "ados",
    title: "Ados",
    range: "10 → 16 ans",
    sizes: "35 → 40",
    hint: "style à eux",
    img: "uploads/ado-1.webp",
    tag: "Ados",
  },
];

const Categories = () => (
  <section id="categories" style={{ background: "var(--bg-alt)" }}>
    <div className="container">
      <div className="s-head reveal">
        <div>
          <span className="eyebrow">Pour qui ?</span>
          <h2 style={{ marginTop: 14 }}>Du premier pas <br/><em style={{fontStyle:"italic", color:"var(--ink-soft)"}}>au lycée.</em></h2>
        </div>
        <p className="s-intro">
          Plusieurs âges, une seule manière de faire&nbsp;: prendre le temps, mesurer le pied,
          essayer plusieurs paires, et trouver la bonne. Toujours du 19 au 40.
        </p>
      </div>
      <div className="cats">
        {CATS.map((c, i) => (
          <a key={c.id} href={"#" + c.id} className="cat-card reveal" data-d={i+1}>
            <img src={c.img} alt={c.title}/>
            <span className="age-tag">{c.tag} · {c.sizes}</span>
            <div className="cat-mask"></div>
            <div className="cat-meta">
              <div>
                <span className="range">— {c.hint}</span>
                <h3>{c.title}</h3>
                <div style={{ fontFamily:"var(--font-body)", fontSize: 14, opacity: .8, marginTop: 6 }}>
                  {c.range}
                </div>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "var(--bg)", color: "var(--ink)",
                display: "grid", placeItems: "center", flex: "none",
              }}>
                <IconArrow size={20} stroke={2.2}/>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="types-strip reveal" data-d="4">
        <span className="types-lead"><span className="hand">Aussi chez nous —</span></span>
        <a href="#chaussons" className="type-card type-card--chaussons">
          <div className="type-ic"><img src="uploads/slippers.png" alt=""/></div>
          <div className="type-body">
            <h4>Chaussons</h4>
            <p>Bellamy, du 19 au 35 — pour la maison et la crèche.</p>
          </div>
          <span className="type-arrow"><IconArrow size={18} stroke={2.2}/></span>
        </a>
        <a href="#bottes" className="type-card type-card--bottes">
          <div className="type-ic"><img src="uploads/rain-boots.png" alt=""/></div>
          <div className="type-body">
            <h4>Bottes caoutchouc</h4>
            <p>Pour les flaques bretonnes — du 22 au 38.</p>
          </div>
          <span className="type-arrow"><IconArrow size={18} stroke={2.2}/></span>
        </a>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Marquee strip
// ─────────────────────────────────────────────
const Marquee = () => {
  const items = [
    "Mesure du pied offerte",
    "Bellamy · babybotte · nörvik · Kickers",
    "Du 19 au 40",
    "Conseil personnalisé",
    "Boutique familiale depuis 2009",
    "50 rue d'Aiguillon · Brest",
  ];
  // duplicate for seamless loop
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="star">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Why us
// ─────────────────────────────────────────────
const REASONS = [
  {
    icon: "uploads/footprint-blue.png",
    title: "Mesure du pied",
    body: "On mesure chaque pied avant d'essayer. C'est gratuit, ça prend deux minutes, et ça change tout.",
  },
  {
    icon: "uploads/customer-support.png",
    title: "Conseil familial",
    body: "Quinze ans à voir grandir les enfants du quartier. On connaît les bonnes pointures et les bonnes idées.",
  },
  {
    icon: "uploads/validation.png",
    title: "Marques choisies",
    body: "Bellamy fabriqué en France, babybotte maison historique. On choisit la qualité, pas la quantité.",
  },
  {
    icon: "uploads/alarm.png",
    title: "Depuis 2009",
    body: "Plus de quinze ans dans la même rue. Les enfants reviennent, et ramènent leurs enfants.",
  },
];

const WhyUs = () => (
  <section id="pourquoi">
    <div className="container">
      <div className="s-head reveal">
        <div>
          <span className="eyebrow">Pourquoi venir nous voir</span>
          <h2 style={{ marginTop: 14 }}>Le bon conseil, <br/><em style={{fontStyle:"italic", color:"var(--ink-soft)"}}>en vrai.</em></h2>
        </div>
        <p className="s-intro">
          Acheter une paire pour son enfant, c'est plus qu'une transaction. C'est un moment.
          On le prend au sérieux — sans se prendre au sérieux.
        </p>
      </div>
      <div className="why">
        {REASONS.map((r, i) => (
          <div key={r.title} className="why-item reveal" data-d={i+1}>
            <div className="ic">
              <img src={r.icon} alt="" width="72" height="72" />
            </div>
            <h3>{r.title}</h3>
            <p>{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Boutique / store info
// ─────────────────────────────────────────────
const HOURS = [
  ["Lundi",    "14h00 — 19h00"],
  ["Mardi",    "10h00 — 12h15 · 14h00 — 19h00"],
  ["Mercredi", "10h00 — 12h15 · 14h00 — 19h00"],
  ["Jeudi",    "10h00 — 12h15 · 14h00 — 19h00"],
  ["Vendredi", "10h00 — 12h15 · 14h00 — 19h00"],
  ["Samedi",   "10h00 — 12h15 · 14h00 — 19h00"],
  ["Dimanche", "Fermé"],
];

const ContactForm = () => {
  const [state, setState] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (e) => setState((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4200);
    setState({ name: "", email: "", phone: "", message: "" });
  };
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="cf-head">
        <span className="hand">Écrivez-nous —</span>
        <h3>Une question ? Une pointure&nbsp;?</h3>
        <p>On vous répond dans la journée, du mardi au samedi.</p>
      </div>

      <label className="cf-field">
        <span className="cf-lbl">Prénom &amp; Nom</span>
        <input type="text" required value={state.name} onChange={set("name")}
               placeholder="Camille Le Goff"/>
      </label>

      <div className="cf-row">
        <label className="cf-field">
          <span className="cf-lbl">Email</span>
          <input type="email" required value={state.email} onChange={set("email")}
                 placeholder="vous@exemple.fr"/>
        </label>
        <label className="cf-field">
          <span className="cf-lbl">Téléphone <em>(optionnel)</em></span>
          <input type="tel" value={state.phone} onChange={set("phone")}
                 placeholder="02 ·· ·· ·· ··"/>
        </label>
      </div>

      <label className="cf-field">
        <span className="cf-lbl">Votre message</span>
        <textarea rows="5" required value={state.message} onChange={set("message")}
                  placeholder="Bonjour, je cherche des premières chaussures pour mon enfant…"/>
      </label>

      <div className="cf-actions">
        <button type="submit" className="btn btn--accent">
          {sent ? "Message envoyé ✦" : "Envoyer le message"}
          <span className="arrow"><IconArrow size={18} stroke={2.2}/></span>
        </button>
        <span className="cf-note">
          ou appelez-nous au <a href="tel:+33298462738"><strong>02 98 46 27 38</strong></a>
        </span>
      </div>
    </form>
  );
};

const Boutique = () => (
  <section id="boutique">
    <div className="container">
      <div className="s-head reveal" style={{ marginBottom: 36 }}>
        <div>
          <span className="eyebrow">La boutique</span>
          <h2 style={{ marginTop: 14 }}>50 rue d'Aiguillon, <br/><em style={{fontStyle:"italic", color:"var(--ink-soft)"}}>Brest.</em></h2>
        </div>
        <p className="s-intro">
          On vous accueille du mardi au samedi en plein centre. Une visite vaut mille photos —
          venez essayer, on a toujours un café pour les parents et un sourire pour les enfants.
        </p>
      </div>
      <div className="boutique-grid">
        <div className="boutique-card reveal" data-d="1">
          <h2>Venir nous voir.</h2>
          <div className="info-rows">
            <div className="info-row">
              <div className="ic-circle"><IconPin size={18} stroke={2}/></div>
              <div>
                <div className="lbl">Adresse</div>
                <div className="val">50 rue d'Aiguillon<br/>29200 Brest</div>
              </div>
            </div>
            <div className="info-row">
              <div className="ic-circle"><IconPhone size={18} stroke={2}/></div>
              <div>
                <div className="lbl">Téléphone</div>
                <div className="val">02 98 46 27 38</div>
              </div>
            </div>
            <div className="info-row">
              <div className="ic-circle"><IconMail size={18} stroke={2}/></div>
              <div>
                <div className="lbl">Email</div>
                <div className="val">lesdiablotins29@orange.fr</div>
              </div>
            </div>
            <div className="info-row">
              <div className="ic-circle"><IconClock size={18} stroke={2}/></div>
              <div style={{ flex: 1 }}>
                <div className="lbl">Horaires</div>
                <div className="hours-table" style={{ marginTop: 8 }}>
                  {HOURS.map(([d, h]) => (
                    <div key={d} className={"hrow" + (h === "Fermé" ? " closed" : "")}>
                      <span className="day">{d}</span>
                      <span className="h">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=50+rue+d'Aiguillon+29200+Brest"
             target="_blank" rel="noreferrer"
             className="btn btn--accent" style={{ alignSelf: "flex-start", marginTop: 4 }}>
            Itinéraire <span className="arrow"><IconArrow size={18} stroke={2.2}/></span>
          </a>
        </div>
        <div className="boutique-contact reveal" data-d="2">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
const Footer = ({ logoVariant = "multicolor" }) => (
  <footer>
    <div className="foot-top">
      <div className="foot-col">
        <Logo variant={logoVariant} size={0.9} dark={true}/>
        <p style={{ marginTop: 18, maxWidth: 36 + "ch", color: "rgba(255,255,255,.7)", fontSize: 15 }}>
          Chausseur enfants à Brest depuis 2009. Du premier pas au lycée, du 19 au 40.
        </p>
      </div>
      <div className="foot-col">
        <h5>Navigation</h5>
        <a href="#marques">Nos marques</a>
        <a href="#categories">Catégories</a>
        <a href="#pourquoi">Pourquoi nous</a>
        <a href="#boutique">La boutique</a>
      </div>
      <div className="foot-col">
        <h5>La boutique</h5>
        <a>50 rue d'Aiguillon</a>
        <a>29200 Brest</a>
        <a>02 98 46 27 38</a>
        <a>lesdiablotins29@orange.fr</a>
      </div>
      <div className="foot-col">
        <h5>Marques</h5>
        <a>Bellamy</a>
        <a>babybotte</a>
        <a>nörvik</a>
        <a>Kickers</a>
      </div>
    </div>
    <div className="foot-bottom">
      <div>© 2026 Les Diablotins · Tous droits réservés</div>
      <div style={{ display: "flex", gap: 24 }}>
        <a>Mentions légales</a>
        <a>Confidentialité</a>
      </div>
    </div>
  </footer>
);

Object.assign(window, { BrandWall, Categories, Marquee, WhyUs, Boutique, Footer });
