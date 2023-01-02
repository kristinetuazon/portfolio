import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ProgressBar from "react-progressbar-on-scroll";
import picture1 from "/public/DSCF0571.jpg";
import picture2 from "/public/DSCF0576.jpg";
import picture4 from "/public/DSCF0609.jpg";
import picture5 from "/public/DSCF0639.jpg";
import picture6 from "/public/DSCF0598.jpg";
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NavBar from "../components/NavBar";
import WebIcon from '@mui/icons-material/Web';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import odango from '/public/dango-svgrepo-com.svg'


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
  }, []);

  return (
    <>
      <Head>
        <title>kristine&apos;s portfolio</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <ProgressBar
        color="#DD8E58"
        height={10}
        direction="right"
        position="top"
        gradient={true}
        gradientColor="#2B2129"
      />
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <p id="name" className="mt-20 text-center  text-3xl">
          <Image alt="dangoLogo" height="300" src={odango} id="dango"></Image>
        </p>
        <h1
          id="start"
          className="mt-10 text-center font-audreyMedium text-3xl uppercase text-white"
        >
         <span className="text-5xl self-center font-bodyRegular">{"<"}</span> Hi, my name is Kristine <span className="text-5xl font-bodyRegular">{"/>"}</span>
        </h1>
        <p className=" mt-3 text-center font-bodyThin  text-2xl text-white">
          and I&apos;m a full-stack software developer based in Yokohama, Japan.
        </p>
        <div id="scroll-title" className="mt-36 text-mint">
          Scroll
        </div>
        <div id="scroll-down"></div>
      </div>
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <div className="mt-36 grid grid-cols-3">
          <Image
            className="col-span-2 grid h-full"
            id="picture1"
            alt="picture1"
            src={picture1}
          />
          <Image className="picture2" alt="picture6" src={picture6} />
          <Image className="picture3" alt="picture2" src={picture2} />
          <Image className="picture5" alt="picture5" src={picture5} />
          <Image className="picture4" alt="picture4" src={picture4} />
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
          port·​fo·​lio
        </h1>

        <div
          id="portfolio1"
          className="mr-10 ml-10 text-center font-bodyThinItalic text-white"
        >
          <p className="decoration-coffee hover:line-through">
            1 : a hinged cover or flexible case for carrying loose papers,
            pictures, or pamphlets
          </p>
          <br />
          <p className="decoration-mint hover:line-through">
            2 [from the use of such a case to carry documents of state] : the
            office and functions of a minister of state or member of a cabinet
          </p>
          <br />
          <p className="decoration-creme hover:line-through">
            3 : the securities held by an investor : the commercial paper held
            by a financial house (such as a bank)
          </p>
          <br />
          <p className="decoration-white hover:line-through">
            4 : a set of pictures (such as drawings or photographs) usually
            bound in book form or loose in a folder
          </p>
          <p className="decoration-orange hover:underline">
            <br />5 : a selection of work compiled over a period of time and
            used for assessing performance or progress
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

        <p id="about1" className="2xl:mx-96 mx-10 mt-20 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72">
          On October 2020, I began learning how to code with the intention of
          being a <span>software engineer</span>. After a pandemic, a Javascript
          foundations course, a couple years of saving and an intensive software
          engineering course later,{" "}
          <span>
            I have created several projects that I want to share to the world
            that I said hello to.
          </span>
        </p>

        <p id="about2" className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72">
          As a growing software developer with a background in literature and a
          deep appreciation of art and design,{" "}
          <span>
            I wanted a space to visually and dynamically showcase and tell the
            stories of the projects that I&apos;ve been working on using the
            technologies I have learned, and continue to learn about.
          </span>
        </p>

        <p id="about3" className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-charcoal hover:tracking-wide">
          {" "}
          Why programming?
        </p>

        <p id="about4" className="2xl:mx-96 mx-10 mt-10 text-center  font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72">
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

        <p id="about5"className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72">
          I wanted to learn something dynamic and ever-changing, yet a highly
          well-sought skill set. I wanted to create, design, collaborate, and
          help other people in the process. I wanted to challenge myself, not to
          stay stagnant and comfortable, to seek better ways to live and be more
          flexible. I also had to come face to face with myself: my weaknesses,
          insecurities, and the reality that nothing will ever change if I don&apos;t
          do something about it.{" "}
          <span>
            In short, I wanted to do something for myself that I geniunely enjoy
            and I am passionate about.
          </span>
        </p>

        <p id="about6"className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-charcoal hover:tracking-wide">
          {" "}
          What am I currently Learning?
        </p>
      </div>

      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b  from-mint to-mint leading-relaxed">
        <p id="about7" className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular text-white md:mx-36 lg:mx-60 xl:mx-72">
          I&apos;m currently learning the ins and outs of software and web development
          in <span>JavaScript</span> and <span>Typescript</span>. I have dabbled
          with <span>Java</span> and created a server for one of my projects
          with Spring. <span>React</span> and <span>Next.js</span> are my
          frontend frameworks of choice, while I used{" "}
          <span>Express.js / PostGres / MongoDB</span> in the backend. Recently,
          I&apos;ve been playing around with animation using{" "}
          <span>GreenSock</span> and <span>generative art</span>, aka creative
          code. I&apos;m also interested in understanding Java more, in
          the context of mobile development and using <span>Kotlin</span> in the
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
            <p className="text-center">▫️</p>minimize
          </a>
          <a
            className="item item4 font-audreyNormal uppercase"
            href="#tokyonoire"
          >
            <p className="text-center">🕵🏼</p>tokyo noire
          </a>
        </div>
      </div>

      <div
        id="studyhero"
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-mint to-creme"
      >
        <span className="mb-5 font-heading text-5xl text-white">study hero</span>
        <p className="font-bodyThin">
          A gamified pomodoro web application for game-lovers.
        </p>

        <Link  className="mt-3" href="https://github.com/Ghost-Pepper-Greenfield/study-hero"><GitHubIcon fontSize="large"/></Link>
      </div>

      <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-creme to-creme"></div>

      <div
        id="costofliving"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-creme to-coffee"
      >
        <span className="mb-5 font-heading text-5xl  text-white">cost of living</span>
        <p className="text-center font-bodyThin">
          {" "}
          A legacy project that helps people find their next home within their
          budget.
        </p>
      </div>
      <div
        id="minimize"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-coffee to-orange"
      >
        <span className="mb-5 font-heading text-5xl  text-white">minimize</span>
        <p className="font-bodyThin">
          A tinder-style decluttering application.
        </p>
        <div className="grid grid-cols-2 gap-3">
        <Link  className="mt-3" href="https://github.com/kristinetuazon/minimize"><GitHubIcon fontSize="large"/></Link>
        <Link  className="mt-3" href="https://minimize-one.vercel.app/"><WebIcon fontSize="large"/></Link>
        </div>
      </div>
      <div
        id="tokyonoire"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange to-orange"
      >
        <span className="mb-5 font-heading text-5xl  text-white">tokyo noire</span>
        <p className="text-center font-bodyThin">
          A geo-location, narrative based game platform and editor.
        </p>
        <div className="grid grid-cols-2 gap-3">
        <Link  className="mt-3" href="https://github.com/TokyoNoire"><GitHubIcon fontSize="large"/></Link>
        <Link  className="mt-3" href="https://tokyonoire.com/"><WebIcon fontSize="large"/></Link>
        </div>
      </div>

      <div
        id="tokyonoire"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange to-charcoal"
      ></div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal">
        <p id="contact" className="font-heading text-5xl text-white">
          contact me
        </p>
        <p className="text-center font-heading text-5xl text-white">
          and let&apos;s collaborate ✨
        </p>
        <Link href="https://github.com/kristinetuazon" className="mt-10 font-bodyRegular text-xl text-white"><GitHubIcon/> @kristinetuazon</Link>
        <Link href="https://www.linkedin.com/in/kristinejanetuazon/" className="mt-5 font-bodyRegular text-xl text-white"><LinkedInIcon/> @kristinejanetuazon</Link>
        <Link href="mailto:kristine.jane.tuazon@gmail.com" className="mt-5 font-bodyRegular text-xl text-white"> <EmailTwoToneIcon/> email</Link>
        <Link href="https://www.instagram.com/kristinetuazon/" className="mt-5 font-bodyRegular text-xl text-white"><InstagramIcon/> @kristinetuazon</Link>
      </div>
    </>
  );
};

export default Home;
