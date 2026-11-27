import { useId } from "react";

// An irregular wax blob: a circle whose edge wobbles a little, like poured wax.
const BLOB = (() => {
  const pts: [number, number][] = [];
  const n = 22;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 44 + Math.sin(i * 2.7) * 2.2 + Math.cos(i * 1.3) * 1.4;
    pts.push([50 + Math.cos(a) * r, 50 + Math.sin(a) * r]);
  }
  // Smooth closed curve through the points (quadratic midpoints).
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const first = mid(pts[n - 1]!, pts[0]!);
  let d = `M${first[0]!.toFixed(2)} ${first[1]!.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i]!;
    const m = mid(p, pts[(i + 1) % n]!);
    d += `Q${p[0].toFixed(2)} ${p[1].toFixed(2)} ${m[0]!.toFixed(2)} ${m[1]!.toFixed(2)}`;
  }
  return `${d}Z`;
})();

// The crack runs down the middle in a zigzag.
const LEFT = "0,0 52,0 47,18 55,36 46,54 54,71 48,100 0,100";
const RIGHT = "52,0 100,0 100,100 48,100 54,71 46,54 55,36 47,18";

/**
 * A pink wax seal stamped with a little dango. It's drawn as two halves
 * (`.seal-half-l` / `.seal-half-r`) so it can crack open. Decorative.
 */
const WaxSeal = ({ className }: { className?: string }) => {
  const id = useId().replace(/:/g, "");

  const seal = (
    <>
      <path d={BLOB} fill={`url(#${id}-wax)`} />
      {/* Pressed rim from the stamp */}
      <circle cx="50" cy="50" r="31" fill="none" stroke="#7e2a40" strokeWidth="2.4" opacity=".55" />
      <circle cx="50" cy="50" r="32.6" fill="none" stroke="#f4b3c2" strokeWidth="1" opacity=".55" />
      {/* Embossed dango: a light edge, a dark edge, then the body */}
      {[
        { dx: -0.9, color: "#f6bccb", o: 0.8 },
        { dx: 0.9, color: "#6e2236", o: 0.7 },
        { dx: 0, color: "#b14d66", o: 1 },
      ].map(({ dx, color, o }, i) => (
        <g key={i} transform={`translate(${dx} ${dx})`} opacity={o}>
          <line
            x1="31"
            y1="31"
            x2="70"
            y2="70"
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="6.6" fill={color} />
          <circle cx="50" cy="50" r="6.6" fill={color} />
          <circle cx="60" cy="60" r="6.6" fill={color} />
        </g>
      ))}
      {/* Shine */}
      <ellipse
        cx="34"
        cy="28"
        rx="10"
        ry="5"
        transform="rotate(-30 34 28)"
        fill="#fff"
        opacity=".28"
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${id}-wax`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ec97ab" />
          <stop offset=".5" stopColor="#c0566e" />
          <stop offset="1" stopColor="#7e2a40" />
        </radialGradient>
        <clipPath id={`${id}-l`}>
          <polygon points={LEFT} />
        </clipPath>
        <clipPath id={`${id}-r`}>
          <polygon points={RIGHT} />
        </clipPath>
        <filter id={`${id}-drop`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="1.5"
            dy="3"
            stdDeviation="2.5"
            floodColor="#3a1420"
            floodOpacity=".45"
          />
        </filter>
      </defs>
      <g filter={`url(#${id}-drop)`}>
        <g className="seal-half-l" clipPath={`url(#${id}-l)`}>
          {seal}
        </g>
        <g className="seal-half-r" clipPath={`url(#${id}-r)`}>
          {seal}
        </g>
      </g>
    </svg>
  );
};

export default WaxSeal;
