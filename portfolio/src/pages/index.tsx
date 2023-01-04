import { type NextPage } from "next";
import { useEffect, useState, useCallback, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import ProgressBar from "react-progressbar-on-scroll";
import picture1 from "/public/DSCF0639.jpg";
import picture2 from "/public/IMG_0536.jpg";
import picture4 from "/public/reload.jpg";
import picture5 from "/public/DSCF0609.jpg";
import picture6 from "/public/GP_3_TokyoNoire_eedited.jpeg";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NavBar from "../components/NavBar";
import WebIcon from "@mui/icons-material/Web";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import odango from "/public/dango-svgrepo-com.svg";
import onigiri from "/public/rice-ball-svgrepo-com.svg";
import studyHero1 from "/public/StudyHero/StudyHero1.jpg";
import studyHero2 from "/public/StudyHero/StudyHero2.jpg";
import studyHero3 from "/public/StudyHero/StudyHero3.jpg";
import studyHero4 from "/public/StudyHero/StudyHero4.jpg";
import studyHero5 from "/public/StudyHero/StudyHero5.jpg";
import studyHero6 from "/public/StudyHero/StudyHero6.jpg";
import YouTube, { YouTubeProps } from "react-youtube";
import costOfLiving1 from "/public/CostOfLiving/Cost_of_Living1.jpg";
import costOfLiving2 from "/public/CostOfLiving/Cost_of_Living2.jpg";
import costOfLiving3 from "/public/CostOfLiving/Cost_of_Living3.jpg";
import costOfLiving4 from "/public/CostOfLiving/Cost_of_Living4.jpg";
import minimize1 from "public/Minimize/Minimize1.jpeg";
import minimize2 from "public/Minimize/Minimize2.jpeg";
import minimize3 from "public/Minimize/Minimize3.jpeg";
import minimize4 from "public/Minimize/Minimize4.jpeg";
import minimize5 from "public/Minimize/Minimize5.jpeg";
import tokyoNoire1 from "public/TokyoNoire/TokyoNoire1.jpeg";
import tokyoNoire2 from "public/TokyoNoire/TokyoNoire2.jpeg";
import tokyoNoire3 from "public/TokyoNoire/TokyoNoire3.jpeg";
import tokyoNoire4 from "public/TokyoNoire/TokyoNoire4.jpeg";
import tokyoNoire5 from "public/TokyoNoire/TokyoNoire5.jpeg";

// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
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
        <div className="mt-36 grid h-fit grid-cols-3">
          <Image
            className="col-span-2 h-full"
            id="picture1"
            alt="picture1"
            src={picture1}
          />
          <div>
            <Image
              className="picture2 object-cover"
              alt="picture6"
              src={picture6}
            />
          </div>
          <Image className="picture3" alt="picture2" src={picture2} />
          <Image className="picture5 h-full" alt="picture5" src={picture5} />
          <Image className="picture4 h-full" alt="picture4" src={picture4} />
        </div>
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

        <p id="projects" className="mt-56 font-bodyRegularItalic">
          Introducing my
        </p>
        <span
          id="about"
          className="mb-3 text-center font-heading text-5xl tracking-widest text-white hover:tracking-wide"
        >
          Projects
        </span>
        <p className="mb-20 font-bodyRegularItalic">
          ~feel free to jump around, or go with the flow~
        </p>

        <div className="list ">
          <a
            className="item item1 font-audreyNormal uppercase"
            href="#studyhero"
          >
            <p className="text-center">⚔️</p>study hero{" "}
          </a>
          <a
            className="item item2 font-audreyNormal uppercase"
            href="#costofliving"
          >
            <p className="text-center">💳</p>cost of living
          </a>
          <a
            className="item item3 font-audreyNormal uppercase"
            href="#minimize"
          >
            <p className="text-center" id="minimizestart">
              ▫️
            </p>
            minimize
          </a>
          <a
            className="item item4 font-audreyNormal uppercase"
            href="#tokyonoire"
          >
            <p className="text-center" id="tokyonoirestart">
              🔎
            </p>
            tokyo noire
          </a>
        </div>
      </div>

      <div
        id="studyhero"
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-mint to-creme"
      >
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
        <span className="mb-5 font-heading text-5xl  text-white">
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
        <span className="mb-5 font-heading text-5xl  text-white">minimize</span>
        <p id="minimizeDesc" className="font-bodyThin">
          A tinder-style decluttering application.
        </p>
        <div id="minimizeButtons" className="grid grid-cols-3 gap-3">
          <Link
            className="mt-3"
            href="https://github.com/kristinetuazon/minimize"
          >
            <GitHubIcon fontSize="large" />
          </Link>
          <Link className="mt-3" href="https://minimize-one.vercel.app/">
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
        <p id="contact" className="font-heading text-5xl text-white">
          contact me
        </p>
        <p className="text-center font-heading text-5xl text-white">
          and let&apos;s collaborate ✨
        </p>
        <Link
          href="https://github.com/kristinetuazon"
          className="mt-10 font-bodyRegular text-xl text-white"
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
      </div>
    </>
  );
};

export default Home;
