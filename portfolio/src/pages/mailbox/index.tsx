import type { GetStaticProps, NextPage } from "next";
import BlogLayout from "../../components/blog/BlogLayout";
import Envelope from "../../components/blog/Envelope";
import { loadPosts, toSummary } from "../../services/blog/loader";
import type { PostSummary } from "../../services/blog/types";

type Props = { posts: PostSummary[] };

const BlogIndex: NextPage<Props> = ({ posts }) => (
  <BlogLayout
    title="Mailbox · kristineCodes;"
    description="Letters from Kristine, a software engineer at Lazuli in Japan."
  >
    <p className="font-bodyRegularItalic text-creme">notes, stories &amp; things I learned</p>
    <h1 className="mt-2 font-heading text-4xl uppercase tracking-widest text-white">
      the mailbox;
    </h1>

    {posts.length === 0 ? (
      <p className="mt-16 font-bodyThin text-xl text-creme">First post coming soon ✨</p>
    ) : (
      <ol className="mt-28 grid gap-x-10 gap-y-28 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Envelope post={post} />
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
