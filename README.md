# Panache

**Know what needs you now. Automate what repeats.**

Panache gathers the work flying at you — from customer calls, email, and
your own head — sorts it into buckets, ranks what deserves attention when,
and learns your patterns until the routine runs itself. The name is
Cyrano's: *"mon panache"* — grace under pressure, kept to the end.

This repo (`Cyrano-Task-Manager`) is Panache's home — an internal Cyrano
tool built framework-first, modeled on the CyranoApp-AI-Production
operating system. The playbooks land before the product so we can code
fast *without* growing another monolith.

This is an **internal tool**, not customer production. The ceremony is
lighter than CyranoApp-AI-Production, but the discipline is the same:
one glossary, one command registry, URL-first state, a green tree.

## Start here — reading order

New to the project? Read these in order. The first four are the essential path.

| # | Doc | When to read it |
| --- | --- | --- |
| 1 | **README.md** (this file) | Orientation: what it is, what it is not, stack, layout. |
| 2 | **[CONTRIBUTING.md](./CONTRIBUTING.md)** | Before your first commit. Scripts, quality gates, PRs. |
| 3 | **[CODING-GUIDELINES.md](./CODING-GUIDELINES.md)** | Before writing code. Layering, naming, dependency approval. |
| 4 | **[FEATURE-PLAYBOOK.md](./FEATURE-PLAYBOOK.md)** | **When building anything.** Decision tree, recipes, Definition of Done. |
| 5 | **[DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md)** | UI: tokens, breakpoints, calm-by-default, accessibility. |
| 6 | **[ARCHITECTURE.md](./ARCHITECTURE.md)** | App / data layer / contracts. Building blocks. Seams. |
| 7 | **[LANES.md](./LANES.md)** | Where this repo sits among the Cyrano repos. |
| 8 | **[GLOSSARY.md](./GLOSSARY.md)** | One noun per concept. A second name is a review reject. |
| 9 | **[SECURITY.md](./SECURITY.md)** | Auth, row-level security, secrets. |
| 10 | **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** | WCAG 2.2 AA. |
| 11 | **[COMPLIANCE.md](./COMPLIANCE.md)** | What must never be pasted into a task. |
| 12 | **[AGENTS.md](./AGENTS.md)** / **[CLAUDE.md](./CLAUDE.md)** | Standing rules for humans and AI sessions. |
| 13 | **[PROJECT-MEMORY.md](./PROJECT-MEMORY.md)** | Decision log. Read this when resuming work. |
| 14 | **[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)** | License inventory. Update in the same PR as any dependency. |

## What this is not

- Not a feature of CyranoApp-AI-Production, Cyrano AI Tools, or
  CyranoAPP-Design. It is its own product with its own repo.
- Not a place to manage customer/hospital work artifacts that contain
  confidential data (see COMPLIANCE.md).
- Not a place to skip the playbook. Speed comes from the guardrails, not
  from skipping them.

## Stack

| Layer | Choice | Status |
| --- | --- | --- |
| Web | React 19, TypeScript strict, Vite, Tailwind v4, TanStack Router, Zustand, Radix, Zod | **Locked** (PROJECT-MEMORY #7) |
| Data | **TBD** — decision required before the first migration (PROJECT-MEMORY, Open) | Open |
| Quality | Biome, Vitest, `npm run check` always green | **Locked** |

Why this stack: it is the same CTO frontend stack as CyranoApp-AI-Production
and CyranoAPP-Design, so patterns, components, and muscle memory port
directly. Whatever backend is chosen, it is called only through the
`lib/data/` seam with row-level security (or equivalent) as the boundary.

## Layout

| Path | Purpose |
| --- | --- |
| `apps/web` | The task manager SPA |
| `packages/contracts` | Shared Zod schemas (commands, rows, views) |
| `supabase/` | Migrations + RLS policies (one owner for schema) |
| `docs` live at repo root (house convention) | |

## The product in one sentence

Tasks originate where work happens — Zoom customer calls, Gmail, your head —
and this tool gathers them onto one board, attaches context and the
customer, sorts them into buckets, and ranks what deserves attention now
vs today vs this week. Automation of recurring task types comes much later.
Full vision: PROJECT-MEMORY.md.

## First product slice

The manual spine: capture a task in two keystrokes (⌘K), organize into
projects/buckets with statuses and urgency, filter via a URL-shareable view,
mark work done. Extracted tasks need somewhere to land — this is that
somewhere. Gmail ingestion is the second slice, Zoom the third, backfill
after that.

## Verify

```bash
npm run check
```

Must be fully green. Same gate as CI.
