import type { StaticImageData } from "next/image";

import studyHero from "../../public/StudyHero/StudyHero1.jpg";
import costOfLiving from "../../public/CostOfLiving/Cost_of_Living1.jpg";
import minimize from "../../public/Minimize/Minimize1.jpeg";
import tokyoNoire from "../../public/TokyoNoire/TokyoNoire1.jpeg";

export type ProjectLink = { kind: "github" | "website" | "youtube"; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
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
    description: "A gamified pomodoro web application for game-lovers.",
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
    description: "A legacy project that helps people find their next home within their budget.",
    links: [{ kind: "youtube", href: "https://youtu.be/iHT86r0FjlU" }],
    image: costOfLiving,
    color: "#dae3ea",
  },
  {
    id: "minimize",
    title: "minimize",
    description:
      "A tinder-style decluttering application. Both version one and version two exists.",
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
    description: "A geo-location, narrative based game platform and editor.",
    links: [
      { kind: "github", href: "https://github.com/TokyoNoire" },
      { kind: "website", href: "https://tokyonoire.com/" },
      { kind: "youtube", href: "https://youtu.be/biS2DXEf2As" },
    ],
    image: tokyoNoire,
    color: "#f6c177",
  },
];
