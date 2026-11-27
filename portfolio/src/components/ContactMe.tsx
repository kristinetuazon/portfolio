import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { useT } from "../i18n";
import Signature from "./Signature";
import canal from "../../public/DSCF0604.jpg";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";

/**
 * The email address, scrambled (each character code shifted by 7), so it never
 * appears as plain text in the page, the JavaScript, or this public repo.
 * Most scrapers only read raw HTML and look for "name@domain"; the address is
 * put together only when a person clicks "show email" or "copy".
 */
const SCRAMBLED = [
  114, 121, 112, 122, 123, 112, 117, 108, 53, 113, 104, 117, 108, 53, 123, 124, 104, 129, 118, 117,
  71, 110, 116, 104, 112, 115, 53, 106, 118, 116,
];
const unscramble = () => String.fromCharCode(...SCRAMBLED.map((c) => c - 7));

const LINKS = [
  { href: "https://github.com/kristinetuazon", Icon: GitHubIcon, label: "@kristinetuazon" },
  {
    href: "https://www.linkedin.com/in/kristinejanetuazon/",
    Icon: LinkedInIcon,
    label: "@kristinejanetuazon",
  },
  {
    href: "https://www.instagram.com/kristinetuazon/",
    Icon: InstagramIcon,
    label: "@kristinetuazon",
  },
];

/** A dango postage stamp with a perforated edge. */
const DangoStamp = () => (
  <div className="pc-stamp" aria-hidden="true">
    <svg viewBox="0 0 60 72">
      <rect width="60" height="72" fill="#f3d9cf" />
      <line
        x1="14"
        y1="62"
        x2="46"
        y2="12"
        stroke="#c2956e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="49" r="8" fill="#a3c46f" />
      <circle cx="30" cy="37" r="8" fill="#fbf6ea" stroke="#e2d6c2" />
      <circle cx="38" cy="25" r="8" fill="#f2a7b6" />
      <text x="30" y="69" textAnchor="middle" fontSize="6.5" fill="#8e3b52" fontFamily="serif">
        ¥110
      </text>
    </svg>
  </div>
);

type Side = "front" | "back";

/**
 * Contact as a postcard. It arrives picture side up, turns over as you scroll
 * to it, then gets its stamp, a thump of the postmark, and her signature.
 * The back is a Japanese hagaki: a note on the left, the "address" (how to
 * reach her) on the right, a copy button for the email, and a post box.
 */
const ContactMe = () => {
  const t = useT();
  const scene = useRef<HTMLDivElement>(null);
  const flipper = useRef<HTMLDivElement>(null);
  // The server renders the back (so it works without JavaScript); the
  // animation turns it to the front first and flips it over on arrival.
  const [side, setSide] = useState<Side>("back");
  const [signed, setSigned] = useState<boolean | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.set(flipper.current, { rotationY: 0 });
      setSide("front");
      setSigned(false);
      gsap
        .timeline({ scrollTrigger: { trigger: scene.current, start: "top 75%" } })
        .from(scene.current, {
          y: 90,
          rotation: 7,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
        })
        .to(flipper.current, {
          rotationY: 180,
          duration: 1.1,
          ease: "power2.inOut",
          delay: 0.5,
          onStart: () => setSide("back"),
        })
        .from(".pc-stamp", {
          y: -50,
          rotation: 30,
          scale: 1.5,
          opacity: 0,
          duration: 0.55,
          ease: "bounce.out",
        })
        .from(".pc-postmark", { scale: 2.4, opacity: 0, duration: 0.28, ease: "power4.in" })
        .to(scene.current, { y: 3, duration: 0.05, yoyo: true, repeat: 1, ease: "none" })
        .call(() => setSigned(true));
    },
    { scope: scene },
  );

  const turn = () => {
    const next: Side = side === "front" ? "back" : "front";
    setSide(next);
    if (reducedMotion()) {
      gsap.set(flipper.current, { rotationY: next === "back" ? 180 : 0 });
    } else {
      gsap.to(flipper.current, {
        rotationY: next === "back" ? 180 : 0,
        duration: 0.9,
        ease: "power2.inOut",
      });
    }
    if (next === "back") setSigned(true);
  };

  // A tiny envelope slides along and drops into the post box.
  const post = contextSafe(() => {
    if (reducedMotion()) return;
    gsap
      .timeline()
      .fromTo(
        ".pc-env",
        { x: -34, y: -10, rotation: -14, scale: 1, opacity: 1 },
        { x: 0, y: -6, rotation: 0, duration: 0.45, ease: "power2.out" },
      )
      .to(".pc-env", { y: 4, scale: 0.35, opacity: 0, duration: 0.22, ease: "power2.in" })
      .fromTo(
        ".pc-postbox",
        { scaleY: 0.86, scaleX: 1.1 },
        { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1.3, 0.35)" },
      );
  });

  const copy = contextSafe(async () => {
    try {
      await navigator.clipboard.writeText(unscramble());
    } catch {
      return; // No clipboard access: "show my email" still works.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  });

  // Stamp the hanko in once it's on the page.
  useGSAP(
    () => {
      if (!copied || reducedMotion()) return;
      gsap.fromTo(
        ".pc-hanko",
        { scale: 2.2, rotation: -24, opacity: 0 },
        { scale: 1, rotation: -10, opacity: 1, duration: 0.35, ease: "back.out(2.5)" },
      );
    },
    { scope: scene, dependencies: [copied] },
  );

  return (
    <div ref={scene} className="pc-scene">
      <div ref={flipper} className="pc-flip">
        {/* Picture side */}
        <button
          type="button"
          className="pc-face pc-front"
          onClick={turn}
          inert={side === "back"}
          aria-label={t.contact.turnOver}
        >
          <Image
            src={canal}
            alt={t.contact.frontAlt}
            fill
            sizes="(min-width: 976px) 900px, 95vw"
            className="object-cover object-[72%_center]"
            placeholder="blur"
          />
          <span className="pc-greeting" aria-hidden="true">
            <span className="pc-greeting-small">{t.contact.greetingsFrom}</span>
            <span className="pc-greeting-big">JAPAN</span>
          </span>
          <span className="pc-turn-hint" aria-hidden="true">
            ↻ {t.contact.flipHint}
          </span>
        </button>

        {/* Writing side: a hagaki */}
        <div className="pc-face pc-back postcard" inert={side === "front"}>
          <div className="pc-head" aria-hidden="true">
            <span className="pc-head-title">
              郵便はがき <span className="pc-head-en">· POST CARD</span>
            </span>
            <span className="pc-zip">
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} className={i === 3 ? "pc-zip-gap" : undefined} />
              ))}
            </span>
          </div>

          <div className="pc-message">
            <h2 className="font-audreyNormal text-3xl uppercase tracking-widest text-ink sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mt-2 font-audreyMedium text-lg uppercase tracking-wide text-[#8e3b52]">
              {t.contact.sub}
            </p>
            <p className="mt-6 font-bodyRegularItalic text-lg leading-relaxed text-[#5a4a45]">
              {t.contact.note}
            </p>
            <Signature className="pc-signature mt-6 text-ink" start={signed} />
          </div>

          <div className="pc-divider" aria-hidden="true" />

          <div className="pc-address">
            <div className="pc-corner">
              <div className="pc-postmark" aria-hidden="true">
                <span>YOKOHAMA</span>
                <span className="pc-postmark-mid">JAPAN</span>
              </div>
              <DangoStamp />
            </div>

            <ul className="pc-lines">
              <li className="pc-email" onPointerEnter={post}>
                {email ? (
                  <a href={`mailto:${email}`} className="pc-link" onFocus={post}>
                    <span className="pc-postbox-wrap" aria-hidden="true">
                      <span className="pc-postbox">📮</span>
                      <span className="pc-env">✉️</span>
                    </span>
                    <span className="break-all">{email}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="pc-link pc-show"
                    onFocus={post}
                    onClick={() => setEmail(unscramble())}
                  >
                    <span className="pc-postbox-wrap" aria-hidden="true">
                      <span className="pc-postbox">📮</span>
                      <span className="pc-env">✉️</span>
                    </span>
                    <span>{t.contact.showEmail}</span>
                  </button>
                )}
                <button
                  type="button"
                  className="pc-copy"
                  onClick={copy}
                  aria-label={t.contact.copyLabel}
                >
                  {t.contact.copy}
                </button>
                {copied && (
                  <span className="pc-hanko" aria-hidden="true">
                    {t.contact.copied}
                  </span>
                )}
                <span className="sr-only" aria-live="polite">
                  {copied ? t.contact.copied : ""}
                </span>
              </li>
              {LINKS.map(({ href, Icon, label }) => (
                <li key={href}>
                  <a href={href} className="pc-link">
                    <Icon className="h-5 w-5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className="pc-turn" onClick={turn}>
            ↻ {t.contact.seeFront}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
