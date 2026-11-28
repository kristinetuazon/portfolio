import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import OnigiriNav from "../components/OnigiriNav";
import LazyBubbles from "../components/LazyBubbles";
import BubbleCounter from "../components/BubbleCounter";
import IntroHero from "../components/IntroHero";
import LazuliSection from "../components/LazuliSection";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import HistoryTimeline from "../components/HistoryTimeline";
import OffHours from "../components/OffHours";
import ContactMe from "../components/ContactMe";
import Seo from "../components/Seo";
import { useLocale, useT } from "../i18n";
import { ogImage, PERSON, SITE_NAME, SITE_URL } from "../lib/site";

const Home: NextPage = () => {
  const t = useT();
  const locale = useLocale();

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
        className="flex min-h-screen w-screen flex-col items-center bg-gradient-to-b from-plum via-charcoal to-mint pb-40 pt-32"
      >
        <p className="font-bodyRegularItalic text-white">{t.story.startedWith}</p>
        <h2 className="mb-3 font-heading text-4xl uppercase tracking-widest text-white">
          Hello World;
        </h2>
        <p className="font-bodyRegularItalic text-white">{t.story.hooked}</p>

        <Hero />

        <HistoryTimeline />

        <Link
          href="/mailbox/why-programming"
          locale="en"
          className="mx-10 mt-36 text-center font-audreyNormal text-xl uppercase tracking-widest text-ink decoration-ink underline-offset-8 transition-[letter-spacing] hover:tracking-wide hover:underline"
        >
          {t.story.readStory}
        </Link>
      </section>

      <ProjectsSection />
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
