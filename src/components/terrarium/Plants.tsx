// Three stems, each animated on its own sway curve.
// transform-origin is set via --sway-origin on each group so the stem
// pivots at its base in the soil.
export function Plants() {
  return (
    <g className="plants-group">
      {/* Stem A — tall center, moss green */}
      <g
        className="stem-a"
        style={{ ["--sway-origin" as string]: "50px 82px" }}
      >
        <path
          d="M 50 82 Q 48 68 51 55 Q 54 44 50 32"
          fill="none"
          stroke="var(--color-moss-deep)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* leaves */}
        <path
          d="M 50 66 Q 44 62 42 58 Q 48 60 51 64 Z"
          fill="var(--color-moss)"
          className="leaf-twitchy"
          style={{ ["--leaf-origin" as string]: "50px 66px" }}
        />
        <path
          d="M 51 52 Q 58 48 60 43 Q 54 46 51 50 Z"
          fill="var(--color-moss)"
        />
        <path
          d="M 50 40 Q 45 36 43 32 Q 48 34 51 38 Z"
          fill="var(--color-sage)"
          className="leaf-twitchy"
          style={{ ["--leaf-origin" as string]: "50px 40px" }}
        />
        <circle cx="50" cy="32" r="1.4" fill="var(--color-sage-pale)" />
      </g>

      {/* Stem B — left, curved, sage */}
      <g
        className="stem-b"
        style={{ ["--sway-origin" as string]: "36px 82px" }}
      >
        <path
          d="M 36 82 Q 30 72 32 62 Q 35 52 30 44"
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M 33 72 Q 27 70 24 66 Q 30 68 34 70 Z"
          fill="var(--color-sage)"
        />
        <path
          d="M 32 60 Q 38 56 40 51 Q 34 54 31 58 Z"
          fill="var(--color-sage-pale)"
          className="leaf-twitchy"
          style={{ ["--leaf-origin" as string]: "32px 60px" }}
        />
        <path
          d="M 30 48 Q 25 44 24 40 Q 28 42 30 46 Z"
          fill="var(--color-moss)"
        />
      </g>

      {/* Stem C — right, small, pale sage */}
      <g
        className="stem-c"
        style={{ ["--sway-origin" as string]: "64px 82px" }}
      >
        <path
          d="M 64 82 Q 68 74 66 66 Q 64 58 68 52"
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 66 74 Q 72 72 74 68 Q 69 70 65 72 Z"
          fill="var(--color-sage-pale)"
        />
        <path
          d="M 67 62 Q 62 58 60 54 Q 66 56 68 60 Z"
          fill="var(--color-sage)"
          className="leaf-twitchy"
          style={{ ["--leaf-origin" as string]: "67px 62px" }}
        />
        <path
          d="M 68 52 Q 73 48 74 44 Q 70 46 68 50 Z"
          fill="var(--color-sage-pale)"
        />
      </g>
    </g>
  );
}
