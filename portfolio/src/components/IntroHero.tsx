import { useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion, SplitText, useGSAP } from "../lib/gsap";
import odango from "../../public/dango-svgrepo-com.svg";
import onigiri from "../../public/rice-ball-svgrepo-com.svg";

/** First screen: bouncy name, a dango you can poke, and a nudge to scroll. */
const IntroHero = () => {
  const root = useRef<HTMLElement>(null);
  const dango = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;

      // Letters drop in like jelly, one after another.
      const split = SplitText.create(".hello", {
        type: "words,chars",
        // Keep each word together so a name never breaks mid-word.
        wordsClass: "inline-block whitespace-nowrap",
        charsClass: "inline-block",
      });
      gsap
        // Put the text back together afterwards so the font's letter spacing returns.
        .timeline({ delay: 0.2, onComplete: () => split.revert() })
        .from(".hero-dango", {
          y: -120,
          scale: 0.4,
          opacity: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.5)",
        })
        .from(
          split.chars,
          {
            y: -70,
            scaleY: 1.7,
            scaleX: 0.6,
            opacity: 0,
            duration: 0.9,
            ease: "elastic.out(1.2, 0.45)",
            stagger: 0.035,
            transformOrigin: "50% 100%",
          },
          "-=0.7",
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, ease: "back.out(2)" }, "-=0.4");

      // Then the dango just bobs gently.
      gsap.to(".hero-dango-img", {
        y: -10,
        rotate: -4,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root },
  );

  // Poke the dango and it wobbles.
  const wobble = () => {
    if (reducedMotion() || !dango.current) return;
    gsap.fromTo(
      dango.current,
      { scaleX: 1.25, scaleY: 0.8 },
      { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1.3, 0.3)", overwrite: true },
    );
  };

  return (
    <section
      ref={root}
      id="hi"
      className="flex min-h-screen w-screen flex-col items-center justify-center bg-charcoal px-4 pb-10 pt-24"
    >
      <button
        ref={dango}
        type="button"
        onClick={wobble}
        onMouseEnter={wobble}
        className="hero-dango"
        aria-label="Poke the dango"
      >
        <Image className="hero-dango-img" alt="" height={200} src={odango} priority />
      </button>

      <h1 className="hello mt-10 text-center font-audreyMedium text-3xl uppercase text-white">
        <span className="font-bodyRegular text-5xl">{"<"}</span> Hi, my name is Kristine{" "}
        <span className="font-bodyRegular text-5xl">{"/>"}</span>
      </h1>
      <p className="hero-sub mt-4 max-w-xl text-center font-bodyThin text-2xl text-white">
        and I&apos;m a software engineer at{" "}
        <a
          href="https://lazuli.ninja/"
          className="font-bodyRegular decoration-orange underline-offset-4 hover:underline"
        >
          Lazuli
        </a>
        , based in Yokohama, Japan.
      </p>

      <div id="scroll-title" className="mt-28 font-audreyNormal uppercase text-mint">
        Scroll
      </div>
      <div className="gelatine flex flex-col items-center" aria-hidden="true">
        {[10, 20, 30].map((h) => (
          <Image key={h} alt="" className="mt-2 rotate-180" height={h} src={onigiri} />
        ))}
      </div>
    </section>
  );
};

export default IntroHero;
