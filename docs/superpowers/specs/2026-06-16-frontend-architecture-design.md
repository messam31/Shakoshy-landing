# Shakoshy Website — Frontend Architecture Design

**Date:** 2026-06-16
**Status:** Approved design (pre-implementation)
**Scope:** Tooling, architecture, and agent pipeline for the Shakoshy customer + worker web app, built on the existing Next.js marketing site and modeled on the atlas frontend + the Shakoshy NestJS API.

---

## 1. Goal

Turn the existing Next.js marketing site into a full customer + worker web app (login/register, gated areas, jobs, offers, worker profiles) that consumes the Shakoshy NestJS API. Adopt the atlas frontend architecture wherever it applies, adapting only where Shakoshy differs (stateless JWT instead of better-auth sessions; separate API repo instead of a shared contracts package).

## 2. Tech Stack

| Concern | Tool | Purpose |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server Components for gating + SSR, Client Components for interaction |
| UI | React 19, Tailwind v4, base-ui, shadcn, lucide, motion | Existing component system (already set up) |
| Data fetching | TanStack Query | Client-side caching, mutations, invalidation |
| Validation (outgoing) | Zod (already installed) | Request/form schemas; source of truth for outgoing types |
| Types (incoming) | Hand-written TypeScript types | Response shapes mirroring NestJS DTOs (trusted, not runtime-checked) |
| Forms | React Hook Form + `@hookform/resolvers` (zodResolver) | OTP, worker register/login, job posting |
| Auth transport | Custom fetch client (server + browser fetchers) | httpOnly cookie + `credentials: 'include'`, pointed at NestJS |
| Session / gating | Custom `getSession()` + route-group layouts + `SessionProvider` | Server-side gate by `accountType`; pass session to client for UI |
| URL state | nuqs (when needed) | Filters / search params (job categories, browse filters) |
| Client state | Zustand (only if needed) | UI state not covered by Query/server |
| i18n | next-intl (en/ar, RTL) | Bilingual, like the admin dashboard |
| Toasts | sonner | Mutation feedback |

## 3. Auth & Request Model (key concepts)

- **Stateless JWT.** The Shakoshy API is JWT-stateless. The `shakoshy_access_token` httpOnly cookie **is** the proof; the API verifies the signature (no DB session lookup). Only refresh tokens are stored server-side (per-device, for rotation/revocation). This contrasts with atlas/better-auth, which does a DB session lookup per request.
- **The cookie lives in the browser** (same as any cookie, same as atlas) and is auto-attached by the browser to every request — including the page-navigation request. JS cannot read it (httpOnly).
- **Two hops, same as atlas.** (1) browser → Next.js server, cookie rides along automatically; (2) Next.js server → NestJS API, forwarding the cookie. The frontend architecture is identical to atlas; only the backend step differs (signature verify vs DB lookup).
- **Server gating.** Route-group layouts are Server Components. They run on the server, read the cookie via `cookies()`, call a "who am I" endpoint, and redirect-or-render before any HTML reaches the browser. The browser never receives HTML for a route it isn't allowed to see.
- **Backend is the real guard.** Frontend gating is for UX; the NestJS API independently enforces `@RequireUserType(...)` (403 `CUSTOMER_ONLY` / `WORKER_ONLY`). Defense in depth.

> **Open item:** `getSession()` calls a "who am I" endpoint to resolve the user + `accountType`. Confirm whether the API exposes a unified `/auth/me`, or whether we call the type-specific `/customer/profile` / `/worker/profile`. If no unified endpoint exists, prefer adding a small `/auth/me` to the API (reads the verified JWT payload, returns `{ user, accountType }`).

## 4. Folder Structure

```
src/
├── app/                          # routing + server gating only
│   ├── layout.tsx                # getSession() once -> <Providers session>
│   ├── (public)/                 # anyone (marketing, worker profiles) — EXISTS
│   ├── (auth)/                   # login/register; redirect away if logged in
│   │   ├── layout.tsx            # if session -> redirect home
│   │   ├── customer/login/       # passwordless OTP flow
│   │   └── worker/(login|register)/
│   ├── (customer)/               # gated: logged in + accountType === "customer"
│   │   ├── layout.tsx            # server gate
│   │   ├── jobs/
│   │   └── offers/
│   └── (worker)/                 # gated: logged in + accountType === "worker"
│       ├── layout.tsx            # server gate
│       ├── dashboard/
│       └── profile/
│
├── api/client/                   # SHARED transport (copied from atlas)
│   ├── factory.ts                # createApiClient(env, baseUrl) -> typed Fetcher
│   ├── fetcher-browser.ts        # apiClient (NEXT_PUBLIC_API_URL, credentials:'include')
│   ├── fetcher-server.ts         # serverApiClient (reads cookies(), forwards them)
│   └── types.ts                  # Fetcher iface, ApiError, handleResponse
│
├── features/                     # each domain self-contained
│   ├── auth/
│   ├── jobs/
│   ├── offers/
│   └── worker-profile/
│
├── lib/
│   ├── auth/
│   │   ├── session.ts            # getSession(), requireSession()
│   │   ├── session-context.tsx   # SessionProvider + useSession()
│   │   └── types.ts              # SessionData, AccountType
│   ├── query/provider.tsx        # QueryClientProvider
│   └── utils.ts                  # EXISTS
│
└── components/
    ├── ui/ layout/ landing/      # EXISTS
    ├── customer/                 # customer feature UI
    └── worker/                   # worker feature UI
```

**Route groups = four access zones.** Customer and worker are two distinct account types (different login flows), so they get **sibling** gated groups, each with a layout that checks "logged in AND correct accountType" in two lines. No shared `(protected)` parent for now (YAGNI; add later only if shared protected pages appear).

## 5. Feature-Folder Pattern (copied from atlas)

Each domain is self-contained under `features/<x>/`. The `api/` subfolder uses atlas's **7-file split**:

```
features/jobs/
├── schemas/job.ts          # zod: OUTGOING requests + z.infer types (source of truth)
├── types.ts                # TS: INCOMING responses + error codes (mirrors NestJS, trusted)
├── api/
│   ├── api.ts              # createJobsApi(fetcher) — endpoints, fetcher-agnostic
│   ├── keys.ts             # jobKeys factory (hierarchical, `as const`)
│   ├── options.ts          # jobsClient (browser) + jobOptions (queryOptions)
│   ├── queries.ts          # 'use client' read hooks: useJobs(), useJob()
│   ├── mutations.ts        # 'use client' write hooks: useCreateJob() + invalidation
│   ├── server.ts           # jobsServer + prefetch* (SSR, server fetcher)
│   └── index.ts            # client barrel (server.ts imported directly, not re-exported)
├── components/             # post-job-form, job-card, job-list…
├── hooks/                  # feature logic hooks (optional)
└── index.ts
```

**Two-fetcher pattern.** `createJobsApi(fetcher)` is defined once, fetcher-agnostic. It is instantiated twice: `jobsClient = createJobsApi(apiClient)` (browser, in `options.ts`) and `jobsServer = createJobsApi(serverApiClient)` (server, in `server.ts`). Same endpoints, server + client, defined once. The generic `fetcher.get<T>()` carries the type.

### Contract direction policy (decided)

- **OUTGOING (requests):** zod schemas in `schemas/<x>.ts`, validated at runtime via `zodResolver` (forms) and used as request-body types via `z.infer`. **Checked.**
- **INCOMING (responses):** hand-written TS types in `types.ts` mirroring the NestJS DTOs and error enums. Used as the generic on `fetcher.get<T>()` — a compile-time **cast/label, not a runtime check**. We trust our own API (matches atlas, which trusts shared contracts). No `.parse()` on responses.

This matches atlas exactly except that atlas's incoming types come from a shared `@rasmtech/contracts` package; ours are hand-written locally because the API is a separate repo.

### Example (jobs, mirroring real NestJS `POST /jobs/requests`)

`schemas/job.ts` (outgoing):
```ts
import { z } from "zod";

export const servicePeriod = z.enum(["urgent", "within_two_days", "within_a_week", "flexible"]);

export const addressSchema = z.object({
  street: z.string().min(1), city: z.string().min(1), state: z.string().min(1),
  postalCode: z.string().min(1), country: z.string().min(1),
  apartment: z.string().optional(), longitude: z.number().optional(), latitude: z.number().optional(),
});

export const createJobRequestSchema = z.object({
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Must be E.164"),
  jobTypeId: z.string(), categoryId: z.string(),
  options: z.record(z.string(), z.string()),   // stepId -> optionId
  details: z.string().optional(), servicePeriod, address: addressSchema,
});
export type CreateJobRequestInput = z.infer<typeof createJobRequestSchema>;
```

`types.ts` (incoming):
```ts
export type JobRequestStatus = "pending" | "offer_sent" | "accepted" | "started" | "completed";
export type JobRequest = { id: string; jobTypeId: string; categoryId: string; status: JobRequestStatus; servicePeriod: string; createdAt: string };
export type JobRequestResponse = { success: boolean; message: string; data: JobRequest };
export type JobRequestListResponse = { data: JobRequest[]; total: number };
export type JobsErrorCode =
  | "JOB_REQUEST_NOT_FOUND" | "JOB_REQUEST_BELONGS_TO_OTHER_CUSTOMER"
  | "JOB_REQUEST_CANNOT_BE_DELETED" | "CUSTOMER_ONLY" | "WORKER_ONLY";
```

### Request flow (post a job, end to end)
```
PostJobForm (client)
  -> useForm({ resolver: zodResolver(createJobRequestSchema) })   # validated outgoing
  -> onSubmit -> useCreateJob().mutate(data)
       -> jobsClient.create(data)            # browser fetcher, cookie auto-attached
            -> POST /jobs/requests to NestJS
            -> response cast to JobRequestResponse  # typed, not checked
       -> onSuccess -> invalidate jobKeys.lists()   # list refetches
```

## 6. Session / Gating Implementation

```ts
// lib/auth/session.ts — server
export async function getSession(): Promise<SessionData | null> {
  const cookie = (await cookies()).toString();
  if (!cookie) return null;
  const res = await fetch(`${API_INTERNAL_URL}/auth/me`, { headers: { cookie } });
  if (!res.ok) return null;
  return res.json() as Promise<SessionData>;   // { user, accountType }
}
```
```ts
// app/(worker)/layout.tsx — server gate
const session = await getSession();
if (!session) redirect("/login");
if (session.accountType !== "worker") redirect("/");
return <>{children}</>;
```
```ts
// root layout passes session down; client reads via context
const { accountType } = useSession();
return accountType === "worker" ? <WorkerNav /> : <CustomerNav />;
```

## 7. Agent Pipeline (.claude/agents/)

Modeled on the backend's sequential feature pipeline. **All agents use opus 4.8 (`model: opus`).** No model tiering.

| # | Agent | Responsibility |
|---|---|---|
| 1 | **feature-scaffold** | Create `features/<x>/`: the 7-file `api/` layer (`api.ts` factory, `keys`, `options`, `queries`, `mutations`, `server`, `index`) + empty `schemas/` + `types.ts`. Reference an existing feature as the pattern. |
| 2 | **contract-schemas** *(critical)* | Owns the typed API boundary. Reads the matching NestJS feature's `CLAUDE.md` + DTOs, then writes: `schemas/<x>.ts` (zod outgoing + `z.infer` types) and `types.ts` (incoming response types + error-code unions mirroring NestJS). Wires `zodResolver` usage. This is the frontend equivalent of the backend's error-handling agent. |
| 3 | **ui-components** | Build the feature's `components/` (forms via React Hook Form, lists, cards) wired to the query/mutation hooks, using existing `ui/` + base-ui + Tailwind tokens. |
| 4 | **unit-tests** | Component + hook tests (Testing Library + the project's test runner). Mock the fetcher / query client; no real network. |
| 5 | **code-review** | Review changed files vs root CLAUDE.md + this architecture (feature-folder shape, `'use client'` boundaries, correct server vs browser fetcher, query-key hygiene, contract-direction policy, **code-comment conventions §7.1**). Fix violations directly. |
| 6 | **qa-validation** | Run `lint`, `typecheck`, `test`, `build`; fix until all pass. |
| 7 | **documentation** | Write/update `features/<x>/CLAUDE.md` (<5 KB): endpoints consumed, schemas, hooks exported, query keys, route group / gating. **Standing instruction:** create this file whenever a feature is built or materially changed — even though no feature CLAUDE.md exists yet. |

**Comment ownership:** The **building agents** (`feature-scaffold`, `contract-schemas`, `ui-components`, `quick-feature`) **write** the in-file comments (file-header + JSDoc, backend-style per §7.1) as they create the code — every file gets its comment. `code-review` only **verifies** they are present and correct. `documentation` owns the separate per-feature `CLAUDE.md`.

**Extras:**
- **quick-feature** (opus) — all-in-one shortcut for small changes (add one query/mutation/component) without running the full pipeline.
- **resolve-audit** (skill) — port the backend's `pnpm audit` resolution skill nearly as-is.

**Dropped:** `e2e-tests` (Playwright) — not needed initially.

### Per-feature CLAUDE.md
Each `features/<x>/` gets its own `CLAUDE.md`, mirroring the backend's per-module docs, written by the `documentation` agent. Documents the frontend-facing contract: API endpoints consumed, zod schemas, exported hooks, query keys, and gating. Not authored upfront — created by the agent as features are built.

### 7.1 Code-Comment Conventions (backend "JSDoc way")

Every file gets its comments written in as it is built — not optional, not deferred.

- **File-header comment** at the top of every file stating its purpose (e.g. `/** React Query hooks for jobs. */`).
- **JSDoc block above every exported function/method/hook:** a one-line description, plus `@param`, `@returns`, and `@throws` where applicable.
  ```ts
  /**
   * Posts a new job request for the current customer.
   * @param input - Validated create-job payload
   * @returns The created job request envelope
   */
  ```
- **Inline `//` comments for non-obvious steps** inside function bodies (the *why*).
- **No commented-out code; no redundant comments** restating self-evident lines.
- Applies to all hand-written feature code: `api.ts` methods, `queries.ts`/`mutations.ts` hooks, `getSession()` and gating helpers, and non-trivial components.

**Who writes vs who checks:** the building agents (`feature-scaffold`, `contract-schemas`, `ui-components`, `quick-feature`) write these comments as they create each file. The `code-review` agent verifies them (file-header present; JSDoc on exported functions; non-obvious logic commented; no commented-out code). The `documentation` agent owns the separate per-feature `CLAUDE.md`.

## 8. Divergences from atlas (summary)

1. **Auth:** stateless JWT + custom NestJS fetch client, instead of better-auth + DB sessions. Architecture identical; backend resolution differs.
2. **Incoming types:** hand-written locally in each feature's `types.ts`, instead of a shared `@rasmtech/contracts` package (API is a separate repo).

Everything else — feature folders, 7-file api split, two-fetcher pattern, TanStack Query usage, zod-on-outgoing, server-gated route groups, `SessionProvider` — follows atlas directly.

## 9. Open Items / Follow-ups

- Confirm the "who am I" endpoint (`/auth/me` vs type-specific profile endpoints); add `/auth/me` to the API if absent.
- Decide whether `worker-profile` has a public (marketing) view in `(public)/` in addition to the gated worker-owned view.
- i18n (next-intl) and RTL wiring is in scope but sequenced after the core auth + one feature vertical.
