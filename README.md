# Banarsi Das & Sons

Marketing site for Banarsi Das & Sons — handcrafted Lucknowi Chikankari.

The homepage is a faithful implementation of Figma node `699:2983` in the
**"Final Designs - Dev team"** file.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
ESLint 9 + Prettier. Cormorant Garamond and Jost self-hosted via `next/font`.

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `dev` / `build` / `start` | Dev server, production build, serve build |
| `typecheck` | `tsc --noEmit` |
| `lint` / `lint:fix` | ESLint |
| `format` / `format:check` | Prettier |
| `check` | typecheck + lint + format — use in CI |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` so canonical
and Open Graph URLs are correct. Dev falls back to `http://localhost:3000`.

## Layout

```
src/
  app/
    globals.css        Design tokens — the styling source of truth
    layout.tsx         Fonts, metadata
    page.tsx           Composes the homepage
  components/
    layout/            Announcement bar, header, footer
    sections/          One file per Figma section
    ui/                icons.tsx, section-heading.tsx
  lib/
    site.ts            Brand name, navigation
    home-content.ts    Section copy, products, image paths
    unverified.ts      Inferred style values — see below
    utils.ts           cn() helper
public/
  images/  icons/  ornaments/
```

## Design tokens

Colour, type and spacing live in `globals.css` under `@theme`. Use the token
utilities (`text-ink-800`, `bg-sand-100`, …) rather than raw hex so a palette
change stays a one-file edit.

| Scale | Range | Used for |
| --- | --- | --- |
| `ink` | `#17222f` → `#7a828c` | Display type, headings, dark surfaces |
| `gold` | `#8a7256` → `#c0a077` | Eyebrows, links, accents |
| `sand` | `#fdfaf3` → `#cfc4b2` | Page ground, cards, rules |
| `stone` | `#7c7466` | Warm grey body copy |

Light-only by design; `color-scheme: light` stops browser dark mode inverting
the palette.

## Constraints

**Desktop only.** Figma provides one 1280px frame and no responsive designs, so
`body` holds `min-width: 1280px` and narrow viewports scroll rather than reflow
into a layout nobody drew. Do not add breakpoints without designs.

**Inferred values.** The Figma account hit its Starter-plan MCP call limit
before the Our Story block (`699:3212`) and footer (`699:3258`) could be read.
Nine colour values there are inferences, isolated in `lib/unverified.ts` with
their node IDs and reasoning. Everything else — all geometry, every type size —
is measured or solved against Figma. Verify and delete entries as access allows.

**Placeholder content.** Product names, prices and copy are the designer's
placeholders, and the four social links still point at `"#"`. Sections read only
from `home-content.ts`, so swapping in a CMS or catalogue feed is contained
there.

## Notes

- `sharp` is pinned via an npm `override` to `^0.35.3` for patched libvips.
  Check `npm audit` before removing.
- `public/images/hero.png` is retouched: a stray arrow baked into the Figma
  export was inpainted out on request. The original is in git history, in the
  commit that first added the file.
- `motion` is installed but unused — the design specifies no animation. Remove
  it if that stays true.
- The brand is **"Banarsi Das & Sons"**. Figma's prose spells it "Banarasi" in
  one place; the logo and footer do not. Defined once in `lib/site.ts`.
