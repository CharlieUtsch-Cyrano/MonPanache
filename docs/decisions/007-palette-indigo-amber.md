# 007 — Palette: indigo + amber; amber means "needs you now"

**Date:** 2026-08-27 · reaffirmed 2026-09-02 · **Status:** accepted

## Context

MonPanache needed an identity deliberately distinct from Cyrano cyan/navy.
During the later "match the design export" passes, `styles.css` was
silently overwritten with the export's teal/navy brand and red=now mapping —
the drift that motivated enforced gates (decision 001). Charlie reaffirmed
the original palette on 2026-09-02.

## Decision

Brand: light indigo `#818cf8` / deep indigo `#312e81`, matching the MP
logo. **Amber means "needs you now"** (the logo's dot); **red is reserved
for overdue only** — never red for mere urgency, never amber for lateness.
Urgency accents: now=amber · today=indigo · week=green · note=gray. All
color flows through the tokens in `apps/web/src/styles.css`; components
never use raw hex.

## Consequences / revisit when

The shipped `styles.css` (teal/navy, red=now) violates this record — the
correction is the first ticket (docs/SETUP_CHECKLIST.md §6), with an eval
asserting the token values. Revisit only with a deliberate rebrand record.
