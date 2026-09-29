# Little Terrarium

Build a small, standalone "digital terrarium" component — a glass jar 

sitting on a wooden shelf, containing a simple plant. No routing or 

backend needed, just one cozy visual page.

VIBE: quiet, cozy, a little magical. Nothing sharp, nothing loud. 

This should feel like a tiny sanctuary, not an app.

SCENE:

- A glass jar (SVG, translucent, soft highlight on one edge) sitting on 

  a simple wooden surface.

- Inside: 2-3 layered plant stems made of soft curved SVG paths with 

  small leaves, in varied sage/moss greens. They should gently sway 

  side to side on a slow, staggered animation (different stems, 

  slightly different timing/amplitude, so it doesn't look mechanical).

- Soft ambient background — a gentle gradient, maybe a few slow-drifting 

  dust-mote particles or a very faint glow.

INTERACTIONS (keep them small and low-stakes — no goals, no failure 

states, nothing to "win"):

- Click inside the jar to add a firefly: a small glowing dot that drifts 

  around softly within the jar's bounds using gentle randomized easing, 

  with a soft blur/glow so it looks lit rather than drawn.

- A day/night toggle that crossfades the background and lighting — warm 

  soft daylight vs. dim dusk with the fireflies glowing brighter at night.

- Optional: hovering over the plant makes a leaf or two twitch slightly, 

  like a light breeze.

CONSTRAINTS:

- No sound unless I ask for it.

- No scoring, timers, notifications, or anything that could feel like 

  pressure. This is meant to be looked at, not optimized.

- Keep the color palette limited and muted (soft greens, warm wood 

  tones, one warm accent for the fireflies) rather than bright/saturated.

Prioritize the plant's sway animation feeling organic — that's the 

detail that will make or break the "cozy" feeling.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://little-terrarium.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8e708a93-2f70-49ea-acda-01f6e27ad1b3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
