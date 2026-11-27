import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import YouTube from "react-youtube";
import { gsap, useGSAP } from "../lib/gsap";
import type { Project as ProjectData, ProjectLink } from "../data/projects";
import { GitHubIcon, WebIcon, YouTubeIcon } from "./icons";

const LINK_ICONS: Record<ProjectLink["kind"], typeof GitHubIcon> = {
  github: GitHubIcon,
  website: WebIcon,
  youtube: YouTubeIcon,
};
const LINK_LABELS: Record<ProjectLink["kind"], string> = {
  github: "source code on GitHub",
  website: "live website",
  youtube: "demo video on YouTube",
};
const GRID_COLS = ["grid-cols-1", "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];

/** A project section (title, links, flying screenshots) followed by its demo video. */
const Project = ({ project, isFirst }: { project: ProjectData; isFirst?: boolean }) => {
  const gallery = useRef<HTMLDivElement>(null);

  // Screenshots are stacked on top of each other; each one slides in from
  // alternating sides as you scroll through the gallery, so the last one
  // ends up on top.
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gallery.current,
          start: "top 85%",
          end: "bottom 30%",
          scrub: true,
        },
      });
      slides.forEach((slide, i) => {
        const fromX = i % 2 === 0 ? "-100vw" : "100vw";
        tl.fromTo(slide, { x: fromX }, { x: 0, ease: "none" }, i);
      });
    },
    { scope: gallery },
  );

  return (
    <>
      <section
        id={project.id}
        className={`flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b ${project.sectionBg}`}
      >
        <span
          className={`mb-5 overflow-hidden font-heading text-4xl uppercase text-white ${project.titleClass ?? ""}`}
        >
          {project.title}
        </span>
        <p className={`font-bodyThin ${project.descriptionClass ?? ""}`}>{project.description}</p>
        <div className={`grid gap-3 ${GRID_COLS[project.links.length]}`}>
          {project.links.map(({ kind, href }) => {
            const Icon = LINK_ICONS[kind];
            return (
              <Link
                key={href}
                className="mt-3"
                href={href}
                aria-label={`${project.title} ${LINK_LABELS[kind]}`}
              >
                <Icon size="large" className={project.iconClass} />
              </Link>
            );
          })}
        </div>

        <div
          ref={gallery}
          className="relative mt-10 flex h-[550px] w-full flex-col items-center justify-center"
        >
          {project.images.map((src, i) => (
            <Image
              key={src.src}
              alt={`${project.title} screenshot ${i + 1}`}
              className="project-slide absolute"
              src={src}
              width={project.imageWidth}
              sizes={project.imageWidth ? `${project.imageWidth}px` : "100vw"}
              priority={isFirst && i === 0}
            />
          ))}
        </div>
      </section>

      <div
        className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b ${project.videoBg}`}
      >
        <YouTube
          className={isFirst ? undefined : "mt-10"}
          videoId={project.youtubeId}
          opts={{ height: "400", width: "420" }}
          loading="lazy"
          title={`${project.title} demo video`}
        />
      </div>
    </>
  );
};

export default Project;
