import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gsap, reveal, ScrollTrigger, useGSAP } from "../lib/gsap";
import { projects } from "../data/projects";
import NavBar from "../components/NavBar";
import ScrollProgress from "../components/ScrollProgress";
import Hero from "../components/Hero";
import ProjectNavBar from "../components/ProjectNavBar";
import Project from "../components/Project";
import ContactMe from "../components/ContactMe";
import odango from "../../public/dango-svgrepo-com.svg";
import onigiri from "../../public/rice-ball-svgrepo-com.svg";

const Home: NextPage = () => {
  useGSAP(() => {
    // Highlight every <span> as it scrolls past the middle of the screen.
    gsap.utils.toArray<HTMLElement>("span").forEach((span) => {
      ScrollTrigger.create({ trigger: span, start: "top center", toggleClass: "active" });
    });

    reveal("#portfolio1", "scale", "#portfolio", { start: "top 60%", end: "top 40%" });
    reveal("#about1", "left", "#about1");
    reveal("#about2", "right", "#about1");
    reveal("#about3", "scale", "#about2", { start: "top 60%", end: "top 40%" });
    reveal("#about4", "left", "#about3");
    reveal("#about5", "right", "#about4");
    reveal("#about6", "scale", "#about6", { start: "top 60%", end: "top 40%" });
    reveal("#about7", "left", "#about6");
  });

  return (
    <>
      <Head>
        <title>kristineCodes;</title>
        <meta name="description" content="Kristine's digital portfolio." />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />

      <ScrollProgress />
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <p id="name" className="mt-20 text-center  text-3xl">
          <Image
            alt="Dango logo"
            height="200"
            src={odango}
            id="dango"
            priority
            sizes="(max-height: 200px) 100vw,
              (max-height: 200px) 50vw,
              33vw"
          ></Image>
        </p>
        <h1
          id="start"
          className="mt-10 text-center font-audreyMedium text-3xl uppercase text-white overflow-hidden"
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
            alt=""
            className="mt-2 rotate-180"
            height="10"
            src={onigiri}
          ></Image>
          <Image
            alt=""
            className="mt-2 rotate-180"
            height="20"
            src={onigiri}
          ></Image>
          <Image
            alt=""
            className="mt-2 rotate-180"
            height="30"
            src={onigiri}
          ></Image>
        </div>
      </div>
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <Hero />
      </div>
      <div className="flex w-screen flex-col items-center justify-center bg-charcoal">
        <p className="mt-20 font-audreyMediumOblique uppercase text-white">
          <br />
          <br />
          And this is my
        </p>

        <h1
          id="portfolio"
          className="mb-10 font-heading uppercase text-4xl tracking-widest text-white overflow-hidden"
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
          className="mb-3 font-heading uppercase text-4xl tracking-widest text-white overflow-hidden"
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

      {projects.map((project, i) => (
        <Project key={project.id} project={project} isFirst={i === 0} />
      ))}
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-charcoal to-charcoal">
        <ContactMe />
      </div>
    </>
  );
};

export default Home;
