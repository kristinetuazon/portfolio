import { useRouter } from "next/router";

/**
 * Site copy in English and Japanese. Pages live at "/" (English) and "/ja"
 * (Japanese) via Next.js i18n routing. The whole home page is translated; the
 * mailbox letters stay in English.
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
    now: "now;",
    nowNext: "Show the next thing I'm up to",
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
        highlights: [
          "Rebuilt the product catalogue and shipped it to production",
          "UIs for AI features: colour estimation, hashtags and product descriptions",
          "Early platform screens: sign-in, tables, an in-browser SQL editor and the task scheduler",
          "The app's frontend test setup",
        ],
      },
      {
        tag: "Year 2 · 2024–25",
        title: "Translations & an admin tool",
        text: "More frontend, including the language toggle for translations, plus an internal admin tool in Ruby for managing customer data.",
        highlights: [
          "English and Japanese localisation of the whole app",
          "The admin tool: organisations, users, roles, invites and an audit log",
          "Data connectors (SFTP, S3) and scheduled data sync",
          "A digital asset manager: folders, tags, uploads and history",
          "Sorting, filtering and pagination across every list",
        ],
      },
      {
        tag: "Year 3 · 2025–now",
        title: "QA & end-to-end testing",
        text: "I built Lazuli's end-to-end test suite from scratch and I own it: about 390 Playwright tests across three products, run on dev, staging and production in three browsers. CI checks stop a broken test from being merged, and I tracked down the race condition behind random test failures.",
        highlights: [
          "Accuracy tests that score PDF and Excel extraction against real product catalogues",
          "Regression tests written from bug tickets, part of every release",
          "Moved the whole suite over to the new version of the product before launch",
          "Lint rules that block flaky patterns, and a fix for random sign-outs mid-run",
          "Rewrote the help centre for the new product",
        ],
      },
    ],
  },
  offhours: {
    lead: "when I'm not writing tests, I'm usually making something",
    title: "off the clock;",
    onFoot: "on foot ✓",
    photoAlts: {
      camera: "Kristine taking a photo with a film camera on an old wooden street",
      walking: "Kristine walking away down a narrow stone alley",
    },
    items: {
      photos: {
        title: "Photos & videos",
        text: "Taking photos and videos. Lately: wedding photos for friends.",
      },
      vlogs: {
        title: "Quiet vlogs",
        text: "Small, non-talking vlogs. Maybe a future YouTube channel?",
      },
      invites: {
        title: "Wedding invites & websites",
        text: "Making wedding invitations and wedding websites for friends, too.",
      },
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
  story: {
    startedWith: "It all started with a",
    hooked: "and I knew I was hooked.",
    history: {
      lead: "the commit history so far",
      chartTitle: "merged pull requests at Lazuli, per year",
      chartNote: "2026 so far",
      stats: [
        { value: "710", label: "pull requests merged" },
        { value: "42", label: "repositories" },
        { value: "2020", label: "first hello, world" },
      ],
      chapters: [
        {
          id: "hello",
          date: "Oct 2020",
          title: "hello, world",
          text: "I was teaching English in Tokyo with time on my hands during the pandemic, so I started a JavaScript foundations course, aiming to become a software engineer.",
          tags: ["JavaScript"],
        },
        {
          id: "bootcamp",
          date: "Aug 2022",
          title: "Code Chrysalis",
          text: "A full-stack bootcamp in Tokyo: data structures, REST APIs, SQL, React and TypeScript, and four apps built in three months, alone and in teams.",
          tags: ["Node / Express", "SQL", "React", "Firebase"],
        },
        {
          id: "lazuli",
          date: "Jun 2023",
          title: "joined Lazuli",
          text: "Frontend engineer at a product-data startup. First up: rebuilding the product catalogue and shipping it to production, UIs for AI features like product-description generation, and the app's frontend test setup.",
          tags: ["Next.js", "TypeScript"],
        },
        {
          id: "platform",
          date: "2023 – 25",
          title: "building the platform",
          text: "Two years on the Product Data Platform's frontend: data connectors and sync schedules, an internal admin console, a digital asset manager, and the full English and Japanese localisation.",
          tags: ["React", "Auth0", "i18n"],
        },
        {
          id: "qa",
          date: "2025 – now",
          title: "into QA",
          text: "I moved into quality engineering and built Lazuli's end-to-end test platform almost from scratch: Playwright suites across every product area, run on dev, staging and production, with CI rules that keep the tests reliable.",
          tags: ["Playwright", "GitHub Actions", "GritQL"],
        },
        {
          id: "now",
          date: "now",
          title: "still saying hello",
          text: "Learning how to make AI-written code trustworthy enough to merge, and practising on this website, which is tested with Robot Framework on every change.",
          tags: [],
        },
      ],
    },
    readStory: "Why programming? Read the story →",
    photos: {
      camera: "Kristine taking a photo on a street in Japan",
      photobooth: "Photo booth snapshot with friends",
      classmates: "Kristine with classmates in matching team shirts",
      kimono: "Kristine in a kimono by a canal",
      group: "Group photo with classmates",
    },
  },
  beyond: {
    lead: "the little machines I built around them",
    title: "beyond the tests;",
    automation: {
      reports: {
        title: "Test reports, straight to Slack",
        text: "A runner saves a report for each product suite, and a second script combines them into one summary ready to post in Slack.",
      },
      helpDocs: {
        title: "Help docs on autopilot",
        text: "A Playwright project captures product screenshots for the help center, and a script turns the help sample files into PDFs.",
      },
      testData: {
        title: "Clean test data",
        text: "Scripts that set up test data, plus a cleanup for the test organization with a dry-run mode, so nothing is deleted until I approve it.",
      },
      guardrails: {
        title: "Guardrails on every PR",
        text: "Typecheck and lint, a Jira ticket for every new test, a check that loads every test without running it, and a guard against merging into an old branch.",
      },
      lint: {
        title: "Lint rules against flaky tests",
        text: "Custom GritQL rules that ban force-clicks, picking elements by position, XPath, and catching errors without handling them.",
      },
      comments: {
        title: "Comment cleanup",
        text: "A tool built on the TypeScript compiler that strips code comments but keeps ticket links and the docs on shared helpers.",
      },
    },
    aiLead: "and yes, I use AI",
    aiTitle: "with guardrails;",
    aiQuote:
      "AI speeds me up; the guardrails are mine: lint rules, a ticket for every test, and a findings report I approve before anything changes.",
    ai: {
      daily: {
        title: "Claude Code, every day",
        text: "46 commits co-written with it. I review every change and own the result.",
      },
      skills: {
        title: "Two reusable skills for the team",
        text: "A suite audit that ranks flaky waits, environment setup and CI readiness for me to approve before anything changes, and a check that runs the suite on dev, staging, then production after environment changes.",
      },
      jira: {
        title: "Jira from the agent",
        text: "Bugs and test-coverage tickets filed in a set format through the Atlassian connection.",
      },
      api: {
        title: "Checks through the product's API",
        text: "Creating test data and checking results with the product's own command-line tool and its Claude connection.",
      },
    },
    learningTitle: "currently learning;",
    learningText:
      "We ship really quickly at a startup, and the product is still very fluid, with lots of changes and requests. So I'm learning how to make agent-written code trustworthy enough to auto-merge: getting types, tests and automatic checks good enough that AI agents can open pull requests, and eventually merge them on their own.",
    learning: {
      talk: { verb: "Watching", label: "All Code Is Slop (Except Mine)", by: "by Lauren Tan" },
      pstack: { verb: "Exploring", label: "pstack", by: "— poteto's agent skills" },
      robot: { verb: "Trying", label: "Robot Framework", by: "— another way to write tests" },
      site: {
        verb: "Practising on",
        label: "this website",
        by: "— tested with Robot Framework on every change",
      },
    },
  },
  projects: {
    lead: "things I've made",
    title: "projects;",
    sub: "things I've built, on my own and in teams",
    seeAll: "all projects",
    links: { live: "visit the site", github: "code on GitHub", video: "demo video" },
    screenshot: (title: string) => `${title} screenshot`,
    metaTitle: "Projects · kristineCodes;",
    metaDescription:
      "Projects by Kristine Tuazon, software engineer in Yokohama: Minimize v2, this website, and Tokyo Noire.",
  },
  theme: { toLight: "Switch to the light theme", toDark: "Switch to the dark theme" },
  contact: {
    title: "contact me",
    sub: "and let's collaborate ✨",
    note: "Questions, ideas, or just hello: my mailbox is always open.",
    email: "email",
    showEmail: "show my email",
    greetingsFrom: "greetings from",
    flipHint: "turn it over",
    turnOver: "Turn the postcard over",
    seeFront: "see the front",
    frontAlt: "Kristine in a kimono on a bridge over a small canal, with autumn leaves",
    copy: "copy",
    copied: "copied!",
    copyLabel: "Copy my email address",
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
    hi: "ようこそ",
    lazuli: "Lazuli",
    about: "きっかけ",
    projects: "作品",
    offhours: "おやすみの日",
    contact: "おたより",
    mailbox: "ポスト",
    sections: "セクション",
  },
  intro: {
    hello: "こんにちは、クリスティンです",
    sub: "横浜でソフトウェアエンジニアをしています。",
    scroll: "スクロール",
    poke: "お団子をつついてみて",
    now: "いま;",
    nowNext: "次の「いま」を見る",
  },
  lazuli: {
    lead: "いまは",
    titleLine1: "Lazuliの",
    titleLine2: "ソフトウェアエンジニア",
    since: "2023年6月〜現在",
    place: "東京・ハイブリッド勤務",
    tenureFallback: "3年以上",
    tagline: "おもにQA、でも心はフロントエンド",
    blurbBefore: "Lazuliは日本のSaaSスタートアップ。",
    blurbProduct: "Product Data Platform",
    blurbAfter: "で、企業の商品データを集めて、整えて、活かすお手伝いをしています。",
    stats: ["テスト", "プロダクト", "マージしたPR", "対応チケット", "起票したバグ"],
    toolsLabel: "使っているツール",
    timeline: "3年で、お団子みっつ",
    now: "いま",
    years: [
      {
        tag: "1年目 · 2023–24",
        title: "フィルター・一覧・検索",
        text: "Product Data Platform最初のバージョンのフロントエンドを担当。フィルター、商品一覧、商品検索をつくりました。",
        highlights: [
          "商品カタログを作り直し、本番までリリース",
          "AI機能のUI：色の推定、ハッシュタグや商品説明文の生成",
          "プラットフォーム初期の画面：ログイン、テーブル、ブラウザ上のSQLエディター、タスクスケジューラー",
          "アプリのフロントエンドのテスト基盤",
        ],
      },
      {
        tag: "2年目 · 2024–25",
        title: "多言語対応と管理ツール",
        text: "引き続きフロントエンドを担当し、言語切り替え機能を実装。顧客データを管理する社内向けの管理ツールもRubyで開発しました。",
        highlights: [
          "アプリ全体の英語・日本語対応",
          "管理ツール：組織、ユーザー、権限、招待、監査ログ",
          "データ連携（SFTP、S3）と定期的なデータ同期",
          "デジタルアセット管理：フォルダー、タグ、アップロード、履歴",
          "すべての一覧での並べ替え・絞り込み・ページ送り",
        ],
      },
      {
        tag: "3年目 · 2025–現在",
        title: "QA・E2Eテスト",
        text: "LazuliのE2Eテストスイートをゼロから構築し、責任者として運用しています。3つのプロダクトにわたる約390件のPlaywrightテストを、開発・ステージング・本番の各環境で3種類のブラウザに対して実行。壊れたテストがマージされないようCIでチェックし、テストがランダムに失敗する原因だった競合状態も突き止めました。",
        highlights: [
          "実際の商品カタログを使って、PDFやExcelからの抽出精度を測るテスト",
          "バグのチケットをもとにした回帰テストを、リリースのたびに実行",
          "新バージョンのリリースに先がけて、テスト一式を移行",
          "不安定なテストの書き方を防ぐLintルールと、テストの途中でログアウトされてしまう不具合の修正",
          "新しいプロダクトに合わせてヘルプセンターを書き直し",
        ],
      },
    ],
  },
  offhours: {
    lead: "テストを書いていないときは、だいたい何かをつくっています",
    title: "おやすみの日;",
    onFoot: "完歩 ✓",
    photoAlts: {
      camera: "古い木造の街並みでフィルムカメラを構えるクリスティン",
      walking: "細い石畳の路地を歩いていくクリスティン",
    },
    items: {
      photos: {
        title: "写真と動画",
        text: "写真や動画を撮るのが好き。最近は友だちの結婚式の撮影も。",
      },
      vlogs: {
        title: "おしゃべりなしのVlog",
        text: "ナレーションなしの、ちいさなVlogをつくっています。いつかYouTubeチャンネルになるかも？",
      },
      invites: {
        title: "結婚式の招待状とWebサイト",
        text: "友だちの結婚式の招待状づくりや、ウェディングサイトづくりも。",
      },
      letters: {
        title: "手紙・日記・スクラップブック",
        text: "手書きの手紙、日記、スクラップブック（そう、このページみたいな）。",
      },
      walks: {
        title: "ながーい散歩",
        text: "この前、山手線を一周歩きました。全30駅、ぜんぶ徒歩で。",
      },
      painting: {
        title: "絵とクロスステッチ",
        text: "いちばん大変だった図案は、ゴッホの「ひまわり」とモネの「舟遊び」。",
      },
      sewing: {
        title: "おさいほう",
        text: "コロナ禍にはじめた趣味で、クッションカバーなどをつくりました。いまは新しいミシンを探しています。",
      },
      bread: {
        title: "パン作り",
        text: "スープが好きだから、パンも焼くようになりました。チーズやドライクランベリー入りがお気に入り。",
      },
    },
  },
  counter: {
    title: "割ったシャボン玉の数",
    popped: "個ぱちん！",
    allTime: "個（ぜんぶで）",
    cheers: {
      10: "いいね！✨",
      25: "シャボン玉名人",
      50: "とまらない！",
      100: "シャボン玉マスター 👑",
      250: "…そろそろ、お茶にしませんか？🍵",
    },
  },
  story: {
    startedWith: "すべては、この一行から",
    hooked: "その瞬間、すっかりとりこになりました。",
    history: {
      lead: "これまでのコミット履歴",
      chartTitle: "LazuliでマージしたPR（年ごと）",
      chartNote: "2026年は途中まで",
      stats: [
        { value: "710", label: "マージしたPR" },
        { value: "42", label: "リポジトリ" },
        { value: "2020", label: "はじめての hello, world" },
      ],
      chapters: [
        {
          id: "hello",
          date: "2020年10月",
          title: "hello, world",
          text: "東京で英語を教えていたころ、コロナ禍で時間ができたので、ソフトウェアエンジニアを目指してJavaScriptの基礎講座を始めました。",
          tags: ["JavaScript"],
        },
        {
          id: "bootcamp",
          date: "2022年8月",
          title: "Code Chrysalis",
          text: "東京のフルスタック・ブートキャンプへ。データ構造、REST API、SQL、React、TypeScriptを学び、3か月でひとりやチームで4つのアプリを作りました。",
          tags: ["Node / Express", "SQL", "React", "Firebase"],
        },
        {
          id: "lazuli",
          date: "2023年6月",
          title: "Lazuliへ",
          text: "商品データを扱うスタートアップに、フロントエンドエンジニアとして入社。最初の仕事は、商品カタログを作り直して本番リリースすること、商品説明文の生成などAI機能のUI、そしてフロントエンドのテスト基盤づくりでした。",
          tags: ["Next.js", "TypeScript"],
        },
        {
          id: "platform",
          date: "2023〜25年",
          title: "プラットフォームを育てる",
          text: "Product Data Platformのフロントエンドを2年間担当。データ連携と同期スケジュール、社内向けの管理ツール、デジタルアセット管理、そしてアプリ全体の英語・日本語対応を作りました。",
          tags: ["React", "Auth0", "i18n"],
        },
        {
          id: "qa",
          date: "2025年〜現在",
          title: "QAの道へ",
          text: "品質エンジニアリングに移り、LazuliのE2Eテスト基盤をほぼゼロから構築。すべてのプロダクト領域をカバーするPlaywrightのテストを開発・ステージング・本番で実行し、テストを安定させるCIのルールも整えました。",
          tags: ["Playwright", "GitHub Actions", "GritQL"],
        },
        {
          id: "now",
          date: "いま",
          title: "まだまだ hello",
          text: "AIが書いたコードを安心してマージできるようにする方法を勉強中。練習台はこのウェブサイトで、変更のたびにRobot Frameworkでテストしています。",
          tags: [],
        },
      ],
    },
    readStory: "なぜプログラミング？ 英語のお手紙を読む →",
    photos: {
      camera: "日本の街角で写真を撮るクリスティン",
      photobooth: "友人たちとのプリクラ",
      classmates: "おそろいのチームTシャツを着たクラスメートとクリスティン",
      kimono: "運河のそばで着物を着たクリスティン",
      group: "クラスメートとの集合写真",
    },
  },
  beyond: {
    lead: "テストのまわりにこしらえた、小さなからくりたち",
    title: "テストの、その先;",
    automation: {
      reports: {
        title: "テスト結果をSlackへお届け",
        text: "プロダクトごとのテストスイートのレポートをランナーが保存し、別のスクリプトがそれをひとつのまとめにして、そのままSlackに投稿できる形にします。",
      },
      helpDocs: {
        title: "ヘルプの資料づくりも自動で",
        text: "Playwrightのプロジェクトでヘルプセンター用のスクリーンショットを撮影し、スクリプトでヘルプのサンプルファイルをPDFに変換します。",
      },
      testData: {
        title: "テストデータはいつもきれいに",
        text: "テストデータを準備するスクリプトと、テスト用組織のクリーンアップ。ドライランモードつきなので、私がOKするまで何も消えません。",
      },
      guardrails: {
        title: "すべてのPRにガードレール",
        text: "型チェックとLint、新しいテストごとのJiraチケット、全テストを実行せずに読み込めるかの確認、そして古いブランチへのマージを防ぐガード。",
      },
      lint: {
        title: "不安定なテストを防ぐLintルール",
        text: "強制クリック、位置での要素指定、XPath、エラーの握りつぶしを禁止する、自作のGritQLルール。",
      },
      comments: {
        title: "コメントのおそうじ",
        text: "TypeScriptコンパイラを使ったツールで、コードコメントを取り除きつつ、チケットへのリンクと共通ヘルパーのドキュメントは残します。",
      },
    },
    aiLead: "そう、AIも使っています",
    aiTitle: "ガードレールつきで;",
    aiQuote:
      "AIで速くなっても、ガードレールは自分の手で。Lintルール、テストごとのチケット、そして変更の前に必ず目を通す調査レポート。",
    ai: {
      daily: {
        title: "Claude Codeと毎日",
        text: "いっしょに書いたコミットは46件。変更はすべて自分でレビューして、結果にも責任を持ちます。",
      },
      skills: {
        title: "チームで使える2つのスキル",
        text: "不安定な待機処理・環境設定・CIへの対応状況を洗い出して優先順位をつけ、変更前に私が承認するスイート監査。そして環境が変わったあとに、開発・ステージング・本番の順でスイートを実行するチェック。",
      },
      jira: {
        title: "エージェントからJiraへ",
        text: "バグやテストカバレッジのチケットを、Atlassian連携を通じて決まった形式で起票します。",
      },
      api: {
        title: "プロダクトのAPIでチェック",
        text: "プロダクト独自のコマンドラインツールとClaude連携を使って、テストデータを作成し、結果を確認します。",
      },
    },
    learningTitle: "いま勉強中;",
    learningText:
      "スタートアップは開発のスピードがとても速く、プロダクトもまだ流動的で、変更や要望がたくさんあります。そこで、エージェントが書いたコードを自動マージできるほど信頼できるものにする方法を学んでいます。型・テスト・自動チェックを十分に整えて、AIエージェントがプルリクエストを作成し、いずれは自分でマージまでできるようにするのが目標です。",
    learning: {
      talk: { verb: "見ているもの", label: "All Code Is Slop (Except Mine)", by: "（Lauren Tan）" },
      pstack: { verb: "さわっているもの", label: "pstack", by: "— potetoのエージェントスキル" },
      robot: {
        verb: "ためしているもの",
        label: "Robot Framework",
        by: "— テストを書くもうひとつの方法",
      },
      site: {
        verb: "練習台",
        label: "このウェブサイト",
        by: "— 変更のたびにRobot Frameworkでテスト",
      },
    },
  },
  projects: {
    lead: "つくったもの",
    title: "作品たち",
    sub: "ひとりで、チームで、つくってきたもの",
    seeAll: "作品をすべて見る",
    links: { live: "サイトを見る", github: "GitHubのコード", video: "デモ動画" },
    screenshot: (title: string) => `${title}のスクリーンショット`,
    metaTitle: "作品 · kristineCodes;",
    metaDescription:
      "横浜のソフトウェアエンジニア、Kristine Tuazonの作品：Minimize v2、このウェブサイト、Tokyo Noire。",
  },
  theme: { toLight: "昼のテーマにする", toDark: "夜のテーマにする" },
  contact: {
    title: "おたよりください",
    sub: "いっしょに何かつくりませんか ✨",
    note: "質問でも、アイデアでも、ただのあいさつでも。いつでもお待ちしています。",
    email: "メール",
    showEmail: "メールアドレスを表示",
    greetingsFrom: "日本から、こんにちは",
    flipHint: "裏返してみて",
    turnOver: "はがきを裏返す",
    seeFront: "表を見る",
    frontAlt: "紅葉の小川にかかる橋の上の、着物姿のクリスティン",
    copy: "コピー",
    copied: "コピーしました",
    copyLabel: "メールアドレスをコピー",
  },
  notFound: {
    title: "このページ、食べられちゃいました",
    text: "ここにあったものは、だれかのお昼ごはんになったみたい。",
    home: "トップへもどる",
    mailbox: "お手紙を読む",
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
