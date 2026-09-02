# 004 — Task taxonomies: statuses and priorities

**Date:** 2026-08-26 · **Status:** accepted

## Context

Statuses and priorities are the contract language shared by UI, data layer,
and future extraction — they had to be locked before any of those existed.

## Decision

Statuses: `inbox` · `todo` · `in_progress` · `blocked` · `done` ·
`cancelled`. Priorities: `p0` (now) · `p1` (end of day) · `p2` (this week,
the default) · `p3` (note). Locked in `packages/contracts`
(`task-status.ts`, `task-priority.ts`) with tests; UI may render friendlier
labels, the contract uses these values.

## Consequences / revisit when

Every layer speaks the same enum. Changing a value is a contract migration
with its own record, not a rename.
