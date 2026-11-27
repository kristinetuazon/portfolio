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

/**
 * The site's navigation: a column of onigiri, one per section. Each sits
 * grey and quiet until you reach its section, then warms up to full color with
 * a little hop. Click one to go there. Down the right on desktop, across the
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
          onEnterBack: () => reached(true),
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
