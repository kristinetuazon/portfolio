/**
 * The "now" line under the intro: what Kristine is up to these days.
 * Edit freely; keep each one short. Update `updated` when you change it.
 */
export const NOW_UPDATED = "2026-11-27";

export type NowItem = {
  icon: string;
  en: { verb: string; what: string };
  ja: { verb: string; what: string };
};

export const NOW: NowItem[] = [
  {
    icon: "📖",
    en: { verb: "reading", what: "Jin Yong's Condor Chronicles, book 2: A Bond Undone" },
    ja: { verb: "読書中", what: "金庸『射鵰英雄伝』英訳版 第2巻「A Bond Undone」" },
  },
  {
    icon: "🎧",
    en: { verb: "listening to", what: "Dionela's “Monday Afternoon”" },
    ja: { verb: "聴いている曲", what: "Dionelaの「Monday Afternoon」" },
  },
  {
    icon: "🗣️",
    en: { verb: "learning", what: "conversational Chinese" },
    ja: { verb: "勉強中", what: "中国語の日常会話" },
  },
  {
    icon: "👟",
    en: { verb: "latest walk", what: "Yoyogi Station to Harajuku" },
    ja: { verb: "さいきんの散歩", what: "代々木駅から原宿まで" },
  },
  {
    icon: "🐈",
    en: { verb: "enamoured by", what: "cat-print Christmas paper" },
    ja: { verb: "ときめき中", what: "猫柄のクリスマスペーパー" },
  },
];
