# Remove Fixed Sizes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every arbitrary bracket (`[...]`) and fixed-pixel size in the landing components with named, clamp-based fluid tokens defined in `globals.css`.

**Architecture:** All non-default values move into `@theme` tokens in `src/app/globals.css`; Tailwind v4 auto-generates utilities (`--text-*` → `text-*`, `--spacing-*` → `p-/m-/w-/h-/size-/gap-/inset-*`, `--aspect-*` → `aspect-*`, `--blur-*` → `blur-*`, `--container-*` → `max-w-*`). Components are then rewritten to use only those named utilities. The custom `3xl` breakpoint is removed; layout reflows happen at standard `xl`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4 (CSS-first config), pnpm.

**Reference spec:** `docs/superpowers/specs/2026-06-15-remove-fixed-sizes-design.md`

---

## File Structure

- `src/app/globals.css` — token source of truth (modify `@theme inline`, `:root`, `.dark`)
- `src/components/layout/navbar.tsx` — nav height + drawer width
- `src/components/landing/hero.tsx` — glows, headline, copy, image bleed, badge/CTA overlays
- `src/components/landing/why-choose-shakoshy.tsx` — bento grid conversion
- `src/components/landing/our-services.tsx` — 2-col grid, colors, heading
- `src/components/landing/how-it-works.tsx` — colors, heading, section padding
- `src/components/landing/get-job-done.tsx` — photo aspect, heading, padding
- `src/components/landing/popular-topics.tsx` — heading, padding
- `src/components/landing/download-app.tsx` — phone width/aspect, heading, padding

**No tests exist (static marketing site).** Each task is verified by: (1) `pnpm build` compiles, (2) a `grep` confirming no residual brackets/`3xl`/`h-17` in the touched file, and (3) Playwright screenshots for the two risky components plus a final full pass.

---

### Task 1: Add fluid tokens to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the breakpoint token with the fluid token block**

In `@theme inline { ... }`, find:

```css
  --font-poppins: var(--font-poppins);
  --breakpoint-3xl: 90rem; /* 1440px */
```

Replace with:

```css
  --font-poppins: var(--font-poppins);

  /* Fluid type scale */
  --text-h1: clamp(1.5rem, 1rem + 2.6vw, 2.25rem);
  --text-h2: clamp(1.875rem, 1.4rem + 2.4vw, 2.25rem);
  --text-h2-sm: clamp(1.5rem, 1.2rem + 1.6vw, 1.875rem);

  /* Fluid spacing rhythm */
  --spacing-section: clamp(3.5rem, 2.5rem + 5vw, 5rem);

  /* Fluid sizes */
  --spacing-glow: clamp(18rem, 10rem + 30vw, 31.25rem);
  --blur-glow: clamp(5rem, 2rem + 8vw, 8.5rem);
  --spacing-phone: clamp(16rem, 10rem + 18vw, 24rem);
  --spacing-nav: clamp(3.5rem, 3rem + 1vw, 4.25rem);
  --spacing-bento-row: clamp(15rem, 12rem + 6vw, 16.4375rem);
  --spacing-hero-bleed: calc(100% + 2.5rem);

  /* Decorative glow insets (percent) */
  --spacing-glow-top: 15%;
  --spacing-glow-top-mid: 20%;
  --spacing-glow-edge: 5%;

  /* Hero overlay (container-query fluid) */
  --spacing-badge-gap: clamp(0.5rem, 2.9cqi, 0.75rem);
  --spacing-badge-icon-gap: clamp(0.25rem, 1.5cqi, 0.5rem);
  --spacing-badge-px: clamp(0.25rem, 1.5cqi, 1rem);
  --spacing-badge-py: clamp(0.375rem, 2.2cqi, 0.5rem);
  --spacing-badge-top: clamp(1rem, 5.9cqi, 2rem);
  --spacing-badge-inset: clamp(0.5rem, 2.9cqi, 1rem);
  --spacing-badge-1-ms: clamp(1rem, 5.9cqi, 2.5rem);
  --spacing-badge-2-ms: clamp(0.5rem, 2.9cqi, 1.25rem);
  --spacing-badge-icon: clamp(1rem, 5.9cqi, 1.5rem);
  --text-badge: clamp(0.75rem, 4.4cqi, 1rem);
  --spacing-cta-px: clamp(0.5rem, 3cqi, 1.5rem);
  --spacing-cta-py: clamp(0.125rem, 1.8cqi, 1rem);
  --spacing-cta-px-lg: clamp(1.5rem, 5cqi, 2.5rem);
  --spacing-cta-px-xl: clamp(1rem, 3.5cqi, 1.75rem);
  --spacing-cta-py-xl: clamp(0.35rem, 1.4cqi, 0.75rem);
  --text-cta: clamp(0.7rem, 3.4cqi, 1.5rem);

  /* Containers */
  --container-drawer: min(18rem, 80vw);

  /* Aspect ratios */
  --aspect-card: 16 / 13;
  --aspect-photo: 4 / 3;
  --aspect-phone: 644 / 766;
```

- [ ] **Step 2: Register surface color tokens in `@theme inline`**

Find the line:

```css
  --shadow-card: var(--shadow-card);
}
```

Replace with:

```css
  --shadow-card: var(--shadow-card);
  --color-surface-peach: var(--surface-peach);
  --color-surface-peach-soft: var(--surface-peach-soft);
  --color-surface-cream: var(--surface-cream);
}
```

- [ ] **Step 3: Add surface values to `:root`**

Find in `:root`:

```css
  --surface-muted: #f7f6f7;
  --surface-dark: #0c0d0e;
```

Replace with:

```css
  --surface-muted: #f7f6f7;
  --surface-dark: #0c0d0e;
  --surface-peach: #fef3e6;
  --surface-peach-soft: #fef7f0;
  --surface-cream: #fefcf9;
```

- [ ] **Step 4: Add surface values to `.dark`**

Find in `.dark`:

```css
  --surface-muted: oklch(0.245 0.011 275);
  --surface-dark: #0c0d0e;
```

Replace with:

```css
  --surface-muted: oklch(0.245 0.011 275);
  --surface-dark: #0c0d0e;
  --surface-peach: oklch(0.3 0.04 54);
  --surface-peach-soft: oklch(0.3 0.04 54);
  --surface-cream: var(--card);
```

- [ ] **Step 5: Verify the build compiles**

Run: `pnpm build`
Expected: `✓ Compiled successfully`. (Tokens not yet referenced, so this only confirms valid CSS.)

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add fluid sizing tokens and surface colors to theme"
```

---

### Task 2: Convert navbar fixed sizes

**Files:**
- Modify: `src/components/layout/navbar.tsx`

- [ ] **Step 1: Replace nav height (`h-17` → `h-nav`)**

Line 13, find:

```
font-poppins mx-auto flex h-17 max-w-5xl items-center justify-between rounded-full border-0 bg-white px-4 font-normal
```

Replace with:

```
font-poppins mx-auto flex h-nav max-w-5xl items-center justify-between rounded-full border-0 bg-white px-4 font-normal
```

- [ ] **Step 2: Replace drawer width (`w-72 max-w-[80vw]` → `w-full max-w-drawer`)**

Line 51 (`Dialog.Popup`), find:

```
font-poppins fixed inset-y-0 end-0 z-50 flex w-72 max-w-[80vw] flex-col gap-6 bg-white p-6 shadow-xl
```

Replace with:

```
font-poppins fixed inset-y-0 end-0 z-50 flex w-full max-w-drawer flex-col gap-6 bg-white p-6 shadow-xl
```

- [ ] **Step 3: Build + verify no brackets/h-17 remain in file**

Run: `pnpm build && grep -nE '\bh-17\b|\[[0-9]' src/components/layout/navbar.tsx`
Expected: build passes; grep prints nothing (the only remaining brackets are `data-[...]` variant selectors, which are allowed — confirm none match the numeric pattern above).

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/navbar.tsx
git commit -m "refactor: tokenize navbar height and drawer width"
```

---

### Task 3: Convert hero fixed sizes

**Files:**
- Modify: `src/components/landing/hero.tsx`

- [ ] **Step 1: Glow #1 (line 24)**

Find:

```
bg-brand/30 pointer-events-none absolute top-[15%] -start-[5%] size-[500px] rounded-full blur-[130px]
```

Replace with:

```
bg-brand/30 pointer-events-none absolute top-glow-top -start-glow-edge size-glow rounded-full blur-glow
```

- [ ] **Step 2: Glow #2 (line 26)**

Find:

```
bg-brand/30 pointer-events-none absolute top-[15%] -end-[5%] size-[500px] rounded-full blur-[130px]
```

Replace with:

```
bg-brand/30 pointer-events-none absolute top-glow-top -end-glow-edge size-glow rounded-full blur-glow
```

- [ ] **Step 3: Glow #3 (line 28)**

Find:

```
bg-brand/20 pointer-events-none absolute top-[20%] start-1/2 size-[500px] -translate-x-1/2 rounded-full blur-[150px]
```

Replace with:

```
bg-brand/20 pointer-events-none absolute top-glow-top-mid start-1/2 size-glow -translate-x-1/2 rounded-full blur-glow
```

- [ ] **Step 4: Grid wrapper (line 34) — `3xl:gap-0` → `xl:gap-0`**

Find:

```
relative z-10 mx-auto grid max-w-7xl items-stretch gap-12 px-6 pt-16 pb-20 md:gap-20 xl:grid-cols-2 xl:pb-28 3xl:gap-0
```

Replace with:

```
relative z-10 mx-auto grid max-w-7xl items-stretch gap-12 px-6 pt-16 pb-20 md:gap-20 xl:grid-cols-2 xl:pb-28 xl:gap-0
```

- [ ] **Step 5: Headline (line 44)**

Find:

```
font-poppins text-center text-2xl font-bold tracking-tight text-balance text-black leading-[1.6] lg:text-4xl xl:text-start
```

Replace with:

```
font-poppins text-center text-h1 font-bold tracking-tight text-balance text-foreground leading-relaxed xl:text-start
```

- [ ] **Step 6: Paragraph (line 51)**

Find:

```
text-muted-foreground mx-auto w-[70%] pb-6 text-center text-lg xl:mx-0 xl:w-auto xl:max-w-md xl:text-start
```

Replace with:

```
text-muted-foreground mx-auto max-w-sm pb-6 text-center text-lg xl:mx-0 xl:max-w-md xl:text-start
```

- [ ] **Step 7: Search card (line 58) — `md:w-[85%]` and `3xl:` → `md:w-5/6` and `xl:`**

Find:

```
bg-background shadow-card flex w-full flex-col gap-5 rounded-2xl p-2 md:mx-auto md:w-[85%] xl:mx-0 xl:w-full 3xl:bg-transparent 3xl:shadow-none
```

Replace with:

```
bg-background shadow-card flex w-full flex-col gap-5 rounded-2xl p-2 md:mx-auto md:w-5/6 xl:mx-0 xl:w-full xl:bg-transparent xl:shadow-none
```

- [ ] **Step 8: Image container (line 78) — aspect + bleed**

Find:

```
@container relative aspect-4/3 w-full md:mx-auto md:w-[85%] xl:mx-0 xl:-ms-10 xl:w-[calc(100%+2.5rem)]
```

Replace with:

```
@container relative aspect-photo w-full md:mx-auto md:w-5/6 xl:mx-0 xl:-ms-10 xl:w-hero-bleed
```

- [ ] **Step 9: Badge column wrapper (line 93) — fix invalid `-inset-s`**

Find:

```
absolute top-[clamp(1rem,5.9cqi,2rem)] -inset-s-[clamp(0.5rem,2.9cqi,1rem)] flex flex-col gap-[clamp(0.5rem,2.9cqi,0.75rem)]
```

Replace with:

```
absolute top-badge-top -start-badge-inset flex flex-col gap-badge-gap
```

- [ ] **Step 10: Badge 1 (line 94)**

Find:

```
bg-background shadow-card ms-[clamp(1rem,5.9cqi,2.5rem)] flex w-fit items-center gap-[clamp(0.25rem,1.5cqi,0.5rem)] rounded-full px-[clamp(0.25rem,1.5cqi,1rem)] py-[clamp(0.375rem,2.2cqi,0.5rem)]
```

Replace with:

```
bg-background shadow-card ms-badge-1-ms flex w-fit items-center gap-badge-icon-gap rounded-full px-badge-px py-badge-py
```

- [ ] **Step 11: Badge 1 icon (line 95) and text (line 96)**

Find: `text-primary shrink-0 size-[clamp(1rem,5.9cqi,1.5rem)]`
Replace: `text-primary shrink-0 size-badge-icon`

Find: `font-poppins font-semibold text-[clamp(0.75rem,4.4cqi,1rem)]`
Replace: `font-poppins font-semibold text-badge`

- [ ] **Step 12: Badge 2 (line 100)**

Find:

```
bg-background ms-[clamp(0.5rem,2.9cqi,1.25rem)] flex w-fit items-center gap-[clamp(0.25rem,1.5cqi,0.5rem)] rounded-full px-[clamp(0.25rem,1.5cqi,1rem)] py-[clamp(0.375rem,2.2cqi,0.5rem)]
```

Replace with:

```
bg-background ms-badge-2-ms flex w-fit items-center gap-badge-icon-gap rounded-full px-badge-px py-badge-py
```

- [ ] **Step 13: Badge 2 icon (line 101) and text (line 102)**

Find: `text-primary shrink-0 size-[clamp(1rem,5.9cqi,1.5rem)]`
Replace: `text-primary shrink-0 size-badge-icon`

Find: `font-poppins font-semibold text-[clamp(0.75rem,4.4cqi,1rem)]`
Replace: `font-poppins font-semibold text-badge`

(There are two identical icon/text pairs — replace the one inside Badge 2.)

- [ ] **Step 14: CTA button (line 110)**

Find:

```
font-poppins absolute end-0 -bottom-1 z-0 h-auto rounded-full px-[clamp(0.5rem,3cqi,1.5rem)] py-[clamp(0.125rem,1.8cqi,1rem)] text-[clamp(0.7rem,3.4cqi,1.5rem)] lg:px-[clamp(1.5rem,5cqi,2.5rem)] xl:px-[clamp(1rem,3.5cqi,1.75rem)] xl:py-[clamp(0.35rem,1.4cqi,0.75rem)]
```

Replace with:

```
font-poppins absolute end-0 -bottom-1 z-0 h-auto rounded-full px-cta-px py-cta-py text-cta lg:px-cta-px-lg xl:px-cta-px-xl xl:py-cta-py-xl
```

- [ ] **Step 15: Build + verify no brackets/3xl remain**

Run: `pnpm build && grep -nE '3xl:|\[[0-9]|\[clamp|\[calc|text-\[#|-inset-s' src/components/landing/hero.tsx`
Expected: build passes; grep prints nothing. (`@container`, `start-1/2`, `-bottom-1` are fine.)

- [ ] **Step 16: Visual check (risky component)**

Start dev server in background: `pnpm dev` (serves on http://localhost:3000).
Using Playwright MCP: navigate to `http://localhost:3000`, then for each width in `375, 768, 1024, 1280, 1536` call `browser_resize` then `browser_take_screenshot`. Confirm: the two badges sit top-left over the image and scale smoothly; the "Become a Worker" CTA sits bottom-right; glows render; headline scales without overflow.

- [ ] **Step 17: Commit**

```bash
git add src/components/landing/hero.tsx
git commit -m "refactor: tokenize hero glows, type, copy, and overlay sizes"
```

---

### Task 4: Convert why-choose bento to a fluid grid

**Files:**
- Modify: `src/components/landing/why-choose-shakoshy.tsx`

- [ ] **Step 1: Section padding (line 8)**

Find: `font-poppins mx-auto max-w-7xl px-6 py-20`
Replace: `font-poppins mx-auto max-w-7xl px-6 py-section`

- [ ] **Step 2: Heading (line 10)**

Find: `text-2xl font-bold tracking-tight sm:text-3xl`
Replace: `text-h2-sm font-bold tracking-tight`

- [ ] **Step 3: Outer wrapper (line 27)**

Find: `flex flex-wrap gap-6 3xl:flex-col`
Replace: `grid grid-cols-2 gap-6 xl:flex xl:flex-col`

- [ ] **Step 4: Row 1 wrapper (line 29)**

Find: `contents 3xl:flex 3xl:flex-row 3xl:gap-6 3xl:justify-center`
Replace: `contents xl:grid xl:grid-cols-12 xl:gap-6 xl:h-bento-row`

- [ ] **Step 5: Card 1 (line 33)**

Find:

```
bg-background shadow-card flex aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] flex-row items-stretch gap-2 overflow-hidden rounded-2xl 3xl:aspect-[371/263] 3xl:basis-0 3xl:flex-1
```

Replace with:

```
bg-background shadow-card flex aspect-card flex-row items-stretch gap-2 overflow-hidden rounded-2xl xl:col-span-4 xl:aspect-auto
```

- [ ] **Step 6: Card 2 (line 49)**

Find:

```
bg-background shadow-card flex aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] flex-col gap-4 overflow-hidden rounded-2xl p-6 3xl:aspect-[343/263] 3xl:min-w-0 3xl:grow-0 3xl:basis-[343px]
```

Replace with:

```
bg-background shadow-card flex aspect-card flex-col gap-4 overflow-hidden rounded-2xl p-6 xl:col-span-3 xl:aspect-auto
```

- [ ] **Step 7: Card 3 (line 65)**

Find:

```
bg-background shadow-card flex aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] flex-col gap-4 overflow-hidden rounded-2xl p-6 3xl:aspect-[470/263] 3xl:min-w-0 3xl:grow-0 3xl:basis-[470px]
```

Replace with:

```
bg-background shadow-card flex aspect-card flex-col gap-4 overflow-hidden rounded-2xl p-6 xl:col-span-5 xl:aspect-auto
```

- [ ] **Step 8: Row 2 wrapper (line 78)**

Find: `contents 3xl:flex 3xl:flex-row 3xl:gap-6 3xl:justify-center`
Replace: `contents xl:grid xl:grid-cols-12 xl:gap-6 xl:h-bento-row`

- [ ] **Step 9: Card 4 (line 82)**

Find:

```
shadow-card flex aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] flex-row items-stretch gap-2 overflow-hidden rounded-2xl bg-[#fef3e6] p-4 3xl:aspect-[362/263] 3xl:min-w-0 3xl:max-w-[362px] 3xl:grow-0 3xl:basis-[362px]
```

Replace with:

```
shadow-card flex aspect-card flex-row items-stretch gap-2 overflow-hidden rounded-2xl bg-surface-peach p-4 xl:col-span-3 xl:aspect-auto
```

- [ ] **Step 10: Card 5 (line 98)**

Find:

```
bg-background shadow-card flex aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] flex-col gap-4 overflow-hidden rounded-2xl p-6 3xl:aspect-[500/263] 3xl:min-w-0 3xl:grow-0 3xl:basis-[500px]
```

Replace with:

```
bg-background shadow-card flex aspect-card flex-col gap-4 overflow-hidden rounded-2xl p-6 xl:col-span-5 xl:aspect-auto
```

- [ ] **Step 11: Card 6 (line 114)**

Find:

```
shadow-card relative aspect-[16/13] grow basis-full sm:basis-[calc(50%-0.75rem)] overflow-hidden rounded-2xl bg-black p-6 3xl:aspect-[415/263] 3xl:min-w-0 3xl:grow-0 3xl:basis-[415px]
```

Replace with:

```
shadow-card relative aspect-card overflow-hidden rounded-2xl bg-black p-6 xl:col-span-4 xl:aspect-auto
```

- [ ] **Step 12: Card 6 text block (line 116) — `max-w-[60%]` → `w-3/5`**

Find: `flex max-w-[60%] flex-col gap-4`
Replace: `flex w-3/5 flex-col gap-4`

- [ ] **Step 13: Card 6 image wrapper (line 122) — `h-[85%] w-[70%]` → fractions**

Find: `absolute end-0 bottom-0 h-[85%] w-[70%]`
Replace: `absolute end-0 bottom-0 h-5/6 w-3/4`

- [ ] **Step 14: Build + verify no brackets/3xl remain**

Run: `pnpm build && grep -nE '3xl:|\[[0-9]|\[calc|bg-\[#|aspect-\[' src/components/landing/why-choose-shakoshy.tsx`
Expected: build passes; grep prints nothing.

- [ ] **Step 15: Visual check (risky component)**

With `pnpm dev` running: via Playwright MCP navigate to `http://localhost:3000`, scroll to the "Why Choose" section, and screenshot at `375, 768, 1024, 1280, 1536`. Confirm: below `xl` the six cards form a clean 2-column grid; at `xl`+ they form two bento rows (4-3-5, then 3-5-4 column spans) with equal heights; card 6's text and bottom-right image read correctly.

- [ ] **Step 16: Commit**

```bash
git add src/components/landing/why-choose-shakoshy.tsx
git commit -m "refactor: convert why-choose bento to fluid token-driven grid"
```

---

### Task 5: Convert our-services fixed sizes

**Files:**
- Modify: `src/components/landing/our-services.tsx`

- [ ] **Step 1: ServiceCard wrapper (line 23) — drop basis calc**

Find: `flex flex-1 basis-[calc(50%-0.75rem)] justify-center lg:basis-0`
Replace: `flex flex-1 justify-center lg:basis-0`

- [ ] **Step 2: Section (line 36) — color + padding**

Find: `bg-[#fefcf9] py-20`
Replace: `bg-surface-cream py-section`

- [ ] **Step 3: Heading (line 39)**

Find: `font-poppins text-3xl font-semibold tracking-tight sm:text-4xl`
Replace: `font-poppins text-h2 font-semibold tracking-tight`

- [ ] **Step 4: Subtitle (line 51)**

Find: `font-poppins mt-4 font-normal text-[#1A1A1A]`
Replace: `font-poppins mt-4 font-normal text-foreground`

- [ ] **Step 5: Outer wrapper (line 58) — 2-col grid for mobile**

Find: `flex flex-wrap gap-6 lg:flex-col`
Replace: `grid grid-cols-2 gap-6 lg:flex lg:flex-col`

- [ ] **Step 6: Build + verify no brackets remain**

Run: `pnpm build && grep -nE '\[[0-9]|\[calc|bg-\[#|text-\[#' src/components/landing/our-services.tsx`
Expected: build passes; grep prints nothing. (`lg:ms-13`, `h-28`, `max-w-52` are bracket-free named utilities and stay.)

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/our-services.tsx
git commit -m "refactor: tokenize our-services grid, colors, and heading"
```

---

### Task 6: Convert how-it-works fixed sizes

**Files:**
- Modify: `src/components/landing/how-it-works.tsx`

- [ ] **Step 1: Step card background (line 41)**

Find: `w-full rounded-2xl bg-[#FEF7F0] p-8`
Replace: `w-full rounded-2xl bg-surface-peach-soft p-8`

- [ ] **Step 2: Section (line 60) — padding**

Find: `font-poppins mx-auto max-w-7xl px-6 py-20`
Replace: `font-poppins mx-auto max-w-7xl px-6 py-section`

- [ ] **Step 3: Heading (line 62)**

Find: `text-3xl font-bold tracking-tight sm:text-4xl`
Replace: `text-h2 font-bold tracking-tight`

- [ ] **Step 4: Subtitle (line 75)**

Find: `mt-4 font-normal text-[#1A1A1A] lg:whitespace-nowrap`
Replace: `mt-4 font-normal text-foreground lg:whitespace-nowrap`

- [ ] **Step 5: Build + verify no brackets remain**

Run: `pnpm build && grep -nE '\[[0-9]|bg-\[#|text-\[#' src/components/landing/how-it-works.tsx`
Expected: build passes; grep prints nothing.

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/how-it-works.tsx
git commit -m "refactor: tokenize how-it-works colors, heading, and padding"
```

---

### Task 7: Convert get-job-done fixed sizes

**Files:**
- Modify: `src/components/landing/get-job-done.tsx`

- [ ] **Step 1: Section (line 56) — padding**

Find: `font-poppins bg-white py-20`
Replace: `font-poppins bg-white py-section`

- [ ] **Step 2: Heading (line 87)**

Find: `text-3xl font-bold tracking-tight sm:text-4xl`
Replace: `text-h2 font-bold tracking-tight`

- [ ] **Step 3: Image panel aspect (line 115)**

Find: `relative aspect-[4/3] overflow-hidden rounded-3xl`
Replace: `relative aspect-photo overflow-hidden rounded-3xl`

- [ ] **Step 4: Build + verify no brackets remain**

Run: `pnpm build && grep -nE 'aspect-\[|\[[0-9]' src/components/landing/get-job-done.tsx`
Expected: build passes; grep prints nothing. (TypeScript index access like `(typeof tabs)[number]` is not a class string and won't match these patterns.)

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/get-job-done.tsx
git commit -m "refactor: tokenize get-job-done aspect, heading, and padding"
```

---

### Task 8: Convert popular-topics fixed sizes

**Files:**
- Modify: `src/components/landing/popular-topics.tsx`

- [ ] **Step 1: Section (line 19) — padding**

Find: `bg-surface-muted font-poppins overflow-hidden py-20`
Replace: `bg-surface-muted font-poppins overflow-hidden py-section`

- [ ] **Step 2: Heading (line 21)**

Find: `mb-14 text-center text-3xl font-semibold tracking-tight sm:text-4xl`
Replace: `mb-14 text-center text-h2 font-semibold tracking-tight`

- [ ] **Step 3: Build + verify**

Run: `pnpm build && grep -nE 'py-20|text-3xl|sm:text-4xl' src/components/landing/popular-topics.tsx`
Expected: build passes; grep prints nothing. (`aspect-16/10` is bracket-free and stays.)

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/popular-topics.tsx
git commit -m "refactor: tokenize popular-topics heading and padding"
```

---

### Task 9: Convert download-app fixed sizes

**Files:**
- Modify: `src/components/landing/download-app.tsx`

- [ ] **Step 1: Heading (line 94)**

Find: `text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl lg:leading-snug`
Replace: `text-h2 font-bold tracking-tight lg:leading-snug`

- [ ] **Step 2: Phone container width (line 75)**

Find: `relative w-64 sm:w-72 lg:w-80 xl:w-96 ${ratio}`
Replace: `relative w-phone ${ratio}`

- [ ] **Step 3: AppShowcase call — customer ratio (line 119)**

Find: `ratio="aspect-[644/766]"`
Replace: `ratio="aspect-phone"`

- [ ] **Step 4: AppShowcase call — worker ratio (line 128)**

Find: `ratio="aspect-[644/776]"`
Replace: `ratio="aspect-phone"`

- [ ] **Step 5: Section padding (line 90)**

Find: `bg-surface-dark font-poppins overflow-hidden pt-14 pb-0 text-white lg:pt-20`
Replace: `bg-surface-dark font-poppins overflow-hidden pt-section pb-0 text-white`

(`pt-section` uses the fluid token; the asymmetric `pb-0` is intentional and stays. `lg:pt-20` is dropped since `pt-section` already scales up.)

- [ ] **Step 6: Build + verify no brackets remain**

Run: `pnpm build && grep -nE 'aspect-\[|w-64|sm:w-72|lg:w-80|xl:w-96|pt-14|lg:pt-20' src/components/landing/download-app.tsx`
Expected: build passes; grep prints nothing.

- [ ] **Step 7: Commit**

```bash
git add src/components/landing/download-app.tsx
git commit -m "refactor: tokenize download-app phone size, aspect, and padding"
```

---

### Task 10: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Global grep for residual fixed/bracket sizes**

Run:

```bash
grep -rnE '3xl:|\bh-17\b|py-20|aspect-\[|basis-\[|size-\[|blur-\[|bg-\[#|text-\[#|w-\[|h-\[|max-w-\[[0-9]|\[clamp|\[calc' src/components/ src/app/
```

Expected: prints nothing from landing/layout components. (Allowed remnants only inside `src/components/ui/button.tsx`: `text-[0.8rem]`, `rounded-[min(...)]`, and `[&_svg]`/`data-[...]` variant selectors — out of scope per spec.) If anything else prints, fix it before continuing.

- [ ] **Step 2: Production build**

Run: `pnpm build`
Expected: `✓ Compiled successfully` and static generation completes.

- [ ] **Step 3: Full visual regression pass**

With `pnpm dev` running, via Playwright MCP navigate to `http://localhost:3000`. For each width in `375, 768, 1024, 1280, 1536`: `browser_resize`, then `browser_take_screenshot` (full page). Walk every section (hero, how-it-works, why-choose, get-job-done, our-services, popular-topics, download-app, footer) and confirm: no overflow, no collapsed/zero-height boxes, headings scale smoothly, the why-choose grid and hero overlays match the spec's intended layout. Note any visual deltas from the pre-refactor screenshots taken in Tasks 3 and 4.

- [ ] **Step 4: Stop the dev server**

Stop the background `pnpm dev` process.

- [ ] **Step 5: Final confirmation**

No commit needed (all work committed per task). Report the screenshot results and any deltas to the user.

---

## Notes on intentional visual changes

- Headings switch from stepped (`text-2xl sm:text-4xl`) to continuous fluid scaling — exact sizes at any given breakpoint will differ slightly.
- The why-choose desktop bento reflow now triggers at `xl` (1280px) instead of the old 1440px, and uses proportional column spans + a fluid row height rather than fixed pixel widths.
- Card 6 image area uses `h-5/6 w-3/4` (≈83% / 75%) vs the old `85% / 70%`; confirm acceptable in the Task 4 screenshots and nudge to other built-in fractions if needed.
- The hero image bleed is preserved exactly via `--spacing-hero-bleed: calc(100% + 2.5rem)`.
