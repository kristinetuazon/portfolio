import { useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { projects, type ProjectLink } from "../data/projects";
import { GitHubIcon, WebIcon, YouTubeIcon } from "./icons";
import BubblePlayground from "./BubblePlayground";

const ICONS: Record<ProjectLink["kind"], typeof GitHubIcon> = {
  github: GitHubIcon,
  website: WebIcon,
  youtube: YouTubeIcon,
};
const LABELS: Record<ProjectLink["kind"], string> = {
  github: "code on GitHub",
  website: "live site",
  youtube: "demo video",
};

/** Bootcamp-era projects as a row of bubbly cards. */
const EarlierWork = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".ew-card", {
        y: 80,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: ".ew-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  const squish = (el: HTMLElement) => {
    if (reducedMotion()) return;
    gsap.fromTo(
      el,
      { scaleX: 1.05, scaleY: 0.95 },
      { scaleX: 1, scaleY: 1, duration: 0.9, ease: "elastic.out(1.2, 0.35)", overwrite: "auto" },
    );
  };

  return (
    <section
      ref={root}
      id="projects"
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-mint to-charcoal px-6 py-28 md:pl-12 md:pr-36"
    >
      <p className="font-audreyMediumOblique uppercase text-white">and before that, my</p>
      <h2 className="mt-1 font-heading text-4xl uppercase tracking-widest text-white">
        earlier work
      </h2>
      <p className="mt-3 max-w-md text-center font-bodyThinItalic text-white">
        a few things I built before joining Lazuli
      </p>

      <BubblePlayground />

      <ul className="ew-grid mt-14 grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((p) => (
          <li key={p.id} id={p.id}>
            <article
              className="ew-card flex h-full flex-col overflow-hidden rounded-[2rem] border-2 bg-charcoal/70 backdrop-blur"
              style={{ borderColor: p.color }}
              onMouseEnter={(e) => squish(e.currentTarget)}
            >
              <Image
                src={p.image}
                alt={`${p.title} screenshot`}
                sizes="(min-width: 1440px) 300px, (min-width: 400px) 50vw, 100vw"
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="flex items-center gap-2 font-audreyMedium text-lg uppercase tracking-wide text-white">
                  <span
                    aria-hidden="true"
                    className="inline-block h-3.5 w-3.5 rounded-full"
                    style={{ background: p.color }}
                  />
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 font-bodyLight leading-relaxed text-creme">
                  {p.description}
                </p>
                <div className="mt-4 flex gap-3">
                  {p.links.map(({ kind, href }) => {
                    const Icon = ICONS[kind];
                    return (
                      <a
                        key={href}
                        href={href}
                        className="text-white transition-colors hover:text-orange"
                        aria-label={`${p.title}: ${LABELS[kind]}`}
                        title={LABELS[kind]}
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EarlierWork;
