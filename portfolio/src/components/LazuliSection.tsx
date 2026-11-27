import { useRef, useSyncExternalStore } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";

const START = { year: 2023, month: 6 }; // June 2023

/** "3 years 6 months" since joining, worked out on the visitor's device. */
function timeAtLazuli(now = new Date()) {
  // Counts the starting month too, the way LinkedIn does (Jun–Nov = 6 months).
  const months = (now.getFullYear() - START.year) * 12 + (now.getMonth() + 1 - START.month) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const y = `${years} year${years === 1 ? "" : "s"}`;
  return rest ? `${y} ${rest} month${rest === 1 ? "" : "s"}` : y;
}

const noop = () => () => {};

// What she does, as three dango on a skewer.
const ROLES = [
  {
    color: "#f2a7b6",
    shades: ["#fde4ea", "#efa3b3", "#b86a7c"],
    title: "QA & end-to-end testing",
    tag: "mainly, these days",
    text: "I built Lazuli's end-to-end test suite from scratch and I own it: about 390 Playwright tests across three products, run on dev, staging and production in Chromium, Firefox and WebKit.",
  },
  {
    color: "#e9e2d4",
    shades: ["#ffffff", "#ebe4d6", "#a99f8c"],
    title: "CI & reliability",
    tag: "keeping it green",
    text: "GitHub Actions checks so a broken test can't be merged, every regression test linked to its Jira ticket, and a fix for a hidden race condition that made test runs fail at random.",
  },
  {
    color: "#a3c46f",
    shades: ["#e3f0c9", "#9cbd63", "#5b7a33"],
    title: "Frontend",
    tag: "at heart",
    text: "I still think like a frontend developer. When the product's UI was redesigned, I moved the whole suite over and kept it passing.",
  },
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
  "REST APIs",
  "Claude Code",
];

// Three dango snug against each other on a bamboo skewer, one per role.
const R = 56;
const BALLS = [{ cx: 150 }, { cx: 150 + 2 * R - 4 }, { cx: 150 + 4 * R - 8 }];

const LazuliSection = () => {
  const root = useRef<HTMLElement>(null);
  // Server render says "3+ years"; the browser fills in the exact time.
  const tenure = useSyncExternalStore(
    noop,
    () => timeAtLazuli(),
    () => "3+ years",
  );

  /**
   * A dango drops onto the skewer, squashes as it lands, slides along it and
   * bumps into its neighbour, which jiggles.
   */
  const landBall = (tl: gsap.core.Timeline, i: number, at: number) => {
    const ball = `.lz-ball-${i}`;
    const { cx } = BALLS[i]!;
    const base = `${cx} ${70 + R}`; // squash from the bottom of the ball
    tl.fromTo(
      ball,
      { y: -170, x: 30, opacity: 0 },
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
      const mid = `${BALLS[i - 1]!.cx} 70`;
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

  /** Count each stat up from zero (added to a timeline so it can be scrubbed). */
  const countUp = (tl: gsap.core.Timeline, at: number) => {
    gsap.utils.toArray<HTMLElement>(".lz-stat-num").forEach((el, i) => {
      const { value } = STATS[i]!;
      const n = { v: 0 };
      tl.fromTo(
        n,
        { v: 0 },
        {
          v: value,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(n.v));
          },
        },
        at + i * 0.08,
      );
    });
  };

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();

      // Laptops and up: pin the section and let the skewer play out as you scroll.
      mm.add("(min-width: 976px) and (min-height: 760px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.from(".lz-intro > *", { y: 40, opacity: 0, stagger: 0.12, duration: 0.6 }).from(
          ".lz-stick",
          { drawSVG: "0%", duration: 1, ease: "none" },
          0.2,
        );
        countUp(tl, 0.5);
        ROLES.forEach((_, i) => {
          landBall(tl, i, 0.6 + i * 0.8);
          tl.from(
            `.lz-card-${i}`,
            { y: 40, opacity: 0, duration: 0.5, ease: "back.out(1.6)" },
            0.9 + i * 0.8,
          );
        });
        tl.to({}, { duration: 0.4 }); // a beat to read before un-pinning
      });

      // Phones and shorter screens: no pinning. Dango pop on, then each card as it arrives.
      mm.add("(max-width: 975px), (max-height: 759px)", () => {
        const drop = gsap.timeline({
          scrollTrigger: { trigger: ".lz-skewer", start: "top 85%" },
        });
        ROLES.forEach((_, i) => landBall(drop, i, i * 0.55));
        const stats = gsap.timeline({
          scrollTrigger: { trigger: ".lz-stats", start: "top 85%" },
        });
        countUp(stats, 0);
        gsap.utils.toArray<HTMLElement>(".lz-card").forEach((card) => {
          gsap.from(card, {
            y: 50,
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: card, start: "top 85%" },
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
        className="flex min-h-screen w-screen items-center bg-gradient-to-b from-charcoal to-[#3a2d37] px-6 py-20 md:pl-20 md:pr-36"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="lz-intro">
            <p className="font-bodyRegularItalic text-creme">these days, I&apos;m a</p>
            <h2 className="mt-2 font-heading text-3xl uppercase tracking-widest text-white sm:text-4xl">
              Software Engineer
              <br />
              at Lazuli
            </h2>
            <p className="mt-4 font-bodyRegular text-sm uppercase tracking-widest text-coffee">
              June 2023 – now · <span className="text-orange">{tenure}</span> · Tokyo, hybrid
            </p>
            <p className="mt-5 font-bodyRegularItalic text-xl text-creme">
              mostly QA, with a frontend heart
            </p>
            <p className="mt-4 max-w-lg font-bodyLight leading-relaxed text-white">
              Lazuli is a Japanese SaaS startup. Its{" "}
              <strong className="font-bodyRegular">Product Data Platform</strong> helps companies
              collect, clean and put their product data to work.
            </p>

            <dl className="lz-stats mt-7 grid max-w-lg grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-5">
              {STATS.map(({ value, prefix, suffix, label }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-audreyMedium text-2xl text-white">
                      {/* The heading font has no "~", so the extras use the body font */}
                      {prefix && <span className="font-bodyRegular">{prefix}</span>}
                      <span className="lz-stat-num">{value}</span>
                      {suffix && <span className="font-bodyRegular">{suffix}</span>}
                    </span>
                    <span className="block font-bodyRegular text-xs uppercase leading-tight tracking-wider text-coffee">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex max-w-lg flex-wrap gap-2" aria-label="Tools I use">
              {TOOLS.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-mint/70 px-3 py-0.5 font-bodyRegular text-sm text-creme"
                >
                  {tool}
                </li>
              ))}
            </ul>

            <a
              href="https://lazuli.ninja/"
              className="mt-6 inline-block font-audreyMedium uppercase tracking-widest text-creme decoration-orange underline-offset-4 hover:underline"
            >
              lazuli.ninja ↗
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {/* The skewer, drawn on scroll, with a dango per role */}
            <svg viewBox="0 0 520 150" className="lz-skewer -mb-1 w-full" aria-hidden="true">
              <defs>
                {/* Bamboo skewer: rounded, lit from above */}
                <linearGradient
                  id="lz-bamboo"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="66"
                  x2="0"
                  y2="75"
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
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="lz-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.2" />
                </filter>
              </defs>

              <g transform="rotate(-4 260 70)">
                {/* Shadow on the "table" */}
                <ellipse
                  cx="262"
                  cy="136"
                  rx="190"
                  ry="8"
                  fill="#000"
                  opacity=".35"
                  filter="url(#lz-blur)"
                />

                <line
                  className="lz-stick"
                  x1="18"
                  y1="70"
                  x2="504"
                  y2="70"
                  stroke="url(#lz-bamboo)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* A thread of grain along the stick */}
                <line
                  x1="24"
                  y1="68.5"
                  x2="498"
                  y2="68.5"
                  stroke="#fff6dc"
                  strokeWidth=".8"
                  opacity=".45"
                />

                {BALLS.map(({ cx }, i) => (
                  <g key={cx} className={`lz-ball lz-ball-${i}`} filter="url(#lz-cast)">
                    <circle cx={cx} cy="70" r={R} fill={`url(#lz-mochi-${i})`} />
                    <circle cx={cx} cy="70" r={R} fill="url(#lz-occlusion)" />
                    <circle cx={cx} cy="70" r={R} fill="#fff" filter="url(#lz-powder)" />
                    {/* Soft, broad highlight and a small bright glint */}
                    <ellipse
                      cx={cx - 18}
                      cy="44"
                      rx="20"
                      ry="11"
                      transform={`rotate(-30 ${cx - 18} 44)`}
                      fill="#fff"
                      opacity=".45"
                      filter="url(#lz-blur)"
                    />
                    <ellipse
                      cx={cx - 22}
                      cy="40"
                      rx="6"
                      ry="3.2"
                      transform={`rotate(-30 ${cx - 22} 40)`}
                      fill="#fff"
                      opacity=".7"
                      filter="url(#lz-blur-sm)"
                    />
                  </g>
                ))}
              </g>
            </svg>

            {ROLES.map((role, i) => (
              <article
                key={role.title}
                className={`lz-card lz-card-${i} flex gap-4 rounded-3xl border-2 bg-charcoal/80 p-5 backdrop-blur`}
                style={{ borderColor: role.color }}
              >
                <span
                  aria-hidden="true"
                  className="mt-1 h-6 w-6 shrink-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 36% 30%, ${role.shades[0]}, ${role.shades[1]} 45%, ${role.shades[2]})`,
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.35)",
                  }}
                />
                <div>
                  <p
                    className="font-bodyRegular text-xs uppercase tracking-widest"
                    style={{ color: role.color }}
                  >
                    {role.tag}
                  </p>
                  <h3 className="mt-1 font-audreyMedium text-xl uppercase tracking-wide text-white">
                    {role.title}
                  </h3>
                  <p className="mt-1 font-bodyLight leading-relaxed text-creme">{role.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LazuliSection;
