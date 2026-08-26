# Coding Guidelines

These are the rules for writing code in this repository. Every file that
exists should be a pattern worth copying, and the tree must stay green.

Modeled on CyranoApp-AI-Production §§0–12, adapted for a single-SPA internal
tool. Paths like `lib/commands.ts` and `pages/` mean `apps/web/src/...` after
the web seed.

Read alongside [CONTRIBUTING.md](./CONTRIBUTING.md),
[ARCHITECTURE.md](./ARCHITECTURE.md), and
[DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md).

---

## 0. Adding dependencies & frameworks — approval required

**This rule is non-negotiable.**

1. **Every new dependency, component library, or framework must be approved
   by the owner before it is added.** Runtime deps, dev deps, UI libraries,
   build tooling, anything from a CDN. "It's small" or "it's popular" is not
   an exception. Open a short proposal (what, why, what it replaces, size,
   license) and get sign-off first.

2. **The license must be permissive and free for commercial use.** Allowed:
   **MIT**, **ISC**, **Apache-2.0**, **BSD-2/3-Clause**, **OFL** (fonts).
   Rejected, no exceptions: **GPL, LGPL, AGPL, MPL, SSPL, BSL, Elastic**,
   anything non-commercial, "personal use only", or unlicensed.

3. **Prefer what's already in the stack.** Check ARCHITECTURE.md's
   building-blocks table and `package.json` first.

4. **When a dependency is approved and added**, record it in
   [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) in the same PR.

---

## 1. Language & type safety

- **TypeScript is strict.** `noUnusedLocals`, `noUnusedParameters`, `strict`
  on. Do not weaken `tsconfig`.
- **No `any`.** Precise types, `unknown` + narrowing, or a generic. A genuine
  escape hatch gets a comment on that line.
- **No non-null `!` assertions** unless the invariant is obvious and commented.
- **Validate external data with Zod at the boundary** (`packages/contracts`
  for rows/commands; `validateSearch` for URLs). Trust it internally.
- `npm run typecheck` must be clean before every commit. Until `tsc` is
  installed the script is a stub — that is not permission to skip types once
  the graph exists.

## 2. Project structure & layering

```
apps/web/pages  →  apps/web/components  →  apps/web/lib
apps/web        →  packages/contracts
apps/web/lib/data  →  Supabase client   (the ONLY import site)
supabase/       →  nothing in apps/
```

- **`pages/` compose `components/` + `lib/`.** Components are prop-driven and
  never import from `pages/`. `lib/` is pure and imports from neither.
- **Feature folders:** presentational pieces live in
  `components/<feature>/` (e.g. `components/tasks/`).
- **Imports use the `@/` alias**, never deep relative paths.
- **Only `lib/data/` touches Supabase.** A component or command importing the
  client directly is a review reject.

## 3. Files, exports & naming

- **Files are `kebab-case`** (`task-filters.ts`, `use-task-list.ts`).
- **One primary export per file, named to match the file. No default exports.**
- **Names are human-readable.** `searchableText` not `hay`;
  `taskMatchesFilter(task, filter)` not `match(t, f)`.
- **Booleans read as questions/states:** `isOverdue`, `saving`, `hasSubtasks`.
- **Constants `UPPER_SNAKE_CASE`**; values `camelCase`; types/components
  `PascalCase`. Nouns come from GLOSSARY.md — a `Task` is never a `Todo`.

## 4. Reuse first — no redundant code

- Before writing a hook, util, or UI atom, check ARCHITECTURE.md's
  building-blocks table; port from Design/Production rather than rewriting.
- If the same markup or logic appears in two places, extract it.
- Layer components: atoms → composed. Compose; don't copy.
- Parameterize variants instead of forking a component.

## 5. React & components

- **Function components only**, typed props via inline `type` or named type.
- **Defaults for all optional props**; accept optional `className` merged
  with `cn()`.
- **Keep pages lean.** A page wires state and composes components.

### 5a. Component decomposition — when to extract, when to inline

Split by **responsibility**, not visual region. Extract only if at least one
is true:

1. **Reuse** — rendered from two or more places (mandatory at the second use).
2. **Independent logic/state** — owns non-trivial state, a hook, keyboard
   handling, or async behavior that deserves isolated tests.
3. **Seam** — sits on a documented swap-point or command boundary.
4. **Readability** — the parent outgrew ~300–500 lines and a cohesive chunk
   can be lifted whole.

Everything else stays inline. No single-use, logic-free `PageHeader`-style
fragments. A review rejects a 2,000-line page.

- **Hooks:** honest `useEffect` dependency arrays; rare, one-line, justified
  `// biome-ignore lint/<rule>: <reason>` suppressions only.
- **Accessibility is not optional — WCAG 2.2 AA** (ACCESSIBILITY.md).

## 6. Styling

- **Design tokens only** (`bg-surface`, `text-muted`, `primary`, status
  tokens…). **Never hex.** Merge classes with `cn()`.
- **Tailwind utilities only** — no per-component CSS files.
- **Responsive by default.** Test at 1440 / 1280 / 768 / 390 / 320.

## 7. Cross-browser & platform

- Works in all modern browsers (Chrome, Safari incl. macOS, Firefox, Edge)
  and on iPad. No Chrome-only APIs.
- Pin external/CDN dependencies to a version + SRI hash. No `@latest`.

## 8. AI-native / agent-friendly

- **Every action is a command** (stable id, Zod `paramsSchema`, `run`) in the
  registry **and** `packages/contracts`, executed via `executeCommand`.
- **Shareable view state lives in the URL** (FEATURE-PLAYBOOK §4).
- **Mutations are visible, undoable runs** in the activity store. Never
  silent.
- **Pure logic in `lib/` with a clear seam** — filtering, date math, ranking
  are plain functions an agent (or test) can call.
- **Sessions follow FEATURE-PLAYBOOK §3** — propose, gate, bolt; depth
  matches the work.
- Document agent-driven patterns in ARCHITECTURE.md when introduced.

## 9. Comments & documentation

- Comment the **why**, not the what.
- Every non-trivial exported function gets a short doc comment.
- **Update docs in the same PR**: ARCHITECTURE.md, FEATURE-PLAYBOOK.md if
  recipes change, GLOSSARY.md for nouns, PROJECT-MEMORY.md for decisions,
  THIRD-PARTY-NOTICES.md for deps.

## 10. Quality gates (must be green)

Run `npm run check` before pushing.

- **Everything ships with tests.**
  - Pure logic — colocated `*.test.ts`. Mandatory.
  - Commands — params validated, effects asserted.
  - Data functions — unit tests with the client mocked, plus RLS policy
    tests (another user's rows are invisible).
  - Components — type/lint/build plus the a11y checklist; interaction tests
    when they carry real logic.
- **No new warnings, ever.** No dead code except intentional `ui/*` surface.

## 11. Pull requests

- Small and single-purpose. `npm run check` locally first. Describe **why**.
- Any PR adding a dependency tags the owner and updates
  THIRD-PARTY-NOTICES.md (§0).

### Quick checklist before you open a PR

- [ ] `npm run check` is green
- [ ] New/changed behavior has tests in this same PR
- [ ] No new dependency — **or** approved and recorded
- [ ] Actions are registry commands, not bespoke handlers
- [ ] Shareable view state is in the URL
- [ ] No duplicated logic/markup; readable names; no `any`
- [ ] Design tokens + `cn()`; 1440 / 1280 / 768 / 390
- [ ] WCAG 2.2 AA
- [ ] RLS policies + tests if it touches data
- [ ] Docs updated where relevant
- [ ] Depth matched the work; Standard/Comprehensive had an accepted bolt plan

## 12. Data access & secrets

- Authorization is **RLS**; client-side filters are optimizations, not the
  boundary.
- Every user-owned table carries `user_id`; every write inserts an
  `activity_events` row.
- The browser bundle contains only the anon key. Service keys live in local
  tooling / CI secrets — never `VITE_*`.
- Deletes are soft (`deleted_at`); purges are separate, explicit, gated.
- Logs and activity events contain ids and titles the user typed — never
  tokens, never secrets.
