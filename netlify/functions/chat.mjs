// Chat « Général » d'Amakna Idle : messages stockés dans Netlify Blobs.
// GET  /api/chat?since=<timestamp>&cid=<id joueur>  -> { messages: [...], online: <joueurs en ligne> }
// POST /api/chat { n: pseudo, x: texte, c: classe, token? } -> { ok, message }
// Un pseudo qui appartient à un compte exige le jeton de ce compte ; le message porte alors sa photo (av).
import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";
const sha = (t) => createHash("sha256").update(t).digest("hex");

const KEY = "general";
const MAX_KEEP = 200;

// Site de test (branche dev) : données séparées du site public
const storeName = (base, context) => {
  const ctx = (context && context.deploy && context.deploy.context) || process.env.CONTEXT || "production";
  return ctx === "production" ? base : base + "-dev";
};

export default async (req, context) => {
  const store = getStore(storeName("chat", context));
  if (req.method === "GET") {
    const url = new URL(req.url);
    const since = Number(url.searchParams.get("since") || 0);
    const cid = String(url.searchParams.get("cid") || "").slice(0, 40);
    // Présence : chaque joueur signale sa présence à chaque lecture du chat
    const now = Date.now();
    const presence = (await store.get("presence", { type: "json" })) || {};
    if (cid) presence[cid] = now;
    for (const [k, t] of Object.entries(presence)) if (now - t > 45000) delete presence[k];
    if (cid) await store.setJSON("presence", presence);
    const list = (await store.get(KEY, { type: "json" })) || [];
    return Response.json({ messages: list.filter((m) => m.t > since).slice(-100), online: Object.keys(presence).length }, { headers: { "cache-control": "no-store" } });
  }
  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return new Response("Requête invalide", { status: 400 }); }
    const n = String(body.n || "").replace(/\s+/g, " ").trim().slice(0, 20);
    const x = String(body.x || "").replace(/\s+/g, " ").trim().slice(0, 240);
    if (!n || !x) return new Response("Pseudo et message requis", { status: 400 });
    const owner = await getStore(storeName("accounts", context)).get("user:" + n.toLowerCase(), { type: "json" });
    if (owner && !(body.token && (owner.tokens || []).includes(sha(String(body.token)))))
      return new Response("Ce pseudo appartient à un compte : connecte-toi pour l'utiliser.", { status: 403 });
    const list = (await store.get(KEY, { type: "json" })) || [];
    const last = list[list.length - 1];
    const m = { id: crypto.randomUUID(), t: Math.max(Date.now(), last ? last.t + 1 : 0), n: owner ? owner.name : n, x, c: String(body.c || "").slice(0, 12), av: owner ? owner.avatarAt || 0 : 0 };
    list.push(m);
    await store.setJSON(KEY, list.slice(-MAX_KEEP));
    return Response.json({ ok: true, message: m });
  }
  return new Response("Méthode non autorisée", { status: 405 });
};

export const config = { path: "/api/chat" };
