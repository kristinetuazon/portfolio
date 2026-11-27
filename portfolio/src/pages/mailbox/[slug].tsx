import { useRef } from "react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import BlogLayout, { formatDate, LETTER_COPY, Tags } from "../../components/blog/BlogLayout";
import { gsap, reducedMotion, useGSAP } from "../../lib/gsap";
import { loadPosts } from "../../services/blog/loader";
import type { Post } from "../../services/blog/types";
import { absolute, ogImage, PERSON } from "../../lib/site";

type Props = { post: Post; hasJapanese: boolean };

/**
 * A post, shown as a letter on cream paper. On arrival it unfolds from three
 * folds: the top and bottom flaps swing open to reveal the page.
 */
const BlogPost: NextPage<Props> = ({ post }) => {
  const copy = LETTER_COPY[post.lang];
  const letter = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = letter.current;
      if (!el) return;
      const reveal = () => el.classList.remove("letter-intro");
      if (reducedMotion()) return reveal();

      const inner = el.querySelector<HTMLElement>(".letter-paper")!;
      const H = inner.offsetHeight;
      // Fold the first (up to) 75% of a screen into thirds.
      const F = Math.round(Math.min(window.innerHeight * 0.75, H) / 3);
      el.style.setProperty("--fold", `${F}px`);
      const clip = (top: number, bottom: number) => `inset(${top}px 0px ${bottom}px 0px round 6px)`;

      gsap.set(".letter-fold-top", {
        top: 0,
        height: F,
        transformOrigin: "50% 100%",
        rotationX: -180,
      });
      gsap.set(".letter-fold-bottom", {
        top: 2 * F,
        height: F,
        transformOrigin: "50% 0%",
        rotationX: 180,
      });
      gsap.set(".letter-fold", { display: "block", opacity: 1 });
      gsap.set(inner, { clipPath: clip(F, H - 2 * F) });
      reveal();

      gsap
        .timeline({
          delay: 0.05,
          onComplete: () => {
            gsap.set(inner, { clearProps: "clipPath" });
            gsap.set(".letter-fold", { display: "none" });
          },
        })
        // The folded letter arrives...
        .from(el, { y: 50, scale: 0.92, opacity: 0, duration: 0.45, ease: "power2.out" })
        // ...the top third swings open...
        .to(".letter-fold-top", { rotationX: 0, duration: 0.6, ease: "power2.inOut" }, 0.35)
        .to(".letter-fold-top", { opacity: 0, duration: 0.2 }, 0.62)
        .to(inner, { clipPath: clip(0, H - 2 * F), duration: 0.3, ease: "power1.out" }, 0.62)
        // ...then the bottom third, and the rest of the page.
        .to(".letter-fold-bottom", { rotationX: 0, duration: 0.6, ease: "power2.inOut" }, 0.65)
        .to(".letter-fold-bottom", { opacity: 0, duration: 0.2 }, 0.92)
        .to(inner, { clipPath: clip(0, 0), duration: 0.45, ease: "power1.out" }, 0.92);
    },
    { scope: letter, dependencies: [post.slug], revertOnUpdate: true },
  );

  return (
    <BlogLayout
      title={`${post.title} · kristineCodes;`}
      description={post.summary}
      path={`/mailbox/${post.slug}`}
      letterTitle={post.title}
      lang={post.lang}
      image={post.cover}
      imageAlt={post.coverAlt}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: post.publishedAt,
        dateModified: post.updated ?? post.publishedAt,
        inLanguage: post.lang,
        url: absolute(`/mailbox/${post.slug}`),
        image: post.cover ? absolute(post.cover) : ogImage(post.title, "letter"),
        keywords: post.tags.join(", ") || undefined,
        author: PERSON,
        mainEntityOfPage: absolute(`/mailbox/${post.slug}`),
      }}
    >
      {/* Without JavaScript, show the letter straight away. */}
      <noscript>
        <style>{`.letter-intro{opacity:1 !important}`}</style>
      </noscript>

      <article ref={letter} className="letter letter-intro" lang={post.lang}>
        <div className="letter-fold letter-fold-top" aria-hidden="true" />
        <div className="letter-fold letter-fold-bottom" aria-hidden="true" />

        <div className="letter-paper">
          <header>
            <p className="text-right font-bodyRegularItalic text-sm text-[#7a675f]">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, post.lang)}</time>
              {" · "}
              {copy.read(post.readingMinutes)}
              {post.draft && (
                <span className="ml-2 rounded bg-orange px-2 font-bodyRegular not-italic text-ink">
                  draft
                </span>
              )}
            </p>
            <h1 className="mt-6 font-heading text-3xl uppercase leading-snug tracking-widest text-ink sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 font-bodyLight text-xl leading-relaxed text-[#5a4a45]">
              {post.summary}
            </p>
            <div className="letter-tags mt-5">
              <Tags tags={post.tags} />
            </div>
          </header>

          {post.cover && (
            // Plain <img>: cover sizes vary per post and are already web-sized by the author.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover} alt={post.coverAlt ?? ""} className="mt-10 w-full rounded-md" />
          )}

          <div
            className="post-body prose prose-lg mt-10 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="mt-16 border-t border-[#d8ccb6] pt-6 font-bodyRegular text-[#5a4a45]">
            {post.updated && (
              <p className="mb-4 text-sm">{copy.updated(formatDate(post.updated, post.lang))}</p>
            )}
            <Link
              href="/mailbox"
              className="text-ink decoration-orange underline-offset-4 hover:underline"
            >
              {copy.back}
            </Link>
          </footer>
        </div>
      </article>
    </BlogLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await loadPosts()).map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const post = (await loadPosts()).find((p) => p.slug === params?.slug);
  if (!post) return { notFound: true };
  return {
    props: JSON.parse(JSON.stringify({ post, hasJapanese: post.lang === "ja" })) as Props,
  };
};
