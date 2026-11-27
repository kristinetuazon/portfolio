import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** True when the visitor has asked their device for less motion. */
export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type RevealFrom = "left" | "right" | "scale";

const FROM_VARS: Record<RevealFrom, gsap.TweenVars> = {
  // One viewport width is enough to start fully off-screen
  // (the old ±10000px made the browser paint huge transforms).
  left: { x: "-100vw" },
  right: { x: "100vw" },
  scale: { scale: 0 },
};
const TO_VARS: Record<RevealFrom, gsap.TweenVars> = {
  left: { x: 0 },
  right: { x: 0 },
  scale: { scale: 1 },
};

/**
 * Slide/scale an element into place, scrubbed to scroll position.
 * Call inside `useGSAP` so it is cleaned up on unmount.
 */
export function reveal(
  target: gsap.TweenTarget,
  from: RevealFrom,
  trigger: gsap.DOMTarget,
  { start = "top 60%", end = "top 30%" }: { start?: string; end?: string } = {},
) {
  if (reducedMotion()) return gsap.set(target, TO_VARS[from]);
  return gsap.fromTo(target, FROM_VARS[from], {
    ...TO_VARS[from],
    ease: "none",
    scrollTrigger: { trigger, start, end, scrub: true },
  });
}

/** Fade an element from dim to full opacity as `trigger` reaches the middle of the screen. */
export function fadeInOn(target: gsap.TweenTarget, trigger: gsap.DOMTarget) {
  if (reducedMotion()) return gsap.set(target, { opacity: 1 });
  return gsap.fromTo(
    target,
    { opacity: 0.1 },
    {
      opacity: 1,
      scrollTrigger: { trigger, start: "top center", end: "20% center", scrub: true },
    },
  );
}
