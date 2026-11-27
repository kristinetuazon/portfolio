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

## Project structure

```
portfolio/
├── content/blog/            Blog posts: <slug>/index.md (+ writing guide README)
├── public/                  Photos, project screenshots, blog images (public/blog/<slug>/)
├── Assets/Fonts/            Audrey, Petrona, Bargemo and Holipop font files
└── src/
    ├── pages/               index.tsx (home), mailbox/ (list, post, RSS), _app, _document
    ├── components/          OnigiriNav, Onigiri, IntroHero, LazuliSection, EarlierWork, ContactMe, …
    ├── data/projects.ts     The "earlier work" projects
    ├── lib/gsap.ts          Shared scroll-animation helpers (reveal, fadeInOn)
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
variables are needed. With Vercel's default Git settings, pushing to `main`
deploys to production and other branches get preview deployments.

## The CV download

The "Download CV" button in the contact section fetches the CV from
`/api/cv` (`portfolio/src/pages/api/cv.ts`). This repository is public, so
**the CV file is never committed** (`.gitignore` blocks `*CV*.pdf`). It lives
in private storage, and the server fetches it from a secret URL.

Guardrails: POST only, same-origin only, a hidden honeypot field, a per-visitor
rate limit, [Vercel BotID](https://vercel.com/docs/botid) (an invisible bot
check, on Vercel only), and no-cache / no-index headers. `robots.txt` also tells
crawlers to stay out of `/api/`. The public copy leaves out the phone number.

To set it up or replace the CV:

1. Upload the PDF to private storage, such as a Vercel Blob store connected to
   the project.
2. In Vercel, go to **Project → Settings → Environment Variables** and set
   `CV_FILE_URL` to the file's URL for Production (and Preview, if you want).
3. Redeploy.

For local testing, set `CV_FILE_PATH` to the absolute path of a PDF outside
the repo. If neither variable is set, the button shows an "email me" message.

## License

Code is [MIT](LICENSE). The fonts in `portfolio/Assets/Fonts/` come with their
own licenses (see the files in each font's folder). Photos and project
screenshots aren't covered by the MIT license.
