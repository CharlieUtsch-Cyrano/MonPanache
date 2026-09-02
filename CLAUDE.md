# MonPanache — the map

## What this is

**MonPanache** — *"Know what needs you now. Automate what repeats."* —
Cyrano's internal task-intelligence tool. Tasks originate where work happens
(Zoom customer calls, Gmail, your head); an extraction step **proposes**
tasks with customer and context attached, a human accepts them from the
review queue, and the board ranks them by urgency. Build order: manual spine
→ Gmail ingestion → Zoom → backfill → automation (README.md has the full
vision).

The repo runs on the AIDLC operating model ported from Cyrano-AI-OS
(decision 001): tickets are the prompt, evals are written first and gate the
merge, settled calls live in decision records. This file is the map, not an
encyclopedia. Hard cap: 150 lines (enforced by `evals/000_smoke`).

## Map

- `apps/web/` → the SPA (React 19, TypeScript strict, Vite, Tailwind v4) —
  mock urgency-column board today; real shell is a Ready-ticket away
- `packages/contracts/` → shared Zod schemas (locked task taxonomies)
- `evals/` → eval suites, one per ticket — see `evals/README.md`
- `supabase/` → schema owner; **empty until decision 013 (backend) is
  accepted** — no backend SDK, no migration before then
- `docs/` → `GLOSSARY.md` · `TOOLS_INDEX.md` · `SETUP_CHECKLIST.md` ·
  `decisions/` · `THIRD-PARTY-NOTICES.md`
- `.claude/` → `settings.json` (permissions + hooks) · `skills/` · `agents/`
- `.github/` → ticket + PR templates · CODEOWNERS · `workflows/gates.yml`
- `REVIEW.md` → PR review policy, read by Claude Code Review on every PR

## Run

`make dev` · `make lint` · `make test` · `make eval` — the stable agent
interface. Windows without make: `npm run dev` · `npm run lint && npm run
typecheck` · `npm test` · `npm run eval`. CI runs `make eval` inside the
Docker image built from `./Dockerfile` — the CI run is authoritative.

## Always

- Read `PROJECT_STATE.md` before starting any ticket.
- Every ticket branch adds an eval in `evals/` before the implementation.
- Never touch secrets: reference names only. No `.env` values in the diff.
- **No PHI or customer-confidential content anywhere** — code, fixtures,
  mock data, excerpt strings (decision 008). Invented data only.
- One noun per concept (`docs/GLOSSARY.md`). A Task is never a todo, item,
  or card; a second name for an entity is a review reject.
- Settled calls live in `docs/decisions/` — a feature PR doesn't reopen
  them; propose a superseding record instead.
- New dependencies need owner approval + a permissive license, recorded in
  `docs/THIRD-PARTY-NOTICES.md` in the same PR (decision 012).

## Venue routing — say your call before you start

- Exploratory, interactive, or needs uncommitted code → **LOCAL**
- Fully specified ticket, long-running, or parallel → **CLOUD**

## Growth triggers — the system grows itself

- **Subsystem CLAUDE.md** — same folder-local instruction repeated 3×, or a
  folder's rules override these defaults → propose `<folder>/CLAUDE.md` via
  PR. Max 40 lines: purpose · hard rules · gotchas · pointers.
- **New skill** — the 2nd time anyone performs a >3-step procedure →
  `.claude/skills/<name>/SKILL.md`; description written as a trigger
  ("Use when…"), steps end in a verification.
- **Tool catalog row** — the moment a tool or capability is added → one line
  in `docs/TOOLS_INDEX.md`.
- **Decision record** — a debate gets settled → one short dated file in
  `docs/decisions/` (start from `000-template.md`).
- **New eval** — every ticket; and every production failure becomes an eval
  before it gets fixed.
- **New CI check** — the 2nd time a class of bug reaches a PR.
