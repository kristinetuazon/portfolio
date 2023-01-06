import { type NextPage } from "next";
import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import ProgressBar from "react-progressbar-on-scroll";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import StudyHero from "../components/StudyHero";
import CostOfLiving from "../components/CostOfLiving";
import Minimize from "../components/Minimize";
import TokyoNoire from "../components/TokyoNoire";
import ContactMe from "../components/ContactMe";
import odango from "/public/dango-svgrepo-com.svg";
import onigiri from "/public/rice-ball-svgrepo-com.svg";
import YouTube, { YouTubeProps } from "react-youtube";
import ProjectNavBar from "../components/ProjectNavBar";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      "#portfolio1",
      { scale: 0 },
      {
        scale: 1,
        duration: 3,
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
    gsap.utils.toArray("span").forEach((span) => {
      ScrollTrigger.create({
        // @ts-expect-error gsap utils
        trigger: span,
        start: "top center",
        // toggleClass: "active",
        // @ts-expect-error gsap utils
        onEnter: () => span.classList.add("active"),
      });
    });

    gsap.fromTo(
      "#about1",
      { x: -10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#about1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#about2",
      { x: 10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#about1",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#about3",
      { scale: 0 },
      {
        scale: 1,
        duration: 3,
        scrollTrigger: {
          trigger: "#about2",
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#about4",
      { x: -10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#about3",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#about5",
      { x: 10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#about4",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#about6",
      { scale: 0 },
      {
        scale: 1,
        duration: 3,
        scrollTrigger: {
          trigger: "#about6",
          start: "top 60%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      "#about7",
      { x: -10000 },
      {
        x: 0,
        duration: 9,
        scrollTrigger: {
          trigger: "#about6",
          start: "top 60%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    // gsap.fromTo(
    //   "#studyHeroVideo",
    //   { scale: 0 },
    //   {
    //     scale: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: "#studyHeroVideoPane",
    //       start: "top 40%",
    //       end: "top 30%",
    //       scrub: true,
    //       markers: true,
    //     },
    //   }
    // );

    // gsap.fromTo(
    //   "#costOfLivingVideo",
    //   { scale: 0 },
    //   {
    //     scale: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: "#costOfLivingVideoPane",
    //       start: "top 40%",
    //       end: "top 30%",
    //       scrub: true,
    //     },
    //   }
    // );

    // gsap.fromTo(
    //   "#minimizeVideo",
    //   { scale: 0 },
    //   {
    //     scale: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: "#minimizeVideoPane",
    //       start: "top 40%",
    //       end: "top 30%",
    //       scrub: true,
    //     },
    //   }
    // );

    //     gsap.fromTo(
    //   "#tokyoNoireVideo",
    //   { scale: 0 },
    //   {
    //     scale: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: "#tokyoNoireVideoPane",
    //       start: "top 40%",
    //       end: "top 30%",
    //       scrub: true,
    //     },
    //   }
    // );
  }, []);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "420",
  };

  return (
    <>
      <Head>
        <title>kristineCodes;</title>
        <meta name="description" content="Kristine's digital portfolio." />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <ProgressBar
        color="#F6FBF4"
        height={10}
        direction="right"
        position="top"
        gradient={true}
        gradientColor="#2B2129"
      />
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <p id="name" className="mt-20 text-center  text-3xl">
          <Image alt="dangoLogo" height="200" src={odango} id="dango"></Image>
        </p>
        <h1
          id="start"
          className="mt-10 text-center font-audreyMedium text-3xl uppercase text-white"
        >
          <span className="self-center font-bodyRegular text-5xl">{"<"}</span>{" "}
          Hi, my name is Kristine{" "}
          <span className="font-bodyRegular text-5xl">{"/>"}</span>
        </h1>
        <p className=" mt-3 text-center font-bodyThin  text-2xl text-white">
          and I&apos;m a full-stack software developer based in Yokohama, Japan.
        </p>
        <div
          id="scroll-title"
          className="mt-36 font-audreyNormal uppercase text-mint"
        >
          Scroll
        </div>
        <div className="gelatine flex w-screen flex-col items-center justify-center">
          <Image
            alt="onigiriArrow"
            className="mt-2 rotate-180"
            height="10"
            src={onigiri}
            id="onigiri"
          ></Image>
          <Image
            alt="onigiriArrow"
            className="mt-2 rotate-180"
            height="20"
            src={onigiri}
            id="onigiri"
          ></Image>
          <Image
            alt="onigiriArrow"
            className="mt-2 rotate-180"
            height="30"
            src={onigiri}
            id="onigiri"
          ></Image>
        </div>
      </div>
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <Hero/>
      </div>
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <p className="mt-20 font-audreyMediumOblique uppercase text-white">
          <br />
          <br />
          And this is my
        </p>

        <h1
          id="portfolio"
          className="mb-10 font-heading text-5xl tracking-widest text-white hover:tracking-wide"
        >
          port<span>·</span>​fo<span>·</span>lio
        </h1>

        <div
          id="portfolio1"
          className="mr-10 ml-10 text-center font-bodyThinItalic text-white"
        >
          <p className="decoration-orange hover:underline">
            <br />
            <span className="font-audreyMedium uppercase">NOUN:</span> a
            selection of work compiled over a period of time and used for
            assessing performance or progress
          </p>
        </div>
        <br />
      </div>

      <div className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-charcoal to-mint">
        <p className="mt-96 font-bodyRegularItalic text-white">
          It all started with a
        </p>
        <span
          id="about"
          className="mb-3 font-heading text-5xl tracking-widest text-white hover:tracking-wide"
        >
          Hello World;
        </span>
        <p className="font-bodyRegularItalic text-white">
          and I knew I was hooked.
        </p>

        <p
          id="about1"
          className="2xl:mx-96 mx-10 mt-20 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          On October 2020, I began learning how to code with the intention of
          being a <span>software engineer</span>. After a pandemic, a Javascript
          foundations course, a couple years of saving and an intensive software
          engineering course later,{" "}
          <span>
            I have created several projects that I want to share to the world
            that I said hello to.
          </span>
        </p>

        <p
          id="about2"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          As a growing software developer with a background in literature and a
          deep appreciation of art and design,{" "}
          <span>
            I wanted a space to visually and dynamically showcase and tell the
            stories of the projects that I&apos;ve been working on using the
            technologies I have learned, and continue to learn about.
          </span>
        </p>

        <p
          id="about3"
          className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-charcoal hover:tracking-wide"
        >
          {" "}
          Why programming?
        </p>

        <p
          id="about4"
          className="2xl:mx-96 mx-10 mt-10 text-center  font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          2020 was a tough year for most—the pandemic broke loose and shut down
          our societies and forced us at home. However, this surplus of time{" "}
          <span>
            got me thinking of learning something or doing something new again
          </span>
          . I did my research, and looked at my current situation at that time:
          I live in Tokyo, and I teach English to cute Japanese children. While
          I don&apos;t particularly dislike my job,{" "}
          <span>
            I always dreamed to do something creative and highly innovative
          </span>
          . So I chose to start learning how to code and found the perfect
          program for my rather unconventional schedule.
        </p>

        <p
          id="about5"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          I wanted to learn something dynamic and ever-changing, yet a highly
          well-sought skill set. I wanted to create, design, collaborate, and
          help other people in the process. I wanted to challenge myself, not to
          stay stagnant and comfortable, to seek better ways to live and be more
          flexible. I also had to come face to face with myself: my weaknesses,
          insecurities, and the reality that nothing will ever change if I
          don&apos;t do something about it.{" "}
          <span>
            In short, I wanted to do something for myself that I geniunely enjoy
            and I am passionate about.
          </span>
        </p>

        <p
          id="about6"
          className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-charcoal hover:tracking-wide"
        >
          {" "}
          What am I currently Learning?
        </p>
      </div>

      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b  from-mint to-mint leading-relaxed">
        <p
          id="about7"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          I&apos;m currently learning the ins and outs of software and web
          development in <span>JavaScript</span> and <span>Typescript</span>. I
          have dabbled with <span>Java</span> and created a server for one of my
          projects with Spring. <span>React</span> and <span>Next.js</span> are
          my frontend frameworks of choice, while I used{" "}
          <span>Express.js / PostGres / MongoDB</span> in the backend. Recently,
          I&apos;ve been playing around with animation using{" "}
          <span>GreenSock</span> and <span>generative art</span>, aka creative
          code. I&apos;m also interested in understanding Java more, in the
          context of mobile development and using <span>Kotlin</span> in the
          future.
        </p>

        <ProjectNavBar />
      </div>

      <div
        id="studyhero"
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-mint to-creme"
      >
        <StudyHero />
      </div>
      <div
        id="studyHeroVideoPane"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-creme to-creme"
      >
        <YouTube
          id="studyHeroVideo"
          className="h-ful"
          videoId="W3A1CalxAh8"
          opts={opts}
          loading={"lazy"}
          onReady={onPlayerReady}
        />
      </div>
      <div
        id="costofliving"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-creme to-coffee"
      >
        <CostOfLiving />
      </div>
      <div
        id="costOfLivingVideoPane"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-coffee to-coffee"
      >
        <YouTube
          id="costOfLivingVideo"
          className="mt-10"
          videoId="iHT86r0FjlU"
          opts={opts}
          loading={"lazy"}
          // onReady={onPlayerReady}
        />
      </div>

      <div
        id="minimize"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-coffee to-pink"
      >
        <Minimize />
      </div>
      <div
        id="minimizeVideoPane"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink to-charcoal"
      >
        <YouTube
          id="minimizeVideo"
          className="mt-10"
          videoId="w1CIF_Wsj-Y"
          opts={opts}
          loading={"lazy"}
          // onReady={onPlayerReady}
        />
      </div>

      <div
        id="tokyonoire"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal"
      >
        <TokyoNoire />
      </div>
      <div
        id="tokyoNoireVideoPane"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal"
      >
        <YouTube
          id="tokyoNoireVideo"
          className="mt-10"
          videoId="biS2DXEf2As"
          opts={opts}
          loading={"lazy"}
          // onReady={onPlayerReady}
        />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal">
        <ContactMe />
      </div>
    </>
  );
};

export default Home;
