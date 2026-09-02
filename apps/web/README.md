# apps/web

The MonPanache SPA. Today: the mock-phase urgency-column board (three
columns + collapsible Projects / Later / Notes strips, ⌘K quick-add with
"reads as" parsing, review queue, task/project panels) running on
`lib/mock-tasks.ts` and local state.

The real shell (TanStack Router, Zustand, command registry, URL-first view
state — decision 012) and the data layer (`src/lib/data/`, after decision
013) arrive via tickets. Design tokens live in `src/styles.css` — the one
token file; components never use raw hex (decision 007).
