import fs from "node:fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkBotId } from "botid/server";

/**
 * Hands out the CV, but only to what looks like a real person on this site.
 *
 * The PDF is NOT in this (public) repository and not in /public. It lives in
 * private storage and is fetched server-side from a secret URL, so the file's
 * real location never reaches the browser:
 *
 *   CV_FILE_URL   secret URL of the PDF (e.g. a Vercel Blob URL)   — production
 *   CV_FILE_PATH  absolute path to a local PDF outside the repo    — local testing
 *
 * Guardrails, in order:
 *   1. POST only (no plain links for crawlers to follow)
 *   2. Same-origin only (the request must come from this site's own page)
 *   3. Honeypot: a hidden form field that people never fill in, but bots do
 *   4. Rate limit per visitor
 *   5. Vercel BotID invisible bot check (on Vercel deployments)
 *   6. Response headers: download-only, never cached, never indexed
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // per serverless instance; a speed bump, not a vault

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_PER_WINDOW;
}

function sameOrigin(req: NextApiRequest) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  const origin = req.headers.origin ?? req.headers.referer;
  if (!host || !origin) return false;
  try {
    return new URL(String(origin)).host === String(host).split(",")[0]!.trim();
  } catch {
    return false;
  }
}

async function loadCv(): Promise<Buffer | null> {
  if (process.env.CV_FILE_URL) {
    const res = await fetch(process.env.CV_FILE_URL, { cache: "no-store" });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  }
  if (process.env.CV_FILE_PATH) {
    try {
      return await fs.readFile(process.env.CV_FILE_PATH);
    } catch {
      return null;
    }
  }
  return null;
}

const deny = (res: NextApiResponse, status: number, error: string) =>
  res.status(status).setHeader("Cache-Control", "no-store").json({ error });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return deny(res, 405, "Method not allowed");
  }
  if (!sameOrigin(req)) return deny(res, 403, "Forbidden");

  const body = (typeof req.body === "object" && req.body) || {};
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return deny(res, 403, "Forbidden"); // honeypot filled in: a bot
  }

  const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown")
    .split(",")[0]!
    .trim();
  if (rateLimited(ip)) {
    res.setHeader("Retry-After", String(WINDOW_MS / 1000));
    return deny(res, 429, "Too many requests");
  }

  // BotID only works on Vercel; elsewhere (local `next start`) the other checks still apply.
  if (process.env.VERCEL) {
    const verdict = await checkBotId({ advancedOptions: { headers: req.headers } });
    if (!verdict.isHuman) return deny(res, 403, "Forbidden"); // blocks good bots (crawlers) too
  }

  const pdf = await loadCv();
  if (!pdf) return deny(res, 503, "CV not available");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="Kristine_Tuazon_CV.pdf"');
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("Content-Length", String(pdf.length));
  return res.status(200).send(pdf);
}
