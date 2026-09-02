# 002 — Own repo, own database

**Date:** 2026-08-26 · **Status:** accepted

## Context

MonPanache could have lived inside Cyrano AI Tools, CyranoApp-AI-Production,
or CyranoAPP-Design. The Tools postmortem showed what happens when unrelated
products share a repo, a `lib/`, and a database.

## Decision

MonPanache is its own product with its own repo and its own database. UI
patterns port one way (Design/Production → here) as copies that meet this
repo's rules — never a runtime import, never a shared database, never
deployed inside another product "as a tab".

## Consequences / revisit when

No sibling-repo credentials or connection strings ever appear on any code
path here. Revisit only if MonPanache graduates to customer-facing — that is
a deliberate project with its own record, not a feature PR.
