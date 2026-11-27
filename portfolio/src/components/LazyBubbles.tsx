import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// The bubbles (and the drag / flick / pop code they bring) are pure decoration,
// so they load in their own file once the page has settled, keeping that work
// off the critical path while the intro appears.
const SoapBubbles = dynamic(() => import("./SoapBubbles"), { ssr: false });

const LazyBubbles = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const show = () => setReady(true);
    // Safari has no requestIdleCallback: fall back to a short delay.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(show, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(show, 1200);
    return () => clearTimeout(id);
  }, []);
  return ready ? <SoapBubbles /> : null;
};

export default LazyBubbles;
