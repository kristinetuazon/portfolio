import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectNavBar = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.utils.toArray(".ball").forEach((circle) => {
      console.log(circle) 
      tweenProperty(circle, "scale", 1, 2);
      tweenProperty(circle, "x", 0, 1300);
      tweenProperty(circle, "y", 0, 600);
    });


    function tweenProperty(
      target: any,
      prop: string,
      min: number,
      max: number
    ) {
      const randomDur = gsap.utils.random(10, 10, 0.2, true);
      const randomDelay = gsap.utils.random(0.6, 2, 0.2, true);

      gsap.to(target, {
        [prop]: gsap.utils.random(min, max),
        duration: randomDur(),
        delay: randomDelay(),
        ease: "none",
        onComplete: tweenProperty,
        onCompleteParams: [target, prop, min, max],
      });
    }

    // function background() {
    //   const opa = gsap.utils.random(0.2, 1, 0.1, true);

    //   gsap.to("#background", { opacity: opa, duration: 3, ease: "none" });
    // }

    // background();

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
        className="mb-3 text-center font-heading text-4xl uppercase tracking-widest text-white hover:tracking-wide"
      >
        Projects
      </span>
      <p className="text-center font-bodyRegularItalic">
        ~click a bubble to land on a random project or go with the flow by
        scrolling down~
      </p>
      <p className="mb-20 text-center font-bodyRegularItalic"> note: the bubbles are unavailable for mobile devices. </p>


      <div id="background" className="relative w-screen h-screen">
      <a className="bubble" href="#studyhero"><div className="ball"></div></a>
      <a className="bubble" href="#costofliving"><div className="ball"></div></a>
      <a className="bubble" href="#minimize"><div className="ball"></div></a>
      <a className="bubble" href="#tokyonoire"><div className="ball"></div></a>
      <a className="bubble" href="#studyhero"><div className="ball"></div></a>
      <a className="bubble" href="#costofliving"><div className="ball"></div></a>
      <a className="bubble" href="#minimize"><div className="ball"></div></a>
      <a className="bubble" href="#tokyonoire"><div className="ball"></div></a>
      <a className="bubble" href="#studyhero"><div className="ball"></div></a>
      <a className="bubble" href="#costofliving"><div className="ball"></div></a>
      <a className="bubble" href="#minimize"><div className="ball"></div></a>
      <a className="bubble" href="#tokyonoire"><div className="ball"></div></a>
      </div>

      
  
    </>
  );
};

export default ProjectNavBar;
