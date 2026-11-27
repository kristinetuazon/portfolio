import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/** The round "difference" cursor that trails the mouse. */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dot.current) return;
    const toX = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const toY = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const move = (e: MouseEvent) => {
      toX(e.clientX - 16);
      toY(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={dot} className="cursor" aria-hidden="true" />;
};

export default Cursor;
