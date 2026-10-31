/* =====================================================================
   ATELIERS — fabrication à la forge, Maîtrise des recettes, Forgemagie
   (placé avant ui2.js dans la compilation : tout est lu à l'appel)
   ===================================================================== */
const JOB_ICON = { tailleur: '🧵', bijoutier: '💍', cordonnier: '👢', forgeron: '⚒️', bricoleur: '🔧', boulanger: '🥖', forgemage: '🔮' };
const JOB_LORE = {
  tailleur: 'Aiguille, laine et patience : le Tailleur habille les aventuriers d’Amakna.',
  bijoutier: 'Gemmes et métaux précieux. Chaque bijou porte son petit secret.',
  cordonnier: 'Cuir tanné, semelles solides. On ne court pas loin sans bonnes bottes.',
  forgeron: 'Le marteau chante sur l’enclume : armes, outils, et un peu de poésie.',
  bricoleur: 'Clefs, serrures et mécanismes. Le Bricoleur ouvre les donjons.',
  boulanger: 'Un bon repas change un combat : dégâts, XP, kamas, PV… et même la récolte.',
  forgemage: 'Il brise les objets en runes, puis les runes redonnent de la puissance. Gare au surjet !',
};
const RUNE_STAT_LABEL = { vit: 'Vitalité', sag: 'Sagesse', deg: 'Dégâts', pp: 'Prospection', crit: '% Critique', res: '% Résistance' };

/* ---------------------------- Vue ---------------------------- */
function renderAteliers() {
  if (!JOBS[ui.job]) ui.job = 'tailleur';
  const jobs = Object.entries(JOBS).map(([id, j]) => {
    const s = st.jobs[id];
    const ready = id === 'forgemage' ? 0 : RECIPES.filter(r => r.job === id && canCraft(st, r)).length;
    return `<button class="jrow at-job" data-act="job" data-v="${id}" aria-pressed="${ui.job === id}"><span class="at-ico">${JOB_ICON[id]}</span><span class="jr-body"><span class="jr-top"><b>${j.name}</b><span class="lvl">Niv. ${s.lvl}</span></span><small>${j.makes}</small>${bar('job thin', s.xp, jobXpToNext(s.lvl))}</span>${ready ? `<i class="ready-n" title="Recettes fabricables">${ready}</i>` : ''}</button>`;
  }).join('');
  return `<div class="split at-split"><aside class="joblist">${jobs}</aside><section class="panel at-panel at-${ui.job}">${atBanner(ui.job)}${ui.job === 'boulanger' ? bkDaily() : ''}${ui.job === 'forgemage' ? atForgemage() : atRecipes()}</section></div>`;
}
function bkDaily() {
  const id = platDuJour(st.jobs.boulanger.lvl), d = RESOURCES[id], ms = msToMidnight();
  return `<div class="bk-special"><span class="bk-sp-ic">${d.icon}</span><div><small class="label">★ Plat du jour</small><b class="display">${esc(d.name)}</b><span class="sub">1 portion offerte à chaque fabrication · encore ${Math.floor(ms / 3600000)} h ${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}</span></div></div>`;
}
function atBanner(id) {
  const s = st.jobs[id];
  const made = id === 'forgemage' ? (st.stats.forged || 0) + (st.stats.broken || 0) : RECIPES.filter(r => r.job === id).reduce((a, r) => a + ((st.mastery || {})[r.out] || 0), 0);
  return `<div class="at-banner"><div class="at-emblem"><span>${JOB_ICON[id]}</span>${'<i class="ember"></i>'.repeat(6)}</div>
    <div class="at-bmain"><h3 class="display">${JOBS[id].name} <span class="lvl">Niv. ${s.lvl}</span></h3><small class="sub">${JOB_LORE[id]}</small>${bar('job', s.xp, jobXpToNext(s.lvl))}<span class="sub num">${fmt(s.xp)} / ${fmt(jobXpToNext(s.lvl))} XP</span></div>
    <div class="at-bstat"><b class="num">${fmt(made)}</b><small>${id === 'forgemage' ? 'opérations' : 'fabrications'}</small></div></div>`;
}
function atRankPips(i) { return Array.from({ length: MASTERY_RANKS.length - 1 }, (_, k) => `<i class="${k < i ? 'on' : ''}"></i>`).join(''); }
function atRecipes() {
  const isH = r => !!(ITEMS[r.out] && ITEMS[r.out].harvest);
  const js = st.jobs[ui.job];
  const nH = RECIPES.filter(r => r.job === ui.job && isH(r)).length, nC = RECIPES.filter(r => r.job === ui.job && !isH(r)).length;
  if (ui.rtab === 'recolte' && !nH) ui.rtab = 'combat';
  let base = RECIPES.map((r, i) => [r, i]).filter(([r]) => r.job === ui.job && (ui.rtab === 'recolte' ? isH(r) : !isH(r)));
  const slots = [...new Set(base.map(([r]) => ITEMS[r.out] ? ITEMS[r.out].slot : null).filter(Boolean))];
  if (ui.rslot && !slots.includes(ui.rslot)) ui.rslot = '';
  let list = base.filter(([r]) => !ui.rslot || (ITEMS[r.out] && ITEMS[r.out].slot === ui.rslot));
  if (ui.onlyCraft) list = list.filter(([r]) => canCraft(st, r));
  list.sort((a, b) => (a[0].lvl > js.lvl) - (b[0].lvl > js.lvl) || a[0].lvl - b[0].lvl);
  const cards = list.map(([r, i]) => atCard(r, i, js)).join('');
  const chips = slots.length > 1 ? `<div class="at-chips"><button data-act="rslot" data-v="" aria-pressed="${!ui.rslot}">Tout</button>${slots.map(s => `<button data-act="rslot" data-v="${s}" aria-pressed="${ui.rslot === s}">${(HARVEST_SLOT_LABEL[s] || SLOT_LABEL[s === 'anneau' ? 'anneau1' : s] || s)}</button>`).join('')}</div>` : '';
  return `<div class="tools-row"><div class="seg"><button data-act="rtab" data-v="combat" aria-pressed="${ui.rtab !== 'recolte'}">${ui.job === 'boulanger' ? 'Repas' : 'Équipements de combat'} · ${nC}</button><button data-act="rtab" data-v="recolte" aria-pressed="${ui.rtab === 'recolte'}" ${nH ? '' : 'disabled'}>Métiers de récolte · ${nH}</button></div>
    <button class="toggle" data-act="onlycraft" aria-pressed="${!!ui.onlyCraft}"><span class="tg" aria-hidden="true"></span>Seulement fabricables</button></div>${chips}
    <div class="at-grid">${cards || `<div class="empty sm">${ui.onlyCraft ? 'Aucune recette fabricable avec ton stock actuel.' : 'Aucune recette ici pour ce métier.'}</div>`}</div>
    <p class="hint">Plus tu fabriques une recette, mieux tu la maîtrises : jet minimal garanti et chance de <b>Jet Parfait</b>. ${ui.job === 'boulanger' ? 'Les repas se mangent depuis l’inventaire ou la fiche d’un héros (un seul repas actif à la fois). Chaque jour, le <b>Plat du jour</b> offre une portion de plus.' : 'Les objets en double peuvent être brisés en runes chez le Forgemage.'}</p>`;
}
function atCard(r, i, js) {
  const locked = js.lvl < r.lvl, max = maxCraftable(st, r), isRes = !!RESOURCES[r.out], d = isRes ? RESOURCES[r.out] : ITEMS[r.out];
  const m = masteryOf(st, r.out);
  const meta = isRes ? `${d.food ? 'Repas' : 'Clef de donjon'} · en stock : ${st.res[r.out] || 0}` : d.harvest ? `Outil de récolte · ${HARVEST_SLOT_LABEL[d.slot]} · Paysan ${d.lvl}` : `${SLOT_LABEL[d.slot === 'anneau' ? 'anneau1' : d.slot]} · niveau ${d.lvl}${d.set ? ' · ' + SETS[d.set].name : ''}`;
  const prog = m.next ? (m.n - m.rank.at) / (m.next.at - m.rank.at) : 1;
  const mast = isRes && !d.food ? `<div class="rc-mast"><span class="sub">Fabriqués : <b class="num">${fmt(m.n)}</b></span></div>`
    : `<div class="rc-mast"><div class="rc-mhead"><span class="mrank m${m.i}"><span class="pips">${atRankPips(m.i)}</span>${m.rank.name}</span><small class="sub num">${m.next ? `${m.n} / ${m.next.at}` : `${m.n} fabriqués`}</small></div>
        <div class="bar mast thin"><i style="width:${(prog * 100).toFixed(0)}%"></i></div>
        <div class="rc-perks">${d.food ? '' : `<span title="Chaque jet est au moins à ce pourcentage de sa fourchette">Jet ≥ <b>${Math.round(m.rank.floor * 100)} %</b></span>`}<span title="${d.food ? 'Chance de sortir une double fournée (×2)' : 'Chance que tous les jets soient au maximum'}">${d.food ? 'Fournée dorée ×2' : 'Parfait'} <b>${Math.round(m.rank.perf * 100)} %</b></span>${m.next ? `<span class="nx">→ ${m.next.name} : ${d.food ? Math.round(m.next.perf * 100) + ' %' : 'jet ≥ ' + Math.round(m.next.floor * 100) + ' %'}</span>` : '<span class="nx gold">Rang maximal</span>'}</div></div>`;
  const daily = isRes && d.food && platDuJour(js.lvl) === r.out;
  const stats = isRes ? (d.food ? `<div class="rr-stats bk-fx">${foodFxList(d.food).map(x => `<span style="--c:${STAT_COLOR[x.k] || 'var(--gold-2)'}">${x.txt}</span>`).join('')}<span class="bk-dur">⏱ ${d.food.ms / 60000} min</span></div>` : '') : `<div class="rr-stats">${Object.entries(d.stats).map(([k, [a, b]]) => `<span style="--c:${STAT_COLOR[k]}">${a === b ? a : `${a}–${b}`} ${STAT_SHORT[k] || k}</span>`).join('')}</div>`;
  const ings = Object.entries(r.ing).map(([id, n]) => { const have = st.res[id] || 0; return `<span class="ing ${have >= n ? 'ok' : 'no'}" title="${RESOURCES[id].name}">${RESOURCES[id].icon}<span class="ing-n">${RESOURCES[id].name}</span><b class="num">${fmt(have)}</b>/${n}</span>`; }).join('');
  return `<article class="rcard${locked ? ' locked' : ''}${max > 0 && !locked ? ' ready' : ''}${m.i >= 3 && !isRes ? ' master' : ''}">
    <header class="rc-top"><div class="tile${isRes ? ' res' : ''}">${isRes ? `<span class="t-emo">${d.icon}</span>` : itemIcon(r.out)}</div><div class="rc-name"><b>${esc(d.name)}${daily ? ' <span class="bk-daily">★ Plat du jour</span>' : ''}</b><small class="sub">${meta}</small></div></header>
    ${stats}${locked ? '' : mast}<div class="rr-ing">${ings}</div>
    <footer class="rr-act">${locked ? `<span class="lockt">🔒 ${JOBS[r.job].name} niveau ${r.lvl} requis</span>` : `<button class="btn sm gold" data-act="craft" data-i="${i}" data-n="1" ${max < 1 ? 'disabled' : ''}>🔨 Fabriquer</button><button class="btn sm" data-act="craft" data-i="${i}" data-n="10" ${max < 2 ? 'disabled' : ''}>×${Math.min(10, Math.max(max, 2))}</button>${max > 0 ? `<small class="sub">${max} possible${max > 1 ? 's' : ''}</small>` : ''}`}</footer></article>`;
}

/* ---------------------------- La forge : résultat d'une fabrication ---------------------------- */
function atCraft(d) {
  const r = RECIPES[+d.i]; const n = Math.min(+d.n, maxCraftable(st, r)); let last, lv = false, xp = 0; const made = [];
  for (let i = 0; i < n; i++) { last = craft(st, r); if (!last) break; xp += last.xp; lv = lv || last.lvUp; made.push(last); }
  if (!last) return;
  forgeShow(r, made, xp);
  if (lv) toast(`${JOBS[r.job].name} passe niveau ${st.jobs[r.job].lvl} !`, 'lvl');
}
function forgeShow(r, made, xp) {
  if (r.job === 'boulanger' && RESOURCES[r.out] && RESOURCES[r.out].food) return bakeShow(r, made, xp);
  const old = document.getElementById('forge'); if (old) old.remove();
  const isRes = !!RESOURCES[r.out], gs = made.map(m => m.gear).filter(Boolean), n = made.length;
  const perfect = made.some(m => m.perfect), rank = made.map(m => m.rankUp).filter(Boolean).pop();
  const best = gs.length ? gs.reduce((a, b) => (itemQuality(b) > itemQuality(a) ? b : a)) : null;
  const q = best ? Math.round(itemQuality(best) * 100) : 0;
  const sparks = [0, 1, 2].map(s => Array.from({ length: 8 }, (_, k) => { const a = -Math.PI * (.08 + Math.random() * .84), dd = 34 + Math.random() * 46; return `<i class="fg-sp" style="--dx:${(Math.cos(a) * dd).toFixed(0)}px;--dy:${(Math.sin(a) * dd).toFixed(0)}px;--t:${(.18 + s * .34 + Math.random() * .04).toFixed(2)}s;--c:${['#ffd24a', '#ff9a2a', '#fff3b0', '#ff6a2a'][k % 4]}"></i>`; }).join('')).join('');
  const reveal = isRes
    ? `<div class="fg-item res"><span class="fg-emo">${RESOURCES[r.out].icon}</span></div><b class="fg-name">${n > 1 ? n + '× ' : ''}${esc(RESOURCES[r.out].name)}</b>`
    : `<div class="fg-item ${qClass(best)}">${itemIcon(best.id)}</div><b class="fg-name">${gs.length > 1 ? gs.length + '× ' : ''}${esc(ITEMS[best.id].name)}</b>
       <div class="fg-jet ${perfect ? 'is-perf' : ''}"><span class="fg-bar"><i style="--w:${Math.min(100, q)}%"></i></span><em>${gs.length > 1 ? 'Meilleur jet' : 'Jet'} ${q} %</em></div>
       <div class="fg-stats">${Object.entries(best.stats).map(([k, v]) => `<i style="color:${STAT_COLOR[k]}">+${v} ${STAT_SHORT[k]}</i>`).join(' ')}</div>
       ${gs.length > 1 ? `<small class="fg-all">Jets : ${gs.map(g => Math.round(itemQuality(g) * 100) + ' %').join(' · ')}</small>` : ''}`;
  const el = document.createElement('div'); el.id = 'forge'; el.className = 'forge' + (perfect ? ' is-perfect' : '') + (n > 1 ? ' multi' : '');
  el.innerHTML = `<div class="forge-card" role="status">
    <div class="fg-stage"><div class="fg-glow"></div><div class="fg-anvil"><svg viewBox="0 0 120 56" aria-hidden="true"><path d="M8 14h86c8 0 14 4 18 10-8 2-16 2-24 4l-6 8h10v12H36V36h10l-8-8c-12 0-24-2-30-10Z" fill="#59606c"/><path d="M8 14h86c8 0 14 4 18 10-6 1-12 2-18 2H14c-3-3-5-7-6-12Z" fill="#8c95a3"/><path d="M36 48h46v8H36z" fill="#3a3f48"/></svg></div>
      <div class="fg-work">${JOB_ICON[r.job]}</div><div class="fg-hammer">🔨</div>${sparks}<div class="fg-flash"></div><div class="fg-wait">Fabrication…</div></div>
    <div class="fg-reveal">${perfect ? '<div class="fg-banner">✦ JET PARFAIT ✦</div>' : ''}${reveal}
      <div class="fg-foot"><span class="pop-xp">+${xp} XP ${JOB_ICON[r.job]}</span>${rank ? `<span class="fg-rank m${masteryOf(st, r.out).i}">Maîtrise : ${rank.name} !</span>` : ''}</div></div></div>`;
  document.body.appendChild(el);
  if (perfect) for (let i = 0; i < 26; i++) { const c = document.createElement('i'); c.className = 'fg-conf'; const a = Math.random() * 6.28, dd = 60 + Math.random() * 140; c.style.cssText = `--dx:${(Math.cos(a) * dd).toFixed(0)}px;--dy:${(Math.sin(a) * dd - 40).toFixed(0)}px;--c:${['#ffd24a', '#fff3b0', '#ff9a2a', '#ffe27a'][i % 4]};--r:${Math.round(Math.random() * 720)}deg;animation-delay:${(1.05 + Math.random() * .25).toFixed(2)}s`; el.querySelector('.fg-stage').appendChild(c); }
  const kill = () => { el.classList.add('out'); setTimeout(() => el.remove(), 320); };
  el.addEventListener('click', kill); setTimeout(() => { if (el.isConnected) kill(); }, perfect || rank ? 5600 : 4200);
}

/* ---------------------------- Le fournil : pétrissage, four, fournée ---------------------------- */
const BK_OVEN = `<svg class="bk-oven" viewBox="0 0 130 120" aria-hidden="true">
  <rect class="bk-chim" x="86" y="2" width="20" height="30" rx="2" fill="#6a4a36" stroke="#2a180c" stroke-width="2.5"/>
  <path d="M8 118V58Q8 14 65 14Q122 14 122 58V118Z" fill="#9a6a46" stroke="#2a180c" stroke-width="3.5"/>
  <path d="M20 40h22M54 32h24M86 40h20M12 58h18M42 52h22M76 52h22M104 60h14M20 76h24M56 70h26M92 76h22M12 94h20M44 90h24M80 92h30" stroke="#6a4430" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
  <path d="M28 118V70Q28 40 65 40Q102 40 102 70V118Z" fill="#1a0b05" stroke="#2a180c" stroke-width="3"/>
  <g class="bk-fire"><path d="M44 118Q40 96 52 84Q52 96 60 94Q58 78 68 66Q70 82 80 90Q86 100 84 118Z" fill="#ff8a1a"/><path d="M54 118Q52 104 60 98Q62 106 68 102Q70 94 74 92Q78 104 76 118Z" fill="#ffd24a"/></g>
  <path d="M14 118h102" stroke="#2a180c" stroke-width="3"/></svg>`;
function bakeShow(r, made, xp) {
  const old = document.getElementById('forge'); if (old) old.remove();
  const d = RESOURCES[r.out], n = made.reduce((a, m) => a + (m.qty || 1), 0), golden = made.some(m => m.golden), daily = made.some(m => m.daily), rank = made.map(m => m.rankUp).filter(Boolean).pop();
  const fx = foodFxList(d.food).map(x => `<i style="--c:${STAT_COLOR[x.k] || 'var(--gold-2)'}">${x.txt}</i>`).join('');
  const flour = Array.from({ length: 12 }, (_, k) => `<i class="bk-flour" style="--dx:${(Math.random() * 56 - 28).toFixed(0)}px;--dy:${(-18 - Math.random() * 30).toFixed(0)}px;animation-delay:${(.2 + (k % 3) * .3 + Math.random() * .12).toFixed(2)}s"></i>`).join('');
  const steam = Array.from({ length: 6 }, (_, k) => `<i class="bk-steam" style="--dx:${(Math.random() * 90 - 20).toFixed(0)}px;animation-delay:${(2.3 + k * .08).toFixed(2)}s"></i>`).join('');
  const el = document.createElement('div'); el.id = 'forge'; el.className = 'forge bakery' + (golden ? ' is-perfect' : '');
  el.innerHTML = `<div class="forge-card bk-card" role="status">
    <div class="bk-stage"><div class="bk-glow"></div>
      <div class="bk-bench"></div>
      <div class="bk-dough"><span></span></div><div class="bk-pin"><svg viewBox="0 0 70 16"><rect x="12" y="3" width="46" height="10" rx="5" fill="#d8b070" stroke="#5a3a1c" stroke-width="1.6"/><rect x="2" y="5" width="12" height="6" rx="3" fill="#a87840" stroke="#5a3a1c" stroke-width="1.4"/><rect x="56" y="5" width="12" height="6" rx="3" fill="#a87840" stroke="#5a3a1c" stroke-width="1.4"/></svg></div>${flour}
      <div class="bk-loaf">${d.icon}</div>
      <div class="bk-oven-w">${BK_OVEN}<div class="bk-ovenglow"></div><div class="bk-burst"></div></div>${steam}
      <div class="bk-ding">🔔 Ding !</div><div class="fg-wait bk-wait">Cuisson…</div></div>
    <div class="fg-reveal bk-reveal">${golden ? '<div class="fg-banner">✦ FOURNÉE DORÉE ×2 ✦</div>' : ''}${daily ? '<div class="bk-daily big">★ Plat du jour : portion offerte</div>' : ''}
      <div class="fg-item res bk-item"><span class="fg-emo">${d.icon}</span></div><b class="fg-name">${n > 1 ? n + '× ' : ''}${esc(d.name)}</b>
      <div class="bk-fxs">${fx}<em>⏱ ${d.food.ms / 60000} min</em></div><small class="bk-tale">${esc(d.tale || '')}</small>
      <div class="fg-foot"><span class="pop-xp">+${xp} XP ${JOB_ICON[r.job]}</span>${rank ? `<span class="fg-rank m${masteryOf(st, r.out).i}">Maîtrise : ${rank.name} !</span>` : ''}</div></div></div>`;
  document.body.appendChild(el);
  if (golden) for (let i = 0; i < 28; i++) { const c = document.createElement('i'); c.className = 'fg-conf bk-crumb'; const a = Math.random() * 6.28, dd = 60 + Math.random() * 150; c.style.cssText = `--dx:${(Math.cos(a) * dd).toFixed(0)}px;--dy:${(Math.sin(a) * dd * .8 - 40).toFixed(0)}px;animation-delay:${(2.4 + Math.random() * .3).toFixed(2)}s`; el.querySelector('.forge-card').appendChild(c); }
  const kill = () => { el.classList.add('out'); setTimeout(() => el.remove(), 320); };
  el.addEventListener('click', kill); setTimeout(() => { if (el.isConnected) kill(); }, golden || rank || daily ? 8200 : 6600);
}

/* ---------------------------- Forgemage ---------------------------- */
function atFloat(x, y, html, cls) {
  const e = document.createElement('div'); e.className = 'fm-float ' + (cls || ''); e.innerHTML = html; e.style.left = x + 'px'; e.style.top = y + 'px'; document.body.appendChild(e);
  if (e.animate) { const a = e.animate([{ transform: 'translate(-50%,-50%) scale(.5)', opacity: 0 }, { transform: 'translate(-50%,-130%) scale(1.15)', opacity: 1, offset: .2 }, { transform: 'translate(-50%,-260%) scale(1)', opacity: 0 }], { duration: 1500, easing: 'ease-out' }); a.onfinish = () => e.remove(); } else setTimeout(() => e.remove(), 1200);
}
function atBurst(x, y, col, n, d0) {
  for (let i = 0; i < n; i++) { const e = document.createElement('i'); e.className = 'fm-spark'; e.style.cssText = `left:${x}px;top:${y}px;--c:${col}`; document.body.appendChild(e); const a = Math.random() * 6.28, d = d0 * (.5 + Math.random() * .7);
    if (e.animate) { const an = e.animate([{ transform: 'translate(-50%,-50%) scale(1.6)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d}px)) scale(.2)`, opacity: 0 }], { duration: 600 + Math.random() * 300, easing: 'cubic-bezier(.1,.7,.4,1)' }); an.onfinish = () => e.remove(); } else setTimeout(() => e.remove(), 600); }
}
function atForgemage() {
  const fm = st.jobs.forgemage;
  const runes = Object.entries(RUNES).map(([k, r]) => `<div class="fm-rune" style="--c:${r.col}" title="+${r.step} ${RUNE_STAT_LABEL[k]} par rune"><span class="ri">${r.icon}</span><b class="num">${fmt(st.res['rune_' + k] || 0)}</b><small>${r.name}</small></div>`).join('');
  const bag = st.gear.filter(forgeable).sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(b) - itemQuality(a));
  if (ui.fmSel && !gearById(st, ui.fmSel)) ui.fmSel = null;
  const sel = ui.fmSel && gearById(st, ui.fmSel);
  const list = bag.length ? bag.slice(0, 80).map(g => { const d = ITEMS[g.id], by = equippedBy(st, g.uid); return `<button class="fm-it${sel && sel.uid === g.uid ? ' on' : ''}" data-act="fmsel" data-uid="${g.uid}"><div class="tile ${qClass(g)}">${itemIcon(g.id)}</div><span class="fm-itn"><b>${esc(d.name)}</b><small>Niv. ${d.lvl}${by ? ' · équipé' : ''}${g.fm ? ' · forgé' : ''}</small></span>${qualityTag(g)}</button>`; }).join('') : `<div class="empty sm">Ton sac ne contient aucun équipement à travailler.<br>Fabrique-en dans les autres ateliers ou trouve-en en combat.</div>`;
  return `<div class="fm-top"><div class="fm-runes">${runes}</div><button class="btn fm-breakbtn" data-act="brkopen">💥 Briser<small>des objets en runes</small></button></div>
    <div class="fm-main"><div class="fm-bag"><h4 class="at-h">Sac · ${bag.length}</h4><div class="fm-list">${list}</div></div>
    <div class="fm-bench-w">${sel ? atBench(sel, fm) : `<div class="fm-bench empty-bench"><div class="fm-anvil">🔮</div><b class="display">L’établi du Forgemage</b><p>Choisis un objet dans ton sac. Tu pourras le <b>forger</b> avec des runes pour augmenter ses jets (au-delà du maximum, mais les risques augmentent). Pour récupérer des runes, utilise le bouton <b>Briser</b>.</p></div>`}</div></div>
    <p class="hint">Niveau de Forgemage : +${Math.min(12, (fm.lvl * 0.12)).toFixed(1).replace('.', ',')} % de réussite et +${(fm.lvl * 0.5).toFixed(1).replace('.', ',')} % de runes au brisage.</p>`;
}
function atBench(g, fm) {
  const d = ITEMS[g.id], by = equippedBy(st, g.uid);
  const rows = Object.entries(d.stats).map(([k, [a, b]]) => {
    const inf = forgeInfo(st, g, k), r = RUNES[k], cap = Math.max(b, Math.floor(b * FM_OVER)), cur = g.stats[k], col = STAT_COLOR[k] || 'var(--fg)';
    const pc = v => (Math.max(0, Math.min(1, v / cap)) * 100).toFixed(1);
    const track = `<div class="fm-track"><i class="rng" style="left:${pc(a)}%;width:${(pc(b) - pc(a)).toFixed(1)}%"></i><i class="ov" style="left:${pc(b)}%;right:0"></i><i class="fill" style="width:${pc(cur)}%;--c:${col}"></i><u class="mk" style="left:${pc(b)}%"></u></div>`;
    const btn = r ? `<button class="btn sm gold fm-go" data-act="fmforge" data-k="${k}" ${inf.ok ? '' : 'disabled'} title="${inf.ok ? '' : esc(inf.why)}">${r.icon} +${inf.gain || r.step}<span class="fm-ch ${inf.chance >= .6 ? 'hi' : inf.chance >= .3 ? 'mid' : 'lo'}">${Math.round((inf.chance || 0) * 100)} %</span></button>` : '<span class="sub">—</span>';
    return `<div class="fm-row${cur > b ? ' over' : ''}"><div class="fm-lab"><span style="color:${col}">${STAT_LABEL[k] || k}</span><b class="num">${cur}${cur > b ? '<sup>Surjet</sup>' : ''}</b><small>${a}–${b}</small></div>${track}<div class="fm-act">${btn}${r ? `<small class="sub">${inf.have} rune${inf.have > 1 ? 's' : ''} · ${fmt(inf.cost)} k</small>` : ''}</div></div>`;
  }).join('');
  const log = (ui.fmLog || []).slice(-6).reverse().map(l => `<li class="${l[0]}">${l[1]}</li>`).join('');
  return `<div class="fm-bench"><header class="fm-bh"><div class="tile big ${qClass(g)}">${itemIcon(g.id)}</div><div><b class="display">${esc(d.name)}</b><div class="fm-tags">${qualityTag(g)}<span class="qtag">Niv. ${d.lvl}</span>${by ? `<span class="qtag">Équipé : ${esc(by.name)}</span>` : ''}${g.fm ? '<span class="qtag q-high">Forgé</span>' : ''}</div></div></header>
    <div class="fm-rows">${rows}</div>
    ${log ? `<ul class="fm-log">${log}</ul>` : ''}</div>`;
}
function atForge(d) {
  const g = gearById(st, ui.fmSel); if (!g) return;
  const out = forgemagie(st, g.uid, d.k); if (!out) return;
  const bn = document.querySelector('.fm-bench'), rc = bn ? bn.getBoundingClientRect() : null, cx = rc ? rc.left + rc.width / 2 : innerWidth / 2, cy = rc ? rc.top + 70 : innerHeight / 2;
  ui.fmLog = ui.fmLog || [];
  if (out.err) { toast(out.err, 'warn'); return; }
  st.stats.forged = (st.stats.forged || 0) + 1;
  const lab = STAT_LABEL[out.k] || out.k, col = RUNES[out.k].col;
  if (out.kind === 'crit') { ui.fmLog.push(['crit', `✨ Réussite critique ! +${out.gain} ${lab}`]); atBurst(cx, cy, '#ffe27a', 34, 90); atFloat(cx, cy, `RÉUSSITE CRITIQUE<br>+${out.gain} ${lab}`, 'crit'); }
  else if (out.kind === 'ok') { ui.fmLog.push(['ok', `+${out.gain} ${lab}`]); atBurst(cx, cy, col, 18, 60); atFloat(cx, cy, `+${out.gain} ${lab}`, 'ok'); }
  else if (out.kind === 'cfail') { ui.fmLog.push(['cfail', `Échec critique : ${lab} inchangé, −${out.lost.n} ${STAT_LABEL[out.lost.k] || out.lost.k}`]); atBurst(cx, cy, '#e8605a', 22, 60); atFloat(cx, cy, `ÉCHEC CRITIQUE<br>−${out.lost.n} ${STAT_LABEL[out.lost.k] || out.lost.k}`, 'cfail'); }
  else { ui.fmLog.push(['fail', `Échec : la rune se brise.`]); atBurst(cx, cy, '#8f8c78', 10, 40); atFloat(cx, cy, 'Échec', 'fail'); }
  if (bn && bn.animate) bn.animate(out.kind === 'fail' || out.kind === 'cfail' ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }] : [{ filter: 'brightness(1)' }, { filter: 'brightness(1.5)' }, { filter: 'brightness(1)' }], { duration: 380 });
  if (out.lvUp) toast(`Forgemage passe niveau ${st.jobs.forgemage.lvl} !`, 'lvl');
}
/* ---------- Briser : menu de brisage en série (filtres) ---------- */
function brkState() { if (!ui.brk) ui.brk = { jet: 20, lvl: 999, slots: [], protect: true, off: {}, confirm: false }; return ui.brk; }
function brkPool() { return st.gear.filter(g => forgeable(g) && !g.stasis && !equippedBy(st, g.uid)); }
function brkMatches() {
  const f = brkState();
  return brkPool().filter(g => { const d = ITEMS[g.id]; return Math.round(itemQuality(g) * 100) <= f.jet && d.lvl <= f.lvl && (!f.slots.length || f.slots.includes(d.slot)) && !(f.protect && g.fm); })
    .sort((a, b) => ITEMS[b.id].lvl - ITEMS[a.id].lvl || itemQuality(a) - itemQuality(b));
}
function brkSelected() { const f = brkState(); return brkMatches().filter(g => !f.off[g.uid]); }
function brkSummary() {
  const sel = brkSelected(), tot = {}, mul = 1 + st.jobs.forgemage.lvl * 0.005; let xp = 0;
  for (const g of sel) { for (const [k, v] of Object.entries(brisageRunes(g))) tot[k] = (tot[k] || 0) + v * mul; xp += Math.round((6 + ITEMS[g.id].lvl * 1.6) * CRAFT_XP_MULT); }
  return { sel, tot, xp };
}
function brkListHtml() {
  const f = brkState(), all = brkMatches(), s = brkSummary();
  const list = all.length ? all.map(g => { const d = ITEMS[g.id], on = !f.off[g.uid]; return `<button class="brk-it${on ? ' on' : ''}" data-act="brktoggle" data-uid="${g.uid}" aria-pressed="${on}"><span class="brk-ck">${on ? '✓' : ''}</span><div class="tile sm ${qClass(g)}">${itemIcon(g.id)}</div><span class="fm-itn"><b>${esc(d.name)}</b><small>Niv. ${d.lvl} · ${SLOT_LABEL[d.slot === 'anneau' ? 'anneau1' : d.slot]}${g.fm ? ' · forgé' : ''}</small></span>${qualityTag(g)}</button>`; }).join('')
    : `<div class="empty sm">Aucun objet ne correspond à ces filtres.</div>`;
  const runes = Object.entries(s.tot).map(([k, v]) => `<span style="--c:${RUNES[k].col}">${RUNES[k].icon} ~${Math.max(1, Math.round(v))}</span>`).join('');
  const n = s.sel.length;
  return { list, sum: `<div class="brk-sum"><div><b>${n} objet${n > 1 ? 's' : ''}</b> sur ${all.length} · <span class="sub">+${fmt(s.xp)} XP Forgemage</span><div class="fm-pred">${runes || '<span class="sub">Aucune rune</span>'}</div></div>
    <button class="btn ${f.confirm ? 'danger' : 'gold'}" data-act="brkgo" ${n ? '' : 'disabled'}>${f.confirm ? `Confirmer : briser ${n} objet${n > 1 ? 's' : ''} !` : '💥 Briser la sélection'}</button></div>` };
}
function brkRender() {
  const box = $('#modal'); if (!box) return;
  const f = brkState(), pool = brkPool();
  const maxLvl = Math.max(1, ...pool.map(g => ITEMS[g.id].lvl)); if (f.lvl > maxLvl) f.lvl = maxLvl;
  const slots = [...new Set(pool.map(g => ITEMS[g.id].slot))];
  f.slots = f.slots.filter(s => slots.includes(s));
  const b = brkListHtml();
  box.hidden = false;
  box.innerHTML = `<div class="brk-back" data-act="brkclose"></div><div class="panel brk" role="dialog" aria-label="Briser des objets">
    <header class="brk-h"><div><h3 class="display">💥 Briser des objets</h3><small class="sub">Choisis ce que tu veux transformer en runes. Les objets équipés et stasifiés ne sont jamais brisés.</small></div><button class="btn sm ghost" data-act="brkclose" aria-label="Fermer">✕</button></header>
    <div class="brk-filters">
      <label class="brk-f"><span>Jet maximum <b id="brk-jv">${f.jet} %</b></span><input type="range" min="0" max="100" step="5" value="${f.jet}" data-input="brk-jet"></label>
      <label class="brk-f"><span>Niveau maximum <b id="brk-lv">${f.lvl >= maxLvl ? 'Tous' : f.lvl}</b></span><input type="range" min="1" max="${maxLvl}" step="1" value="${f.lvl}" data-input="brk-lvl"></label>
      <div class="at-chips"><button data-act="brkslot" data-v="" aria-pressed="${!f.slots.length}">Tous les emplacements</button>${slots.map(s => `<button data-act="brkslot" data-v="${s}" aria-pressed="${f.slots.includes(s)}">${SLOT_LABEL[s === 'anneau' ? 'anneau1' : s] || s}</button>`).join('')}</div>
      <button class="toggle" data-act="brkprotect" aria-pressed="${f.protect}"><span class="tg" aria-hidden="true"></span>Protéger les objets déjà forgés</button>
    </div>
    <div class="brk-list" id="brk-list">${b.list}</div><div id="brk-sum">${b.sum}</div></div>`;
}
function brkRefresh() { const f = brkState(); f.confirm = false; const b = brkListHtml(); const l = $('#brk-list'), s = $('#brk-sum'); if (l) l.innerHTML = b.list; if (s) s.innerHTML = b.sum; const jv = $('#brk-jv'), lv = $('#brk-lv'); if (jv) jv.textContent = f.jet + ' %'; if (lv) { const m = Math.max(1, ...brkPool().map(g => ITEMS[g.id].lvl)); lv.textContent = f.lvl >= m ? 'Tous' : f.lvl; } }
function atBrkOpen() { ui.brk = null; brkState(); brkRender(); }
function atBrkClose() { const b = $('#modal'); b.hidden = true; b.innerHTML = ''; ui.brk = null; }
function atBrkGo() {
  const f = brkState(), sel = brkSelected(); if (!sel.length) return 'keep';
  if (!f.confirm) { f.confirm = true; const b = brkListHtml(); $('#brk-sum').innerHTML = b.sum; return 'keep'; }
  const runes = {}; let xp = 0, lv = false, n = 0; const icons = [];
  for (const g of sel) { const res = brisage(st, g.uid); if (typeof res === 'string') continue; n++; xp += res.xp; lv = lv || res.lvUp; icons.push(res.id); for (const [k, v] of Object.entries(res.runes)) runes[k] = (runes[k] || 0) + v; }
  st.stats.broken = (st.stats.broken || 0) + n;
  atBrkClose(); ui.fmSel = ui.fmSel && gearById(st, ui.fmSel) ? ui.fmSel : null; ui.fmLog = [];
  breakShow(icons, runes, n, xp);
  if (lv) toast(`Forgemage passe niveau ${st.jobs.forgemage.lvl} !`, 'lvl');
}
/* ---------- Cinématique de brisage : les objets volent en éclats, les runes apparaissent ---------- */
function breakShow(icons, runes, n, xp) {
  const old = document.getElementById('forge'); if (old) old.remove();
  const el = document.createElement('div'); el.id = 'forge'; el.className = 'forge breaking';
  const shown = icons.slice(0, 5), S = 46, W = 340, GY = 78;
  const cx = i => W / 2 + (i - (shown.length - 1) / 2) * 62;
  const chips = Object.entries(runes).map(([k, v]) => `<span class="fg-rune" data-k="${k}" style="--c:${RUNES[k].col}">${RUNES[k].icon} +<b data-n="${v}">0</b></span>`).join('');
  el.innerHTML = `<div class="forge-card"><div class="fg-stage fg-bstage"><div class="fg-circle"></div><div class="fg-glow"></div>
      ${shown.map((id, i) => `<div class="fg-bitem" style="left:${cx(i) - S / 2}px;top:${GY - S / 2}px;width:${S}px;height:${S}px;animation-delay:${i * .07}s">${itemIcon(id)}</div>`).join('')}
      <div class="fg-bhammer">🔨</div><div class="fg-flash b"></div></div>
    <div class="fg-reveal fg-breveal"><b class="fg-name">${n} objet${n > 1 ? 's' : ''} brisé${n > 1 ? 's' : ''}</b><div class="fg-runes">${chips || '<span class="sub">Aucune rune…</span>'}</div><div class="fg-foot"><span class="pop-xp">+${fmt(xp)} XP 🔮</span></div></div></div>`;
  document.body.appendChild(el);
  const stage = el.querySelector('.fg-stage'), alive = () => el.isConnected, at = (ms, fn) => setTimeout(() => { if (alive()) fn(); }, ms);
  const add = (cls, x, y, html = '', style = '') => { const d = document.createElement('div'); d.className = cls; d.style.cssText = `left:${x}px;top:${y}px;${style}`; d.innerHTML = html; stage.appendChild(d); return d; };
  const run = (d, frames, o) => { if (!d.animate) { setTimeout(() => d.remove(), o.duration); return; } const an = d.animate(frames, { fill: 'forwards', easing: 'ease-out', ...o }); an.onfinish = () => d.remove(); };
  const TS = 560; // l'impact du marteau
  at(TS, () => {
    el.classList.add('shake');
    run(add('fg-ring', W / 2, GY), [{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 1 }, { transform: 'translate(-50%,-50%) scale(7)', opacity: 0 }], { duration: 700 });
    shown.forEach((id, i) => {
      const x0 = cx(i), delay = Math.abs(i - (shown.length - 1) / 2) * 45;
      setTimeout(() => {
        if (!alive()) return;
        const art = el.querySelectorAll('.fg-bitem')[i]; if (art) art.style.visibility = 'hidden';
        const N = 3, pts = []; for (let r = 0; r <= N; r++) for (let c = 0; c <= N; c++) pts.push([c / N * 100 + (c > 0 && c < N ? (Math.random() - .5) * 16 : 0), r / N * 100 + (r > 0 && r < N ? (Math.random() - .5) * 16 : 0)]);
        for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
          const p = (rr, cc) => pts[rr * (N + 1) + cc], tl = p(r, c), tr = p(r, c + 1), bl = p(r + 1, c), br = p(r + 1, c + 1);
          (Math.random() < .5 ? [[tl, tr, br], [tl, br, bl]] : [[tl, tr, bl], [tr, br, bl]]).forEach(tri => {
            const mx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3 - 50, my = (tri[0][1] + tri[1][1] + tri[2][1]) / 3 - 50;
            const sh = add('fg-shard', x0 - S / 2, GY - S / 2, itemIcon(id), `width:${S}px;height:${S}px;clip-path:polygon(${tri.map(q => q[0].toFixed(1) + '% ' + q[1].toFixed(1) + '%').join(',')})`);
            const sp = 70 + Math.random() * 90, vx = (mx / 50) * sp + (Math.random() - .5) * 40, vy = (my / 50) * sp - 70 - Math.random() * 40, g = 380, rot = (Math.random() - .5) * 900;
            const kf = [0, .25, .5, .75, 1].map(t => { const tt = t * .95; return { transform: `translate(${(vx * tt).toFixed(1)}px,${(vy * tt + .5 * g * tt * tt).toFixed(1)}px) rotate(${(rot * t).toFixed(0)}deg) scale(${(1 - t * .35).toFixed(2)})`, opacity: t < .7 ? 1 : 1 - (t - .7) / .3, offset: t }; });
            run(sh, kf, { duration: 950, easing: 'linear' });
          });
        }
        for (let q = 0; q < 12; q++) { const a = Math.random() * 6.28, d = 24 + Math.random() * 40, p = add('fg-dust', x0, GY); run(p, [{ transform: 'translate(-50%,-50%) scale(1.4)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d - 10}px)) scale(.1)`, opacity: 0 }], { duration: 520 + Math.random() * 280 }); }
      }, delay);
    });
  });
  // les runes jaillissent des débris puis rejoignent le récapitulatif
  const glyphs = []; Object.entries(runes).forEach(([k, v]) => { const cnt = Math.min(6, Math.max(1, Math.ceil(v / 4))); for (let q = 0; q < cnt; q++) glyphs.push(k); });
  glyphs.forEach((k, gi) => at(TS + 330 + gi * 70, () => {
    const x0 = cx(gi % shown.length) + (Math.random() - .5) * 26, g = add('fg-rglyph', x0, GY + 6, RUNES[k].icon, `--c:${RUNES[k].col}`);
    run(g, [{ transform: 'translate(-50%,-50%) scale(0) rotate(-40deg)', opacity: 0 }, { transform: 'translate(-50%,-90%) scale(1.5) rotate(8deg)', opacity: 1, offset: .22 }, { transform: `translate(calc(-50% + ${(Math.random() - .5) * 30}px),-170%) scale(1.2) rotate(-6deg)`, opacity: 1, offset: .55 }, { transform: `translate(calc(-50% + ${(W / 2 - x0) * .6}px),${stage.offsetHeight - GY + 24}px) scale(.5)`, opacity: 0 }], { duration: 1250, easing: 'ease-in-out' });
  }));
  // décompte des runes obtenues
  at(TS + 900, () => { el.querySelectorAll('.fg-rune b[data-n]').forEach(b => { const tot = +b.dataset.n, t0 = performance.now(); (function tick(now) { const p = Math.min(1, (now - t0) / 800); b.textContent = Math.round(tot * (1 - Math.pow(1 - p, 3))); if (p < 1 && alive()) requestAnimationFrame(tick); else b.textContent = tot; })(t0); }); });
  const kill = () => { el.classList.add('out'); setTimeout(() => el.remove(), 320); };
  el.addEventListener('click', kill); setTimeout(() => { if (el.isConnected) kill(); }, 5200);
}
document.addEventListener('input', e => {
  const t = e.target.dataset && e.target.dataset.input; if (t !== 'brk-jet' && t !== 'brk-lvl') return;
  const f = brkState(); if (t === 'brk-jet') f.jet = +e.target.value; else f.lvl = +e.target.value;
  brkRefresh();
});
