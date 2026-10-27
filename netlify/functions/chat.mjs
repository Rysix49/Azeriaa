// Chat « Général » d'Amakna Idle : messages stockés dans Netlify Blobs.
// GET  /api/chat?since=<timestamp>  -> { messages: [...] }
// POST /api/chat { n: pseudo, x: texte, c: classe } -> { ok, message }
import { getStore } from "@netlify/blobs";

const KEY = "general";
const MAX_KEEP = 200;

export default async (req) => {
  const store = getStore("chat");
  if (req.method === "GET") {
    const since = Number(new URL(req.url).searchParams.get("since") || 0);
    const list = (await store.get(KEY, { type: "json" })) || [];
    return Response.json({ messages: list.filter((m) => m.t > since).slice(-100) }, { headers: { "cache-control": "no-store" } });
  }
  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return new Response("Requête invalide", { status: 400 }); }
    const n = String(body.n || "").replace(/\s+/g, " ").trim().slice(0, 20);
    const x = String(body.x || "").replace(/\s+/g, " ").trim().slice(0, 240);
    if (!n || !x) return new Response("Pseudo et message requis", { status: 400 });
    const list = (await store.get(KEY, { type: "json" })) || [];
    const last = list[list.length - 1];
    const m = { id: crypto.randomUUID(), t: Math.max(Date.now(), last ? last.t + 1 : 0), n, x, c: String(body.c || "").slice(0, 12) };
    list.push(m);
    await store.setJSON(KEY, list.slice(-MAX_KEEP));
    return Response.json({ ok: true, message: m });
  }
  return new Response("Méthode non autorisée", { status: 405 });
};

export const config = { path: "/api/chat" };
