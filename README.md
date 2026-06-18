# Shakoshy — Landing Page

Marketing landing page for **Shakoshy**, a marketplace that connects customers
with verified local service professionals (plumbing, electrical, AC, cleaning,
carpentry, and more). Post a request, receive real offers, and hire with
confidence.

Fully **bilingual (English / Arabic)** with right‑to‑left support, statically
generated per locale, and built for SEO and accessibility.

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, SSG, Turbopack) |
| UI runtime | React 19 |
| Styling | Tailwind CSS v4 (CSS‑first `@theme`, no `tailwind.config.js`) |
| Components | [Base UI](https://base-ui.com) + small local `ui/` primitives |
| Animation | [`motion`](https://motion.dev) (Framer Motion) v12 |
| Misc | `rough-notation` (heading highlighter), `lucide-react` (icons), `class-variance-authority`, `clsx`, `tailwind-merge` |
| Tooling | TypeScript, ESLint (flat config), Prettier (+ Tailwind plugin) |
| Package manager | **pnpm** |

> ⚠️ This is Next.js **16**, which has breaking changes vs. earlier versions
> (e.g. middleware is now `proxy.ts`, `params` are async). See `AGENTS.md` and
> the bundled docs in `node_modules/next/dist/docs/` before writing Next‑specific code.

---

## Getting started

```bash
# install dependencies
pnpm install

# start the dev server (http://localhost:3000)
pnpm dev
```

Visiting `/` redirects to a locale‑prefixed route (`/en` or `/ar`) based on the
`Accept-Language` header.

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run the development server |
| `pnpm build` | Production build (static export of all locales) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Lint with ESLint |
| `pnpm lint:fix` | Lint and auto‑fix |
| `pnpm format` | Format with Prettier |
| `pnpm format:check` | Check formatting without writing |

### Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://shakoshy.com` | Absolute base URL for canonical links, Open Graph, and structured data |

---

## Project structure

```
src/
├─ app/
│  ├─ [lang]/                 # Locale segment ("en" | "ar")
│  │  ├─ layout.tsx           # <html> shell, fonts, metadata, JSON‑LD, providers
│  │  ├─ page.tsx             # Landing page
│  │  └─ articles/[slug]/     # Localized, statically generated article pages
│  └─ globals.css             # Tailwind v4 theme tokens (@theme inline)
├─ proxy.ts                   # Locale detection + redirect (Next 16 "middleware")
├─ components/
│  ├─ landing/                # Hero, HowItWorks, WhyChoose, GetJobDone, OurServices,
│  │                          #   PopularTopics, DownloadApp, …
│  ├─ layout/                 # Navbar, Footer, ContactDialog
│  ├─ articles/               # ArticleCard and article building blocks
│  └─ ui/                     # Reusable primitives (Button, Reveal, Highlighter, …)
└─ lib/
   ├─ i18n/                   # Dictionaries + LanguageProvider
   ├─ articles/               # Article content, types, and data helpers
   ├─ store-links.ts          # App‑store CTA helpers
   └─ utils.ts                # cn() and shared helpers
```

The landing page is composed in `components/landing/landing-page.tsx`:

```
Hero → HowItWorks → WhyChooseShakoshy → GetJobDone → OurServices → PopularTopics → DownloadApp → Footer
```

---

## Internationalization (EN / AR)

- **Routing:** every page lives under `app/[lang]`. `proxy.ts` redirects any
  non‑prefixed path to the best locale from `Accept-Language` (Arabic only when
  explicitly requested, otherwise English).
- **Dictionaries:** all copy lives in `src/lib/i18n/dictionaries.ts`. `en` is the
  source of truth; `ar` must match its shape (enforced by the `Dictionary` type).
- **Access:** `useT()` returns the active dictionary; `useLanguage()` also exposes
  `locale`, `setLocale`, and `toggle` (locale switching is route‑based).
- **RTL:** the `<html dir>` flips for Arabic. Components use logical Tailwind
  utilities (`ms/me/ps/pe/start/end`) and `rtl:` variants where physical
  properties are unavoidable.
- **Fonts:** Poppins for Latin, **Cairo** for Arabic (swapped automatically under
  `[dir="rtl"]`).

To add or change copy, edit both `en` and `ar` in `dictionaries.ts`.

---

## Styling & design tokens

Tailwind v4 is configured **CSS‑first** in `src/app/globals.css` under
`@theme inline` — there is no `tailwind.config.js`. Conventions:

- **No arbitrary `[…]` values** for sizing/spacing in markup. Every non‑default
  value is a named, fluid token (`clamp()`), e.g. `text-h1`, `py-section`,
  `size-glow`, `blur-glow`.
- A custom `xs` breakpoint (425px) supplements the standard scale; major reflows
  happen at the standard `xl` breakpoint.
- The hero overlay uses **container queries** (`cqi` units) so badges and the CTA
  scale with the image, not the viewport.

---

## Animation

Built on `motion/react` and wrapped in a global
`<MotionConfig reducedMotion="user">`, so all motion respects the OS
"reduce motion" setting.

- **Hero:** continuously drifting ambient glows + a one‑time float‑settle
  entrance for the photo and floating badges; staggered headline/value‑point reveal.
- **HowItWorks:** each step reveals its image first, then its text, and the four
  cards cascade in from the leading edge (RTL‑aware).
- **OurServices:** staggered scroll‑reveal of category cards with a gentle springy
  hover lift.
- **`ui/Reveal`:** the shared scroll‑into‑view fade/slide primitive used across
  sections.

---

## SEO & accessibility

- Per‑locale `generateMetadata` with canonical + `hreflang` alternates, Open Graph,
  and Twitter cards.
- JSON‑LD structured data (`Organization`, `WebSite`, `Service`) injected in the
  locale layout.
- Per‑locale `sitemap` entries with `hreflang` alternates and a `robots` policy.
- Semantic markup, image `alt`s, keyboard‑navigable tabs/menus, and
  reduced‑motion support throughout.

---

## Content

Articles (the "Popular Topics" section and their detail pages) are defined in
`src/lib/articles/`. Each article carries both locales and is statically
generated at build time via `generateStaticParams`.

---

## Deployment

Optimized for static hosting / [Vercel](https://vercel.com). `pnpm build`
pre‑renders every locale (and every article) to static HTML. Remember to set
`NEXT_PUBLIC_SITE_URL` for the target environment so absolute URLs (canonical,
OG, structured data) resolve correctly.
