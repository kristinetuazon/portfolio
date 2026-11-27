import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/gsap";
import { BUBBLE_POP_EVENT } from "./SoapBubbles";

const STORAGE_KEY = "bubbles-popped-all-time";

// Little cheers at certain counts.
const MILESTONES: Record<number, string> = {
  10: "nice! ✨",
  25: "bubble pro",
  50: "unstoppable!",
  100: "bubble legend 👑",
  250: "…do you need a break? 🍵",
};

const readTotal = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
};
const saveTotal = (n: number) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(n));
  } catch {
    // Private mode or storage blocked: the counter still works for this visit.
  }
};

/**
 * Bottom-left counter of soap bubbles popped this visit, plus an all-time
 * total remembered in this browser. Just for fun.
 */
const BubbleCounter = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [cheer, setCheer] = useState<string | null>(null);
  const number = useRef<HTMLSpanElement>(null);
  const cheerEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onPop = () => {
      setCount((c) => {
        const next = c + 1;
        const milestone = MILESTONES[next];
        if (milestone) setCheer(milestone);
        return next;
      });
      setTotal((t) => {
        const next = (t || readTotal()) + 1;
        saveTotal(next);
        return next;
      });
    };
    window.addEventListener(BUBBLE_POP_EVENT, onPop);
    return () => window.removeEventListener(BUBBLE_POP_EVENT, onPop);
  }, []);

  // A jelly bump on every pop.
  useEffect(() => {
    if (!count || reducedMotion() || !number.current) return;
    gsap.fromTo(
      number.current,
      { scaleX: 1.35, scaleY: 0.75, y: -3 },
      {
        scaleX: 1,
        scaleY: 1,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.4, 0.35)",
        overwrite: true,
      },
    );
  }, [count]);

  // Milestone message floats up and fades.
  useEffect(() => {
    if (!cheer || !cheerEl.current) return;
    const tween = reducedMotion()
      ? gsap.fromTo(cheerEl.current, { opacity: 1 }, { opacity: 0, delay: 2, duration: 0.3 })
      : gsap.fromTo(
          cheerEl.current,
          { y: 10, scale: 0.6, opacity: 0 },
          {
            keyframes: [
              { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.5)" },
              { y: -14, opacity: 0, duration: 0.6, delay: 1.6, ease: "power1.in" },
            ],
          },
        );
    tween.eventCallback("onComplete", () => setCheer(null));
    return () => {
      tween.kill();
    };
  }, [cheer]);

  return (
    <div className="pop-counter" title="Soap bubbles you've popped">
      <span className="pop-counter-bubble" aria-hidden="true" />
      <span>
        <span ref={number} className="pop-counter-number">
          {count}
        </span>{" "}
        popped
        {total > count && <span className="pop-counter-total">{total} all-time</span>}
      </span>
      {cheer && (
        <span ref={cheerEl} className="pop-counter-cheer" aria-live="polite">
          {cheer}
        </span>
      )}
    </div>
  );
};

export default BubbleCounter;
