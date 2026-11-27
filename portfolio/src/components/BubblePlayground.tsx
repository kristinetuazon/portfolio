import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { projects } from "../data/projects";

gsap.registerPlugin(Draggable, InertiaPlugin);

// Starting spots, as fractions of the play area: a loose row on wide
// screens, the four corners on narrow ones.
const WIDE_SPOTS = [
  { x: 0.12, y: 0.25 },
  { x: 0.38, y: 0.55 },
  { x: 0.62, y: 0.2 },
  { x: 0.86, y: 0.5 },
];
const NARROW_SPOTS = [
  { x: 0.05, y: 0.08 },
  { x: 0.95, y: 0.15 },
  { x: 0.08, y: 0.92 },
  { x: 0.92, y: 0.85 },
];

/** Make a project's card bounce and glow, scrolling to it first if needed. */
function celebrateCard(id: string) {
  const card = document.querySelector<HTMLElement>(`#${id} .ew-card`);
  if (!card) return;
  const r = card.getBoundingClientRect();
  if (r.top < 0 || r.bottom > window.innerHeight) {
    card.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
  }
  if (reducedMotion()) return;
  gsap
    .timeline({ delay: 0.15 })
    .fromTo(
      card,
      { scaleX: 1.12, scaleY: 0.88 },
      { scaleX: 1, scaleY: 1, duration: 1.1, ease: "elastic.out(1.3, 0.3)" },
    )
    .fromTo(
      card,
      { boxShadow: `0 0 0 0 ${card.style.borderColor}` },
      { boxShadow: "0 0 40px 6px transparent", duration: 1.2, ease: "power2.out" },
      0,
    );
}

/** Bubbles you can drag, flick and pop. Popping one shows off its project card. */
const BubblePlayground = () => {
  const area = useRef<HTMLDivElement>(null);
  // Set once the animations are ready; the click handler calls it.
  const popRef = useRef<((b: HTMLElement) => void) | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const box = area.current;
      if (!box) return;
      const bubbles = gsap.utils.toArray<HTMLElement>(".pg-bubble", box);

      const place = (b: HTMLElement, i: number) => {
        const spots = box.clientWidth < 560 ? NARROW_SPOTS : WIDE_SPOTS;
        const spot = spots[i % spots.length]!;
        gsap.set(b, {
          x: spot.x * (box.clientWidth - b.offsetWidth),
          y: spot.y * (box.clientHeight - b.offsetHeight),
        });
      };
      bubbles.forEach(place);

      if (reducedMotion()) return;

      // Each bubble bobs on its own; the outer element is what you drag.
      bubbles.forEach((b) => {
        gsap.to(b.querySelector(".pg-float"), {
          yPercent: gsap.utils.random(-12, -6),
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(1.8, 2.6),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      Draggable.create(bubbles, {
        type: "x,y",
        bounds: box,
        dragClickables: true, // they're buttons, so they work with a keyboard too
        inertia: true,
        edgeResistance: 0.6,
        // A gentle squish while being held.
        onPress() {
          gsap.to(this.target, { scale: 0.92, duration: 0.2 });
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
        },
      });

      // contextSafe so animations made on click are still cleaned up on unmount.
      popRef.current = contextSafe!((b: HTMLElement) => {
        const i = bubbles.indexOf(b);
        const rect = b.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        const cx = rect.left - boxRect.left + rect.width / 2;
        const cy = rect.top - boxRect.top + rect.height / 2;

        // Burst: the bubble swells and vanishes, droplets fly out.
        gsap.to(b, { scale: 1.35, opacity: 0, duration: 0.25, ease: "power2.out" });
        const color = b.style.getPropertyValue("--tint");
        for (let d = 0; d < 10; d++) {
          const drop = document.createElement("span");
          drop.className = "pg-drop";
          drop.style.background = color;
          drop.style.left = `${cx}px`;
          drop.style.top = `${cy}px`;
          box.appendChild(drop);
          const angle = (d / 10) * Math.PI * 2 + gsap.utils.random(-0.2, 0.2);
          const dist = gsap.utils.random(50, 95);
          gsap.fromTo(
            drop,
            { x: 0, y: 0, scale: 1, opacity: 1 },
            {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: 0,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              onComplete: () => drop.remove(),
            },
          );
        }

        // A fresh bubble floats back in a moment later.
        gsap.delayedCall(2.2, () => {
          place(b, i);
          gsap.fromTo(
            b,
            { scale: 0, opacity: 1 },
            { scale: 1, duration: 1, ease: "elastic.out(1, 0.45)" },
          );
        });
      });
    },
    { scope: area },
  );

  const pop = (b: HTMLElement, id: string) => {
    if (gsap.getProperty(b, "opacity") === 0) return; // already popped
    popRef.current?.(b);
    celebrateCard(id);
  };

  return (
    <div className="w-full max-w-6xl">
      <p className="mt-10 text-center font-bodyRegularItalic text-white">
        ~flick the bubbles around, or tap one to pop it into its project~
      </p>
      <div
        ref={area}
        className="pg-area relative mt-4 h-72 w-full rounded-[2.5rem] border border-white/10 sm:h-80"
      >
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className="pg-bubble absolute left-0 top-0"
            style={{ "--tint": p.color } as React.CSSProperties}
            aria-label={`Pop the ${p.title} bubble`}
            onClick={(e) => pop(e.currentTarget, p.id)}
          >
            <span className="pg-float" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BubblePlayground;
