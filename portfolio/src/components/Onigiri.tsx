import { useId } from "react";

export type OnigiriKind = "classic" | "sesame" | "ume" | "salmon" | "yaki" | "furikake";

// Rounded rice triangle, 100×100 box.
const RICE =
  "M50 9C57 9 62 13 67 21L89 60C96 72 90 90 73 91L27 91C10 90 4 72 11 60L33 21C38 13 43 9 50 9Z";

// Two chomps out of the top (left, then right). Overlapping circles make the
// scalloped tooth marks. Each chomp grows from its own point.
export const CHOMPS: { origin: [number, number]; circles: [number, number, number][] }[] = [
  {
    origin: [45, 12],
    circles: [
      [41, 20, 9.5],
      [48, 13, 10],
      [46, 3, 12],
    ],
  },
  {
    origin: [58, 12],
    circles: [
      [57, 13, 10],
      [64.5, 21, 9],
      [58, 3, 12],
    ],
  },
];

/** The SVG transform for a chomp at a given size (0 = no bite, 1 = full bite). */
export const chompTransform = (i: number, s: number) => {
  const [ox, oy] = CHOMPS[i]!.origin;
  return `translate(${ox} ${oy}) scale(${s}) translate(${-ox} ${-oy})`;
};

// Black sesame seeds, kept to the top so the face has room: [x, y, rotation]
const SESAME: [number, number, number][] = [
  [45, 24, 50],
  [42, 31, 20],
  [55, 28, -30],
  [49, 37, 70],
  [61, 36, 10],
  [37, 41, -45],
  [53, 43, 35],
  [64, 44, -15],
  [44, 45, 80],
];

// Salmon flakes on top: [x, y, rx, ry, rotation]
// Furikake: little flakes of nori, egg, salmon and sesame: [x, y, w, h, rotation, color]
const FURIKAKE: [number, number, number, number, number, string][] = [
  [44, 25, 3.2, 2, 20, "#2f4a2a"],
  [53, 23, 2.6, 2.6, -15, "#f2c14e"],
  [40, 33, 2.8, 1.8, 50, "#e8704a"],
  [57, 32, 3.4, 2, -40, "#2f4a2a"],
  [49, 37, 2.4, 2.4, 10, "#f2c14e"],
  [62, 41, 2.6, 1.6, 30, "#1b1714"],
  [35, 43, 2.6, 2.4, -20, "#2f4a2a"],
  [46, 46, 3, 1.8, 65, "#e8704a"],
  [55, 47, 2.2, 2.2, 0, "#f2c14e"],
  [66, 49, 2.8, 1.8, -55, "#2f4a2a"],
  [39, 51, 2.2, 1.4, 25, "#1b1714"],
];

const SALMON: [number, number, number, number, number][] = [
  [46, 30, 6, 3.5, 25],
  [55, 33, 5, 3, -20],
  [50, 38, 7, 3.5, 5],
  [43, 41, 4, 2.5, -35],
  [58, 41, 4.5, 2.5, 40],
];

// Steam wisps that curl up from the top when the onigiri "lights up".
const STEAM = [
  "M41 8c-4-5 4-9 0-14s4-9 0-14",
  "M50 4c-4-5 4-9 0-14s4-9 0-14s4-8 0-12",
  "M59 8c-4-5 4-9 0-14s4-9 0-14",
];

/**
 * A realistic-ish onigiri: shaded rice with a grain texture, a nori wrap with a
 * soft sheen, and a different topping per kind. It also carries hidden parts
 * the nav animates: two bite marks, steam, and a little face. Decorative.
 */
const Onigiri = ({
  kind,
  className,
  bitten = false,
}: {
  kind: OnigiriKind;
  className?: string;
  /** Start with both bites already taken (the 404 page). */
  bitten?: boolean;
}) => {
  const id = useId().replace(/:/g, "");
  const yaki = kind === "yaki";
  const ink = yaki ? "#3a1d08" : "#2b2129";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Rice: lit from the top left, falling into a warm shadow */}
        <radialGradient id={`${id}-rice`} cx="38%" cy="28%" r="80%">
          {yaki ? (
            <>
              <stop offset="0" stopColor="#f6d39b" />
              <stop offset=".45" stopColor="#d9973f" />
              <stop offset=".8" stopColor="#a8621f" />
              <stop offset="1" stopColor="#6f3d12" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".5" stopColor="#f5f1e8" />
              <stop offset=".82" stopColor="#ddd5c5" />
              <stop offset="1" stopColor="#b8ae9b" />
            </>
          )}
        </radialGradient>

        {/* Grain texture: fine noise, only where there's rice */}
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7" />
          <feColorMatrix
            values={
              yaki
                ? "0 0 0 0 .35  0 0 0 0 .17  0 0 0 0 .05  0 0 0 .9 -.35"
                : "0 0 0 0 .55  0 0 0 0 .5  0 0 0 0 .42  0 0 0 .7 -.25"
            }
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Nori: deep green-black with a faint diagonal sheen */}
        <linearGradient id={`${id}-nori`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24302a" />
          <stop offset=".45" stopColor="#141c17" />
          <stop offset=".55" stopColor="#2c3a32" />
          <stop offset="1" stopColor="#0d1310" />
        </linearGradient>
        <filter id={`${id}-noritex`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".9 .25" numOctaves="2" seed="3" />
          <feColorMatrix values="0 0 0 0 .3  0 0 0 0 .4  0 0 0 0 .32  0 0 0 .55 -.2" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        <radialGradient id={`${id}-ume`} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#f08a7e" />
          <stop offset=".5" stopColor="#c0392b" />
          <stop offset="1" stopColor="#7a1f17" />
        </radialGradient>
        <linearGradient id={`${id}-salmon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb08a" />
          <stop offset="1" stopColor="#e8704a" />
        </linearGradient>

        <clipPath id={`${id}-clip`}>
          <path d={RICE} />
        </clipPath>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <filter id={`${id}-steam`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        {/* Everything is drawn through this mask; the chomps start at scale 0 (no bite) unless bitten. */}
        <mask id={`${id}-bite`} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
          <rect x="-10" y="-10" width="120" height="120" fill="#fff" />
          {CHOMPS.map(({ circles }, i) => (
            <g
              key={i}
              className={`onigiri-chomp-${i}`}
              transform={chompTransform(i, bitten ? 1 : 0)}
            >
              {circles.map(([cx, cy, r], j) => (
                <circle key={j} cx={cx} cy={cy} r={r} fill="#000" />
              ))}
            </g>
          ))}
        </mask>
      </defs>

      {/* Contact shadow */}
      <ellipse
        cx="50"
        cy="93"
        rx="34"
        ry="4"
        fill="#000"
        opacity=".35"
        filter={`url(#${id}-soft)`}
      />

      {/* The body squashes when bitten */}
      <g className="onigiri-body">
        <g mask={`url(#${id}-bite)`}>
          {/* Rice body + grain */}
          <path d={RICE} fill={`url(#${id}-rice)`} />
          <path d={RICE} fill="#fff" filter={`url(#${id}-grain)`} />

          <g clipPath={`url(#${id}-clip)`}>
            {/* Grill marks for yaki onigiri */}
            {yaki && (
              <g opacity=".35" fill="#4a250a">
                <ellipse cx="38" cy="52" rx="14" ry="6" filter={`url(#${id}-soft)`} />
                <ellipse cx="64" cy="68" rx="16" ry="6" filter={`url(#${id}-soft)`} />
              </g>
            )}

            {/* Nori wrap (yaki is served bare); flutters on hover */}
            {!yaki && (
              <g className="onigiri-nori">
                <rect x="33" y="64" width="34" height="32" rx="1.5" fill={`url(#${id}-nori)`} />
                <rect
                  x="33"
                  y="64"
                  width="34"
                  height="32"
                  fill="#fff"
                  filter={`url(#${id}-noritex)`}
                />
                <rect x="33" y="64" width="34" height="1.4" fill="#000" opacity=".35" />
              </g>
            )}

            {/* Soft top-left sheen on the rice */}
            <ellipse
              cx="38"
              cy="30"
              rx="12"
              ry="7"
              fill="#fff"
              opacity={yaki ? 0.25 : 0.55}
              transform="rotate(-35 38 30)"
              filter={`url(#${id}-soft)`}
            />
          </g>

          {/* Toppings */}
          {kind === "sesame" &&
            SESAME.map(([x, y, r], i) => (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="2"
                ry="1.1"
                fill="#1b1714"
                transform={`rotate(${r} ${x} ${y})`}
              />
            ))}
          {kind === "ume" && (
            <g>
              <circle cx="50" cy="36" r="8" fill={`url(#${id}-ume)`} />
              <path
                d="M45.5 33.5q3-3 6.5-1M47 39q4 1 6.5-2"
                stroke="#7a1f17"
                strokeWidth=".8"
                fill="none"
                opacity=".6"
              />
              <ellipse cx="47.3" cy="33" rx="2.4" ry="1.4" fill="#fff" opacity=".6" />
            </g>
          )}
          {kind === "furikake" &&
            FURIKAKE.map(([x, y, w, h, r, color], i) => (
              <rect
                key={i}
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx=".5"
                fill={color}
                transform={`rotate(${r} ${x} ${y})`}
              />
            ))}
          {kind === "salmon" &&
            SALMON.map(([x, y, rx, ry, r], i) => (
              <g key={i} transform={`rotate(${r} ${x} ${y})`}>
                <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id}-salmon)`} />
                <path
                  d={`M${x - rx + 1.5} ${y}h${rx * 2 - 3}`}
                  stroke="#fff"
                  strokeWidth=".6"
                  opacity=".55"
                />
              </g>
            ))}

          {/* A little face, shown on the current section's onigiri */}
          <g className="onigiri-face" opacity="0">
            <ellipse cx="37" cy="57.5" rx="3.6" ry="2" fill="#f29aaa" opacity=".55" />
            <ellipse cx="63" cy="57.5" rx="3.6" ry="2" fill="#f29aaa" opacity=".55" />
            <g className="onigiri-eyes">
              <ellipse cx="43" cy="53" rx="1.9" ry="2.5" fill={ink} />
              <ellipse cx="57" cy="53" rx="1.9" ry="2.5" fill={ink} />
              <circle cx="43.6" cy="52.1" r=".6" fill="#fff" />
              <circle cx="57.6" cy="52.1" r=".6" fill="#fff" />
            </g>
            <path
              d="M47.6 57.6q2.4 2.4 4.8 0"
              stroke={ink}
              strokeWidth=".9"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Bite edges: the rice just inside the tooth marks is a little darker */}
          <g clipPath={`url(#${id}-clip)`}>
            {CHOMPS.map(({ circles }, i) => (
              <g
                key={i}
                className={`onigiri-chomp-${i}`}
                transform={chompTransform(i, bitten ? 1 : 0)}
              >
                {circles.map(([cx, cy, r], j) => (
                  <circle
                    key={j}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={yaki ? "#8a4f1a" : "#c9bfad"}
                    strokeWidth="3"
                  />
                ))}
              </g>
            ))}
          </g>
        </g>
      </g>

      {/* Steam (yaki gets a warmer, wavier shimmer) */}
      <g
        className="onigiri-steam"
        opacity="0"
        filter={`url(#${id}-steam)`}
        fill="none"
        stroke={yaki ? "#ffe2b8" : "#ffffff"}
        strokeWidth={yaki ? 2.6 : 3.4}
        strokeLinecap="round"
      >
        {STEAM.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
};

export default Onigiri;
