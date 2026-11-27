import { useRef, useSyncExternalStore } from "react";
import { gsap, reducedMotion } from "../lib/gsap";
import { useT } from "../i18n";

export type Theme = "dark" | "light";
export const THEME_KEY = "theme";

/**
 * Runs in <head> before the page paints (see _document), so a saved light
 * theme never flashes dark first. Dark is the default.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

/** Sun / moon button: cream paper by day, charcoal by night. */
const ThemeToggle = () => {
  const t = useT();
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);
  const icon = useRef<SVGSVGElement>(null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the theme still changes for this visit.
    }
    if (!reducedMotion() && icon.current) {
      gsap.fromTo(
        icon.current,
        { rotation: -90, scale: 0.4 },
        { rotation: 0, scale: 1, duration: 0.7, ease: "elastic.out(1.2, 0.4)" },
      );
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={next === "light" ? t.theme.toLight : t.theme.toDark}
      title={next === "light" ? t.theme.toLight : t.theme.toDark}
      data-theme-now={theme}
    >
      <svg ref={icon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        {theme === "dark" ? (
          // A sun, to switch to day
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" fill="#f6c177" stroke="#f6c177" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4;
              return (
                <line
                  key={i}
                  x1={12 + Math.cos(a) * 7.2}
                  y1={12 + Math.sin(a) * 7.2}
                  x2={12 + Math.cos(a) * 9.6}
                  y2={12 + Math.sin(a) * 9.6}
                  stroke="#f6c177"
                />
              );
            })}
          </g>
        ) : (
          // A crescent moon, to switch to night
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" fill="#5d4b85" />
        )}
      </svg>
    </button>
  );
};

export default ThemeToggle;
