# kristineCodes; — portfolio

Kristine's personal site: a scroll-driven portfolio of her software projects,
plus a blog. Built with [Next.js](https://nextjs.org), Tailwind CSS and
[GSAP](https://gsap.com).

The app lives in [`portfolio/`](portfolio).

## What's on the site

- **Home (`/`)**: an intro, a photo collage and an "about me" story that
  animate in as you scroll. After that come the project showcases (title,
  links, screenshots and a demo video for each) and contact links.
- **Blog (`/blog`)**: posts written in Markdown and kept in this repo, with an
  RSS feed at `/blog/rss.xml`.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (pages router), React 19, TypeScript |
| Styling | Tailwind CSS 3, `@tailwindcss/typography` for blog posts |
| Animation | GSAP + ScrollTrigger (`@gsap/react`) |
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

## Project structure

```
portfolio/
├── content/blog/            Blog posts: <slug>/index.md (+ writing guide README)
├── public/                  Photos, project screenshots, blog images (public/blog/<slug>/)
├── Assets/Fonts/            Audrey, Petrona, Bargemo and Holipop font files
└── src/
    ├── pages/               index.tsx (home), blog/ (list, post, RSS), _app, _document
    ├── components/          Hero, NavBar, Project, ContactMe, Cursor, icons, blog/…
    ├── data/projects.ts     The projects shown on the home page
    ├── lib/gsap.ts          Shared scroll-animation helpers (reveal, fadeInOn)
    ├── services/blog/       Post loader, frontmatter schema, Markdown renderer, tests
    └── styles/globals.css   Fonts, cursor, bubbles, blog styles
```

Colors and font names are defined in `portfolio/tailwind.config.cjs`
(`charcoal`, `mint`, `creme`, `coffee`, `pink`, `orange`, `white`).

## Adding a project

1. Put its screenshots in `portfolio/public/<ProjectName>/`. Around 1920px wide
   is plenty.
2. Import them at the top of `portfolio/src/data/projects.ts` and add an entry
   to the `projects` list:

   ```ts
   {
     id: "my-project",                    // URL anchor: /#my-project
     title: "my project",
     description: "One line about what it does.",
     links: [
       { kind: "github", href: "https://github.com/…" },
       { kind: "website", href: "https://…" },
       { kind: "youtube", href: "https://youtu.be/…" },
     ],
     images: [myProject1, myProject2],    // fly in one after another as you scroll
     youtubeId: "…",                      // demo video shown below the project
     sectionBg: "from-charcoal to-mint",  // Tailwind gradient for the section
     videoBg: "from-mint to-mint",        // …and for the video section
   },
   ```

The project shows up on the page and in the floating "project bubbles"
automatically. Keep the gradients flowing: each section's `from-` color should
match the previous section's `to-` color.

## Writing a blog post

1. Create `portfolio/content/blog/<post-slug>/index.md`. The folder name
   becomes the URL, `/blog/<post-slug>`.
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
variables are needed. With Vercel's default Git settings, pushing to `main`
deploys to production and other branches get preview deployments.

## License

Code is [MIT](LICENSE). The fonts in `portfolio/Assets/Fonts/` come with their
own licenses (see the files in each font's folder). Photos and project
screenshots aren't covered by the MIT license.
