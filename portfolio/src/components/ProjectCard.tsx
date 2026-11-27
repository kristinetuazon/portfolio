import { useLocale, useT } from "../i18n";
import type { Project } from "../data/projects";
import { NowVisual, QaVisual } from "./HistoryTimeline";
import { GitHubIcon, WebIcon } from "./icons";

/** Cards to swipe: keep (♡) or let go (✕). */
const SwipeVisual = () => (
  <svg viewBox="0 0 220 140" className="hv-svg">
    <g className="pv-swipe-back" transform="rotate(-8 110 70)">
      <rect x="72" y="16" width="76" height="104" rx="8" fill="#e9e2d4" stroke="#d8ccb6" />
    </g>
    <g className="pv-swipe-card" transform="rotate(6 110 70)">
      <rect x="72" y="16" width="76" height="104" rx="8" fill="#fff" stroke="#d8ccb6" />
      <rect x="80" y="24" width="60" height="52" rx="5" fill="#f2a7b6" opacity=".45" />
      <path d="M98 58l12-14 12 14z" fill="#c88e95" />
      <circle cx="122" cy="38" r="5" fill="#f6c177" />
      <rect x="80" y="84" width="44" height="5" rx="2.5" fill="#c9bfad" />
      <rect x="80" y="94" width="30" height="5" rx="2.5" fill="#e2d6c2" />
    </g>
    <g transform="translate(40 70)">
      <circle r="14" fill="#fff" stroke="#e8704a" strokeWidth="2" />
      <path d="M-5-5l10 10M5-5l-10 10" stroke="#e8704a" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <g transform="translate(180 70)">
      <circle r="14" fill="#fff" stroke="#7aa35a" strokeWidth="2" />
      <path d="M0 6c-7-5-9-8-7-11 2-3 6-2 7 1 1-3 5-4 7-1 2 3 0 6-7 11z" fill="#7aa35a" />
    </g>
  </svg>
);

const VISUALS: Record<Project["visual"], () => React.ReactNode> = {
  swipe: () => <SwipeVisual />,
  site: () => <NowVisual />,
  tests: () => <QaVisual />,
};

/**
 * One project: a drawing on paper, the title, a line about it and links.
 * `full` (the projects page) adds the longer write-up and the tags.
 */
const ProjectCard = ({ project: p, full = false }: { project: Project; full?: boolean }) => {
  const t = useT();
  const locale = useLocale();
  return (
    <article className="pj-card" style={{ "--accent": p.color } as React.CSSProperties}>
      <div className="pj-visual" aria-hidden="true">
        {VISUALS[p.visual]()}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center gap-2 font-audreyMedium text-xl uppercase tracking-wide text-white">
          <span
            aria-hidden="true"
            className="inline-block h-3.5 w-3.5 rounded-full"
            style={{ background: p.color }}
          />
          {p.title}
        </h3>
        <p className="mt-2 font-bodyLight text-lg leading-relaxed text-creme">
          {p.summary[locale]}
        </p>
        {full && (
          <p className="mt-3 font-bodyRegular leading-relaxed text-white">{p.details[locale]}</p>
        )}
        {full && p.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-mint/70 px-3 py-0.5 font-bodyRegular text-sm text-creme"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
          {p.links.map(({ kind, href }) => (
            <a key={href} href={href} className="pj-link" target="_blank" rel="noopener noreferrer">
              {kind === "github" ? (
                <GitHubIcon className="h-5 w-5" />
              ) : (
                <WebIcon className="h-5 w-5" />
              )}
              {t.projects.links[kind]} ↗
            </a>
          ))}
          {p.note && (
            <span className="font-bodyRegularItalic text-sm text-creme">{p.note[locale]}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
