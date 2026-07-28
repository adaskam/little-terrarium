import { useEffect, useRef, useState } from "react";

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

const SVG_NS = "http://www.w3.org/2000/svg";

export function Terrarium() {
  const [night, setNight] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const fireflyLayerRef = useRef<SVGGElement>(null);
  const rafIdsRef = useRef<number[]>([]);

  useEffect(() => {
    document.body.classList.toggle("night", night);
    return () => {
      document.body.classList.remove("night");
    };
  }, [night]);

  // Set up click handler + animation loops imperatively so React re-renders
  // never reset firefly state or interfere with per-firefly RAF loops.
  useEffect(() => {
    const svg = svgRef.current;
    const layer = fireflyLayerRef.current;
    if (!svg || !layer) return;

    const rafIds = rafIdsRef.current;

    function spawnFirefly(x: number, y: number) {
      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "firefly");
      g.setAttribute("transform", `translate(${x} ${y})`);

      const glow = document.createElementNS(SVG_NS, "circle");
      glow.setAttribute("class", "glow");
      glow.setAttribute("r", "8");

      const core = document.createElementNS(SVG_NS, "circle");
      core.setAttribute("class", "core");
      core.setAttribute("r", "2.2");

      g.appendChild(glow);
      g.appendChild(core);
      layer!.appendChild(g);

      // Each firefly gets its own drift parameters + independent RAF loop.
      let px = x;
      let py = y;
      let vx = (Math.random() - 0.5) * 0.25;
      let vy = (Math.random() - 0.5) * 0.25;
      const born = performance.now();

      const tick = (now: number) => {
        const t = (now - born) / 1000;
        // gentle wander via noise-ish sin combo + small velocity drift
        vx += (Math.random() - 0.5) * 0.04;
        vy += (Math.random() - 0.5) * 0.04;
        vx = Math.max(-0.5, Math.min(0.5, vx));
        vy = Math.max(-0.5, Math.min(0.5, vy));
        px += vx + Math.sin(t * 1.3) * 0.15;
        py += vy + Math.cos(t * 1.1) * 0.12;

        // soft bounce inside jar interior
        if (px < JAR.xMin + 6) { px = JAR.xMin + 6; vx = Math.abs(vx); }
        if (px > JAR.xMax - 6) { px = JAR.xMax - 6; vx = -Math.abs(vx); }
        if (py < JAR.yMin + 6) { py = JAR.yMin + 6; vy = Math.abs(vy); }
        if (py > JAR.yMax - 6) { py = JAR.yMax - 6; vy = -Math.abs(vy); }

        g.setAttribute("transform", `translate(${px.toFixed(2)} ${py.toFixed(2)})`);
        const id = requestAnimationFrame(tick);
        rafIds[rafIds.indexOf(prevId)] = id;
        prevId = id;
      };
      let prevId = requestAnimationFrame(tick);
      rafIds.push(prevId);
    }

    function onClick(e: MouseEvent) {
      const pt = svg!.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg!.getScreenCTM();
      if (!ctm) return;
      const loc = pt.matrixTransform(ctm.inverse());
      if (loc.x < JAR.xMin || loc.x > JAR.xMax || loc.y < JAR.yMin || loc.y > JAR.yMax) return;
      // cap at 24 fireflies
      while (layer!.childElementCount >= 24) {
        layer!.removeChild(layer!.firstChild!);
      }
      spawnFirefly(loc.x, loc.y);
    }

    svg.addEventListener("click", onClick);
    return () => {
      svg.removeEventListener("click", onClick);
      rafIds.forEach((id) => cancelAnimationFrame(id));
      rafIds.length = 0;
      while (layer.firstChild) layer.removeChild(layer.firstChild);
    };
  }, []);

  return (
    <div className="stage">
      <div className="label">a little corner to sit with</div>
      <div className="hint">click inside the jar to light a firefly</div>

      <div className="jar-wrap">
        <svg ref={svgRef} viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
          {/* Wood shelf */}
          <polygon className="wood-top" points="20,340 280,340 260,352 40,352" />
          <rect className="wood-front" x="40" y="350" width="220" height="26" rx="2" />

          {/* Jar body */}
          <path
            className="glass-body"
            d="M 90 60 Q 90 52 98 52 L 202 52 Q 210 52 210 60 L 210 78 Q 240 92 240 120 L 240 300 Q 240 340 200 340 L 100 340 Q 60 340 60 300 L 60 120 Q 60 92 90 78 Z"
          />

          <defs>
            {/* Slightly enlarged clip so leaves have breathing room and aren't cropped */}
            <clipPath id="jarClip">
              <path d="M82,112 Q76,342 150,354 Q224,342 218,112 Q150,124 82,112 Z" />
            </clipPath>
          </defs>

          {/* Glass highlight */}
          <path
            className="glass-highlight"
            d="M 78 110 Q 74 200 82 290"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Everything inside the jar */}
          <g clipPath="url(#jarClip)">
            <ellipse cx="150" cy="335" rx="58" ry="14" fill="#5b4632" />

            <g className="stem a" style={{ transformOrigin: "150px 335px" }}>
              <path
                d="M150,335 C146,290 152,250 140,205"
                stroke="var(--leaf-2)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <g className="leaf">
                <ellipse cx="128" cy="240" rx="20" ry="9" fill="var(--leaf-1)" transform="rotate(-28 128 240)" />
                <ellipse cx="156" cy="215" rx="17" ry="8" fill="var(--leaf-3)" transform="rotate(18 156 215)" />
                <ellipse cx="132" cy="200" rx="14" ry="7" fill="var(--leaf-1)" transform="rotate(-10 132 200)" />
              </g>
            </g>

            <g className="stem b" style={{ transformOrigin: "165px 335px" }}>
              <path
                d="M165,335 C170,300 160,270 175,230"
                stroke="var(--leaf-1)"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
              <g className="leaf">
                <ellipse cx="188" cy="255" rx="18" ry="8" fill="var(--leaf-2)" transform="rotate(24 188 255)" />
                <ellipse cx="170" cy="235" rx="15" ry="7" fill="var(--leaf-3)" transform="rotate(-16 170 235)" />
              </g>
            </g>

            <g className="stem c" style={{ transformOrigin: "132px 335px" }}>
              <path
                d="M132,335 C128,315 134,295 126,270"
                stroke="var(--leaf-3)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <g className="leaf">
                <ellipse cx="112" cy="285" rx="13" ry="6" fill="var(--leaf-1)" transform="rotate(-22 112 285)" />
                <ellipse cx="128" cy="272" rx="11" ry="5.5" fill="var(--leaf-2)" transform="rotate(12 128 272)" />
              </g>
            </g>

            <ellipse cx="120" cy="342" rx="6" ry="3" fill="#8a7d6a" />
            <ellipse cx="175" cy="344" rx="7" ry="3.2" fill="#a29580" />
            <ellipse cx="150" cy="347" rx="5" ry="2.5" fill="#8a7d6a" />

            {/* Firefly layer — populated imperatively by useEffect */}
            <g ref={fireflyLayerRef} className="fireflies" />
          </g>

          {/* Dust motes (outside jar, floating in scene) */}
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
