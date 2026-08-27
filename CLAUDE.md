# CLAUDE.md — how to work in this repository

Instructions for Claude, Cursor, and any AI assistant or new developer.
**Keep this file byte-identical in spirit with [AGENTS.md](./AGENTS.md).** If you
change a standing rule, update **both** in the same PR. This copy exists
because Claude Code loads `CLAUDE.md` first; a pointer-only file is how
sessions miss the rules.

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

1. Read **FEATURE-PLAYBOOK.md**. Follow it literally — including **depth** and
   the **construction gate** (§3).
2. Read **PROJECT-MEMORY.md** so you do not reopen locked decisions.
3. Check **ARCHITECTURE.md** building blocks and **GLOSSARY.md** before naming
   anything.

## Golden rules (review rejection)

- **Every user action is a command** in the web command registry, with a Zod
  schema in `packages/contracts`. UI and agents call `executeCommand`. No
  bespoke `onClick` for command-shaped work.
- **Shareable view state lives in the URL.** Prefs → persisted Zustand; shared
  runtime → Zustand; ephemeral → `useState`. A filtered task view you cannot
  paste into Slack is in the wrong place.
- **No new dependencies** without owner approval and a permissive license
  (MIT / ISC / Apache-2.0 / BSD / OFL). Update THIRD-PARTY-NOTICES.md in the
  same PR.
- **Design tokens only, never hex.** Both themes must work.
- **WCAG 2.2 AA.** Targets ≥ 24px (44px touch), keyboard path, `aria-label` on
  icon buttons, live regions for async work, both themes.
- **All data access goes through `lib/data/`** (the one data layer). No
  Supabase client calls scattered through components or pages.
- **RLS on every table, from the first migration.** Never ship the service
  key to the browser; the anon key + RLS is the trust boundary.
- **Deletes are soft or undoable.** Destructive commands produce a visible,
  reversible run — never a silent mutation.
- **No `any` on data access.** Zod at the boundary.
- **No god files.** Lean pages; extract by responsibility. A 2,000-line page
  is a reject.
- **One glossary.** A second noun for the same entity is a review reject.
  (It is a **Task**, not a todo/item/ticket/card.)
- **Update docs in the same change** if you add a pattern, command, or
  dependency. If you invent a pattern, the playbook changes in the same PR or
  the PR does not merge.
- **No customer-confidential data or PHI in tasks.** See COMPLIANCE.md.
- **Propose, then wait.** Standard or Comprehensive work (FEATURE-PLAYBOOK §3):
  post a short bolt plan (recipes, files, tests, out of scope) and wait for a
  human yes before Construction. Do not scaffold “while they think.”
- **Match depth to the work.** A typo is Minimal. A new app or schema change
  is Comprehensive. Do not run platform ceremony on a one-line fix.
- **A human correction is a standing rule.** Same change: AGENTS.md / playbook
  / PROJECT-MEMORY. Do not keep it only in chat.

## Locked decisions you must not reopen in a feature PR

See PROJECT-MEMORY.md for the full log. Short list:

- Own repo, own database. Not a feature of Tools, Production, or Design.
- Framework modeled on CyranoApp-AI-Production; ceremony scaled to an
  internal tool.
- One data layer (`lib/data/`) with a documented seam to a BFF later.
- The product is **MonPanache**; the repo/package stay `Cyrano-Task-Manager`.
  One name each — do not introduce a third.

## Do NOT "fix" these (they are intentional)

- Empty `apps/*` / `packages/*` / `supabase/` skeletons during charter — they
  exist so layering is real before features land.
- The `supabase/` folder while the backend decision is **Open** in
  PROJECT-MEMORY — do not install a backend SDK or write a migration until
  that decision is locked.

## Verifying your work (required before claiming done)

```bash
npm run check
```

Zero warnings. Tests for new behavior in the same PR. Never weaken CI to
`--passWithNoTests`.

## Map

| Need | Look in |
| --- | --- |
| Where we left off + decision log | **PROJECT-MEMORY.md** |
| Doc index | README.md |
| How to build a feature | FEATURE-PLAYBOOK.md |
| Repos / lanes | LANES.md |
| One noun per concept | GLOSSARY.md |
| Structure, seams | ARCHITECTURE.md |
| Code rules | CODING-GUIDELINES.md |
| Visual / UX | DESIGN-GUIDELINES.md |
| Auth, RLS, secrets | SECURITY.md |
| WCAG | ACCESSIBILITY.md |
| Data boundaries | COMPLIANCE.md |
