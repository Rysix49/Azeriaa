/* =====================================================================
   AMAKNA IDLE — ICÔNES D'ÉQUIPEMENT DESSINÉES EN SVG
   Chaque objet = une forme (selon son type) + sa palette + un ornement.
   Pour un nouvel objet : ajouter une entrée dans ITEM_ART.
   ===================================================================== */
const ITEM_ART = {
  relique_tofu:      ['relic', '#f2e27a', '#8fd6ff', 'feather'],
  relique_bouftou:   ['relic', '#f0c040', '#fff4cc', 'wool'],
  relique_abra:      ['relic', '#6fbf4c', '#2f5a24', 'leaf'],
  relique_craq:      ['relic', '#e08a3a', '#5a5048', 'rock'],
  relique_bworkette: ['relic', '#e0475a', '#5a1a22', 'horns'],
  relique_kanigrou:  ['relic', '#c58a52', '#f6e3b0', 'stripes'],
  relique_chafer:    ['relic', '#9be8e0', '#2b2733', 'skull'],
  faux_paysan:   ['scythe', '#b9b9b9', '#9b7442', 'none'],
  faux_avoine:   ['scythe', '#d0d0d0', '#b98a4e', 'leaf'],
  faux_seigle:   ['scythe', '#e8e0c8', '#5b4029', 'feather'],
  gants_paille:  ['glove', '#e3c76a', '#b59a3e', 'none'],
  gants_houblon: ['glove', '#6fa04a', '#3f6b33', 'leaf'],
  sac_ble:       ['sack', '#c9a46a', '#7a5a36', 'none'],
  sac_lin:       ['sack', '#b8a6d9', '#6a5fb5', 'dots'],
  // forme, couleur principale, couleur secondaire, ornement
  coiffe_aventurier:   ['cap',      '#8a6a3e', '#c9a46a', 'feather'],
  cape_aventurier:     ['cape',     '#7a5a36', '#c9a46a', 'none'],
  amulette_aventurier: ['amulet',   '#b9b9b9', '#6fb8d6', 'round'],
  anneau_aventurier:   ['ring',     '#b9b9b9', '#6fb8d6', 'round'],
  bottes_aventurier:   ['boots',    '#7a5a36', '#c9a46a', 'none'],
  ceinture_aventurier: ['belt',     '#7a5a36', '#c9c9c9', 'square'],
  baton_debutant:      ['staff',    '#9b7442', '#6fb8d6', 'orb'],
  epee_boisaille:      ['sword',    '#b98a4e', '#7b5a32', 'none'],

  coiffe_bouftou:      ['woolhat',  '#f1ead8', '#8a6a3e', 'horns'],
  cape_bouftou:        ['cape',     '#f1ead8', '#a07c4a', 'wool'],
  amulette_bouftou:    ['amulet',   '#d9b45a', '#f1ead8', 'horn'],
  marteau_bouftou:     ['hammer',   '#f1ead8', '#8a6a3e', 'horns'],
  bottes_moskito:      ['boots',    '#4f6b3a', '#d0503d', 'stinger'],
  anneau_arakne:       ['ring',     '#3b3346', '#c96fa8', 'web'],
  ceinture_champ:      ['belt',     '#a8453a', '#f1ead8', 'dots'],
  arc_moskito:         ['bow',      '#4f6b3a', '#d0503d', 'stinger'],
  pelle_champ:         ['shovel',   '#a8453a', '#f1ead8', 'dots'],

  baton_abraknyde:     ['staff',    '#5b4029', '#6fbf4c', 'leaf'],
  cape_abraknyde:      ['cape',     '#3f6b33', '#5b4029', 'leaf'],
  anneau_ecurouille:   ['ring',     '#b36a2e', '#e8c07a', 'acorn'],
  bottes_sanglier:     ['boots',    '#5a4436', '#efe3c7', 'tusk'],
  coiffe_prespic:      ['widehat',  '#6f8a3c', '#3b4b22', 'spikes'],

  hache_bwork:         ['axe',      '#8e8e8e', '#7a3b22', 'none'],
  casque_bwork:        ['helmet',   '#8e8e8e', '#c48a3c', 'horns'],
  ceinture_bwork:      ['belt',     '#4b3a2e', '#8e8e8e', 'skull'],
  amulette_craqueleur: ['amulet',   '#8a8070', '#e08a3a', 'rock'],
  cape_kwak:           ['cape',     '#bfe3f2', '#5aa7d6', 'snow'],
  bottes_scara:        ['boots',    '#3f8a4a', '#9ad06a', 'shell'],

  coiffe_koalak:       ['ears',     '#8b8f96', '#e0b8a0', 'none'],
  bottes_kanigrou:     ['boots',    '#c58a52', '#7a4e2a', 'stripes'],
  anneau_mufafah:      ['ring',     '#5a4a3a', '#e8e0c8', 'fang'],

  cape_chafer:         ['cape',     '#2b2733', '#e8e0c8', 'skull'],
  ceinture_ecto:       ['belt',     '#4a7a8a', '#9be8e0', 'swirl'],
  epee_chafer:         ['greatsword','#d8d4c8', '#2b2733', 'skull'],
};

/* Ornements réutilisables, centrés sur (x, y) */
function artMark(kind, x, y, c, s = 1) {
  const t = (d) => `<g transform="translate(${x} ${y}) scale(${s})">${d}</g>`;
  switch (kind) {
    case 'round': return t(`<circle r="2.6" fill="${c}" stroke="#0006" stroke-width=".6"/><circle cx="-.8" cy="-.8" r=".8" fill="#fff9"/>`);
    case 'orb': return t(`<circle r="3.4" fill="${c}" stroke="#0006" stroke-width=".6"/><circle cx="-1.1" cy="-1.1" r="1.1" fill="#fffa"/>`);
    case 'square': return t(`<rect x="-2.5" y="-2.5" width="5" height="5" rx=".8" fill="none" stroke="${c}" stroke-width="1.4"/>`);
    case 'feather': return t(`<path d="M0 0c2-4 5-6 7-6-1 3-3 5-7 6Z" fill="${c}"/><path d="M0 0 6 -5.5" stroke="#0005" stroke-width=".5"/>`);
    case 'horns': return t(`<path d="M-4 0c-3 0-4-3-2-5 0 2 1 3 3 3ZM4 0c3 0 4-3 2-5 0 2-1 3-3 3Z" fill="${c}" stroke="#0006" stroke-width=".5"/>`);
    case 'horn': return t(`<path d="M-2 -3c4-1 5 3 2 6-1-3-2-4-3-4Z" fill="${c}" stroke="#0006" stroke-width=".5"/>`);
    case 'wool': return t(`<circle cx="-2.5" r="2" fill="${c}"/><circle cx="0" cy="-1.5" r="2.2" fill="${c}"/><circle cx="2.5" r="2" fill="${c}"/>`);
    case 'stinger': return t(`<path d="M-1.4 -3 1.4 -3 0 3Z" fill="${c}" stroke="#0006" stroke-width=".4"/>`);
    case 'web': return t(`<g stroke="${c}" stroke-width=".7" fill="none"><circle r="2.8"/><circle r="1.4"/><path d="M-3 0h6M0-3v6M-2.1-2.1l4.2 4.2M2.1-2.1l-4.2 4.2"/></g>`);
    case 'dots': return t(`<g fill="${c}"><circle cx="-2.5" cy="-1" r="1"/><circle cx="1.5" cy="-2" r=".9"/><circle cx="1" cy="1.8" r="1.1"/></g>`);
    case 'leaf': return t(`<path d="M-3 2c0-4 3-6 6-6 0 4-2 6-6 6Z" fill="${c}"/><path d="M-3 2 2.5-3.5" stroke="#0005" stroke-width=".5"/>`);
    case 'acorn': return t(`<path d="M-2.4 -.5h4.8c0 3-1.2 4.2-2.4 4.2S-2.4 2.5-2.4-.5Z" fill="${c}"/><path d="M-2.8-.5c0-2 1.4-2.8 2.8-2.8S2.8-2.5 2.8-.5Z" fill="#6b3f1d"/>`);
    case 'tusk': return t(`<path d="M-3 -2c1 4 4 5 6 4-3-.5-4.5-2-5-4Z" fill="${c}" stroke="#0006" stroke-width=".4"/>`);
    case 'spikes': return t(`<path d="M-5 0 -4-4-3 0-1.5-5 0 0 1.5-5 3 0 4-4 5 0Z" fill="${c}"/>`);
    case 'skull': return t(`<path d="M0-3.2c2.2 0 3.4 1.4 3.4 3 0 1.2-.7 1.8-1.2 2.1v1.2h-4.4V1.9C-2.7 1.6-3.4 1-3.4-.2c0-1.6 1.2-3 3.4-3Z" fill="${c}"/><circle cx="-1.3" cy="-.2" r=".9" fill="#0009"/><circle cx="1.3" cy="-.2" r=".9" fill="#0009"/>`);
    case 'rock': return t(`<path d="M-3 1-2-2.5 1-3 3-.5 2 2.5-1.5 3Z" fill="${c}" stroke="#0006" stroke-width=".5"/><path d="M-1-1 1 0" stroke="#0007" stroke-width=".5"/>`);
    case 'snow': return t(`<g stroke="${c}" stroke-width="1" stroke-linecap="round"><path d="M0-3v6M-2.6-1.5l5.2 3M-2.6 1.5l5.2-3"/></g>`);
    case 'shell': return t(`<ellipse rx="3" ry="2.2" fill="${c}" stroke="#0006" stroke-width=".5"/><path d="M0-2.2v4.4" stroke="#0006" stroke-width=".5"/>`);
    case 'stripes': return t(`<g stroke="${c}" stroke-width="1.1"><path d="M-3-2 3-2M-3 0 3 0M-3 2 3 2"/></g>`);
    case 'fang': return t(`<path d="M-1.6-2.5h3.2L0 3Z" fill="${c}" stroke="#0006" stroke-width=".4"/>`);
    case 'swirl': return t(`<path d="M0 0c0-1 1-1.6 1.8-1 1 .8.5 2.6-1 2.8-2 .3-3.2-1.6-2.4-3.3 1-2 4-2.2 5.2-.2" fill="none" stroke="${c}" stroke-width="1"/>`);
    default: return '';
  }
}

function artShape(shape, c1, c2, mark) {
  const o = 'stroke="#000a" stroke-width="1" stroke-linejoin="round"';
  switch (shape) {
    case 'cap': return `<path d="M7 20c0-7 4-11 9-11s9 4 9 11Z" fill="${c1}" ${o}/><path d="M5 20h22c1 0 1.6 2.4 0 2.6-7 1-15 1-22 0-1.6-.2-1-2.6 0-2.6Z" fill="${c2}" ${o}/><path d="M8 17.5h16" stroke="${c2}" stroke-width="2"/>${artMark(mark, 22, 13, c2)}`;
    case 'woolhat': return `<path d="M7 21c0-7 4-12 9-12s9 5 9 12Z" fill="${c1}" ${o}/><g fill="${c1}" stroke="#0005" stroke-width=".7"><circle cx="10" cy="13" r="3"/><circle cx="16" cy="10" r="3.4"/><circle cx="22" cy="13" r="3"/><circle cx="13" cy="17" r="3"/><circle cx="19" cy="17" r="3"/></g><path d="M6 21h20v2.4H6Z" fill="${c2}" ${o}/>${artMark(mark, 16, 11, '#d9c08a', 1.3)}`;
    case 'widehat': return `<ellipse cx="16" cy="21" rx="13" ry="3.6" fill="${c1}" ${o}/><path d="M10 21c0-5 2.5-8 6-8s6 3 6 8Z" fill="${c2}" ${o}/>${artMark(mark, 16, 13.5, c1, 1)}<path d="M10 19.5h12" stroke="#e0b25a" stroke-width="1.6"/>`;
    case 'helmet': return `<path d="M8 22c0-8 3.5-12 8-12s8 4 8 12Z" fill="${c1}" ${o}/><path d="M7 21h18v3H7Z" fill="${c2}" ${o}/><path d="M16 10v11" stroke="#0004" stroke-width="1.4"/><circle cx="11" cy="22.5" r=".8" fill="#0006"/><circle cx="21" cy="22.5" r=".8" fill="#0006"/>${artMark(mark, 16, 15, '#efe3c7', 1.5)}`;
    case 'ears': return `<circle cx="9" cy="11" r="4.5" fill="${c1}" ${o}/><circle cx="23" cy="11" r="4.5" fill="${c1}" ${o}/><circle cx="9" cy="11" r="2.4" fill="${c2}"/><circle cx="23" cy="11" r="2.4" fill="${c2}"/><path d="M8 23c0-7 3.5-10 8-10s8 3 8 10Z" fill="${c1}" ${o}/><path d="M7 22h18v2.4H7Z" fill="#5a5e66" ${o}/>`;
    case 'cape': return `<path d="M11 6h10l2 3c3 5 4 12 4 18-4 1.5-7 .5-11-1-4 1.5-7 2.5-11 1 0-6 1-13 4-18Z" fill="${c1}" ${o}/><path d="M11 6h10l1.6 3H9.4Z" fill="${c2}" ${o}/><circle cx="16" cy="9" r="1.6" fill="#e0b25a" stroke="#0007" stroke-width=".6"/><path d="M16 11v14" stroke="#0003" stroke-width="1"/>${artMark(mark, 16, 18, c2, 1.1)}`;
    case 'amulet': return `<path d="M8 5c0 7 3.5 11 8 11s8-4 8-11" fill="none" stroke="#d9b45a" stroke-width="1.3" stroke-dasharray="1.6 1"/><circle cx="16" cy="21" r="6.5" fill="${c1}" ${o}/><circle cx="16" cy="21" r="4.6" fill="none" stroke="#0004" stroke-width=".8"/>${artMark(mark === 'round' ? 'round' : mark, 16, 21, c2, 1)}`;
    case 'ring': return `<circle cx="16" cy="19" r="7.5" fill="none" stroke="#000a" stroke-width="5"/><circle cx="16" cy="19" r="7.5" fill="none" stroke="${c1}" stroke-width="3.4"/><path d="M11 10.5h10l-2.4 3.5h-5.2Z" fill="#d9b45a" ${o}/>${artMark(mark, 16, 9, c2, 1.05)}`;
    case 'boots': return `<path d="M10 5h8v13c4 .5 8 2 8 5v3H8l2-5Z" fill="${c1}" ${o}/><path d="M9.5 5h9v3.5h-9Z" fill="${c2}" ${o}/><path d="M8 25h18v2H8Z" fill="#2a1f16" ${o}/>${artMark(mark, 14, 15, c2, .9)}`;
    case 'belt': return `<path d="M3 13c8-2 18-2 26 0v6c-8-2-18-2-26 0Z" fill="${c1}" ${o}/><rect x="11.5" y="10.5" width="9" height="11" rx="1.6" fill="#d9b45a" ${o}/><rect x="13.5" y="12.5" width="5" height="7" rx="1" fill="${c1}"/>${artMark(mark, 16, 16, c2, .8)}`;
    case 'staff': return `<path d="M9 28 21 9" stroke="#000a" stroke-width="4" stroke-linecap="round"/><path d="M9 28 21 9" stroke="${c1}" stroke-width="2.4" stroke-linecap="round"/><path d="M19 10c-2-3 0-6 3-6s5 3 3 6" fill="none" stroke="${c1}" stroke-width="1.6"/>${artMark(mark, 22, 8, c2, 1)}`;
    case 'sword': return `<path d="M22 4h4v4L13 21l-3-3Z" fill="${c1}" ${o}/><path d="M23.5 6.5 12 18" stroke="#fff5" stroke-width=".8"/><path d="M8 16l8 8" stroke="#000a" stroke-width="3.6" stroke-linecap="round"/><path d="M8 16l8 8" stroke="${c2}" stroke-width="2.2" stroke-linecap="round"/><path d="M11.5 20.5 6 26" stroke="#000a" stroke-width="3" stroke-linecap="round"/><path d="M11.5 20.5 6 26" stroke="${c2}" stroke-width="1.6" stroke-linecap="round"/>`;
    case 'greatsword': return `<path d="M24 3h5v5L14 22l-4-4Z" fill="${c1}" ${o}/><path d="M26 5.5 12.5 19.5" stroke="#fff6" stroke-width=".9"/><path d="M7 15l10 10" stroke="#000a" stroke-width="4" stroke-linecap="round"/><path d="M7 15l10 10" stroke="${c2}" stroke-width="2.6" stroke-linecap="round"/><path d="M11 21 5 27" stroke="#000a" stroke-width="3" stroke-linecap="round"/><path d="M11 21 5 27" stroke="#6b4a2a" stroke-width="1.6" stroke-linecap="round"/>${artMark(mark, 12, 20, '#e8e0c8', .7)}`;
    case 'hammer': return `<path d="M8 28 19 13" stroke="#000a" stroke-width="3.6" stroke-linecap="round"/><path d="M8 28 19 13" stroke="${c2}" stroke-width="2.2" stroke-linecap="round"/><rect x="13" y="4" width="13" height="9" rx="2.5" transform="rotate(36 19.5 8.5)" fill="${c1}" ${o}/>${artMark(mark, 19.5, 8.5, '#d9c08a', 1.1)}`;
    case 'axe': return `<path d="M9 28 21 8" stroke="#000a" stroke-width="3.6" stroke-linecap="round"/><path d="M9 28 21 8" stroke="${c2}" stroke-width="2.2" stroke-linecap="round"/><path d="M18 9c3-5 9-5 11-2-1 4-4 7-8 8Z" fill="${c1}" ${o}/><path d="M27 8c-1 3-3 5-5 6" stroke="#fff6" stroke-width=".9" fill="none"/>`;
    case 'bow': return `<path d="M9 4c11 2 18 10 19 21" fill="none" stroke="#000a" stroke-width="3.8" stroke-linecap="round"/><path d="M9 4c11 2 18 10 19 21" fill="none" stroke="${c1}" stroke-width="2.4" stroke-linecap="round"/><path d="M9 4 28 25" stroke="#e8e0c8" stroke-width=".8"/><path d="M5 27 22 10" stroke="#8a6a3e" stroke-width="1.6"/><path d="M23.5 8.5 19 9.5l3.5 3.5Z" fill="${c2}"/>${artMark(mark, 6.5, 25.5, c2, .8)}`;
    case 'shovel': return `<path d="M7 26 20 13" stroke="#000a" stroke-width="3.6" stroke-linecap="round"/><path d="M7 26 20 13" stroke="#8a6a3e" stroke-width="2.2" stroke-linecap="round"/><path d="M18 11l6-6c3 0 4 1 4 4l-6 6c-2 0-4-2-4-4Z" fill="${c1}" ${o}/>${artMark(mark, 23, 9.5, c2, .7)}<path d="M4.5 25.5 8.5 29.5" stroke="#000a" stroke-width="3" stroke-linecap="round"/>`;
    case 'scythe': return `<path d="M8 29 20 6" stroke="#000a" stroke-width="3.6" stroke-linecap="round"/><path d="M8 29 20 6" stroke="${c2}" stroke-width="2.2" stroke-linecap="round"/><path d="M19 7c4-3 9-3 11 1-4-1-8 0-11 2Z" fill="${c1}" ${o}/><path d="M12 22h5" stroke="#000a" stroke-width="3" stroke-linecap="round"/><path d="M12 22h5" stroke="${c2}" stroke-width="1.6" stroke-linecap="round"/>${artMark(mark, 25, 9, '#6fbf4c', .7)}`;
    case 'glove': return `<path d="M10 27V14c0-1.5 2.5-1.5 2.5 0V8c0-1.5 2.5-1.5 2.5 0V7c0-1.5 2.5-1.5 2.5 0v1c0-1.5 2.5-1.5 2.5 0v7l2-2c1.2-1.2 3 .3 2 1.6L19 22v5Z" fill="${c1}" ${o}/><path d="M10 24h9v3h-9Z" fill="${c2}" ${o}/>${artMark(mark, 15, 18, c2, .8)}`;
    case 'sack': return `<path d="M12 9h8l-1.5 3c5 2 7.5 6 7.5 10 0 4-4 6-10 6s-10-2-10-6c0-4 2.5-8 7.5-10Z" fill="${c1}" ${o}/><path d="M11 9h10" stroke="${c2}" stroke-width="2.4" stroke-linecap="round"/><path d="M13.5 12.5h5" stroke="${c2}" stroke-width="1.6"/>${artMark(mark, 16, 21, c2, 1)}`;
    case 'relic': return `<circle cx="16" cy="16" r="13" fill="${c1}" opacity=".18"/><path d="M16 3 26 10v12L16 29 6 22V10Z" fill="${c2}" ${o}/><path d="M16 6.5 23 11.5v9L16 25.5 9 20.5v-9Z" fill="${c1}" stroke="#0006" stroke-width=".8"/><path d="M16 6.5v19M9 11.5l14 9M23 11.5l-14 9" stroke="#fff3" stroke-width=".6"/><path d="M12 9.5 16 7l2 1.2" stroke="#fffb" stroke-width="1" fill="none" stroke-linecap="round"/>${artMark(mark, 16, 16, c2, .9)}`;
    default: return `<circle cx="16" cy="16" r="9" fill="${c1}" ${o}/>`;
  }
}

const _artCache = {};
function itemArt(id) {
  if (_artCache[id]) return _artCache[id];
  const a = ITEM_ART[id] || ['default', '#888', '#ccc', 'none'];
  return (_artCache[id] = `<svg class="iart" viewBox="0 0 32 32" aria-hidden="true">${artShape(...a)}</svg>`);
}
