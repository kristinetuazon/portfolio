import { useRef } from "react";
import Image from "next/image";
import { gsap, reducedMotion, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import Dango, { BALLS, biteTransform } from "./Dango";
import NowLine from "./NowLine";
import { useT } from "../i18n";
import onigiri from "../../public/rice-ball-svgrepo-com.svg";

/** First screen: bouncy name, a dango you can poke, and a nudge to scroll. */
const IntroHero = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const dango = useRef<HTMLButtonElement>(null);

  // Scroll down a little and the top (pink) dango gets bitten; scroll back and it's whole.
  const setUpBite = () => {
    const btn = dango.current;
    if (!btn) return;
    const parts = btn.querySelectorAll<SVGGElement>(".dango-bite");
    const pink = btn.querySelector(".dango-ball-0");
    const bite = { s: 0 };
    const draw = () => parts.forEach((g) => g.setAttribute("transform", biteTransform(bite.s)));
    const setBitten = (on: boolean) => {
      if (reducedMotion()) {
        bite.s = on ? 1 : 0;
        draw();
        return;
      }
      gsap.to(bite, {
        s: on ? 1 : 0,
        duration: on ? 0.2 : 0.45,
        ease: on ? "back.out(2.4)" : "power2.inOut",
        onUpdate: draw,
        overwrite: true,
      });
      if (!on) return;
      const { cx, cy } = BALLS[0]!;
      gsap.fromTo(
        pink,
        { scaleX: 1.1, scaleY: 0.88, svgOrigin: `${cx} ${cy}` },
        { scaleX: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1.2, 0.35)" },
      );
      for (let i = 0; i < 5; i++) {
        const crumb = document.createElement("span");
        crumb.className = "mochi-crumb";
        btn.appendChild(crumb);
        gsap.fromTo(
          crumb,
          { x: 0, y: 0, opacity: 1, scale: gsap.utils.random(0.6, 1.2) },
          {
            x: gsap.utils.random(-30, 6),
            y: gsap.utils.random(30, 60),
            opacity: 0,
            duration: gsap.utils.random(0.6, 0.9),
            ease: "power2.in",
            delay: i * 0.03,
            onComplete: () => crumb.remove(),
          },
        );
      }
    };
    // Bitten when the dango's top nears the top of the screen, so the pink ball is
    // still in view (below the phone nav pill) when it happens.
    ScrollTrigger.create({
      start: () => Math.max(60, btn.offsetTop - 40), // layout position, ignoring the drop-in animation
      onEnter: () => setBitten(true),
      onLeaveBack: () => setBitten(false),
    });
  };

  useGSAP(
    () => {
      setUpBite();
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

  // Poke a dango and it squishes; the others jiggle after it, like soft mochi.
  const jiggle = (
    e: React.MouseEvent<HTMLButtonElement> | React.PointerEvent<HTMLButtonElement>,
  ) => {
    const btn = dango.current;
    if (reducedMotion() || !btn) return;
    const svg = btn.querySelector("svg")!;
    const rect = svg.getBoundingClientRect();
    // Which ball is nearest the pointer (keyboard presses poke the middle one).
    let hit = 1;
    if (e.clientX || e.clientY) {
      const px = ((e.clientX - rect.left) / rect.width) * 200;
      const py = ((e.clientY - rect.top) / rect.height) * 200;
      const d = BALLS.map(({ cx, cy }) => Math.hypot(cx - px, cy - py));
      hit = d.indexOf(Math.min(...d));
    }
    BALLS.forEach(({ cx, cy }, i) => {
      const dist = Math.abs(i - hit);
      const amount = dist === 0 ? 0.22 : dist === 1 ? 0.11 : 0.06;
      gsap.fromTo(
        btn.querySelector(`.dango-ball-${i}`),
        { scaleX: 1 + amount, scaleY: 1 - amount, svgOrigin: `${cx} ${cy}` },
        {
          scaleX: 1,
          scaleY: 1,
          duration: 1,
          ease: "elastic.out(1.4, 0.28)",
          delay: dist * 0.08,
          overwrite: "auto",
        },
      );
    });
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
        onClick={jiggle}
        onPointerEnter={(e) => e.pointerType === "mouse" && jiggle(e)}
        className="hero-dango"
        aria-label={t.intro.poke}
      >
        <Dango className="hero-dango-img h-[200px] w-[200px]" />
      </button>

      <h1 className="hello mt-10 text-center font-audreyMedium text-3xl uppercase text-white">
        <span className="font-bodyRegular text-5xl">{"<"}</span> {t.intro.hello}{" "}
        <span className="font-bodyRegular text-5xl">{"/>"}</span>
      </h1>
      <p className="hero-sub mt-4 max-w-xl text-center font-bodyThin text-2xl text-white">
        {t.intro.sub}
      </p>
      <NowLine />

      <div id="scroll-title" className="mt-28 font-audreyNormal uppercase text-mint">
        {t.intro.scroll}
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
