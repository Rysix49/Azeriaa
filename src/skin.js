/* =====================================================================
   AMAKNA IDLE — FORMAT D'AFFICHAGE
   ===================================================================== */
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
