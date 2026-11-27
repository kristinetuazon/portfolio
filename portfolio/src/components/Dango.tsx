import { useId } from "react";

// Hanami dango tones: [highlight, body, shadow]
const MOCHI = [
  ["#fde4ea", "#efa3b3", "#b86a7c"], // pink
  ["#ffffff", "#ebe4d6", "#a99f8c"], // rice-white
  ["#e3f0c9", "#9cbd63", "#5b7a33"], // matcha
];

// Ball centres on the diagonal, snug against each other.
export const R = 30;
export const BALLS = [
  { cx: 58, cy: 58 },
  { cx: 99, cy: 99 },
  { cx: 140, cy: 140 },
];

// A bite out of the pink ball's outer (top-left) edge.
const BITE_ORIGIN: [number, number] = [38, 38];
const BITE: [number, number, number][] = [
  [35, 45, 8],
  [39, 37, 8.5],
  [46, 32, 8],
  [31, 31, 11],
];
/** The SVG transform for the bite at a given size (0 = whole, 1 = bitten). */
export const biteTransform = (s: number) =>
  `translate(${BITE_ORIGIN[0]} ${BITE_ORIGIN[1]}) scale(${s}) translate(${-BITE_ORIGIN[0]} ${-BITE_ORIGIN[1]})`;

/**
 * A realistic hanami dango on a diagonal bamboo skewer: soft mochi shading,
 * a powdery texture, highlights, and each ball casting a shadow on the next.
 * Lit from the top left. Each ball is its own group (`.dango-ball-0..2`) so it
 * can jiggle, and the pink one carries a hidden bite (`.dango-bite`). Decorative.
 */
const Dango = ({ className }: { className?: string }) => {
  const id = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        {/* Bamboo, rounded across its width (perpendicular to the diagonal) */}
        <linearGradient
          id={`${id}-bamboo`}
          gradientUnits="userSpaceOnUse"
          x1="96"
          y1="104"
          x2="104"
          y2="96"
        >
          <stop offset="0" stopColor="#9c7036" />
          <stop offset=".55" stopColor="#d9b373" />
          <stop offset="1" stopColor="#f3e0b4" />
        </linearGradient>
        {MOCHI.map(([hi, body, shade], i) => (
          <radialGradient key={i} id={`${id}-mochi-${i}`} cx="36%" cy="30%" r="80%">
            <stop offset="0" stopColor={hi} />
            <stop offset=".42" stopColor={body} />
            <stop offset=".85" stopColor={body} stopOpacity=".95" />
            <stop offset="1" stopColor={shade} />
          </radialGradient>
        ))}
        <linearGradient id={`${id}-occ`} x1="0" y1="0" x2="1" y2="1">
          <stop offset=".45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".26" />
        </linearGradient>
        <filter id={`${id}-powder`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" seed="5" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 -.32" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}-cast`} x="-30%" y="-30%" width="170%" height="170%">
          <feDropShadow
            dx="2.5"
            dy="3.5"
            stdDeviation="3"
            floodColor="#1a1218"
            floodOpacity=".45"
          />
        </filter>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={`${id}-blur-sm`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <mask id={`${id}-bite`} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <rect width="200" height="200" fill="#fff" />
          <g className="dango-bite" transform={biteTransform(0)}>
            {BITE.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#000" />
            ))}
          </g>
        </mask>
        <clipPath id={`${id}-pink`}>
          <circle cx={BALLS[0]!.cx} cy={BALLS[0]!.cy} r={R} />
        </clipPath>
      </defs>

      {/* Skewer, with a thread of grain; the handle pokes out at the bottom right */}
      <g filter={`url(#${id}-cast)`}>
        <line
          x1="20"
          y1="20"
          x2="190"
          y2="190"
          stroke={`url(#${id}-bamboo)`}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="22.6"
          x2="187"
          y2="185.6"
          stroke="#fff6dc"
          strokeWidth=".6"
          opacity=".45"
        />
      </g>

      {/* Back to front, so each ball shades the one below it */}
      {[2, 1, 0].map((i) => {
        const { cx, cy } = BALLS[i]!;
        return (
          <g key={i} className={`dango-ball dango-ball-${i}`} filter={`url(#${id}-cast)`}>
            <g mask={i === 0 ? `url(#${id}-bite)` : undefined}>
              <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-mochi-${i})`} />
              <circle cx={cx} cy={cy} r={R} fill={`url(#${id}-occ)`} />
              <circle cx={cx} cy={cy} r={R} fill="#fff" filter={`url(#${id}-powder)`} />
              <ellipse
                cx={cx - 10}
                cy={cy - 13}
                rx="11"
                ry="6"
                transform={`rotate(-30 ${cx - 10} ${cy - 13})`}
                fill="#fff"
                opacity=".45"
                filter={`url(#${id}-blur)`}
              />
              <ellipse
                cx={cx - 12}
                cy={cy - 15}
                rx="3.5"
                ry="2"
                transform={`rotate(-30 ${cx - 12} ${cy - 15})`}
                fill="#fff"
                opacity=".75"
                filter={`url(#${id}-blur-sm)`}
              />
              {/* Bite edge on the pink ball: slightly darker mochi inside the tooth marks */}
              {i === 0 && (
                <g clipPath={`url(#${id}-pink)`}>
                  <g className="dango-bite" transform={biteTransform(0)}>
                    {BITE.map(([bx, by, r], j) => (
                      <circle
                        key={j}
                        cx={bx}
                        cy={by}
                        r={r}
                        fill="none"
                        stroke="#c97f90"
                        strokeWidth="2.5"
                      />
                    ))}
                  </g>
                </g>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default Dango;
