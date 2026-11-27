import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import BlogLayout, { formatDate, Tags } from "../../components/blog/BlogLayout";
import { loadPosts, toSummary } from "../../services/blog/loader";
import type { PostSummary } from "../../services/blog/types";

type Props = { posts: PostSummary[] };

const BlogIndex: NextPage<Props> = ({ posts }) => (
  <BlogLayout title="Blog · kristineCodes;" description="Notes and stories from Kristine, a software developer in Yokohama.">
    <p className="font-bodyRegularItalic text-creme">notes, stories &amp; things I learned</p>
    <h1 className="mt-2 font-heading text-4xl uppercase tracking-widest text-white">the blog;</h1>

    {posts.length === 0 ? (
      <p className="mt-16 font-bodyThin text-xl text-creme">First post coming soon ✨</p>
    ) : (
      <ol className="mt-16 flex flex-col gap-14">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <p className="font-bodyRegular text-sm uppercase tracking-widest text-coffee">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {" · "}
                {post.readingMinutes} min read
                {post.draft && <span className="ml-2 rounded bg-orange px-2 text-charcoal">draft</span>}
              </p>
              <h2 className="mt-2 font-audreyMedium text-2xl uppercase tracking-wide">
                <Link href={`/blog/${post.slug}`} className="text-white decoration-orange underline-offset-4 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 font-bodyLight text-lg leading-relaxed text-creme">{post.summary}</p>
              <div className="mt-4">
                <Tags tags={post.tags} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    )}
  </BlogLayout>
);

export default BlogIndex;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (await loadPosts()).map(toSummary);
  // Next can't serialise `undefined`; JSON round-trip drops those keys.
  return { props: JSON.parse(JSON.stringify({ posts })) as Props };
};
