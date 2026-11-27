import type { StaticImageData } from "next/image";

import studyHero from "../../public/StudyHero/StudyHero1.jpg";
import costOfLiving from "../../public/CostOfLiving/Cost_of_Living1.jpg";
import minimize from "../../public/Minimize/Minimize1.jpeg";
import tokyoNoire from "../../public/TokyoNoire/TokyoNoire1.jpeg";

export type ProjectLink = { kind: "github" | "website" | "youtube"; href: string };

export type Project = {
  id: string;
  title: string;
  /** One sentence, in English and Japanese. */
  description: { en: string; ja: string };
  links: ProjectLink[];
  /** Card image: one screenshot, ideally 16:9. */
  image: StaticImageData;
  /** Ball color for the card, from the dango palette. */
  color: string;
};

// Projects from before Lazuli, shown as a compact "earlier work" row.
// To add one: put a screenshot in /public/<Name>/, import it above and add an entry.
export const projects: Project[] = [
  {
    id: "studyhero",
    title: "study hero",
    description: {
      en: "A gamified pomodoro web application for game-lovers.",
      ja: "ゲーム好きのための、ゲーム感覚で集中できるポモドーロWebアプリ。",
    },
    links: [
      { kind: "github", href: "https://github.com/Ghost-Pepper-Greenfield/study-hero" },
      { kind: "youtube", href: "https://youtu.be/W3A1CalxAh8" },
    ],
    image: studyHero,
    color: "#ff99ad",
  },
  {
    id: "costofliving",
    title: "cost of living",
    description: {
      en: "A legacy project that helps people find their next home within their budget.",
      ja: "予算内で次の住まいを見つける手助けをする、レガシープロジェクト。",
    },
    links: [{ kind: "youtube", href: "https://youtu.be/iHT86r0FjlU" }],
    image: costOfLiving,
    color: "#dae3ea",
  },
  {
    id: "minimize",
    title: "minimize",
    description: {
      en: "A tinder-style decluttering application. Both version one and version two exists.",
      ja: "Tinder風にスワイプして片づける、断捨離アプリ。バージョン1と2があります。",
    },
    links: [
      { kind: "github", href: "https://github.com/kristinetuazon/minimize" },
      { kind: "website", href: "https://www.mnmz.app/" },
      { kind: "youtube", href: "https://youtu.be/w1CIF_Wsj-Y" },
    ],
    image: minimize,
    color: "#8cc63e",
  },
  {
    id: "tokyonoire",
    title: "tokyo noire",
    description: {
      en: "A geo-location, narrative based game platform and editor.",
      ja: "位置情報を使った、物語ベースのゲームプラットフォームとエディター。",
    },
    links: [
      { kind: "github", href: "https://github.com/TokyoNoire" },
      { kind: "website", href: "https://tokyonoire.com/" },
      { kind: "youtube", href: "https://youtu.be/biS2DXEf2As" },
    ],
    image: tokyoNoire,
    color: "#f6c177",
  },
];
