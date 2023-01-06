import React, { useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import Image from "next/image";
import studyHero1 from "/public/StudyHero/StudyHero1.jpg";
import studyHero2 from "/public/StudyHero/StudyHero2.jpg";
import studyHero3 from "/public/StudyHero/StudyHero3.jpg";
import studyHero4 from "/public/StudyHero/StudyHero4.jpg";
import studyHero5 from "/public/StudyHero/StudyHero5.jpg";
import studyHero6 from "/public/StudyHero/StudyHero6.jpg";

const StudyHero = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#studyHero1",
      { x: -10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#minimizestart",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#studyHero2",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#tokyonoirestart",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#studyHero3",
      { x: -10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#studyhero",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#studyHero4",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#studyhero2",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#studyHero5",
      { x: -10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#studyhero3",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#studyHero6",
      { x: 10000 },
      {
        x: 0,
        duration: 3,
        scrollTrigger: {
          trigger: "#studyHero5",
          start: "top 10%",
          end: "top 5%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <span
        id="studyhero2"
        className="mt-36 mb-5 font-heading text-5xl text-white"
      >
        study hero
      </span>
      <p className="font-bodyThin">
        A gamified pomodoro web application for game-lovers.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Link
          id="studyhero3"
          className="mt-3 mb-5"
          href="https://github.com/Ghost-Pepper-Greenfield/study-hero"
        >
          <GitHubIcon fontSize="large" />
        </Link>
        <Link className="mt-3" href="https://youtu.be/W3A1CalxAh8">
          <YouTubeIcon fontSize="large" />
        </Link>
      </div>

      <div className="relative mt-10 flex h-[550px] w-full flex-col items-center justify-center">
        <Image
          alt="studyHero1"
          className="absolute"
          id="studyHero1"
          src={studyHero1}
        ></Image>
        <Image
          alt="studyHero2"
          className="absolute"
          id="studyHero2"
          src={studyHero2}
        ></Image>
        <Image
          alt="studyHero3"
          className="absolute"
          id="studyHero3"
          src={studyHero3}
        ></Image>
        <Image
          alt="studyHero4"
          className="absolute"
          id="studyHero4"
          src={studyHero4}
        ></Image>
        <Image
          alt="studyHero5"
          className="absolute"
          id="studyHero5"
          src={studyHero5}
        ></Image>
        <Image
          alt="studyHero6"
          className="absolute"
          id="studyHero6"
          src={studyHero6}
        ></Image>
      </div>
    </>
  );
};

export default StudyHero;
