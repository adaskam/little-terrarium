import { useEffect, useRef, useState } from "react";

type Firefly = { id: string; x: number; y: number };

// Jar interior bounds (matches the jarClip path below).
const JAR = { xMin: 97, xMax: 203, yMin: 122, yMax: 350 };

const MOTES = [
  { cx: 90, cy: 300, delay: 0 },
  { cx: 150, cy: 280, delay: -3 },
  { cx: 210, cy: 310, delay: -6 },
  { cx: 120, cy: 260, delay: -9 },
  { cx: 180, cy: 250, delay: -12 },
  { cx: 100, cy: 220, delay: -5 },
];

export function Terrarium() {
  const [night, setNight] = useState(false);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    document.body.classList.toggle("night", night);
    return () => {
      document.body.classList.remove("night");
    };
  }, [night]);

  function handleJarClick(e: React.MouseEvent<HTMLDivElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const loc = pt.matrixTransform(ctm.inverse());
    if (loc.x < JAR.xMin || loc.x > JAR.xMax || loc.y < JAR.yMin || loc.y > JAR.yMax) return;
    setFireflies((prev) => {
      const next = [...prev, { id: crypto.randomUUID(), x: loc.x, y: loc.y }];
      return next.length > 24 ? next.slice(next.length - 24) : next;
    });
  }

  return (
    <div className="stage">
      <div className="label">a little corner to sit with</div>
      <div className="hint">click inside the jar to light a firefly</div>

      <div className="jar-wrap" onClick={handleJarClick}>
        <svg ref={svgRef} viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          {/* Wood shelf */}
          <polygon className="wood-top" points="20,340 280,340 260,352 40,352" />
          <rect className="wood-front" x="40" y="350" width="220" height="26" rx="2" />

          {/* Jar body */}
          <path
            className="glass-body"
            d="M 90 60 Q 90 52 98 52 L 202 52 Q 210 52 210 60 L 210 78 Q 240 92 240 120 L 240 300 Q 240 340 200 340 L 100 340 Q 60 340 60 300 L 60 120 Q 60 92 90 78 Z"
          />

          {/* Soil */}
          <path
            className="soil"
            d="M 68 300 Q 150 285 232 300 L 232 332 Q 150 340 68 332 Z"
            opacity="0.85"
          />

          {/* Glass highlight */}
          <path
            className="glass-highlight"
            d="M 78 110 Q 74 200 82 290"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Plants */}
          <g className="stem a" style={{ transformOrigin: "150px 300px" }}>
            <path
              d="M 150 300 Q 148 240 152 180 Q 156 130 150 90"
              fill="none"
              stroke="var(--leaf-2)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse className="leaf" cx="140" cy="240" rx="14" ry="7" fill="var(--leaf-1)" transform="rotate(-30 140 240)" />
            <ellipse className="leaf" cx="162" cy="200" rx="16" ry="8" fill="var(--leaf-3)" transform="rotate(30 162 200)" />
            <ellipse className="leaf" cx="144" cy="150" rx="13" ry="6" fill="var(--leaf-2)" transform="rotate(-20 144 150)" />
            <ellipse className="leaf" cx="156" cy="110" rx="10" ry="5" fill="var(--leaf-1)" transform="rotate(25 156 110)" />
          </g>

          <g className="stem b" style={{ transformOrigin: "110px 300px" }}>
            <path
              d="M 110 300 Q 100 250 108 210 Q 116 175 105 150"
              fill="none"
              stroke="var(--leaf-2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse className="leaf" cx="98" cy="260" rx="12" ry="6" fill="var(--leaf-3)" transform="rotate(-40 98 260)" />
            <ellipse className="leaf" cx="118" cy="225" rx="13" ry="6" fill="var(--leaf-1)" transform="rotate(30 118 225)" />
            <ellipse className="leaf" cx="100" cy="180" rx="11" ry="5" fill="var(--leaf-2)" transform="rotate(-25 100 180)" />
          </g>

          <g className="stem c" style={{ transformOrigin: "195px 300px" }}>
            <path
              d="M 195 300 Q 205 260 198 225 Q 190 195 202 170"
              fill="none"
              stroke="var(--leaf-2)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse className="leaf" cx="208" cy="270" rx="12" ry="6" fill="var(--leaf-1)" transform="rotate(35 208 270)" />
            <ellipse className="leaf" cx="188" cy="235" rx="13" ry="6" fill="var(--leaf-3)" transform="rotate(-30 188 235)" />
            <ellipse className="leaf" cx="208" cy="195" rx="10" ry="5" fill="var(--leaf-2)" transform="rotate(25 208 195)" />
          </g>

          {/* Dust motes */}
          {MOTES.map((m, i) => (
            <circle
              key={i}
              className="mote"
              cx={m.cx}
              cy={m.cy}
              r="1.6"
              style={{ animationDelay: `${m.delay}s` }}
            />
          ))}

          {/* Fireflies */}
          {fireflies.map((f) => (
            <g key={f.id} className="firefly" transform={`translate(${f.x} ${f.y})`}>
              <circle className="glow" r="8" />
              <circle className="core" r="2.2" />
            </g>
          ))}
        </svg>
      </div>

      <button
        type="button"
        className="toggle"
        onClick={() => setNight((n) => !n)}
        aria-label={night ? "Switch to day" : "Switch to dusk"}
      >
        <span className="icon">{night ? "☀️" : "🌙"}</span>
        <span>{night ? "switch to day" : "switch to dusk"}</span>
      </button>

      <div className="footer-note">nothing to do here — just something to watch</div>
    </div>
  );
}
