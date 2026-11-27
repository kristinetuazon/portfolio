import { useRouter } from "next/router";

/**
 * Site copy in English and Japanese. Pages live at "/" (English) and "/ja"
 * (Japanese) via Next.js i18n routing. The Japanese version covers the intro,
 * nav, Lazuli section, "off the clock" and contact; the rest stays English.
 *
 * `ja` must have exactly the same shape as `en` (TypeScript checks this), so a
 * missing translation is a build error rather than a blank on the page.
 */

const en = {
  langName: "English",
  meta: {
    title: "Kristine Tuazon · Software Engineer · kristineCodes;",
    description:
      "Kristine Tuazon is a software engineer in Yokohama, Japan: frontend and end-to-end testing (QA) at Lazuli. Portfolio, projects and letters.",
    imageAlt: "Kristine Tuazon, software engineer in Yokohama, Japan",
  },
  nav: {
    hi: "Hi",
    lazuli: "Lazuli",
    about: "Story",
    projects: "Projects",
    offhours: "Off hours",
    contact: "Contact",
    mailbox: "mailbox",
    sections: "Sections",
  },
  intro: {
    hello: "Hi, my name is Kristine",
    sub: "and I'm a software engineer based in Yokohama, Japan.",
    scroll: "Scroll",
    poke: "Poke the dango",
  },
  lazuli: {
    lead: "these days, I'm a",
    titleLine1: "Software Engineer",
    titleLine2: "at Lazuli",
    since: "June 2023 – now",
    place: "Tokyo, hybrid",
    tenureFallback: "3+ years",
    tagline: "mostly QA, with a frontend heart",
    blurbBefore: "Lazuli is a Japanese SaaS startup. Its",
    blurbProduct: "Product Data Platform",
    blurbAfter: "helps companies collect, clean and put their product data to work.",
    stats: ["tests", "products", "PRs merged", "tickets covered", "bugs filed"],
    toolsLabel: "Tools I use",
    timeline: "three years, three dango",
    now: "now",
    years: [
      {
        tag: "Year 1 · 2023–24",
        title: "Filters, lists & search",
        text: "Frontend for the first version of Lazuli's Product Data Platform: the filters, product lists and product search.",
      },
      {
        tag: "Year 2 · 2024–25",
        title: "Translations & an admin tool",
        text: "More frontend, including the language toggle for translations, plus an internal admin tool in Ruby for managing customer data.",
      },
      {
        tag: "Year 3 · 2025–now",
        title: "QA & end-to-end testing",
        text: "I built Lazuli's end-to-end test suite from scratch and I own it: about 390 Playwright tests across three products, run on dev, staging and production in three browsers. CI checks stop a broken test from being merged, and I tracked down the race condition behind random test failures.",
      },
    ],
  },
  offhours: {
    lead: "when I'm not writing tests, I'm usually making something",
    title: "off the clock;",
    onFoot: "on foot ✓",
    items: {
      photos: {
        title: "Photos & videos",
        text: "Taking photos and videos. Lately: wedding photos for friends.",
      },
      vlogs: {
        title: "Quiet vlogs",
        text: "Small, non-talking vlogs. Maybe a future YouTube channel?",
      },
      invites: { title: "Wedding invites", text: "Making wedding invitations for friends, too." },
      letters: {
        title: "Letters, journals & scrapbooks",
        text: "Handwritten letters, journaling and scrapbooking (yes, like this page).",
      },
      walks: {
        title: "Long walks",
        text: "Recently walked the whole Yamanote line loop, all 30 stations.",
      },
      painting: {
        title: "Painting & cross-stitch",
        text: "My most complicated patterns so far: Van Gogh's Sunflowers and Monet's Young Girls in the Rowing Boat.",
      },
      sewing: {
        title: "Sewing",
        text: "My COVID hobby: pillow covers and such. Currently in need of a new sewing machine.",
      },
      bread: {
        title: "Bread",
        text: "I started baking bread because I like soup. Favorite add-ins: cheese or dried cranberries.",
      },
    },
  },
  counter: {
    title: "Soap bubbles you've popped",
    popped: "popped",
    allTime: "all-time",
    cheers: {
      10: "nice! ✨",
      25: "bubble pro",
      50: "unstoppable!",
      100: "bubble legend 👑",
      250: "…do you need a break? 🍵",
    },
  },
  contact: {
    title: "contact me",
    sub: "and let's collaborate ✨",
  },
  notFound: {
    title: "This page got eaten",
    text: "Whatever was here seems to have been somebody's lunch.",
    home: "Back to the start",
    mailbox: "Read the mailbox",
  },
};

export type Dict = typeof en;

const ja: Dict = {
  langName: "日本語",
  meta: {
    title: "Kristine Tuazon · ソフトウェアエンジニア · kristineCodes;",
    description:
      "横浜在住のソフトウェアエンジニア、Kristine Tuazonのポートフォリオ。LazuliでフロントエンドとE2Eテスト（QA）を担当しています。",
    imageAlt: "横浜在住のソフトウェアエンジニア、Kristine Tuazon",
  },
  nav: {
    hi: "はじめに",
    lazuli: "Lazuli",
    about: "ストーリー",
    projects: "プロジェクト",
    offhours: "オフの日",
    contact: "連絡先",
    mailbox: "mailbox",
    sections: "セクション",
  },
  intro: {
    hello: "こんにちは、クリスティンです",
    sub: "横浜在住のソフトウェアエンジニアです。",
    scroll: "スクロール",
    poke: "お団子をつつく",
  },
  lazuli: {
    lead: "現在は",
    titleLine1: "Lazuliの",
    titleLine2: "ソフトウェアエンジニア",
    since: "2023年6月〜現在",
    place: "東京・ハイブリッド勤務",
    tenureFallback: "3年以上",
    tagline: "主にQA、心はフロントエンド",
    blurbBefore: "Lazuliは日本のSaaSスタートアップです。",
    blurbProduct: "Product Data Platform",
    blurbAfter: "で、企業の商品データの収集・整備・活用を支えています。",
    stats: ["テスト", "プロダクト", "マージしたPR", "対応チケット", "起票したバグ"],
    toolsLabel: "使っているツール",
    timeline: "3年間、3つのお団子",
    now: "現在",
    years: [
      {
        tag: "1年目 · 2023–24",
        title: "フィルター・一覧・検索",
        text: "Product Data Platform初期版のフロントエンドを担当。フィルター、商品一覧、商品検索を作りました。",
      },
      {
        tag: "2年目 · 2024–25",
        title: "多言語対応と管理ツール",
        text: "引き続きフロントエンドを担当し、翻訳の言語切り替えを実装。顧客データを管理する社内向けの管理ツールもRubyで開発しました。",
      },
      {
        tag: "3年目 · 2025–現在",
        title: "QA・E2Eテスト",
        text: "LazuliのE2Eテストスイートをゼロから構築し、オーナーとして運用しています。3つのプロダクトにわたる約390件のPlaywrightテストを、開発・ステージング・本番の各環境で3種類のブラウザに対して実行。壊れたテストがマージされないようCIでチェックし、テストがランダムに失敗する原因だった競合状態も突き止めました。",
      },
    ],
  },
  offhours: {
    lead: "テストを書いていないときは、たいてい何かを作っています",
    title: "オフの日;",
    onFoot: "徒歩で ✓",
    items: {
      photos: {
        title: "写真と動画",
        text: "写真や動画を撮るのが好きです。最近は友人の結婚式の写真も撮っています。",
      },
      vlogs: {
        title: "しゃべらないVlog",
        text: "小さな、しゃべらないVlogを作っています。いつかYouTubeチャンネルにするかも？",
      },
      invites: { title: "結婚式の招待状", text: "友人の結婚式の招待状も作っています。" },
      letters: {
        title: "手紙・日記・スクラップブック",
        text: "手書きの手紙、日記、スクラップブック作り（そう、このページみたいに）。",
      },
      walks: {
        title: "長い散歩",
        text: "最近、山手線を一周歩きました。全30駅です。",
      },
      painting: {
        title: "絵とクロスステッチ",
        text: "これまでで一番複雑だった図案は、ゴッホの「ひまわり」とモネの「舟遊び」です。",
      },
      sewing: {
        title: "裁縫",
        text: "コロナ禍に始めた趣味で、クッションカバーなどを作りました。新しいミシンを探し中です。",
      },
      bread: {
        title: "パン作り",
        text: "スープが好きなので、パンを焼き始めました。チーズやドライクランベリーを入れるのがお気に入り。",
      },
    },
  },
  counter: {
    title: "割ったシャボン玉の数",
    popped: "個割った",
    allTime: "個（これまでの合計）",
    cheers: {
      10: "いいね！✨",
      25: "シャボン玉のプロ",
      50: "止まらない！",
      100: "シャボン玉マスター 👑",
      250: "…ちょっと休憩しませんか？🍵",
    },
  },
  contact: {
    title: "連絡先",
    sub: "一緒に何か作りましょう ✨",
  },
  notFound: {
    title: "このページは食べられちゃいました",
    text: "ここにあったものは、誰かのお昼ごはんになったみたいです。",
    home: "はじめに戻る",
    mailbox: "mailboxを読む",
  },
};

export type Locale = "en" | "ja";
export const LOCALES: Locale[] = ["en", "ja"];

export const useLocale = (): Locale => (useRouter().locale === "ja" ? "ja" : "en");

/** The copy for the current page's language. */
export const useT = (): Dict => (useLocale() === "ja" ? ja : en);

/** "3 years 6 months" / "3年6ヶ月" since June 2023, counting the starting month like LinkedIn. */
export function timeAtLazuli(locale: Locale, now = new Date()) {
  const months = (now.getFullYear() - 2023) * 12 + (now.getMonth() + 1 - 6) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (locale === "ja") return rest ? `${years}年${rest}ヶ月` : `${years}年`;
  const y = `${years} year${years === 1 ? "" : "s"}`;
  return rest ? `${y} ${rest} month${rest === 1 ? "" : "s"}` : y;
}
