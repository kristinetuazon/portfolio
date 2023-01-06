import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectNavBar = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    document.querySelectorAll(".item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0.1 },
        {
          scrollTrigger: {
            trigger: item,
            start: "top center",
            end: "20% center",
            scrub: true,
          },
          duration: 0.8,
          opacity: 1,
          immediateRender: false,
        }
      );

      gsap.fromTo(
        item,
        { opacity: 1 },
        {
          scrollTrigger: {
            trigger: item,
            start: "80% center",
            end: "bottom center",
            scrub: true,
          },
          duration: 0.8,
          opacity: 0.1,
          immediateRender: false,
        }
      );
    });
  }, []);

  return (
    <>
      <p id="projects" className="mt-56 font-bodyRegularItalic">
        Introducing my
      </p>
      <span
        id="about"
        className="mb-3 text-center font-heading text-5xl tracking-widest text-white hover:tracking-wide"
      >
        Projects
      </span>
      <p className="mb-20 font-bodyRegularItalic">
        ~feel free to jump around, or go with the flow~
      </p>

      <div className="list">
        <a className="item item1 font-audreyNormal uppercase" href="#studyhero">
          <p className="text-center">⚔️</p>study hero{" "}
        </a>
        <a
          className="item item2 font-audreyNormal uppercase"
          href="#costofliving"
        >
          <p className="text-center">💳</p>cost of living
        </a>
        <a className="item item3 font-audreyNormal uppercase" href="#minimize">
          <p className="text-center" id="minimizestart">
            ▫️
          </p>
          minimize
        </a>
        <a
          className="item item4 font-audreyNormal uppercase"
          href="#tokyonoire"
        >
          <p className="text-center" id="tokyonoirestart">
            🔎
          </p>
          tokyo noire
        </a>
      </div>
    </>
  );
};

export default ProjectNavBar;
