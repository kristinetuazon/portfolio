import fs from "node:fs/promises";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";
import { ImageResponse } from "next/og";

/**
 * Link-preview card (1200×630 PNG) for Slack, LinkedIn, X and friends:
 * /api/og?kind=home or /api/og?kind=letter&title=Why%20programming%3F
 */

const FONTS = path.join(process.cwd(), "Assets/Fonts");
const fonts = Promise.all([
  fs.readFile(path.join(FONTS, "Audrey_Body/Audrey-Medium.otf")),
  fs.readFile(path.join(FONTS, "Petrona_Body/static/Petrona-Italic.ttf")),
]);

// A simple onigiri: rice triangle, nori band, two bites out of the top.
const ONIGIRI = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<defs><mask id="b"><rect width="100" height="100" fill="#fff"/>
<circle cx="41" cy="20" r="9.5"/><circle cx="48" cy="13" r="10"/><circle cx="46" cy="3" r="12"/>
<circle cx="57" cy="13" r="10"/><circle cx="64.5" cy="21" r="9"/><circle cx="58" cy="3" r="12"/></mask>
<radialGradient id="r" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#f5f1e8"/><stop offset="1" stop-color="#c9bfad"/></radialGradient></defs>
<g mask="url(#b)"><path d="M50 9C57 9 62 13 67 21L89 60C96 72 90 90 73 91L27 91C10 90 4 72 11 60L33 21C38 13 43 9 50 9Z" fill="url(#r)"/>
<path d="M33 64h34v27H33z" fill="#18211c"/></g>
<ellipse cx="37" cy="57.5" rx="3.6" ry="2" fill="#f29aaa" opacity=".6"/><ellipse cx="63" cy="57.5" rx="3.6" ry="2" fill="#f29aaa" opacity=".6"/>
<ellipse cx="43" cy="53" rx="1.9" ry="2.5" fill="#2b2129"/><ellipse cx="57" cy="53" rx="1.9" ry="2.5" fill="#2b2129"/>
<path d="M47.6 57.6q2.4 2.4 4.8 0" stroke="#2b2129" stroke-width=".9" stroke-linecap="round" fill="none"/></svg>`;

const DANGO = ["#f2a7b6", "#f5f1e8", "#a3c46f"];

export default async function og(req: NextApiRequest, res: NextApiResponse) {
  const letter = req.query.kind === "letter";
  const title = String(req.query.title ?? "").slice(0, 120);
  const [audrey, petrona] = await fonts;

  const image = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "70px 90px",
        background: "linear-gradient(160deg, #3a2d37 0%, #2b2129 55%, #2f3b36 100%)",
        color: "#f6fbf4",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
        {/* No emoji or symbols here: those would be fetched from a CDN at render time. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Audrey",
            fontSize: 30,
            letterSpacing: 6,
            color: "#dd8e58",
          }}
        >
          KRISTINECODES;
          {letter && (
            <>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  background: "#dd8e58",
                  margin: "0 22px",
                }}
              />
              MAILBOX
            </>
          )}
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: "Audrey",
            fontSize: letter && title.length > 40 ? 64 : 80,
            lineHeight: 1.05,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {letter && title ? title : "Kristine Tuazon"}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: "Petrona",
            fontStyle: "italic",
            fontSize: 36,
            color: "#e5d1b8",
          }}
        >
          {letter
            ? "a letter from Kristine, software engineer in Japan"
            : "Software engineer in Yokohama, Japan · QA & frontend at Lazuli"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to PNG, not a web page */}
        <img
          width={260}
          height={260}
          alt=""
          src={`data:image/svg+xml;utf8,${encodeURIComponent(ONIGIRI)}`}
        />
        <div style={{ display: "flex", marginTop: 30, alignItems: "center" }}>
          {DANGO.map((c) => (
            <div
              key={c}
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                background: c,
                marginLeft: -4,
                border: "3px solid #2b2129",
              }}
            />
          ))}
          <div style={{ width: 60, height: 5, background: "#c2956e", marginLeft: 2 }} />
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Audrey", data: audrey, weight: 500, style: "normal" },
        { name: "Petrona", data: petrona, weight: 400, style: "italic" },
      ],
    },
  );

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");
  res.send(Buffer.from(await image.arrayBuffer()));
}
