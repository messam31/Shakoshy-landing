# Design: Remove Fixed Sizes → Fluid, Token-Driven Sizing

Date: 2026-06-15
Status: Approved (design); pending spec review

## Goal

Eliminate hardcoded/fixed sizing from the landing page and make the design
fluid. Two hard rules drive every decision:

1. **No arbitrary bracket values (`[...]`) in markup** for sizes/spacing/dimensions.
   Every non-default value lives in `globals.css` as a named `@theme` token that
   Tailwind v4 turns into a first-class utility.
2. **Nothing fixed for layout-significant dimensions.** Things that should scale
   (headings, hero overlays, glows, section rhythm, phone showcase) scale fluidly
   via `clamp()` *inside* the tokens.

The markup ends up fully semantic (`text-h1`, `py-section`, `size-glow`,
`aspect-card`) with the values centralized in `globals.css`.

## Scope decisions (please confirm at review)

**In scope — eliminated entirely:**
- All bracketed size/spacing/dimension values: `size-[500px]`, `blur-[130px]`,
  `basis-[470px]`, `aspect-[16/13]`, `max-w-[60%]`, `h-[85%]`, `w-[70%]`,
  `basis-[calc(50%-0.75rem)]`, `max-w-[80vw]`, `xl:w-[calc(100%+2.5rem)]`, the hero
  `clamp(...,cqi,...)` soup, `top-[15%]`/`-start-[5%]` decorative insets,
  `aspect-[4/3]`, `aspect-[644/766]`, `aspect-[644/776]`.
- Off-scale named utilities: `h-17`.
- The custom `--breakpoint-3xl` token (and all `3xl:` usages).

**Kept as-is (named, already responsive-friendly, not arbitrary):**
- Default rem-scale utilities used for body text, small spacing, and gaps
  (`text-sm`, `text-lg`, `gap-6`, `p-6`, `px-6`, `w-64`, `max-w-52`, etc.).
  Fully fluidizing these adds complexity with no benefit (YAGNI). The fluid
  treatment is reserved for headings and layout-significant dimensions.
- Built-in fraction utilities: `w-1/2`, `w-3/5`, `w-2/5`, `start-1/2`.
- `max-w-7xl` / `max-w-5xl` / `max-w-2xl` / `max-w-md` / `max-w-sm` — these are
  named container *caps*; content is fluid below them.
- Bare ratio utilities that need no brackets: `aspect-16/10` (already used),
  and `aspect-4/3` (the no-bracket form we standardize on).

**Out of scope:**
- `src/components/ui/button.tsx` — shadcn primitive. Its `text-[0.8rem]`,
  `rounded-[min(...)]`, `[&_svg...]`, `data-[...]`, `has-data-[...]` are
  component-library internals and arbitrary-*variant selectors* (not layout
  sizes). Touching the cva risks the component contract.
- Arbitrary-variant selectors elsewhere (`data-[ending-style]`,
  `[&_svg]`) — these are selectors, not sizes; they have no named equivalent.

## `globals.css` token additions

Added under `@theme inline { ... }`. Tailwind v4 auto-generates utilities by
namespace (`--text-*` → `text-*`, `--spacing-*` → `p-/m-/w-/h-/gap-/size-/top-…`,
`--aspect-*` → `aspect-*`, `--blur-*` → `blur-*`, `--container-*` → `max-w-*`).

```css
/* Fluid type scale */
--text-h1: clamp(1.5rem, 1rem + 2.6vw, 2.25rem);      /* hero headline */
--text-h2: clamp(1.875rem, 1.4rem + 2.4vw, 2.25rem);  /* large section headings (3xl→4xl) */
--text-h2-sm: clamp(1.5rem, 1.2rem + 1.6vw, 1.875rem);/* smaller section headings (2xl→3xl) */

/* Fluid spacing rhythm */
--spacing-section: clamp(3.5rem, 2.5rem + 5vw, 5rem);  /* replaces py-20 */

/* Fluid sizes */
--spacing-glow: clamp(18rem, 10rem + 30vw, 31.25rem);  /* hero glow 500px */
--blur-glow: clamp(5rem, 2rem + 8vw, 8.5rem);          /* hero blur 130/150px */
--spacing-phone: clamp(16rem, 10rem + 18vw, 24rem);    /* download-app phones */
--spacing-nav: clamp(3.5rem, 3rem + 1vw, 4.25rem);     /* navbar h-17 */

/* Decorative glow insets (percentages, fed to inset utilities) */
--spacing-glow-top: 15%;     /* top-glow-top */
--spacing-glow-top-mid: 20%; /* top-glow-top-mid */
--spacing-glow-edge: 5%;     /* -start-glow-edge / -end-glow-edge */

/* Containers */
--container-drawer: min(18rem, 80vw);  /* mobile menu (replaces w-72 + max-w-[80vw]) */

/* Aspect ratios */
--aspect-card: 16 / 13;        /* why-choose mobile cards */
--aspect-photo: 4 / 3;         /* hero + get-job-done image panels */
--aspect-phone: 644 / 766;     /* download-app phone screens (unify 766/776) */
```

**Removed:** `--breakpoint-3xl: 90rem;` (added in a prior change). Layout reflows
now happen at standard `xl`.

The hero overlay tokens (badges/CTA) keep their `clamp(...,cqi,...)` fluid form
but move out of the markup into named tokens (no inline "soup"):

```css
--spacing-badge-gap: clamp(0.5rem, 2.9cqi, 0.75rem);
--spacing-badge-px: clamp(0.25rem, 1.5cqi, 1rem);
--spacing-badge-py: clamp(0.375rem, 2.2cqi, 0.5rem);
--spacing-badge-icon-gap: clamp(0.25rem, 1.5cqi, 0.5rem);
--spacing-badge-top: clamp(1rem, 5.9cqi, 2rem);
--spacing-badge-inset: clamp(0.5rem, 2.9cqi, 1rem);
--spacing-badge-1-ms: clamp(1rem, 5.9cqi, 2.5rem);
--spacing-badge-2-ms: clamp(0.5rem, 2.9cqi, 1.25rem);
--text-badge: clamp(0.75rem, 4.4cqi, 1rem);
--spacing-badge-icon: clamp(1rem, 5.9cqi, 1.5rem);
--spacing-cta-px: clamp(0.5rem, 3cqi, 1.5rem);
--spacing-cta-py: clamp(0.125rem, 1.8cqi, 1rem);
--text-cta: clamp(0.7rem, 3.4cqi, 1.5rem);
```

(Final token names/grouping may be tidied during implementation; the principle is
fixed — no inline brackets.)

## Inventory → mapping

| Current (file:line) | Replacement |
|---|---|
| `size-[500px]` ×3 (hero) | `size-glow` |
| `blur-[130px]` / `blur-[150px]` (hero) | `blur-glow` |
| `top-[15%]` / `top-[20%]` / `-start-[5%]` / `-end-[5%]` (hero) | `top-glow-top` / `top-glow-top-mid` / `-start-glow-edge` / `-end-glow-edge` |
| `text-2xl lg:text-4xl` (hero h1) | `text-h1` |
| `leading-[1.6]` (hero h1) | `leading-relaxed` (named) |
| `text-black` (hero h1) | `text-foreground` (token consistency) |
| `w-[70%]` (hero copy) | `max-w-sm mx-auto` (named) |
| `md:w-[85%]` (hero) | `md:w-5/6` (≈83%, built-in fraction, visually equivalent) |
| `xl:-ms-10` + `xl:w-[calc(100%+2.5rem)]` (hero image) | restructure: remove negative-margin+calc bleed; use grid/`-ms` token or container alignment |
| `aspect-4/3` (hero) | `aspect-photo` |
| hero badges/CTA `clamp(...cqi...)` ×~15 | `*-badge-*` / `*-cta-*` tokens |
| `-inset-s-[clamp(...)]` (hero, **invalid no-op today**) | fix → `-start-badge-inset` |
| `aspect-[16/13]` ×6 (why-choose) | `aspect-card` |
| `basis-[calc(50%-0.75rem)]` (why-choose, our-services) | `grid grid-cols-2` (drop basis) |
| `3xl:basis-[343/470/362/500/415px]` + per-card `3xl:aspect-[…/263]` | `fr` grid w/ `col-span-*` at `xl`; equal-height rows via `items-stretch` (per-card ratios dropped) |
| `max-w-[60%]` / `h-[85%]` / `w-[70%]` (why-choose card 6) | restructure card-6 image positioning with fractions/grid (no brackets) |
| `bg-[#fef3e6]` (why-choose) | `bg-surface-peach` token |
| `aspect-[4/3]` (get-job-done) | `aspect-photo` |
| `bg-[#FEF7F0]` (how-it-works) | `bg-surface-peach` token |
| `text-[#1A1A1A]` (how-it-works, our-services) | `text-foreground` |
| `bg-[#fefcf9]` (our-services) | `bg-surface-peach` (or `bg-background`) |
| `py-20` (all sections) | `py-section` |
| `aspect-[644/766]` / `aspect-[644/776]` (download-app) | `aspect-phone` |
| `w-64 sm:w-72 lg:w-80 xl:w-96` (download-app) | `w-phone` |
| `aspect-16/10` (popular-topics) | keep (bare, no brackets) |
| `h-17` (navbar) | `h-nav` |
| `w-72 max-w-[80vw]` (navbar drawer) | `max-w-drawer w-full` |
| section heading `text-3xl sm:text-4xl` etc. | `text-h2` / `text-h2-sm` |

Color tokens (`--color-surface-peach`) are added to consolidate the three peach
hexes; this is a necessary side-effect of removing those bracket color values.

## Per-file change summary

- `src/app/globals.css` — add the token block above; remove `--breakpoint-3xl`;
  add `--color-surface-peach`.
- `src/components/landing/hero.tsx` — glows, headline, copy width, image bleed
  restructure, badge/CTA token swap, fix invalid `-inset-s` utility.
- `src/components/landing/why-choose-shakoshy.tsx` — `fr` grid bento (replaces
  fixed-px flex), `aspect-card`/`aspect-card-wide`, peach token, card-6 restructure.
- `src/components/landing/our-services.tsx` — `grid grid-cols-2`, peach/bg token,
  `text-foreground`, `py-section`, heading token.
- `src/components/landing/how-it-works.tsx` — peach token, `text-foreground`,
  `py-section`, heading token.
- `src/components/landing/get-job-done.tsx` — `aspect-photo`, `py-section`,
  heading token.
- `src/components/landing/popular-topics.tsx` — `py-section`, heading token.
- `src/components/landing/download-app.tsx` — `w-phone`, `aspect-phone`,
  `py-section`, heading tokens.
- `src/components/layout/navbar.tsx` — `h-nav`, `max-w-drawer`.

## Risks & open items

- **Bento grid conversion (why-choose)** is the riskiest change: the fixed-px
  flex bento becomes a relative `fr` grid. Column proportions must be chosen to
  approximate the current widths. Verified visually via screenshots.
- **Hero image bleed** (`xl:-ms-10` + `xl:w-[calc(100%+2.5rem)]`) needs a
  bracket-free restructure; may shift the image edge slightly.
- **Card-6 image** (`h-[85%] w-[70%]` absolute) needs restructuring to fractions
  without brackets.
- Stepped→fluid headings change exact font sizes at every breakpoint; intended,
  but visually different from current.

## Verification

For each changed component:
1. `pnpm build` — must compile (confirms every token resolves to a real utility).
2. Playwright screenshots at **375 / 768 / 1024 / 1280 / 1536** px, before vs.
   after, to confirm fluid scaling holds and no layout collapses at the extremes.
3. Final grep: zero `[...]` size/spacing/dimension values and zero `3xl:` /
   `h-17` remaining in the landing components.
