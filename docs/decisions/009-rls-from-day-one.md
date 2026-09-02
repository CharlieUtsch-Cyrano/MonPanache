# 009 — Row security from day one; the browser holds no privileged key

**Date:** 2026-08-26 · **Status:** accepted

## Context

Retrofitting row-level security is how cross-user leaks happen; the Tools
repo proved unenforced rules don't count.

## Decision

Every table gets row-level security (or the chosen backend's equivalent,
decision 013) **in the same migration that creates it** — a table without
policies does not merge. The browser holds only an anonymous key; policies,
not client filters, are the trust boundary. Deletes are soft (`deleted_at`);
purges are separate, explicit, gated. Every write inserts an
`activity_events` row (feeds the activity feed and undo). Policy tests
(user A cannot see user B's rows) ship with the first migration, even while
single-user.

## Consequences / revisit when

Slightly more ceremony per table; zero-cost team mode later. Revisit the
mechanism (not the guarantee) when decision 013 picks the backend.
