import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

type Bubble = {
  el: HTMLElement;
  size: number;
  x: number;
  y: number;
  /** Rising speed, px per second. */
  rise: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  held: boolean;
  popped: boolean;
};

// Sizes in px; phones get fewer, smaller bubbles.
const DESKTOP_SIZES = [120, 96, 84, 72, 64, 56, 48, 40];
const PHONE_SIZES = [80, 64, 52, 44, 36];

const rand = gsap.utils.random;

/**
 * Transparent soap bubbles that drift up the page, sway, shy away from the
 * cursor, can be flicked around, and pop when clicked or tapped.
 * Purely decorative: hidden from screen readers and skipped by the keyboard.
 */
const SoapBubbles = () => {
  const layer = useRef<HTMLDivElement>(null);
  // Set once animations are ready; Draggable's click handler calls it.
  const popRef = useRef<((b: Bubble) => void) | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const root = layer.current;
      if (!root) return;
      const phone = window.matchMedia("(max-width: 767px)").matches;
      const sizes = phone ? PHONE_SIZES : DESKTOP_SIZES;
      const els = gsap.utils.toArray<HTMLElement>(".soap", root);
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;

      const bubbles: Bubble[] = els
        .map((el, i) => {
          const size = sizes[i] ?? 0;
          el.style.display = size ? "block" : "none";
          el.style.width = el.style.height = `${size}px`;
          return {
            el,
            size,
            x: rand(0, vw() - size),
            y: rand(0, vh() - size),
            rise: rand(14, 32) * (60 / Math.max(size, 40)) ** 0.4, // small ones rise a bit faster
            swayAmp: rand(12, 34),
            swayFreq: rand(0.35, 0.8),
            phase: rand(0, Math.PI * 2),
            held: false,
            popped: false,
          };
        })
        .filter((b) => b.size);

      const place = (b: Bubble) => gsap.set(b.el, { x: b.x, y: b.y });
      bubbles.forEach(place);

      // With reduced motion the bubbles just sit there (and can still be popped).
      const calm = reducedMotion();

      // Never quite round: each film wobbles on its own rhythm.
      if (!calm) {
        bubbles.forEach((b) => {
          gsap.to(b.el.querySelector(".soap-film"), {
            scaleX: rand(1.03, 1.06),
            scaleY: rand(0.94, 0.97),
            duration: rand(0.9, 1.6),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      // --- Drift, sway and shy away from the cursor ---------------------------
      const mouse = { x: -9999, y: -9999 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === "mouse") {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        }
      };
      window.addEventListener("pointermove", onMove);

      const respawn = (b: Bubble) => {
        b.x = rand(0, Math.max(0, vw() - b.size));
        b.y = vh() + rand(10, 120);
        b.popped = false;
        gsap.set(b.el, { opacity: 1, scale: 1 });
        place(b);
      };

      const tick = (time: number, deltaMs: number) => {
        const dt = Math.min(deltaMs, 50) / 1000;
        for (const b of bubbles) {
          if (b.held || b.popped) continue;
          b.y -= b.rise * dt;
          b.x += Math.cos(time * b.swayFreq + b.phase) * b.swayAmp * b.swayFreq * dt;

          // Gentle push away from the mouse.
          const cx = b.x + b.size / 2;
          const cy = b.y + b.size / 2;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const reach = b.size / 2 + 70;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < reach) {
            const push = ((reach - dist) / reach) * 160 * dt;
            b.x += (dx / dist) * push;
            b.y += (dy / dist) * push;
          }

          // Keep inside the sides; float off the top and come back from below.
          b.x = gsap.utils.clamp(-b.size * 0.3, vw() - b.size * 0.7, b.x);
          if (b.y < -b.size - 20) respawn(b);
          else place(b);
        }
      };
      if (!calm) gsap.ticker.add(tick);

      // --- Flick ----------------------------------------------------------------
      if (!calm) {
        bubbles.forEach((b) => {
          Draggable.create(b.el, {
            type: "x,y",
            bounds: root,
            inertia: true,
            edgeResistance: 0.5,
            onPress() {
              b.held = true;
            },
            onDragStart() {
              gsap.to(b.el, { scale: 1.08, duration: 0.25 });
            },
            onRelease() {
              gsap.to(b.el, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
            },
            onThrowComplete() {
              b.x = gsap.getProperty(b.el, "x") as number;
              b.y = gsap.getProperty(b.el, "y") as number;
              b.held = false;
            },
            // A press that didn't turn into a drag pops the bubble.
            onClick() {
              b.held = false;
              popRef.current?.(b);
            },
          });
        });
      }

      // --- Pop ------------------------------------------------------------------
      popRef.current = contextSafe!((b: Bubble) => {
        if (b.popped) return;
        b.popped = true;
        const cx = (gsap.getProperty(b.el, "x") as number) + b.size / 2;
        const cy = (gsap.getProperty(b.el, "y") as number) + b.size / 2;

        // The film flashes and vanishes...
        gsap.to(b.el, { scale: 1.18, opacity: 0, duration: 0.14, ease: "power1.out" });

        // ...a thin ring snaps outward...
        const ring = document.createElement("span");
        ring.className = "soap-ring";
        Object.assign(ring.style, {
          left: `${cx}px`,
          top: `${cy}px`,
          width: `${b.size}px`,
          height: `${b.size}px`,
        });
        root.appendChild(ring);
        gsap.fromTo(
          ring,
          { xPercent: -50, yPercent: -50, scale: 0.9, opacity: 0.9 },
          {
            scale: 1.6,
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => ring.remove(),
          },
        );

        // ...and droplets spray out, then fall.
        const count = Math.round(6 + b.size / 14);
        for (let i = 0; i < count; i++) {
          const drop = document.createElement("span");
          drop.className = "soap-drop";
          const s = rand(2, 5);
          Object.assign(drop.style, {
            left: `${cx}px`,
            top: `${cy}px`,
            width: `${s}px`,
            height: `${s}px`,
          });
          root.appendChild(drop);
          const angle = (i / count) * Math.PI * 2 + rand(-0.3, 0.3);
          const dist = (b.size / 2) * rand(0.9, 1.6);
          gsap
            .timeline({ onComplete: () => drop.remove() })
            .to(drop, {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              duration: 0.25,
              ease: "power2.out",
            })
            .to(drop, { y: `+=${rand(30, 70)}`, opacity: 0, duration: 0.5, ease: "power2.in" });
        }

        if (calm) return;
        gsap.delayedCall(rand(1.5, 3.5), () => respawn(b));
      });

      // Reduced motion: no dragging, but a tap still pops (and nothing comes back).
      if (calm) {
        bubbles.forEach((b) => {
          b.el.addEventListener("click", () => popRef.current?.(b));
        });
      }

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: layer },
  );

  return (
    <div ref={layer} className="soap-layer" aria-hidden="true">
      {DESKTOP_SIZES.map((size) => (
        <div key={size} className="soap">
          <div className="soap-film" />
        </div>
      ))}
    </div>
  );
};

export default SoapBubbles;
