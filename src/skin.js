/* =====================================================================
   AMAKNA IDLE — CHOIX DE L'INTERFACE
   « new » (nouvelle, par défaut) ou « classic » (l'interface d'avant).
   Les deux lisent et écrivent la même sauvegarde.
   ===================================================================== */
const SKIN_KEY = 'amakna-skin';
let SKIN = 'new';
try { SKIN = localStorage.getItem(SKIN_KEY) === 'classic' ? 'classic' : 'new'; } catch (e) {}
if (location.hash === '#classique') SKIN = 'classic';
if (location.hash === '#nouvelle') SKIN = 'new';
document.getElementById(SKIN === 'classic' ? 'css-classic' : 'css-new').media = 'all';

const CLASSIC_SHELL = `<header class="top"><div class="top-in">
  <div class="brand-row">
    <div class="brand"><h1>Amakna <em>Idle</em></h1><small>Fan-game · bêta</small></div>
    <div class="wallet" id="wallet"></div>
  </div>
  <nav class="tabs" id="tabs" aria-label="Sections du jeu"></nav>
</div></header>
<main id="main"></main>
<footer>Jeu de fan non officiel et gratuit, inspiré de l'univers de Dofus. Dofus et tous les noms associés appartiennent à Ankama Games. Aucune image du jeu original n'est utilisée.</footer>`;

function setSkin(s) {
  try { localStorage.setItem(SKIN_KEY, s); } catch (e) {}
  try { history.replaceState(null, '', '#' + (s === 'classic' ? 'classique' : 'nouvelle')); } catch (e) {}
  location.reload();
  setTimeout(() => {
    const box = document.getElementById('toasts');
    if (box) { const el = document.createElement('div'); el.className = 'toast warn'; el.textContent = 'Recharge la page pour changer d’interface.'; box.appendChild(el); }
  }, 1500);
}

/* Format d'affichage : auto (selon l'écran), mobile (téléphone) ou pc */
const LAYOUT_KEY = 'amakna-layout';
let LAYOUT = 'auto';
try { LAYOUT = localStorage.getItem(LAYOUT_KEY) || 'auto'; } catch (e) {}
function applyLayout(l) {
  LAYOUT = l;
  try { localStorage.setItem(LAYOUT_KEY, l); } catch (e) {}
  document.documentElement.dataset.layout = l;
  const vp = document.getElementById('vp');
  const content = l === 'pc' ? 'width=1280, viewport-fit=cover' : 'width=device-width, initial-scale=1, viewport-fit=cover';
  if (vp) vp.setAttribute('content', content);
  document.querySelectorAll('meta[name="viewport"]').forEach(m => m.setAttribute('content', content));
}
applyLayout(LAYOUT);
