import { useRef } from "react";
import Link from "next/link";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { projects } from "../data/projects";
import { useT } from "../i18n";
import ProjectCard from "./ProjectCard";

/** Home page: a row of project cards, with a link to the full projects page. */
const ProjectsSection = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".pj-card", {
        y: 80,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: ".pj-grid", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="projects"
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-mint to-charcoal px-6 py-28 md:pl-12 md:pr-36"
    >
      <p className="font-audreyMediumOblique uppercase text-white">{t.projects.lead}</p>
      <h2 className="mt-1 font-heading text-4xl uppercase tracking-widest text-white">
        {t.projects.title}
      </h2>
      <p className="mt-3 max-w-md text-center font-bodyThinItalic text-white">{t.projects.sub}</p>

      <ul className="pj-grid mt-14 grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.id}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>

      <Link
        href="/projects"
        className="mt-14 font-audreyNormal text-xl uppercase tracking-widest text-white underline decoration-orange underline-offset-8 transition-[letter-spacing] hover:tracking-wide"
      >
        {t.projects.seeAll} →
      </Link>
    </section>
  );
};

export default ProjectsSection;
