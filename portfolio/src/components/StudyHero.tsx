import React, { useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import studyHero1 from "/public/StudyHero/StudyHero1.jpg";
import studyHero2 from "/public/StudyHero/StudyHero2.jpg";
import studyHero3 from "/public/StudyHero/StudyHero3.jpg";
import studyHero4 from "/public/StudyHero/StudyHero4.jpg";
import studyHero5 from "/public/StudyHero/StudyHero5.jpg";
import studyHero6 from "/public/StudyHero/StudyHero6.jpg";

gsap.registerPlugin(ScrollTrigger);





const StudyHero = () => {
    useEffect(() => {
        gsap.fromTo(
            "#studyHero1",
            { x: -10000 },
            {
              x: 0,
              duration: 3,
              scrollTrigger: {
                trigger: "#start",
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
              trigger: "#studyHero1",
              start: "top 15%",
              end: "top 10%",
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
                trigger: "#studyHero2",
                start: "top 20%",
                end: "top 15%",
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
                trigger: "#studyHero3",
                start: "top 25%",
                end: "top 20%",
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
                trigger: "#studyHero4",
                start: "top 30%",
                end: "top 25%",
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
                end: "top 30%",
                scrub: true,
              },
            }
          );
    },
    []);
  return (<>
<div className="relative flex flex-col items-center justify-center w-full h-[550px]">
   
    <Image alt="studyHero1"  className="absolute" id="studyHero1" src={studyHero1} ></Image>
    {/* <Image alt="studyHero2"  className="absolute" id="studyHero2" src={studyHero2} ></Image>
    <Image alt="studyHero3"  className="absolute" id="studyHero3" src={studyHero3} ></Image>
    <Image alt="studyHero4"  className="absolute" id="studyHero4" src={studyHero4} ></Image>
    <Image alt="studyHero5"  className="absolute" id="studyHero5" src={studyHero5} ></Image>
    <Image alt="studyHero6"  className="absolute" id="studyHero6" src={studyHero6} ></Image> */}
</div>
  </>)
};

export default StudyHero;
