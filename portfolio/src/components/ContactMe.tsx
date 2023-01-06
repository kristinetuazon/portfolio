import React, { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";

const ContactMe = () => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   useEffect(() => {
  //     gsap.fromTo(
  //       "#navStart",
  //       { opacity: 0.1 },
  //       {
  //         scrollTrigger: {
  //           trigger: "#name",
  //           start: "top center",
  //           end: "20% center",
  //           scrub: true,
  //         },
  //         duration: 0.8,
  //         opacity: 1,
  //         immediateRender: false,
  //       })

  //   }, [])

  return (
    <>
      <p id="contact" className="font-heading text-5xl text-white">
        contact me
      </p>
      <p className="text-center font-heading text-5xl text-white">
        and let&apos;s collaborate ✨
      </p>
      <Link
        href="https://github.com/kristinetuazon"
        className="mt-10 font-bodyRegular text-xl lowercase text-white"
      >
        <GitHubIcon /> @kristinetuazon
      </Link>

      <Link
        href="https://www.linkedin.com/in/kristinejanetuazon/"
        className="mt-5 font-bodyRegular text-xl text-white"
      >
        <LinkedInIcon /> @kristinejanetuazon
      </Link>

      <Link
        href="mailto:kristine.jane.tuazon@gmail.com"
        className="mt-5 font-bodyRegular text-xl text-white"
      >
        {" "}
        <EmailTwoToneIcon /> email
      </Link>

      <Link
        href="https://www.instagram.com/kristinetuazon/"
        className="mt-5 font-bodyRegular text-xl text-white"
      >
        <InstagramIcon /> @kristinetuazon
      </Link>
    </>
  );
};

export default ContactMe;
