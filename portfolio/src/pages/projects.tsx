import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Seo from "../components/Seo";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useLocale, useT } from "../i18n";
import { ogImage } from "../lib/site";

/** All projects, each with its longer write-up. */
const Projects: NextPage = () => {
  const t = useT();
  const locale = useLocale();
  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Seo
        title={t.projects.metaTitle}
        description={t.projects.metaDescription}
        path="/projects"
        locale={locale}
        hasJapanese
        image={ogImage()}
        imageAlt={t.meta.imageAlt}
      />
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-8 sm:px-6">
        <Link
          href="/"
          className="font-audreyMedium uppercase tracking-widest text-white hover:text-creme"
        >
          kristineCodes;
        </Link>
        <Link
          href="/mailbox"
          locale="en"
          className="font-audreyMedium uppercase tracking-widest text-white hover:text-creme"
        >
          {t.nav.mailbox}
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-32 pt-16 sm:px-6">
        <p className="font-bodyRegularItalic text-creme">{t.projects.sub}</p>
        <h1 className="mt-2 font-heading text-4xl uppercase tracking-widest text-white">
          {t.projects.title}
        </h1>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.id} id={p.id}>
              <ProjectCard project={p} full />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Projects;
