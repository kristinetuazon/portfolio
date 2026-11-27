import { useId } from "react";

export type OnigiriKind = "classic" | "sesame" | "ume" | "salmon" | "yaki";

// Rounded rice triangle, 100×100 box.
const RICE =
  "M50 9C57 9 62 13 67 21L89 60C96 72 90 90 73 91L27 91C10 90 4 72 11 60L33 21C38 13 43 9 50 9Z";

// A bite out of the top: overlapping circles make the scalloped tooth marks.
const BITE: [number, number, number][] = [
  [42, 19, 9.5],
  [50, 13, 10],
  [58.5, 14, 10],
  [65, 21, 9],
  [53, 4, 13],
];

// Black sesame seeds: [x, y, rotation]
const SESAME: [number, number, number][] = [
  [42, 30, 20],
  [55, 27, -30],
  [48, 40, 70],
  [61, 38, 10],
  [36, 46, -45],
  [52, 50, 35],
  [65, 49, -15],
  [43, 56, 80],
  [58, 59, -60],
  [30, 58, 15],
  [70, 58, 40],
];

// Salmon flakes on top: [x, y, rx, ry, rotation]
const SALMON: [number, number, number, number, number][] = [
  [46, 30, 6, 3.5, 25],
  [55, 33, 5, 3, -20],
  [50, 38, 7, 3.5, 5],
  [43, 41, 4, 2.5, -35],
  [58, 41, 4.5, 2.5, 40],
];

/**
 * A realistic-ish onigiri: shaded rice with a grain texture, a nori wrap with a
 * soft sheen, and a different topping per kind. Purely decorative.
 */
const Onigiri = ({ kind, className }: { kind: OnigiriKind; className?: string }) => {
  const id = useId().replace(/:/g, "");
  const yaki = kind === "yaki";

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
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
        {/* Everything is drawn through this mask; the bite starts at scale 0 (no bite). */}
        <mask id={`${id}-bite`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <g className="onigiri-bite" transform="translate(50 10) scale(0) translate(-50 -10)">
            {BITE.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#000" />
            ))}
          </g>
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

          {/* Nori wrap (yaki is served bare) */}
          {!yaki && (
            <g>
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
            <circle cx="50" cy="42" r="9" fill={`url(#${id}-ume)`} />
            <path
              d="M45 39q3-3 7-1M47 45q4 1 7-2"
              stroke="#7a1f17"
              strokeWidth=".8"
              fill="none"
              opacity=".6"
            />
            <ellipse cx="47" cy="38.5" rx="2.6" ry="1.5" fill="#fff" opacity=".6" />
          </g>
        )}
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

        {/* Bite edge: the rice just inside the tooth marks is a little darker */}
        <g clipPath={`url(#${id}-clip)`}>
          <g className="onigiri-bite" transform="translate(50 10) scale(0) translate(-50 -10)">
            {BITE.map(([cx, cy, r], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={yaki ? "#8a4f1a" : "#c9bfad"}
                strokeWidth="3"
              />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Onigiri;
