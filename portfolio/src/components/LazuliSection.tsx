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

// The three things she does, as three dango on a skewer.
const ROLES = [
  {
    color: "#ff99ad",
    title: "Frontend",
    tag: "mainly",
    text: "Most of my work: building the web apps for Lazuli's products.",
  },
  {
    color: "#dae3ea",
    title: "QA & end-to-end testing",
    tag: "spearheading",
    text: "Leading QA with end-to-end tests across all of Lazuli's products.",
  },
  {
    color: "#8cc63e",
    title: "Backend",
    tag: "exploring",
    text: "Toying with the backend too, and getting to know the rest of the stack.",
  },
];

// Three dango along a gently tilted skewer, one per role.
const BALLS = [{ cx: 110 }, { cx: 260 }, { cx: 410 }];

const LazuliSection = () => {
  const root = useRef<HTMLElement>(null);
  // Server render says "3+ years"; the browser fills in the exact time.
  const tenure = useSyncExternalStore(
    noop,
    () => timeAtLazuli(),
    () => "3+ years",
  );

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();

      // Laptops and up: pin the section and let the skewer play out as you scroll.
      mm.add("(min-width: 976px) and (min-height: 640px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.from(".lz-intro > *", { y: 40, opacity: 0, stagger: 0.15, duration: 0.6 }).from(
          ".lz-stick",
          { drawSVG: "0%", duration: 1, ease: "none" },
          0.2,
        );
        ROLES.forEach((_, i) => {
          tl.from(
            `.lz-ball-${i}`,
            { scale: 0, y: -40, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)" },
            0.6 + i * 0.7,
          ).from(
            `.lz-card-${i}`,
            { y: 40, opacity: 0, duration: 0.5, ease: "back.out(1.6)" },
            0.7 + i * 0.7,
          );
        });
        tl.to({}, { duration: 0.4 }); // a beat to read before un-pinning
      });

      // Phones and short screens: no pinning. Dango pop on, then each card as it arrives.
      mm.add("(max-width: 975px), (max-height: 639px)", () => {
        gsap.from(".lz-ball", {
          scale: 0,
          y: -30,
          transformOrigin: "50% 50%",
          duration: 0.8,
          ease: "back.out(3)",
          stagger: 0.15,
          scrollTrigger: { trigger: ".lz-skewer", start: "top 85%" },
        });
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
            <p className="mt-6 max-w-lg font-bodyLight text-lg leading-relaxed text-white">
              Lazuli is a Japanese SaaS startup with a global vision. Its{" "}
              <strong className="font-bodyRegular">Lazuli Product Data Platform</strong> helps
              companies spend less on collecting and managing product data, and put that data to
              work for analysis, search and recommendations.
            </p>
            <a
              href="https://lazuli.ninja/"
              className="mt-6 inline-block font-audreyMedium uppercase tracking-widest text-creme decoration-orange underline-offset-4 hover:underline"
            >
              lazuli.ninja ↗
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {/* The skewer, drawn on scroll, with a dango per role */}
            <svg viewBox="0 0 520 120" className="lz-skewer -mb-1 w-full" aria-hidden="true">
              <g transform="rotate(-4 260 60)">
                <line
                  className="lz-stick"
                  x1="12"
                  y1="60"
                  x2="508"
                  y2="60"
                  stroke="#f29a2e"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {BALLS.map(({ cx }, i) => (
                  <g key={cx} className={`lz-ball lz-ball-${i}`}>
                    <ellipse cx={cx} cy="60" rx="52" ry="46" fill={ROLES[i]!.color} />
                    <ellipse
                      cx={cx - 18}
                      cy="40"
                      rx="12"
                      ry="7"
                      transform={`rotate(-25 ${cx - 18} 40)`}
                      fill="#fff"
                      opacity=".6"
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
                    background: `radial-gradient(circle at 35% 30%, #fff 0 12%, ${role.color} 45%)`,
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
