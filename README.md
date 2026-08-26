# Cyrano-Task-Manager

An internal Cyrano tool for managing **projects and tasks** — built
framework-first, modeled on the CyranoApp-AI-Production operating system.
The playbooks land before the product so we can code fast *without* growing
another monolith.

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

Framework conventions are **locked** (commands, URL state, tokens, Zod at the
boundary). Concrete stack choices below are **proposed** until confirmed in
PROJECT-MEMORY.md — do not install anything before that confirmation.

| Layer | Choice |
| --- | --- |
| Web | React 19, TypeScript strict, Vite, Tailwind v4, TanStack Router, Zustand, Radix, Zod |
| Data | Supabase (Postgres + Auth + RLS) — dedicated project, **never** the Lab database |
| Quality | Biome, Vitest, `npm run check` always green |

Why this stack: it is the same CTO frontend stack as CyranoApp-AI-Production
and CyranoAPP-Design, so patterns, components, and muscle memory port
directly. Supabase (its own project) is the fastest credible backend for an
internal tool and keeps a documented seam to graduate behind a BFF later.

## Layout

| Path | Purpose |
| --- | --- |
| `apps/web` | The task manager SPA |
| `packages/contracts` | Shared Zod schemas (commands, rows, views) |
| `supabase/` | Migrations + RLS policies (one owner for schema) |
| `docs` live at repo root (house convention) | |

## First product slice

Capture → organize → finish: create a task in two keystrokes (⌘K),
organize into projects with statuses and labels, filter via a URL-shareable
view, and mark work done. That slice proves the shell, commands, data layer,
and RLS. Recurring tasks, reminders, and integrations come after.
See PROJECT-MEMORY.md.

## Verify

```bash
npm run check
```

Must be fully green. Same gate as CI.
