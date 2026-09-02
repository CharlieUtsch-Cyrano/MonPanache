# 013 — Backend platform: AWS serverless-lean

**Date:** opened 2026-08-26 · **accepted 2026-09-02 (Charlie)** · **Status:** accepted

## Context

The original proposal was Supabase-direct from a static SPA. The extraction
spike (#7) sharpened the real workload: a 30-minute Gmail sweep, raw Zoom
transcript ingestion, LLM extraction, Postgres with enforced row security,
auth, and no privileged key in the browser. The comparison (ticket #4) ran
Supabase-fully-used vs Supabase+worker vs self-owned server; Supabase was
the narrow front-runner until two facts flipped it: the Cyrano platform is
being rewritten onto AWS, and Charlie wants MonPanache on production-grade
architecture whose skills compound with that.

## Decision

AWS serverless-lean, in **Charlie's UtschWorks AWS organization** (not the
Cyrano-Video org): EventBridge Scheduler (30-min) → ingestion Lambda →
**Claude via Amazon Bedrock** (IAM role, no runtime API keys) → **RDS
Postgres** (t4g.micro, RLS in every migration) → API Gateway + Lambda (the
BFF the `lib/data/` seam always reserved) fronted by **Cognito** → SPA on
S3 + CloudFront → **SES** for urgent-proposal notifications. Zoom arrives
via a `recording.completed` webhook. All infra as **CDK** (TypeScript);
secrets in Secrets Manager/SSM. Decision 009's guarantee restates cleanly:
the browser holds only a Cognito session; the API enforces ownership;
Postgres RLS is defense-in-depth. ~$15/month steady-state; mostly free tier
in year one.

## Consequences / revisit when

2–3× Supabase's setup effort, bought deliberately for production posture
and AWS alignment. Supabase (Pro, $25/mo, one platform) is the recorded
road-not-taken if AWS ops burden ever outweighs the alignment. Living in
UtschWorks rather than the Cyrano org is Charlie's call for an internal
personal-productivity tool; if MonPanache ever becomes company-critical,
moving accounts is a deliberate migration project, not a drift. The
`supabase/` folder is repurposed to `db/` in the schema ticket.
