import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const NavBar = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#navStart",
      { opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: "#name",
          start: "top center",
          end: "20% center",
          scrub: true,
        },
        duration: 0.8,
        opacity: 1,
        // immediateRender: false,
      }
    );

    gsap.fromTo(
      "#navAbout",
      { opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "20% center",
          scrub: true,
        },
        duration: 0.8,
        opacity: 1,
        // immediateRender: false,
      }
    );

    gsap.fromTo(
      "#navProject",
      { opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: "#projects",
          start: "top center",
          end: "20% center",
          scrub: true,
        },
        duration: 0.8,
        opacity: 1,
        // immediateRender: false,
      }
    );

    gsap.fromTo(
      "#navContact",
      { opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: "#contact",
          start: "top center",
          end: "20% center",
          scrub: true,
        },
        duration: 0.8,
        opacity: 1,
        // immediateRender: false,
      }
    );
  }, []);

  return (
    <>
      <nav className="w-100 fixed inset-x-0 top-5 flex justify-evenly ">
        <div className="grid grid-cols-4 gap-4 ">
          <div id="navStart" className="grid grid-rows-2 place-items-center">
            <a
              className="inset-y-0 left-0 font-audreyMedium uppercase text-white"
              href="#name"
            >
              Start
            </a>
          </div>
          <div id="navAbout" className="grid grid-rows-2 place-items-center">
            <a className="font-audreyMedium uppercase text-white" href="#about">
              About
            </a>
          </div>
          <div id="navProject" className="grid grid-rows-2 place-items-center">
            <a
              className="font-audreyMedium uppercase text-white"
              href="#projects"
            >
              Project
            </a>
          </div>
          <div id="navContact" className="grid grid-rows-2 place-items-center">
            <a
              className="inset-0 font-audreyMedium uppercase text-white "
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
