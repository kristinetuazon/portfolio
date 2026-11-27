import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/gsap";
import { NOW } from "../data/now";
import { useLocale, useT } from "../i18n";

const EVERY_MS = 3800;

/**
 * "now;" under the intro: one thing at a time, gently swapping every few
 * seconds (click to skip ahead). Screen readers get the whole list at once;
 * with reduced motion it doesn't rotate on its own.
 */
const NowLine = () => {
  const t = useT();
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (paused || reducedMotion()) return;
    const timer = window.setInterval(() => setCurrent((c) => (c + 1) % NOW.length), EVERY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const item = list.current?.children[current];
    if (!item || reducedMotion()) return;
    gsap.fromTo(
      item,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.8)", overwrite: true },
    );
  }, [current]);

  return (
    <div
      className="now-line"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <span className="now-label">{t.intro.now}</span>
      <button
        type="button"
        className="now-items"
        onClick={() => setCurrent((c) => (c + 1) % NOW.length)}
        aria-label={t.intro.nowNext}
      >
        <span ref={list} className="now-stack" aria-hidden="true">
          {NOW.map((item, i) => (
            <span key={item.icon} className={i === current ? "is-current" : undefined}>
              {item.icon} <em>{item[locale].verb}</em> {item[locale].what}
            </span>
          ))}
        </span>
      </button>
      {/* The full list for screen readers */}
      <ul className="sr-only">
        {NOW.map((item) => (
          <li key={item.icon}>
            {item[locale].verb}: {item[locale].what}
          </li>
        ))}
      </ul>
      <span className="now-dots" aria-hidden="true">
        {NOW.map((item, i) => (
          <span key={item.icon} className={i === current ? "is-current" : undefined} />
        ))}
      </span>
    </div>
  );
};

export default NowLine;
