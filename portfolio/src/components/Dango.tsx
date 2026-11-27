import { useId } from "react";

// Hanami dango tones: [highlight, body, shadow]
const MOCHI = [
  ["#fde4ea", "#efa3b3", "#b86a7c"], // pink
  ["#ffffff", "#ebe4d6", "#a99f8c"], // rice-white
  ["#e3f0c9", "#9cbd63", "#5b7a33"], // matcha
];

// Ball centres on the diagonal, snug against each other.
const R = 30;
const BALLS = [
  { cx: 58, cy: 58 },
  { cx: 99, cy: 99 },
  { cx: 140, cy: 140 },
];

/**
 * A realistic hanami dango on a diagonal bamboo skewer: soft mochi shading,
 * a powdery texture, highlights, and each ball casting a shadow on the next.
 * Lit from the top left. Decorative.
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
          <g key={i} filter={`url(#${id}-cast)`}>
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
          </g>
        );
      })}
    </svg>
  );
};

export default Dango;
