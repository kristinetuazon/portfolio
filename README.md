# Portfolio Website

Kristine's portfolio — [Next.js](https://nextjs.org) (pages router), Tailwind CSS and GSAP.
The app lives in [`portfolio/`](portfolio).

## Run it locally

Requires Node 20.9 or newer.

```bash
cd portfolio
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`.

## Where things live

| What | Where |
| --- | --- |
| Blog posts (Markdown) | `portfolio/content/blog/` — see its [README](portfolio/content/blog/README.md) |
| Blog post images | `portfolio/public/blog/<post>/` |
| Projects (title, links, screenshots, video, colors) | `portfolio/src/data/projects.ts` |
| Page layout and about-me text | `portfolio/src/pages/index.tsx` |
| Scroll animation helpers | `portfolio/src/lib/gsap.ts` |
| Colors and fonts | `portfolio/tailwind.config.cjs`, `portfolio/src/styles/globals.css` |

### Adding a project

1. Put its screenshots in `portfolio/public/<ProjectName>/` (around 1920px wide is plenty).
2. Import them at the top of `portfolio/src/data/projects.ts` and add an entry to the `projects` list.

It shows up on the page and in the floating project bubbles automatically.
