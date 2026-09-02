# 010 — Single user first; schema shaped for a team

**Date:** 2026-08-26 · **Status:** accepted

## Context

Charlie is the only user for the foreseeable future, but "single-user
schema" is a trap that costs a migration later.

## Decision

Ship single-user (Charlie), but every user-owned table carries `user_id`
(+ index), `created_at`, `updated_at`, `deleted_at` from its creating
migration — so team mode is a policy change, not a schema migration.

## Consequences / revisit when

A little redundancy now; no migration cliff later. Revisit when a second
user actually onboards (that ticket flips policies, not tables).
