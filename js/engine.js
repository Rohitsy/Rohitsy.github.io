/* =====================================================================
   ENGINE.JS: the code that runs the site. You never need to edit this.
   All words, rooms and media come from content.js.
   ===================================================================== */
(function () {
'use strict';
const G = window.GDD;

/* ======================= HELPERS ======================= */
const $ = s => document.querySelector(s);
const pad2 = n => String(n).padStart(2, '0');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const isVideo = src => /\.(mp4|webm|mov)(#.*)?$/i.test(src || '');

/* ======================= ART (icons + placeholders) ======================= */
const ICON = {
  r: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  l: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M12 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  d: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v13M5 12l7 7 7-7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  u: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V6M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const TICK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 L6.5 12 L13 4.5" fill="none" stroke="#FFC233" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const EXT = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 5 11" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const TROPHY = '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0z M7 6H4v1a3 3 0 0 0 3 3 M17 6h3v1a3 3 0 0 1-3 3 M12 13v4 M8 20h8 M9.5 17h5v3h-5z" fill="none" stroke="#14254D" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/></svg>';
const LOCK = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="#4A5B80" stroke-width="2.6"/><rect x="6" y="11" width="12" height="9" rx="2" fill="#4A5B80"/></svg>';
const CLOCK = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#14254D" stroke-width="2.6"/><path d="M12 7v6l4 2" fill="none" stroke="#14254D" stroke-width="2.6" stroke-linecap="round"/></svg>';
const ART = {
  ghost: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#14254D"/><circle cx="88" cy="30" r="14" fill="#FFC233"/><path d="M14 100 V62 L34 46 L54 62 V100 Z M54 100 V54 L74 36 L94 54 V100 Z" fill="#24386A"/><rect x="24" y="72" width="8" height="10" fill="#FFC233"/><rect x="66" y="64" width="8" height="10" fill="#FFC233"/><rect x="0" y="100" width="120" height="20" fill="#0E1B38"/><path d="M40 102 V88 Q40 76 50 76 Q60 76 60 88 V102 L55 98 L50 102 L45 98 Z" fill="#fff"/><circle cx="46" cy="87" r="2.4" fill="#14254D"/><circle cx="54" cy="87" r="2.4" fill="#14254D"/></svg>',
  classified: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#fff"/><rect x="14" y="22" width="92" height="12" rx="3" fill="#14254D"/><rect x="14" y="44" width="70" height="12" rx="3" fill="#14254D"/><rect x="14" y="66" width="84" height="12" rx="3" fill="#14254D"/><rect x="14" y="88" width="50" height="12" rx="3" fill="#14254D"/><g transform="rotate(-14 60 60)"><rect x="18" y="48" width="84" height="26" rx="5" fill="#fff" stroke="#FFC233" stroke-width="4"/><text x="60" y="67" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="16" fill="#14254D">CLASSIFIED</text></g></svg>',
  voice: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#24386A"/><g fill="#FFC233">' + [14, 30, 52, 70, 44, 24, 60, 36, 18].map((h, i) => `<rect x="${14 + i * 10.5}" y="${60 - h / 2}" width="7" height="${h}" rx="3.5"/>`).join('') + '</g></svg>',
  avatar: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#BFE6FA"/><circle cx="60" cy="48" r="22" fill="#14254D"/><path d="M20 120 Q20 78 60 78 Q100 78 100 120 Z" fill="#14254D"/></svg>',
  trophy: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#14254D"/><path d="M38 28h44v18a22 22 0 0 1-44 0z" fill="#FFC233"/><path d="M38 34H26v4a12 12 0 0 0 12 12M82 34h12v4a12 12 0 0 1-12 12" fill="none" stroke="#FFC233" stroke-width="6"/><rect x="54" y="66" width="12" height="14" fill="#FFC233"/><rect x="40" y="80" width="40" height="12" rx="3" fill="#FFC233"/></svg>',
  mail: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#FFC233"/><rect x="20" y="34" width="80" height="54" rx="8" fill="#fff" stroke="#14254D" stroke-width="6"/><path d="M22 38l38 28 38-28" fill="none" stroke="#14254D" stroke-width="6" stroke-linejoin="round"/></svg>',
  section: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#FFC233"/><text x="60" y="82" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="64" fill="#14254D">§</text></svg>',
  '3d': '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="a3" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#3A4F82"/><stop offset="1" stop-color="#0E1B38"/></radialGradient><radialGradient id="b3" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#FFE08A"/><stop offset=".45" stop-color="#FFC233"/><stop offset="1" stop-color="#B07A00"/></radialGradient></defs><rect width="120" height="120" fill="url(#a3)"/><circle cx="62" cy="46" r="22" fill="url(#b3)"/><rect x="26" y="66" width="26" height="26" rx="4" fill="#7FCDF5" transform="rotate(12 39 79)"/><ellipse cx="60" cy="100" rx="44" ry="5" fill="#000" opacity=".3"/></svg>',
  '2d': '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="a2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE7A8"/><stop offset=".5" stop-color="#FFB8C9"/><stop offset="1" stop-color="#9AD8F7"/></linearGradient></defs><rect width="120" height="120" fill="url(#a2)"/><ellipse cx="44" cy="52" rx="24" ry="28" fill="#14254D" opacity=".85"/><circle cx="86" cy="50" r="16" fill="#FFC233"/><rect y="94" width="120" height="26" fill="#14254D" opacity=".25"/></svg>',
  sketch: '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#F3EEE2"/><rect x="22" y="18" width="76" height="88" fill="#FBF8F1" transform="rotate(-4 60 62)"/><path d="M38 80 Q46 46 62 50 T86 72 M48 86 Q62 74 78 88 M56 34 q4 -6 9 0 q3 8 -5 9 q-8 -1 -4 -9" fill="none" stroke="#5B6478" stroke-width="2.2" stroke-linecap="round"/><rect x="46" y="12" width="28" height="10" fill="#FFC233" opacity=".8" transform="rotate(-6 60 17)"/></svg>',
  progress: '<img src="' + G.progress.image + '" alt="" style="object-position:28% 50%">',
};
const thumb = k => ART[k] || `<img src="media/posters/${k}.jpg" alt="" decoding="async">`;
const vsrc = f => `media/videos/${f.id}.mp4${f.t ? '#t=' + f.t : ''}`;
const vposter = f => `media/posters/${f.poster || f.id}.jpg`;
// real media: store screenshots + YouTube trailers. Embeds play inline on the real site;
// inside Claude's preview (no iframes) the trailer opens on YouTube instead.
const EMBED = !/claude|anthropic/i.test(location.hostname);
const ytThumb = id => `https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg`;
const ytWatch = id => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;
const iconImg = q => `<img class="ic" src="${esc(q.icon)}" data-fb="${ART[q.thumb] ? 'art:' + q.thumb : 'media/posters/' + q.thumb + '.jpg'}" referrerpolicy="no-referrer" alt="" decoding="async">`;
const qThumb = x => x && x.q && x.q.icon ? iconImg(x.q) : thumb(x.thumb);

/* ======================= WORLD ======================= */
const SECTIONS = G.sections.map((s, i) => Object.assign({ no: i + 1 }, s));
const PROLOGUE = [
  { id: 'main-character', kind: 'character', title: 'Main Character', kindLabel: 'Prologue' },
  { id: 'progress', kind: 'progress', title: 'Progress', kindLabel: 'Stage', thumb: 'progress' },
  { id: 'achievements', kind: 'achievements', title: 'Achievements', kindLabel: 'Stage', thumb: 'trophy' },
  { id: 'party-invite', kind: 'contact', title: 'Party Invite', kindLabel: 'Contact', thumb: 'mail' },
];
const label = no => no === 3 ? 'Entry' : no === 4 ? 'Item' : no === 5 ? 'Gallery' : 'Quest';
const MAPROWS = [PROLOGUE, ...SECTIONS.map(s => {
  const items = s.id === 'art'
    ? G.art.map((a, k) => ({ id: a.id, kind: 'gallery', title: a.title, kindLabel: `${label(s.no)} ${s.no}.${k + 1}`, art: a, sec: s, qno: `${s.no}.${k + 1}`, thumb: a.medium }))
    : G.quests.filter(q => q.tab === s.id).map((q, k) => ({ id: q.id, kind: 'quest', title: q.short, kindLabel: `${label(s.no)} ${s.no}.${k + 1}`, q, sec: s, qno: `${s.no}.${k + 1}`, thumb: q.thumb }));
  return [{ id: s.id, kind: 'section', title: s.label, kindLabel: 'Section card', sec: s }, ...items];
})];
const ROOMS = {};
let roomNo = 0;
MAPROWS.forEach((row, r) => row.forEach((rm, c) => { rm.r = r; rm.c = c; rm.no = ++roomNo; ROOMS[rm.id] = rm; }));
ROOMS.title = { id: 'title', kind: 'title', title: 'Title screen', r: -1, c: 0, no: 0 };
const ORDER = MAPROWS.flat().map(r => r.id);
const TOTAL = ORDER.length;
const COLS = Math.max(...MAPROWS.map(r => r.length));
const roomThumb = rm => rm.kind === 'character' ? ART.avatar : rm.kind === 'section' ? ART.section : qThumb(rm);

function exits(id) {
  const rm = ROOMS[id];
  if (!rm || rm.r < 0) return {};
  const row = MAPROWS[rm.r];
  return {
    l: rm.c > 0 ? row[rm.c - 1] : null,
    r: rm.c < row.length - 1 ? row[rm.c + 1] : null,
    u: rm.r > 0 ? MAPROWS[rm.r - 1][0] : null,
    d: rm.r < MAPROWS.length - 1 ? MAPROWS[rm.r + 1][0] : null,
  };
}

const ACH = [
  { id: 'first-steps', t: 'First Steps', d: 'Visit 3 rooms' },
  { id: 'quest-giver', t: 'Quest Giver', d: 'Open a main quest' },
  { id: 'side-tracked', t: 'Side Tracked', d: 'Step into Side Quests' },
  { id: 'lore-keeper', t: 'Lore Keeper', d: 'Read a Codex entry' },
  { id: 'art-lover', t: 'Art Lover', d: 'Visit the Art Room' },
  { id: 'party-up', t: 'Party Up', d: 'Find the Party Invite' },
  { id: 'completionist', t: 'Completionist', d: `Visit all ${TOTAL} rooms` },
];

/* ======================= SAVE ======================= */
const SAVE_KEY = 'rohit-gdd-save-v2';
let save = { visited: [], last: '', ach: [], sound: false, motion: 'full' };
try { const raw = localStorage.getItem(SAVE_KEY); if (raw) save = Object.assign(save, JSON.parse(raw)); } catch (e) {}
save.visited = save.visited.filter(id => ROOMS[id]);
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} };
const sysReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reduced = () => sysReduce || save.motion === 'reduced';
let soundOn = !!save.sound;

/* ======================= ROOM TEMPLATES ======================= */
const ph = right => `<header class="ph"><span>Game Design Document · ${esc(G.title.name)}</span><span>${right}</span></header>`;
const secHead = rm => `§${rm.sec.no} · ${esc(rm.sec.label)} · room ${pad2(rm.no)}`;
let menuSel = 0;

let optOpen = false;
function titleMenu() {
  const lastRm = save.last && ROOMS[save.last] && save.last !== 'title' ? ROOMS[save.last] : null;
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="#FFC233"/></svg>';
  const btn = (act, icon, nm, sub, dis) => `<button class="t-btn" type="button" data-act="${act}"${dis ? ' disabled' : ''}><span class="t-ic">${icon}</span><span><span class="d t-bn">${nm}</span><span class="t-bs">${sub}</span></span></button>`;
  return `<button class="t-start" type="button" data-act="go:main-character"><span class="t-play">${PLAY}</span><span class="d">START</span></button>
    <div class="t-hint">ENTER · → · ↓ · OR CLICK</div>
    <div class="t-row">${btn(lastRm ? 'go:' + lastRm.id : '', '↺', 'Continue', lastRm ? `${esc(lastRm.title)} · ${save.visited.length} / ${TOTAL}` : 'No save yet', !lastRm)}${btn('go:party-invite', '@', 'Contact', 'Email · CV')}${btn('opt:panel', '⚙', 'Options', 'Sound · motion')}</div>
    ${optOpen ? `<div class="t-opts"><button class="t-chip" type="button" data-act="opt:sound">♪ Sound: <b>${soundOn ? 'on' : 'off'}</b></button><button class="t-chip" type="button" data-act="opt:motion">⇄ Motion: <b>${reduced() ? 'reduced' : 'full'}</b></button></div>` : ''}
    <div class="t-jump">OR JUMP TO A CHAPTER</div>
    <div class="t-chips"><button class="t-chip" type="button" data-act="go:main-character"><b>§0</b> Prologue</button>${SECTIONS.map(x => `<button class="t-chip" type="button" data-act="go:${x.id}"><b>§${x.no}</b> ${esc(x.label)}</button>`).join('')}</div>`;
}

function filmBlock(q, cls) {
  const f = q.films[0];
  if (!f) return `<div class="screen ${cls || ''}">${ART[q.thumb] || ''}</div>`;
  const chips = q.films.length > 1
    ? `<div class="chips">${q.films.map((x, k) => `<button class="fchip" type="button" data-film="${k}" aria-pressed="${k === 0}">${esc(x.label)}</button>`).join('')}</div>`
    : `<p class="note">${esc(f.label)}</p>`;
  return `<div class="screen ${cls || ''}"><video muted loop playsinline preload="none" poster="${vposter(f)}" data-src="${vsrc(f)}" aria-label="${esc(f.label)}"></video></div><div class="under">${chips}<button class="sound" type="button" aria-pressed="false">♪ Sound on</button></div>`;
}
const factsHTML = q => `<dl class="facts">${q.facts.map(([k, v]) => `<div class="fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
const listHTML = q => q.list.length ? `<div class="sec-h">${esc(q.listTitle)}</div><ul class="obj${q.steps ? ' steps' : ''}">${q.list.map((l, k) => `<li><span class="tick">${q.steps ? k + 1 : TICK}</span><span>${esc(l)}</span></li>`).join('')}</ul>` : '';
const lootHTML = (q, withTrailer) => {
  const links = q.loot.map(l => `<a class="btn${l.alt ? ' alt' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${EXT}</a>`);
  if (withTrailer && q.trailer && q.trailer.yt) links.push(`<button class="btn alt" type="button" data-yt="${esc(q.trailer.yt)}">▶ ${esc(q.trailer.label || 'Gameplay trailer')}</button>`);
  return links.length ? `<div class="loot">${links.join('')}</div>` : '';
};
// your own screens first, then the store screenshots
const realItems = q => [
  ...(q.gameplay ? [{ src: q.gameplay, own: true, note: 'Gameplay recording' }] : []),
  ...(q.screens || []).map(x => Object.assign({ own: true }, x)),
  ...((q.store && q.store.shots) || []).map(x => typeof x === 'string' ? { src: x, store: true } : Object.assign({ store: true }, x)),
];
const realLabel = (q, items) => items.length && items[0].own ? 'Real game · my screens' : `Real game · ${esc((q.store && q.store.label) || 'store')}`;
const shotHTML = (it, extra = '') => isVideo(it.src)
  ? `<video src="${esc(it.src)}" muted loop playsinline ${extra}></video>`
  : `<img src="${esc(it.src)}" alt="${esc(it.note || '')}" referrerpolicy="no-referrer" decoding="async" ${extra}>`;
function trailerCard(q, cls) {
  const t = q.trailer; if (!t || !t.yt) return '';
  return `<button class="trl ${cls || ''}" type="button" data-yt="${esc(t.yt)}" aria-label="Play the ${esc(t.label || 'gameplay trailer')} for ${esc(q.short)}"><img src="${ytThumb(t.yt)}" alt="" referrerpolicy="no-referrer" decoding="async" data-hide-on-error="1"><span class="trl-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l12 7-12 7z" fill="#FFC233"/></svg></span><span class="trl-lab">${esc(t.label || 'Gameplay trailer')} · YouTube</span></button>`;
}

function questHTML(rm) {
  const q = rm.q;
  const items = realItems(q);
  const head = `<div class="q-top"><p class="eyebrow"><b>${rm.qno}</b>${esc(q.eyebrow)}</p><span class="status ${q.kind}">${esc(q.status)}</span></div><h2 class="q-title">${esc(q.title)}</h2>`;
  const fallback = `<div class="q-grid"><div class="film">${filmBlock(q)}</div><div><p class="brief">${esc(q.brief)}</p>${factsHTML(q)}${listHTML(q)}${lootHTML(q, true)}</div></div>`;
  if (!items.length) return `<div class="pb">${head}${fallback}</div>`;
  const lab = realLabel(q, items);
  const load = '<span class="dev-load">Loading real screens…</span>';
  const desk = `<div class="qa-grid only-D${q.films.length ? '' : ' no-film'}${q.trailer ? '' : ' no-trl'}" data-orient="port">
      <div class="qa-scr"><div class="lab-s"${q.store && q.store.note ? ` title="${esc(q.store.note)}"` : ''}>${lab}</div><div class="dev"><button class="dev-screen" type="button" data-shot="next" data-idx="0" aria-label="Next screen">${load}</button></div><div class="ph-dots"></div></div>
      <div class="qa-duo">${q.films.length ? `<div class="qa-film"><div class="lab-s">How I designed it</div>${filmBlock(q, 'film-sq')}</div>` : ''}${q.trailer ? `<div class="qa-trl"><div class="lab-s">Watch the game</div>${trailerCard(q)}</div>` : ''}</div>
      <div class="qa-text"><p class="brief">${esc(q.brief)}</p>${factsHTML(q)}${listHTML(q)}${lootHTML(q)}</div>
    </div>`;
  const noted = items.filter(x => (x.title || x.note) && !isVideo(x.src));
  const notes = noted.map((x, k) => `<div class="m-note${k % 2 ? ' flip' : ''}" data-src="${esc(x.src)}"><span class="m-nshot">${shotHTML(x)}<span class="real-tag">${x.own ? 'REAL GAME' : 'STORE'}</span></span><span class="m-nbody"><span class="m-nno">${k + 1}</span>${x.title ? `<span class="d m-nti">${esc(x.title)}</span>` : ''}${x.note ? `<span class="m-ntx">${esc(x.note)}</span>` : ''}</span></div>`).join('');
  const ahead = [notes && 'notes', q.trailer && 'trailer', q.films.length && 'film', q.list.length && (q.listTitle || 'objectives').toLowerCase()].filter(Boolean);
  const hint = ahead.length ? `<p class="m-hint">↓ scroll for ${ahead.length > 1 ? ahead.slice(0, -1).join(', ') + ' and ' + ahead[ahead.length - 1] : ahead[0]}</p>` : '';
  const mob = `<div class="only-M"><div class="lab-s m-lab">${lab}</div><button class="m-stack" type="button" data-stack="0" data-orient="port" aria-label="Tap for the next screen">${load}</button><p class="brief">${esc(q.brief)}</p>${hint}${notes ? `<div class="m-notes" data-orient="port"><div class="sec-h">The real game</div><div class="m-nsub">${noted.length} screen${noted.length > 1 ? 's' : ''} · what to notice</div>${notes}</div>` : ''}${q.trailer ? `<div class="sec-h">Watch the game</div>${trailerCard(q, 'm')}` : ''}${q.films.length ? `<div class="sec-h">How I designed it</div><div class="film">${filmBlock(q)}</div>` : ''}${factsHTML(q)}${listHTML(q)}${lootHTML(q)}</div>`;
  return `<div class="pb qa"><div class="real-wrap">${head}${desk}${mob}</div><div class="fb-wrap">${head}${fallback}</div></div>`;
}

function galleryHTML(rm) {
  const a = rm.art, P = a.pieces || [], dark = a.medium === '3d';
  const head = `<div class="q-top"><p class="eyebrow"><b>${rm.qno}</b>Gallery · ${esc(a.title)}</p><span class="chip">${P.length ? P.length + ' piece' + (P.length > 1 ? 's' : '') : 'Coming soon'}</span></div><h2 class="q-title">${esc(a.title)}</h2>`;
  if (!P.length) {
    return { tone: dark ? 'dark' : '', html: `<div class="pb">${head}<div class="g-empty"><span class="g-eart">${ART[a.medium]}</span><div><div class="d" style="font-size:32px">Pieces coming soon</div><p>${esc(a.sub)}. New work is being added to this gallery.</p></div></div></div>` };
  }
  const media = (p, extra) => isVideo(p.src) ? `<video src="${esc(p.src)}"${p.poster ? ` poster="${esc(p.poster)}"` : ''} muted loop playsinline preload="metadata" ${extra || ''}></video>` : `<img src="${esc(p.src)}" alt="${esc(p.title || '')}" decoding="async">`;
  if (a.medium === 'sketch') {
    const rot = [-4, 3, -2, 5, -6, 2, -3, 4, -2, 3, -5, 2];
    return { tone: '', html: `<div class="pb">${head}<div class="board">${P.map((p, k) => `<button class="taped" type="button" data-lb="${k}" style="--r:${rot[k % rot.length]}deg"><span class="tape"></span>${media(p)}<span class="t-cap">${esc(p.title || 'Sketch ' + (k + 1))}</span></button>`).join('')}</div></div>` };
  }
  const meta = p => [['Tool', p.tool], ['Time', p.time], ['Year', p.year]].filter(x => x[1]);
  const p0 = P[0];
  return { tone: dark ? 'dark' : '', html: `<div class="pb">${head}
    <div class="g-grid only-D"><div><button class="g-view" type="button" data-lb="0" data-gidx="0">${media(p0, 'autoplay')}</button><div class="g-thumbs">${P.map((p, k) => `<button class="g-th${k ? '' : ' on'}" type="button" data-gpick="${k}">${media(p)}</button>`).join('')}</div></div>
      <div class="g-info"><div class="d g-t">${esc(p0.title || '')}</div><p class="g-n">${esc(p0.note || '')}</p><dl class="facts">${meta(p0).map(([k, v]) => `<div class="fact"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><button class="btn alt" type="button" data-lb="cur" style="margin-top:22px">⤢ Full screen</button></div></div>
    <div class="g-mgrid only-M">${P.map((p, k) => `<button class="g-mi" type="button" data-lb="${k}">${media(p)}<span>${esc(p.title || '')}</span></button>`).join('')}</div></div>` };
}

function renderRoom(rm) {
  const T = G.title, C = G.character;
  switch (rm.kind) {
    case 'title':
      return { tone: 'dark', html: ph('Title screen') + `<div class="pb"><div class="t-grid"><div><div class="t-kicker">${esc(T.label)}</div><h1 class="stamp t-logo">${T.heading}</h1><div class="d t-name">${esc(T.name)}</div><div class="t-tag">${esc(T.tagline)}</div></div><div class="t-menu" id="menu-items">${titleMenu()}</div></div></div>` };
    case 'character':
      return { html: ph(`§0 · Prologue · room 01`) + `<div class="pb"><div class="c-grid"><div><div class="portrait">${C.avatar ? `<img src="${esc(C.avatar)}" alt="${esc(T.name)}">` : ART.avatar + '<span class="chip">Avatar coming soon</span>'}</div><dl class="stats">${C.stats.map(([k, v]) => `<div class="fact"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl><div class="tools-h">Toolbelt</div><div class="tools">${C.tools.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div></div><div class="c-main"><p class="eyebrow"><b>§0</b>Main Character</p><h2 class="d c-name">${esc(T.name)}</h2><p class="c-log">${esc(C.logline)}</p><div class="sec-h">Abilities, with proof</div><div class="abil">${C.abilities.filter(([, id]) => ROOMS[id]).map(([a, id]) => `<button class="ab" type="button" data-go="${id}"><span>${esc(a)}</span><span class="chip">→ ${esc(ROOMS[id].title)}</span></button>`).join('')}</div>${C.liveEvent ? `<div class="live"><span class="chip">LIVE EVENT</span><span>${esc(C.liveEvent)}</span></div>` : ''}</div></div></div>` };
    case 'progress': {
      const P = G.progress, last = P.stages.length - 1;
      const stats = `<div class="pr-stats">${P.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd class="d">${esc(v)}</dd></div>`).join('')}</div>`;
      const stages = P.stages.map((s, i) => `<li class="pr-st${i === last ? ' boss' : ''}"><span class="d pr-node ${s.kind}">${esc(s.node)}</span><div class="pr-card"><span class="pr-tag">${esc(s.tag)}</span><div class="d pr-t">${esc(s.title)}</div><div class="pr-o">${esc(s.org)}</div><div class="pr-d">${esc(s.date)}</div><div class="pr-sk">${(s.skills || []).map(k => `<span>+ ${esc(k)}</span>`).join('')}</div></div></li>`).join('');
      const solo = (P.solo || []).map(s => `<div class="pr-solo"><span class="pr-star">★</span><div><div class="d">${esc(s.title)}</div><div class="pr-o">${esc(s.org)} · <span class="pr-d">${esc(s.date)}</span></div></div></div>`).join('');
      return { html: ph('§0 · Prologue · room 02') + `<div class="pb"><div class="pr-head"><div><p class="eyebrow"><b>§0</b>Progress · save file 01</p><h2 class="d pr-h">Progress</h2></div>${stats}</div><ol class="pr-road">${stages}</ol>${solo ? `<div class="pr-solos"><span class="d pr-sl">Solo quests</span>${solo}</div>` : ''}</div>` };
    }
    case 'achievements':
      return { html: ph('§0 · Prologue · room 03') + `<div class="pb"><p class="eyebrow"><b>§0</b>Achievements</p><h2 class="big-h" style="margin-top:8px">Trophy room</h2><div class="sec-h">This run <span style="font-family:var(--b);font-size:16px;color:var(--ink-soft)" id="ach-count"></span></div><div class="ach-grid" id="ach-grid"></div><div class="sec-h" style="margin-top:26px">Career</div><div class="career">${[['First titles shipped', 'Hidden Escape chapters at Vincell Studios'], ['Two MVPs shipped', 'Loopy Duck and Alien Out at Tap N Play']].map(([t, d]) => `<div class="ach"><span class="ai">${TROPHY}</span><span><b>${t}</b><span>${d}</span></span></div>`).join('')}</div></div>` };
    case 'contact':
      return { html: ph('§0 · Prologue · room 04') + `<div class="pb"><div class="ct-grid"><div><p class="eyebrow"><b>§0</b>Party Invite</p><h2 class="stamp ct-h">${G.invite.heading}</h2><p class="c-log" style="max-width:32ch">${esc(G.invite.text)}</p></div><div class="ct-btns"><button class="btn" type="button" data-act="email"><span>Email<small>${esc(G.contact.email || 'Opens your mail app')}</small></span>${EXT}</button><button class="btn alt" type="button" data-act="linkedin"><span>LinkedIn<small>Connect or message</small></span>${EXT}</button><button class="btn alt" type="button" data-act="cv"><span>Résumé (PDF)<small>The short version</small></span>${ICON.d.replace('<svg', '<svg style="width:18px;height:18px"')}</button></div></div></div>` };
    case 'section': {
      const qs = MAPROWS[rm.r].slice(1);
      const st = x => x.kind === 'gallery' ? (x.art.pieces.length ? `${x.art.pieces.length} pieces` : 'Coming soon') : x.q.st;
      const sub = x => x.kind === 'gallery' ? x.art.sub : x.q.sub;
      const dash = x => x.kind === 'gallery' ? !x.art.pieces.length : (x.q.kind === 'classified' || x.q.kind === 'concept');
      return { tone: 'sky', html: ph(secHead(rm)) + `<div class="pb"><div class="s-grid"><div style="display:flex;flex-direction:column;justify-content:center"><div class="stamp s-num">${pad2(rm.sec.no)}</div><h2 class="d s-title">${esc(rm.sec.label).replace(' ', '<br>')}</h2><div class="s-note">${esc(rm.sec.note)}</div></div><div class="s-index${qs.length > 6 ? ' dense' : ''}"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px"><span class="d" style="font-size:28px">In this section</span><span style="font-size:14px;letter-spacing:.12em;color:var(--ink-soft)">${qs.length} ROOMS AHEAD →</span></div>${qs.map(x => `<button class="s-row" type="button" data-go="${x.id}"><span class="s-th">${qThumb(x)}</span><span class="s-no">${x.qno}</span><span style="min-width:0"><span class="s-nm">${esc(x.title)}</span><span class="s-sub">${esc(sub(x))}</span></span><span class="dots"></span><span class="s-st${dash(x) ? ' dash' : ''}">${esc(st(x))}</span><span class="s-rm">${pad2(x.no)}</span></button>`).join('')}</div></div></div>` };
    }
    case 'quest':
      return { html: ph(secHead(rm)) + questHTML(rm) };
    case 'gallery': {
      const g = galleryHTML(rm);
      return { tone: g.tone, html: ph(secHead(rm)) + g.html };
    }
  }
  return { html: '' };
}

/* ======================= BUILD ======================= */
const slot = $('#slot'), stage = $('#stage'), stagebox = $('#stagebox');
const roomEls = {};
['title', ...ORDER].forEach(id => {
  const rm = ROOMS[id];
  const { tone, html } = renderRoom(rm);
  const el = document.createElement('section');
  el.className = 'room';
  el.dataset.id = id;
  el.setAttribute('aria-label', rm.title);
  el.innerHTML = `<div class="face front${tone ? ' ' + tone : ''}">${html}<div class="shade"></div></div><div class="face back" aria-hidden="true"></div>`;
  el.setAttribute('inert', '');
  slot.appendChild(el);
  roomEls[id] = el;
});
document.querySelectorAll('.db[data-dir]').forEach(b => { b.innerHTML = ICON[b.dataset.dir]; });
document.documentElement.style.setProperty('--cols', COLS);
$('#m-count').textContent = `0 / ${TOTAL}`;

/* ---------- desktop / phone mode + scaling ---------- */
let mode = '';
var cur = null, busy = false, queued = null, pending = null;
function fit() {
  const w = window.innerWidth, h = window.innerHeight;
  const s = Math.min(w / 1920, h / 1080);
  // below ~60% scale the desktop stage gets too small to read, so switch to the scrolling layout
  const mob = w < 900 || s < 0.6;
  const m = mob ? 'M' : 'D';
  if (m !== mode) { mode = m; document.body.classList.toggle('M', mob); document.body.classList.toggle('D', !mob); if (cur) { renderTabs(cur); activateMedia(cur); } }
  document.body.classList.toggle('sm', !mob && s < 0.8);
  document.body.classList.toggle('short', mob && h < 520);
  if (mob) { stage.style.transform = ''; return; }
  stagebox.style.width = (1920 * s) + 'px';
  stagebox.style.height = (1080 * s) + 'px';
  stage.style.transform = `scale(${s})`;
}
window.addEventListener('resize', () => requestAnimationFrame(fit));

/* ---------- HUD ---------- */
function fitTab(t, dir) {
  const lab = t.querySelector('.lab');
  lab.style.fontSize = '';
  const vertical = dir === 'l' || dir === 'r';
  const max = mode === 'M' ? (vertical ? 128 : 9999) : (vertical ? 262 : 300);
  let f = parseFloat(getComputedStyle(lab).fontSize);
  const len = () => vertical ? lab.offsetHeight : lab.offsetWidth;
  while (len() > max && f > 11) { f -= 1; lab.style.fontSize = f + 'px'; }
}
function renderTabs(id) {
  const ex = exits(id);
  const best = ex.r ? 'r' : ex.d ? 'd' : null;
  ['l', 'r', 'u', 'd'].forEach(dir => {
    const t = $('#tab-' + dir), target = ex[dir];
    if (!target) { t.hidden = true; return; }
    t.hidden = false;
    t.classList.toggle('gold', dir === best);
    const kind = dir === 'u' ? 'Section above' : dir === 'd' ? 'Section below' : dir === 'l' ? (target.kind === 'section' ? 'Section card' : 'Back') : target.kindLabel;
    t.innerHTML = `<span class="arr" style="color:#fff">${ICON[dir]}</span><span class="txt"><span class="lab">${esc(target.title)}</span><span class="kind">${esc(kind)}</span></span>`;
    t.setAttribute('aria-label', `Go ${({ l: 'left', r: 'right', u: 'up', d: 'down' })[dir]} to ${target.title}`);
    fitTab(t, dir);
  });
  renderMnav(id);
}
function renderMnav(id) {
  const nav = $('#mnav'); if (!nav) return;
  if (id === 'title') { nav.innerHTML = `<button class="mn-go wide gold" type="button" data-mdir="r"><span class="d">START</span>${ICON.r}</button>`; return; }
  const ex = exits(id);
  const side = (dir, t) => t ? `<button class="mn-go ${dir === 'r' ? 'gold' : ''}" type="button" data-mdir="${dir}" aria-label="${dir === 'r' ? 'Next' : 'Back'}: ${esc(t.title)}">${dir === 'l' ? ICON.l : ''}<span><small>${dir === 'r' ? 'Next' : 'Back'}</small><b class="d">${esc(t.title)}</b></span>${dir === 'r' ? ICON.r : ''}</button>` : `<span class="mn-go off"></span>`;
  const ud = (dir, t) => `<button class="mn-ud" type="button" data-mdir="${dir}"${t ? '' : ' disabled'} aria-label="${t ? (dir === 'u' ? 'Section above: ' : 'Section below: ') + esc(t.title) : ''}">${ICON[dir]}</button>`;
  nav.innerHTML = side('l', ex.l) + ud('u', ex.u) + ud('d', ex.d) + side('r', ex.r || ex.d);
  const last = nav.querySelector('.mn-go.gold');
  if (!ex.r && ex.d && last) { last.dataset.mdir = 'd'; last.querySelector('small').textContent = 'Next section'; }
}
function renderPad(id) {
  const ex = exits(id), isTitle = id === 'title';
  const best = ex.r ? 'r' : ex.d ? 'd' : null;
  document.querySelectorAll('.db[data-dir]').forEach(b => {
    const dir = b.dataset.dir;
    const on = isTitle ? (dir === 'r' || dir === 'd') : !!ex[dir];
    b.disabled = !on;
    b.classList.toggle('hi', isTitle ? on : dir === best);
  });
}
function renderMinimap(id) {
  let cells = '';
  for (let r = 0; r < MAPROWS.length; r++) for (let c = 0; c < COLS; c++) {
    const rm = MAPROWS[r][c];
    const cls = !rm ? 'n' : rm.id === id ? 'c' : save.visited.includes(rm.id) ? 'v' : 'f';
    cells += `<i class="${cls}"${rm ? ` title="${esc(rm.title)}"` : ''}></i>`;
  }
  $('#minimap').innerHTML = `<h4>MAP <small>${save.visited.length} / ${TOTAL} EXPLORED</small></h4><div class="mm">${cells}</div><div class="mmkey"><span><i style="background:#FFC233;outline:2px solid #14254D"></i>You</span><span><i style="background:#14254D"></i>Visited</span><span><i style="border:2px dashed rgba(20,37,77,.5)"></i>Fog</span></div>`;
  $('#m-count').textContent = `${save.visited.length} / ${TOTAL}`;
}
function renderAch() {
  const g = $('#ach-grid');
  if (!g) return;
  g.innerHTML = ACH.map(a => { const got = save.ach.includes(a.id); return `<div class="ach${got ? '' : ' lock'}"><span class="ai">${got ? TROPHY : LOCK}</span><span><b>${got ? a.t : '???'}</b><span>${a.d}</span></span></div>`; }).join('');
  $('#ach-count').textContent = `${save.ach.length} / ${ACH.length} unlocked`;
}
function renderMenu() { const m = $('#menu-items'); if (m) m.innerHTML = titleMenu(); }

/* ---------- toasts + sound ---------- */
let actx = null;
function ac() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); return actx; } catch (e) { return null; } }
function swish() {
  if (!soundOn) return; const a = ac(); if (!a) return;
  const t = a.currentTime, dur = .22, n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
  for (let k = 0; k < n; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / n, 1.6);
  const src = a.createBufferSource(); src.buffer = buf; const bp = a.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = .7;
  bp.frequency.setValueAtTime(2400, t); bp.frequency.exponentialRampToValueAtTime(700, t + dur);
  const g = a.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.2, t + .04); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  src.connect(bp); bp.connect(g); g.connect(a.destination); src.start(t);
}
function chime() {
  if (!soundOn) return; const a = ac(); if (!a) return;
  [[784, 0], [1175, .11]].forEach(([f, dt]) => { const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + dt; o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .45); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + .5); });
}
function toast(title, sub, icon) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="ic">${icon || TROPHY}</span><span><small>${icon ? 'NOTE' : 'ACHIEVEMENT UNLOCKED'}</small><b>${esc(title)} <span>· ${esc(sub)}</span></b></span>`;
  $('#toasts').appendChild(t);
  $('#live').textContent = `${icon ? '' : 'Achievement unlocked: '}${title}. ${sub}`;
  if (!reduced()) t.animate([{ transform: 'translateY(-30px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 300, easing: 'cubic-bezier(.3,1.4,.5,1)' });
  setTimeout(() => { if (reduced()) { t.remove(); return; } const out = t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300 }); out.onfinish = () => t.remove(); }, 2800);
}
function unlock(id) {
  if (save.ach.includes(id)) return;
  save.ach.push(id); persist();
  const a = ACH.find(x => x.id === id);
  toast(a.t, a.d.toLowerCase()); chime(); renderAch();
}
function checkAch(id) {
  const rm = ROOMS[id];
  const secId = rm.sec && rm.sec.id;
  if (save.visited.length >= 3) unlock('first-steps');
  if (rm.kind === 'quest' && secId === 'main') unlock('quest-giver');
  if (secId === 'side') unlock('side-tracked');
  if (rm.kind === 'quest' && secId === 'codex') unlock('lore-keeper');
  if (secId === 'art') unlock('art-lover');
  if (id === 'party-invite') unlock('party-up');
  if (save.visited.length >= TOTAL) unlock('completionist');
}

/* ---------- videos ---------- */
const visible = el => !!(el && el.offsetParent !== null);
function primeVideos(id) {
  const el = roomEls[id]; if (!el) return;
  el.querySelectorAll('video[data-src]').forEach(v => { if (!v.getAttribute('src')) { v.preload = 'metadata'; v.src = v.dataset.src; } });
}
function syncSound() {
  document.querySelectorAll('.sound').forEach(b => { b.setAttribute('aria-pressed', soundOn); b.textContent = soundOn ? '♪ Sound off' : '♪ Sound on'; });
}
function activateMedia(id) {
  Object.entries(roomEls).forEach(([k, el]) => {
    el.querySelectorAll('video').forEach(v => {
      if (k === id && visible(v)) {
        if (v.dataset.src && !v.getAttribute('src')) { v.preload = 'metadata'; v.src = v.dataset.src; }
        v.muted = v.closest('.screen') ? !soundOn : true;
        if (reduced()) v.controls = !!v.closest('.screen'); else v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    });
  });
  syncSound();
}

/* ---------- current room ---------- */
function setCurrent(id, initial) {
  Object.entries(roomEls).forEach(([k, el]) => {
    const on = k === id;
    el.classList.toggle('on', on);
    el.style.zIndex = on ? 3 : '';
    el.style.transform = ''; el.style.opacity = '';
    if (on) el.removeAttribute('inert'); else el.setAttribute('inert', '');
  });
  cur = id;
  if (id !== 'title') {
    if (!save.visited.includes(id)) save.visited.push(id);
    save.last = id; persist();
  }
  renderTabs(id); renderPad(id); renderMinimap(id);
  if (id === 'achievements') renderAch();
  if (id === 'title') renderMenu();
  activateMedia(id);
  prepReal(id);
  { const ex = exits(id); if (ex.r) prepReal(ex.r.id); if (ex.d) prepReal(ex.d.id); }
  const face = roomEls[id].querySelector('.front'); if (face) face.scrollTop = 0;
  try { history.replaceState(null, '', '#' + id); } catch (e) {}
  $('#live').textContent = initial ? '' : `${ROOMS[id].title}${ROOMS[id].no ? ', room ' + ROOMS[id].no + ' of ' + TOTAL : ''}`;
  if (id !== 'title') checkAch(id);
}

/* ---------- travel ---------- */
const D = 640, EASE = 'cubic-bezier(.55,.05,.25,1)';
function travel(to) {
  if (!ROOMS[to] || to === cur) return;
  if (busy) { if (to !== pending) queued = to; return; }
  closeMap(); closeLB();
  const from = cur, A = roomEls[from], B = roomEls[to];
  const ra = ROOMS[from], rb = ROOMS[to];
  swish();
  primeVideos(to);
  prepReal(to);
  if (reduced()) { setCurrent(to); return; }
  busy = true; pending = to;
  const tabs = ['l', 'r', 'u', 'd'].map(k => $('#tab-' + k));
  tabs.forEach(t => { t.style.opacity = 0; });
  renderPad(to);
  B.classList.add('on'); B.removeAttribute('inert');
  let anims;
  if (ra.r === rb.r && ra.r >= 0) {
    const sgn = rb.c > ra.c ? 1 : -1;
    const dist = slot.offsetWidth + (mode === 'M' ? 60 : 260);
    A.style.zIndex = 3; B.style.zIndex = 3;
    anims = [
      B.animate([{ transform: `translateX(${sgn * dist}px)` }, { transform: 'translateX(0)' }], { duration: D, easing: EASE, fill: 'forwards' }),
      A.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-sgn * dist}px)` }], { duration: D, easing: EASE, fill: 'forwards' }),
    ];
  } else {
    const down = rb.r > ra.r;
    const shadeA = A.querySelector('.front > .shade'), shadeB = B.querySelector('.front > .shade');
    const DD = D + 120;
    if (down) {
      A.style.zIndex = 3; B.style.zIndex = 2;
      anims = [
        A.animate([{ transform: 'rotateX(0deg)', opacity: 1 }, { transform: 'rotateX(148deg)', opacity: 1, offset: .8 }, { transform: 'rotateX(178deg)', opacity: 0 }], { duration: DD, easing: EASE, fill: 'forwards' }),
        shadeB.animate([{ opacity: .45 }, { opacity: 0 }], { duration: DD, easing: EASE }),
        shadeA.animate([{ opacity: 0 }, { opacity: .3 }], { duration: DD / 2, easing: 'ease-in', fill: 'forwards' }),
      ];
    } else {
      A.style.zIndex = 2; B.style.zIndex = 3;
      anims = [
        B.animate([{ transform: 'rotateX(178deg)', opacity: 0 }, { transform: 'rotateX(148deg)', opacity: 1, offset: .2 }, { transform: 'rotateX(0deg)', opacity: 1 }], { duration: DD, easing: EASE, fill: 'forwards' }),
        shadeA.animate([{ opacity: 0 }, { opacity: .45 }], { duration: DD, easing: EASE, fill: 'forwards' }),
        shadeB.animate([{ opacity: .3 }, { opacity: 0 }], { duration: DD / 2, delay: DD / 2, easing: 'ease-out', fill: 'both' }),
      ];
    }
  }
  anims[0].onfinish = () => {
    setCurrent(to);
    anims.forEach(a => a.cancel());
    tabs.forEach(t => { t.style.opacity = ''; if (!reduced()) t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180 }); });
    busy = false; pending = null;
    if (queued) { const q = queued; queued = null; travel(q); }
  };
}
function move(dir) {
  const from = queued || pending || cur;
  if (from === 'title') { if (dir === 'r' || dir === 'd') travel('main-character'); return; }
  const t = exits(from)[dir];
  if (t) travel(t.id);
}
function step(k) {
  const from = queued || pending || cur;
  if (from === 'title') { if (k > 0) travel('main-character'); return; }
  const i = ORDER.indexOf(from) + k;
  if (i < 0) { travel('title'); return; }
  if (i < ORDER.length) travel(ORDER[i]);
}

/* ---------- actions ---------- */
function doAct(act) {
  if (!act) return;
  if (act.startsWith('go:')) { travel(act.slice(3)); return; }
  if (act === 'map') { openMap(); return; }
  if (act === 'opt:panel') { optOpen = !optOpen; renderMenu(); return; }
  if (act === 'email' || act === 'linkedin' || act === 'cv') {
    const c = G.contact;
    const url = act === 'email' ? (c.email ? 'mailto:' + c.email : '') : c[act];
    if (url) window.open(url, act === 'email' ? '_self' : '_blank', 'noopener');
    else toast('Coming soon', 'this link goes live soon', CLOCK);
    return;
  }
  if (act === 'opt:sound') { soundOn = !soundOn; save.sound = soundOn; persist(); syncSound(); renderMenu(); if (mapOpen()) renderMap(); if (soundOn) chime(); return; }
  if (act === 'opt:motion') { save.motion = reduced() && !sysReduce ? 'full' : 'reduced'; persist(); renderMenu(); if (mapOpen()) renderMap(); }
}
function activateMenu(i) {
  const k = ['new', 'continue', 'contact', 'options'][i];
  if (k === 'new') travel('main-character');
  else if (k === 'continue') { if (save.last && ROOMS[save.last] && save.last !== 'title') travel(save.last); }
  else if (k === 'contact') travel('party-invite');
  else if (k === 'options') doAct('opt:sound');
}

/* ---------- real screens: load, orient, fall back ---------- */
const REAL = {};
function prepReal(id) {
  const rm = ROOMS[id];
  if (!rm || rm.kind !== 'quest') return;
  let st = REAL[id];
  if (!st) { const items = realItems(rm.q); if (!items.length) return; st = REAL[id] = { items, ok: new Set(), bad: new Set(), dims: {}, idx: 0, prepped: false }; }
  if (st.prepped) return;
  st.prepped = true;
  st.items.forEach((it, i) => {
    if (isVideo(it.src)) { st.ok.add(i); st.dims[i] = [9, 16]; return; }
    const im = new Image();
    im.referrerPolicy = 'no-referrer';
    im.onload = () => { st.bad.delete(i); st.ok.add(i); st.dims[i] = [im.naturalWidth, im.naturalHeight]; renderReal(id); };
    im.onerror = () => { st.bad.add(i); renderReal(id); };
    im.src = it.src;
  });
  if (st.items.some(it => isVideo(it.src))) renderReal(id);
  setTimeout(() => { if (!st.ok.size) { st.items.forEach((_, i) => st.bad.add(i)); renderReal(id); } }, 12000);
}
const shownReal = id => { const st = REAL[id]; return st ? st.items.map((it, i) => Object.assign({ i }, it)).filter(x => st.ok.has(x.i) && !st.bad.has(x.i)) : []; };
function renderReal(id) {
  const room = roomEls[id], st = REAL[id];
  if (!room || !st) return;
  const shown = shownReal(id);
  const settled = st.ok.size + st.bad.size >= st.items.length;
  if (!shown.length) { if (settled) { room.classList.add('no-real'); activateMedia(cur); } return; }
  const wasFallback = room.classList.contains('no-real');
  room.classList.remove('no-real');
  const d = st.dims[shown[0].i] || [9, 16];
  const orient = d[0] > d[1] * 1.05 ? 'land' : 'port';
  const ar = orient === 'land' ? 16 / 9 : Math.min(0.5625, Math.max(0.5, d[0] / d[1]));
  room.querySelectorAll('.qa-grid, .m-stack, .m-notes').forEach(g => { g.dataset.orient = orient; g.style.setProperty('--ar', ar.toFixed(4)); });
  syncNotes(room, st);
  // keep the screen already on display while the others finish loading
  const at = shown.findIndex(x => x.src === st.painted);
  st.idx = at >= 0 ? at : Math.min(st.idx, shown.length - 1);
  if (at < 0) paintShot(room, id); else paintDots(room, id);
  const stack = room.querySelector('.m-stack');
  if (stack) {
    const cards = shown.slice(0, 10), key = cards.map(x => x.i).join(',');
    if (stack.dataset.key !== key) {
      stack.dataset.key = key;
      stack.dataset.stack = 0;
      stack.innerHTML = cards.map((it, k) => `<span class="m-card" data-k="${k}">${shotHTML(it)}</span>`).join('') + (cards.length > 1 ? `<span class="m-tap">☝ Tap for next · <b>1</b> / ${cards.length}</span>` : '');
      stack.classList.toggle('single', cards.length < 2);
    }
  }
  if (wasFallback && id === cur) activateMedia(cur);
}
function syncNotes(room, st) {
  const box = room.querySelector('.m-notes'); if (!box) return;
  const bad = new Set([...st.bad].map(i => st.items[i].src));
  const live = [...box.querySelectorAll('.m-note')].filter(n => { const off = bad.has(n.dataset.src); n.hidden = off; return !off; });
  live.forEach((n, k) => { n.classList.toggle('flip', k % 2 === 1); const no = n.querySelector('.m-nno'); if (no) no.textContent = k + 1; });
  box.hidden = !live.length;
  const sub = box.querySelector('.m-nsub'); if (sub) sub.textContent = `${live.length} screen${live.length === 1 ? '' : 's'} · what to notice`;
}
function paintShot(room, id) {
  const st = REAL[id], shown = shownReal(id);
  const scr = room.querySelector('.dev-screen');
  if (!scr || !shown.length) return;
  const it = shown[st.idx];
  st.painted = it.src;
  scr.dataset.idx = st.idx;
  scr.innerHTML = shotHTML(it, 'autoplay') + `<span class="real-tag">${it.own ? 'REAL GAME' : 'STORE SHOT'}</span>`;
  paintDots(room, id);
  const v = scr.querySelector('video'); if (v && !reduced()) v.play().catch(() => {});
}
function paintDots(room, id) {
  const st = REAL[id], n = shownReal(id).length;
  const dots = room.querySelector('.ph-dots');
  if (!dots) return;
  dots.innerHTML = (n > 1 ? `<button class="ph-btn" type="button" data-shot="prev" aria-label="Previous screen">←</button><span class="ph-pips">${Array.from({ length: n }, (_, k) => `<i class="${k === st.idx ? 'on' : ''}"></i>`).join('')}</span><button class="ph-btn" type="button" data-shot="next" aria-label="Next screen">→</button>` : '') + `<button class="ph-btn full" type="button" data-shot="full" aria-label="Open full size" title="Full size">⤢</button>`;
}
function setShot(room, i) {
  const id = room.dataset.id, st = REAL[id], n = shownReal(id).length;
  if (!st || !n) return;
  st.idx = ((i % n) + n) % n;
  paintShot(room, id);
}
function cycleStack(room) {
  const st = room.querySelector('.m-stack');
  const cards = [...st.querySelectorAll('.m-card')];
  if (cards.length < 2) return;
  const k = (+st.dataset.stack + 1) % cards.length;
  st.dataset.stack = k;
  cards.forEach((c, j) => { c.dataset.k = (j - k + cards.length) % cards.length; });
  const b = st.querySelector('.m-tap b'); if (b) b.textContent = k + 1;
}
function openShots(room) {
  const id = room.dataset.id, q = ROOMS[id].q, shown = shownReal(id);
  openLB(shown.map((x, k) => ({ src: x.src, title: q.title, meta: x.own ? 'Real screen' : `Store screenshot · ${(q.store && q.store.label) || ''}`, note: [x.title, x.note].filter(Boolean).join(': ') || (x.store && q.store.note) || '' })), REAL[id].idx);
}
function openTrailer(ytId, title) {
  if (!EMBED) { window.open(ytWatch(ytId), '_blank', 'noopener'); return; }
  document.querySelectorAll('.room.on video').forEach(v => v.pause());
  openLB([{ yt: ytId, title: title || 'Gameplay video', meta: 'YouTube' }], 0);
}

/* ---------- lightbox (art, screenshots, trailers) ---------- */
const lb = $('#lightbox');
let lbState = null;
function openLB(list, k) {
  if (!list || !list.length) return;
  const n = list.length;
  lbState = { list, k: ((k % n) + n) % n };
  const p = list[lbState.k];
  const meta = p.meta || [p.tool, p.time, p.year].filter(Boolean).join(' · ');
  const media = p.yt
    ? `<div class="lb-yt"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(p.yt)}?autoplay=1&rel=0&playsinline=1&modestbranding=1" title="${esc(p.title || 'Video')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`
    : isVideo(p.src) ? `<video src="${esc(p.src)}" muted loop playsinline autoplay controls></video>` : `<img src="${esc(p.src)}" alt="${esc(p.title || '')}" referrerpolicy="no-referrer">`;
  lb.innerHTML = `<button class="lb-x" type="button" aria-label="Close">✕</button><div class="lb-media">${media}</div><div class="lb-info"><div class="d lb-t">${esc(p.title || '')}</div>${meta ? `<div class="lb-m">${esc(meta)}</div>` : ''}${p.note ? `<p>${esc(p.note)}</p>` : ''}${p.yt ? `<p><a class="lb-out" href="${ytWatch(p.yt)}" target="_blank" rel="noopener">Watch on YouTube ${EXT}</a></p>` : ''}<div class="lb-nav">${n > 1 ? `<button class="btn alt" type="button" data-lbnav="-1">← Prev</button><span>${lbState.k + 1} / ${n}</span><button class="btn alt" type="button" data-lbnav="1">Next →</button>` : ''}</div></div>`;
  lb.classList.toggle('is-yt', !!p.yt);
  lb.setAttribute('aria-label', p.yt ? 'Video player' : 'Image viewer');
  const wasOpen = lb.classList.contains('open');
  lb.classList.add('open');
  if (!wasOpen) { const x = lb.querySelector('.lb-x'); if (x) x.focus({ preventScroll: true }); }
}
function closeLB() {
  if (!lb.classList.contains('open')) return;
  const wasYt = lb.classList.contains('is-yt');
  lb.classList.remove('open', 'is-yt'); lb.innerHTML = ''; lbState = null;
  if (wasYt) activateMedia(cur);
}
lb.addEventListener('click', e => {
  const nav = e.target.closest('[data-lbnav]');
  if (nav) { openLB(lbState.list, lbState.k + +nav.dataset.lbnav); return; }
  if (e.target === lb || e.target.closest('.lb-x')) closeLB();
});
function pickGallery(room, k) {
  const a = ROOMS[room.dataset.id].art, p = a.pieces[k];
  const view = room.querySelector('.g-view');
  view.dataset.gidx = k; view.dataset.lb = k;
  view.innerHTML = isVideo(p.src) ? `<video src="${esc(p.src)}" muted loop playsinline autoplay></video>` : `<img src="${esc(p.src)}" alt="${esc(p.title || '')}">`;
  room.querySelectorAll('.g-th').forEach((t, j) => t.classList.toggle('on', j === k));
  const info = room.querySelector('.g-info');
  info.querySelector('.g-t').textContent = p.title || '';
  info.querySelector('.g-n').textContent = p.note || '';
  info.querySelector('.facts').innerHTML = [['Tool', p.tool], ['Time', p.time], ['Year', p.year]].filter(x => x[1]).map(([kk, v]) => `<div class="fact"><dt>${kk}</dt><dd>${esc(v)}</dd></div>`).join('');
}

/* ---------- map overlay ---------- */
function renderMap() {
  const ov = $('#overlay');
  const here = ROOMS[cur] || ROOMS.title;
  const where = here.sec ? `§${here.sec.no} ${esc(here.sec.label)} · ${esc(here.title)}` : esc(here.title);
  const rows = MAPROWS.map((row, r) => `<div class="pz-row"><span class="d pz-rn">§${r}</span>${row.map(rm => {
    const seen = save.visited.includes(rm.id), h = rm.id === cur;
    if (rm.c === 0) return `<button class="pz-card sec${h ? ' here' : ''}" type="button" data-go="${rm.id}"><span class="d">${esc(rm.title)}</span>${h ? '<i>YOU</i>' : ''}</button>`;
    return `<button class="pz-card${seen || h ? '' : ' fog'}${h ? ' here' : ''}" type="button" data-go="${rm.id}" title="${esc(rm.title)}"><span class="pz-th">${roomThumb(rm)}</span><span class="d pz-t">${esc(rm.title)}</span>${h ? '<i>YOU</i>' : ''}</button>`;
  }).join('')}</div>`).join('');
  const b = (id, act, icon, label, key, on) => `<button class="pz-btn${on ? ' on' : ''}" type="button"${id ? ` id="${id}"` : ''}${act} ><span class="d pz-i">${icon}</span><span class="d pz-l">${label}</span><span class="pz-k">${key}</span></button>`;
  ov.innerHTML = `<div class="pz">
    <div class="pz-side">
      <div class="stamp pz-h">PAUSED</div>
      <div class="pz-where">You are in ${where}</div>
      ${b('ov-close', '', '▶', 'Resume', 'Esc', true)}
      ${b('', ' data-go="title"', '⌂', 'Title screen', '')}
      ${b('', ' data-go="party-invite"', '@', 'Contact', '')}
      ${b('', ' data-pact="opt:sound"', '♪', `Sound: ${soundOn ? 'on' : 'off'}`, '')}
      ${b('', ' data-pact="opt:motion"', '⇄', `Motion: ${reduced() ? 'reduced' : 'full'}`, '')}
      <div class="pz-stats"><div><span>Explored</span><b class="d">${save.visited.length} / ${TOTAL}</b></div><div><span>Trophies</span><b class="d">${save.ach.length} / ${ACH.length}</b></div></div>
    </div>
    <div class="pz-map"><div class="pz-mh"><span class="d">World map</span><span>Click any room to travel · dashed = not visited yet</span></div><div class="pz-grid">${rows}</div></div>
  </div>`;
}
function openMap() { renderMap(); $('#overlay').classList.add('open'); const b = $('#ov-close'); if (b) b.focus({ preventScroll: true }); }
function closeMap() { $('#overlay').classList.remove('open'); }
const mapOpen = () => $('#overlay').classList.contains('open');

/* ---------- broken remote images fall back quietly ---------- */
document.addEventListener('error', e => {
  const t = e.target;
  if (!t || t.tagName !== 'IMG') return;
  if (t.dataset.fb) {
    const fb = t.dataset.fb; delete t.dataset.fb; t.classList.remove('ic');
    if (fb.startsWith('art:')) { const w = document.createElement('span'); w.innerHTML = ART[fb.slice(4)] || ''; t.replaceWith(...w.childNodes); }
    else t.src = fb;
  } else if (t.dataset.hideOnError) t.style.display = 'none';
}, true);

/* ---------- input ---------- */
document.querySelectorAll('.db[data-dir]').forEach(b => b.addEventListener('click', () => move(b.dataset.dir)));
['l', 'r', 'u', 'd'].forEach(k => $('#tab-' + k).addEventListener('click', () => move(k)));
$('#btn-map').addEventListener('click', openMap);
$('#minimap').addEventListener('click', openMap);
$('#minimap').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMap(); } });
$('#m-map').addEventListener('click', openMap);
$('#mnav').addEventListener('click', e => { const b = e.target.closest('[data-mdir]'); if (b && !b.disabled) move(b.dataset.mdir); });
$('#m-title').addEventListener('click', () => travel('title'));
$('#overlay').addEventListener('click', e => {
  if (e.target.closest('#ov-close')) { closeMap(); return; }
  const pa = e.target.closest('[data-pact]');
  if (pa) { doAct(pa.dataset.pact); return; }
  if (e.target === $('#overlay')) { closeMap(); return; }
  const g = e.target.closest('[data-go]');
  if (g) { const id = g.dataset.go; closeMap(); if (id !== cur) travel(id); }
});
slot.addEventListener('click', e => {
  const g = e.target.closest('[data-go]');
  if (g) { travel(g.dataset.go); return; }
  const a = e.target.closest('[data-act]');
  if (a) { doAct(a.dataset.act); return; }
  const room = e.target.closest('.room');
  if (!room) return;
  const yt = e.target.closest('[data-yt]');
  if (yt) { openTrailer(yt.dataset.yt, `${ROOMS[room.dataset.id].title} · ${(ROOMS[room.dataset.id].q.trailer || {}).label || 'Gameplay video'}`); return; }
  const shot = e.target.closest('[data-shot]');
  if (shot) {
    const st = REAL[room.dataset.id]; if (!st) return;
    const v = shot.dataset.shot;
    if (v === 'full') { openShots(room); return; }
    setShot(room, v === 'next' ? st.idx + 1 : v === 'prev' ? st.idx - 1 : +v);
    return;
  }
  if (e.target.closest('.m-stack')) { cycleStack(room); return; }
  const gp = e.target.closest('[data-gpick]');
  if (gp) { pickGallery(room, +gp.dataset.gpick); return; }
  const lbBtn = e.target.closest('[data-lb]');
  if (lbBtn) { const v = lbBtn.dataset.lb; openLB(ROOMS[room.dataset.id].art.pieces, v === 'cur' ? +(room.querySelector('.g-view').dataset.gidx) : +v); return; }
  const v = room.querySelector('.screen video');
  if (e.target.closest('.sound')) {
    soundOn = !soundOn; save.sound = soundOn; persist();
    room.querySelectorAll('.screen video').forEach(x => { x.muted = !soundOn; if (visible(x) && x.paused) x.play().catch(() => {}); });
    syncSound(); return;
  }
  const fc = e.target.closest('.fchip');
  if (fc) {
    const q = ROOMS[room.dataset.id].q, f = q.films[+fc.dataset.film];
    fc.closest('.under').querySelectorAll('.fchip').forEach(c => c.setAttribute('aria-pressed', c === fc));
    const vv = fc.closest('.under').previousElementSibling.querySelector('video');
    if (vv) { vv.poster = vposter(f); vv.src = vsrc(f); vv.muted = !soundOn; vv.play().catch(() => {}); }
  }
});
slot.addEventListener('mouseover', e => {

});
window.addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const k = e.key;
  if (lb.classList.contains('open')) {
    if (k === 'Escape') { e.preventDefault(); closeLB(); }
    else if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); if (lbState.list.length > 1) openLB(lbState.list, lbState.k + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); if (lbState.list.length > 1) openLB(lbState.list, lbState.k - 1); }
    return;
  }
  if (mapOpen()) { if (k === 'Escape' || k === 'm' || k === 'M') { e.preventDefault(); closeMap(); } return; }
  if (k === 'Escape' || k === 'm' || k === 'M') { e.preventDefault(); openMap(); return; }
  const onCtl = e.target.closest && e.target.closest('button, a, video, [role="button"]');
  if ((k === 'Enter' || k === ' ') && cur === 'title' && !onCtl) { e.preventDefault(); travel('main-character'); return; }
  if ((k === 'Enter' || k === ' ') && onCtl) return;
  const map = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'u', ArrowDown: 'd', a: 'l', A: 'l', d: 'r', D: 'r', w: 'u', W: 'u', s: 'd', S: 'd' };
  if (map[k]) { e.preventDefault(); move(map[k]); }
  else if (k === 'PageDown') { e.preventDefault(); step(1); }
  else if (k === 'PageUp') { e.preventDefault(); step(-1); }
});
let wAcc = 0, wLast = 0, wUsed = false;
window.addEventListener('wheel', e => {
  if (mode === 'M' || mapOpen() || lb.classList.contains('open')) return;
  e.preventDefault();
  const now = performance.now();
  if (now - wLast > 220) { wAcc = 0; wUsed = false; }
  wLast = now;
  if (wUsed) return;
  const horiz = Math.abs(e.deltaX) > Math.abs(e.deltaY);
  wAcc += horiz ? e.deltaX : e.deltaY;
  if (Math.abs(wAcc) > 40) { wUsed = true; if (horiz) move(wAcc > 0 ? 'r' : 'l'); else step(wAcc > 0 ? 1 : -1); }
}, { passive: false });
let tx = 0, ty = 0;
window.addEventListener('touchstart', e => { const t = e.touches[0]; tx = t.clientX; ty = t.clientY; }, { passive: true });
window.addEventListener('touchend', e => {
  if (mapOpen() || lb.classList.contains('open')) return;
  const t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 'r' : 'l');
  else if (mode === 'D' && Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.4) move(dy < 0 ? 'd' : 'u');
}, { passive: true });
window.addEventListener('hashchange', () => { const id = decodeURIComponent(location.hash.slice(1)); if (ROOMS[id] && id !== cur) travel(id); });

/* ---------- start ---------- */
fit();
const start = decodeURIComponent(location.hash.slice(1));
setCurrent(ROOMS[start] ? start : 'title', true);
window.__gdd = { travel, move, step, get cur() { return cur; }, get busy() { return busy; }, openMap, closeMap, ORDER };
})();
