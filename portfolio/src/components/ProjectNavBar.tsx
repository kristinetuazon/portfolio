import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { projects } from "../data/projects";

// Three floating bubbles per project.
const BUBBLES = [0, 1, 2].flatMap(() => projects);

/** Floating bubbles that each jump to a project when clicked. */
const ProjectNavBar = () => {
  const area = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const balls = gsap.utils.toArray<HTMLElement>(".ball");

      // Drift each bubble to a random spot, then pick a new one, forever.
      const wander = (target: HTMLElement, prop: string, min: number, max: number) => {
        gsap.to(target, {
          [prop]: gsap.utils.random(min, max),
          duration: 10,
          delay: gsap.utils.random(0.6, 2, 0.2),
          ease: "none",
          onComplete: wander,
          onCompleteParams: [target, prop, min, max],
        });
      };
      balls.forEach((ball) => {
        wander(ball, "scale", 1, 2);
        wander(ball, "x", 0, 1200);
        wander(ball, "y", 0, 600);
      });

      return () => gsap.killTweensOf(balls);
    },
    { scope: area },
  );

  return (
    <>
      <p id="projects" className="mt-56 font-bodyRegularItalic">
        Introducing my
      </p>
      <span className="mb-3 overflow-hidden text-center font-heading text-4xl uppercase tracking-widest text-white hover:tracking-wide">
        Projects
      </span>
      <p className="text-center font-bodyRegularItalic">
        ~click a bubble to land on a random project or go with the flow by scrolling down~
      </p>

      <div ref={area} className="relative h-[90vh] w-screen">
        {BUBBLES.map((project, i) => (
          <a key={i} className="bubble" href={`#${project.id}`} aria-label={project.title}>
            <div className="ball" />
          </a>
        ))}
      </div>
    </>
  );
};

export default ProjectNavBar;
