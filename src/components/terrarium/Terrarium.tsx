import { useCallback, useRef, useState } from "react";
import { Jar } from "./Jar";
import { Fireflies, type Firefly } from "./Fireflies";
import { DayNightToggle } from "./DayNightToggle";
import { DustMotes } from "./DustMotes";

// Jar interior bounds inside the scene, in percent of the jar-area box.
// Kept in sync with the SVG viewBox in <Jar />.
const JAR_INTERIOR = { xMin: 14, xMax: 86, yMin: 12, yMax: 78 };

export function Terrarium() {
  const [night, setNight] = useState(false);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const jarAreaRef = useRef<HTMLDivElement>(null);

  const handleJarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = jarAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    if (
      xPct < JAR_INTERIOR.xMin ||
      xPct > JAR_INTERIOR.xMax ||
      yPct < JAR_INTERIOR.yMin ||
      yPct > JAR_INTERIOR.yMax
    ) {
      return;
    }

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const firefly: Firefly = {
      id: crypto.randomUUID(),
      x: xPct,
      y: yPct,
      fx1: rnd(-24, 24),
      fy1: rnd(-24, 12),
      fx2: rnd(-28, 28),
      fy2: rnd(-32, 6),
      fx3: rnd(-24, 24),
      fy3: rnd(-20, 14),
      dur: rnd(8, 14),
    };
    setFireflies((prev) => (prev.length >= 24 ? [...prev.slice(1), firefly] : [...prev, firefly]));
  }, []);

  return (
    <main
      className={`scene ${night ? "night" : ""} relative min-h-screen w-full overflow-hidden`}
    >
      <DustMotes />

      <div className="absolute top-6 right-6 z-20">
        <DayNightToggle night={night} onToggle={() => setNight((n) => !n)} />
      </div>

      <h1 className="sr-only">Digital Terrarium</h1>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center">
          {/* Jar + fireflies overlay */}
          <div
            ref={jarAreaRef}
            onClick={handleJarClick}
            className="relative w-[min(90vw,420px)] aspect-[4/5] cursor-pointer select-none"
            aria-label="Glass jar with plants. Click inside to add a firefly."
            role="button"
          >
            <Jar />
            <Fireflies items={fireflies} />
          </div>

          {/* Wooden shelf */}
          <div
            className="w-[min(96vw,560px)] h-6 rounded-sm shadow-[0_18px_40px_-20px_oklch(0.2_0.05_60/0.55)]"
            style={{
              background:
                "linear-gradient(180deg, var(--color-wood-light) 0%, var(--color-wood) 45%, var(--color-wood-dark) 100%)",
            }}
          />
          <div
            className="w-[min(96vw,560px)] h-1 opacity-60"
            style={{ background: "var(--color-wood-dark)" }}
          />
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs tracking-wide text-muted-foreground/70">
        tap inside the jar for a firefly · hover the plants for a breeze
      </p>
    </main>
  );
}
