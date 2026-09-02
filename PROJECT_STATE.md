# PROJECT_STATE

Update after EVERY merged PR · one page max · the first read of every
session, agent and human alike. Git history is the archive; this is only the
pin on the map.

**Milestone:** v0.1 — AIDLC operating system live (PR #1 merged 2026-09-02)

## In progress

- Manual platform setup — Charlie — `docs/SETUP_CHECKLIST.md` (branch
  protection referencing `lint-and-unit` + `eval`, Project board, Claude
  Code Review app; Doppler deferred until the first secret)
- First tickets filed 2026-09-02, sitting in Refine: #2 palette correction
  (the dry-run) · #3 real shell (L — split during Refine) · #4 backend
  research spike

## Recently decided

- 001 — adopt AIDLC, retiring the charter playbook/bolt model (2026-09-02)
- 002–012 — charter-era locked decisions converted to `docs/decisions/`
- 007 — palette reaffirmed indigo+amber; the `styles.css` drift is ticket #2
- 013 — backend deliberately OPEN; settled by ticket #4

## Blockers

- Branch protection not yet enabled — until then, merges rely on discipline
  rather than the gate (SETUP_CHECKLIST §1)
- Ticket #4 (backend) blocks any migration, data layer, or auth work

**Next up:** Charlie promotes #2 to Ready · run #2 start to finish as the
lifecycle dry-run (plan → eval fails → build → gates green → merge) · refine
and split #3 · run #4's comparison and accept decision 013

**Open questions:** backend platform (#4) · bucket taxonomy (emerges from
Gmail backfill + real use, not invented) · SPA hosting · auth provider
(follows the backend)
