# Review instructions

Read by Claude Code Review on every PR (and by any human who wants the same
checklist). Findings inform; they never approve or block — the code owner's
approval through branch protection is the only gate.

## Passes

Run three passes and tag each finding with its pass:

- **Bugs** — logic errors, broken edge cases, subtle regressions, unhandled
  failure paths.
- **Security & data boundaries** — secrets or `.env` values in the diff,
  injection risks, disabled validation, new network egress. This repo's
  rules: secret *names* only, never values; and **no PHI or
  customer-confidential content anywhere** — including fixtures, mock data,
  and excerpt strings (docs/decisions/008).
- **Compliance** — the diff does what the linked ticket's intent says and
  nothing more; it matches the PR description's Plan section; it honors
  `docs/decisions/` and the growth triggers in CLAUDE.md (new capability →
  `docs/TOOLS_INDEX.md` row; settled debate → decision record; new ticket →
  eval). Flag any weakened or deleted eval loudly — evals are append-mostly.
  Flag alias nouns for glossary concepts (docs/GLOSSARY.md): a Task is never
  a todo, item, ticket, or card.

## What Important means here

Reserve **Important** for findings that would break behavior, leak a secret
or PHI, weaken a gate (eval, hook, CI check, branch protection), or
contradict a decision record. Style, naming, and taste are nits.

## Cap the nits

Report at most five nits per review; summarize the rest as a count.
Biome and `tsc` run in CI — never report what they already enforce.

## Do not report

- `package-lock.json` and other generated or vendored files
- Anything `make lint` / `make test` / `make eval` already fails on
- Missing tests for doc-only changes

## Feedback loop

When a review flags the same class of mistake twice, propose the one-line
correction to CLAUDE.md (or the relevant skill) in the review itself, so the
fix lands where the next session will read it.
