/* =====================================================================
   AMAKNA IDLE — HUD DE COMBAT (v3 : l'arène tactique)
   Frise de portraits (ordre de jeu, anneau de PV), barre d'actions (PA, sorts, recharges, bonus,
   statistiques du combat), journal repliable, bandeaux d'annonce, tableau de bord du groupe.
   Uniquement des déclarations de fonctions (hissées) : ce fichier peut être placé n'importe où
   avant ui2.js. Les crochets DOM historiques (data-k, .unit, .scene…) ne sont pas touchés.
   ===================================================================== */

const CB_SPELL_ICON = { dmg: '⚔️', aoe: '💥', buff: '✨', heal: '💚', poison: '☠️', drain: '🩸' };
function cbSpellIcon(sp) { return CB_SPELL_ICON[sp.type] || '🔮'; }
function cbState(h) { const m = cbState.m || (cbState.m = {}); return m[h.id] || (m[h.id] = { dealt: 0, taken: 0, best: 0, turns: 1, mhp: [], f: null, turn: 0, hhp: 0 }); }
const cbPct = (v, max) => (max > 0 ? Math.max(0, Math.min(100, v / max * 100)) : 0).toFixed(1);

/* ---------------------------- Frise : portraits dans l'ordre de jeu ---------------------------- */
function cbPortrait(cls, ord, pct, inner, title, name) {
  return `<div class="tl-p ${cls}" data-ord="${ord}" style="--p:${pct}" title="${esc(title)}"><span class="tl-ring"><span class="tl-in">${inner}</span></span><i class="tl-nm">${esc(name)}</i></div>`;
}
function cbRibbon(h) {
  if (!h.act || h.act.type === 'harvest') return '';
  const f = h.fight, place = findPlace(h.act.type, h.act.id), t = heroTotals(st, h);
  const q = [cbPortrait('hero', 0, cbPct(displayHp(st, h), t.maxHp), emblem(h.cls, true), h.name, h.name)];
  if (f) f.mons.forEach((m, i) => {
    const d = MONSTERS[m.mid];
    q.push('<span class="tl-ar" aria-hidden="true"></span>');
    q.push(cbPortrait(`mon${d.boss ? ' boss' : ''}${d.archi ? ' archi' : ''}${m.hp <= 0 ? ' dead' : ''}`, i + 1, cbPct(m.hp, m.max), monIcon(m.mid), `${d.name} · niv. ${d.lvl}`, d.name));
  }); else q.push('<span class="tl-ar" aria-hidden="true"></span><span class="tl-idle">en route…</span>');
  let track = '';
  if (h.act.type === 'dungeon' && place) {
    const n = place.rooms.length + 1;
    track = `<div class="tl-trk" title="Salles du donjon" data-k="tltrk">${Array.from({ length: n }, (_, i) => `<i class="${i < h.act.room ? 'done' : i === h.act.room ? 'cur' : ''}${i === n - 1 ? ' boss' : ''}">${i === n - 1 ? '👑' : i + 1}</i>`).join('')}</div>`;
  } else track = `<div class="tl-trk kills" title="Ennemis vaincus depuis le début de l'activité">⚔️ <b data-k="tlk">${fmt(h.session ? h.session.kills : 0)}</b></div>`;
  const turn = f ? f.turn : 0;
  return `<div class="tl" data-k="tl">
    <div class="tl-turn" data-k="tnring" style="--p:${cbPct(turn, MAX_TURNS)}" title="Tour en cours · le combat est perdu au-delà de ${MAX_TURNS} tours"><span class="tl-in"><small>Tour</small><b data-k="tn">${turn || '–'}</b></span></div>
    <div class="tl-q">${q.join('')}</div>${track}</div>`;
}

/* ---------------------------- Barre d'actions : PA, sorts, recharges, effets, stats ---------------------------- */
function cbStats(h) {
  const s = cbState(h);
  const c = (ic, k, tip, v) => `<span class="cbs-c" title="${tip}" aria-label="${tip}"><i>${ic}</i><b data-k="${k}">${v}</b></span>`;
  return `<div class="cbs" data-k="sm">${c('⚔️', 'smd', 'Dégâts infligés ce combat', fmt(s.dealt))}${c('🩸', 'smt', 'Dégâts subis ce combat', fmt(s.taken))}${c('⏱️', 'smp', 'Dégâts par tour', fmt(Math.round(s.dealt / Math.max(1, s.turns))))}${c('⭐', 'smb', 'Plus gros coup', fmt(s.best))}</div>`;
}
function cbSpellbar(h) {
  if (!h.act || h.act.type === 'harvest') return '';
  const t = heroTotals(st, h);
  const pips = Array.from({ length: t.pa }, (_, i) => `<i data-pi="${i}"></i>`).join('');
  const tiles = spellsOf(h).map(sp => {
    const lock = h.lvl < sp.lvl, col = STAT_COLOR[sp.stat] || 'var(--gold-2)';
    const tip = `${sp.name} · ${sp.pa} PA${sp.cd ? ` · recharge ${sp.cd} tour${sp.cd > 1 ? 's' : ''}` : ''}${sp.max_ ? ` · ${sp.max_}×/tour` : ''}${lock ? ` · niveau ${sp.lvl}` : ''}`;
    return `<div class="sp t-${sp.type}${lock ? ' locked' : ''}" data-sp="${sp.id}" style="--sc:${col}" title="${esc(tip)}"><span class="sp-ic" data-cd="">${cbSpellIcon(sp)}</span><span class="sp-pa">${sp.pa}</span><em>${lock ? `🔒${sp.lvl}` : ''}</em><b>${esc(sp.name)}</b></div>`;
  }).join('');
  return `<div class="sb" data-k="sb"><div class="sb-pa" data-k="pa" data-n="${t.pa}" title="Points d'action dépensés ce tour"><span>${pips}</span></div><div class="sb-sp">${tiles}</div><div class="sb-buf" data-k="buf"></div>${cbStats(h)}</div>`;
}

/* ---------------------------- Journal illustré ---------------------------- */
const CB_LOG_ICON = { start: '⚔️', win: '🏆', lose: '💀', boss: '👹', warn: '⚠️', info: '·', hero: '✦' };
function cbLogHtml(h) {
  return h.log.slice(-9).reverse().map(l => {
    const c = l.c || '';
    const ic = CB_LOG_ICON[c] || (/frappe|subit|piège/i.test(l.t) ? '🩸' : '•');
    const txt = esc(l.t).replace(/ CC\b/g, ' <b class="cc">CRIT</b>').replace(/[−-]\d[\d  ]* PV/g, m => `<b class="dm">${m}</b>`);
    return `<div class="${c}"><i class="lg-i">${ic}</i><span>${txt}</span></div>`;
  }).join('');
}
function cbJournal(h) {
  return `<div class="jr${ui.jrOpen ? ' open' : ''}" data-act="jrtoggle" role="button" tabindex="0" title="Afficher ou masquer tout le journal"><div class="fc-log" data-k="log">${logHtml(h)}</div><i class="jr-chev" aria-hidden="true">▾</i></div>`;
}

/* ---------------------------- Tableau de bord du groupe ---------------------------- */
function cbOverview() {
  if (st.heroes.length < 2) return '';
  const chips = st.heroes.map(h => {
    const t = heroTotals(st, h), hp = displayHp(st, h), [sc, stxt] = statusOf(h);
    return `<button class="ov-c" data-act="ovgo" data-hero="${h.id}" data-ov="${h.id}" style="--c:${CLASSES[h.cls].color}" title="Aller à ${esc(h.name)}">${emblem(h.cls, true)}<span class="ov-t"><span class="ov-l"><b>${esc(h.name)}</b><em data-k="ovl">${h.lvl}</em></span><span data-k="ovb">${bar('hp thin', hp, t.maxHp)}</span><small class="ov-s ${sc}" data-k="ovs">${esc(stxt)}</small></span></button>`;
  }).join('');
  return `<div class="ov" data-k="ov"><div class="ov-cs">${chips}</div><div class="ov-tot"><span class="rate"><small>XP/h</small><b class="num" data-k="ovxp">0</b></span><span class="rate"><small>Kamas/h</small><b class="num" data-k="ovk">0</b></span>
    <button class="btn sm ghost" data-act="fcfoldall" data-v="on" title="Réduire toutes les cartes">▴ Réduire</button><button class="btn sm ghost" data-act="fcfoldall" data-v="off" title="Déplier toutes les cartes">▾ Déplier</button></div></div>`;
}
function cbOvPatch() {
  const ov = document.querySelector('[data-k="ov"]'); if (!ov) return;
  let xp = 0, kamas = 0;
  for (const h of st.heroes) {
    const c = ov.querySelector(`[data-ov="${h.id}"]`); if (!c) continue;
    const t = heroTotals(st, h), hp = displayHp(st, h), [sc, stxt] = statusOf(h);
    const s = c.querySelector('[data-k="ovs"]'); if (s) { if (s.textContent !== stxt) s.textContent = stxt; s.className = 'ov-s ' + sc; }
    const l = c.querySelector('[data-k="ovl"]'); if (l && l.textContent !== String(h.lvl)) l.textContent = h.lvl;
    setBar(c.querySelector('[data-k="ovb"]'), hp, t.maxHp);
    c.classList.toggle('ko', h.hp <= 0 && h.resting);
    const r = h.session && h.act && h.act.type !== 'harvest' ? sessionRates(h) : null; if (r) { xp += r.xp; kamas += r.kamas; }
  }
  const a = ov.querySelector('[data-k="ovxp"]'), b = ov.querySelector('[data-k="ovk"]');
  if (a) a.textContent = fmt(xp); if (b) b.textContent = fmt(kamas);
}

/* ---------------------------- Bandeau d'annonce ---------------------------- */
function cbBanner(scene, text, cls) {
  if (!scene || (typeof FX_OK === 'function' && !FX_OK())) return;
  scene.querySelectorAll('.tn-banner').forEach(e => e.remove());
  const b = document.createElement('div'); b.className = 'tn-banner ' + (cls || ''); b.innerHTML = `<span>${text}</span>`;
  scene.appendChild(b); setTimeout(() => b.remove(), 1250);
}

/* ---------------------------- Mise à jour à chaque tick ---------------------------- */
function cbPatch(h, card, scene) {
  const q = k => card.querySelector(`[data-k="${k}"]`);
  const f = h.fight, s = cbState(h), t = heroTotals(st, h);
  /* nouveau combat : compteurs remis à zéro, bandeau d'annonce */
  if (f && s.f !== f) {
    const first = !s.f && f.turn > 1;
    s.f = f; s.dealt = 0; s.taken = 0; s.best = 0; s.turns = 1; s.mhp = f.mons.map(m => m.hp); s.hhp = h.hp; s.turn = f.turn;
    if (!first) {
      const boss = f.mons.some(m => MONSTERS[m.mid].boss);
      cbBanner(scene, f.archi ? '👹 ARCHIMONSTRE !' : boss ? '👑 BOSS !' : 'COMBAT !', f.archi || boss ? 'big' : '');
    }
  } else if (f) {
    if (f.turn !== s.turn) { s.turn = f.turn; s.turns = f.turn; if (f.turn > 1) cbBanner(scene, `TOUR ${f.turn}`, f.turn > MAX_TURNS * .75 ? 'late' : ''); }
    f.mons.forEach((m, i) => { const prev = s.mhp[i]; if (prev !== undefined && m.hp < prev) { const d = prev - m.hp; s.dealt += d; if (d > s.best) s.best = d; } s.mhp[i] = m.hp; });
    if (h.hp < s.hhp) s.taken += s.hhp - h.hp; s.hhp = h.hp;
  }
  /* statistiques */
  const setT = (k, v) => { const e = q(k); if (e && e.textContent !== v) e.textContent = v; };
  setT('smd', fmt(s.dealt)); setT('smt', fmt(s.taken)); setT('smp', fmt(Math.round(s.dealt / Math.max(1, s.turns)))); setT('smb', fmt(s.best));
  /* qui joue ensuite ? 0 = le héros, i = monstre i-1 */
  let next = -1;
  if (f && !f.fin) { next = 0; if (f.phase > 0) { let p = f.phase; while (p <= f.mons.length && f.mons[p - 1].hp <= 0) p++; next = p <= f.mons.length ? p : 0; } }
  const hu = q('fighter'); if (hu) hu.classList.toggle('act-next', next === 0);
  card.querySelectorAll('.unit.mon').forEach(el => el.classList.toggle('act-next', next > 0 && +el.dataset.mon === next - 1));
  /* frise */
  const tl = q('tl');
  if (tl) {
    const turn = f ? f.turn : 0;
    const tn = q('tn'); if (tn) { const v = turn ? String(turn) : '–'; if (tn.textContent !== v) tn.textContent = v; }
    const tr = q('tnring'); if (tr) { tr.style.setProperty('--p', cbPct(turn, MAX_TURNS)); tr.classList.toggle('late', turn > MAX_TURNS * .75); }
    tl.querySelectorAll('.tl-p').forEach(p => {
      const o = +p.dataset.ord; p.classList.toggle('next', next === o); p.classList.toggle('done', next > 0 && o < next && !!f);
      if (o === 0) p.style.setProperty('--p', cbPct(displayHp(st, h), t.maxHp));
      else if (f && f.mons[o - 1]) { const m = f.mons[o - 1]; p.classList.toggle('dead', m.hp <= 0); p.style.setProperty('--p', cbPct(m.hp, m.max)); p.classList.toggle('frz', !!m.frozen && m.hp > 0); p.classList.toggle('psn', !!m.poison && m.hp > 0); }
    });
    const kk = q('tlk'); if (kk) { const v = fmt(h.session ? h.session.kills : 0); if (kk.textContent !== v) kk.textContent = v; }
    const trk = q('tltrk'); if (trk && h.act && h.act.type === 'dungeon') trk.querySelectorAll('i').forEach((e, i) => { e.classList.toggle('done', i < h.act.room); e.classList.toggle('cur', i === h.act.room); });
  }
  /* barre d'actions */
  const sb = q('sb');
  if (sb) {
    let used = 0;
    sb.querySelectorAll('.sp').forEach(el => {
      const sp = spellsOf(h).find(x => x.id === el.dataset.sp); if (!sp) return;
      const cd = f ? (f.cds[sp.id] || 0) : 0, n = f ? (f.casts[sp.id] || 0) : 0; used += n * sp.pa;
      const em = el.querySelector('em'), ic = el.querySelector('.sp-ic'); let tx = '';
      if (h.lvl < sp.lvl) tx = `🔒${sp.lvl}`; else if (n > 0 && cd <= 0) tx = `×${n}`;
      if (em.textContent !== tx) em.textContent = tx;
      const cdv = cd > 0 ? String(cd) : ''; if (ic.dataset.cd !== cdv) ic.dataset.cd = cdv;
      el.classList.toggle('cd', cd > 0); el.classList.toggle('used', n > 0 && cd <= 0);
      const prevN = +(el.dataset.n || 0); if (n > prevN) { el.classList.remove('fire'); void el.offsetWidth; el.classList.add('fire'); }
      el.dataset.n = n;
    });
    const pa = q('pa'); if (pa) {
      if (+pa.dataset.n !== t.pa) { pa.dataset.n = t.pa; pa.firstElementChild.innerHTML = Array.from({ length: t.pa }, (_, i) => `<i data-pi="${i}"></i>`).join(''); }
      pa.firstElementChild.querySelectorAll('i').forEach((e, i) => e.classList.toggle('on', i < used));
    }
    const bf = q('buf');
    if (bf) {
      const chips = [];
      if (f) {
        for (const b of f.buffs) { const sp = spellsOf(h).find(x => x.id === b.id); chips.push(`<span class="bf buff" title="${sp ? esc(sp.name) : ''}">✨ ${sp ? esc(sp.name) : 'Bonus'} <b>${b.turns} t</b></span>`); }
        const ps = f.mons.filter(m => m.poison && m.hp > 0).length; if (ps) chips.push(`<span class="bf psn">☠️ Poison <b>×${ps}</b></span>`);
        const fz = f.mons.filter(m => m.frozen && m.hp > 0).length; if (fz) chips.push(`<span class="bf frz">❄️ Gelés <b>×${fz}</b></span>`);
        if (f.invis) chips.push('<span class="bf buff">👁️ Invisible</span>');
      }
      const html = chips.join(''); if (bf.innerHTML !== html) bf.innerHTML = html;
    }
  }
}
