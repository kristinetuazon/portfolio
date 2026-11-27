import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";
import { useT, type Dict } from "../i18n";

// The tooling around the test suite, one bento compartment each.
// (Titles and descriptions for everything here live in src/i18n, under "beyond".)
const AUTOMATION: { id: keyof Dict["beyond"]["automation"]; icon: string }[] = [
  { id: "reports", icon: "📮" },
  { id: "helpDocs", icon: "📸" },
  { id: "testData", icon: "🧹" },
  { id: "guardrails", icon: "🚦" },
  { id: "lint", icon: "🧪" },
  { id: "comments", icon: "✂️" },
];

const AI: (keyof Dict["beyond"]["ai"])[] = ["daily", "skills", "jira", "api"];

// Resources for the "currently learning" note.
const LEARNING: { id: keyof Dict["beyond"]["learning"]; icon: string; href: string }[] = [
  { id: "talk", icon: "📺", href: "https://www.youtube.com/watch?v=O_zcc6Xl12g" },
  { id: "pstack", icon: "🧰", href: "https://github.com/cursor/plugins/tree/main/pstack" },
  { id: "robot", icon: "🤖", href: "https://robotframework.org/" },
  {
    id: "site",
    icon: "🧪",
    href: "https://github.com/kristinetuazon/portfolio/tree/main/portfolio/tests/robot",
  },
];

// Compartment tints from the site palette.
const TINTS = ["#f2a7b6", "#e9e2d4", "#a3c46f", "#f6c177", "#c88e95", "#708a81"];

/** Below the Lazuli section: the automation and AI work around the test suite. */
const BeyondTests = () => {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.from(".bt-box", {
        y: 40,
        scale: 0.92,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.08,
        scrollTrigger: { trigger: ".bt-bento", start: "top 80%" },
      });
      gsap.from(".bt-learning", {
        y: -50,
        rotation: 6,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".bt-learning", start: "top 88%" },
      });
      gsap.from(".bt-ai > *", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".bt-ai", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="w-screen bg-plum px-6 pb-28 pt-10 md:pl-20 md:pr-36"
      aria-labelledby="beyond-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-bodyRegularItalic text-creme">{t.beyond.lead}</p>
        <h3
          id="beyond-title"
          className="mt-1 font-heading text-2xl uppercase tracking-widest text-white sm:text-3xl"
        >
          {t.beyond.title}
        </h3>

        {/* A bento box of automation */}
        <ul className="bt-bento mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-charcoal/50 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION.map(({ id, icon }, i) => (
            <li
              key={id}
              className="bt-box rounded-2xl border-2 bg-charcoal/80 p-5"
              style={{ borderColor: `${TINTS[i]}aa` }}
            >
              <p className="text-2xl" aria-hidden="true">
                {icon}
              </p>
              <h4 className="mt-2 font-audreyMedium text-lg uppercase tracking-wide text-white">
                {t.beyond.automation[id].title}
              </h4>
              <p className="mt-2 font-bodyLight leading-relaxed text-creme">
                {t.beyond.automation[id].text}
              </p>
            </li>
          ))}
        </ul>

        {/* How AI fits in */}
        <div className="bt-ai mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-bodyRegularItalic text-creme">{t.beyond.aiLead}</p>
            <h3 className="mt-1 font-heading text-2xl uppercase tracking-widest text-white sm:text-3xl">
              {t.beyond.aiTitle}
            </h3>
            <blockquote className="mt-6 border-l-4 border-orange pl-5 font-bodyRegularItalic text-xl leading-relaxed text-white">
              {t.beyond.aiQuote}
            </blockquote>
          </div>
          <dl className="grid gap-5 sm:grid-cols-2">
            {AI.map((id) => (
              <div key={id}>
                <dt className="font-audreyMedium uppercase tracking-wide text-white">
                  {t.beyond.ai[id].title}
                </dt>
                <dd className="mt-1 font-bodyLight leading-relaxed text-creme">
                  {t.beyond.ai[id].text}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* What she's learning right now, as a taped-down note */}
        <aside
          className="bt-learning oh-note mx-auto mt-20 max-w-3xl"
          style={{ "--tilt": "-1deg", "--tape": "#9acd32" } as React.CSSProperties}
          aria-labelledby="learning-title"
        >
          <span className="oh-tape" aria-hidden="true" />
          <h3
            id="learning-title"
            className="font-heading text-2xl uppercase tracking-widest text-ink"
          >
            {t.beyond.learningTitle}
          </h3>
          <p className="mt-3 font-bodyRegular text-lg leading-relaxed text-[#3d322f]">
            {t.beyond.learningText}
          </p>
          <ul className="mt-5 space-y-2 font-bodyRegularItalic text-lg text-[#5a4a45]">
            {LEARNING.map(({ id, icon, href }) => {
              const { verb, label, by } = t.beyond.learning[id];
              return (
                <li key={href}>
                  <span aria-hidden="true">{icon}</span> {verb}:{" "}
                  <a
                    href={href}
                    className="font-bodyRegular not-italic text-[#8e3b52] underline decoration-[#dd8e58] underline-offset-4 hover:text-ink"
                  >
                    {label}
                  </a>{" "}
                  {by}
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default BeyondTests;
