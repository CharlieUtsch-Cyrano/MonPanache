# Project Memory — Cyrano-Task-Manager

Compact state + decision log. Anyone (teammate or a new AI session) should
read this and continue without reopening settled calls. Update when a decision
lands. Last updated: **2026-08-26**.

## Where things stand

- **Charter OS is in.** Framework docs modeled on CyranoApp-AI-Production
  (2026-08-26): README reading order, CLAUDE/AGENTS twins, FEATURE-PLAYBOOK,
  guidelines, glossary, decision log. **No product code exists yet.**
- Skeleton folders (`apps/web`, `packages/contracts`, `supabase/`) hold
  READMEs only so layering is real before features land.

## Locked decisions

1. **Own repo, own database** — not a feature of Cyrano AI Tools,
   CyranoApp-AI-Production, or CyranoAPP-Design. *Why:* the Tools postmortem
   showed what happens when unrelated products share a repo, a `lib/`, and a
   database.
2. **Framework modeled on CyranoApp-AI-Production, ceremony scaled down.**
   We keep: command registry + contracts, URL-first state, glossary
   discipline, depth + construction gate, decision log, docs-in-same-PR.
   We drop: multi-tenant hospital ceremony, AWS org/Terraform, worker/SQS —
   until the product needs them. *Why:* an internal tool needs guardrails,
   not a customer SLO.
3. **One data layer.** All reads/writes go through `apps/web` `lib/data/`,
   typed by `packages/contracts`. *Why:* it is the seam that lets us swap
   Supabase-direct for a BFF later without touching React.
4. **RLS from day one.** Every table gets row-level security in the same
   migration that creates it. *Why:* retrofitting RLS is how cross-user leaks
   happen; the Tools repo proved unenforced rules do not count.
5. **Product name: Cyrano-Task-Manager** (npm package `cyrano-task-manager`).
   One name in docs, code, and conversation.
6. **Agent sessions: propose → gate → bolt; depth matches the work.**
   Corrections become standing rules. Same model as the production repo; do
   not install a second agent OS.

## Proposed (confirm before first code — then move up to Locked)

- **Stack:** React 19, TypeScript strict, Vite, Tailwind v4, TanStack Router,
  Zustand, Radix, Zod; Biome + Vitest. (The CTO stack — patterns port from
  Design/Production.)
- **Backend:** Supabase — a **new, dedicated** project (never Lab's) —
  Postgres + Auth + RLS, called only from `lib/data/`.
- **Task statuses:** `inbox`, `todo`, `in_progress`, `blocked`, `done`,
  `cancelled`. UI may render friendlier labels; the contract uses these.
- **Priorities:** `p0`–`p3`, default `p2`.
- **Users:** single user (Charlie) first; schema keeps `user_id` on every
  table so a team mode is a policy change, not a migration.

## Open (named later, not architecture)

- Hosting for the SPA (static host TBD; not the Hostinger app VPS).
- Auth provider inside Supabase (Google first, matching the rest of Cyrano?).
- Recurring tasks / reminders — v2 candidates, not slice 1.
- Integrations (GitHub issues, calendar) — explicitly out of slice 1.

## Next

1. Confirm the **Proposed** block above (human yes → move rows to Locked).
2. Wire the real quality graph: Biome, `tsc`, Vitest, husky, so
   `npm run check` is type + lint + test, not a stub.
3. Seed `apps/web` shell (rail + ⌘K palette + theme) by porting patterns from
   CyranoAPP-Design — shell only, no features.
4. First schema migration (`projects`, `tasks`, `labels`, `task_labels`,
   `activity_events`) with RLS + policy tests.
5. Slice 1: capture (⌘K quick-add) → organize (project/status/label) →
   filtered URL views → done.

Do **not** start slice 1 features until the web seed exists and the RLS
policy tests can fail a PR.
