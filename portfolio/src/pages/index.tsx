import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gsap, reveal, ScrollTrigger, useGSAP } from "../lib/gsap";
import OnigiriNav from "../components/OnigiriNav";
import SoapBubbles from "../components/SoapBubbles";
import BubbleCounter from "../components/BubbleCounter";
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
  });

  return (
    <>
      <Head>
        <title>kristineCodes;</title>
        <meta
          name="description"
          content="Kristine Tuazon, software engineer at Lazuli in Japan: portfolio and mailbox."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <OnigiriNav />
      <SoapBubbles />
      <BubbleCounter />
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

        <Link
          href="/mailbox/why-programming"
          className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-charcoal decoration-charcoal underline-offset-8 transition-[letter-spacing] hover:tracking-wide hover:underline"
        >
          Why programming? Read the story →
        </Link>
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
