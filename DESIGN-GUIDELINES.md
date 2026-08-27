# Design Guidelines

The house visual framework, ported one way from CyranoAPP-Design /
CyranoApp-AI-Production. Binding for **Cyrano-Task-Manager**.

Until `apps/web` is seeded, paths like `styles.css` and `lib/commands.ts`
describe the intended shape. Do not invent a second visual language.

> **Product stance: desktop-first, responsive to phones.** A task manager
> lives on the desktop where work happens; the same UI degrades gracefully —
> iPad gets a touch-safe version, phones get a capture-first layout (quick
> add + list + bottom tab bar). No separate mobile app.

---

## 1. Canvas & breakpoints

**Design and review every screen at 1440px.** Everything scales down.

| Tier | Width | What it means |
| --- | --- | --- |
| **Hard floor** | **320px** | WCAG 1.4.10 reflow width. Below it, the viewport gate. |
| **Phone** | 320–767px | Rail replaced by a bottom tab bar; long-tail nav via the ⌘K palette. |
| **Tablet / small desktop** | 768–1279px | Icon-only rail; standard controls. |
| **Primary** | 1280–1440px | Where we optimize. Design and QA here. |
| **Rail expands** | ≥ 1536px | Rail switches icon-only → full labels (Tailwind `2xl`). |

## 2. Layout

- **Left-rail app shell:** rail (apps, profile/theme, collapse) + scrollable
  content column with a slim header. The rail carries no search box — ⌘K is
  the long-tail path.
- **Cap reading measures.** Text-heavy pages cap the column
  (`max-w-2xl`/`3xl`); data-dense task lists may use full width.
- **Spacing:** Tailwind 4px scale, prefer steps `2, 3, 4, 6, 8`.
- **Radii:** cards `rounded-xl`/`2xl`, controls `rounded-md`/`lg`, pills
  `rounded-full`. Consistent within a surface.

## 3. Touch & input

1. **No hover-only affordances.** Row actions and reveals use the
   `.reveal-on-hover` pattern: hidden-until-hover on pointer devices,
   **always visible on touch** (`@media (hover: none)`).
2. **Tap targets ≥ 44×44px on touch** (≥ 24px everywhere, WCAG 2.5.8).

No custom gestures, no touch-only layouts.

## 4. Color & theming

All color comes from **design tokens** (CSS variables in `styles.css`),
never hard-coded hex. Every screen works in **light and dark**.

| Token | Use |
| --- | --- |
| `background` / `foreground` | Page base + primary text |
| `surface`, `surface-2`, `surface-3` | Cards and raised layers |
| `border`, `border-soft` | Dividers and outlines |
| `muted`, `muted-foreground` | Secondary text |
| `primary` / `accent` | Primary actions / secondary emphasis |
| `brand` / `brand-dark` / `brand-ink` | MonPanache indigo pair; **`brand-ink` for anything you read** |
| `warning`, `danger`, `success` | Status colors |
| `urgency-now/today/week/note` | The board's column accents (amber / indigo / green / gray) |

Task-domain rules: **urgency gets its own semantic tokens** defined once in
`styles.css` — never ad-hoc colors per component. **Amber means "needs you
now"** (the logo's dot); **red is reserved for overdue only** — never use
red for mere urgency, never use amber for lateness.

## 5. Typography

- One UI typeface (system sans). 400 body, 500–600 emphasis, 600–700 headings.
- Scale: page title `text-2xl`, section `text-sm`/`text-base` semibold, body
  `text-sm`, meta `text-xs` in `muted`.
- **Truncate, don't wrap** in dense rows (`truncate`, `line-clamp-*`); full
  text goes in `title=`.

## 6. Components & patterns

- **Reuse first.** Check the building-blocks table in ARCHITECTURE.md.
- **Selection = square checkbox, everywhere.**
- **Row actions** live behind the shared `…` menu — one source of truth.
- **Batch actions = the contextual selection bar** (Gmail pattern): floating
  bottom-center with count, "Select all", quick verbs, full menu; vanishes
  when selection clears.
- **States:** hover, **visible focus**, active, disabled, selected — plus
  empty, loading, and error. An empty Inbox is a designed moment, not a
  blank div.
- **Motion:** subtle and fast (150–300ms); respect `prefers-reduced-motion`.
- **Repeated items ALIGN — fixed-height zones, always** (review criterion):
  `line-clamp-N` + matching `min-h`; label-chip rows exactly one row
  (`flex-nowrap overflow-hidden` + `+N` counter); action clusters never wrap.

## 6b. AI & agent surface patterns

- **One input, no mode switch.** Quick-add and search resolve dates,
  projects, labels, and natural language in a single box ("pay invoice
  friday p1 #finance"). Interpretation is shown, not asked for.
- **Agent actions are runs, not side effects.** Anything a command changes
  shows in the activity feed: spinner while running, result line + **Undo**
  when done.
- **Commands, not buttons.** New actions register in `lib/commands.ts` and
  are reachable via ⌘K; design the palette entry (title, group, keywords) as
  part of the feature.
- **The URL is the hand-off.** A filtered view must be shareable as a link.

## 7. Accessibility (baseline, not optional)

**Conformance target: WCAG 2.2 Level AA** — see
[ACCESSIBILITY.md](./ACCESSIBILITY.md). Design rules that follow:

- Semantic elements; custom widgets get full `role` + `aria-*` + keyboard.
- Everything operable without a mouse; visible focus rings.
- Icon-only controls need `aria-label`.
- AA contrast (4.5:1 text) in **both** themes; brand text uses
  `text-brand-ink`, never `text-brand`.
- No drag-only interactions (board drag needs a menu alternative).
- Async updates (saves, runs, counts) announce via polite live regions.
- Fixed overlays (selection bar, tab bar) pair with `scroll-pb-*`.

## 8. Handoff checklist

- [ ] Composed at **1440**; checked at **1280**, **768**, **390**.
- [ ] Light and dark specified; tokens, not hex.
- [ ] No hover-only actions; touch targets ≥ 44px.
- [ ] All states covered (incl. empty/loading/error).
- [ ] Reuses existing blocks; new patterns justified.
- [ ] Keyboard path, focus, labels, AA contrast.
