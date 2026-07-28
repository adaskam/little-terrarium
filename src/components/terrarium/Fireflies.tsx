export type Firefly = {
  id: string;
  x: number; // % within jar area
  y: number;
  fx1: number; fy1: number;
  fx2: number; fy2: number;
  fx3: number; fy3: number;
  dur: number;
};

export function Fireflies({ items }: { items: Firefly[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {items.map((f) => (
        <span
          key={f.id}
          className="firefly"
          style={{
            left: `calc(${f.x}% - 4px)`,
            top: `calc(${f.y}% - 4px)`,
            ["--fx1" as string]: `${f.fx1}px`,
            ["--fy1" as string]: `${f.fy1}px`,
            ["--fx2" as string]: `${f.fx2}px`,
            ["--fy2" as string]: `${f.fy2}px`,
            ["--fx3" as string]: `${f.fx3}px`,
            ["--fy3" as string]: `${f.fy3}px`,
            ["--fdur" as string]: `${f.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
