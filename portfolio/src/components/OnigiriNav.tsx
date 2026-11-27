import { useRef } from "react";
import Link from "next/link";
import { gsap, reducedMotion, ScrollTrigger, useGSAP } from "../lib/gsap";
import Onigiri, { chompTransform, type OnigiriKind } from "./Onigiri";

// One onigiri per section.
export const SECTIONS: { id: string; label: string; kind: OnigiriKind }[] = [
  { id: "hi", label: "Hi", kind: "classic" },
  { id: "lazuli", label: "Lazuli", kind: "sesame" },
  { id: "about", label: "Story", kind: "ume" },
  { id: "projects", label: "Projects", kind: "salmon" },
  { id: "contact", label: "Contact", kind: "yaki" },
];

const rand = gsap.utils.random;

/** Little bits that fly off a button: rice crumbs when bitten, sparkles when restored. */
function burst(btn: HTMLElement, kind: "crumb" | "sparkle", count: number) {
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("span");
    bit.className = kind === "crumb" ? "rice-crumb" : "rice-sparkle";
    if (kind === "sparkle") bit.textContent = "✦";
    btn.appendChild(bit);
    const falls = kind === "crumb";
    gsap.fromTo(
      bit,
      { x: rand(-4, 4), y: 0, rotation: rand(0, 180), opacity: 1, scale: falls ? 1 : 0.4 },
      {
        x: `+=${rand(-16, 16)}`,
        y: falls ? rand(18, 30) : rand(-22, -12),
        rotation: `+=${rand(90, 270)}`,
        scale: 1,
        opacity: 0,
        duration: rand(0.5, 0.8),
        ease: falls ? "power2.in" : "power2.out",
        delay: i * 0.04,
        onComplete: () => bit.remove(),
      },
    );
  }
}

/**
 * The site's navigation: a column of onigiri, one per section.
 * - Grey until you reach its section, then it warms to color, hops, and steams.
 * - The current one has a little face that blinks and looks where you scroll.
 * - Once you've scrolled past, it gets chomped twice (and comes back if you return).
 * - Hovering tilts it toward the mouse and flutters the nori.
 * Down the right on desktop, across the top on phones.
 */
const OnigiriNav = () => {
  const nav = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const calm = reducedMotion();
      const allEyes = gsap.utils.toArray<SVGGElement>(".onigiri-eyes", nav.current);

      SECTIONS.forEach(({ id }, index) => {
        const btn = nav.current?.querySelector<HTMLElement>(`[data-section="${id}"]`);
        const target = document.getElementById(id);
        if (!btn || !target) return;
        const icon = btn.querySelector<SVGSVGElement>(".rice-icon")!;
        const body = btn.querySelector(".onigiri-body")!;
        const face = btn.querySelector(".onigiri-face")!;
        const eyes = btn.querySelector(".onigiri-eyes")!;
        const steam = btn.querySelector(".onigiri-steam")!;
        const steamPaths = steam.querySelectorAll("path");

        const reached = (on: boolean) => btn.classList.toggle("is-reached", on);

        // --- Steam when it lights up ---------------------------------------
        const puff = () => {
          if (calm) return;
          gsap
            .timeline()
            .set(steam, { opacity: 1 })
            .fromTo(
              steamPaths,
              { drawSVG: "0% 0%", y: 0, opacity: 0.6 },
              { drawSVG: "0% 100%", duration: 0.8, ease: "power1.out", stagger: 0.12 },
            )
            .to(
              steamPaths,
              {
                drawSVG: "100% 100%",
                y: -6,
                opacity: 0,
                duration: 0.8,
                ease: "sine.in",
                stagger: 0.1,
              },
              "-=0.2",
            )
            .set(steam, { opacity: 0 });
        };

        // --- Blinking (runs quietly; only visible while the face is shown) -
        if (!calm) {
          gsap
            .timeline({ repeat: -1, repeatDelay: rand(2.4, 4.5), delay: rand(0.5, 2) })
            .to(eyes, { scaleY: 0.1, svgOrigin: "50 53", duration: 0.07, ease: "power1.in" })
            .to(eyes, { scaleY: 1, svgOrigin: "50 53", duration: 0.12, ease: "power1.out" });
        }

        // --- Two chomps when the section is passed --------------------------
        const chomps = [0, 1].map((i) => ({
          s: 0,
          parts: btn.querySelectorAll<SVGGElement>(`.onigiri-chomp-${i}`),
        }));
        const draw = () =>
          chomps.forEach((c, i) =>
            c.parts.forEach((g) => g.setAttribute("transform", chompTransform(i, c.s))),
          );
        let biteTl: gsap.core.Timeline | undefined;
        const setBitten = (on: boolean) => {
          btn.classList.toggle("is-bitten", on);
          biteTl?.kill();
          if (calm) {
            chomps.forEach((c) => (c.s = on ? 1 : 0));
            draw();
            return;
          }
          biteTl = gsap.timeline({ onUpdate: draw });
          if (on) {
            chomps.forEach((c, i) => {
              const at = i * 0.24;
              biteTl!
                .to(c, { s: 1, duration: 0.14, ease: "back.out(2.5)", onUpdate: draw }, at)
                .fromTo(
                  body,
                  { scaleX: 1.09, scaleY: 0.86, svgOrigin: "50 91" },
                  { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1.2, 0.35)" },
                  at,
                )
                .call(() => burst(btn, "crumb", 3), [], at);
            });
          } else {
            biteTl
              .to(chomps, { s: 0, duration: 0.45, ease: "power2.inOut", onUpdate: draw })
              .call(() => burst(btn, "sparkle", 3), [], 0.25);
          }
        };

        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          // Measure after the pinned Lazuli section has added its scroll space.
          refreshPriority: -1,
          onToggle: ({ isActive }) => {
            btn.toggleAttribute("aria-current", isActive);
            if (calm) {
              gsap.set(face, { opacity: isActive ? 1 : 0 });
              return;
            }
            gsap.to(face, { opacity: isActive ? 1 : 0, duration: 0.3 });
            gsap.to(icon, {
              scale: isActive ? 1.3 : 1,
              duration: 0.6,
              ease: "elastic.out(1, 0.4)",
            });
            if (isActive) {
              gsap.fromTo(
                icon,
                { y: 0 },
                { y: -6, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 },
              );
            }
          },
          onEnter: () => {
            reached(true);
            puff();
          },
          onEnterBack: () => {
            reached(true);
            setBitten(false);
            puff();
          },
          onLeave: () => setBitten(true),
          // Scrolling back above a section makes its onigiri go quiet again.
          onLeaveBack: () => index > 0 && reached(false),
        });
      });

      // --- The eyes look the way you're scrolling, then settle back ---------
      if (!calm) {
        let settle: gsap.core.Tween | undefined;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const look = gsap.utils.clamp(-1.6, 1.6, self.getVelocity() / 900);
            gsap.to(allEyes, { y: look, duration: 0.25, overwrite: "auto" });
            settle?.kill();
            settle = gsap.delayedCall(0.35, () =>
              gsap.to(allEyes, { y: 0, duration: 0.5, ease: "power2.out" }),
            );
          },
        });
      }
    },
    { scope: nav },
  );

  // --- Hover: tilt toward the mouse, flutter the nori -----------------------
  const onEnter = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion()) return;
    const btn = e.currentTarget;
    const icon = btn.querySelector(".rice-icon");
    const rect = btn.getBoundingClientRect();
    const side = e.clientX < rect.left + rect.width / 2 ? -1 : 1;
    gsap.to(icon, {
      rotation: side * 12,
      transformOrigin: "50% 90%",
      duration: 0.25,
      ease: "power2.out",
    });
    const nori = btn.querySelector(".onigiri-nori");
    if (nori) {
      gsap.to(nori, {
        keyframes: { skewX: [0, 8, -6, 4, -2, 0] },
        svgOrigin: "50 64",
        duration: 0.7,
        ease: "none",
      });
    }
  });
  const onLeave = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    const icon = e.currentTarget.querySelector(".rice-icon");
    gsap.to(icon, { rotation: 0, duration: 0.7, ease: "elastic.out(1.2, 0.35)" });
  });

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
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
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
