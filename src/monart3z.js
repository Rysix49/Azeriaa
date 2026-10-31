/* =====================================================================
   Enregistrement final des sprites des nouvelles terres (monart3a-c.js) :
   les archimonstres reprennent le dessin de leur modèle (agrandi et nimbé d'or en CSS)
   ===================================================================== */
for (const [mid, m] of Object.entries(MONSTERS)) if (m.archi && MON_ART[m.base] && !MON_ART[mid]) MON_ART[mid] = MON_ART[m.base];
