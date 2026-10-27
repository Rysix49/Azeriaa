// Chat « Général » d'Amakna Idle (Cloudflare Pages + D1).
// GET  /api/chat?since=<timestamp>&cid=<id joueur>&n=<pseudo> -> { messages, online, players, anonymous }
// POST /api/chat { n, x, c, token? } -> { ok, message }
// Un pseudo qui appartient à un compte exige le jeton de ce compte ; le message porte alors sa photo (av).
import { db, json, sha, cleanName, getUser } from "../../server/common.js";

const MAX_KEEP = 200, ONLINE_MS = 45000, BEAT_MS = 20000;

export async function onRequestGet({ request, env }) {
  const { DB, p } = await db(env, request);
  const url = new URL(request.url);
  const since = Number(url.searchParams.get("since") || 0);
  const cid = String(url.searchParams.get("cid") || "").slice(0, 40);
  const who = cleanName(url.searchParams.get("n"));
  const now = Date.now();
  // Présence : on n'écrit qu'environ toutes les 20 s par joueur (ou si son pseudo change) pour économiser le quota
  const writes = [DB.prepare(`DELETE FROM ${p}presence WHERE t < ?`).bind(now - ONLINE_MS)];
  if (cid) writes.push(DB.prepare(`INSERT INTO ${p}presence (cid, t, n) VALUES (?, ?, ?) ON CONFLICT(cid) DO UPDATE SET t = excluded.t, n = excluded.n WHERE excluded.t - ${p}presence.t > ${BEAT_MS} OR ${p}presence.n <> excluded.n`).bind(cid, now, who));
  const [, , pres, msgs] = await DB.batch([
    ...writes.length === 2 ? writes : [...writes, DB.prepare("SELECT 1")],
    DB.prepare(`SELECT n FROM ${p}presence WHERE t >= ?`).bind(now - ONLINE_MS),
    DB.prepare(`SELECT id, t, n, x, c, av FROM ${p}messages WHERE t > ? ORDER BY t DESC LIMIT 100`).bind(since),
  ]);
  const rows = pres.results || [];
  const players = [...new Set(rows.map((r) => r.n).filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr"));
  return json({ messages: (msgs.results || []).reverse(), online: rows.length, players, anonymous: rows.filter((r) => !r.n).length });
}

export async function onRequestPost({ request, env }) {
  const { DB, p } = await db(env, request);
  let body;
  try { body = await request.json(); } catch { return new Response("Requête invalide", { status: 400 }); }
  const n = cleanName(body.n);
  const x = String(body.x || "").replace(/\s+/g, " ").trim().slice(0, 240);
  if (!n || !x) return new Response("Pseudo et message requis", { status: 400 });
  const owner = await getUser(DB, p, n);
  if (owner && !(body.token && owner.tokens.includes(await sha(String(body.token)))))
    return new Response("Ce pseudo appartient à un compte : connecte-toi pour l'utiliser.", { status: 403 });
  const last = await DB.prepare(`SELECT MAX(t) AS t FROM ${p}messages`).first();
  const m = { id: crypto.randomUUID(), t: Math.max(Date.now(), last && last.t ? last.t + 1 : 0), n: owner ? owner.name : n, x, c: String(body.c || "").slice(0, 12), av: owner ? owner.avatar_at || 0 : 0 };
  await DB.batch([
    DB.prepare(`INSERT INTO ${p}messages (id, t, n, x, c, av) VALUES (?, ?, ?, ?, ?, ?)`).bind(m.id, m.t, m.n, m.x, m.c, m.av),
    DB.prepare(`DELETE FROM ${p}messages WHERE t < (SELECT t FROM ${p}messages ORDER BY t DESC LIMIT 1 OFFSET ${MAX_KEEP - 1})`),
  ]);
  return json({ ok: true, message: m });
}
