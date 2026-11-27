import { useRef, useSyncExternalStore } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import BeyondTests from "./BeyondTests";
import { timeAtLazuli, useLocale, useT } from "../i18n";

const noop = () => () => {};

// Her three years at Lazuli, one dango each, left to right along the skewer.
// (The words for each year live in src/i18n.)
const ROLES = [
  { color: "#f2a7b6", shades: ["#fde4ea", "#efa3b3", "#b86a7c"] },
  { color: "#e9e2d4", shades: ["#ffffff", "#ebe4d6", "#a99f8c"] },
  { color: "#a3c46f", shades: ["#e3f0c9", "#9cbd63", "#5b7a33"], now: true },
];

// The headline numbers; they count up as the section comes in.
const STATS = [
  { value: 390, prefix: "~", suffix: "", label: "tests" },
  { value: 3, prefix: "", suffix: "", label: "products" },
  { value: 170, prefix: "", suffix: "+", label: "PRs merged" },
  { value: 100, prefix: "", suffix: "+", label: "tickets covered" },
  { value: 22, prefix: "", suffix: "", label: "bugs filed" },
];

const TOOLS = [
  "Playwright",
  "TypeScript",
  "Node.js",
  "GitHub Actions",
  "Biome",
  "GritQL",
  "REST APIs",
  "Bash",
  "Claude Code (skills, MCP)",
];

// The timeline drawing (SVG units). Three dango snug on a bamboo skewer in the
// middle; a string runs from each down to its year's card below.
const VB_W = 1200;
const VB_H = 300;
const CY = 110; // skewer height
const R = 62;
const BALLS = [{ cx: 600 - 2 * R + 6 }, { cx: 600 }, { cx: 600 + 2 * R - 6 }];
// Centres of the three card columns (grid of 3 with gaps, max-w-6xl), in SVG units.
const COLS = [189, 600, 1011];

const LazuliSection = () => {
  const root = useRef<HTMLElement>(null);
  // Server render says "3+ years"; the browser fills in the exact time.
  const t = useT();
  const locale = useLocale();
  const tenure = useSyncExternalStore(
    noop,
    () => timeAtLazuli(locale),
    () => t.lazuli.tenureFallback,
  );

  /**
   * A dango drops onto the skewer, squashes as it lands, slides along it and
   * bumps into its neighbour, which jiggles.
   */
  const landBall = (tl: gsap.core.Timeline, i: number, at: number) => {
    const ball = `.lz-ball-${i}`;
    const { cx } = BALLS[i]!;
    const base = `${cx} ${CY + R}`; // squash from the bottom of the ball
    tl.fromTo(
      ball,
      { y: -190, x: 34, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, ease: "power2.in" },
      at,
    )
      .to(
        ball,
        { scaleX: 1.16, scaleY: 0.8, svgOrigin: base, duration: 0.07, ease: "power1.out" },
        at + 0.32,
      )
      .to(
        ball,
        { scaleX: 1, scaleY: 1, svgOrigin: base, duration: 0.45, ease: "elastic.out(1.3, 0.35)" },
        at + 0.39,
      )
      .to(ball, { x: 0, duration: 0.22, ease: "power3.in" }, at + 0.39);
    if (i > 0) {
      const prev = `.lz-ball-${i - 1}`;
      const mid = `${BALLS[i - 1]!.cx} ${CY}`;
      tl.to(
        prev,
        { x: -6, scaleX: 0.92, scaleY: 1.06, svgOrigin: mid, duration: 0.07 },
        at + 0.61,
      ).to(
        prev,
        {
          x: 0,
          scaleX: 1,
          scaleY: 1,
          svgOrigin: mid,
          duration: 0.5,
          ease: "elastic.out(1.2, 0.3)",
        },
        at + 0.68,
      );
    }
  };

  /** Count each stat up from zero. */
  const countUp = (tl: gsap.core.Timeline, at: number) => {
    gsap.utils.toArray<HTMLElement>(".lz-stat-num").forEach((el, i) => {
      const { value } = STATS[i]!;
      const n = { v: 0 };
      tl.fromTo(
        n,
        { v: 0 },
        {
          v: value,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(n.v));
          },
        },
        at + i * 0.1,
      );
    });
  };

  useGSAP(
    () => {
      if (reducedMotion()) return;

      // The intro rises in and the numbers count up as it arrives (all sizes).
      const intro = gsap.timeline({
        scrollTrigger: { trigger: ".lz-intro", start: "top 75%" },
      });
      intro.from(".lz-intro-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      });
      countUp(intro, 0.3);

      const mm = gsap.matchMedia();

      // Laptops and up: pin the timeline and play the years out as you scroll.
      mm.add("(min-width: 976px) and (min-height: 780px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".lz-timeline",
            start: "center center",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.from(".lz-stick", { drawSVG: "50% 50%", duration: 0.8, ease: "none" }, 0);
        ROLES.forEach((_, i) => {
          const at = 0.5 + i * 0.9;
          landBall(tl, i, at);
          tl.from(`.lz-string-${i}`, { drawSVG: "0%", duration: 0.4, ease: "none" }, at + 0.5).from(
            `.lz-card-${i}`,
            { y: 50, opacity: 0, duration: 0.5, ease: "back.out(1.6)" },
            at + 0.7,
          );
        });
        tl.to({}, { duration: 0.5 }); // a beat to read before un-pinning
      });

      // Phones and shorter screens: no pinning. Dango pop on, then each card as it arrives.
      mm.add("(max-width: 975px), (max-height: 779px)", () => {
        const drop = gsap.timeline({
          scrollTrigger: { trigger: ".lz-skewer", start: "top 85%" },
        });
        drop.from(".lz-stick", { drawSVG: "50% 50%", duration: 0.5, ease: "none" }, 0);
        ROLES.forEach((_, i) => landBall(drop, i, 0.2 + i * 0.55));
        gsap.utils.toArray<HTMLElement>(".lz-card").forEach((card) => {
          gsap.from(card, {
            y: 50,
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    // The outer div is what the nav watches: it grows to include the pinned scroll distance.
    <div id="lazuli">
      <section
        ref={root}
        className="w-screen bg-gradient-to-b from-charcoal to-[#3a2d37] px-6 pb-16 pt-32 md:pl-20 md:pr-36"
      >
        {/* Part 1: who, where, and the numbers */}
        <div className="lz-intro mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <p className="lz-intro-item font-bodyRegularItalic text-lg text-creme">
              {t.lazuli.lead}
            </p>
            <h2 className="lz-intro-item mt-2 overflow-visible font-heading text-4xl uppercase leading-tight tracking-widest text-white sm:text-5xl">
              {t.lazuli.titleLine1}
              <br />
              {t.lazuli.titleLine2}
            </h2>
            <p className="lz-intro-item mt-5 font-bodyRegular text-sm uppercase tracking-widest text-coffee">
              {t.lazuli.since} · <span className="text-orange">{tenure}</span> · {t.lazuli.place}
            </p>
            <p className="lz-intro-item mt-8 font-bodyRegularItalic text-2xl text-creme">
              {t.lazuli.tagline}
            </p>
            <p className="lz-intro-item mt-5 max-w-xl font-bodyLight text-lg leading-relaxed text-white">
              {t.lazuli.blurbBefore}{" "}
              <strong className="font-bodyRegular">{t.lazuli.blurbProduct}</strong>{" "}
              {t.lazuli.blurbAfter}
            </p>
            <a
              href="https://lazuli.ninja/"
              className="lz-intro-item mt-8 inline-block font-audreyMedium uppercase tracking-widest text-creme decoration-orange underline-offset-4 hover:underline"
            >
              lazuli.ninja ↗
            </a>
          </div>

          <div>
            <dl className="lz-stats grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {STATS.map(({ value, prefix, suffix }, i) => (
                <div key={STATS[i]!.label} className="lz-intro-item">
                  <dt className="sr-only">{t.lazuli.stats[i]}</dt>
                  <dd>
                    <span className="block font-audreyMedium text-4xl text-white">
                      {/* The heading font has no "~", so the extras use the body font */}
                      {prefix && <span className="font-bodyRegular">{prefix}</span>}
                      <span className="lz-stat-num">{value}</span>
                      {suffix && <span className="font-bodyRegular">{suffix}</span>}
                    </span>
                    <span className="mt-1 block font-bodyRegular text-xs uppercase leading-tight tracking-widest text-coffee">
                      {t.lazuli.stats[i]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label={t.lazuli.toolsLabel}>
              {TOOLS.map((tool) => (
                <li
                  key={tool}
                  className="lz-intro-item rounded-full border border-mint/70 px-3 py-1 font-bodyRegular text-sm text-creme"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Part 2: the three years, one dango each */}
        <div className="lz-timeline mx-auto mt-24 max-w-6xl lg:mt-32">
          <p className="mb-2 text-center font-bodyRegularItalic text-lg text-creme">
            {t.lazuli.timeline}
          </p>
          <div className="overflow-hidden">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="lz-skewer -ml-[50%] block w-[200%] max-w-none lg:ml-0 lg:w-full"
              aria-hidden="true"
            >
              <defs>
                {/* Bamboo skewer: rounded, lit from above */}
                <linearGradient
                  id="lz-bamboo"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1={CY - 5}
                  x2="0"
                  y2={CY + 5}
                >
                  <stop offset="0" stopColor="#f3e0b4" />
                  <stop offset=".45" stopColor="#d9b373" />
                  <stop offset="1" stopColor="#9c7036" />
                </linearGradient>
                {/* Mochi body: soft light from the top left, rolling into shadow */}
                {ROLES.map((role, i) => (
                  <radialGradient key={i} id={`lz-mochi-${i}`} cx="38%" cy="30%" r="78%">
                    <stop offset="0" stopColor={role.shades[0]} />
                    <stop offset=".42" stopColor={role.shades[1]} />
                    <stop offset=".85" stopColor={role.shades[1]} stopOpacity=".95" />
                    <stop offset="1" stopColor={role.shades[2]} />
                  </radialGradient>
                ))}
                {/* Bottom-up occlusion so they sit heavy, like real mochi */}
                <linearGradient id="lz-occlusion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset=".45" stopColor="#000" stopOpacity="0" />
                  <stop offset="1" stopColor="#000" stopOpacity=".28" />
                </linearGradient>
                {/* Faint powdery surface texture */}
                <filter id="lz-powder" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="11" />
                  <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 -.32" />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
                {/* Each ball casts a soft shadow onto its neighbour */}
                <filter id="lz-cast" x="-20%" y="-20%" width="140%" height="150%">
                  <feDropShadow
                    dx="-3"
                    dy="4"
                    stdDeviation="4"
                    floodColor="#1a1218"
                    floodOpacity=".45"
                  />
                </filter>
                <filter id="lz-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="lz-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.4" />
                </filter>
              </defs>

              {/* Strings from each dango down to its year (wide screens only). They are
                  dashed, so they draw in through a mask (drawing a dashed path directly
                  would break the dashes). */}
              <g className="hidden lg:inline" fill="none" strokeLinecap="round">
                {BALLS.map(({ cx }, i) => {
                  const d = `M${cx} ${CY + R - 6} C ${cx} ${CY + R + 70}, ${COLS[i]} ${VB_H - 90}, ${COLS[i]} ${VB_H}`;
                  return (
                    <g key={i}>
                      <mask
                        id={`lz-string-mask-${i}`}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width={VB_W}
                        height={VB_H}
                      >
                        <path className={`lz-string-${i}`} d={d} stroke="#fff" strokeWidth="8" />
                      </mask>
                      <path
                        d={d}
                        mask={`url(#lz-string-mask-${i})`}
                        stroke={ROLES[i]!.color}
                        strokeOpacity=".6"
                        strokeWidth="2.2"
                        strokeDasharray="2 7"
                      />
                    </g>
                  );
                })}
              </g>

              <g transform={`rotate(-3 600 ${CY})`}>
                {/* Shadow under the skewer */}
                <ellipse
                  cx="600"
                  cy={CY + R + 16}
                  rx="230"
                  ry="10"
                  fill="#000"
                  opacity=".35"
                  filter="url(#lz-blur)"
                />

                <line
                  className="lz-stick"
                  x1="290"
                  y1={CY}
                  x2="910"
                  y2={CY}
                  stroke="url(#lz-bamboo)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* A thread of grain along the stick */}
                <line
                  x1="296"
                  y1={CY - 1.6}
                  x2="904"
                  y2={CY - 1.6}
                  stroke="#fff6dc"
                  strokeWidth=".9"
                  opacity=".45"
                />

                {BALLS.map(({ cx }, i) => (
                  <g key={cx} className={`lz-ball lz-ball-${i}`} filter="url(#lz-cast)">
                    <circle cx={cx} cy={CY} r={R} fill={`url(#lz-mochi-${i})`} />
                    <circle cx={cx} cy={CY} r={R} fill="url(#lz-occlusion)" />
                    <circle cx={cx} cy={CY} r={R} fill="#fff" filter="url(#lz-powder)" />
                    {/* Soft, broad highlight and a small bright glint */}
                    <ellipse
                      cx={cx - 20}
                      cy={CY - 28}
                      rx="22"
                      ry="12"
                      transform={`rotate(-30 ${cx - 20} ${CY - 28})`}
                      fill="#fff"
                      opacity=".45"
                      filter="url(#lz-blur)"
                    />
                    <ellipse
                      cx={cx - 24}
                      cy={CY - 32}
                      rx="6.5"
                      ry="3.5"
                      transform={`rotate(-30 ${cx - 24} ${CY - 32})`}
                      fill="#fff"
                      opacity=".7"
                      filter="url(#lz-blur-sm)"
                    />
                  </g>
                ))}
              </g>
            </svg>
          </div>

          <ol className="mt-6 grid gap-6 lg:mt-0 lg:grid-cols-3 lg:gap-8">
            {ROLES.map((role, i) => (
              <li
                key={t.lazuli.years[i]!.title}
                className={`lz-card lz-card-${i} rounded-3xl border-2 bg-charcoal/80 p-7 backdrop-blur`}
                style={{ borderColor: role.color }}
              >
                <p
                  className="flex items-center gap-2 font-bodyRegular text-xs uppercase tracking-widest"
                  style={{ color: role.color }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-4 w-4 shrink-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 36% 30%, ${role.shades[0]}, ${role.shades[1]} 45%, ${role.shades[2]})`,
                    }}
                  />
                  {t.lazuli.years[i]!.tag}
                  {"now" in role && (
                    <span className="rounded-full bg-[#a3c46f] px-2 py-px text-[0.65rem] tracking-wider text-charcoal">
                      {t.lazuli.now}
                    </span>
                  )}
                </p>
                <h3 className="mt-3 font-audreyMedium text-2xl uppercase leading-snug tracking-wide text-white">
                  {t.lazuli.years[i]!.title}
                </h3>
                <p className="mt-3 font-bodyLight text-lg leading-relaxed text-creme">
                  {t.lazuli.years[i]!.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <BeyondTests />
    </div>
  );
};

export default LazuliSection;
