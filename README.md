# MonPanache

**Know what needs you now. Automate what repeats.**

MonPanache gathers the work flying at you — from customer calls, email, and
your own head — sorts it into buckets, ranks what deserves attention when,
and learns your patterns until the routine runs itself. The name is
Cyrano's dying line: *"mon panache"* — the part of your work that is
irreducibly yours. The tool automates everything that isn't.

Not a to-do list — a **task intelligence tool**:

- **Sources:** Zoom customer-call transcripts, Gmail, and manual capture.
- **Extraction:** an AI step reads a transcript/email and **proposes** tasks
  with context and the customer attached. Proposals land in a review queue;
  a human accepts them onto the board. AI never silently creates
  (decision 011).
- **Understanding:** every task gets a **bucket** (type of work, so
  recurring patterns become visible) and an urgency tier — the board's
  columns are Now / Today / This Week / Notes, and a schedule overrides
  manual priority (decision 005).
- **Build order:** manual spine (board, capture, buckets, urgency) → Gmail
  ingestion → Zoom → historical backfill → automation of recurring task
  types (explicitly last).

This is an internal Cyrano tool with its own repo and its own database
(decision 002) — never pointed at a sibling repo's systems.

## How this repo works

The repo runs on the **AIDLC operating model** (decision 001), ported from
[Cyrano-AI-OS](https://github.com/Cyrano-Video-Inc/Cyrano-AI-OS): the repo carries everything an agent or a human needs —
context, rules, skills, evals, and gates.

```
ticket (the prompt) → branch · eval written first · build
   → PR (says what was NOT done) → CI gate (Docker eval)
   → review → main
```

Humans gate twice — when the ticket is defined and when the PR is approved.
Machines gate everything in between; that is what makes agent speed safe.

## Quickstart

```sh
npm ci
make lint && make test && make eval   # the same gates CI runs
make dev                              # Vite dev server
```

Windows without make: `npm run lint && npm run typecheck`, `npm test`,
`npm run eval`, `npm run dev`. CI runs `make eval` inside the image built
from `./Dockerfile` — the one true environment. A red check blocks the merge.

## Where things live

| File | Role |
| --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | The map: what's here, how to run it, the growth triggers |
| [`PROJECT_STATE.md`](PROJECT_STATE.md) | What's happening right now — first read of every session |
| [`docs/decisions/`](docs/decisions/) | One short dated file per settled debate |
| [`docs/GLOSSARY.md`](docs/GLOSSARY.md) | One noun per concept — aliases are review rejects |
| [`docs/SETUP_CHECKLIST.md`](docs/SETUP_CHECKLIST.md) | One-time manual settings (branch protection, board) |
| [`evals/`](evals/) | One eval suite per ticket — the merge gate |
| [`REVIEW.md`](REVIEW.md) | PR review policy for Claude Code Review and humans |

New here? Read `CLAUDE.md`, then `PROJECT_STATE.md`, then pull a Ready
ticket from the board.
