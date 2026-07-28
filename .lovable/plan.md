
## Digital Terrarium

Replace the index placeholder with a single cozy scene. No routing, no backend, no new deps.

### Files

- `src/styles.css` — add muted terrarium tokens (sage/moss greens, warm wood, warm firefly amber, day/night backgrounds) and keyframes for organic sway, drift, twitch, and dust motes. Multiple sway keyframes with different curves so stems don't sync.
- `src/routes/index.tsx` — replace placeholder with `<Terrarium />` and give it a proper head() (title, description, og/twitter).
- `src/components/terrarium/Terrarium.tsx` — scene container, day/night state, click-to-add-firefly handler bound to the jar interior.
- `src/components/terrarium/Jar.tsx` — SVG jar (translucent fill, soft edge highlight, subtle rim shadow) sitting on a wooden shelf rectangle with soft grain gradient.
- `src/components/terrarium/Plants.tsx` — 3 SVG stems as curved paths with small leaves, each with its own sway animation (different duration 6–11s, delay, amplitude, transform-origin at stem base). Hover on the plant group triggers a light `leaf-twitch` animation on a couple of leaves.
- `src/components/terrarium/Fireflies.tsx` — renders firefly dots added by clicks; each has randomized drift path (CSS custom properties for x/y amplitude and duration), soft blur + glow, brighter opacity at night. Constrained to jar interior bounds.
- `src/components/terrarium/DayNightToggle.tsx` — small sun/moon icon button, crossfades scene via a `night` class on the root.
- `src/components/terrarium/DustMotes.tsx` — a handful of very faint slow-drifting particles behind the jar.

### Vibe & interaction rules

- Palette: soft sage/moss greens, warm oak wood, cream/parchment day bg, deep dusk blue-violet night bg, single warm amber accent for fireflies. All via semantic tokens in `styles.css` (no hardcoded colors in components).
- Sway: pure CSS keyframes on `transform: rotate()` with `transform-origin` at each stem's base; ease-in-out; 3 distinct animations so timing/amplitude vary. No JS tick loop.
- Fireflies: click anywhere inside the jar interior adds one; capped (e.g. 24) silently — no counter, no message. Position stored in local state as `{id, x, y}`; drift via CSS animation with per-instance random `--dx/--dy/--dur` inline vars. Brighter glow when `night`.
- Day/night: single `night` boolean toggles a class on the scene root; background gradient, wood tint, and firefly glow all crossfade via `transition` on relevant properties (~800ms).
- No sound, no scores, no timers, no notifications, nothing dismissible.

### Verification

Build passes, open `/`, confirm: stems sway out of sync, clicking inside jar spawns drifting fireflies, toggle crossfades day↔night, hovering plant twitches a leaf.
