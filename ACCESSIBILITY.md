# Accessibility

**Conformance target: WCAG 2.2 Level AA.**

Ported from the Cyrano house framework (CyranoAPP-Design →
CyranoApp-AI-Production). Binding here. Until `apps/web` is seeded, "how the
codebase meets it" is the **required implementation contract**; evidence rows
are added to the audit log as screens land.

## Why this target

It is the house standard across Cyrano repos, the components we port were
built to it, and an internal tool is where staff spend hours a day —
keyboard speed and screen-reader correctness are productivity features here,
not checkbox compliance.

## How the codebase meets it

### The new-in-2.2 criteria

| Criterion | How we conform |
| --- | --- |
| **2.4.11 Focus Not Obscured (Min.)** | Scroll containers carry `scroll-pb-*` so focus scrolls clear of fixed overlays (tab bar, selection bar). Any new fixed overlay adds matching scroll padding. |
| **2.5.7 Dragging Movements** | No drag-only interactions. If board drag lands, a single-pointer alternative (row menu "Move to…") is required in the same PR. |
| **2.5.8 Target Size (Minimum)** | Interactive targets ≥ 24×24 px; touch surfaces aim for 44 px. |
| **3.2.6 Consistent Help** | When a help mechanism lands it lives in one consistent slot (rail bottom section). |
| **3.3.7 Redundant Entry** | Quick-add and forms reuse known values (projects, labels) via autocomplete — no repeated manual entry. |
| **3.3.8 Accessible Authentication (Min.)** | Login uses `autocomplete` attributes, never blocks paste, no cognitive tests. |

### Key AA basics

- **Contrast (1.4.3 / 1.4.11)** — AA in both themes. Brand-colored text uses
  `text-brand-ink`, never `text-brand`. Status and priority tokens must pass
  4.5:1 as text in both themes — enforce with a contrast test when tokens
  land (port `lib/contrast.ts` + its test from Design).
- **Reflow (1.4.10)** — works to **320 CSS px**; only data tables scroll
  horizontally, inside their own region.
- **Status messages (4.1.3)** — saves, result counts, and command runs
  announce via live regions (`role="status"`, `aria-live` on the activity
  feed).
- **Keyboard & focus (2.1.1 / 2.4.7)** — everything without a mouse; Radix
  handles dialog/menu focus; `.reveal-on-hover` also reveals on
  `:focus-within`. The keyboard path is first-class: quick-add, complete,
  and navigation all have shortcuts surfaced in the ⌘K palette.
- **Names & roles (4.1.2)** — icon-only controls carry `aria-label`; custom
  widgets implement full `role`/`aria-*`/keyboard.
- **Reduced motion (2.3.3)** — animations respect `prefers-reduced-motion`.

## Testing checklist (per feature, and before releases)

- [ ] Keyboard-only walkthrough: every action reachable, visible focus,
      nothing lost behind fixed overlays
- [ ] Screen reader pass (VoiceOver/NVDA): labels, announcements for async
      results and runs
- [ ] Both themes at AA contrast — no raw `text-brand` for text
- [ ] 320 px width: no horizontal scroll (except tables); 200% zoom usable
- [ ] Targets ≥ 24 px (44 px touch); no hover-only or drag-only interaction
- [ ] `prefers-reduced-motion` honored by any new animation
- [ ] Automated scan (axe DevTools / Lighthouse) clean on changed pages

## Audit log

| Date | Scope | Result |
| --- | --- | --- |
| 2026-08-26 | Cyrano-Task-Manager charter | Framework adopted. No UI yet — next audit row is due when the `apps/web` shell lands. |
