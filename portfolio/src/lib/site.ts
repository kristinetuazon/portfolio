/** The live site's address, for links that must be absolute (canonical, sitemap, link previews). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kristinecodes.dev"
).replace(/\/$/, "");

export const SITE_NAME = "kristineCodes;";

/** Turn a path like "/mailbox" into "https://…/mailbox". */
export const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/** Link-preview image for a page: a 1200×630 card drawn by /api/og. */
export const ogImage = (title?: string, kind: "home" | "letter" = "home") => {
  const params = new URLSearchParams({ kind });
  if (title) params.set("title", title);
  return absolute(`/api/og?${params.toString()}`);
};

/** Who the site is about, for search engines (schema.org Person). */
export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#kristine`,
  name: "Kristine Tuazon",
  alternateName: "Kristine Jane Tuazon",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Lazuli" },
  address: { "@type": "PostalAddress", addressLocality: "Yokohama", addressCountry: "JP" },
  url: SITE_URL,
  sameAs: [
    "https://github.com/kristinetuazon",
    "https://www.linkedin.com/in/kristinejanetuazon/",
    "https://www.instagram.com/kristinetuazon/",
  ],
  knowsAbout: ["Frontend development", "End-to-end testing", "Playwright", "TypeScript", "React"],
} as const;
