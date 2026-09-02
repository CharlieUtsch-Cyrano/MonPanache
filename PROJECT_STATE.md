# PROJECT_STATE

Update after EVERY merged PR · one page max · the first read of every
session, agent and human alike. Git history is the archive; this is only the
pin on the map.

**Milestone:** v0.2 — lifecycle proven (dry-run merged); building the AWS
product train

## In progress

- Manual platform setup — Charlie — `docs/SETUP_CHECKLIST.md`: §1 branch
  protection · §2 board · §3 Code Review app · **§6 cloud accounts**
  (UtschWorks AWS + Bedrock + Google OAuth Internal + Zoom user-level
  OAuth) — §6 gates deploying #8/#10
- #3 real shell — re-scoped review-queue-first, split during Refine

## Recently decided

- 001 — adopt AIDLC, retiring the charter playbook/bolt model (2026-09-02)
- 002–012 — charter-era locked decisions converted to `docs/decisions/`
- **#2 palette dry-run MERGED (PR #6, 2026-09-02):** full loop ran — eval
  failed first, fix, gates green local + CI, verifier pass.
  `evals/2_palette_tokens` now guards re-drift. The lifecycle is live.
- **013 ACCEPTED (2026-09-02): AWS serverless-lean** in Charlie's
  UtschWorks org — EventBridge → Lambda → Bedrock → RDS Postgres (RLS) →
  API GW + Cognito → S3/CloudFront SPA → SES. CDK for infra. Supabase is
  the recorded road-not-taken.
- **Extraction spike PASSED** (#7, 2026-09-02): 16 review-queue proposals
  from real Gmail, graded good/thorough; raw Zoom transcripts beat Zoom's
  own summaries. 30-min ingestion cadence locked as a requirement for #10
  (no interim loop — the app is the product, per Charlie). Learnings:
  "waiting on X" wants first-class treatment; first real bucket-taxonomy
  data; the wedge is extraction + review queue.

## Blockers

- Branch protection not yet enabled — until then, merges rely on discipline
  rather than the gate (SETUP_CHECKLIST §1)
- SETUP_CHECKLIST §6 (Charlie, ~1–2 hrs) gates deploying #8 and #10

**Next up:** the AWS build-out train, in order: #8 infra baseline (CDK) →
#9 schema + RLS → #10 ingestion Lambda → #11 review queue + Connections
screen live at a URL → #12 Zoom webhook (user-level OAuth) → #13 SES
urgent notifications. #8's plan starts the moment Charlie hands over the
UtschWorks account ID + region.

**Open questions:** "waiting on X" as a first-class concept before #9
lands · bucket taxonomy (first real data in #7) · migration tooling for
`db/` (picked during #9's refine)
