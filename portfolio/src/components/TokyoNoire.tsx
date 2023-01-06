import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import WebIcon from "@mui/icons-material/Web";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import tokyoNoire1 from "public/TokyoNoire/TokyoNoire1.jpeg";
import tokyoNoire2 from "public/TokyoNoire/TokyoNoire2.jpeg";
import tokyoNoire3 from "public/TokyoNoire/TokyoNoire3.jpeg";
import tokyoNoire4 from "public/TokyoNoire/TokyoNoire4.jpeg";
import tokyoNoire5 from "public/TokyoNoire/TokyoNoire5.jpeg";
// import YouTube, { YouTubeProps } from "react-youtube";
import Link from "next/link";
import Image from "next/image";

const TokyoNoire = () => {

  //!!!fix animations by undeleting the code

    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
      gsap.fromTo(
        "#tokyoNoire1",
        { x: 10000 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "#minimizeVideoPane",
            start: "top 10%",
            end: "top 5%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "#tokyoNoire2",
        { x: -10000 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "#tokyonoire",
            start: "top 10%",
            end: "top 5%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "#tokyoNoire3",
        { x: 10000 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "#tokyonoireDesc",
            start: "top 10%",
            end: "top 5%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "#tokyoNoire4",
        { x: -10000 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "#tokyonoireButtons",
            start: "top 10%",
            end: "top 5%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        "#tokyoNoire5",
        { x: 10000 },
        {
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "#tokyoNoire5",
            start: "top 10%",
            end: "top 5%",
            scrub: true,
          },
        }
      );

    }, [])

  return (
    <>
       <span className="mb-5 font-heading text-5xl  text-white">
          tokyo noire
        </span>
        <p id="tokyonoireDesc" className="text-center font-bodyThin text-white">
          A geo-location, narrative based game platform and editor.
        </p>
        <div id="tokyonoireButtons" className="grid grid-cols-3 gap-3">
          <Link className="mt-3" href="https://github.com/TokyoNoire">
            <GitHubIcon fontSize="large" className="text-white" />
          </Link>
          <Link className="mt-3" href="https://tokyonoire.com/">
            <WebIcon fontSize="large" className="text-white" />
          </Link>
          <Link className="mt-3" href="https://youtu.be/biS2DXEf2As">
            <YouTubeIcon fontSize="large" className="text-white" />
          </Link>
        </div>

        <div className="relative mt-10 flex h-[550px] w-full flex-col items-center justify-center">
          <Image
            alt="tokyoNoire1"
            className="absolute"
            id="tokyoNoire1"
            src={tokyoNoire1}
            width="950"
          ></Image>
          <Image
            alt="tokyoNoire2"
            className="absolute"
            id="tokyoNoire2"
            src={tokyoNoire2}
            width="950"
          ></Image>
          <Image
            alt="tokyoNoire3"
            className="absolute"
            id="tokyoNoire3"
            src={tokyoNoire3}
            width="950"
          ></Image>
          <Image
            alt="tokyoNoire4"
            className="absolute"
            id="tokyoNoire4"
            src={tokyoNoire4}
            width="950"
          ></Image>
          <Image
            alt="tokyoNoire5"
            className="absolute"
            id="tokyoNoire5"
            src={tokyoNoire5}
            width="950"
          ></Image>
        </div>
    </>
  );
};

export default TokyoNoire;
