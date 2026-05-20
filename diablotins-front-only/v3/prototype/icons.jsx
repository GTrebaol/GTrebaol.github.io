// icons.jsx — original SVG icons + the "diablotin" mascot

const Icon = ({ children, size = 24, stroke = 1.8, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);

// utility line icons
const IconPin = (p) => (
  <Icon {...p}><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></Icon>
);
const IconPhone = (p) => (
  <Icon {...p}><path d="M5.5 4h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z"/></Icon>
);
const IconMail = (p) => (
  <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>
);
const IconClock = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>
);
const IconArrow = (p) => (
  <Icon {...p}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></Icon>
);
const IconStar = (p) => (
  <Icon {...p}><path d="m12 3 2.6 5.6L20.5 9.5l-4.4 4 1.1 6L12 16.8 6.8 19.5l1.1-6-4.4-4 5.9-.9Z"/></Icon>
);
const IconHeart = (p) => (
  <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></Icon>
);
const IconMenu = (p) => (
  <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>
);

// illustrative "kawaii-style" icons (filled, colorful)
// each uses CSS vars so they recolor per palette
const IllusFoot = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="40" rx="18" ry="14" fill="var(--accent-2)"/>
    <ellipse cx="32" cy="38" rx="16" ry="12" fill="var(--bg)"/>
    {/* sole outline */}
    <path d="M16 38c0-9 7-16 16-16s16 7 16 16c0 7-7 12-16 12s-16-5-16-12Z" stroke="var(--ink)" strokeWidth="2" fill="none"/>
    {/* toes */}
    <circle cx="22" cy="22" r="3.4" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.6"/>
    <circle cx="28" cy="18" r="3" fill="var(--accent-3)" stroke="var(--ink)" strokeWidth="1.6"/>
    <circle cx="34" cy="17" r="2.8" fill="var(--accent-4)" stroke="var(--ink)" strokeWidth="1.6"/>
    <circle cx="40" cy="19" r="2.6" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="1.6"/>
    <circle cx="45" cy="22" r="2.4" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.6"/>
    {/* ruler tick marks across the foot */}
    <g stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round">
      <path d="M19 44h2M24 44h2M29 44h2M34 44h2M39 44h2M44 44h2"/>
    </g>
  </svg>
);

const IllusHeart = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* hand */}
    <path d="M14 36c0-2 1-3 3-3l5 .5V20c0-2 3-2 3 0v11l3 .2V18c0-2 3-2 3 0v13l3 .3V20c0-2 3-2 3 0v12l2-2c2-1.5 4 .5 3 2.5l-4 7c-1 2-3 4-7 4h-7c-4 0-7-3-7-7Z"
          fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round"/>
    {/* heart in hand */}
    <path d="M40 12c-2 0-3.5 1.5-4 3-0.5-1.5-2-3-4-3-2.5 0-4.5 2-4.5 4.5C27.5 21 36 26 36 26s8.5-5 8.5-9.5C44.5 14 42.5 12 40 12Z"
          fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const IllusFlag = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* pole */}
    <path d="M18 10v44" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"/>
    <circle cx="18" cy="10" r="3" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="1.8"/>
    {/* flag tricolor (FR) */}
    <g stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="20" y="12" width="9" height="22" fill="var(--accent-4)"/>
      <rect x="29" y="12" width="9" height="22" fill="var(--bg)"/>
      <rect x="38" y="12" width="9" height="22" fill="var(--accent)"/>
    </g>
    {/* little wave at base of pole */}
    <path d="M12 50c4-2 8-2 12 0s8 2 12 0 8-2 12 0" stroke="var(--accent-3)" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
  </svg>
);

const IllusCalendar = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="10" y="14" width="44" height="40" rx="6" fill="var(--accent-3)" stroke="var(--ink)" strokeWidth="2"/>
    <rect x="10" y="14" width="44" height="11" rx="6" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2"/>
    <path d="M20 10v8M44 10v8" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round"/>
    {/* the "15" */}
    <text x="32" y="46" textAnchor="middle"
          fontFamily="Caprasimo, Georgia, serif" fontSize="18" fill="var(--bg)">15</text>
    {/* stars */}
    <path d="m48 32 1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L45 34.3 47 34Z" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="1.2"/>
    <path d="m16 36 .8 1.6 1.7.3-1.2 1.1.3 1.6-1.5-.8-1.5.8.3-1.6-1.2-1.1 1.7-.3Z" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1"/>
  </svg>
);

// brand "marks" — wordmarks since we don't have logos
const BrandMark = ({ name, color }) => (
  <div style={{
    fontFamily: "var(--font-display)",
    fontSize: 30,
    color: color || "var(--ink)",
    letterSpacing: "-0.01em",
    lineHeight: 1,
  }}>{name}</div>
);

// the diablotin imp mascot — friendly, smiling, two little soft horns
const Diablotin = ({ size = 80, color, eyes = true }) => {
  const main = color || "var(--accent)";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* horns */}
      <path d="M22 18c-1-6 0-12 4-14 1 5 2 9 5 14" fill={main} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M58 18c1-6 0-12-4-14-1 5-2 9-5 14" fill={main} stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      {/* head */}
      <path d="M14 38c0-13 12-22 26-22s26 9 26 22c0 14-12 24-26 24S14 52 14 38Z"
            fill={main} stroke="var(--ink)" strokeWidth="2.2"/>
      {/* cheeks */}
      <ellipse cx="24" cy="46" rx="5" ry="3" fill="var(--accent-2)" opacity="0.65"/>
      <ellipse cx="56" cy="46" rx="5" ry="3" fill="var(--accent-2)" opacity="0.65"/>
      {/* eyes */}
      {eyes && (
        <g fill="var(--ink)">
          <circle cx="30" cy="38" r="3.2"/>
          <circle cx="50" cy="38" r="3.2"/>
          <circle cx="31" cy="37" r="1" fill="var(--bg)"/>
          <circle cx="51" cy="37" r="1" fill="var(--bg)"/>
        </g>
      )}
      {/* smile */}
      <path d="M30 50c3 4 7 5 10 5s7-1 10-5" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* little tongue dot */}
      <circle cx="40" cy="54" r="2" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="1.2"/>
    </svg>
  );
};

// heritage stamp — circular badge "Depuis ... · Brest"
const HeritageStamp = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none">
    <defs>
      <path id="hs-circ" d="M90,90 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0"/>
    </defs>
    <circle cx="90" cy="90" r="86" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 5"/>
    <circle cx="90" cy="90" r="76" fill="var(--accent-2)" stroke="var(--ink)" strokeWidth="2"/>
    <circle cx="90" cy="90" r="62" fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.5"/>
    <text fill="var(--ink)" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="11" letterSpacing="3">
      <textPath href="#hs-circ" startOffset="0%">DEPUIS 15 ANS · BREST · DEPUIS 15 ANS · BREST · </textPath>
    </text>
    <g transform="translate(90 90)">
      <text textAnchor="middle" fontFamily="Caprasimo, Georgia, serif" fontSize="42" fill="var(--accent)" y="2">15</text>
      <text textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2" fill="var(--ink)" y="22">ANNÉES</text>
      <path d="M-20 30 L20 30" stroke="var(--ink)" strokeWidth="1"/>
      <text textAnchor="middle" fontFamily="Caveat, cursive" fontSize="16" fill="var(--ink)" y="46">à chausser</text>
    </g>
  </svg>
);

Object.assign(window, {
  Icon, IconPin, IconPhone, IconMail, IconClock, IconArrow, IconStar, IconHeart, IconMenu,
  IllusFoot, IllusHeart, IllusFlag, IllusCalendar,
  BrandMark, Diablotin, HeritageStamp,
});
