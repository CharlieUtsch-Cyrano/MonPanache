# 013 — Backend platform

**Date:** 2026-08-26 · **Status:** OPEN — research pending

## Context

The original proposal was Supabase-direct from a static SPA. The product
vision raises the stakes: the backend must also run **scheduled ingestion
jobs** (Gmail, Zoom) and an **LLM extraction step** — a static SPA alone
cannot. Charlie wants a genuine comparison before committing (2026-09-02).

## Decision

None yet. Requirements any candidate must meet: Postgres-class store with
enforced row security (decision 009) · scheduled jobs for ingestion · a
place to run LLM extraction · auth · no privileged key in the browser.
Candidates to compare: Supabase fully used (Edge Functions + pg_cron) ·
Supabase + separate worker · small self-owned server + Postgres. AWS is
**not** presumed (Cyrano-AI-OS's AWS record was scoped to the customer
product, not internal tools).

## Consequences / revisit when

**Until this record is accepted: no backend SDK is installed, no migration
is written, `supabase/` stays empty.** The `lib/data/` seam and the
row-security guarantee hold regardless of the choice. The research spike is
ticket 3 in docs/SETUP_CHECKLIST.md §6; its comparison output amends this
record to accepted.
