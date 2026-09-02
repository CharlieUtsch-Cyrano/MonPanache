# 012 — Product engineering invariants

**Date:** 2026-08-26 · **Status:** accepted

## Context

The charter docs carried a handful of architectural rules worth keeping
when the rest of that operating system was retired (decision 001). They are
consolidated here so tickets can reference one record.

## Decision

1. **Every user action is a command**: stable id + Zod `paramsSchema` in a
   web registry and `packages/contracts`; UI and agents call
   `executeCommand`. Mutations are visible, undoable runs — never silent.
2. **Shareable view state lives in the URL**; preferences in persisted
   Zustand; shared runtime state in Zustand; ephemeral in `useState`. A
   filtered view you can't paste into Slack is in the wrong place.
3. **One data layer**: `lib/data/` is the only module that touches the
   backend client; it parses responses with contract schemas — no `any`, no
   raw rows escaping.
4. **Design tokens only, never hex**, defined once in `styles.css`; light
   and dark both work.
5. **WCAG 2.2 AA**: keyboard path everywhere, `aria-label` on icon buttons,
   targets ≥ 24px (44px touch), live regions for async results, no
   drag-only or hover-only interactions.
6. **Dependencies need owner approval** and a permissive license (MIT /
   ISC / Apache-2.0 / BSD / OFL — never GPL/AGPL/SSPL/BSL/non-commercial),
   recorded in `docs/THIRD-PARTY-NOTICES.md` in the same PR.

## Consequences / revisit when

Tickets cite the specific clause they rely on. Amend by superseding record,
clause by clause — not by drift.
