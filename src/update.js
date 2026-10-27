/* =====================================================================
   AMAKNA IDLE — BANDEAU « NOUVELLE VERSION »
   Le site publie version.json à chaque mise à jour. Si son numéro ne
   correspond plus à celui de la page ouverte, on propose de recharger.
   (Hors du site en ligne, la requête échoue et rien ne s'affiche.)
   ===================================================================== */
(function () {
  let shown = false;
  // Site de test (Cloudflare dev.<projet>.pages.dev, ou ancien Netlify dev--/deploy-preview-)
  const DEV = /^[^.]+\.[^.]+\.pages\.dev$/.test(location.hostname) || /^(dev|deploy-preview-\d+)--/.test(location.hostname);
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
    el.innerHTML = DEV
      ? '<span><b>🧪 Nouveauté publiée sur le site de test !</b> Recharge ton jeu (dev) pour la tester, ta partie est conservée.</span><button type="button">Recharger (dev)</button>'
      : '<span><b>Nouvelle version disponible.</b> Recharge la page pour en profiter, ta partie est conservée.</span><button type="button">Recharger la page</button>';
    if (DEV) el.classList.add('is-dev-update');
    el.querySelector('button').addEventListener('click', () => {
      try { window.__game && window.__game.st && localStorage.setItem('amakna-idle-save-v1', serialize(window.__game.st)); } catch (e) {}
      location.reload();
    });
    document.body.appendChild(el);
  }
  setTimeout(check, 5000);
  setInterval(check, DEV ? 15000 : 60000); // le site de test vérifie plus souvent
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
})();

/* Ruban « version de test » sur le site de la branche dev
   (Cloudflare : dev.<projet>.pages.dev ou <hash>.<projet>.pages.dev · Netlify : dev--… / deploy-preview-…--…) */
(function () {
  const h = location.hostname;
  const cf = /^[^.]+\.[^.]+\.pages\.dev$/.test(h);
  if (!cf && !/^(dev|deploy-preview-\d+)--/.test(h)) return;
  const el = document.createElement('div');
  el.className = 'dev-ribbon';
  el.innerHTML = '<span>Version de test · comptes et chat séparés du site public</span>';
  document.body.appendChild(el);
  document.documentElement.classList.add('is-dev');
  // Bouton « Publier » : toujours présent sur le site de test.
  // Il pointe vers la demande de fusion ouverte dev -> main (ou propose d'en créer une).
  const a = document.createElement('a'); a.className = 'dev-publish'; a.target = '_blank'; a.rel = 'noopener';
  a.href = 'https://github.com/Rysix49/Azeriaa/compare/main...dev?expand=1';
  a.textContent = '🚀 Publier sur le site officiel';
  el.appendChild(a);
  const say = (txt) => { const t = document.getElementById('toasts'); if (t) { const d = document.createElement('div'); d.className = 'toast quest'; d.textContent = txt; t.appendChild(d); setTimeout(() => d.remove(), 9000); } };
  let pr = null;
  a.addEventListener('click', () => say(pr
    ? 'Sur GitHub, clique sur « Merge pull request » puis « Confirm merge ». Le site officiel se met à jour en 1 à 2 minutes.'
    : 'Sur GitHub, clique sur « Create pull request », puis « Merge pull request » et « Confirm merge ». Le site officiel se met à jour en 1 à 2 minutes.'));
  const setPr = (num) => { pr = num; a.href = 'https://github.com/Rysix49/Azeriaa/pull/' + num + '#partial-pull-merging'; a.textContent = '🚀 Publier sur le site officiel (#' + num + ')'; };
  const m = h.match(/^deploy-preview-(\d+)--/);
  if (m) return setPr(m[1]);
  fetch('https://api.github.com/repos/Rysix49/Azeriaa/pulls?state=open&head=Rysix49:dev', { headers: { accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : []).then(list => { if (list && list[0]) setPr(list[0].number); }).catch(() => {});
})();
