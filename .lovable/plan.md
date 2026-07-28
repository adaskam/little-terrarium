## Rebuild terrarium to match the pasted spec exactly

Replace the current implementation with a 1:1 port of the pasted HTML/CSS/JS. The pasted SVG markup was truncated in the message (empty `<g>` groups), so I'll reconstruct the SVG contents to match the described structure (jar, wood shelf, 3 swaying stems with leaves, dust motes, fireflies) while keeping every CSS token, class name, animation, and interaction identical.

### Files

- `src/styles.css`
  - Remove current terrarium tokens/keyframes and replace with the exact `:root` vars from the spec (`--day-sky-1/2`, `--night-sky-1/2`, `--wood-1/2`, `--glass`, `--glass-edge`, `--leaf-1/2/3`, `--firefly`, `--ink`, `--ink-soft`, `--transition-slow`).
  - Port the body radial-gradient day/night backgrounds, `.stage`, `.label` (Caveat), `.hint`, `.jar-wrap` (aspect-ratio 3/4, cursor crosshair), `.mote` + `drift` keyframes, `.stem` + `sway` keyframes with `.a/.b/.c` durations and delays, `.leaf` hover rotate, `.glass-body`, `.glass-highlight`, `.wood-top/front`, `.firefly` core/glow, `.toggle`, `.footer-note`.
  - Add Google Fonts link via `src/routes/__root.tsx` head (Caveat + Inter) — not `@import` in CSS (Tailwind v4 rule).

- `src/routes/__root.tsx` — add preconnect + stylesheet `<link>` for `family=Caveat:wght@500;600&family=Inter:wght@400;500&display=swap`.

- `src/routes/index.tsx` — keep head() SEO; render `<Terrarium />`.

- `src/components/terrarium/Terrarium.tsx` — rewrite as a single component that renders the exact DOM tree from the spec:
  - `body.night` toggle → apply `night` class to `document.body` via `useEffect` (spec targets `body`, not a wrapper).
  - `.stage` with `.label` ("a little corner to sit with"), `.hint` ("click inside the jar to light a firefly"), `.jar-wrap` containing one inline SVG, `.toggle` button, `.footer-note`.
  - Toggle text/icon swaps between "🌙 switch to dusk" and "☀️ switch to day".
  - Click handler on `.jar-wrap` computes SVG coordinates, clamps to jar interior polygon, appends a firefly `{id, x, y}` to state, cap ~24.

- `src/components/terrarium/Jar.tsx`, `Plants.tsx`, `Fireflies.tsx`, `DustMotes.tsx`, `DayNightToggle.tsx` — delete. Everything lives inside the single inline SVG in `Terrarium.tsx` to match the spec's structure.

### SVG reconstruction (inside `.jar-wrap`)

Single `<svg viewBox="0 0 300 400">` containing, in order:
1. Wood shelf: `<rect class="wood-front">` (front face) and `<polygon class="wood-top">` (angled top) near y≈340–400.
2. Jar body: rounded-rect / path with `class="glass-body"` (neck + belly, ~x 40–260, y 60–340).
3. Jar highlight: thin path/ellipse `class="glass-highlight"` on the left edge.
4. Soil mound: darker ellipse/path near jar bottom.
5. Three `<g class="stem a|b|c">` groups, each with `transform-origin: bottom center` (via CSS) — a curved stem `<path>` in `--leaf-2` and 2–3 `<ellipse class="leaf">` in `--leaf-1/2/3`.
6. Dust motes: ~6 `<circle class="mote">` at varied positions, each with `style="animation-delay: -Xs"` for offset.
7. Fireflies layer: mapped from state — each `<g class="firefly" transform="translate(x,y)">` with `<circle class="glow" r="8">` + `<circle class="core" r="2.2">`, plus a gentle idle `translate` animation via inline `animation-delay`.

### Interactions (identical to spec)

- Click inside jar → SVG-coord firefly added; ignore clicks outside jar polygon.
- Hovering a stem rotates its leaves 4deg (CSS only).
- Stems sway with the exact durations/delays and `alternate` direction.
- Toggle adds/removes `night` on `document.body`; all crossfades come from `--transition-slow` on the tokens.

### Verification

Build passes, `/` renders the labeled stage, clicking inside the jar lights fireflies, dusk toggle crossfades sky + glass + toggle chrome, stems sway out of sync, leaves tilt on hover.
