import { useRef, useState } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { useT } from "../i18n";
import Signature from "./Signature";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";

const EMAIL = "kristine.jane.tuazon@gmail.com";

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

/**
 * Contact as a postcard: a note and her signature on the left, the "address"
 * (how to reach her) on the right, with a stamp, a postmark, a copy button
 * for the email, and a little envelope that drops into the post box.
 */
const ContactMe = () => {
  const t = useT();
  const card = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(card.current, {
        y: 60,
        rotation: 4,
        opacity: 0,
        duration: 1.1,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: card.current, start: "top 85%" },
      });
    },
    { scope: card },
  );

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
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return; // No clipboard access: the email link itself still works.
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
    { scope: card, dependencies: [copied] },
  );

  return (
    <div ref={card} className="postcard">
      {/* The message side */}
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
        <Signature className="pc-signature mt-6 text-ink" />
      </div>

      <div className="pc-divider" aria-hidden="true" />

      {/* The address side */}
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
            <a href={`mailto:${EMAIL}`} className="pc-link" onFocus={post}>
              <span className="pc-postbox-wrap" aria-hidden="true">
                <span className="pc-postbox">📮</span>
                <span className="pc-env">✉️</span>
              </span>
              <span className="break-all">{EMAIL}</span>
            </a>
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
    </div>
  );
};

export default ContactMe;
