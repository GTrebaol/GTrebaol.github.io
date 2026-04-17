// ===========================================
// FROM BOHARS — V2 — events.js
// Google Calendar ICS integration
// ===========================================

const CAL_URL = 'https://calendar.google.com/calendar/ical/ab162583017a7f2d09eb9e93111b20cb6e946547f94687be7e66993ce2605548%40group.calendar.google.com/public/basic.ics';

const PROXIES = [
  url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
  url => `https://thingproxy.freeboard.io/fetch/${url}`
];

const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const DAYS   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

async function fetchICS() {
  let last;
  for (const proxy of PROXIES) {
    try {
      const r = await fetch(proxy(CAL_URL), { signal: AbortSignal.timeout(8000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const txt = await r.text();
      if (!txt.includes('BEGIN:VCALENDAR')) throw new Error('invalid ICS');
      return txt;
    } catch (e) { last = e; }
  }
  throw last;
}

function parseICS(icsText) {
  const jcal   = ICAL.parse(icsText);
  const comp   = new ICAL.Component(jcal);
  const now    = new Date();
  return comp.getAllSubcomponents('vevent')
    .map(v => {
      const ev   = new ICAL.Event(v);
      const desc = ev.description || '';
      const priceM = desc.match(/(?:tarif|prix|entrée)[^\d]*(\d+(?:[,.]\d+)?)\s*€/i)
                  || desc.match(/(\d+(?:[,.]\d+)?)\s*€/);
      return {
        title:  ev.summary || 'Événement',
        start:  ev.startDate.toJSDate(),
        end:    ev.endDate?.toJSDate() || null,
        loc:    ev.location || null,
        price:  priceM ? `${priceM[1].replace(',', '.')} €` : null,
        desc:   desc
          .replace(/(?:tarif|prix|entrée)[^\n]*\n?/gi, '')
          .replace(/\d+(?:[,.]\d+)?\s*€[^\n]*\n?/g, '')
          .replace(/\\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
      };
    })
    .filter(e => e.start >= now)
    .sort((a, b) => a.start - b.start)
    .slice(0, 10);
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function renderEvents(events) {
  const container = document.getElementById('events-container');
  if (!container) return;

  if (!events.length) {
    container.innerHTML = `<div class="events-empty"><p>Aucun événement programmé pour le moment.</p><p>Suivez-nous sur <a href="https://www.instagram.com/from_bohars/" target="_blank" rel="noopener">Instagram</a> pour rester informé !</p></div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'events-grid';

  events.forEach((ev) => {
    const d    = ev.start;
    const day  = d.getDate();
    const mon  = MONTHS[d.getMonth()];
    const yr   = d.getFullYear();
    const wday = DAYS[d.getDay()];
    const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const endT = ev.end ? ` – ${ev.end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : '';
    const dateLabel = `${wday} ${day} ${mon} ${yr}`;

    const art = document.createElement('article');
    art.className = 'ecard reveal-up';

    art.innerHTML = `
      <div class="ecard-date">
        <span class="ecard-day">${day}</span>
        <div>
          <div class="ecard-mois">${mon} ${yr}</div>
          <div class="ecard-mois">${wday}</div>
        </div>
      </div>
      <div class="ecard-body">
        <h3>${esc(ev.title)}</h3>
        <div class="ecard-meta"><i class="fas fa-clock" aria-hidden="true"></i><span>${time}${endT}</span></div>
        ${ev.loc   ? `<div class="ecard-meta"><i class="fas fa-map-marker-alt" aria-hidden="true"></i><span>${esc(ev.loc)}</span></div>` : ''}
        ${ev.price ? `<div class="ecard-meta"><i class="fas fa-ticket-alt" aria-hidden="true"></i><span>${esc(ev.price)} par personne</span></div>` : ''}
        ${ev.desc  ? `<div class="ecard-desc">${esc(ev.desc).replace(/\n/g, '<br>')}</div>` : ''}
        <button class="ecard-reserve" data-title="${esc(ev.title)}" data-date="${esc(dateLabel)}">
          <i class="fas fa-calendar-check" aria-hidden="true"></i> Réserver
        </button>
      </div>`;

    art.querySelector('.ecard-reserve').addEventListener('click', function () {
      window.reserveEvent(this.dataset.title, this.dataset.date);
    });

    grid.appendChild(art);
  });

  container.innerHTML = '';
  container.appendChild(grid);

  // Trigger scroll animations for injected cards
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    grid.querySelectorAll('.reveal-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
      obs.observe(el);
    });
  }
}

async function initEvents() {
  const container = document.getElementById('events-container');
  if (!container) return;
  try {
    const ics    = await fetchICS();
    const events = parseICS(ics);
    renderEvents(events);
  } catch (err) {
    console.error('Events load failed:', err);
    if (container) {
      container.innerHTML = `<div class="events-error"><p>Impossible de charger les événements pour le moment.</p><p>Consultez notre <a href="https://www.instagram.com/from_bohars/" target="_blank" rel="noopener">Instagram</a> ou <a href="https://www.facebook.com/p/From-Bohars-61559845997301/" target="_blank" rel="noopener">Facebook</a>.</p></div>`;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEvents);
} else {
  initEvents();
}
