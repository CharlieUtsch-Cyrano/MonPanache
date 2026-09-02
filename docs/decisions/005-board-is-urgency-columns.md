# 005 — The board is urgency columns; schedule overrides priority

**Date:** 2026-08-26 (mechanic refined 2026-08-27) · **Status:** accepted

## Context

The morning view had to answer "what needs me now?" at a volume of 15–20
new tasks a day across all sources. Status columns (Kanban) answer a
different question.

## Decision

Board columns are **urgency, not status**: Now (`p0`) / Today (`p1`) /
This Week (`p2`) / Notes (`p3`); status lives on the task row. The core
mechanic (`boardSlot` in `apps/web/src/lib/schedule.ts`): a due date
**overrides** manual priority — overdue → Now, due today → Today, due this
week → This Week, due beyond → parked in Later; no date → the manual
priority. Moving a card across columns adopts the column's priority and
clears the schedule.

## Consequences / revisit when

Priority is the fallback, the calendar is the boss. Revisit if real usage
shows the Now column flooding (the volume assumption breaking).
