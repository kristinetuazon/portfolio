import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap, reducedMotion } from "../../lib/gsap";
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
  const router = useRouter();
  const href = `/blog/${post.slug}`;
  const opening = useRef<{ tl: gsap.core.Timeline; timer: number; el: HTMLElement } | null>(null);

  // Put the envelope back the way it was (closed, sealed, fully visible).
  const reset = () => {
    if (!opening.current) return;
    window.clearTimeout(opening.current.timer);
    opening.current.tl.revert();
    opening.current.el.classList.remove("is-opening");
    opening.current = null;
  };

  useEffect(() => {
    // Coming back via the browser's back/forward cache restores a snapshot of the
    // page, mid-animation included; reset it. Same if the page change fails.
    const onPageShow = (e: PageTransitionEvent) => e.persisted && reset();
    window.addEventListener("pageshow", onPageShow);
    router.events.on("routeChangeError", reset);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      router.events.off("routeChangeError", reset);
      reset();
    };
    // reset only touches the ref, so it's safe to register once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || reducedMotion())
      return;
    e.preventDefault();
    if (opening.current) return; // already opening
    const el = e.currentTarget.closest<HTMLElement>(".envelope-wrap")!;
    const q = gsap.utils.selector(el);
    el.classList.add("is-opening"); // turns off the CSS hover transition on the flap

    // If anything goes wrong with the in-app page change, do a normal page load.
    // A full page load is the point here, as a fallback for a failed in-app navigation.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    const hardNavigate = () => window.location.assign(href);
    const go = () => {
      router.push(href).then((ok) => ok || hardNavigate(), hardNavigate);
    };

    const tl = gsap
      .timeline()
      // The seal cracks in two and falls away...
      .to(
        q(".seal-half-l"),
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
        q(".seal-half-r"),
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
      .to(q(".env-flap"), { rotationX: 180, duration: 0.5, ease: "power2.inOut" }, 0.22)
      // Once it is past upright, the flap goes behind the letter.
      .set(q(".env-flap"), { zIndex: 0 }, 0.47)
      // ...and the letter slides out. The post starts loading while it does.
      .to(q(".env-letter"), { yPercent: -58, duration: 0.55, ease: "power2.out" }, 0.62)
      // The envelope dips as the letter rises, keeping clear of the heading above.
      .to(el, { y: 40, duration: 0.55, ease: "power2.out" }, 0.4)
      .call(go, [], 0.85)
      .to(el, { opacity: 0, scale: 0.97, duration: 0.25, ease: "power1.in" }, 1.05);

    // Safety net: if we're somehow still here, tidy up and load the post normally.
    const timer = window.setTimeout(() => {
      if (window.location.pathname !== href) {
        reset();
        hardNavigate();
      }
    }, 2500);
    opening.current = { tl, timer, el };
  };

  return (
    <div className="envelope-wrap">
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
