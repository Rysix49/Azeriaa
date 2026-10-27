// Photo de profil d'un joueur : GET /api/avatar?n=<pseudo>&v=<version>
import { db, cleanName } from "../../server/common.js";

export async function onRequestGet({ request, env }) {
  const { DB, p } = await db(env, request);
  const n = cleanName(new URL(request.url).searchParams.get("n")).toLowerCase();
  const u = n ? await DB.prepare(`SELECT avatar FROM ${p}users WHERE lname = ?`).bind(n).first() : null;
  const m = u && u.avatar && u.avatar.match(/^data:([^;]+);base64,(.*)$/);
  if (!m) return new Response("Pas de photo", { status: 404 });
  const bin = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
  return new Response(bin, { headers: { "content-type": m[1], "cache-control": "public, max-age=604800, immutable" } });
}
