# Evals — the immune system

One suite per ticket, named `evals/<issue#>_<slug>.eval.test.ts` (e.g.
`evals/12_quick_add_capture.eval.test.ts`). The suite is written **before**
the implementation, from the ticket's acceptance criteria — watch it fail,
then build until it passes. `make eval` (Windows: `npm run eval`) runs the
whole directory; CI runs it inside the Docker image built from
`./Dockerfile`, against the artifact that would actually ship — the CI run
is authoritative when local and CI disagree.

## The four rules that keep the suite honest

1. **Every ticket ships an eval.** No eval → the ticket wasn't Ready.
2. **Every production failure becomes an eval before it gets fixed** — the
   suite grows exactly where reality found a hole.
3. **Evals are append-mostly.** Weakening or deleting one requires owner
   sign-off — CODEOWNERS enforces it, and the `protect-evals` hook blocks
   in-session edits.
4. **Prompt changes are code changes.** A PR touching CLAUDE.md, REVIEW.md,
   or `.claude/` gets extra review scrutiny; agent-behavior evals (Tier 3)
   get wired when real session failures exist to encode.

## Tiers

- **Tier 1 — unit tests** live next to the code (`apps/**/src/**/*.test.ts`,
  `packages/**/src/**/*.test.ts`), run everywhere in seconds via `make test`.
- **Tier 2 — ticket acceptance evals** live here; this tier is the merge
  gate.
- **Tier 3 — agent-behavior evals** are deliberately not wired yet. Grow
  them from real failures, not imagination: when a session misbehaves, its
  prompt becomes the first case (see Cyrano-AI-OS `evals/agent/` for the
  shape).

## Fixture rule

Eval fixtures follow decision 008: invented customers and invented excerpt
text only — never real email/transcript content, never PHI, never secret
values.
