import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

// One dango ball per section, in the colors of the dango logo.
export const SECTIONS = [
  { id: "hi", label: "Hi", color: "#ff99ad" },
  { id: "lazuli", label: "Lazuli", color: "#dae3ea" },
  { id: "about", label: "Story", color: "#8cc63e" },
  { id: "projects", label: "Projects", color: "#f6c177" },
  { id: "contact", label: "Contact", color: "#c88e95" },
];

/**
 * The site's navigation: a skewer that fills as you scroll, with a dango ball
 * per section. A ball plumps up with color once you reach its section, and
 * clicking it takes you there. Vertical on the right on desktop, across the
 * top on phones.
 */
const DangoNav = () => {
  const nav = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The skewer grows with overall page progress: sideways on phones, downward on desktop.
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", phone: "(max-width: 767px)" }, (ctx) => {
        const prop = ctx.conditions?.desktop ? "scaleY" : "scaleX";
        gsap.fromTo(
          ".skewer-fill",
          { [prop]: 0 },
          {
            [prop]: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3, refreshPriority: -1 },
          },
        );
      });

      SECTIONS.forEach(({ id }) => {
        const ball = nav.current?.querySelector<HTMLElement>(`[data-ball="${id}"]`);
        const fill = ball?.querySelector(".ball-fill");
        const target = document.getElementById(id);
        if (!ball || !fill || !target) return;

        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          // Measure after the pinned Lazuli section has added its scroll space.
          refreshPriority: -1,
          onToggle: ({ isActive }) => {
            ball.toggleAttribute("aria-current", isActive);
            gsap.to(ball, {
              scale: isActive ? 1.25 : 1,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
          },
          onEnter: () => plump(fill),
          onEnterBack: () => plump(fill),
          onLeaveBack: () => {
            // Scrolling back above a section empties its ball again.
            if (id !== SECTIONS[0]!.id)
              gsap.to(fill, { scale: 0, duration: 0.3, ease: "power2.in" });
          },
        });
      });

      function plump(fill: Element) {
        gsap.to(fill, { scale: 1, duration: 0.7, ease: "elastic.out(1.1, 0.45)" });
      }
    },
    { scope: nav },
  );

  const go = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav ref={nav} aria-label="Sections" className="dango-nav">
      <div className="skewer" aria-hidden="true">
        <div className="skewer-fill" />
      </div>
      <ol className="dango-balls">
        {SECTIONS.map(({ id, label, color }) => (
          <li key={id}>
            <button
              type="button"
              data-ball={id}
              className="dango-ball"
              style={{ "--ball": color } as React.CSSProperties}
              onClick={() => go(id)}
            >
              <span className="ball-fill" aria-hidden="true" />
              <span className="ball-label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
      <Link href="/blog" className="dango-blog">
        blog
      </Link>
    </nav>
  );
};

export default DangoNav;
