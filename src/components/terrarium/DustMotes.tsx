const MOTES = Array.from({ length: 14 }, (_, i) => {
  // deterministic pseudo-random per index
  const rnd = (seed: number) => {
    const x = Math.sin(seed * 9973.13) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    id: i,
    left: rnd(i + 1) * 100,
    top: 40 + rnd(i + 11) * 60,
    mx: (rnd(i + 21) - 0.5) * 120,
    my: -30 - rnd(i + 31) * 100,
    dur: 14 + rnd(i + 41) * 18,
    delay: -rnd(i + 51) * 20,
  };
});

export function DustMotes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {MOTES.map((m) => (
        <span
          key={m.id}
          className="mote"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            ["--mx" as string]: `${m.mx}px`,
            ["--my" as string]: `${m.my}px`,
            ["--mdur" as string]: `${m.dur}s`,
            ["--mdelay" as string]: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
