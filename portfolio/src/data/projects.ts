import type { StaticImageData } from "next/image";

import studyHero1 from "../../public/StudyHero/StudyHero1.jpg";
import studyHero2 from "../../public/StudyHero/StudyHero2.jpg";
import studyHero3 from "../../public/StudyHero/StudyHero3.jpg";
import studyHero4 from "../../public/StudyHero/StudyHero4.jpg";
import studyHero5 from "../../public/StudyHero/StudyHero5.jpg";
import studyHero6 from "../../public/StudyHero/StudyHero6.jpg";
import costOfLiving1 from "../../public/CostOfLiving/Cost_of_Living1.jpg";
import costOfLiving2 from "../../public/CostOfLiving/Cost_of_Living2.jpg";
import costOfLiving3 from "../../public/CostOfLiving/Cost_of_Living3.jpg";
import costOfLiving4 from "../../public/CostOfLiving/Cost_of_Living4.jpg";
import minimize1 from "../../public/Minimize/Minimize1.jpeg";
import minimize2 from "../../public/Minimize/Minimize2.jpeg";
import minimize3 from "../../public/Minimize/Minimize3.jpeg";
import minimize4 from "../../public/Minimize/Minimize4.jpeg";
import minimize5 from "../../public/Minimize/Minimize5.jpeg";
import tokyoNoire1 from "../../public/TokyoNoire/TokyoNoire1.jpeg";
import tokyoNoire2 from "../../public/TokyoNoire/TokyoNoire2.jpeg";
import tokyoNoire3 from "../../public/TokyoNoire/TokyoNoire3.jpeg";
import tokyoNoire4 from "../../public/TokyoNoire/TokyoNoire4.jpeg";
import tokyoNoire5 from "../../public/TokyoNoire/TokyoNoire5.jpeg";

export type ProjectLink = { kind: "github" | "website" | "youtube"; href: string };

export type Project = {
  /** Used as the section's anchor (#id), e.g. for the project bubbles. */
  id: string;
  title: string;
  description: string;
  links: ProjectLink[];
  /** Slides that fly in as you scroll, stacked on top of each other. */
  images: StaticImageData[];
  /** Fixed display width for the slides, if they should not use their natural size. */
  imageWidth?: number;
  youtubeId: string;
  /** Tailwind gradient classes for the project section and its video section. */
  sectionBg: string;
  videoBg: string;
  /** Extra classes for the title/description (kept per-project to match the original look). */
  titleClass?: string;
  descriptionClass?: string;
  iconClass?: string;
};

// To add a project: drop its screenshots in /public/<Name>/, import them above,
// and add an entry here. It appears on the page and in the project bubbles.
export const projects: Project[] = [
  {
    id: "studyhero",
    title: "study hero",
    description: "A gamified pomodoro web application for game-lovers.",
    links: [
      { kind: "github", href: "https://github.com/Ghost-Pepper-Greenfield/study-hero" },
      { kind: "youtube", href: "https://youtu.be/W3A1CalxAh8" },
    ],
    images: [studyHero1, studyHero2, studyHero3, studyHero4, studyHero5, studyHero6],
    youtubeId: "W3A1CalxAh8",
    sectionBg: "from-mint to-creme",
    videoBg: "from-creme to-creme",
    titleClass: "mt-36",
  },
  {
    id: "costofliving",
    title: "cost of living",
    description: "A legacy project that helps people find their next home within their budget.",
    links: [{ kind: "youtube", href: "https://youtu.be/iHT86r0FjlU" }],
    images: [costOfLiving1, costOfLiving2, costOfLiving3, costOfLiving4],
    youtubeId: "iHT86r0FjlU",
    sectionBg: "from-creme to-coffee",
    videoBg: "from-coffee to-coffee",
    descriptionClass: "text-center",
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
    images: [minimize1, minimize2, minimize3, minimize4, minimize5],
    imageWidth: 950,
    youtubeId: "w1CIF_Wsj-Y",
    sectionBg: "from-coffee to-pink",
    videoBg: "from-pink to-charcoal",
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
    images: [tokyoNoire1, tokyoNoire2, tokyoNoire3, tokyoNoire4, tokyoNoire5],
    imageWidth: 950,
    youtubeId: "biS2DXEf2As",
    sectionBg: "from-charcoal to-charcoal",
    videoBg: "from-charcoal to-charcoal",
    descriptionClass: "text-center text-white",
    iconClass: "text-white",
  },
];
