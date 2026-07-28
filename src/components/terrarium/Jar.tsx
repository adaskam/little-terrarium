import { Plants } from "./Plants";

// viewBox is 100x125 to match the wrapper's 4:5 aspect ratio.
// Interior bounds used by Terrarium for click hit-testing:
//   x: 14–86%, y: 12–78%
export function Jar() {
  return (
    <svg
      viewBox="0 0 100 125"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="glassFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.02 200)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="oklch(0.85 0.03 200)" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.75" />
          <stop offset="30%" stopColor="oklch(1 0 0)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="soilGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="oklch(0.36 0.04 55)" />
          <stop offset="100%" stopColor="oklch(0.22 0.03 50)" />
        </radialGradient>
        <clipPath id="jarInterior">
          <path d="M 18 22 Q 18 18 22 18 L 78 18 Q 82 18 82 22 L 82 92 Q 82 100 74 100 L 26 100 Q 18 100 18 92 Z" />
        </clipPath>
      </defs>

      {/* Jar body (glass) */}
      <path
        d="M 18 22 Q 18 18 22 18 L 78 18 Q 82 18 82 22 L 82 92 Q 82 100 74 100 L 26 100 Q 18 100 18 92 Z"
        fill="url(#glassFill)"
        stroke="oklch(0.7 0.02 200 / 0.55)"
        strokeWidth="0.5"
      />

      {/* Jar neck / rim */}
      <rect
        x="26" y="10" width="48" height="9" rx="2"
        fill="oklch(0.9 0.02 200 / 0.35)"
        stroke="oklch(0.7 0.02 200 / 0.55)"
        strokeWidth="0.5"
      />
      <ellipse cx="50" cy="10" rx="24" ry="2.2"
        fill="oklch(0.95 0.01 200 / 0.55)"
        stroke="oklch(0.65 0.02 200 / 0.6)"
        strokeWidth="0.4" />

      {/* Inside the jar */}
      <g clipPath="url(#jarInterior)">
        {/* Soil */}
        <path
          d="M 18 82 Q 50 74 82 82 L 82 100 L 18 100 Z"
          fill="url(#soilGrad)"
        />
        {/* Little pebbles */}
        <circle cx="30" cy="83" r="1.1" fill="oklch(0.55 0.02 60)" opacity="0.7" />
        <circle cx="42" cy="80.5" r="0.9" fill="oklch(0.6 0.02 60)" opacity="0.6" />
        <circle cx="62" cy="81.5" r="1.2" fill="oklch(0.5 0.02 60)" opacity="0.7" />
        <circle cx="72" cy="83" r="0.8" fill="oklch(0.58 0.02 60)" opacity="0.6" />

        {/* Plants */}
        <Plants />
      </g>

      {/* Soft left-edge highlight (on top of glass) */}
      <path
        d="M 20 24 Q 20 20 24 20 L 24 92 Q 24 96 28 97"
        fill="none"
        stroke="url(#glassEdge)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Faint right sheen */}
      <path
        d="M 78 26 L 78 78"
        stroke="oklch(1 0 0 / 0.25)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Base shadow inside jar */}
      <ellipse cx="50" cy="99" rx="30" ry="1.6" fill="oklch(0.15 0.02 50 / 0.35)" />
    </svg>
  );
}
