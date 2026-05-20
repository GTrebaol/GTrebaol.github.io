// hero.jsx — three hero layouts

const HeroCollage = () => (
  <section className="hero hero--collage">
    <div className="container hero-grid">
      <div className="hero-text">
        <span className="eyebrow reveal" data-d="1">Chausseur enfants · Brest · depuis 2009</span>
        <h1 className="reveal" data-d="2" style={{ marginTop: 18 }}>
          15 ans à chausser <br/>
          <span className="underline">les petits</span> <br/>
          <span className="accent">diables</span> <span className="hand" style={{verticalAlign:"middle"}}>♥</span>
        </h1>
        <p className="hero-sub reveal" data-d="3">
          Une boutique familiale au cœur de Brest où chaque pied trouve chaussure à son pied.
          Du premier pas au lycée, on mesure, on conseille, on bichonne — comme à la maison.
        </p>
        <div className="hero-cta reveal" data-d="4">
          <a href="#boutique" className="btn btn--accent">
            Venir nous voir <span className="arrow"><IconArrow size={18} stroke={2.2} /></span>
          </a>
          <a href="#marques" className="btn btn--ghost">Nos marques</a>
        </div>
        <div className="hero-meta reveal" data-d="5">
          <div className="mblock"><span className="mnum">15+</span><span className="mlbl">années</span></div>
          <div className="mblock"><span className="mnum">19 → 40</span><span className="mlbl">pointures</span></div>
          <div className="mblock"><span className="mnum">4</span><span className="mlbl">marques choisies</span></div>
          <div className="mblock"><span className="mnum">0 → 16</span><span className="mlbl">ans</span></div>
        </div>
      </div>
      <div className="collage reveal" data-d="3">
        <div className="horn-blob"></div>
        <div className="card c1"><img src="uploads/premiers-pas-1.webp" alt="chaussons bébé"/></div>
        <div className="card c2"><img src="uploads/junior-7.webp" alt="sneakers enfant"/></div>
        <div className="card c3"><img src="uploads/ado-1.webp" alt="bottines"/></div>
        <div className="sticker">
          <HeritageStamp size={128} />
        </div>
      </div>
    </div>
  </section>
);

const HeroEditorial = () => (
  <section className="hero hero--editorial">
    <div className="container">
      <span className="eyebrow reveal" data-d="1">Chausseur enfants · Brest · depuis 2009</span>
      <h1 className="reveal" data-d="2" style={{ marginTop: 16 }}>
        Diablo<span style={{ color: "var(--accent)" }}>tins</span>,
        <br/>
        <span style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>petits pieds.</span>
      </h1>
      <div className="editorial-side reveal" data-d="3">
        <div className="ph"><img src="uploads/premiers-pas-1.webp" alt="premiers pas"/></div>
        <div className="editorial-text">
          <p style={{ marginTop: 0 }}>
            On chausse les enfants de Brest depuis quinze ans. Les vrais premiers pas,
            les rentrées des classes, les cavalcades dans le quartier, les bottes du collège.
            Une boutique, quatre marques de confiance, et le bon conseil — toujours.
          </p>
          <div className="hero-cta">
            <a href="#boutique" className="btn btn--accent">
              Venir nous voir <span className="arrow"><IconArrow size={18} stroke={2.2}/></span>
            </a>
          </div>
        </div>
        <div className="ph ph-tall"><img src="uploads/junior-1.webp" alt="junior"/></div>
      </div>
    </div>
  </section>
);

const HeroStamp = () => (
  <section className="hero hero--stamp">
    <div className="container">
      <div className="stamp-wrap">
        <div className="reveal" data-d="1">
          <HeritageStamp size={180} />
        </div>
        <span className="eyebrow reveal" data-d="2">Chausseur enfants · Brest</span>
        <h1 className="reveal" data-d="3" style={{ maxWidth: "16ch" }}>
          On chausse les petits <span className="accent">diables</span> depuis 2009.
        </h1>
        <p className="hero-sub reveal" data-d="4">
          Une boutique familiale rue d'Aiguillon. On mesure le pied, on prend le temps,
          on choisit ce qui vous fera tenir la saison. Du 19 au 40.
        </p>
        <div className="hero-cta reveal" data-d="4">
          <a href="#boutique" className="btn btn--accent">
            Venir nous voir <span className="arrow"><IconArrow size={18} stroke={2.2}/></span>
          </a>
          <a href="#marques" className="btn btn--ghost">Nos marques</a>
        </div>
      </div>
      <div className="hero-strip reveal" data-d="5">
        <div className="ph"><img src="uploads/premiers-pas-2.webp" alt="bébé"/></div>
        <div className="ph"><img src="uploads/junior-2.webp" alt="bottes"/></div>
        <div className="ph"><img src="uploads/junior-5.webp" alt="sneakers"/></div>
        <div className="ph"><img src="uploads/ado-2.webp" alt="chelsea boots"/></div>
      </div>
    </div>
  </section>
);

const Hero = ({ variant = "collage" }) => {
  if (variant === "editorial") return <HeroEditorial />;
  if (variant === "stamp") return <HeroStamp />;
  return <HeroCollage />;
};

Object.assign(window, { Hero, HeroCollage, HeroEditorial, HeroStamp });
