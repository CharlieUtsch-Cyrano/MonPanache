# Architecture

Cyrano-Task-Manager is a **single-page app over one data layer**: one Git
repo, one deployable SPA, one command/contract language, one database.

> **Backend note (2026-08-26):** the concrete backend is an **Open** decision
> in PROJECT-MEMORY — Supabase below describes the proposed shape. The
> `lib/data/` seam and row-security boundary hold regardless of the choice.

## Shape

```
Browser → apps/web (static SPA)
apps/web pages → components → lib
apps/web lib/data/ → Supabase (Postgres + Auth + RLS)   ← the ONLY client callsite
packages/contracts → Zod schemas shared by commands, data layer, and tests
supabase/migrations → schema + RLS policies (one owner)
```

Nouns: [GLOSSARY.md](./GLOSSARY.md). Repos: [LANES.md](./LANES.md).

## Trust boundary

**RLS is the server.** The browser holds only the anon key; every table has
row-level security; policies — not client filters — decide what a session can
read or write. The service key exists only in local tooling and CI secrets,
never in the bundle.

`lib/data/` is the only module that imports the Supabase client. Everything
above it sees typed functions returning contract-parsed values.

## Data (authoritative vs derived)

**Authoritative:** projects, tasks (incl. subtasks via `parent_id`), labels,
task_labels, activity_events, user preferences that must roam.

**Derived (rebuildable):** counts, "Today"/"Overdue" views (computed from
`due_at` + status), sort orders, search indexes.

Slice 1 tables (names locked when the migration lands): `projects`, `tasks`,
`labels`, `task_labels`, `activity_events`.

Conventions every table follows: `id uuid`, `user_id` (+ index),
`created_at`, `updated_at`, `deleted_at` (soft delete), RLS enabled in the
same migration.

## Seams (swap without rewriting React)

| Seam | Today | Later |
| --- | --- | --- |
| `lib/data/` | Supabase client direct | BFF/API if the tool ever grows a server |
| Task search/filter | pure `lib` functions over loaded rows | SQL/full-text when volume demands |
| `activity_events` | insert from data layer | database triggers if writes multiply |
| Auth | Supabase Auth session | same interface, different IdP |
| Notifications / reminders | none (v1) | scheduled function; **not** a browser tab that must stay open |

## Building blocks to port (do not rewrite)

From CyranoAPP-Design / CyranoApp-AI-Production, one way:

- Shell: left rail, ⌘K command palette, activity feed, theme + viewport gate.
- List patterns: row actions menu, selection bar, aligned card/row zones.
- Primitives: `components/ui/*` Radix wrappers, `cn()`, design tokens.

When you port a file, strip its mock-server wiring and point it at
`packages/contracts` + `lib/data/`. Record each ported block in the table
below as it lands.

## Building-blocks table

| Block | File | Notes |
| --- | --- | --- |
| _(fill as the web seed lands — porting a block adds a row in the same PR)_ | | |

## Infra rules

- The SPA deploys as static files; no server we operate in v1.
- Schema changes only via `supabase/migrations` — no dashboard-only edits.
- CI runs the same `npm run check` gate as local; a red check blocks merge.
