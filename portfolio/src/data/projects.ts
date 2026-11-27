/**
 * Projects, shown as cards on the home page and in full on /projects.
 * To add one: add an entry here (newest first). `visual` picks the little
 * drawing on its card (see ProjectVisual).
 */
export type ProjectLink = { kind: "live" | "github"; href: string };

export type Project = {
  id: string;
  title: string;
  /** Short line for the card. */
  summary: { en: string; ja: string };
  /** A few sentences for the projects page. */
  details: { en: string; ja: string };
  tags: string[];
  links: ProjectLink[];
  /** Shown when there's no public link (work projects). */
  note?: { en: string; ja: string };
  visual: "swipe" | "site" | "tests";
  /** Card accent, from the dango palette. */
  color: string;
};

export const projects: Project[] = [
  {
    id: "minimize-v2",
    title: "Minimize v2",
    summary: {
      en: "A Tinder-style decluttering app: swipe through your things and decide what stays.",
      ja: "Tinder風にスワイプして、持ち物を残すか手放すか決めていく断捨離アプリ。",
    },
    details: {
      en: "The second version of Minimize, my decluttering app. Each of your things comes up as a card: swipe to keep it or let it go.",
      ja: "断捨離アプリMinimizeの第2版。持ち物が1枚ずつカードで表示され、スワイプで残すか手放すかを決めていきます。",
    },
    tags: [],
    links: [{ kind: "live", href: "https://minimize-v2.vercel.app/" }],
    visual: "swipe",
    color: "#a3c46f",
  },
  {
    id: "kristinecodes",
    title: "kristineCodes;",
    summary: {
      en: "This website: a bilingual, hand-animated portfolio with a mailbox, tested on every change.",
      ja: "このウェブサイト。英語と日本語、手づくりのアニメーション、お手紙のポスト付きで、変更のたびにテストしています。",
    },
    details: {
      en: "Built with Next.js, React, TypeScript and GSAP: dango and onigiri drawn in SVG, letters written in Markdown, English and Japanese, a light theme, and link previews drawn on the fly. Every change runs an end-to-end suite in Robot Framework on GitHub Actions.",
      ja: "Next.js、React、TypeScript、GSAPで制作。SVGで描いたお団子やおにぎり、Markdownで書くお手紙、英語と日本語、昼のテーマ、その場で描くリンクのプレビュー画像。変更のたびにRobot FrameworkのE2EテストがGitHub Actionsで走ります。",
    },
    tags: ["Next.js", "TypeScript", "GSAP", "Robot Framework"],
    links: [
      { kind: "live", href: "https://www.kristinecodes.dev" },
      { kind: "github", href: "https://github.com/kristinetuazon/portfolio" },
    ],
    visual: "site",
    color: "#f2a7b6",
  },
  {
    id: "lazuli-e2e",
    title: "Lazuli's end-to-end tests",
    summary: {
      en: "The Playwright test platform I built at work: about 390 tests across 3 products.",
      ja: "仕事で構築したPlaywrightのテスト基盤。3つのプロダクトで約390件のテスト。",
    },
    details: {
      en: "Built almost from scratch and owned end to end: suites for every product area run on dev, staging and production in three browsers, with CI checks and lint rules that keep flaky or untraceable tests from being merged.",
      ja: "ほぼゼロから構築し、責任者として運用。すべてのプロダクト領域のテストを開発・ステージング・本番の各環境で3種類のブラウザに対して実行し、不安定なテストや出どころのわからないテストがマージされないよう、CIのチェックとLintルールで守っています。",
    },
    tags: ["Playwright", "TypeScript", "GitHub Actions", "GritQL"],
    links: [],
    note: { en: "Work project: the code is private.", ja: "仕事のプロジェクトのため、コードは非公開です。" },
    visual: "tests",
    color: "#f6c177",
  },
];
