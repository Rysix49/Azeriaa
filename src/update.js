/* =====================================================================
   AMAKNA IDLE — BANDEAU « NOUVELLE VERSION »
   Le site publie version.json à chaque mise à jour. Si son numéro ne
   correspond plus à celui de la page ouverte, on propose de recharger.
   (Hors du site en ligne, la requête échoue et rien ne s'affiche.)
   ===================================================================== */
(function () {
  let shown = false;
  async function check() {
    if (shown) return;
    try {
      const r = await fetch('version.json?t=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) return;
      const v = await r.json();
      if (v.build && v.build !== BUILD_ID) show();
    } catch (e) {}
  }
  function show() {
    shown = true;
    const el = document.createElement('div');
    el.className = 'update-band';
    el.setAttribute('role', 'status');
    el.innerHTML = '<span><b>Nouvelle version disponible.</b> Recharge la page pour en profiter, ta partie est conservée.</span><button type="button">Recharger la page</button>';
    el.querySelector('button').addEventListener('click', () => {
      try { window.__game && window.__game.st && localStorage.setItem('amakna-idle-save-v1', serialize(window.__game.st)); } catch (e) {}
      location.reload();
    });
    document.body.appendChild(el);
  }
  setTimeout(check, 5000);
  setInterval(check, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
})();

/* Ruban « version de test » sur le site de la branche dev (adresses dev--… ou deploy-preview-…--…netlify.app) */
(function () {
  if (!/^(dev|deploy-preview-\d+)--/.test(location.hostname)) return;
  const el = document.createElement('div');
  el.className = 'dev-ribbon';
  const m = location.hostname.match(/^deploy-preview-(\d+)--/);
  el.innerHTML = '<span>Version de test · comptes et chat séparés du site public</span>'
    + (m ? `<a class="dev-publish" href="https://github.com/Rysix49/Azeriaa/pull/${m[1]}" target="_blank" rel="noopener">🚀 Publier sur le site officiel</a>` : '');
  document.body.appendChild(el);
  if (m) el.querySelector('a').addEventListener('click', () => {
    const t = document.getElementById('toasts');
    if (t) { const d = document.createElement('div'); d.className = 'toast quest'; d.textContent = 'Sur GitHub, clique sur « Merge pull request » puis « Confirm merge ». Le site officiel se met à jour en environ une minute.'; t.appendChild(d); setTimeout(() => d.remove(), 9000); }
  });
  document.documentElement.classList.add('is-dev');
})();
