import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ProjectNavBar = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // const elems = gsap.utils.toArray(".circle");
    // function animate5Random() {
    //   gsap.utils.shuffle(elems);
    //   let tl = gsap.timeline({ onComplete: animate5Random }),
    //     subset = elems.slice(0, 4);
    //   tl.to(subset, {
    //     opacity: 0,
    //   }).set(subset, {
    //     opacity: 1,
    //   });
    // }

    // animate5Random();

    gsap.utils.toArray(".bubble").forEach((star) => {
      tweenProperty(star, "scale", 0.5, 4);
      tweenProperty(star, "x", -200, 200);
      tweenProperty(star, "y", -30, 30);
    });

    /* @ts-ignore */
    function tweenProperty(target, prop, min, max) {
      var randomDur = gsap.utils.random(3, 6, 0.2, true);
      var randomDelay = gsap.utils.random(0.6, 2, 0.2, true);

      gsap.to(target, {
        [prop]: gsap.utils.random(min, max),
        duration: randomDur(),
        delay: randomDelay(),
        ease: "none",
        onComplete: tweenProperty,
        onCompleteParams: [target, prop, min, max],
      });
    }

    function background() {
      var next = gsap.utils.random(3, 6, 0.5, true);
      var opa = gsap.utils.random(0.2, 1, 0.1, true);

      gsap.to("#svg01", { opacity: opa, duration: 3, ease: "none" });

      /* @ts-ignore */
      var delayedCall = gsap.delayedCall(next, background);
    }

    background();

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

  useEffect(() => {}, []);

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
      <p className="mb-20 text-center font-bodyRegularItalic">
        ~click a bubble to land in a random project or go with the flow by
        scrolling down~
      </p>

      <svg id="svg01" viewBox="0 0 500 400">
        <a className="bubble" href="#studyhero">
          <circle cx="100" cy="80" className="fill-orange"></circle>
        </a>

        <a className="bubble" href="#costofliving"><circle cx="100" cy="80" className="fill-creme"/></a>

        <a className="bubble" href="#minimize"> <circle className="fill-pink" cx="200" cy="120" /></a>


          <a className="bubble" href="#tokyonoire"><circle className="fill-charcoal"cx="300" cy="50" /> </a>


          <a className="bubble" href="#tokyonoire"><circle className="fill-coffee" cx="300" cy="130" /></a>


          <a className="bubble" href="#minimize"><circle className="fill-white" cx="250" cy="100" /></a>
      </svg>
    </>
  );
};

export default ProjectNavBar;
