import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import BlogLayout, { formatDate, Tags } from "../../components/blog/BlogLayout";
import { loadPosts } from "../../services/blog/loader";
import type { Post } from "../../services/blog/types";

type Props = { post: Post };

const BlogPost: NextPage<Props> = ({ post }) => (
  <BlogLayout title={`${post.title} · kristineCodes;`} description={post.summary} image={post.cover}>
    <article>
      <header>
        <p className="font-bodyRegular text-sm uppercase tracking-widest text-coffee">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {" · "}
          {post.readingMinutes} min read
          {post.draft && <span className="ml-2 rounded bg-orange px-2 text-charcoal">draft</span>}
        </p>
        <h1 className="mt-3 font-heading text-3xl uppercase leading-snug tracking-widest text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 font-bodyLight text-xl leading-relaxed text-creme">{post.summary}</p>
        <div className="mt-5">
          <Tags tags={post.tags} />
        </div>
      </header>

      {post.cover && (
        // Plain <img>: cover sizes vary per post and are already web-sized by the author.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover} alt={post.coverAlt ?? ""} className="mt-10 w-full rounded-lg" />
      )}

      <div className="post-body prose prose-lg mt-12 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />

      <footer className="mt-20 border-t border-mint pt-8 font-bodyRegular text-creme">
        {post.updated && <p className="mb-4 text-sm">Last updated {formatDate(post.updated)}</p>}
        <Link href="/blog" className="text-white decoration-orange underline-offset-4 hover:underline">
          ← All posts
        </Link>
      </footer>
    </article>
  </BlogLayout>
);

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await loadPosts()).map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const post = (await loadPosts()).find((p) => p.slug === params?.slug);
  if (!post) return { notFound: true };
  return { props: JSON.parse(JSON.stringify({ post })) as Props };
};
