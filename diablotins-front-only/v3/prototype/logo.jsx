// logo.jsx — three logo variations for "Les Diablotins"

// V1: wordmark with horns on the "d"
// V2: mascot + wordmark stacked
// V3: circular stamp/badge

const LogoWordmark = ({ size = 1, dark = false }) => {
  // size = scale factor relative to default 22px height
  const h = 38 * size;
  const inkVar = dark ? "var(--bg)" : "var(--ink)";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10 * size,
      lineHeight: 1, position: "relative",
    }}>
      {/* tiny imp head badge */}
      <div style={{ width: h * 1.05, height: h * 1.05, flex: "none" }}>
        <Diablotin size={h * 1.05} color="var(--accent)" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize: 10 * size,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: inkVar,
          opacity: .65,
          marginBottom: 2,
        }}>les</span>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: h * 0.7,
          color: inkVar,
          letterSpacing: "-0.02em",
        }}>
          diablot
          {/* the "i" with horns instead of dot */}
          <span style={{ position: "relative", display: "inline-block" }}>
            i
            <svg width={h * 0.32} height={h * 0.28}
                 viewBox="0 0 16 14" fill="none"
                 style={{
                   position: "absolute",
                   left: "50%",
                   top: -h * 0.18,
                   transform: "translateX(-50%)",
                 }}>
              <path d="M4 12c-1-5 0-9 2-11 1 4 1 7 3 11" fill="var(--accent)" stroke={inkVar} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 12c1-5 0-9-2-11-1 4-1 7-3 11" fill="var(--accent)" stroke={inkVar} strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </span>
          ns
        </span>
      </div>
    </div>
  );
};

// V2 — clean horizontal: imp dot + wordmark in a row
const LogoStacked = ({ size = 1, dark = false }) => {
  const inkVar = dark ? "var(--bg)" : "var(--ink)";
  const h = 44 * size;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 14 * size, lineHeight: 1,
    }}>
      <div style={{ flex: "none" }}>
        <Diablotin size={h} color="var(--accent)" />
      </div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: h * 0.66,
        color: inkVar,
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}>
        les diablotins
      </div>
    </div>
  );
};

// V3 — pure wordmark, multicolor letters (echo of the old logo, refined)
const LogoMulticolor = ({ size = 1, dark = false }) => {
  const h = 42 * size;
  const colors = [
    "var(--accent-4)",  // l (sky)
    "var(--accent-3)",  // e (sage)
    "var(--accent-2)",  // s (mustard)
    " ",                // space
    "var(--accent)",    // d (tomato)
    "var(--accent-4)",  // i
    "var(--accent-3)",  // a
    "var(--accent-2)",  // b
    "var(--accent)",    // l
    "var(--accent-4)",  // o
    "var(--accent-3)",  // t
    "var(--accent-2)",  // i
    "var(--accent)",    // n
    "var(--accent-4)",  // s
  ];
  const text = "les diablotins";
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "baseline",
      gap: 4,
      lineHeight: 1,
      fontFamily: "var(--font-display)",
      fontSize: h * 0.7,
      letterSpacing: "-0.01em",
    }}>
      {text.split("").map((ch, i) =>
        ch === " "
          ? <span key={i} style={{ width: h * 0.18 }}/>
          : <span key={i} style={{ color: colors[i], display: "inline-block" }}>{ch}</span>
      )}
    </div>
  );
};

const Logo = ({ variant = "wordmark", size = 1, dark = false }) => {
  if (variant === "stacked") return <LogoStacked size={size} dark={dark} />;
  if (variant === "multicolor") return <LogoMulticolor size={size} dark={dark} />;
  return <LogoWordmark size={size} dark={dark} />;
};

Object.assign(window, { Logo, LogoWordmark, LogoStacked, LogoMulticolor });
