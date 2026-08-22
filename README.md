# Banarsi Das & Sons

Marketing site for Banarsi Das & Sons — handcrafted Lucknowi Chikankari.

Built from the Figma design **"Final Designs - Dev team"**, section `699:2983`.

## Stack

| Layer      | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19      |
| Language   | TypeScript (strict)                     |
| Styling    | Tailwind CSS v4 with CSS-variable tokens |
| Fonts      | Cormorant Garamond + Jost via `next/font` |
| Animation  | Motion                                  |
| Tooling    | ESLint 9 (flat config) + Prettier       |

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Script                 | Does                                        |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Dev server with hot reload                  |
| `npm run build`        | Production build                            |
| `npm start`            | Serve the production build                  |
| `npm run typecheck`    | `tsc --noEmit`                              |
| `npm run lint`         | ESLint                                      |
| `npm run lint:fix`     | ESLint with autofix                         |
| `npm run format`       | Prettier write                              |
| `npm run check`        | typecheck + lint + format check (use in CI) |

## Project layout

```
src/
  app/            App Router routes, layout and global stylesheet
    globals.css   Design tokens — the styling source of truth
  components/
    layout/       Header, footer, shell-level chrome
    sections/     Homepage sections, one file per Figma section
    ui/           Small reusable primitives
  lib/
    site.ts       Brand strings and navigation data
    utils.ts      cn() class merge helper
public/images/    Exported Figma imagery
```

## Design tokens

Colour, type and spacing live in `src/app/globals.css` under `@theme`.
Use the token utilities (`text-ink-800`, `bg-sand-100`, `tracking-eyebrow`, …)
rather than arbitrary hex values so a palette change stays a one-file edit.

The palette comes straight from the Figma file:

- **Ink** `#17222f → #7a828c` — navy display type, headings, primary buttons
- **Gold** `#8a7256 → #c0a077` — links, eyebrows, accents
- **Sand** `#fcfaf3 → #d3c7b4` — page ground, cards, rules
- **Stone** `#7c7466` — warm grey body copy

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for correct
canonical and Open Graph URLs. Local dev falls back to `http://localhost:3000`.

## Notes

- `sharp` is pinned via an npm `override` to `^0.35.3` to pick up patched
  libvips. Do not remove it without checking `npm audit`.
- The site is intentionally light-only; `color-scheme: light` is set in
  `globals.css` so browser dark mode does not invert the palette.
