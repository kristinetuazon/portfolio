import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap, reducedMotion, useGSAP } from "../../lib/gsap";
import type { PostSummary } from "../../services/blog/types";
import WaxSeal from "./WaxSeal";
import { formatDate, Tags } from "./BlogLayout";

/** Short postmark date, e.g. "27 NOV 2026". */
const postmark = (iso: string) =>
  new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();

/**
 * A blog post as a sealed envelope. Clicking it cracks the wax seal, swings
 * the flap open and slides the letter out, then opens the post (where the
 * letter unfolds). Modified clicks (new tab etc.) and reduced motion skip
 * straight to the post.
 */
const Envelope = ({ post }: { post: PostSummary }) => {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const href = `/blog/${post.slug}`;
  const { contextSafe } = useGSAP({ scope: root });

  const open = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || reducedMotion())
      return;
    e.preventDefault();
    const el = e.currentTarget.closest<HTMLElement>(".envelope-wrap")!;
    el.classList.add("is-opening");
    gsap
      .timeline({ onComplete: () => void router.push(href) })
      // The seal cracks in two and falls away...
      .to(
        ".seal-half-l",
        {
          rotation: -28,
          x: -10,
          y: 34,
          opacity: 0,
          svgOrigin: "50 50",
          duration: 0.45,
          ease: "power2.in",
        },
        0,
      )
      .to(
        ".seal-half-r",
        {
          rotation: 24,
          x: 10,
          y: 38,
          opacity: 0,
          svgOrigin: "50 50",
          duration: 0.45,
          ease: "power2.in",
        },
        0.03,
      )
      // ...the flap swings up and over...
      .to(".env-flap", { rotationX: 180, duration: 0.5, ease: "power2.inOut" }, 0.22)
      .set(".env-flap", { zIndex: 1 }, 0.47)
      // ...and the letter slides out.
      .to(".env-letter", { yPercent: -58, duration: 0.55, ease: "power2.out" }, 0.62)
      .to(el, { y: 12, duration: 0.55, ease: "power2.out" }, 0.62)
      .to(el, { opacity: 0, scale: 0.97, duration: 0.25, ease: "power1.in" }, 1.05);
  });

  return (
    <div ref={root} className="envelope-wrap">
      <Link
        href={href}
        onClick={open}
        className="envelope-link"
        aria-label={`Open the letter: ${post.title}`}
      >
        <div className="envelope">
          <div className="env-body" />
          <div className="env-letter">
            <span className="env-letter-lines" />
          </div>
          <div className="env-pocket" />
          <div className="env-flap" />
          <div className="env-seal">
            <WaxSeal className="h-full w-full" />
          </div>
          <div className="env-postmark" aria-hidden="true">
            <span>{postmark(post.publishedAt)}</span>
          </div>
          <div className="env-address">
            <span className="env-from">a letter from Kristine</span>
            <h2 className="env-title">{post.title}</h2>
          </div>
          {post.draft && <span className="env-draft">draft</span>}
        </div>
      </Link>
      <div className="mt-4 px-1">
        <p className="font-bodyRegular text-xs uppercase tracking-widest text-coffee">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
          {post.readingMinutes} min read
        </p>
        <p className="mt-2 font-bodyLight leading-relaxed text-creme">{post.summary}</p>
        <div className="mt-3">
          <Tags tags={post.tags} />
        </div>
      </div>
    </div>
  );
};

export default Envelope;
