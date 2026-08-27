# Project Memory — Cyrano-Task-Manager

Compact state + decision log. Anyone (teammate or a new AI session) should
read this and continue without reopening settled calls. Update when a decision
lands. Last updated: **2026-08-26**.

## Product vision (Charlie, 2026-08-26)

Not a to-do list — a **task intelligence tool**. Tasks originate where work
happens; the tool gathers, understands, and ranks them:

- **Sources:** Zoom customer-call transcripts (corporate license already
  transcribes + summarizes), Gmail (client requests), and manual capture
  (head, hallway conversations).
- **Extraction:** an AI step reads a transcript/email and **proposes** tasks
  with context and the customer attached. Proposed tasks land in a review
  queue; a human accepts them onto the board. AI never silently creates.
- **Understanding:** every task gets a **bucket** (type of work — so
  recurring patterns become visible) and an urgency tier. Priority mapping:
  `p0` = now, `p1` = end of day, `p2` = this week, `p3` = note.
- **Institutional knowledge:** a one-time Gmail backfill reads historical
  email to learn what kinds of tasks recur, seeding the buckets.
- **Automation of recurring task types is explicitly LATER** — not designed
  for until the tracking/understanding layer has proven itself.

Build order: manual spine first (board, capture, buckets, urgency), then
Gmail ingestion, then Zoom, then backfill, then automation.

## Where things stand

- **Charter OS is in** (2026-08-26): README reading order, CLAUDE/AGENTS
  twins, FEATURE-PLAYBOOK, guidelines, glossary, decision log — modeled on
  CyranoApp-AI-Production.
- **Bolt 1 done (2026-08-26): the quality graph is real.** npm workspaces;
  TypeScript 7 strict; Biome 2; Vitest 4; Vite 8 + React 19 placeholder in
  `apps/web` (shell is Bolt 2); first locked contracts
  (`task-status`, `task-priority`) with 6 passing tests; husky pre-commit
  runs `npm run check` = typecheck + lint + test + build, zero warnings.
- `supabase/` still holds only a README — frozen until the backend decision
  (Open, below) is locked.

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
5. **Names (updated 2026-08-27, Charlie):** the product is **Panache** —
   tagline *"Know what needs you now. Automate what repeats."* The repo and
   npm package stay `Cyrano-Task-Manager` / `cyrano-task-manager`. Panache
   is what users (and docs) call the product; Cyrano-Task-Manager names the
   repo. No third name, ever.
6. **Agent sessions: propose → gate → bolt; depth matches the work.**
   Corrections become standing rules. Same model as the production repo; do
   not install a second agent OS.
7. **Frontend stack (locked 2026-08-26, Charlie):** React 19, TypeScript
   strict, Vite, Tailwind v4, TanStack Router, Zustand, Radix, Zod;
   Biome + Vitest. (The CTO stack — patterns port from Design/Production.)
8. **Task statuses (locked 2026-08-26):** `inbox`, `todo`, `in_progress`,
   `blocked`, `done`, `cancelled`. UI may render friendlier labels; the
   contract uses these. **Priorities:** `p0`–`p3`, default `p2`.
9. **Users:** single user (Charlie) first; schema keeps `user_id` on every
   table so a team mode is a policy change, not a migration.
10. **Morning view is urgency columns (locked 2026-08-26, Charlie):** the
    board shows columns Now (`p0`) / Today (`p1`) / This Week (`p2`) /
    Notes (`p3`) — columns are **urgency**, not status. Status lives on the
    task row. Design assumption: 15–20 new tasks arrive per day across all
    sources — columns must stay readable at that volume.
11. **Excerpt storage approved (2026-08-26, Charlie):** tasks may carry
    short email/transcript excerpts as context. The hard **no-PHI** line
    stays. COMPLIANCE.md revised same change.

## Open (named later, not architecture)

- **Backend (decide before the first migration — blocks Bolt 3).** Charlie
  wants to rethink the Supabase proposal (2026-08-26). The vision raises the
  stakes: the backend must also run **scheduled ingestion jobs** (Gmail,
  Zoom) and an **LLM extraction step** — a static SPA alone cannot. Whatever
  is chosen, the `lib/data/` seam and row-security rules stand. No backend
  SDK, no migration, until locked.
- **Bucket taxonomy** — the nouns come from the Gmail backfill + real use,
  not invented up front. `buckets` is the working name (GLOSSARY).
- Zoom + Gmail API access details (scopes, app registration) — at their
  slice, not before.
- Hosting for the SPA (static host TBD; not the Hostinger app VPS).
- Auth provider (depends on the backend decision).
- Automation of recurring task types — explicitly later, after tracking
  has proven itself.

## Next

1. ~~Confirm the Proposed block~~ — done 2026-08-26: frontend stack +
   taxonomy locked (rows 7–8); backend moved to Open, decide before Bolt 3.
2. ~~Bolt 1: wire the real quality graph~~ — done 2026-08-26.
3. **Bolt 2:** seed `apps/web` shell (rail + ⌘K palette + theme) by porting
   patterns from CyranoAPP-Design — shell only, no features.
4. **Bolt 3:** lock the backend, then first schema migration (`projects`,
   `tasks`, `labels`, `task_labels`, `activity_events`) with row-security
   policy tests.
5. **Bolt 4:** slice 1 — capture (⌘K quick-add) → organize
   (project/status/label) → filtered URL views → done.

Do **not** start slice 1 features until the web seed exists and the
row-security policy tests can fail a PR.
