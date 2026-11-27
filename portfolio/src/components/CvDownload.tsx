import { useState } from "react";

type State = "idle" | "loading" | "error";

/**
 * "Download CV" button. The file comes from /api/cv, which checks the request
 * is from a person on this site before sending it (see that route for details).
 */
const CvDownload = ({ className = "" }: { className?: string }) => {
  const [state, setState] = useState<State>("idle");

  const download = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    const website = new FormData(e.currentTarget).get("website") ?? "";
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "Kristine_Tuazon_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setState("idle");
    } catch {
      setState("error");
    }
  };

  return (
    <form onSubmit={download} className={className}>
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="rounded-full border-2 border-creme px-6 py-2 font-audreyMedium uppercase tracking-widest text-white transition-colors hover:bg-creme hover:text-charcoal disabled:opacity-60"
      >
        {state === "loading" ? "Preparing…" : "Download CV"}
      </button>
      {state === "error" && (
        <p role="status" className="mt-3 font-bodyRegularItalic text-sm text-creme">
          Sorry, the CV couldn&apos;t be downloaded right now. Email me and I&apos;ll send it.
        </p>
      )}
    </form>
  );
};

export default CvDownload;
