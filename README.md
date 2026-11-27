# kristineCodes; — portfolio

Kristine's personal site: a scroll-driven portfolio of her software projects,
plus a blog called the mailbox. Built with [Next.js](https://nextjs.org), Tailwind CSS and
[GSAP](https://gsap.com).

The app lives in [`portfolio/`](portfolio).

## What's on the site

- **Home (`/`)**: a bouncy intro, Kristine's work as a software engineer at
  Lazuli, the story of how she got into code, a row of earlier projects, an
  "off the clock" scrapbook of hobbies, and contact links. A column of onigiri on the side lights up as you scroll.
- **Mailbox (`/mailbox`)**: the blog. Posts are written in Markdown and kept in
  this repo, shown as sealed envelopes that open into letters, with an RSS feed
  at `/mailbox/rss.xml`. Old `/blog` links redirect here.
- **日本語 (`/ja`)**: the home page in Japanese, switched with the EN / 日本語
  pill in the bottom-right corner. All the words live in
  `portfolio/src/i18n/index.ts`; TypeScript fails the build if a Japanese
  string is missing. Mailbox letters can be written in Japanese too
  (`lang: ja`, see `portfolio/content/blog/README.md`).
- **404**: "This page got eaten 🍙", with a bitten onigiri.
- **Light theme**: the sun / moon button in the bottom-right corner switches
  to cream paper; the choice is saved in the browser. Dark is the default.
  Theme colors are CSS variables in `portfolio/src/styles/globals.css`.
- **"now;"**: a rotating line under the intro (reading, listening, learning,
  latest walk, current favourite). Edit `portfolio/src/data/now.ts`.
- **Search and link previews**: `/sitemap.xml`, `robots.txt`, canonical and
  language links, schema.org data (Person on the home page, BlogPosting on each
  letter), and a drawn 1200×630 preview card from `/api/og` for Slack,
  LinkedIn and friends.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (pages router), React 19, TypeScript |
| Styling | Tailwind CSS 3, `@tailwindcss/typography` for blog posts |
| Animation | GSAP: ScrollTrigger, SplitText, DrawSVG (`@gsap/react`), with reduced-motion support |
| Blog | Markdown → HTML at build time (unified / remark / rehype), Zod-checked frontmatter |
| Tests | Vitest |
| Hosting | Vercel (with Vercel Analytics) |

## Getting started

Requires **Node 20.9 or newer**.

```bash
cd portfolio
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload (also shows draft blog posts) |
| `npm run build` | Production build; fails if any blog post is invalid |
| `npm start` | Serve the production build |
| `npm test` | Check every blog post and the Markdown pipeline |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no output |
| `npm run test:robot` | Robot Framework end-to-end tests (needs the site running; see `portfolio/tests/robot/README.md`) |

## Project structure

```
portfolio/
├── content/blog/            Blog posts: <slug>/index.md (+ writing guide README)
├── public/                  Photos, project screenshots, blog images (public/blog/<slug>/)
├── Assets/Fonts/            Audrey, Petrona, Bargemo and Holipop font files
└── src/
    ├── pages/               index.tsx (home), 404, mailbox/ (list, post, RSS), sitemap.xml, api/og (preview cards)
    ├── i18n/index.ts        English and Japanese copy
    ├── components/          OnigiriNav, Onigiri, IntroHero, LazuliSection, EarlierWork, ContactMe, …
    ├── data/projects.ts     The "earlier work" projects
    ├── lib/gsap.ts          Shared scroll-animation helpers (reveal, fadeInOn)
    ├── lib/site.ts          Site URL, preview-card URLs, schema.org Person
    ├── services/blog/       Post loader, frontmatter schema, Markdown renderer, tests
    └── styles/globals.css   Fonts, cursor, bubbles, blog styles
```

Colors and font names are defined in `portfolio/tailwind.config.cjs`
(`charcoal`, `mint`, `creme`, `coffee`, `pink`, `orange`, `white`).

## Adding a project

The home page's "earlier work" row reads from `portfolio/src/data/projects.ts`.

1. Put a screenshot (16:9 works best) in `portfolio/public/<ProjectName>/`.
2. Import it at the top of `projects.ts` and add an entry:

   ```ts
   {
     id: "my-project",
     title: "my project",
     description: "One line about what it does.",
     links: [
       { kind: "github", href: "https://github.com/…" },
       { kind: "website", href: "https://…" },
       { kind: "youtube", href: "https://youtu.be/…" },
     ],
     image: myProject,
     color: "#ff99ad", // card border, from the dango palette
   },
   ```

The Lazuli section's text lives in `portfolio/src/components/LazuliSection.tsx`
(the `ROLES` list), and its "3 years 6 months" counts up from June 2023
automatically.

## Writing a post for the mailbox

1. Create `portfolio/content/blog/<post-slug>/index.md`. The folder name
   becomes the URL, `/mailbox/<post-slug>`.
2. Start it with frontmatter:

   ```yaml
   ---
   title: My first post
   summary: One or two sentences for the list and link previews.
   publishedAt: 2026-11-27
   tags: [career]
   draft: true        # remove when it's ready to go live
   ---
   ```

3. Put any images in `portfolio/public/blog/<post-slug>/` and reference them by
   file name: `![description](photo.jpg)`.
4. Preview with `npm run dev`, then push. Vercel redeploys in about a minute.

Posts support GitHub-flavored Markdown, code blocks, and `> [!NOTE]` /
`[!TIP]` / `[!WARNING]` callouts. A broken post (missing title, bad date,
missing image, …) fails the build with a message naming the file, so it can't
go live half-broken. The full guide is in
[`portfolio/content/blog/README.md`](portfolio/content/blog/README.md), and
the draft post `how-to-write-a-post` shows every feature.

## Deploying

The site is deployed on Vercel. Because the app is in a subfolder, the Vercel
project's **Root Directory** must be set to `portfolio`. No environment
variables are needed. Links for search engines and previews point to
`https://www.kristinecodes.dev`; set `NEXT_PUBLIC_SITE_URL` to use another
domain (and update the `Sitemap:` line in `public/robots.txt`). With Vercel's default Git settings, pushing to `main`
deploys to production and other branches get preview deployments.

## License

Code is [MIT](LICENSE). The fonts in `portfolio/Assets/Fonts/` come with their
own licenses (see the files in each font's folder). Photos and project
screenshots aren't covered by the MIT license.
