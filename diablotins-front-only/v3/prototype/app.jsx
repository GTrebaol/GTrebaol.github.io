// app.jsx — root: nav + tweaks + composition

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "diablotin",
  "logoVariant": "multicolor",
  "heroVariant": "collage",
  "density": "regular",
  "btnShape": "soft",
  "noAnim": false
}/*EDITMODE-END*/;

const Nav = ({ logoVariant }) => (
  <>
    <div className="util">
      <div className="util-l">
        <span><IconPin size={14} stroke={2.4} style={{ verticalAlign: "-3px", marginRight: 6 }}/>50 rue d'Aiguillon, Brest</span>
        <span className="dot"></span>
        <span>02 98 46 27 38</span>
      </div>
      <div className="util-r">
        <span>Ouvert mardi–samedi · 10h–12h15 / 14h–19h</span>
        <span className="dot"></span>
        <span className="hand" style={{ fontSize: 18, color: "var(--accent-2)" }}>du 19 au 40 ✦</span>
      </div>
    </div>
    <nav className="nav">
      <a href="#top"><Logo variant={logoVariant} size={0.85}/></a>
      <div className="nav-links">
        <a href="#marques">Nos marques</a>
        <a href="#categories">Pour qui&nbsp;?</a>
        <a href="#pourquoi">Pourquoi nous</a>
        <a href="#boutique">La boutique</a>
      </div>
      <div className="nav-cta">
        <a href="#boutique" className="btn">
          Venir nous voir <span className="arrow"><IconArrow size={16} stroke={2.4}/></span>
        </a>
      </div>
    </nav>
  </>
);

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.dataset.palette = t.palette;
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.btnShape = t.btnShape;
    document.documentElement.dataset.noAnim = String(!!t.noAnim);
  }, [t.palette, t.density, t.btnShape, t.noAnim]);

  return (
    <>
      <Nav logoVariant={t.logoVariant}/>
      <Hero variant={t.heroVariant}/>
      <BrandWall />
      <Categories />
      <WhyUs />
      <Boutique />
      <Footer logoVariant={t.logoVariant} />

      <TweaksPanel>
        <TweakSection label="Couleurs"/>
        <TweakSelect label="Palette" value={t.palette}
                     options={[
                       { value: "diablotin", label: "Diablotin · vif" },
                       { value: "recre",     label: "Récré · candy" },
                       { value: "primaire",  label: "Primaire · Crayola" },
                       { value: "atelier",   label: "Atelier · doux" },
                     ]}
                     onChange={(v) => setTweak("palette", v)}/>

        <TweakSection label="Réglages"/>
        <TweakToggle label="Désactiver les animations" value={t.noAnim}
                     onChange={(v) => setTweak("noAnim", v)}/>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
