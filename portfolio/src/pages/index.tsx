import { type NextPage } from "next";
import Head from "next/head";
import { gsap, reveal, ScrollTrigger, useGSAP } from "../lib/gsap";
import DangoNav from "../components/DangoNav";
import IntroHero from "../components/IntroHero";
import LazuliSection from "../components/LazuliSection";
import Hero from "../components/Hero";
import EarlierWork from "../components/EarlierWork";
import ContactMe from "../components/ContactMe";

const Home: NextPage = () => {
  useGSAP(() => {
    // In the story, highlight key phrases as they scroll past the middle of the screen.
    gsap.utils.toArray<HTMLElement>(".story span").forEach((span) => {
      ScrollTrigger.create({ trigger: span, start: "top center", toggleClass: "active" });
    });

    reveal("#about1", "left", "#about1");
    reveal("#about2", "right", "#about1");
    reveal("#about3", "scale", "#about2", { start: "top 60%", end: "top 40%" });
    reveal("#about4", "left", "#about3");
    reveal("#about5", "right", "#about4");
  });

  return (
    <>
      <Head>
        <title>kristineCodes;</title>
        <meta
          name="description"
          content="Kristine Tuazon, software engineer at Lazuli in Japan: portfolio and blog."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <DangoNav />
      <IntroHero />
      <LazuliSection />

      <section
        id="about"
        className="story flex min-h-screen w-screen flex-col items-center bg-gradient-to-b from-[#3a2d37] via-charcoal to-mint pb-40 pt-32"
      >
        <p className="font-bodyRegularItalic text-white">It all started with a</p>
        <h2 className="mb-3 font-heading text-4xl uppercase tracking-widest text-white">
          Hello World;
        </h2>
        <p className="font-bodyRegularItalic text-white">and I knew I was hooked.</p>

        <Hero />

        <p
          id="about1"
          className="2xl:mx-96 mx-10 mt-20 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          On October 2020, I began learning how to code with the intention of being a{" "}
          <span>software engineer</span>. After a pandemic, a Javascript foundations course, a
          couple years of saving and an intensive software engineering course later,{" "}
          <span>
            I have created several projects that I want to share to the world that I said hello to.
          </span>
        </p>

        <p
          id="about2"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          As a growing software developer with a background in literature and a deep appreciation of
          art and design,{" "}
          <span>
            I wanted a space to visually and dynamically showcase and tell the stories of the
            projects that I&apos;ve been working on using the technologies I have learned, and
            continue to learn about.
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
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          2020 was a tough year for most—the pandemic broke loose and shut down our societies and
          forced us at home. However, this surplus of time{" "}
          <span>got me thinking of learning something or doing something new again</span>. I did my
          research, and looked at my current situation at that time: I live in Tokyo, and I teach
          English to cute Japanese children. While I don&apos;t particularly dislike my job,{" "}
          <span>I always dreamed to do something creative and highly innovative</span>. So I chose
          to start learning how to code and found the perfect program for my rather unconventional
          schedule.
        </p>

        <p
          id="about5"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          I wanted to learn something dynamic and ever-changing, yet a highly well-sought skill set.
          I wanted to create, design, collaborate, and help other people in the process. I wanted to
          challenge myself, not to stay stagnant and comfortable, to seek better ways to live and be
          more flexible. I also had to come face to face with myself: my weaknesses, insecurities,
          and the reality that nothing will ever change if I don&apos;t do something about it.{" "}
          <span>
            In short, I wanted to do something for myself that I geniunely enjoy and I am passionate
            about.
          </span>
        </p>
      </section>

      <EarlierWork />

      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center bg-charcoal"
      >
        <ContactMe />
      </section>
    </>
  );
};

export default Home;
