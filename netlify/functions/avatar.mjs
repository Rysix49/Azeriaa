// Photo de profil d'un joueur : GET /api/avatar?n=<pseudo>&v=<version>
import { getStore } from "@netlify/blobs";

// Site de test (branche dev) : données séparées du site public
const storeName = (base, context) => {
  const ctx = (context && context.deploy && context.deploy.context) || process.env.CONTEXT || "production";
  return ctx === "production" ? base : base + "-dev";
};

export default async (req, context) => {
  const n = String(new URL(req.url).searchParams.get("n") || "").replace(/\s+/g, " ").trim().toLowerCase().slice(0, 20);
  const u = n ? await getStore(storeName("accounts", context)).get("user:" + n, { type: "json" }) : null;
  const m = u && u.avatar && u.avatar.match(/^data:([^;]+);base64,(.*)$/);
  if (!m) return new Response("Pas de photo", { status: 404 });
  return new Response(Buffer.from(m[2], "base64"), { headers: { "content-type": m[1], "cache-control": "public, max-age=604800, immutable" } });
};

export const config = { path: "/api/avatar" };
