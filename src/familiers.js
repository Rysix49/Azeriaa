/* =====================================================================
   FAMILIERS — onglet « Familiers » (adoption, repas, équipement) et familier en combat.
   Données et règles : pets.js · dessins : art6*.js · styles : petart.css, style3.css (.pt-*)
   ===================================================================== */
/* ---------------------------- En combat ---------------------------- */
function petSlot(h) {
  petInjectCss();
  if (!h.pet || !PETS[h.pet] || !st.pets || !st.pets[h.pet]) return '';
  const inf = petInfo(st, h.pet);
  return `<div class="pet-slot" data-k="pet" data-pet="${h.pet}" title="${esc(PETS[h.pet].name)} · niv. ${inf.lvl}"><div class="pet-wrap${h.fight ? '' : ' rest'}${h.hp <= 0 && h.resting ? ' dead' : ''}">${petSprite(h.pet)}</div></div>`;
}
/* Le familier réagit : bondit quand son maître lance un sort, tressaille quand il est touché */
function petReact(card, kind) {
  const w = card && card.querySelector('.pet-wrap'); if (!w || w.classList.contains('cheer') || w.classList.contains('hurt')) return;
  w.classList.add(kind); setTimeout(() => w.classList.remove(kind), 560);
}
/* Suit l'état du héros : repos (animations lentes + « z »), à terre */
function petPatch(h, card) {
  const w = card.querySelector('.pet-wrap'); if (!w) return;
  const down = h.hp <= 0 && h.resting;
  w.classList.toggle('rest', !h.fight); w.classList.toggle('dead', down);
  const zz = w.parentNode.querySelector('.pet-zz'), sleepy = !h.fight && !down && (!h.act || h.resting);
  if (sleepy && !zz) { const z = document.createElement('i'); z.className = 'pet-zz'; z.textContent = 'z'; w.parentNode.appendChild(z); } else if (!sleepy && zz) zz.remove();
}

/* ---------------------------- Écran ---------------------------- */
const petRes = rid => RESOURCES[rid] || { name: rid, icon: '❔' };
const petStatChip = (k, v) => `<i style="color:${STAT_COLOR[k] || 'var(--fg)'}">+${String(v).replace('.', ',')} ${STAT_LABEL[k] || k}</i>`;
function petSelected() {
  if (ui.pet && PETS[ui.pet]) return ui.pet;
  const h = selHero();
  if (h && h.pet) return (ui.pet = h.pet);
  const mine = Object.keys(PETS).find(id => st.pets && st.pets[id]);
  return (ui.pet = mine || Object.keys(PETS)[0]);
}
function petCard(id, sel) {
  const p = PETS[id], tr = petTier(id), inf = petInfo(st, id), own = petOwner(st, id);
  const lock = !inf && maxHeroLevel(st) < p.lvl;
  const tag = inf ? `<small class="pk-lv">Niv. ${inf.lvl}${inf.max ? ' ★' : ''}</small>` : lock ? `<small class="pk-lock">🔒 niv. ${p.lvl}</small>` : `<small class="pk-adopt">Adoptable</small>`;
  return `<button class="pkcard${sel ? ' sel' : ''}${inf ? ' own' : ''}${lock ? ' lock' : ''}" style="--tc:${tr.col}" data-act="petsel" data-id="${id}" aria-pressed="${sel}" title="${esc(p.name)} · ${tr.name}">
    <span class="pk-spr">${petSprite(id, 'still')}</span><b>${esc(p.name)}</b>${tag}${own ? `<span class="pk-by" title="Porté par ${esc(own.name)}">${emblem(own.cls, true)}</span>` : ''}</button>`;
}
function petFoodRow(id, rid, treat) {
  const r = petRes(rid), info = petFoodInfo(rid), have = st.res[rid] || 0, inf = petInfo(st, id), full = !inf || inf.max;
  const per = treat ? PET_TREAT : 1, need = inf ? Math.max(0, petTier(id).meals - inf.meals) : 0, all = Math.min(have, Math.ceil(need / per));
  const where = info.from.length ? `${info.from.join(', ')} · niv. ${info.lvl}` : 'Butin rare';
  const b = (n, l) => `<button class="btn sm${n === 'all' ? ' gold' : ''}" data-act="petfeed" data-id="${id}" data-rid="${rid}" data-n="${n}" ${full || have < (n === 'all' ? 1 : n) ? 'disabled' : ''}>${l}</button>`;
  return `<div class="pfood${treat ? ' treat' : ''}${have ? ' has' : ''}" data-rid="${rid}">
    <span class="tile sm res${treat ? ' q-high' : ''}"><span class="t-emo">${r.icon}</span></span>
    <span class="pf-n"><b>${esc(r.name)}${treat ? ' <em>Friandise · ' + PET_TREAT + ' repas</em>' : ''}</b><small>${esc(where)}</small></span>
    <span class="pf-have num" data-pk="have">×${fmt(have)}</span>
    <span class="pf-btns">${b(1, '+1')}${b(10, '+10')}${b(100, '+100')}${b('all', all > 1 ? `Tout (${fmt(all)})` : 'Tout')}</span></div>`;
}
function petDetail(id) {
  const p = PETS[id], tr = petTier(id), inf = petInfo(st, id), own = petOwner(st, id);
  const fx = ui.petFx && ui.petFx.id === id ? ui.petFx.kind : ''; ui.petFx = null;
  const lvl = inf ? inf.lvl : 1, now = petStatsAt(id, lvl), max = petStatsAt(id);
  const stats = Object.keys(p.stats).map(k => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--fg)'}"><span data-pk="st-${k}">+${String(inf ? now[k] : 0).replace('.', ',')} ${STAT_LABEL[k] || k}</span><small>max +${String(max[k]).replace('.', ',')}</small></div>`).join('');
  let head = `<div class="pd-stage"><span class="pd-spr${fx ? ' ' + fx : ''}" style="--ps:150px">${petSprite(id)}</span></div>
    <div class="pd-id"><span class="pd-tier" style="--tc:${tr.col}">${tr.name}</span><h3 class="display">${esc(p.name)}</h3><p class="sub">${esc(p.desc)}</p></div>`;
  if (!inf) {
    const why = canAdopt(st, id);
    return `<div class="pd" style="--tc:${tr.col}">${head}
      <div class="pd-stats">${Object.keys(p.stats).map(k => `<div class="s" style="--c:${STAT_COLOR[k] || 'var(--fg)'}"><span>jusqu’à +${String(max[k]).replace('.', ',')} ${STAT_LABEL[k] || k}</span></div>`).join('')}</div>
      <div class="pd-adopt"><div><b class="num">${fmt(tr.adopt)}</b> kamas<small>${maxHeroLevel(st) >= p.lvl ? 'Niveau de héros requis atteint' : `Il faut un héros de niveau ${p.lvl}`}</small></div>
        <button class="btn gold" data-act="petadopt" data-id="${id}" ${why ? 'disabled' : ''}>Adopter</button></div>
      <p class="hint">Régime : ${petDietIds(id).map(r => `${petRes(r).icon} ${esc(petRes(r).name)}`).join(' · ')}.</p></div>`;
  }
  const pct = inf.max ? 100 : inf.into / inf.span * 100;
  const heroes = st.heroes.map(x => { const on = x.pet === id, has = x.pet && x.pet !== id ? PETS[x.pet] : null;
    return `<button class="htab${on ? ' on' : ''}" data-act="petwear" data-id="${id}" data-hero="${x.id}" aria-pressed="${on}" style="--c:${CLASSES[x.cls].color}">${emblem(x.cls, true)}<span><b>${esc(x.name)}</b><small>${on ? 'Équipé · retirer' : has ? `Remplace ${esc(has.name)}` : 'Équiper'}</small></span></button>`; }).join('');
  const food = `${PETS[id].diet.map(r => petFoodRow(id, r, false)).join('')}${(PETS[id].treats || []).map(r => petFoodRow(id, r, true)).join('')}`;
  return `<div class="pd" style="--tc:${tr.col}">${head}
    <div class="pd-lv"><div class="pd-lvh"><b class="num" data-pk="lv">Niv. ${lvl}<small> / ${PET_MAXLVL}</small></b><span class="sub num" data-pk="meals">${inf.max ? 'Niveau maximal' : `${fmt(inf.into)} / ${fmt(inf.span)} repas`}</span></div>
      <div data-pk="lvbar">${bar('xp', inf.max ? 1 : inf.into, inf.max ? 1 : inf.span)}</div>
      <small class="sub num" data-pk="tomax">${inf.max ? 'Il a mangé à sa faim.' : `Encore ${fmt(inf.toMax)} repas jusqu’au niveau maximal`}</small></div>
    <div class="pd-stats" data-pk="stats">${stats}</div>
    <h4 class="pd-h">Compagnon de</h4><div class="pd-heroes">${heroes || '<span class="sub">Recrute un héros pour l’équiper.</span>'}</div>
    <h4 class="pd-h">Repas <small>${tr.name} : ressources de niveau ${petFoodRange(id)}</small></h4><div class="pd-food">${food}</div></div>`;
}
function petFoodRange(id) { const ls = petDietIds(id).filter(r => !(RESOURCES[r] && RESOURCES[r].rare)).map(r => petFoodInfo(r).lvl).filter(Boolean); return ls.length ? `${Math.min(...ls)}–${Math.max(...ls)}` : '?'; }
function renderFamiliers() {
  petInjectCss();
  const id = petSelected(), owned = Object.keys(PETS).filter(x => st.pets && st.pets[x]).length, total = Object.keys(PETS).length;
  const groups = PET_TIERS.map((tr, t) => tr && `<div class="pt-tier" style="--tc:${tr.col}"><h4><span class="pt-dot"></span>${tr.name}<small>${PET_TIERS[t] ? `à partir du niv. ${Math.min(...Object.values(PETS).filter(p => p.tier === t).map(p => p.lvl))} · +${tr.budget} % de puissance au max` : ''}</small></h4>
    <div class="pt-cards">${Object.keys(PETS).filter(x => PETS[x].tier === t).map(x => petCard(x, x === id)).join('')}</div></div>`).filter(Boolean).join('');
  return `<div class="pt"><div class="pt-intro"><span>Nourris tes familiers avec le butin des monstres : plus ils sont puissants, plus ils réclament des ressources de haut niveau.</span><b class="num">${owned}/${total}</b></div>
    <div class="pt-main"><div class="pt-detail" id="pt-detail">${petDetail(id)}</div><div class="pt-list">${groups}</div></div></div>`;
}
/* Signature de l'écran : tout ce qui change la structure (pas les stocks de ressources, mis à jour sur place) */
function petSig() {
  const id = ui.pet || '';
  return [id, Object.entries(st.pets || {}).map(([k, v]) => k + v.meals).join(','), st.heroes.map(h => h.id + (h.pet || '-') + h.cls).join(','), Math.min(maxHeroLevel(st), 200), st.kamas >= (PETS[id] ? petTier(id).adopt : 0)].join('|');
}
/* Met à jour sur place les stocks de ressources et les boutons (sans redessiner : les animations ne repartent pas) */
function petPatchView() {
  const id = ui.pet, root = document.getElementById('pt-detail'); if (!root || !PETS[id] || !st.pets[id]) return;
  const inf = petInfo(st, id);
  root.querySelectorAll('.pfood').forEach(row => {
    const rid = row.dataset.rid, have = st.res[rid] || 0, treat = (PETS[id].treats || []).includes(rid);
    const hv = row.querySelector('[data-pk="have"]'), t = '×' + fmt(have); if (hv && hv.textContent !== t) hv.textContent = t;
    row.classList.toggle('has', have > 0);
    const per = treat ? PET_TREAT : 1, need = Math.max(0, petTier(id).meals - inf.meals), all = Math.min(have, Math.ceil(need / per));
    row.querySelectorAll('button[data-n]').forEach(b => { const n = b.dataset.n === 'all' ? 1 : +b.dataset.n, off = inf.max || have < n; if (b.disabled !== off) b.disabled = off; if (b.dataset.n === 'all') { const l = all > 1 ? `Tout (${fmt(all)})` : 'Tout'; if (b.textContent !== l) b.textContent = l; } });
  });
}
