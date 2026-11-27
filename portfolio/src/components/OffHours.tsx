import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import camera from "../../public/DSCF0571.jpg";
import walking from "../../public/DSCF0598.jpg";

type Item = {
  title: string;
  text?: string;
  /** A photo makes it a polaroid; otherwise it's a paper note with an emoji. */
  photo?: { src: StaticImageData; alt: string };
  emoji?: string;
  /** Show the little Yamanote-line loop. */
  loop?: boolean;
  tilt: number; // degrees
  tape: string; // washi tape color
};

const ITEMS: Item[] = [
  {
    photo: {
      src: camera,
      alt: "Kristine taking a photo with a film camera on an old wooden street",
    },
    title: "Photos & videos",
    text: "Taking photos and videos. Lately: wedding photos for friends.",
    tilt: -3,
    tape: "#f2a7b6",
  },
  {
    emoji: "🎬",
    title: "Quiet vlogs",
    text: "Small, non-talking vlogs. Maybe a future YouTube channel?",
    tilt: 1.5,
    tape: "#708a81",
  },
  {
    emoji: "💌",
    title: "Wedding invites",
    text: "Making wedding invitations for friends, too.",
    tilt: 2.5,
    tape: "#a3c46f",
  },
  {
    emoji: "✉️",
    title: "Letters, journals & scrapbooks",
    text: "Handwritten letters, journaling and scrapbooking (yes, like this page).",
    tilt: -1.5,
    tape: "#f6c177",
  },
  {
    photo: { src: walking, alt: "Kristine walking away down a narrow stone alley" },
    title: "Long walks",
    text: "Recently walked the whole Yamanote line loop, all 30 stations.",
    loop: true,
    tilt: 2,
    tape: "#9acd32",
  },
  {
    emoji: "🎨",
    title: "Painting & cross-stitch",
    text: "My most complicated patterns so far: Van Gogh's Sunflowers and Two Women in a Boat.",
    tilt: -2.5,
    tape: "#c88e95",
  },
  {
    emoji: "🧵",
    title: "Sewing",
    text: "My COVID hobby. Currently in need of a new sewing machine.",
    tilt: 1.5,
    tape: "#e9e2d4",
  },
  {
    emoji: "🍞",
    title: "Bread",
    text: "I started baking bread because I like soup. Favorite add-ins: cheese or dried cranberries.",
    tilt: -2,
    tape: "#dd8e58",
  },
];

/** The heading font's hyphen collides with wide letters ("CROSS-STITCH"), so draw it in the body font. */
const withHyphens = (text: string) =>
  text.split("-").flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} className="mx-[0.08em] font-bodyRegular">
            -
          </span>,
          part,
        ],
  );

/** A tiny Yamanote line: the green loop with 30 stations and a walker going round. */
const YamanoteLoop = () => (
  <svg viewBox="0 0 120 120" className="oh-loop h-24 w-24" aria-hidden="true">
    <circle cx="60" cy="60" r="44" fill="none" stroke="#9acd32" strokeWidth="6" />
    {Array.from({ length: 30 }, (_, i) => {
      const a = (i / 30) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={60 + Math.cos(a) * 44}
          cy={60 + Math.sin(a) * 44}
          r="1.6"
          fill="#fbf6ea"
        />
      );
    })}
    <g className="oh-walker">
      <circle cx="60" cy="16" r="5.5" fill="#f2a7b6" stroke="#2b2129" strokeWidth="1.5" />
    </g>
    <text
      x="60"
      y="57"
      textAnchor="middle"
      fontFamily="Audrey_Medium, serif"
      fontSize="15"
      fill="#2b2129"
    >
      30/30
    </text>
    <text
      x="60"
      y="74"
      textAnchor="middle"
      fontFamily="Petrona_Italic, serif"
      fontSize="11"
      fill="#7a675f"
    >
      on foot ✓
    </text>
  </svg>
);

/** "Off the clock": hobbies as a scrapbook page of polaroids and notes. */
const OffHours = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      // Each piece drops onto the page as it scrolls into view.
      gsap.utils.toArray<HTMLElement>(".oh-item").forEach((item, i) => {
        gsap.from(item, {
          y: -70,
          rotation: i % 2 ? 9 : -9,
          scale: 1.08,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });
      // The walker goes round the Yamanote loop.
      gsap.to(".oh-walker", {
        rotation: 360,
        svgOrigin: "60 60",
        duration: 14,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="offhours"
      className="w-screen bg-charcoal px-6 py-28 md:pl-20 md:pr-36 lg:pr-48"
      aria-labelledby="offhours-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-bodyRegularItalic text-lg text-creme">
          when I&apos;m not writing tests, I&apos;m usually making something
        </p>
        <h2
          id="offhours-title"
          className="mt-2 overflow-visible font-heading text-4xl uppercase tracking-widest text-white sm:text-5xl"
        >
          off the clock;
        </h2>

        <ul className="mt-16 columns-1 gap-10 sm:columns-2 lg:columns-3">
          {ITEMS.map((item) => (
            <li key={item.title} className="oh-item mb-12 break-inside-avoid">
              <div
                className={item.photo ? "oh-polaroid" : "oh-note"}
                style={
                  {
                    "--tilt": `${item.tilt}deg`,
                    "--tape": item.tape,
                  } as React.CSSProperties
                }
              >
                <span className="oh-tape" aria-hidden="true" />
                {item.photo && (
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    sizes="(min-width: 976px) 340px, (min-width: 400px) 45vw, 90vw"
                    className="aspect-[4/3] w-full object-cover"
                    placeholder="blur"
                  />
                )}
                {item.emoji && (
                  <p className="text-4xl" aria-hidden="true">
                    {item.emoji}
                  </p>
                )}
                <h3 className="mt-3 font-audreyMedium text-xl uppercase tracking-wide text-charcoal">
                  {withHyphens(item.title)}
                </h3>
                {item.text && (
                  <p className="mt-1 font-bodyRegularItalic text-lg leading-snug text-[#5a4a45]">
                    {item.text}
                  </p>
                )}
                {item.loop && (
                  <div className="mt-3 flex justify-center">
                    <YamanoteLoop />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OffHours;
