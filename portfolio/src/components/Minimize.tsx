import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import WebIcon from "@mui/icons-material/Web";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import minimize1 from "public/Minimize/Minimize1.jpeg";
import minimize2 from "public/Minimize/Minimize2.jpeg";
import minimize3 from "public/Minimize/Minimize3.jpeg";
import minimize4 from "public/Minimize/Minimize4.jpeg";
import minimize5 from "public/Minimize/Minimize5.jpeg";

const Minimize = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#minimize1",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#costOfLivingVideoPane",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#minimize2",
      { x: -10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#minimize",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#minimize3",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#minimizeDesc",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#minimize4",
      { x: -10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#minimizeButtons",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#minimize5",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#minimize5",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <span className="mb-5 font-heading uppercase text-4xl text-white overflow-hidden">minimize</span>
      <p id="minimizeDesc" className="font-bodyThin">
        A tinder-style decluttering application. Both version one and version two exists.
      </p>
      <div id="minimizeButtons" className="grid grid-cols-3 gap-3">
        <Link
          className="mt-3"
          href="https://github.com/kristinetuazon/minimize"
        >
          <GitHubIcon fontSize="large" />
        </Link>
        <Link className="mt-3" href="https://www.mnmz.app/">
          <WebIcon fontSize="large" />
        </Link>
        <Link className="mt-3" href="https://youtu.be/w1CIF_Wsj-Y">
          <YouTubeIcon fontSize="large" />
        </Link>
      </div>
      <div className="relative mt-10 flex h-[550px] w-full flex-col items-center justify-center">
        <Image
          alt="minimize1"
          className="absolute"
          id="minimize1"
          src={minimize1}
          width="950"
        ></Image>
        <Image
          alt="minimize2"
          className="absolute"
          id="minimize2"
          src={minimize2}
          width="950"
        ></Image>
        <Image
          alt="minimize3"
          className="absolute"
          id="minimize3"
          src={minimize3}
          width="950"
        ></Image>
        <Image
          alt="minimize4"
          className="absolute"
          id="minimize4"
          src={minimize4}
          width="950"
        ></Image>
        <Image
          alt="minimize5"
          className="absolute"
          id="minimize5"
          src={minimize5}
          width="950"
        ></Image>
      </div>
    </>
  );
};

export default Minimize;
