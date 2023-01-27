import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import picture1 from "/public/DSCF0639.jpg";
import picture2 from "/public/IMG_0536.jpg";
import picture4 from "/public/reload.jpg";
import picture5 from "/public/DSCF0609.jpg";
import picture6 from "/public/GP_3_TokyoNoire_eedited.jpeg";
import Image from "next/image";

const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.fromTo(
      "#picture1",
      { x: -10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#picture1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".picture2",
      { x: 10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#picture1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".picture3",
      { x: -10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#picture1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".picture5",
      { x: 10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#picture1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".picture4",
      { scale: 0 },
      {
        scale: 1,
        duration: 9,
        scrollTrigger: {
          trigger: "#picture1",
          start: "top 50%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div className="mt-36 grid h-fit grid-cols-3">
        <Image
          className="col-span-2 h-full"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          id="picture1"
          alt="picture1"
          src={picture1}
          priority
          placeholder="blur"
        />
        <div>
          <Image
            className="picture2 object-cover"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="picture6"
            src={picture6}
            priority
            placeholder="blur"
          />
        </div>
        <Image
          className="picture3"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="picture2"
          src={picture2}
          priority
          placeholder="blur"
        />
        <Image
          className="picture5 h-full"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="picture5"
          src={picture5}
          priority
          placeholder="blur"
        />
        <Image
          className="picture4 h-full"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt="picture4"
          src={picture4}
          priority
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default Hero;
