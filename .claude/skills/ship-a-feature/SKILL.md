---
name: ship-a-feature
description: Use when picking up a Ready ticket and taking it from branch to merged PR — the full AIDLC development loop.
---

# Ship a feature

1. **Pull a Ready ticket.** Assign yourself; move it to In Progress on the
   board. The ticket is the prompt — if it can't run unsupervised, send it
   back to Refine.
2. **Sync & branch.** `git pull origin main`, then
   `git switch -c feat/<issue#>-<slug>`.
3. **Plan first.** In plan mode, restate the ticket, your assumptions, and the
   files you'll touch. Get approval before writing code. The approved plan
   goes into the PR description's `## Plan` section verbatim — it's what
   review checks the diff against.
4. **Eval before code.** Turn the acceptance criteria into
   `evals/<issue#>_<slug>.eval.test.ts`. Run `make eval` (Windows:
   `npm run eval`) and watch it fail.
5. **Build.** Implement to the plan; keep diffs surgical (house rule 3).
6. **Verify locally.** `make lint && make test && make eval` — CI runs the
   same targets in the Docker image built from `./Dockerfile`. Then run the
   verifier subagent (`.claude/agents/verifier.md`) for a fresh-context check
   of the diff against the plan; fix what it reports before opening the PR.
7. **Open the PR.** The template forces the evidence: ticket link, the
   approved plan, eval run, what was NOT done. Update `PROJECT_STATE.md` in
   the same PR.
8. **Gates & review.** CI (`lint-and-unit` + `eval`) and Claude Code Review
   must pass; Charlie is both PM and code owner here, so his PR approval is
   the human gate — the automated review is the independent second pass, not
   a rubber stamp. Address review findings; when one flags the same mistake
   a second time, land the one-line CLAUDE.md correction in the same PR.
   Merge, delete the branch, confirm state reflects the merge.

**Verify done:** the PR is merged, both checks were green, the ticket is
closed, and `PROJECT_STATE.md` reflects it.
