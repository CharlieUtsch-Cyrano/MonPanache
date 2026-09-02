# PROJECT_STATE

Update after EVERY merged PR · one page max · the first read of every
session, agent and human alike. Git history is the archive; this is only the
pin on the map.

**Milestone:** v0.1 — AIDLC operating system live (PR #1 merged 2026-09-02)

## In progress

- Manual platform setup — Charlie — `docs/SETUP_CHECKLIST.md` (branch
  protection referencing `lint-and-unit` + `eval`, Project board, Claude
  Code Review app; Doppler deferred until the first secret)
- #2 palette correction — the lifecycle dry-run — ran the full loop: eval
  first (failed 7), fix, gates green local + CI, verifier pass; PR #6 open,
  awaiting Charlie's merge. `evals/2_palette_tokens` now guards re-drift
- #3 real shell (L — split during Refine) · #4 backend research spike —
  filed 2026-09-02, sitting in Refine

## Recently decided

- 001 — adopt AIDLC, retiring the charter playbook/bolt model (2026-09-02)
- 002–012 — charter-era locked decisions converted to `docs/decisions/`
- 007 — palette reaffirmed indigo+amber; the `styles.css` drift is ticket #2
- 013 — backend deliberately OPEN; settled by ticket #4
- **Extraction spike PASSED** (#7, 2026-09-02): real-Gmail extraction
  produced 16 review-queue proposals, graded good/thorough by Charlie —
  the product bet is validated. Learnings in the ticket: Zoom
  pre-summarizes; "waiting on X" wants first-class treatment; first real
  bucket-taxonomy data; the wedge is extraction + review queue

## Blockers

- Branch protection not yet enabled — until then, merges rely on discipline
  rather than the gate (SETUP_CHECKLIST §1)
- Ticket #4 (backend) blocks any migration, data layer, or auth work

**Next up:** merge PR #6 (#2 palette dry-run — gates green) · run #4
(backend research) — the spike gives it a concrete first workload: a daily
Gmail sweep feeding the review queue · refine #3 (shell). Proposed
re-sequencing now the bet is validated: extraction loop + review queue
before deep manual-spine polish (Charlie to confirm; would ship as a PR
amending the build order)

**Open questions:** backend platform (#4) · raw Zoom-transcript extraction
(untested — spike used Zoom's summary) · "waiting on X" as a first-class
concept before the schema lands · bucket taxonomy (first real data in #7)
· SPA hosting · auth provider (follows the backend)
