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

## 6. Cloud accounts & connections (decision 013 — ~1–2 hours, Charlie)

- [ ] **AWS (UtschWorks org):** confirm/create the MonPanache account and
      pick the home region; note account ID for CDK. Ticket #8 supplies the
      exact `cdk bootstrap` command and the GitHub-Actions OIDC deploy role.
- [ ] **Bedrock:** in that account/region, request Claude model access in
      the Bedrock console (a checkbox; usually instant).
- [ ] **Gmail:** Google Cloud project → enable Gmail API → OAuth consent
      screen set to **Internal** (Workspace domain skips verification) →
      OAuth client (web) → run the one-time consent as
      charlie.utsch@cyranovideo.com; the refresh token goes into Secrets
      Manager (name only in code). Scope: `gmail.readonly`.
- [ ] **Zoom:** Marketplace → **user-level OAuth app** (the login-page
      flow — no admin needed; see ticket #12) with cloud-recording read
      scope; add a `recording.completed` event subscription (webhook URL
      comes from ticket #12's deploy); credentials into Secrets Manager.
      S2S app is the fallback if account settings block user apps.
- [ ] **Doppler:** create the project now that real secrets exist; add a
      TOOLS_INDEX row with the project name.

## 7. Rollout

- [x] First tickets filed (2026-09-02): #2 palette · #3 shell · #4 backend
      (done — decision 013 accepted) · #7 extraction spike (done, PASS) ·
      #8–#13 the AWS build-out train
- [x] Run a ticket start to finish as the dry-run — **done 2026-09-02:**
      #2 palette ran the full loop (eval failed first, fix, gates green,
      verifier pass) and merged as PR #6. **The lifecycle is live.**
