import { useRef } from "react";
import Link from "next/link";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "../lib/gsap";
import Onigiri, { type OnigiriKind } from "./Onigiri";

// One onigiri per section.
export const SECTIONS: { id: string; label: string; kind: OnigiriKind }[] = [
  { id: "hi", label: "Hi", kind: "classic" },
  { id: "lazuli", label: "Lazuli", kind: "sesame" },
  { id: "about", label: "Story", kind: "ume" },
  { id: "projects", label: "Projects", kind: "salmon" },
  { id: "contact", label: "Contact", kind: "yaki" },
];

/** A few grains of rice tumble off when an onigiri is bitten. */
function crumbs(btn: HTMLElement) {
  if (reducedMotion()) return;
  for (let i = 0; i < 4; i++) {
    const grain = document.createElement("span");
    grain.className = "rice-crumb";
    btn.appendChild(grain);
    gsap.fromTo(
      grain,
      { x: gsap.utils.random(-4, 4), y: 0, rotation: gsap.utils.random(0, 180), opacity: 1 },
      {
        x: `+=${gsap.utils.random(-14, 14)}`,
        y: gsap.utils.random(18, 30),
        rotation: `+=${gsap.utils.random(90, 270)}`,
        opacity: 0,
        duration: gsap.utils.random(0.5, 0.8),
        ease: "power2.in",
        delay: i * 0.03,
        onComplete: () => grain.remove(),
      },
    );
  }
}

/**
 * The site's navigation: a column of onigiri, one per section. Each sits
 * grey and quiet until you reach its section, then warms up to full color with
 * a little hop; once you've scrolled past, it has a bite taken out of the top.
 * Click one to go there. Down the right on desktop, across the
 * top on phones.
 */
const OnigiriNav = () => {
  const nav = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      SECTIONS.forEach(({ id }, index) => {
        const btn = nav.current?.querySelector<HTMLElement>(`[data-section="${id}"]`);
        const target = document.getElementById(id);
        if (!btn || !target) return;

        const reached = (on: boolean) => {
          btn.classList.toggle("is-reached", on);
        };

        // Passing a section takes a bite out of its onigiri; coming back un-bites it.
        const biteParts = btn.querySelectorAll<SVGGElement>(".onigiri-bite");
        const bite = { s: 0 };
        const drawBite = () =>
          biteParts.forEach((g) =>
            g.setAttribute("transform", `translate(50 10) scale(${bite.s}) translate(-50 -10)`),
          );
        const setBitten = (on: boolean) => {
          btn.classList.toggle("is-bitten", on);
          if (reducedMotion()) {
            bite.s = on ? 1 : 0;
            drawBite();
            return;
          }
          gsap.to(bite, {
            s: on ? 1 : 0,
            duration: on ? 0.28 : 0.45,
            ease: on ? "back.out(2.2)" : "power2.inOut",
            onUpdate: drawBite,
            overwrite: true,
          });
          if (on) crumbs(btn);
        };

        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          // Measure after the pinned Lazuli section has added its scroll space.
          refreshPriority: -1,
          onToggle: ({ isActive }) => {
            btn.toggleAttribute("aria-current", isActive);
            if (reducedMotion()) return;
            gsap.to(btn.querySelector(".rice-icon"), {
              scale: isActive ? 1.3 : 1,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
            if (isActive) {
              gsap.fromTo(
                btn.querySelector(".rice-icon"),
                { y: 0 },
                { y: -6, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
              );
            }
          },
          onEnter: () => reached(true),
          onEnterBack: () => {
            reached(true);
            setBitten(false);
          },
          onLeave: () => setBitten(true),
          // Scrolling back above a section makes its onigiri go quiet again.
          onLeaveBack: () => index > 0 && reached(false),
        });
      });
    },
    { scope: nav },
  );

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <nav ref={nav} aria-label="Sections" className="rice-nav">
      <ol className="rice-list">
        {SECTIONS.map(({ id, label, kind }, i) => (
          <li key={id}>
            <button
              type="button"
              data-section={id}
              className={i === 0 ? "rice-btn is-reached" : "rice-btn"}
              onClick={() => go(id)}
            >
              <Onigiri kind={kind} className="rice-icon" />
              <span className="rice-label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
      <Link href="/blog" className="rice-blog">
        blog
      </Link>
    </nav>
  );
};

export default OnigiriNav;
