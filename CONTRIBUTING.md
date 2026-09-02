# Contributing

This is **MonPanache**, an internal tool run framework-first. The
bar is: the tree stays green, and every file that exists is a pattern worth
copying.

## Prerequisites

- Node 22 (see `.nvmrc`)
- npm (lockfile is the source of truth)

## Everyday scripts

| Script | What it does |
| --- | --- |
| `npm run check` | typecheck + lint + tests + (later) build — **run before every push** |
| `npm run typecheck` | `tsc -b --noEmit` (strict) |
| `npm run lint` | Biome |
| `npm test` | Vitest |

Until the web app is scaffolded, `check` still must pass on whatever exists.
Do not merge a red tree "because the app is empty."

## Quality gates (non-negotiable)

1. **Pre-commit** runs `npm run check` (husky). A commit with a red tree
   does not happen.
2. **CI** on every PR: audit → typecheck → lint → test.
3. **Tests are not optional.** Behavior changes ship tests in the same PR.
   Never `--passWithNoTests` once a suite exists.
4. **No new warnings.** Line-level suppressions only, with a reason.

## Pull requests

Use `.github/PULL_REQUEST_TEMPLATE.md`. Small, single-purpose. Describe
*why*. If you add a user action, it is a command. If you add a pattern,
update the playbook in the same PR.

## AI sessions

Read **AGENTS.md** first. Keep **PROJECT-MEMORY.md** current when a decision
lands.

For Standard or Comprehensive work, the agent posts a bolt plan and waits
for a human yes before Construction (FEATURE-PLAYBOOK §3). A correction in
review becomes a standing doc line in that same change.
