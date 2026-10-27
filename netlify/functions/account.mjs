// Comptes joueurs d'Amakna Idle : pseudo + mot de passe, sauvegarde dans le cloud.
// POST /api/account { action, ... }
//   register { name, pass, save? } -> { name, token, savedAt }
//   login    { name, pass }        -> { name, token, save, savedAt }
//   load     { name, token }       -> { name, save, savedAt }
//   save     { name, token, save } -> { savedAt }
//   logout   { name, token }       -> { ok }
// Les mots de passe sont hachés (scrypt + sel). Les jetons de session sont stockés hachés.
import { getStore } from "@netlify/blobs";
import { scryptSync, randomBytes, timingSafeEqual, createHash } from "node:crypto";

const MAX_SAVE = 2_000_000;
const json = (o, status = 200) => Response.json(o, { status, headers: { "cache-control": "no-store" } });
const hashPass = (p, salt) => scryptSync(p, salt, 32).toString("hex");
const sha = (t) => createHash("sha256").update(t).digest("hex");

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);
  let b;
  try { b = await req.json(); } catch { return json({ error: "Requête invalide." }, 400); }
  const store = getStore("accounts");
  const name = String(b.name || "").replace(/\s+/g, " ").trim().slice(0, 20);
  if (!/^[\p{L}\p{N} _.-]{3,20}$/u.test(name)) return json({ error: "Le pseudo doit faire de 3 à 20 caractères (lettres, chiffres, espace, _ . -)." }, 400);
  const key = "user:" + name.toLowerCase();
  const user = await store.get(key, { type: "json" });

  const issueToken = async (u) => {
    const token = randomBytes(24).toString("hex");
    u.tokens = [sha(token), ...(u.tokens || [])].slice(0, 10); // 10 appareils connectés max
    await store.setJSON(key, u);
    return token;
  };
  const authed = () => !!(user && b.token && (user.tokens || []).includes(sha(String(b.token))));

  switch (b.action) {
    case "register": {
      if (user) return json({ error: "Ce pseudo est déjà pris." }, 409);
      const pass = String(b.pass || "");
      if (pass.length < 4) return json({ error: "Le mot de passe doit faire au moins 4 caractères." }, 400);
      const save = b.save ? String(b.save) : null;
      if (save && save.length > MAX_SAVE) return json({ error: "Sauvegarde trop grande." }, 413);
      const salt = randomBytes(16).toString("hex");
      const u = { name, salt, hash: hashPass(pass, salt), created: Date.now(), save, savedAt: save ? Date.now() : 0 };
      const token = await issueToken(u);
      return json({ ok: true, name, token, savedAt: u.savedAt });
    }
    case "login": {
      if (!user) return json({ error: "Pseudo ou mot de passe incorrect." }, 401);
      const h = Buffer.from(hashPass(String(b.pass || ""), user.salt), "hex");
      if (!timingSafeEqual(h, Buffer.from(user.hash, "hex"))) return json({ error: "Pseudo ou mot de passe incorrect." }, 401);
      const token = await issueToken(user);
      return json({ ok: true, name: user.name, token, save: user.save, savedAt: user.savedAt });
    }
    case "load": {
      if (!authed()) return json({ error: "Session expirée, reconnecte-toi." }, 401);
      return json({ ok: true, name: user.name, save: user.save, savedAt: user.savedAt });
    }
    case "save": {
      if (!authed()) return json({ error: "Session expirée, reconnecte-toi." }, 401);
      const save = String(b.save || "");
      if (!save || save.length > MAX_SAVE) return json({ error: "Sauvegarde invalide." }, 400);
      user.save = save; user.savedAt = Date.now();
      await store.setJSON(key, user);
      return json({ ok: true, savedAt: user.savedAt });
    }
    case "logout": {
      if (authed()) { user.tokens = user.tokens.filter((t) => t !== sha(String(b.token))); await store.setJSON(key, user); }
      return json({ ok: true });
    }
  }
  return json({ error: "Action inconnue." }, 400);
};

export const config = { path: "/api/account" };
