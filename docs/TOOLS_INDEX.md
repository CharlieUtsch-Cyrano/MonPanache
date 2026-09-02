# TOOLS_INDEX — what exists, one line each

Discoverable, never auto-loaded: agents grep this catalog when they need a
capability. Add a row the moment a tool or capability is added (growth
trigger in `CLAUDE.md`).

Row format: `name · one-line purpose · location`

## Contracts

- `taskStatusSchema` · locked status taxonomy (`inbox…cancelled`, decision 004) · `packages/contracts/src/task-status.ts`
- `taskPrioritySchema` · locked priority taxonomy (`p0–p3`, default `p2`) · `packages/contracts/src/task-priority.ts`

## Frontend

- `styles.css` · the one design-token file (Tailwind v4 `@theme` CSS variables, both themes) · `apps/web/src/styles.css`
- `boardSlot` · schedule-overrides-priority board placement (decision 005) · `apps/web/src/lib/schedule.ts`
- `groupTasks` · urgency-column grouping + Later parking · `apps/web/src/lib/group-tasks.ts`
- `parseCapture` · one-box quick-add parser (date · `p0–p3` · `#bucket` · `@customer`) · `apps/web/src/lib/parse-capture.ts`
- `cn` · class-merge helper for component `className` props · `apps/web/src/lib/cn.ts`
- `mock-tasks` · mock-phase task/project/suggestion fixtures (invented data only) · `apps/web/src/lib/mock-tasks.ts`

## Data layer

(none yet — lands with the backend decision, docs/decisions/013)

## Agent guardrails

- `protect-evals hook` · PreToolUse block on editing tracked `evals/*.eval.test.ts` (append-mostly rule) · `.claude/hooks/protect-evals.mjs`
- `format-file hook` · PostToolUse Biome pass on each edited file · `.claude/hooks/format-file.mjs`

## Subagents

- `verifier` · fresh-context check of the diff against the PR plan before "done" (report only) · `.claude/agents/verifier.md`

## Local dev tooling

- `doppler` · injects local secrets via `doppler run --` (no `.env` files) · project pending first secret (docs/SETUP_CHECKLIST.md)
