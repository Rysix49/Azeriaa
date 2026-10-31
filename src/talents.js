/* =====================================================================
   TALENTS DE CLASSE — onglet « Talents » : un arbre propre à chaque classe (3 voies de 8 talents).
   Données : skilltrees.js (CLASS_TREES) · calculs : engine.js (skillCheck, skillTotals…)
   ===================================================================== */
const SK_ROW_H = 108;
function skStatLine(fx, mult = 1) { return Object.entries(fx).map(([k, v]) => `<i style="color:${STAT_COLOR[k] || 'var(--gold-2)'}">${skillFmt(k, v * mult)}</i>`).join(''); }
function skNodeState(h, n) {
  const r = (h.skills && h.skills[n.id]) || 0, err = skillCheck(h, n.id);
  const open = (!n.req.length || n.req.some(q => h.skills && h.skills[q] > 0)) && skillBranchSpent(h, n.branch) >= SKILL_GATE[n.r];
  return { r, err, max: r >= n.max, can: !err, open };
}
function skBranchMax(b) { return b.nodes.reduce((a, n) => a + n[3] * n[8], 0); }
function skKeyNode(b) { return SKILL_NODE[b.nodes[7][0]]; }
function renderTalents() {
  const h = selHero(); if (!h) return `<div class="empty">Recrute un héros pour découvrir les talents de sa classe.</div>`;
  const tree = skillTree(h.cls), c = CLASSES[h.cls];
  const free = skillFree(h), total = skillPoints(h), spent = skillSpent(h), sk = skillTotals(h);
  const next = h.lvl >= MAX_LEVEL ? null : (Math.floor(h.lvl / SKILL_LEVELS_PER_POINT) + 1) * SKILL_LEVELS_PER_POINT;
  const bid = ui.skBranch && tree.some(b => b.id === ui.skBranch) ? ui.skBranch : 'all';
  const just = ui.skJust; ui.skJust = null;
  const chips = st.heroes.map(x => { const f = skillFree(x); return `<button class="htab" data-act="skhero" data-hero="${x.id}" aria-pressed="${x.id === h.id}" style="--c:${CLASSES[x.cls].color}">${emblem(x.cls, true)}<span><b>${esc(x.name)}</b><small>${CLASSES[x.cls].name} · ${f > 0 ? `<em class="sk-fp">${f} pt${f > 1 ? 's' : ''}</em>` : 'à jour'}</small></span></button>`; }).join('');
  const head = `<div class="sk-ban" style="--hc:${c.color}">
    <div class="sk-ban-art" aria-hidden="true">${emblem(h.cls, 'big')}</div>
    <div class="sk-who"><small class="sk-cls">${c.role}</small><b class="display">${esc(h.name)}</b><small>${c.name} · niveau ${h.lvl}</small><span class="sk-sig">${c.passive ? esc(c.passive.name) : ''}</span></div>
    <div class="sk-pts ${free > 0 ? 'has' : ''}"><b class="num">${free}</b><small>point${free > 1 ? 's' : ''} de talent</small><span class="sub num">${spent} dépensé${spent > 1 ? 's' : ''} sur ${total}${next ? ` · prochain niv. ${next}` : ''}</span></div>
    <div class="sk-rs">${ui.skConfirm ? `<span class="sub">Rendre tous les points pour ${fmt(skillRespecCost(h))} K ?</span><button class="btn sm danger" data-act="skrespec2">Confirmer</button><button class="btn sm ghost" data-act="skrespec0">Annuler</button>` : `<button class="btn sm" data-act="skrespec" ${spent ? '' : 'disabled'}>↺ Réinitialiser${spent ? ` · ${fmt(skillRespecCost(h))} K` : ''}</button>`}</div></div>
    <div class="hero-tabs sk-heroes">${chips}</div>`;
  const tabs = `<div class="sk-tabs" style="--hc:${c.color}"><button data-act="skbranch" data-v="all" aria-pressed="${bid === 'all'}"><span>🌳</span>Vue d’ensemble</button>${tree.map(b => `<button data-act="skbranch" data-v="${b.id}" aria-pressed="${bid === b.id}" style="--bc:${b.col}"><span>${b.icon}</span>${b.name.replace(/^Voie (du |de la |de l’|des |d’)?/, '')}<em class="num">${skillBranchSpent(h, b.id)}</em></button>`).join('')}</div>`;
  return `<div class="sk" style="--hc:${c.color}">${head}${tabs}${bid === 'all' ? skOverview(h, tree, sk, spent) : skBranch(h, tree.find(b => b.id === bid), just)}</div>`;
}
function skMilestones(h, b, compact) {
  const sp = skillBranchSpent(h, b.id), done = b.mile.filter(([at]) => sp >= at).length;
  if (compact) { const nx = b.mile.find(([at]) => sp < at); return `<div class="sk-mile sk-mc"><div class="${done ? 'on' : ''}"><span class="sk-mn num">${done}</span><div><small>Paliers actifs sur ${b.mile.length}</small>${done ? 'Tous les bonus cumulés' : 'Aucun pour l’instant'}</div></div>${nx ? `<div><span class="sk-mn num">${nx[0]}</span><div><small>Prochain · ${sp}/${nx[0]} points</small>${skStatLine(nx[1])}</div></div>` : '<div class="on"><span class="sk-mn">★</span><div><small>Voie complète</small>Tous les paliers sont actifs</div></div>'}</div>`; }
  return `<div class="sk-mile">${b.mile.map(([at, fx], i) => `<div class="${sp >= at ? 'on' : ''}${i === b.mile.length - 1 ? ' maj' : ''}"><span class="sk-mn num">${at}</span><div><small>${sp >= at ? 'Actif' : `${sp}/${at} points`}</small>${skStatLine(fx)}</div></div>`).join('')}</div>`;
}
function skOverview(h, tree, sk, spent) {
  const cards = tree.map(b => { const sp = skillBranchSpent(h, b.id), maxp = skBranchMax(b), kn = skKeyNode(b), keyed = (h.skills && h.skills[kn.id]) > 0;
    return `<button class="sk-card${keyed ? ' keyed' : ''}" data-act="skbranch" data-v="${b.id}" data-ic="${b.icon}" style="--bc:${b.col}"><span class="sk-cico">${b.icon}</span><b class="display">${b.name}</b><small>${b.text}</small>
      <div class="bar sk-bar"><i style="width:${Math.min(100, sp / maxp * 100).toFixed(0)}%"></i></div><span class="sub num">${sp} / ${maxp} points</span><span class="sk-per">✦ Par point : ${skStatLine(b.per)}</span>${skMilestones(h, b, true)}</button>`; }).join('');
  /* passifs de classe : un talent clé par voie, qui change vraiment la façon de jouer */
  const keys = tree.map(b => { const kn = skKeyNode(b), r = (h.skills && h.skills[kn.id]) || 0, s = skNodeState(h, kn), sp = skillBranchSpent(h, b.id), need = SKILL_GATE[kn.r];
    return `<button class="sk-key${r ? ' on' : ''}${s.can ? ' can' : ''}" data-act="skopen" data-v="${b.id}" data-id="${kn.id}" style="--bc:${b.col}"><span class="sk-key-ic"><i>${kn.icon}</i></span><span class="sk-key-t"><span class="sk-key-h"><b class="display">${esc(kn.name)}</b><em class="sk-key-s">${r ? '✓ Appris' : s.can ? 'Prêt · 3 pts' : `🔒 ${sp}/${need} pts`}</em></span><small>${esc(kn.txt)}</small><span class="sk-fx">${skStatLine(kn.fx)}</span></span></button>`; }).join('');
  const tot = Object.entries(sk).filter(([k, v]) => SKILL_STAT[k] && Math.abs(v) >= 0.005).sort((a, b) => Object.keys(SKILL_STAT).indexOf(a[0]) - Object.keys(SKILL_STAT).indexOf(b[0]));
  const glob = `<div class="sk-glob"><h4 class="at-h">Seuils de puissance <small>(points dépensés au total : ${spent})</small></h4><div class="sk-mile">${SKILL_GLOBAL.map(([at, fx]) => `<div class="${spent >= at ? 'on' : ''}"><span class="sk-mn num">${at}</span><div><small>${spent >= at ? 'Actif' : `${spent}/${at} points`}</small>${skStatLine(fx)}</div></div>`).join('')}</div></div>`;
  return `<div class="sk-grid">${cards}</div>
    <div class="sk-keys"><h4 class="at-h">Talents clés de ${CLASSES[h.cls].name} <small>(1 par voie · 3 points)</small></h4><div class="sk-kl">${keys}</div></div>
    ${glob}<div class="sk-tot"><h4 class="at-h">Bonus de talents</h4>${tot.length ? `<div class="sk-tl">${tot.map(([k, v]) => `<span style="--c:${STAT_COLOR[k] || 'var(--gold-2)'}">${skillFmt(k, v)}</span>`).join('')}</div>` : '<p class="sub">Aucun point dépensé pour l’instant. Choisis une voie !</p>'}</div>
    <p class="hint">Chaque classe a <b>son propre arbre</b> : les talents renforcent directement ses mécaniques (jauges, masques, trèfles, tourelles…). Tu gagnes <b>1 point tous les ${SKILL_LEVELS_PER_POINT} niveaux</b> (${Math.floor(MAX_LEVEL / SKILL_LEVELS_PER_POINT)} au niveau ${MAX_LEVEL}). Une voie s’ouvre ligne par ligne : plus tu y investis, plus les lignes hautes se débloquent. Chaque point donne un <b>petit bonus de voie</b>, des <b>paliers</b> s’activent en chemin et les <b>seuils de puissance</b> récompensent le total dépensé.</p>`;
}
function skBranch(h, b, just) {
  if (!ui.skSel || !SKILL_NODE[ui.skSel] || SKILL_NODE[ui.skSel].branch !== b.id) { const first = b.nodes.find(n => skillCheck(h, n[0]) === null) || b.nodes[0]; ui.skSel = first[0]; }
  const sel = SKILL_NODE[ui.skSel], W = 300, rows = SKILL_GATE.length, spB = skillBranchSpent(h, b.id);
  const lines = b.nodes.flatMap(n => n[7].map(q => { const a = SKILL_NODE[q], z = SKILL_NODE[n[0]], ra = (h.skills && h.skills[q]) || 0, rz = (h.skills && h.skills[n[0]]) || 0;
    return `<line class="${ra > 0 && rz > 0 ? 'lit' : ra > 0 ? 'half' : ''}" x1="${(a.c + .5) * W / 3}" y1="${(a.r + .5) * SK_ROW_H}" x2="${(z.c + .5) * W / 3}" y2="${(z.r + .5) * SK_ROW_H}" vector-effect="non-scaling-stroke"/>`; })).join('');
  const gates = SKILL_GATE.map((g, r) => r).filter(r => r >= 2).map(r => `<div class="sk-gate${spB >= SKILL_GATE[r] ? ' open' : ''}" style="grid-row:${r + 1}"><span>${spB >= SKILL_GATE[r] ? '🔓' : '🔒'} ${SKILL_GATE[r]} pts dans la voie</span></div>`).join('');
  const nodes = b.nodes.map(n => { const z = SKILL_NODE[n[0]], s = skNodeState(h, z);
    return `<button class="sk-n${s.r ? ' has' : ''}${s.max ? ' maxed' : ''}${s.can ? ' can' : ''}${!s.open && !s.r ? ' lock' : ''}${z.cost > 1 ? ' key' : ''}${ui.skSel === z.id ? ' sel' : ''}${just === z.id ? ' just' : ''}" data-act="sknode" data-id="${z.id}" style="grid-column:${z.c + 1};grid-row:${z.r + 1};--p:${(s.r / z.max * 100).toFixed(0)}%" aria-label="${esc(z.name)} ${s.r}/${z.max}">
      <span class="sk-ico">${z.icon}</span><span class="sk-rk num">${s.r}/${z.max}</span><b class="sk-nm">${esc(z.name)}</b></button>`; }).join('');
  const s = skNodeState(h, sel), cur = s.r, nx = Math.min(sel.max, cur + 1);
  const detail = `<div class="sk-det${sel.cost > 1 ? ' is-key' : ''}"><div class="sk-dh"><span class="sk-dico">${sel.icon}</span><div><b class="display">${esc(sel.name)}</b><small>${sel.cost > 1 ? '★ Talent clé' : `Ligne ${sel.r + 1}`} · rang <b class="num">${cur}</b> / ${sel.max}</small></div></div>
    ${sel.txt ? `<p class="sk-txt">${esc(sel.txt)}</p>` : ''}
    <div class="label">${sel.max > 1 ? 'Par rang' : 'Effet'}</div><div class="sk-fx">${skStatLine(sel.fx)}</div>
    ${cur && sel.max > 1 ? `<div class="label">Actuellement</div><div class="sk-fx">${skStatLine(sel.fx, cur)}</div>` : ''}
    ${cur < sel.max && cur ? `<div class="label">Prochain rang</div><div class="sk-fx">${skStatLine(sel.fx, nx)}</div>` : ''}
    <p class="sub">${sel.req.length ? `Nécessite : ${sel.req.map(q => SKILL_NODE[q].name).join(' ou ')}. ` : ''}${SKILL_GATE[sel.r] ? `Ouvre à ${SKILL_GATE[sel.r]} points dans la voie. ` : ''}Coût : ${sel.cost} point${sel.cost > 1 ? 's' : ''}${sel.max > 1 ? ' par rang' : ''}.</p>
    <button class="btn gold sk-buy" data-act="skbuy" data-id="${sel.id}" ${s.can ? '' : 'disabled'}>${s.max ? 'Rang maximal' : s.can ? `Apprendre · ${sel.cost} pt${sel.cost > 1 ? 's' : ''}` : 'Indisponible'}</button>
    ${!s.can && !s.max ? `<small class="sk-why">${esc(s.err)}</small>` : ''}</div>`;
  return `<div class="sk-wrap" style="--bc:${b.col}"><div class="sk-treew"><div class="sk-bhead"><span class="sk-bico">${b.icon}</span><div><b class="display">${b.name}</b><small>${b.text}</small></div><span class="sk-bp num">${spB} pts</span></div>
      <div class="bar sk-bar sk-bbar"><i style="width:${Math.min(100, spB / skBranchMax(b) * 100).toFixed(0)}%"></i></div>
      <div class="sk-per">✦ Chaque point dépensé dans la voie : ${skStatLine(b.per)} <span class="sub">· actuellement ${skStatLine(b.per, spB)}</span></div>
      <div class="sk-motes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="sk-tree" style="grid-template-rows:repeat(${rows},${SK_ROW_H}px)"><svg class="sk-lines" viewBox="0 0 ${W} ${rows * SK_ROW_H}" preserveAspectRatio="none" aria-hidden="true">${lines}</svg>${gates}${nodes}</div></div>
    <aside class="sk-side">${detail}<div class="sk-sm"><h4 class="at-h">Paliers de la voie <small>(${b.mile.map(m => m[0]).join(' · ')} points)</small></h4>${skMilestones(h, b)}</div></aside></div>`;
}
