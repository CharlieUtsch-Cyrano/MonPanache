# 011 — AI proposes, a human accepts

**Date:** 2026-08-26 · **Status:** accepted

## Context

Extraction from transcripts and email is the product's core, and also its
biggest trust risk: silently created tasks would make the board noise.

## Decision

The extraction step **proposes** Suggested tasks into a review queue — with
the source excerpt and customer attached. A human accepts (or dismisses)
each one; only acceptance creates a Task on the board. AI never silently
creates, edits, or completes tasks. The review step is also the compliance
backstop for the no-PHI line (decision 008).

## Consequences / revisit when

Every automation slice (Gmail, Zoom, backfill) inherits this shape. Revisit
per-bucket auto-accept only after the tracking layer has proven itself —
that is the "automation comes later" line in the build order.
