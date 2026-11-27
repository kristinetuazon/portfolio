import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gsap, reveal, ScrollTrigger, useGSAP } from "../lib/gsap";
import OnigiriNav from "../components/OnigiriNav";
import LazyBubbles from "../components/LazyBubbles";
import BubbleCounter from "../components/BubbleCounter";
import IntroHero from "../components/IntroHero";
import LazuliSection from "../components/LazuliSection";
import Hero from "../components/Hero";
import EarlierWork from "../components/EarlierWork";
import OffHours from "../components/OffHours";
import ContactMe from "../components/ContactMe";
import Seo from "../components/Seo";
import { useLocale, useT } from "../i18n";
import { ogImage, PERSON, SITE_NAME, SITE_URL } from "../lib/site";

const Home: NextPage = () => {
  const t = useT();
  const locale = useLocale();
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
      <Seo
        title={t.meta.title}
        description={t.meta.description}
        path="/"
        locale={locale}
        hasJapanese
        image={ogImage()}
        imageAlt={t.meta.imageAlt}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            { ...PERSON, description: t.meta.description },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: SITE_URL,
              inLanguage: ["en", "ja"],
              author: { "@id": PERSON["@id"] },
            },
          ],
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <OnigiriNav />
      <LazyBubbles />
      <BubbleCounter />
      <IntroHero />
      <LazuliSection />

      <section
        id="about"
        className="story flex min-h-screen w-screen flex-col items-center bg-gradient-to-b from-plum via-charcoal to-mint pb-40 pt-32"
      >
        <p className="font-bodyRegularItalic text-white">{t.story.startedWith}</p>
        <h2 className="mb-3 font-heading text-4xl uppercase tracking-widest text-white">
          Hello World;
        </h2>
        <p className="font-bodyRegularItalic text-white">{t.story.hooked}</p>

        <Hero />

        <p
          id="about1"
          className="2xl:mx-96 mx-10 mt-20 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          {t.story.p1.before}
          <span>{t.story.p1.highlight}</span>
          {t.story.p1.middle}
          <span>{t.story.p1.highlight2}</span>
        </p>

        <p
          id="about2"
          className="2xl:mx-96 mx-10 mt-10 text-center font-bodyRegular leading-relaxed text-white md:mx-36 lg:mx-60 xl:mx-72"
        >
          {t.story.p2.before}
          <span>{t.story.p2.highlight}</span>
        </p>

        <Link
          href="/mailbox/why-programming"
          locale="en"
          className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-ink decoration-ink underline-offset-8 transition-[letter-spacing] hover:tracking-wide hover:underline"
        >
          {t.story.readStory}
        </Link>
      </section>

      <EarlierWork />
      <OffHours />

      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center bg-charcoal px-4 py-24 md:pr-28"
      >
        <ContactMe />
      </section>
    </>
  );
};

export default Home;
