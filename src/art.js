/* =====================================================================
   AMAKNA IDLE — ICÔNES D'ÉQUIPEMENT DESSINÉES EN SVG (viewBox 32×32)
   Chaque objet a son propre dessin, inspiré du monstre ou de la matière
   dont il est tiré (Bouftou, Moskito, Arakne, Abraknyde, Bwork, Chafer…).
   Pour un nouvel objet : ajouter une entrée dans ITEM_ART (une fonction
   qui renvoie le contenu SVG). Sans entrée, une gemme neutre est dessinée.
   ===================================================================== */
const _O = 'stroke="#000a" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"';
const _o = 'stroke="#0007" stroke-width=".6" stroke-linejoin="round"';
/* Manche épais avec contour : de (x1,y1) à (x2,y2) */
const _stick = (x1, y1, x2, y2, c, w = 2.2) =>
  `<path d="M${x1} ${y1} ${x2} ${y2}" stroke="#000a" stroke-width="${w + 1.4}" stroke-linecap="round"/><path d="M${x1} ${y1} ${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
/* Halo coloré des reliques */
const _halo = (c) => `<circle cx="16" cy="16" r="14" fill="${c}" opacity=".16"/><circle cx="16" cy="16" r="10.5" fill="${c}" opacity=".14"/>`;
const _spark = (x, y, c = '#fff', s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-2.4.6-.6 2.4 0 .6.6 0 2.4-.6.6-2.4 0-.6-.6Z" fill="${c}"/>`;

const ITEM_ART = {
  /* ---------- Reliques ---------- */
  relique_tofu: () => _halo('#8fd6ff') +
    `<path d="M9 27C10 17 15 9 25 4c0 9-5 17-14 21Z" fill="#f2e27a" ${_O}/><path d="M10 26 24 6" stroke="#b08a2a" stroke-width="1"/><path d="M14 19l-3-1M17 15l-3-1.5M20 11l-2.5-2M15 20l3 .5M18 16l3 0M21 12l2.5-.5" stroke="#d8c25a" stroke-width=".8"/><path d="M24 5c-1 4-3 7-6 10" stroke="#fff8" stroke-width=".9" fill="none"/>${_spark(7, 9, '#bfe9ff')}${_spark(26, 18, '#fff', .8)}`,
  relique_bouftou: () => _halo('#ffd54a') +
    `<g fill="#f0c040" stroke="#8a6416" stroke-width=".7"><circle cx="10" cy="18" r="4.2"/><circle cx="16" cy="14" r="5"/><circle cx="22" cy="18" r="4.2"/><circle cx="13" cy="22" r="4"/><circle cx="19" cy="22" r="4"/></g><g fill="none" stroke="#fff4cc" stroke-width=".8"><path d="M14 13a2 2 0 1 1 3 1.5M9 18a1.6 1.6 0 1 1 2.4 1M20 21a1.6 1.6 0 1 1 2.4 1"/></g><path d="M8 13c-4-1-4-6 0-7 0 3 1 4 3 4ZM24 13c4-1 4-6 0-7 0 3-1 4-3 4Z" fill="#a0702a" ${_o}/>${_spark(26, 26, '#fff4cc')}`,
  relique_abra: () => _halo('#6fbf4c') +
    `<ellipse cx="16" cy="22" rx="6" ry="5.5" fill="#8a5a2e" ${_O}/><path d="M12 20c2 1 6 1 8 0M12.5 23.5c2 .8 5 .8 7 0" stroke="#5b3a1c" stroke-width=".8" fill="none"/><path d="M16 17V8" stroke="#3f7a2a" stroke-width="1.6"/><path d="M16 12c-5 0-7-3-7-6 4 0 7 2 7 6ZM16 10c4-.5 7-3 7-6-4 0-7 2-7 6Z" fill="#6fbf4c" ${_o}/>${_spark(24, 14, '#d6ffb0')}${_spark(8, 15, '#d6ffb0', .7)}`,
  relique_craq: () => _halo('#e08a3a') +
    `<path d="M7 18 10 9l8-3 7 5 1 9-6 6-9-1Z" fill="#5a5048" ${_O}/><path d="M10 9l3 6-4 5M18 6l-1 7 5 3 3-5M13 15h4M17 13l-2 7 4 5M22 16l3 5" stroke="#ff9a2a" stroke-width="1.3" fill="none"/><circle cx="16" cy="16" r="2.2" fill="#ffd27a"/><circle cx="16" cy="16" r="1" fill="#fff"/>`,
  relique_bworkette: () => _halo('#ff5a6e') +
    `<path d="M16 27C9 22 5 18 5 13c0-4 3-6 6-6 2 0 4 1 5 3 1-2 3-3 5-3 3 0 6 2 6 6 0 5-4 9-11 14Z" fill="#e0475a" ${_O}/><path d="M9 11c0-2 1-3 3-3" stroke="#fff8" stroke-width="1.2" fill="none"/><path d="M9 8C6 6 6 3 8 1c0 3 1 4 3 5ZM23 8c3-2 3-5 1-7 0 3-1 4-3 5Z" fill="#efe3c7" ${_o}/><path d="M16 14v6M13 17h6" stroke="#5a1a22" stroke-width="1.2"/>`,
  relique_kanigrou: () => _halo('#f6c27a') +
    `<path d="M8 4h16M8 28h16" stroke="#000a" stroke-width="3.4" stroke-linecap="round"/><path d="M8 4h16M8 28h16" stroke="#c58a52" stroke-width="2" stroke-linecap="round"/><path d="M10 5c0 6 5 8 5 11s-5 5-5 11h12c0-6-5-8-5-11s5-5 5-11Z" fill="#cfeaff" fill-opacity=".55" ${_O}/><path d="M12 9h8c-1 3-3 4-4 5-1-1-3-2-4-5ZM11.5 27c.5-3 2.5-5 4.5-5s4 2 4.5 5Z" fill="#f6e3b0"/><path d="M16 14v8" stroke="#f6e3b0" stroke-width=".8" stroke-dasharray="1 1"/><path d="M8.5 4v24M23.5 4v24" stroke="#7a4e2a" stroke-width="1.2"/>`,
  relique_chafer: () => _halo('#9be8e0') +
    `<path d="M13 4h6M16 4v3" stroke="#000a" stroke-width="2.2" stroke-linecap="round"/><path d="M16 1.5a2 2 0 1 1 0 4" fill="none" stroke="#8a8a8a" stroke-width="1"/><path d="M10 8h12l-1 2v14l1 2H10l1-2V10Z" fill="#2b2733" ${_O}/><rect x="12" y="10.5" width="8" height="13" rx="1" fill="#9be8e0" opacity=".35"/><path d="M16 22c-3 0-3.5-3-2-5 1-1.5 1-3 .5-4 2.5 1 4.5 3.5 4 6-.3 2-1 3-2.5 3Z" fill="#9be8e0"/><path d="M16 21c-1.2 0-1.5-1.4-.7-2.4l.7-1 .7 1c.8 1 .5 2.4-.7 2.4Z" fill="#fff"/><path d="M10 26h12" stroke="#e8e0c8" stroke-width="1.2"/>${_spark(25, 12, '#9be8e0', .8)}${_spark(7, 20, '#9be8e0', .6)}`,

  /* ---------- Outils de récolte ---------- */
  faux_paysan: () => _stick(9, 29, 19, 9, '#9b7442') +
    `<path d="M18 10c2-4 6-5 9-3-3 0-6 1-8 4Z" fill="#b9b9b9" ${_O}/><path d="M12 23.5h4" stroke="#000a" stroke-width="2.8" stroke-linecap="round"/><path d="M12 23.5h4" stroke="#7a5a36" stroke-width="1.4" stroke-linecap="round"/>`,
  faux_avoine: () => _stick(8, 29, 20, 6, '#b98a4e') +
    `<path d="M19 7c4-3 9-3 11 1-4-1-8 0-11 2Z" fill="#d0d0d0" ${_O}/><path d="M21 8.5c3-1.5 5.5-1.6 8-.5" stroke="#fff8" stroke-width=".7" fill="none"/><path d="M11 23c4 1 7-1 8-4" stroke="#c9a14a" stroke-width="1" fill="none"/><g fill="#e9cf7a" stroke="#9b7a2a" stroke-width=".4"><ellipse cx="19.5" cy="18" rx="1" ry="1.8" transform="rotate(30 19.5 18)"/><ellipse cx="18" cy="20.5" rx="1" ry="1.8" transform="rotate(50 18 20.5)"/><ellipse cx="21" cy="20" rx="1" ry="1.8" transform="rotate(-20 21 20)"/><ellipse cx="20" cy="22.5" rx="1" ry="1.8" transform="rotate(10 20 22.5)"/></g>`,
  faux_seigle: () => _stick(6, 30, 18, 4, '#5b4029', 2.4) +
    `<path d="M17 5C21-1 31 0 31 8c-3-4-9-4-14-1Z" fill="#e8e0c8" ${_O}/><path d="M19 4.5c4-2.5 9-2.2 11 1" stroke="#fff9" stroke-width=".8" fill="none"/><path d="M17 5.5h3" stroke="#d9b45a" stroke-width="2.4"/>` +
    _stick(9, 20, 14, 21, '#5b4029', 1.6) +
    `<g fill="#b98a3e"><path d="M24 30c0-4 1-8 1-12" stroke="#8a6a2a" stroke-width=".6" fill="none"/><ellipse cx="25" cy="18" rx=".9" ry="1.6"/><ellipse cx="23.8" cy="20" rx=".9" ry="1.6" transform="rotate(-25 23.8 20)"/><ellipse cx="26" cy="20.5" rx=".9" ry="1.6" transform="rotate(25 26 20.5)"/><ellipse cx="24" cy="22.5" rx=".9" ry="1.6" transform="rotate(-25 24 22.5)"/><ellipse cx="25.9" cy="23" rx=".9" ry="1.6" transform="rotate(25 25.9 23)"/></g>`,
  gants_paille: () =>
    `<path d="M10 27V14c0-1.5 2.5-1.5 2.5 0V8c0-1.5 2.5-1.5 2.5 0V7c0-1.5 2.5-1.5 2.5 0v1c0-1.5 2.5-1.5 2.5 0v7l2-2c1.2-1.2 3 .3 2 1.6L19 22v5Z" fill="#e3c76a" ${_O}/><path d="M12 12v6M15 10v7M18 10v7M13.5 20l4 2" stroke="#b59a3e" stroke-width=".7"/><path d="M9.5 24h10v3.5h-10Z" fill="#b59a3e" ${_O}/><path d="M10 28l-2.5 3M13 28l-.5 3.5M16 28l1 3.5M19 28l2.5 3" stroke="#e8d27a" stroke-width="1" stroke-linecap="round"/>`,
  gants_houblon: () =>
    `<path d="M10 27V14c0-1.5 2.5-1.5 2.5 0V8c0-1.5 2.5-1.5 2.5 0V7c0-1.5 2.5-1.5 2.5 0v1c0-1.5 2.5-1.5 2.5 0v7l2-2c1.2-1.2 3 .3 2 1.6L19 22v5Z" fill="#4f7a38" ${_O}/><path d="M9.5 23.5h10v4h-10Z" fill="#3f6b33" ${_O}/><path d="M9.5 25.5h10" stroke="#c9e08a" stroke-width=".8" stroke-dasharray="1.2 .8"/>` +
    `<g transform="translate(15 16)"><path d="M0-4c2.2 0 3 2.5 3 4.5S1.5 4.5 0 5.5c-1.5-1-3-3-3-5S-2.2-4 0-4Z" fill="#a8d36a" ${_o}/><path d="M-2.2-1h4.4M-2.6 1.4h5.2M-1.6 3.6h3.2" stroke="#6f9a3a" stroke-width=".6"/></g><path d="M15 12c1-2 3-2 4-1" stroke="#a8d36a" stroke-width=".8" fill="none"/>`,
  sac_ble: () =>
    `<path d="M12 9h8l-1.5 3c5 2 7.5 6 7.5 10 0 4-4 6-10 6s-10-2-10-6c0-4 2.5-8 7.5-10Z" fill="#c9a46a" ${_O}/><path d="M9 18l2 2M12 23l2 1M20 20l2-1M18 25l1.5-1M14 16l1 1.5" stroke="#8a6a3e" stroke-width=".7"/><path d="M11 9.5h10" stroke="#7a5a36" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M14 9 12 1M17 9l3-7" stroke="#b08a2a" stroke-width=".8"/><g fill="#e9c75a" stroke="#9b7a2a" stroke-width=".4"><ellipse cx="12.3" cy="2.5" rx=".9" ry="1.6"/><ellipse cx="13" cy="5" rx=".9" ry="1.6" transform="rotate(-15 13 5)"/><ellipse cx="19.5" cy="3" rx=".9" ry="1.6" transform="rotate(25 19.5 3)"/><ellipse cx="18.6" cy="5.4" rx=".9" ry="1.6" transform="rotate(25 18.6 5.4)"/></g>`,
  sac_lin: () =>
    `<path d="M6 13C6 4 26 4 26 13" fill="none" stroke="#000a" stroke-width="3"/><path d="M6 13C6 4 26 4 26 13" fill="none" stroke="#6a5fb5" stroke-width="1.6"/><rect x="5" y="12" width="22" height="15" rx="3" fill="#b8a6d9" ${_O}/><path d="M5 15c0-2 1.5-3 3-3h16c1.5 0 3 1 3 3v4H5Z" fill="#6a5fb5" ${_O}/><circle cx="16" cy="19" r="1.4" fill="#d9b45a" ${_o}/>` +
    `<g transform="translate(16 23.5)"><g fill="#7fb0ff"><circle cx="0" cy="-1.6" r="1.1"/><circle cx="1.5" cy="-.4" r="1.1"/><circle cx="1" cy="1.3" r="1.1"/><circle cx="-1" cy="1.3" r="1.1"/><circle cx="-1.5" cy="-.4" r="1.1"/></g><circle r=".7" fill="#f2e27a"/></g>`,

  /* ---------- Panoplie de l'Aventurier ---------- */
  coiffe_aventurier: () =>
    `<path d="M7 20c0-7 4-11 9-11s9 4 9 11Z" fill="#8a6a3e" ${_O}/><path d="M5 20h22c1 0 1.6 2.4 0 2.6-7 1-15 1-22 0-1.6-.2-1-2.6 0-2.6Z" fill="#c9a46a" ${_O}/><path d="M8 17.5h16" stroke="#6fb8d6" stroke-width="1.6"/><path d="M21 17C22 10 25 5 30 3c-1 5-3 10-8 14Z" fill="#d0503d" ${_o}/><path d="M21.5 16.5 29 4" stroke="#7a2a20" stroke-width=".6"/>`,
  cape_aventurier: () =>
    `<path d="M11 6h10l2 3c2.5 5 3 10 3 16l-3-1.5-2.5 2-2.5-2-2 2-2-2-2.5 2-2.5-2L6 25c0-6 .5-11 3-16Z" fill="#7a5a36" ${_O}/><path d="M11 6h10l1.6 3H9.4Z" fill="#c9a46a" ${_O}/><circle cx="16" cy="9" r="1.8" fill="#6fb8d6" stroke="#0007" stroke-width=".6"/><path d="M12 12c-1 4-1.5 8-1.5 11M20 12c1 4 1.5 8 1.5 11" stroke="#0003" stroke-width="1" fill="none"/>`,
  amulette_aventurier: () =>
    `<path d="M8 4c0 8 3.5 12 8 12s8-4 8-12" fill="none" stroke="#7a5a36" stroke-width="1.1"/><path d="M14 15h4l-.5 2.5h-3Z" fill="#b9b9b9" ${_o}/><path d="M16 17.5l5 5-5 6-5-6Z" fill="#6fb8d6" ${_O}/><path d="M16 17.5v11M11 22.5h10" stroke="#fff5" stroke-width=".6"/><path d="M14 20l2-1.5" stroke="#fffa" stroke-width=".9"/>`,
  anneau_aventurier: () =>
    `<circle cx="16" cy="19" r="7.5" fill="none" stroke="#000a" stroke-width="4.6"/><circle cx="16" cy="19" r="7.5" fill="none" stroke="#b9b9b9" stroke-width="3"/><path d="M10 15a7.5 7.5 0 0 1 4-3" stroke="#fff8" stroke-width=".9" fill="none"/><circle cx="16" cy="11" r="3.4" fill="#6fb8d6" ${_O}/><circle cx="15" cy="10" r="1" fill="#fffa"/>`,
  bottes_aventurier: () =>
    `<path d="M10 5h8v13c4 .5 8 2 8 5v3H8l2-5Z" fill="#7a5a36" ${_O}/><path d="M9.5 5h9v3h-9Z" fill="#c9a46a" ${_O}/><path d="M12 10.5l4 1.5M12 12.5l4-1.5M12 14.5l4 1.5M12 16.5l4-1.5" stroke="#efe3c7" stroke-width=".8"/><path d="M8 25h18v2H8Z" fill="#2a1f16" ${_O}/>`,
  ceinture_aventurier: () =>
    `<path d="M3 13c8-2 18-2 26 0v6c-8-2-18-2-26 0Z" fill="#7a5a36" ${_O}/><path d="M4 14.5c8-1.8 16-1.8 24 0M4 17.5c8-1.8 16-1.8 24 0" stroke="#c9a46a" stroke-width=".6" stroke-dasharray="1.2 1"/><rect x="11.5" y="10.5" width="9" height="11" rx="1" fill="none" stroke="#000a" stroke-width="3.6"/><rect x="11.5" y="10.5" width="9" height="11" rx="1" fill="none" stroke="#c9c9c9" stroke-width="2"/><path d="M16 12v8" stroke="#c9c9c9" stroke-width="1.2"/>`,
  baton_debutant: () => _stick(9, 28, 20, 10, '#9b7442') +
    `<path d="M11 25l1.5 1M13.5 21l1.5 1M16 17l1.5 1" stroke="#5b4029" stroke-width=".8"/><path d="M18 11c-2-3 0-6 3.5-6.5S27 7 25 10" fill="none" stroke="#9b7442" stroke-width="1.6"/><circle cx="22" cy="8" r="3.4" fill="#6fb8d6" ${_O}/><circle cx="21" cy="7" r="1.1" fill="#fffa"/>`,
  epee_boisaille: () =>
    `<path d="M22 4h4v4L13 21l-3-3Z" fill="#c99a5e" ${_O}/><path d="M23 6c-3 3-6 6-10 11M25 6.5c-3 3-6 6.5-10 11" stroke="#8a6a3e" stroke-width=".6" fill="none"/>` +
    _stick(8, 16, 16, 24, '#6b4a2a') + _stick(11.5, 20.5, 6, 26, '#9b7442', 1.6) +
    `<path d="M10.5 22.5l2-2" stroke="#3f6b33" stroke-width="1.2"/><circle cx="5.5" cy="26.5" r="1.4" fill="#6b4a2a" ${_o}/>`,

  /* ---------- Panoplie du Bouftou & Champs ---------- */
  coiffe_bouftou: () =>
    `<path d="M7 21c0-7 4-12 9-12s9 5 9 12Z" fill="#f1ead8" ${_O}/><g fill="#f1ead8" stroke="#0005" stroke-width=".7"><circle cx="10" cy="14" r="3"/><circle cx="16" cy="11" r="3.4"/><circle cx="22" cy="14" r="3"/><circle cx="13" cy="17.5" r="3"/><circle cx="19" cy="17.5" r="3"/></g><path d="M6 21h20v2.6H6Z" fill="#8a6a3e" ${_O}/>` +
    `<path d="M7 16C2 16 1 9 5 7c0 3 2 4 4 4.5Z" fill="#d9c08a" ${_O}/><path d="M25 16c5 0 6-7 2-9 0 3-2 4-4 4.5Z" fill="#d9c08a" ${_O}/><path d="M4 10l2 1M28 10l-2 1M3.5 13l2.5.5M28.5 13l-2.5.5" stroke="#8a6a3e" stroke-width=".6"/>`,
  cape_bouftou: () =>
    `<path d="M11 6h10l2 3c3 5 4 12 4 17-1 2-3 2-4 .5-1 1.6-3 1.6-4 0-1 1.6-3 1.6-4 0-1 1.6-3 1.6-4 0-1 1.5-3 1.5-4-.5 0-5 1-12 4-17Z" fill="#f1ead8" ${_O}/><g fill="none" stroke="#c9b894" stroke-width=".8"><path d="M12 13a1.6 1.6 0 1 1 2 1.5M18 12a1.6 1.6 0 1 1 2 1.5M10 19a1.6 1.6 0 1 1 2 1.5M15.5 18a1.6 1.6 0 1 1 2 1.5M20.5 20a1.6 1.6 0 1 1 2 1.5"/></g><path d="M11 6h10l1.6 3H9.4Z" fill="#a07c4a" ${_O}/><path d="M13.5 9.5c-2 0-3-2-2-3.5M18.5 9.5c2 0 3-2 2-3.5" stroke="#d9c08a" stroke-width="1.4" fill="none"/>`,
  amulette_bouftou: () =>
    `<path d="M7 3c0 7 4 10 9 10s9-3 9-10" fill="none" stroke="#d9b45a" stroke-width="1.3" stroke-dasharray="1.6 1"/><circle cx="16" cy="14" r="2" fill="#f1ead8" ${_o}/><path d="M13 15c7-1 11 5 6 14-1-5-3-8-7-9.5-1.5-1.5-1-4 1-4.5Z" fill="#e6cf96" ${_O}/><path d="M15.5 17.5c2 0 3.5 1.5 4 3M16 20.5c1.6.3 2.6 1.4 3 2.6M17 23.5c.8.4 1.4 1 1.7 2" stroke="#a07c4a" stroke-width=".7" fill="none"/>`,
  marteau_bouftou: () => _stick(7, 29, 17, 15, '#8a6a3e') +
    `<g transform="rotate(36 19.5 9.5)"><rect x="11" y="4" width="17" height="11" rx="5" fill="#f1ead8" ${_O}/><g fill="#f1ead8" stroke="#0004" stroke-width=".6"><circle cx="14" cy="5.5" r="2.4"/><circle cx="18" cy="4.2" r="2.4"/><circle cx="22" cy="4.2" r="2.4"/><circle cx="25.5" cy="5.5" r="2.4"/></g><circle cx="17.5" cy="10" r=".9" fill="#2a1f16"/><circle cx="22" cy="10" r=".9" fill="#2a1f16"/><path d="M18.5 12.5h2.6" stroke="#2a1f16" stroke-width=".7"/><path d="M12 8c-3-.5-4 3-1.5 4.5 0-2 1-3 2.5-3ZM27.5 8c3-.5 4 3 1.5 4.5 0-2-1-3-2.5-3Z" fill="#8a6a3e" ${_o}/></g>`,
  bottes_moskito: () =>
    `<path d="M5 9c-3-4 0-7 4-5M5 12c-4-1-5 4-1 5" fill="#cfeaf2" fill-opacity=".7" ${_o}/><path d="M10 5h8v13c4 .5 8 2 8 5v3H8l2-5Z" fill="#4f6b3a" ${_O}/><path d="M10 11h8M10 15h8" stroke="#2f4523" stroke-width="1.4"/><path d="M9.5 5h9v3h-9Z" fill="#d0503d" ${_O}/><path d="M25 22l6 1.5-6 1.5Z" fill="#d0503d" ${_o}/><path d="M8 25h18v2H8Z" fill="#2a1f16" ${_O}/>`,
  anneau_arakne: () =>
    `<circle cx="16" cy="20" r="7.5" fill="none" stroke="#000a" stroke-width="4.6"/><circle cx="16" cy="20" r="7.5" fill="none" stroke="#3b3346" stroke-width="3"/><g stroke="#c96fa8" stroke-width=".5" fill="none"><path d="M9.5 17c2 0 3-1 3.5-2.5M22.5 17c-2 0-3-1-3.5-2.5"/></g>` +
    `<g stroke="#1f1a26" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M13 9 9 6 7 8M13 11 8 10.5 6 13M19 9l4-3 2 2M19 11l5-.5 2 2.5"/></g><ellipse cx="16" cy="11.5" rx="3.6" ry="4" fill="#3b3346" ${_O}/><circle cx="16" cy="7.5" r="2" fill="#3b3346" ${_O}/><path d="M16 9.5l-1.5 2 1.5 2 1.5-2Z" fill="#c96fa8"/><circle cx="15.3" cy="7.2" r=".5" fill="#ff5a8a"/><circle cx="16.7" cy="7.2" r=".5" fill="#ff5a8a"/>`,
  ceinture_champ: () =>
    `<path d="M3 15c8-2 18-2 26 0v6c-8-2-18-2-26 0Z" fill="#8a6a3e" ${_O}/><path d="M4 18c8-1.8 16-1.8 24 0" stroke="#5b4029" stroke-width=".6"/><rect x="13.5" y="16" width="5" height="7" rx="1.5" fill="#f1ead8" ${_O}/><path d="M8 17c0-6 4-9 8-9s8 3 8 9Z" fill="#a8453a" ${_O}/><g fill="#f1ead8"><circle cx="12" cy="13" r="1.2"/><circle cx="16.5" cy="11" r="1.4"/><circle cx="20" cy="14" r="1.1"/><circle cx="14.5" cy="15.3" r=".8"/></g>`,
  arc_moskito: () =>
    `<path d="M9 4c11 2 18 10 19 21" fill="none" stroke="#000a" stroke-width="3.8" stroke-linecap="round"/><path d="M9 4c11 2 18 10 19 21" fill="none" stroke="#4f6b3a" stroke-width="2.4" stroke-linecap="round"/><path d="M15 6l1 2M21 9.5l-.5 2M25.5 15l-2 .5" stroke="#2f4523" stroke-width="1.2"/><path d="M9 4 28 25" stroke="#e8e0c8" stroke-width=".8"/>` +
    `<path d="M5 27 22 10" stroke="#5a4436" stroke-width="1.6"/><path d="M23.5 8.5 18.5 10l3.5 3.5Z" fill="#d0503d" ${_o}/><path d="M7 25c-3 0-4-3-3-4 1 1 3 1 4 1ZM7 25c0 3 3 4 4 3-1-1-1-3-1-4Z" fill="#cfeaf2" fill-opacity=".8" ${_o}/>`,
  pelle_champ: () => _stick(6, 27, 18, 15, '#8a6a3e') +
    `<path d="M4 25.5l4 4" stroke="#000a" stroke-width="3" stroke-linecap="round"/><path d="M17 14c-1-3 1-6 4-7l4 4c-1 3-4 5-7 4Z" fill="#9aa0a6" ${_O}/><path d="M17.5 8C17 3 22 0 27 2s5 7 3 9c-3-2-7-3-12.5-3Z" fill="#a8453a" ${_O}/><g fill="#f1ead8"><circle cx="21" cy="4" r="1.1"/><circle cx="25.5" cy="4.5" r="1.2"/><circle cx="28" cy="8" r=".9"/></g>`,

  /* ---------- Panoplie Abraknyde & Bois ---------- */
  baton_abraknyde: () =>
    `<path d="M9 29c2-4 1-7 4-10s3-7 6-9" fill="none" stroke="#000a" stroke-width="4" stroke-linecap="round"/><path d="M9 29c2-4 1-7 4-10s3-7 6-9" fill="none" stroke="#5b4029" stroke-width="2.6" stroke-linecap="round"/><path d="M13 19c-2-1-4-1-5 0M15 14c2 0 3-1 4-3" stroke="#5b4029" stroke-width="1.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M19 10c-1-3 0-5 2-7M19 10c2-2 5-3 8-2M19 10c1 2 4 3 6 2" stroke="#5b4029" stroke-width="1.4" fill="none" stroke-linecap="round"/><g fill="#6fbf4c" ${_o}><path d="M21 3c-2-1-2-3 0-3 1 1 1 2 0 3Z"/><path d="M27 8c1-2 3-2 3 0-1 1-2 1-3 0Z"/><path d="M25 12c2 0 3 1 2 2.5-1 0-2-1-2-2.5Z"/><path d="M8 19c-1-2-3-2-3 0 1 1 2 1 3 0Z"/></g><circle cx="22" cy="7.5" r="1.6" fill="#d6ff8a" ${_o}/>`,
  cape_abraknyde: () =>
    `<path d="M11 6h10l2 3c3 5 4 12 4 18-4 1.5-7 .5-11-1-4 1.5-7 2.5-11 1 0-6 1-13 4-18Z" fill="#6b4a2e" ${_O}/><path d="M12 10c-1 5-2 10-2 15M16 10v15M20 10c1 5 2 10 2 15" stroke="#3f2a18" stroke-width="1" fill="none"/><path d="M11 6h10l1.6 3H9.4Z" fill="#5b4029" ${_O}/>` +
    `<g fill="#6fbf4c" ${_o}><path d="M8 25c-3 0-4-3-2-4 2 0 3 2 2 4Z"/><path d="M13 27c-1 3-4 3-4 1 1-2 3-2 4-1Z"/><path d="M20 27c1 3 4 3 4 1-1-2-3-2-4-1Z"/><path d="M24 25c3 0 4-3 2-4-2 0-3 2-2 4Z"/><path d="M16 9c-2-3 0-5 2-5 0 2-1 4-2 5Z"/></g>`,
  anneau_ecurouille: () =>
    `<path d="M22 22c6 0 8-6 6-10-1 3-3 4-5 3 2-3 0-7-3-7 1 3 0 5-2 6" fill="#d98a3e" ${_O}/><path d="M24 17c1.5-.5 2.5-2 2.5-3.5" stroke="#f6c27a" stroke-width=".8" fill="none"/><circle cx="14" cy="20" r="7" fill="none" stroke="#000a" stroke-width="4.6"/><circle cx="14" cy="20" r="7" fill="none" stroke="#b36a2e" stroke-width="3"/>` +
    `<path d="M10.5 11h7c0 4-1.5 6-3.5 6s-3.5-2-3.5-6Z" fill="#e8c07a" ${_O}/><path d="M10 11.5c0-2.5 2-4 4-4s4 1.5 4 4Z" fill="#6b3f1d" ${_O}/><path d="M14 7.5V5.5" stroke="#6b3f1d" stroke-width="1.2" stroke-linecap="round"/><path d="M11.5 9.5h5M12.5 8.5l3 2" stroke="#0004" stroke-width=".5"/>`,
  bottes_sanglier: () =>
    `<path d="M10 5h8v13c4 .5 8 2 8 5v3H8l2-5Z" fill="#5a4436" ${_O}/><g stroke="#3a2a20" stroke-width=".8" stroke-linecap="round"><path d="M11 9l-1.5-1M14 8l0-1.5M17 9l1.5-1M12 13l-1.5-.5M16 13l1.5-.5M19 19l1-1.5M22 20l1-1.5"/></g><path d="M9 5h10v3.5H9Z" fill="#8a6a4e" ${_O}/><path d="M9.5 5l-1-2 2 .5M13 5l0-2.2 1 1.5M16 5l1-2 .5 2" fill="#8a6a4e" stroke="#3a2a20" stroke-width=".5"/>` +
    `<path d="M24 22c3 0 5-2 5-5-1 2-3 2.5-5 2.5Z" fill="#efe3c7" ${_O}/><path d="M8 25h18v2H8Z" fill="#2a1f16" ${_O}/>`,
  coiffe_prespic: () =>
    `<g fill="#3b4b22" stroke="#000a" stroke-width=".7" stroke-linejoin="round"><path d="M5 21 2 15l5 2ZM7 16 5 9l5 4ZM11 13 10 5l4 6ZM16 12l0-9 3 8ZM21 13l2-8 1 7ZM25 16l3-6 0 6ZM27 21l4-5-1 6Z"/></g><path d="M5 22c0-6 5-10 11-10s11 4 11 10Z" fill="#6f8a3c" ${_O}/><g stroke="#3b4b22" stroke-width=".8" stroke-linecap="round"><path d="M9 18l-1-2M13 16l-.5-2M17 15.5l.3-2M21 16l1-2M24 18l1.5-1.5"/></g><path d="M3 22h26c1 0 1 3 0 3H3c-1 0-1-3 0-3Z" fill="#c9a46a" ${_O}/><circle cx="12" cy="20" r=".9" fill="#1d1d1d"/><circle cx="20" cy="20" r=".9" fill="#1d1d1d"/>`,

  /* ---------- Panoplie du Bwork & Kwak / Scara ---------- */
  hache_bwork: () => _stick(9, 29, 18, 7, '#7a3b22', 2.6) +
    `<path d="M12 23l3 1.2M13.5 19.5l3 1.2" stroke="#d0503d" stroke-width="1.2"/><path d="M17 6C14 1 8 2 6 6c3 1 6 3 7.5 6ZM19 9c3-4 10-4 12 1-3 2-7 4-9.5 7Z" fill="#8e8e8e" ${_O}/><path d="M8 5c2-1.5 4-1.5 6 0M24 8.5c2.5-1 4.5-.5 6 1" stroke="#d4d4d4" stroke-width=".8" fill="none"/><path d="M27 11l-1 1.5M24 14l-.5 1" stroke="#3a3a3a" stroke-width=".8"/><circle cx="18" cy="8" r="1.4" fill="#5a5a5a" ${_o}/>`,
  casque_bwork: () =>
    `<path d="M8 13C3 13 1 7 3 3c1 4 3 5 6 5.5ZM24 13c5 0 7-6 5-10-1 4-3 5-6 5.5Z" fill="#efe3c7" ${_O}/><path d="M4 7.5l1.6.5M28 7.5l-1.6.5M3.5 10l2 .2M28.5 10l-2 .2" stroke="#8a7a5a" stroke-width=".7"/><path d="M8 22c0-8 3.5-12 8-12s8 4 8 12Z" fill="#8e8e8e" ${_O}/><path d="M7 20h18v3.5H7Z" fill="#7a3b22" ${_O}/><path d="M14.6 12h2.8v14h-2.8Z" fill="#6e6e6e" ${_O}/><g fill="#d4d4d4"><circle cx="10" cy="21.8" r=".8"/><circle cx="22" cy="21.8" r=".8"/></g><path d="M10 14c1-2 2.5-3 4-3.4" stroke="#fff6" stroke-width=".9" fill="none"/>`,
  ceinture_bwork: () =>
    `<g fill="none" stroke="#000a" stroke-width="2.6"><ellipse cx="5" cy="16" rx="2.6" ry="1.8"/><ellipse cx="9" cy="16" rx="2.6" ry="1.8"/><ellipse cx="23" cy="16" rx="2.6" ry="1.8"/><ellipse cx="27" cy="16" rx="2.6" ry="1.8"/></g><g fill="none" stroke="#9a9a9a" stroke-width="1.2"><ellipse cx="5" cy="16" rx="2.6" ry="1.8"/><ellipse cx="9" cy="16" rx="2.6" ry="1.8"/><ellipse cx="23" cy="16" rx="2.6" ry="1.8"/><ellipse cx="27" cy="16" rx="2.6" ry="1.8"/></g>` +
    `<path d="M16 8.5c4 0 6.5 2.5 6.5 5.5 0 2-1.2 3.2-2.2 3.8v2.4h-8.6v-2.4c-1-.6-2.2-1.8-2.2-3.8 0-3 2.5-5.5 6.5-5.5Z" fill="#e8e0c8" ${_O}/><path d="M11 9c-2-1-3-3-2-5 .5 2 2 2.5 3 3ZM21 9c2-1 3-3 2-5-.5 2-2 2.5-3 3Z" fill="#8e8e8e" ${_o}/><circle cx="13.5" cy="14" r="1.6" fill="#7a1a1a"/><circle cx="18.5" cy="14" r="1.6" fill="#7a1a1a"/><path d="M14 20.2v-1.8M16 20.2v-1.8M18 20.2v-1.8" stroke="#0007" stroke-width=".6"/>`,
  amulette_craqueleur: () =>
    `<path d="M8 3c0 7 3.5 10 8 10s8-3 8-10" fill="none" stroke="#5a5048" stroke-width="1.6"/><path d="M8 3c0 7 3.5 10 8 10s8-3 8-10" fill="none" stroke="#8a8070" stroke-width=".8" stroke-dasharray="1.4 1.4"/>` +
    `<path d="M9 19l3-6 7-1 5 5-1 8-6 4-7-3Z" fill="#8a8070" ${_O}/><path d="M12 13l2 5-4 3M19 12l-2 6 5 1M14 18h3M17 18l-1 5 3 4" stroke="#e08a3a" stroke-width="1.1" fill="none"/><circle cx="16" cy="19" r="1.5" fill="#ffc06a"/>`,
  cape_kwak: () =>
    `<path d="M11 6h10l2 3c3 5 4 12 4 18l-2.5-2.5L22 28l-2.5-3.5L16 28l-3.5-3.5L10 28l-2.5-3.5L5 27c0-6 1-13 4-18Z" fill="#bfe3f2" ${_O}/><path d="M9 14c3 1 5 1 7 0s4-1 7 0M8 20c3 1 5 1 8 0s5-1 8 0" stroke="#7fc4e6" stroke-width="1" fill="none"/><path d="M11 6h10l1.6 3H9.4Z" fill="#5aa7d6" ${_O}/>` +
    `<g stroke="#fff" stroke-width="1" stroke-linecap="round"><path d="M16 14v6M13.4 15.5l5.2 3M13.4 18.5l5.2-3"/></g><path d="M9 9c-3-2-4-5-2-6 0 2 1.5 3 3 4ZM23 9c3-2 4-5 2-6 0 2-1.5 3-3 4Z" fill="#e8f6ff" ${_o}/>`,
  bottes_scara: () =>
    `<path d="M10 5h8v13c4 .5 8 2 8 5v3H8l2-5Z" fill="#3f8a4a" ${_O}/><path d="M10 9c2.5 1 5.5 1 8 0M10 13c2.5 1 5.5 1 8 0M17.5 18.5c2.5 1 5 3 6.5 5" stroke="#9ad06a" stroke-width="1.1" fill="none"/><path d="M9.5 5h9v3h-9Z" fill="#2a5a32" ${_O}/><path d="M14 4.5c-1-2.5-3-3.5-5-3M14.5 4.5c1-2.5 3-3.5 5-3" stroke="#2a5a32" stroke-width=".9" fill="none"/><ellipse cx="21" cy="21.5" rx="2.2" ry="1.3" fill="#c9f09a" opacity=".6"/><path d="M8 25h18v2H8Z" fill="#1f3a22" ${_O}/>`,

  /* ---------- Panoplie Koalak ---------- */
  coiffe_koalak: () =>
    `<circle cx="8" cy="11" r="5.2" fill="#8b8f96" ${_O}/><circle cx="24" cy="11" r="5.2" fill="#8b8f96" ${_O}/><circle cx="8" cy="11" r="3" fill="#e0b8a0"/><circle cx="24" cy="11" r="3" fill="#e0b8a0"/><path d="M6 9.5c.5-1 1.5-1.5 2.5-1.5M22 9.5c.5-1 1.5-1.5 2.5-1.5" stroke="#f6e3d6" stroke-width=".7" fill="none"/>` +
    `<path d="M7 25c0-8 4-12 9-12s9 4 9 12Z" fill="#8b8f96" ${_O}/><ellipse cx="16" cy="19.5" rx="2.6" ry="2" fill="#2f3237"/><circle cx="11.5" cy="17" r="1" fill="#1d1d1d"/><circle cx="20.5" cy="17" r="1" fill="#1d1d1d"/><path d="M6 24h20v2.6H6Z" fill="#5a5e66" ${_O}/><path d="M9.5 25.3h1.2M13.5 25.3h1.2M17.5 25.3h1.2M21.5 25.3h1.2" stroke="#3a6a3a" stroke-width="1.2"/>`,
  bottes_kanigrou: () =>
    `<path d="M10 5h7v12c5 0 12 2 13 6v3H8l2-5Z" fill="#c58a52" ${_O}/><g stroke="#7a4e2a" stroke-width="1.3" stroke-linecap="round"><path d="M10 10h6M10 13.5h6M18 18l1.5 2M22 18.5l1 2M26 19.5l.5 2"/></g><path d="M9.5 5h8v3h-8Z" fill="#f6e3b0" ${_O}/><path d="M27 26l1.5 2M24 26l1 2M30 25.5l1 2" stroke="#efe3c7" stroke-width="1.3" stroke-linecap="round"/><path d="M8 25h22v1.5H8Z" fill="#5a3a1e" ${_O}/>`,
  anneau_mufafah: () =>
    `<g fill="#8a5a2e" stroke="#000a" stroke-width=".6" stroke-linejoin="round"><path d="M16 2l2 3 3-2 0 3.5 3.5-.5-1.5 3 3 1.5-3 1.5 1.5 3-3.5-.5L21 15l-3-2-2 3-2-3-3 2 0-3.5-3.5.5 1.5-3-3-1.5 3-1.5-1.5-3 3.5.5L11 3l3 2Z"/></g><circle cx="16" cy="9.5" r="3.6" fill="#e8e0c8" ${_O}/><path d="M14.4 8.2h3.2L16 13Z" fill="#fff" ${_o}/>` +
    `<circle cx="16" cy="22" r="6.5" fill="none" stroke="#000a" stroke-width="4.4"/><circle cx="16" cy="22" r="6.5" fill="none" stroke="#5a4a3a" stroke-width="2.8"/><path d="M10.5 20a6.5 6.5 0 0 1 2-3" stroke="#a08a6e" stroke-width=".8" fill="none"/>`,

  /* ---------- Panoplie du Chafer ---------- */
  cape_chafer: () =>
    `<path d="M11 6h10l2 3c3 5 4 12 4 19l-3-3-1.5 4-3-4-2.5 3-2.5-3-3 4L10 25l-3 3c0-7 1-14 4-19Z" fill="#2b2733" ${_O}/><path d="M12 11l-1 13M16 11v14M20 11l1 13" stroke="#45404f" stroke-width="1"/><path d="M11 6h10l1.6 3H9.4Z" fill="#45404f" ${_O}/>` +
    `<path d="M16 12.5c2.4 0 3.6 1.5 3.6 3.2 0 1.2-.7 1.9-1.3 2.2v1.3h-4.6v-1.3c-.6-.3-1.3-1-1.3-2.2 0-1.7 1.2-3.2 3.6-3.2Z" fill="#e8e0c8" ${_o}/><circle cx="14.6" cy="15.8" r="1" fill="#9be8e0"/><circle cx="17.4" cy="15.8" r="1" fill="#9be8e0"/><path d="M9.5 9 7 7M22.5 9 25 7" stroke="#e8e0c8" stroke-width="1.6" stroke-linecap="round"/><circle cx="6.6" cy="6.6" r="1" fill="#e8e0c8"/><circle cx="25.4" cy="6.6" r="1" fill="#e8e0c8"/>`,
  ceinture_ecto: () =>
    `<path d="M3 13c8-2 18-2 26 0v6c-8-2-18-2-26 0Z" fill="#4a7a8a" fill-opacity=".75" ${_O}/><path d="M5 22c0 3 2 4 1 7M10 21c1 3-1 5 1 8M22 21c-1 3 1 5-1 8M27 22c0 3-2 4-1 7" stroke="#9be8e0" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>` +
    `<circle cx="16" cy="16" r="5.5" fill="#1f3a44" ${_O}/><path d="M16 16c0-1 1-1.6 1.8-1 1 .8.5 2.6-1 2.8-2 .3-3.2-1.6-2.4-3.3 1-2 4-2.2 5.2-.2" fill="none" stroke="#9be8e0" stroke-width="1.1"/><circle cx="16" cy="16" r="5.5" fill="none" stroke="#9be8e0" stroke-width=".6" opacity=".7"/>${_spark(25, 9, '#9be8e0', .7)}${_spark(7, 9, '#9be8e0', .55)}`,
  epee_chafer: () =>
    `<path d="M24 3h5v5L14 22l-4-4Z" fill="#d8d4c8" ${_O}/><path d="M17 15l1.5 1.5M20 12l1.5 1.5M23 9l1.5 1.5" stroke="#9a9488" stroke-width=".8"/><path d="M26 5.5 12.5 19.5" stroke="#9be8e0" stroke-width=".9" opacity=".8"/>` +
    `<circle cx="7" cy="15" r="1.6" fill="#e8e0c8" ${_O}/><circle cx="17" cy="25" r="1.6" fill="#e8e0c8" ${_O}/>` + _stick(7.5, 15.5, 16.5, 24.5, '#e8e0c8', 2.2) + _stick(11, 21, 6, 26, '#2b2733', 1.8) +
    `<path d="M4.5 25c0-1.8 1.2-2.8 2.6-2.8s2.6 1 2.6 2.8c0 1-.5 1.5-1 1.8v1h-3.2v-1c-.5-.3-1-.8-1-1.8Z" fill="#e8e0c8" ${_o}/><circle cx="6.1" cy="25" r=".6" fill="#9be8e0"/><circle cx="8.1" cy="25" r=".6" fill="#9be8e0"/>`,
};

const _artCache = {};
function itemArt(id) {
  if (_artCache[id]) return _artCache[id];
  const f = ITEM_ART[id];
  const body = f ? f() : `<path d="M16 6l8 10-8 10-8-10Z" fill="#888" ${_O}/><path d="M16 6v20M8 16h16" stroke="#fff4" stroke-width=".7"/>`;
  return (_artCache[id] = `<svg class="iart" viewBox="0 0 32 32" aria-hidden="true">${body}</svg>`);
}
