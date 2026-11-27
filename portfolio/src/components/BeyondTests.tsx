import { useRef } from "react";
import { gsap, reducedMotion, useGSAP } from "../lib/gsap";

// The tooling around the test suite, one bento compartment each.
const AUTOMATION = [
  {
    icon: "📮",
    title: "Test reports, straight to Slack",
    text: "A runner saves a report for each product suite, and a second script combines them into one summary ready to post in Slack.",
  },
  {
    icon: "📸",
    title: "Help docs on autopilot",
    text: "A Playwright project captures product screenshots for the help center, and a script turns the help sample files into PDFs.",
  },
  {
    icon: "🧹",
    title: "Clean test data",
    text: "Scripts that set up test data, plus a cleanup for the test organization with a dry-run mode, so nothing is deleted until I approve it.",
  },
  {
    icon: "🚦",
    title: "Guardrails on every PR",
    text: "Typecheck and lint, a Jira ticket for every new test, a check that loads every test without running it, and a guard against merging into an old branch.",
  },
  {
    icon: "🧪",
    title: "Lint rules against flaky tests",
    text: "Custom GritQL rules that ban force-clicks, picking elements by position, XPath, and catching errors without handling them.",
  },
  {
    icon: "✂️",
    title: "Comment cleanup",
    text: "A tool built on the TypeScript compiler that strips code comments but keeps ticket links and the docs on shared helpers.",
  },
];

const AI = [
  {
    title: "Claude Code, every day",
    text: "46 commits co-written with it. I review every change and own the result.",
  },
  {
    title: "Two reusable skills for the team",
    text: "A suite audit that ranks flaky waits, environment setup and CI readiness for me to approve before anything changes, and a check that runs the suite on dev, staging, then production after environment changes.",
  },
  {
    title: "Jira from the agent",
    text: "Bugs and test-coverage tickets filed in a set format through the Atlassian connection.",
  },
  {
    title: "Checks through the product's API",
    text: "Creating test data and checking results with the product's own command-line tool and its Claude connection.",
  },
];

// Resources for the "currently learning" note.
const LEARNING = [
  {
    icon: "📺",
    verb: "Watching",
    label: "All Code Is Slop (Except Mine)",
    by: "by Lauren Tan",
    href: "https://www.youtube.com/watch?v=O_zcc6Xl12g",
  },
  {
    icon: "🧰",
    verb: "Exploring",
    label: "pstack",
    by: "— poteto's agent skills",
    href: "https://github.com/cursor/plugins/tree/main/pstack",
  },
  {
    icon: "🤖",
    verb: "Trying",
    label: "Robot Framework",
    by: "— another way to write tests",
    href: "https://robotframework.org/",
  },
];

// Compartment tints from the site palette.
const TINTS = ["#f2a7b6", "#e9e2d4", "#a3c46f", "#f6c177", "#c88e95", "#708a81"];

/** Below the Lazuli section: the automation and AI work around the test suite. */
const BeyondTests = () => {
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
      className="w-screen bg-[#3a2d37] px-6 pb-28 pt-10 md:pl-20 md:pr-36"
      aria-labelledby="beyond-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-bodyRegularItalic text-creme">the little machines I built around them</p>
        <h3
          id="beyond-title"
          className="mt-1 font-heading text-2xl uppercase tracking-widest text-white sm:text-3xl"
        >
          beyond the tests;
        </h3>

        {/* A bento box of automation */}
        <ul className="bt-bento mt-10 grid gap-4 rounded-[2rem] border border-white/10 bg-charcoal/50 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATION.map(({ icon, title, text }, i) => (
            <li
              key={title}
              className="bt-box rounded-2xl border-2 bg-charcoal/80 p-5"
              style={{ borderColor: `${TINTS[i]}aa` }}
            >
              <p className="text-2xl" aria-hidden="true">
                {icon}
              </p>
              <h4 className="mt-2 font-audreyMedium text-lg uppercase tracking-wide text-white">
                {title}
              </h4>
              <p className="mt-2 font-bodyLight leading-relaxed text-creme">{text}</p>
            </li>
          ))}
        </ul>

        {/* How AI fits in */}
        <div className="bt-ai mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-bodyRegularItalic text-creme">and yes, I use AI</p>
            <h3 className="mt-1 font-heading text-2xl uppercase tracking-widest text-white sm:text-3xl">
              with guardrails;
            </h3>
            <blockquote className="mt-6 border-l-4 border-orange pl-5 font-bodyRegularItalic text-xl leading-relaxed text-white">
              AI speeds me up; the guardrails are mine: lint rules, a ticket for every test, and a
              findings report I approve before anything changes.
            </blockquote>
          </div>
          <dl className="grid gap-5 sm:grid-cols-2">
            {AI.map(({ title, text }) => (
              <div key={title}>
                <dt className="font-audreyMedium uppercase tracking-wide text-white">{title}</dt>
                <dd className="mt-1 font-bodyLight leading-relaxed text-creme">{text}</dd>
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
            className="font-heading text-2xl uppercase tracking-widest text-charcoal"
          >
            currently learning;
          </h3>
          <p className="mt-3 font-bodyRegular text-lg leading-relaxed text-[#3d322f]">
            We ship really quickly at a startup, and the product is still very fluid, with lots of
            changes and requests. So I&apos;m learning how to make agent-written code trustworthy
            enough to auto-merge: getting types, tests and automatic checks good enough that AI
            agents can open pull requests, and eventually merge them on their own.
          </p>
          <ul className="mt-5 space-y-2 font-bodyRegularItalic text-lg text-[#5a4a45]">
            {LEARNING.map(({ icon, verb, label, by, href }) => (
              <li key={href}>
                <span aria-hidden="true">{icon}</span> {verb}:{" "}
                <a
                  href={href}
                  className="font-bodyRegular not-italic text-[#8e3b52] underline decoration-[#dd8e58] underline-offset-4 hover:text-charcoal"
                >
                  {label}
                </a>{" "}
                {by}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default BeyondTests;
