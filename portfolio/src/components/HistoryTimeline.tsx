import { useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "../lib/gsap";
import { useT, type Dict } from "../i18n";
import classmates from "../../public/IMG_0536.jpg";
import studyHero from "../../public/StudyHero/StudyHero1.jpg";
import costOfLiving from "../../public/CostOfLiving/Cost_of_Living1.jpg";
import minimize from "../../public/Minimize/Minimize1.jpeg";
import tokyoNoire from "../../public/TokyoNoire/TokyoNoire1.jpeg";

type ChapterId = Dict["story"]["history"]["chapters"][number]["id"];

// Merged pull requests at Lazuli per year, from GitHub (2026 is so far).
const PRS_PER_YEAR = [
  { year: "2023", prs: 74 },
  { year: "2024", prs: 176 },
  { year: "2025", prs: 144 },
  { year: "2026", prs: 190 },
];

// One dot color per chapter, walking through the dango palette.
const DOTS: Record<string, string> = {
  hello: "#f6c177",
  bootcamp: "#f2a7b6",
  lazuli: "#7aa2d6",
  platform: "#a3c46f",
  qa: "#9acd32",
  now: "#dd8e58",
};

/** A little 3×3 patch of cross-stitches in one thread color. */
const StitchMotif = ({ color }: { color: string }) => (
  <svg viewBox="0 0 30 30" className="block h-full w-full">
    <rect width="30" height="30" rx="4" fill="#fbf6ea" />
    {[0, 1, 2].flatMap((r) =>
      [0, 1, 2].map((c) => (
        <path
          key={`${r}${c}`}
          d={`M${4 + c * 8} ${4 + r * 8}l6 6M${10 + c * 8} ${4 + r * 8}l-6 6`}
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )),
    )}
  </svg>
);

/* ---------- Little pictures, one per chapter (always on paper, so fixed colors) ---------- */

/** A laptop typing its first line. */
const HelloVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <rect x="40" y="14" width="140" height="92" rx="8" fill="#2b2129" />
    <rect x="48" y="22" width="124" height="76" rx="3" fill="#1d171c" />
    <text x="56" y="44" fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#a3c46f">
      &gt;
    </text>
    <text
      className="hv-typed"
      x="62"
      y="44"
      fontFamily="ui-monospace, monospace"
      fontSize="6.8"
      fill="#fbf6ea"
    >
      console.log(&quot;hello, world&quot;)
    </text>
    <text
      className="hv-output"
      x="56"
      y="60"
      fontFamily="ui-monospace, monospace"
      fontSize="8.5"
      fill="#f6c177"
    >
      hello, world
    </text>
    <rect className="hv-caret" x="56" y="66" width="5" height="9" fill="#fbf6ea" />
    <path d="M22 108h176l-14 16H36z" fill="#c9bfad" />
    <rect x="96" y="110" width="28" height="4" rx="2" fill="#a99f8c" />
  </svg>
);

/** The cohort photo and the four apps. */
const BootcampVisual = ({ alt }: { alt: string }) => (
  <div className="hv-bootcamp">
    <Image
      src={classmates}
      alt={alt}
      sizes="(min-width: 976px) 340px, 80vw"
      className="hv-photo"
      placeholder="blur"
    />
    <div className="hv-thumbs">
      {[studyHero, costOfLiving, minimize, tokyoNoire].map((src, i) => (
        <Image key={i} src={src} alt="" sizes="90px" className="hv-thumb" />
      ))}
    </div>
  </div>
);

/** A product catalogue, with an AI sparkle writing a description. */
const LazuliVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <rect x="16" y="12" width="188" height="116" rx="8" fill="#fff" stroke="#e2d6c2" />
    <rect x="16" y="12" width="188" height="16" rx="8" fill="#eef3fb" />
    {[0, 1, 2].map((i) => (
      <g key={i} className="hv-card" transform={`translate(${28 + i * 60} 38)`}>
        <rect width="50" height="78" rx="5" fill="#fbf6ea" stroke="#e2d6c2" />
        <rect
          x="6"
          y="6"
          width="38"
          height="30"
          rx="3"
          fill={["#f2a7b6", "#a3c46f", "#7aa2d6"][i]}
          opacity=".55"
        />
        <rect className="hv-line" x="6" y="44" width="34" height="4" rx="2" fill="#c9bfad" />
        <rect className="hv-line" x="6" y="52" width="26" height="4" rx="2" fill="#c9bfad" />
        <rect className="hv-line" x="6" y="60" width="30" height="4" rx="2" fill="#c9bfad" />
      </g>
    ))}
    <g className="hv-spark" transform="translate(190 34)">
      <path d="M0-9 2-2 9 0 2 2 0 9-2 2-9 0-2-2z" fill="#f6c177" />
    </g>
  </svg>
);

/** The platform: connectors, folders and an EN / 日本語 switch. */
const PlatformVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <rect x="12" y="10" width="196" height="120" rx="8" fill="#fff" stroke="#e2d6c2" />
    <circle cx="24" cy="20" r="3" fill="#f2a7b6" />
    <circle cx="34" cy="20" r="3" fill="#f6c177" />
    <circle cx="44" cy="20" r="3" fill="#a3c46f" />
    <rect x="12" y="30" width="44" height="100" fill="#f4efe5" />
    {[44, 58, 72, 86].map((y) => (
      <rect key={y} x="20" y={y} width="28" height="5" rx="2.5" fill="#d8ccb6" />
    ))}
    <g className="hv-toggle" transform="translate(138 38)">
      <rect width="60" height="16" rx="8" fill="#f4efe5" stroke="#d8ccb6" />
      <rect className="hv-toggle-knob" x="2" y="2" width="28" height="12" rx="6" fill="#f2a7b6" />
      <text x="16" y="11" textAnchor="middle" fontSize="7" fill="#2b2129" fontFamily="sans-serif">
        EN
      </text>
      <text x="45" y="11" textAnchor="middle" fontSize="7" fill="#2b2129" fontFamily="sans-serif">
        日本語
      </text>
    </g>
    {["S3", "SFTP"].map((label, i) => (
      <g key={label} transform={`translate(${66 + i * 46} 62)`}>
        <rect width="40" height="22" rx="5" fill="#eef3fb" stroke="#7aa2d6" />
        <text
          x="20"
          y="14.5"
          textAnchor="middle"
          fontSize="8"
          fill="#2f5a8f"
          fontFamily="sans-serif"
        >
          {label}
        </text>
      </g>
    ))}
    <path
      className="hv-sync"
      d="M106 73h6"
      stroke="#7aa2d6"
      strokeWidth="2"
      strokeDasharray="2 2"
    />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${66 + i * 44} 96)`}>
        <path d="M0 4h12l3 3h21v17H0z" fill="#f6c177" opacity=".85" />
      </g>
    ))}
  </svg>
);

const QA_LINES = [
  "extraction",
  "schema mapping",
  "table editing",
  "category estimation",
  "data sync",
];

/** A test run turning green, line by line. */
const QaVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <rect x="12" y="10" width="196" height="120" rx="8" fill="#1d171c" />
    <text x="24" y="28" fontFamily="ui-monospace, monospace" fontSize="8" fill="#9a8f95">
      $ npx playwright test
    </text>
    {QA_LINES.map((line, i) => (
      <g key={line} className="hv-test" transform={`translate(24 ${46 + i * 15})`}>
        <text fontFamily="ui-monospace, monospace" fontSize="8.5" fill="#a3c46f">
          ✓
        </text>
        <text x="12" fontFamily="ui-monospace, monospace" fontSize="8" fill="#fbf6ea">
          {line}
        </text>
        <text x="124" fontFamily="ui-monospace, monospace" fontSize="6.5" fill="#9a8f95">
          dev · stg · prod
        </text>
      </g>
    ))}
  </svg>
);

/** This website, in a tiny browser, with a robot keeping an eye on it. */
const NowVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <rect x="12" y="14" width="150" height="104" rx="8" fill="#2b2129" />
    <rect x="12" y="14" width="150" height="14" rx="7" fill="#3a2d37" />
    <circle cx="24" cy="21" r="2.5" fill="#f2a7b6" />
    <circle cx="32" cy="21" r="2.5" fill="#f6c177" />
    <circle cx="40" cy="21" r="2.5" fill="#a3c46f" />
    <g transform="translate(68 44) rotate(-35)">
      <rect x="-1" y="-24" width="2.4" height="48" rx="1.2" fill="#c2956e" />
      <circle cx="0" cy="-12" r="8" fill="#f2a7b6" />
      <circle cx="0" cy="2" r="8" fill="#fbf6ea" />
      <circle cx="0" cy="16" r="8" fill="#a3c46f" />
    </g>
    <rect x="94" y="58" width="56" height="5" rx="2.5" fill="#fbf6ea" opacity=".85" />
    <rect x="94" y="68" width="40" height="4" rx="2" fill="#fbf6ea" opacity=".5" />
    <g className="hv-robot" transform="translate(186 92)">
      <line x1="0" y1="-26" x2="0" y2="-18" stroke="#5a4a45" strokeWidth="2" />
      <circle cx="0" cy="-28" r="3" fill="#dd8e58" />
      <rect
        x="-16"
        y="-18"
        width="32"
        height="26"
        rx="7"
        fill="#c9d6dc"
        stroke="#5a4a45"
        strokeWidth="1.5"
      />
      <circle className="hv-eye" cx="-6" cy="-6" r="3" fill="#2b2129" />
      <circle className="hv-eye" cx="6" cy="-6" r="3" fill="#2b2129" />
      <path
        d="M-5 2q5 4 10 0"
        stroke="#2b2129"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="-12"
        y="10"
        width="24"
        height="18"
        rx="4"
        fill="#c9d6dc"
        stroke="#5a4a45"
        strokeWidth="1.5"
      />
      <text y="23" textAnchor="middle" fontSize="9" fill="#5a8a3a">
        ✓
      </text>
    </g>
  </svg>
);

const VISUALS: Record<ChapterId, (alt: string) => React.ReactNode> = {
  hello: () => <HelloVisual />,
  bootcamp: (alt) => <BootcampVisual alt={alt} />,
  lazuli: () => <LazuliVisual />,
  platform: () => <PlatformVisual />,
  qa: () => <QaVisual />,
  now: () => <NowVisual />,
};

/** Merged PRs per year at Lazuli, as dango-colored bars. */
const PrChart = ({ title, note }: { title: string; note: string }) => {
  const max = Math.max(...PRS_PER_YEAR.map((y) => y.prs));
  return (
    <figure className="ht-chart">
      <figcaption className="font-bodyRegularItalic text-sm text-creme">{title}</figcaption>
      <div className="ht-bars">
        {PRS_PER_YEAR.map(({ year, prs }, i) => (
          <div key={year} className="ht-bar-row">
            <span className="ht-bar-year">{year}</span>
            <span className="ht-bar-track">
              <span
                className="ht-bar"
                style={{
                  width: `${(prs / max) * 100}%`,
                  background: ["#f2a7b6", "#e9e2d4", "#a3c46f", "#f6c177"][i],
                }}
              />
            </span>
            <span className="ht-bar-value">
              {prs}
              {i === PRS_PER_YEAR.length - 1 && <span className="ht-bar-note"> ({note})</span>}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
};

/**
 * "The commit history so far": her path into programming as a git-style
 * timeline, each chapter with a little picture. The line draws itself and
 * each picture plays once as it scrolls into view.
 */
const HistoryTimeline = () => {
  const t = useT();
  const h = t.story.history;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const el = root.current!;

      // The thread is stitched down the rail as you scroll, needle first.
      const needle = el.querySelector<HTMLElement>(".ht-needle")!;
      gsap.fromTo(
        ".ht-rail-fill",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: {
            trigger: ".ht-list",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
            onUpdate: (self) => gsap.set(needle, { top: `${self.progress * 100}%` }),
          },
        },
      );

      gsap.from(".ht-stat", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: ".ht-stats", start: "top 85%" },
      });
      gsap.from(".ht-bar", {
        scaleX: 0,
        transformOrigin: "0 50%",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ht-chart", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".ht-chapter", el).forEach((chapter) => {
        const id = chapter.dataset.id;
        const q = gsap.utils.selector(chapter);
        const tl = gsap.timeline({ scrollTrigger: { trigger: chapter, start: "top 78%" } });
        tl.from(q(".ht-dot"), { scale: 0, duration: 0.45, ease: "back.out(3)" })
          .from(q(".ht-text"), { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "<0.1")
          .from(
            q(".ht-visual"),
            { y: 40, rotation: 4, opacity: 0, duration: 0.7, ease: "back.out(1.6)" },
            "<0.1",
          );

        // Each picture does its own little thing.
        if (id === "hello") {
          tl.fromTo(
            q(".hv-typed"),
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "steps(26)" },
          ).from(q(".hv-output"), { opacity: 0, duration: 0.2 });
          gsap.to(q(".hv-caret"), {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            ease: "steps(1)",
          });
        } else if (id === "bootcamp") {
          tl.from(q(".hv-thumb"), {
            y: 20,
            scale: 0.6,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
          });
        } else if (id === "lazuli") {
          tl.from(q(".hv-card"), {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(2)",
          })
            .from(q(".hv-line"), {
              scaleX: 0,
              transformOrigin: "0 50%",
              duration: 0.3,
              stagger: 0.05,
            })
            .from(
              q(".hv-spark"),
              { scale: 0, rotation: -90, duration: 0.5, ease: "back.out(3)" },
              "<",
            );
        } else if (id === "platform") {
          tl.to(q(".hv-toggle-knob"), {
            attr: { x: 30 },
            duration: 0.4,
            ease: "power2.inOut",
            delay: 0.3,
          }).to(q(".hv-toggle-knob"), {
            attr: { x: 2 },
            duration: 0.4,
            ease: "power2.inOut",
            delay: 0.6,
          });
        } else if (id === "qa") {
          tl.from(q(".hv-test"), { opacity: 0, x: -10, duration: 0.25, stagger: 0.25 });
        } else if (id === "now") {
          tl.from(q(".hv-robot"), { y: 30, opacity: 0, duration: 0.6, ease: "back.out(2)" });
          gsap.to(q(".hv-eye"), {
            scaleY: 0.1,
            transformOrigin: "50% 50%",
            repeat: -1,
            repeatDelay: 3,
            duration: 0.08,
            yoyo: true,
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="history">
      <p className="text-center font-bodyRegularItalic text-lg text-white">{h.lead}</p>

      <div className="ht-summary">
        <dl className="ht-stats">
          {h.stats.map(({ value, label }) => (
            <div key={label} className="ht-stat">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-audreyMedium text-4xl text-white">{value}</span>
                <span className="mt-1 block font-bodyRegular text-xs uppercase tracking-widest text-creme">
                  {label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <PrChart title={h.chartTitle} note={h.chartNote} />
      </div>

      <div className="ht-list-wrap">
        {/* Cross-stitch thread sewing the chapters together, with the needle at its tip */}
        <span className="ht-rail" aria-hidden="true">
          <span className="ht-rail-fill" />
          <span className="ht-needle">
            <svg viewBox="0 0 24 64">
              <path
                d="M12 0c-1.6 0-2.4 1.4-2.4 3v44l2.4 17 2.4-17V3C14.4 1.4 13.6 0 12 0z"
                fill="#c9cdd2"
              />
              <ellipse cx="12" cy="6" rx="1" ry="2.6" fill="#2b2129" />
              <path d="M12 6c-8 10 8 18-2 30" stroke="#f2a7b6" strokeWidth="1.6" fill="none" />
            </svg>
          </span>
        </span>
        <ol className="ht-list">
          {h.chapters.map((c, i) => (
            <li key={c.id} className={`ht-chapter ${i % 2 ? "is-right" : ""}`} data-id={c.id}>
              <span className="ht-dot" aria-hidden="true">
                <StitchMotif color={DOTS[c.id] ?? "#f2a7b6"} />
              </span>
              <div className="ht-text">
                <p className="font-bodyRegular text-xs uppercase tracking-widest text-coffee">
                  {c.date}
                </p>
                <h3 className="mt-1 font-audreyMedium text-2xl uppercase tracking-wide text-white">
                  {c.title}
                </h3>
                <p className="mt-2 font-bodyLight text-lg leading-relaxed text-white">{c.text}</p>
                {c.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-mint/70 px-3 py-0.5 font-bodyRegular text-sm text-creme"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="ht-visual" aria-hidden={c.id !== "bootcamp"}>
                {VISUALS[c.id]?.(t.story.photos.classmates)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HistoryTimeline;
