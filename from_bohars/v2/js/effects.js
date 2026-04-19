// FROM BOHARS — Effets saisonniers & Easter eggs

// ---- Toast ----
function fbToast(html, duration = 4000) {
  const el = document.createElement('div');
  el.className = 'fb-toast';
  el.innerHTML = html;
  document.body.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('fb-toast--in')));
  setTimeout(() => {
    el.classList.remove('fb-toast--in');
    setTimeout(() => el.remove(), 400);
  }, duration);
}

// ---- Neige (Noël) ----
const SNOW_CHARS = ['❄', '❅', '❆', '·', '•'];

function startSnow() {
  if (document.getElementById('fb-snow')) return;
  const container = document.createElement('div');
  container.id = 'fb-snow';
  document.body.appendChild(container);
  for (let i = 0; i < 60; i++) {
    const f = document.createElement('span');
    f.className = 'snowflake';
    f.textContent = SNOW_CHARS[Math.floor(Math.random() * SNOW_CHARS.length)];
    f.style.cssText = `left:${Math.random()*100}%;font-size:${6+Math.random()*14}px;opacity:${0.3+Math.random()*0.6};animation-duration:${4+Math.random()*8}s;animation-delay:${Math.random()*-12}s;`;
    container.appendChild(f);
  }
}
function stopSnow() { document.getElementById('fb-snow')?.remove(); }

// ---- Chauves-souris (Halloween) ----
let batTimer = null;

function spawnBat() {
  const container = document.getElementById('fb-bats');
  if (!container) return;
  const bat = document.createElement('span');
  bat.textContent = '🦇';
  const fromLeft = Math.random() > 0.5;
  const top = 3 + Math.random() * 60;
  const size = 14 + Math.floor(Math.random() * 16);
  const dur = 4000 + Math.random() * 6000;
  const midY = (Math.random() - 0.5) * 50;
  Object.assign(bat.style, { position: 'absolute', top: top + '%', fontSize: size + 'px' });
  container.appendChild(bat);
  const sx = fromLeft ? -60 : window.innerWidth + 60;
  const ex = fromLeft ? window.innerWidth + 60 : -60;
  bat.animate([
    { transform: `translateX(${sx}px) scaleX(${fromLeft ? 1 : -1})` },
    { transform: `translateX(${(sx+ex)/2}px) translateY(${midY}px) scaleX(${fromLeft ? 1 : -1})`, offset: 0.5 },
    { transform: `translateX(${ex}px) scaleX(${fromLeft ? 1 : -1})` },
  ], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });
  setTimeout(() => bat.remove(), dur + 100);
}

function startBats() {
  if (document.getElementById('fb-bats')) return;
  const container = document.createElement('div');
  container.id = 'fb-bats';
  document.body.appendChild(container);
  spawnBat(); spawnBat();
  batTimer = setInterval(() => { spawnBat(); if (Math.random() > 0.6) spawnBat(); }, 2500);
}
function stopBats() {
  clearInterval(batTimer); batTimer = null;
  document.getElementById('fb-bats')?.remove();
}

// ---- Pluie de fromages (easter egg) ----
function cheeseRain() {
  const pool = ['🧀','🧀','🧀','🫕','🥛','🍷'];
  for (let i = 0; i < 35; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'cheese-drop';
      el.textContent = pool[Math.floor(Math.random() * pool.length)];
      el.style.cssText = `left:${Math.random()*100}%;font-size:${18+Math.random()*20}px;animation-duration:${1.5+Math.random()*2}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 80);
  }
}

// ---- Réaction aux changements de thème ----
new MutationObserver(() => {
  const cl = document.documentElement.classList;
  cl.contains('theme-noel')      ? startSnow() : stopSnow();
  cl.contains('theme-halloween') ? startBats() : stopBats();
}).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

// État initial (thème restauré depuis localStorage avant DOMContentLoaded)
if (document.documentElement.classList.contains('theme-noel'))      startSnow();
if (document.documentElement.classList.contains('theme-halloween')) startBats();

// ---- Easter egg : Konami code → pluie de fromages ----
(function () {
  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    pos = (e.key === SEQ[pos]) ? pos + 1 : (e.key === SEQ[0] ? 1 : 0);
    if (pos === SEQ.length) {
      pos = 0;
      cheeseRain();
      fbToast('🧀 Code fromager secret activé ! La pluie de fromages commence…', 5000);
    }
  });
})();

// ---- Easter egg : logo ×5 → message secret ----
(function () {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  let clicks = 0, timer;
  logo.addEventListener('click', e => {
    e.preventDefault();
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 2000);
    if (clicks >= 5) {
      clicks = 0;
      fbToast('🧀 Ce site a été affiné avec autant de soin qu\'un Comté 36 mois – Elen & Yann Le Gall', 5500);
    }
  });
})();

// ---- Easter egg : taper "NOEL" → surprise de Noël ----
// ---- Easter egg : taper "BOO" → surprise Halloween ----
(function () {
  const SEQUENCES = {
    'NOEL': () => {
      startSnow();
      fbToast('🎅 Ho Ho Ho ! Joyeuses fêtes de la part d\'Elen et Yann ! 🎄', 4500);
    },
    'BOO': () => {
      startBats();
      fbToast('👻 Bouh ! Même les fromages ont peur la nuit… 🕷️', 4500);
    },
  };
  let buf = '';
  const maxLen = Math.max(...Object.keys(SEQUENCES).map(s => s.length));
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toUpperCase()).slice(-maxLen);
    for (const [seq, fn] of Object.entries(SEQUENCES)) {
      if (buf.endsWith(seq)) { buf = ''; fn(); break; }
    }
  });
})();

// ---- Activation automatique selon la saison ----
(function () {
  const month = new Date().getMonth() + 1; // 1-12
  if (month === 12) {
    setTimeout(() => {
      startSnow();
      fbToast('❄ Joyeuses fêtes de la part d\'Elen et Yann ! 🎄', 5000);
    }, 8000);
  } else if (month === 10) {
    setTimeout(() => {
      spawnBat(); spawnBat(); spawnBat();
      fbToast('🎃 Bonne nuit des fromages… si vous l\'osez ! 🧀', 4500);
    }, 8000);
  }
})();
