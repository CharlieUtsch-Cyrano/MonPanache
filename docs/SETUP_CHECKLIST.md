# SETUP_CHECKLIST — manual steps only a human can do

Everything in the repo ships via PR; these settings live in GitHub / Doppler
UIs and must be clicked once by Charlie (~20 min). Check items off by editing
this file in a follow-up PR.

## 1. Branch protection on `main` (GitHub → Settings → Branches)

- [ ] Require a pull request before merging (no direct pushes, human or agent)
- [ ] Required status checks: **`lint-and-unit`** and **`eval`** — exactly
      these names (they appear in the picker only after the first PR run;
      the AIDLC-adoption PR provides it)
- [ ] Require 1 approval · dismiss stale approvals on new commits
- [ ] Require review from Code Owners
- [ ] Require linear history
- [ ] "Include administrators" — **ON** (the day you bypass a gate is the day
      it stops being one)
- [ ] Repo Settings → General → automatically delete head branches on merge

## 2. GitHub Project board

- [ ] Create a Project with columns: Backlog · Refine · Ready · In Progress ·
      Done; link this repo
- [ ] Create the `ticket` label (used by `.github/ISSUE_TEMPLATE/ticket.md`)

## 3. Claude Code Review (managed app)

- [ ] Enable Claude Code Review (claude.ai → org settings → Code Review) and
      select this repo (~5 min)
- [ ] Confirm on the next open PR: an automated review appears, following
      `REVIEW.md` (three passes, nit cap) — that PR is the acceptance test

## 4. Per-machine agent setup

- [ ] House rules: the shared `~/.claude/CLAUDE.md` symlink comes from the
      Cyrano-AI-OS repo (`dotfiles/claude/`), not from here — set it up there
- [ ] After pulling a change to `.claude/settings.json` or `.claude/hooks/`,
      restart Claude Code — hooks snapshot at session start

## 5. Doppler (local secrets — when the first secret exists)

- [ ] Create the Doppler project for this repo; add the `dev` config
- [ ] `doppler setup` in the repo root to link the checkout
- [ ] Add a row to `docs/TOOLS_INDEX.md` with the project name

## 6. Rollout

- [ ] File the first three tickets to the Definition of Ready:
      1. Correct `styles.css` to the indigo/amber palette (decision 007)
      2. Real shell: TanStack Router + Zustand + command registry +
         URL-first board state (decision 012)
      3. Backend research spike → comparison → accept decision 013
- [ ] Run ticket 1 start to finish as the dry-run: plan → eval fails →
      build → gates green → merged

Done when: ticket 1 is merged, the gates went green, and PROJECT_STATE.md
reflects it. The lifecycle is live.
