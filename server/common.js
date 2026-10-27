// Outils partagés des fonctions Cloudflare Pages (chat, comptes, avatars).
// Base D1 liée sous le nom « DB ». Le site de test (toute adresse *.<projet>.pages.dev,
// ex. dev.azeriaa.pages.dev) utilise des tables séparées préfixées « dev_ ».
export const isDev = (req) => {
  const h = new URL(req.url).hostname;
  return h === "localhost" || h === "127.0.0.1" || /^[^.]+\.[^.]+\.pages\.dev$/.test(h);
};
export const T = (req) => (isDev(req) ? "dev_" : "");

const ready = new Set();
export async function db(env, req) {
  if (!env.DB) throw new Error("Base D1 « DB » non liée au projet.");
  const p = T(req);
  if (!ready.has(p)) {
    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS ${p}users (lname TEXT PRIMARY KEY, name TEXT, salt TEXT, hash TEXT, tokens TEXT, created INTEGER, save TEXT, saved_at INTEGER DEFAULT 0, avatar TEXT, avatar_at INTEGER DEFAULT 0)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS ${p}messages (id TEXT PRIMARY KEY, t INTEGER, n TEXT, x TEXT, c TEXT, av INTEGER DEFAULT 0)`),
      env.DB.prepare(`CREATE INDEX IF NOT EXISTS ${p}messages_t ON ${p}messages (t)`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS ${p}presence (cid TEXT PRIMARY KEY, t INTEGER, n TEXT)`),
    ]);
    ready.add(p);
  }
  return { DB: env.DB, p };
}
export const json = (o, status = 200) => Response.json(o, { status, headers: { "cache-control": "no-store" } });
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
export const sha = async (t) => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)));
export const randHex = (n) => hex(crypto.getRandomValues(new Uint8Array(n)));
export async function hashPass(pass, salt) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: 100000 }, key, 256));
}
export const cleanName = (s) => String(s || "").replace(/\s+/g, " ").trim().slice(0, 20);
export async function getUser(DB, p, name) {
  const u = await DB.prepare(`SELECT * FROM ${p}users WHERE lname = ?`).bind(name.toLowerCase()).first();
  if (u) u.tokens = JSON.parse(u.tokens || "[]");
  return u;
}
