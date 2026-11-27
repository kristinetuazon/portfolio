import { useRef } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Onigiri, { chompTransform } from "../components/Onigiri";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { useT } from "../i18n";

/** "This page got eaten": a bitten onigiri and a few stray grains of rice. */
const NotFound: NextPage = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const chomps = [0, 1].map((i) => ({
        i,
        s: 0,
        parts: [...document.querySelectorAll<SVGGElement>(`.nf-onigiri .onigiri-chomp-${i}`)],
      }));
      const draw = (c: (typeof chomps)[number]) =>
        c.parts.forEach((g) => g.setAttribute("transform", chompTransform(c.i, c.s)));
      chomps.forEach(draw);

      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".nf-onigiri", { y: -80, opacity: 0, duration: 0.7, ease: "bounce.out" });
      // Two bites, each with a little squash.
      chomps.forEach((c) => {
        tl.to(c, { s: 1, duration: 0.18, ease: "power3.out", onUpdate: () => draw(c) }, "+=0.25");
        tl.to(
          ".nf-onigiri .onigiri-body",
          {
            scaleY: 0.92,
            scaleX: 1.05,
            svgOrigin: "50 90",
            duration: 0.09,
            yoyo: true,
            repeat: 1,
          },
          "<",
        );
        // Half the grains fall with each bite.
        tl.from(
          `.nf-crumb:nth-child(${c.i ? "even" : "odd"})`,
          { y: -30, opacity: 0, duration: 0.5, stagger: 0.04, ease: "bounce.out" },
          "<",
        );
      });
      tl.from(".nf-text > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2");
    },
    { scope: root },
  );

  return (
    <>
      <Head>
        <title>{`${t.notFound.title} · kristineCodes;`}</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main
        ref={root}
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-charcoal px-6 py-20 text-center"
      >
        <div className="relative">
          <Onigiri kind="classic" bitten className="nf-onigiri h-48 w-48 sm:h-56 sm:w-56" />
          {/* Grains of rice that fell off */}
          <div className="nf-crumbs" aria-hidden="true">
            {[-58, -30, 34, 60, 82].map((x, i) => (
              <span
                key={i}
                className="nf-crumb"
                style={{ "--x": `${x}px`, "--r": `${i * 47}deg` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
        <div className="nf-text mt-10">
          <p className="font-audreyMedium text-sm uppercase tracking-widest text-orange">404</p>
          <h1 className="mt-2 font-heading text-3xl uppercase tracking-widest text-white sm:text-4xl">
            {t.notFound.title} <span aria-hidden="true">🍙</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md font-bodyRegularItalic text-lg text-creme">
            {t.notFound.text}
          </p>
          <p className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 font-audreyNormal text-lg uppercase tracking-widest">
            <Link href="/" className="text-white underline decoration-orange underline-offset-8">
              {t.notFound.home} →
            </Link>
            <Link
              href="/mailbox"
              locale="en"
              className="text-white underline decoration-orange underline-offset-8"
            >
              {t.notFound.mailbox} →
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default NotFound;
