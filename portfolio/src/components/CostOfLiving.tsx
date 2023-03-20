import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import YouTubeIcon from "@mui/icons-material/YouTube";
import costOfLiving1 from "/public/CostOfLiving/Cost_of_Living1.jpg";
import costOfLiving2 from "/public/CostOfLiving/Cost_of_Living2.jpg";
import costOfLiving3 from "/public/CostOfLiving/Cost_of_Living3.jpg";
import costOfLiving4 from "/public/CostOfLiving/Cost_of_Living4.jpg";

const CostOfLiving = () => {
    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        gsap.fromTo(
            "#costOfLiving1",
            { x: -10000 },
            {
              x: 0,
              duration: 3,
              scrollTrigger: {
                trigger: "#costOfLiving",
                start: "top 10%",
                end: "top 5%",
                scrub: true,
              },
            }
          );
          gsap.fromTo(
            "#costOfLiving2",
            { x: 10000 },
            {
              x: 0,
              duration: 3,
              scrollTrigger: {
                trigger: "#costOfLivingDesc",
                start: "top 10%",
                end: "top 5%",
                scrub: true,
              },
            }
          );
      
          gsap.fromTo(
            "#costOfLiving3",
            { x: -10000 },
            {
              x: 0,
              duration: 3,
              scrollTrigger: {
                trigger: "#costOfLivingButton",
                start: "top 10%",
                end: "top 5%",
                scrub: true,
              },
            }
          );
      
          gsap.fromTo(
            "#costOfLiving4",
            { x: 10000 },
            {
              x: 0,
              duration: 3,
              scrollTrigger: {
                trigger: "#costOfLiving3",
                start: "top 10%",
                end: "top 5%",
                scrub: true,
              },
            }
          );
    }, []);
  
    return (
      <>
      <span id="costOfLiving" className="mb-5 font-heading uppercase text-4xl text-white overflow-hidden">
      cost of living
    </span>
    <p className="text-center font-bodyThin" id="costOfLivingDesc">
      {" "}
      A legacy project that helps people find their next home within their
      budget.
    </p>
    <Link
      className="mt-3"
      id="costOfLivingButton"
      href="https://youtu.be/iHT86r0FjlU"
    >
      <YouTubeIcon fontSize="large" />
    </Link>

    <div className="relative mt-10 flex h-[550px] w-full flex-col items-center justify-center">
      <Image
        alt="costOfLiving1"
        className="absolute"
        id="costOfLiving1"
        src={costOfLiving1}
        priority
      ></Image>
      <Image
        alt="costOfLiving2"
        className="absolute"
        id="costOfLiving2"
        src={costOfLiving2}
      ></Image>
      <Image
        alt="costOfLiving3"
        className="absolute"
        id="costOfLiving3"
        src={costOfLiving3}
      ></Image>
      <Image
        alt="costOfLiving4"
        className="absolute"
        id="costOfLiving4"
        src={costOfLiving4}
      ></Image>
    </div>
      </>
    );
  };
  
  export default CostOfLiving;
  