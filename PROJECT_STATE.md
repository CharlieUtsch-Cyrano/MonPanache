# PROJECT_STATE

Update after EVERY merged PR · one page max · the first read of every
session, agent and human alike. Git history is the archive; this is only the
pin on the map.

**Milestone:** v0.1 — AIDLC operating system live in MonPanache

## In progress

- AIDLC adoption — branch `feat/aidlc-operating-system`: the charter OS
  (13 root docs) replaced by the Cyrano-AI-OS machinery; locked decisions
  converted to `docs/decisions/001–013`; eval gate + hooks + templates live

## Recently decided

- 001 — adopt AIDLC, retiring the playbook/bolt model (2026-09-02)
- 002–012 — the charter-era locked decisions, converted from the retired
  PROJECT-MEMORY log into `docs/decisions/` (originals 2026-08-26/27)
- 007 — palette reaffirmed indigo+amber; `styles.css` drifted to the design
  export's teal/navy and needs the correction ticket

## Blockers

- Manual platform setup → `docs/SETUP_CHECKLIST.md` (branch protection,
  Project board, Claude Code Review app; Doppler when the first secret lands)

**Next up:** finish `docs/SETUP_CHECKLIST.md` · file + run the first three
tickets: (1) `styles.css` → indigo/amber per decision 007 — the dry-run,
(2) real shell: router + Zustand + command registry + URL-first board state
(decision 012), (3) backend research spike → comparison → accept decision 013

**Open questions:** backend platform (decision 013, open — blocks any
migration) · bucket taxonomy (emerges from Gmail backfill + real use, not
invented) · SPA hosting · auth provider (follows the backend)
