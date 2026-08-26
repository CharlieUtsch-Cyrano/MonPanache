# AGENTS.md — how to work in this repository

Same standing instructions as **[CLAUDE.md](./CLAUDE.md)**. Claude Code reads
`CLAUDE.md`; Cursor also reads this file. **Edit both in the same PR.**

## What this is

**Cyrano-Task-Manager** — an internal Cyrano tool for managing projects and
tasks, run framework-first. Every file should be a pattern worth copying.
The tree stays green.

Sibling repos you must not confuse with this one:

| Repo | Role |
| --- | --- |
| `Cyrano-Task-Manager` (this) | Internal task tool. Own repo, own database. |
| `CyranoApp-AI-Production` | Customer product. AWS. Production rules. |
| Cyrano AI Tools | Lab + internal pilot. Hostinger + Supabase. |
| CyranoAPP-Design | UI sandbox. Mocks. One-way port source for UI patterns. |

Port UI patterns one way (Design/Production → here). Do not import those
trees at runtime and never point this app at their databases.

## Before building ANYTHING

1. Read **FEATURE-PLAYBOOK.md** — including **depth** and the
   **construction gate** (§3).
2. Read **PROJECT-MEMORY.md** so you do not reopen locked decisions.
3. Check **ARCHITECTURE.md** building blocks and **GLOSSARY.md** before naming
   anything.

## Golden rules (review rejection)

- **Every user action is a command** in the registry, with a Zod schema in
  `packages/contracts`. UI and agents call `executeCommand`.
- **Shareable view state lives in the URL.** Prefs → persisted Zustand; shared
  runtime → Zustand; ephemeral → `useState`.
- **No new dependencies** without owner approval and a permissive license.
  Update THIRD-PARTY-NOTICES.md in the same PR.
- **Design tokens only, never hex.** Both themes must work.
- **WCAG 2.2 AA.** Targets ≥ 24px (44px touch), keyboard path, `aria-label`,
  live regions for async work.
- **All data access goes through `lib/data/`.** No scattered Supabase calls.
- **RLS on every table, from the first migration.** Anon key + RLS is the
  trust boundary; the service key never reaches the browser.
- **Deletes are soft or undoable.** No silent mutations.
- **No `any` on data access.** Zod at the boundary.
- **No god files.** A 2,000-line page is a reject.
- **One glossary.** It is a **Task**, not a todo/item/ticket/card.
- **Update docs in the same change** for new patterns, commands, deps.
- **No customer-confidential data or PHI in tasks.** See COMPLIANCE.md.
- **Propose, then wait.** Standard/Comprehensive work: bolt plan, then a
  human yes before Construction.
- **Match depth to the work.** No platform ceremony on a one-line fix.
- **A human correction is a standing rule** — same change: this file /
  playbook / PROJECT-MEMORY.

## Locked decisions you must not reopen in a feature PR

- Own repo, own database. Not a feature of Tools, Production, or Design.
- Framework modeled on CyranoApp-AI-Production; ceremony scaled to an
  internal tool.
- One data layer (`lib/data/`) with a documented seam to a BFF later.
- Product name is **Cyrano-Task-Manager**.

## Do not “fix”

- Empty `apps/*` / `packages/*` / `supabase/` skeletons during charter.
- The `supabase/` folder while the backend decision is **Open** in
  PROJECT-MEMORY — no backend SDK, no migrations, until it is locked.

## Verify before claiming done

```bash
npm run check
```

Zero warnings. Tests for new behavior in the same PR. Never weaken CI to
`--passWithNoTests`.
