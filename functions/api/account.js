// Comptes joueurs d'Amakna Idle (Cloudflare Pages + D1) : pseudo + mot de passe, sauvegarde dans le cloud.
// POST /api/account { action, ... }
//   register { name, pass, save? } -> { name, token, savedAt }
//   login    { name, pass }        -> { name, token, save, savedAt, avatarAt }
//   load     { name, token }       -> { name, save, savedAt, avatarAt }
//   save     { name, token, save } -> { savedAt }
//   avatar   { name, token, avatar } -> { avatarAt }   (avatar = image data:URL, ou vide pour retirer)
//   logout   { name, token }       -> { ok }
// Mots de passe hachés (PBKDF2-SHA256, 100 000 itérations + sel). Jetons de session stockés hachés.
import { db, json, sha, randHex, hashPass, cleanName, getUser, isDev } from "../../server/common.js";

const MAX_SAVE = 1_900_000;
// Ancien hébergement (Netlify) : les comptes y sont vérifiés puis rapatriés à la première connexion.
const LEGACY = "https://azeriaa.netlify.app";
async function legacyImport(env, DB, p, name, pass) {
  const base = env.LEGACY_URL || LEGACY;
  try {
    const r = await fetch(base + "/api/account", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "login", name, pass }) });
    if (!r.ok) return null;
    const o = await r.json();
    if (!o || !o.ok || !o.name) return null;
    let avatar = null, avatarAt = 0;
    if (o.avatarAt) {
      try {
        const a = await fetch(base + "/api/avatar?n=" + encodeURIComponent(o.name) + "&v=" + o.avatarAt);
        const type = (a.headers.get("content-type") || "").split(";")[0];
        if (a.ok && /^image\/(jpeg|png|webp)$/.test(type)) {
          const bytes = new Uint8Array(await a.arrayBuffer());
          let bin = ""; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
          const url = `data:${type};base64,${btoa(bin)}`;
          if (url.length <= 150000) { avatar = url; avatarAt = o.avatarAt; }
        }
      } catch {}
    }
    const salt = randHex(16), save = o.save && String(o.save).length <= MAX_SAVE ? String(o.save) : null;
    await DB.prepare(`INSERT INTO ${p}users (lname, name, salt, hash, tokens, created, save, saved_at, avatar, avatar_at) VALUES (?, ?, ?, ?, '[]', ?, ?, ?, ?, ?)`)
      .bind(o.name.toLowerCase(), o.name, salt, await hashPass(pass, salt), Date.now(), save, save ? o.savedAt || Date.now() : 0, avatar, avatarAt).run();
    return getUser(DB, p, o.name);
  } catch { return null; }
}

export async function onRequestPost({ request, env }) {
  const { DB, p } = await db(env, request);
  let b;
  try { b = await request.json(); } catch { return json({ error: "Requête invalide." }, 400); }
  const name = cleanName(b.name);
  if (!/^[\p{L}\p{N} _.-]{3,20}$/u.test(name)) return json({ error: "Le pseudo doit faire de 3 à 20 caractères (lettres, chiffres, espace, _ . -)." }, 400);
  const lname = name.toLowerCase();
  let user = await getUser(DB, p, name);
  const tokenOk = async () => !!(user && b.token && user.tokens.includes(await sha(String(b.token))));
  const issueToken = async (tokens) => { const token = randHex(24); return { token, tokens: JSON.stringify([await sha(token), ...tokens].slice(0, 10)) }; };

  switch (b.action) {
    case "register": {
      if (user) return json({ error: "Ce pseudo est déjà pris." }, 409);
      const pass = String(b.pass || "");
      if (pass.length < 4) return json({ error: "Le mot de passe doit faire au moins 4 caractères." }, 400);
      const save = b.save ? String(b.save) : null;
      if (save && save.length > MAX_SAVE) return json({ error: "Sauvegarde trop grande." }, 413);
      const salt = randHex(16), now = Date.now();
      const { token, tokens } = await issueToken([]);
      try {
        await DB.prepare(`INSERT INTO ${p}users (lname, name, salt, hash, tokens, created, save, saved_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
          .bind(lname, name, salt, await hashPass(pass, salt), tokens, now, save, save ? now : 0).run();
      } catch { return json({ error: "Ce pseudo est déjà pris." }, 409); }
      return json({ ok: true, name, token, savedAt: save ? now : 0 });
    }
    case "login": {
      if (!user && (!isDev(request) || env.LEGACY_URL)) user = await legacyImport(env, DB, p, name, String(b.pass || ""));
      if (!user || (await hashPass(String(b.pass || ""), user.salt)) !== user.hash) return json({ error: "Pseudo ou mot de passe incorrect." }, 401);
      const { token, tokens } = await issueToken(user.tokens);
      await DB.prepare(`UPDATE ${p}users SET tokens = ? WHERE lname = ?`).bind(tokens, lname).run();
      return json({ ok: true, name: user.name, token, save: user.save, savedAt: user.saved_at, avatarAt: user.avatar_at || 0 });
    }
    case "load": {
      if (!(await tokenOk())) return json({ error: "Session expirée, reconnecte-toi." }, 401);
      return json({ ok: true, name: user.name, save: user.save, savedAt: user.saved_at, avatarAt: user.avatar_at || 0 });
    }
    case "save": {
      if (!(await tokenOk())) return json({ error: "Session expirée, reconnecte-toi." }, 401);
      const save = String(b.save || "");
      if (!save || save.length > MAX_SAVE) return json({ error: "Sauvegarde invalide." }, 400);
      const now = Date.now();
      await DB.prepare(`UPDATE ${p}users SET save = ?, saved_at = ? WHERE lname = ?`).bind(save, now, lname).run();
      return json({ ok: true, savedAt: now });
    }
    case "avatar": {
      if (!(await tokenOk())) return json({ error: "Session expirée, reconnecte-toi." }, 401);
      const av = String(b.avatar || "");
      if (av && (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(av) || av.length > 150000)) return json({ error: "Image invalide ou trop lourde." }, 400);
      const at = av ? Date.now() : 0;
      await DB.prepare(`UPDATE ${p}users SET avatar = ?, avatar_at = ? WHERE lname = ?`).bind(av || null, at, lname).run();
      return json({ ok: true, avatarAt: at });
    }
    case "logout": {
      if (await tokenOk()) { const h = await sha(String(b.token)); await DB.prepare(`UPDATE ${p}users SET tokens = ? WHERE lname = ?`).bind(JSON.stringify(user.tokens.filter((t) => t !== h)), lname).run(); }
      return json({ ok: true });
    }
  }
  return json({ error: "Action inconnue." }, 400);
}
export const onRequestGet = () => json({ error: "Méthode non autorisée." }, 405);
