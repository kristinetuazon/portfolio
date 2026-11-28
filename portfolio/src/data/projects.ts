import type { StaticImageData } from "next/image";
import tokyoNoire from "../../public/TokyoNoire/TokyoNoire1.jpeg";

/**
 * Projects, shown as cards on the home page and in full on /projects.
 * To add one: add an entry here (newest first). `visual` picks the little
 * drawing on its card (see ProjectCard); or give an `image` (a screenshot) instead.
 */
export type ProjectLink = { kind: "live" | "github" | "video"; href: string };

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
  visual?: "swipe" | "site" | "tests";
  /** A screenshot to show instead of a drawing. */
  image?: StaticImageData;
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
    id: "tokyonoire",
    title: "Tokyo Noire",
    summary: {
      en: "A location-based story game platform and editor, built as a team at Code Chrysalis.",
      ja: "位置情報を使った物語ゲームのプラットフォームとエディター。Code Chrysalisでチーム開発。",
    },
    details: {
      en: "Real-life mysteries you solve by walking around the city, plus an editor for writing your own. I was the main contributor to the TypeScript client (161 commits): sign-in, game progression, and the drag-and-drop editor for building games.",
      ja: "街を歩きながら謎を解く、リアルな物語ゲームと、自分でゲームを作れるエディター。TypeScriptのクライアントのメイン担当（コミット161件）として、ログイン、ゲームの進行、ゲームを作るためのドラッグ＆ドロップのエディターを作りました。",
    },
    tags: ["TypeScript", "Geolocation"],
    links: [
      { kind: "live", href: "https://tokyonoire.com/" },
      { kind: "github", href: "https://github.com/TokyoNoire" },
      { kind: "video", href: "https://youtu.be/biS2DXEf2As" },
    ],
    image: tokyoNoire,
    color: "#f6c177",
  },
];
