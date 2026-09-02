# Feature Playbook

**Start here when you're about to build something** in **MonPanache**.
This is the house playbook (modeled on CyranoApp-AI-Production's) scaled to an
internal tool: the ceremony is lighter, the invariants are not.

The rules behind the recipes live in
[CODING-GUIDELINES.md](./CODING-GUIDELINES.md) (code) and
[DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md) (visuals); the structural
reference is [ARCHITECTURE.md](./ARCHITECTURE.md).

Until `apps/web` is seeded, paths like `lib/commands.ts`, `pages/`, and
`components/tasks/` describe the **intended** shape (`apps/web/src/...` after
the seed). Do not invent a second UI playbook.

---

## 1. The mental model

Every feature is composed from these kinds of things. Know which ones you're
touching before you write a line:

| Concept | What it is | Lives in |
| --- | --- | --- |
| **App** | Persistent top-level surface with its own URL (Tasks, Projects, later Review) | `lib/apps.ts` + `pages/` + `router.tsx` |
| **Sub-view** | Working surface inside an app (Today, a Project board) | same, nested |
| **Command** | A user action / agent verb (`task.create`, `task.complete`) | web registry (`lib/commands.ts`) **and** `packages/contracts` |
| **Component** | Presentational, prop-driven UI | `components/` (feature folders) |
| **Pure logic** | Filtering, sorting, date math, hooks — no React UI | `lib/` |
| **Store** | Cross-component client state (Zustand) | `stores/` |
| **Contract** | Row shape / command params / view schema | `packages/contracts` |
| **Data access** | Typed query/mutation via the Supabase client | `lib/data/` (the ONLY module that touches the client) |
| **Migration** | Durable schema + RLS policy | `supabase/migrations/` |

Two invariants hold everything together:

1. **Layering:** `pages` compose `components` + `lib`; `components` never
   import from `pages`; `lib` imports from neither. Only `lib/data/` touches
   Supabase. Dependencies point one way (CODING-GUIDELINES §2).
2. **One registry of verbs:** anything a user *does* (beyond typing/scrolling)
   is a command. UI buttons, the ⌘K palette, and agents all execute the same
   `executeCommand(id, ctx, params)` — never a bespoke `onClick` that does
   what a command should.

---

## 2. Decision tree — "what am I building?"

```
A new place users go?
├── Top-level destination ............... Recipe A (new app)
└── Screen inside an existing app ....... Recipe B (new sub-view)

A new thing users/agents DO?
└── Action with a subject + params ...... Recipe C (new command / agent verb)

New read or write against the database?
└── Contract + data-layer function ...... Recipe E

A new piece of UI?
├── Exists in components/ui or the
│   building-blocks table? .............. reuse it (always check first)
├── Specific to one feature ............. Recipe D (feature component)
└── Generic (3+ features could use it) .. promote to components/ or components/ui

New durable data?
└── Migration + RLS + types ............. Recipe F

New client state?
└── Use the state decision table ........ Section 4
```

Then pick **depth** (section 3). The tree says *what* to build; depth says
*how much ceremony*. A label-color bug and a new schema do not get the same
ritual.

---

## 3. Session depth and the construction gate

Agents propose. Humans gate. Then a short **bolt**. This is how we stay fast
without letting the model race ahead of judgment.

### Depth — match ceremony to the work

Pick the first row that fits. When unsure, ask — do not default to
Comprehensive.

| Depth | When | What you do |
| --- | --- | --- |
| **Minimal** | Typo, copy, lint, one-line bug with an obvious test | Do it. No plan write-up. Still `npm run check`. |
| **Standard** | One recipe (or two tightly coupled), one feature, no locked-decision change | Short plan in the chat, then wait for yes, then one bolt. |
| **Comprehensive** | Platform (auth, data layer, schema), new app, new dependency, anything that would change PROJECT-MEMORY’s locked list | Written plan. Owner yes. Split into multiple bolts if needed. Construction does not start until the plan is accepted. |

### Construction gate (Standard and Comprehensive)

Before changing behavior, the agent posts a bolt plan and **stops**. The plan
is half a page, not a spec dump:

1. **Recipes** from the tree (A–F).
2. **Files** likely touched.
3. **Tests** that will exist when it is done.
4. **Out of scope** — what this bolt will *not* do (the usual failure: “while
   I’m here”).
5. **Locked decisions** — name any PROJECT-MEMORY item this might reopen. If
   one is at risk, stop; that is not a feature PR.

A human replies yes (or edits the plan). **Then** Construction. Do not
scaffold “while they think.” Clarifying questions are allowed; silent
implementation is not.

After the bolt: Definition of Done (section 11). If the human corrected the
agent, that correction becomes a standing line in AGENTS.md, this playbook,
or PROJECT-MEMORY **in the same change** — not a private chat memory.

---

## 4. Where state lives (decision table)

Pick the FIRST row that matches. Getting this wrong is the most common review
comment, so decide deliberately:

| If the state… | Put it in | Example |
| --- | --- | --- |
| Describes **what the user is looking at** (query, filters, view, grouping, a *place*) | **The URL** (route `validateSearch` + `useSearch`/`navigate`) | Tasks `?status=todo&label=infra&sort=due&view=board` |
| Is a **preference** that should survive reload | Zustand store with `persist` | theme, default project, collapsed rail |
| Is **runtime state shared across components** | Zustand store (no persist) | activity runs, palette open, quick-add draft |
| Is **ephemeral to one screen** | `useState` in the page/hook | row selection, dialog open |
| Is an **authoritative edit** (task title, status, membership in a project) | **The database** via `lib/data/` | a completed task; never only in localStorage |

**Why URL-first:** a URL is shareable, bookmarkable, refresh-safe — and it's
how an *agent* hands a user an answer ("here are your 7 overdue tasks" = a
link). If you can't paste your current view into Slack, the state is in the
wrong place.

---

## 5. Recipe A — new app (top-level surface)

1. **`lib/apps.ts`** — add an `AppDefinition` (id, label, description, icon,
   path, `status: "preview"` until it's real). This alone puts it in the
   rail, the breadcrumb, and the ⌘K palette (nav commands are generated from
   this file).
2. **`lib/route-meta.ts`** — breadcrumb label/icon for the path.
3. **`pages/<app>.tsx`** — the page. Keep it lean: state wiring + layout only.
4. **`router.tsx`** — register the route. If the page has shareable view
   state, add a Zod `validateSearch`.
5. **`components/<app>/`** — presentational pieces, one module per concern.

> Rail policy: the rail earns every item. New apps ship `status: "preview"`
> and unpinned; they're reachable via the ⌘K palette until real.

## 6. Recipe B — new sub-view

Same as Recipe A, but the entry goes in the parent's `subApps` array in
`lib/apps.ts` and the route path nests (e.g. `/tasks/today`). The rail flyout
and palette pick it up automatically.

Slice 1 sub-views: All tasks, Today, one Project view. Do not add boards,
timelines, or reports on this recipe until PROJECT-MEMORY says so.

## 7. Recipe C — new command / agent verb

Every action gets defined ONCE in the web registry **and** in
`packages/contracts` (params + result). Skeleton:

```ts
// lib/commands.ts  (apps/web after seed)
const completeTaskParams = z.object({
  taskIds: z.array(z.string()).min(1),
});

{
  id: "task.complete",            // stable, namespaced — future MCP tool name
  title: "Complete task",         // what the palette shows
  icon: CheckIcon,
  group: "Tasks",                 // Navigate | Tasks | Projects | Preferences
  keywords: "done finish close",
  paramsSchema: completeTaskParams,
  run: (ctx, params) => {
    const { taskIds } = completeTaskParams.parse(params);
    // Client-only? Update a store.
    // Durable? Call lib/data/ (Recipe E) AND start a visible activity run:
    useActivityStore.getState().startRun({
      commandId: "task.complete",
      title: "Completing 3 tasks…",
      result: "Done — Undo",
    });
  },
},
```

Rules:

- **UI calls `executeCommand("task.complete", ctx, { … })`** — the button is
  a thin trigger, the command owns the behavior.
- **Mutations are visible runs** in the activity store: the user sees what
  happened and can undo. Never mutate silently.
- `ctx.navigate` is injected by the caller — commands never import the router
  (prevents import cycles).
- Selection-scoped verbs (need `taskIds`) surface contextually (row menus,
  selection bar), not in the global palette — `paletteCommands()` filters
  them.
- **`run` never imports the Supabase client directly.** Commands call
  `lib/data/` functions.

## 8. Recipe D — feature component

1. **Check reuse first:** `components/ui/*` (Radix-backed primitives) and the
   building-blocks table in ARCHITECTURE.md. Extending an atom beats writing
   a sibling. Until blocks exist here, port them from CyranoAPP-Design /
   CyranoApp-AI-Production rather than rewriting.
2. Create `components/<feature>/<name>.tsx` — kebab-case file, one named
   export matching the file, explicit inline prop types, optional `className`
   merged via `cn()`.
3. **Atoms → composed:** shared fragments (status pills, label chips, due-date
   badges, action rows) live in a `-bits.tsx` module and get composed by the
   views, so views can't drift.
4. Style ONLY with design tokens — never hex. Both themes must work.
5. States are part of the component: hover, **visible focus**, active,
   disabled, selected + empty/loading/error where relevant. No hover-only
   actions; tap targets ≥ 44px on touch.
6. **Repeated items align.** Rows and cards in a list use fixed-height zones:
   `line-clamp-N` paired with a matching `min-h`, one-row chip lists, non-
   wrapping action rows. See DESIGN-GUIDELINES §6.
7. **No fetch inside presentational components.** Data comes in as props;
   mutations go through commands.

## 9. Recipe E — data access

1. Zod row/params/result schemas in `packages/contracts`. Share the same
   schema the command's `paramsSchema` uses (or a strict superset).
2. Add one typed function to `lib/data/<entity>.ts` (e.g. `listTasks`,
   `completeTasks`). It parses the response with the contract schema before
   returning — **no `any`, no raw rows escaping the data layer**.
3. Auth: the function assumes a signed-in session; unauthenticated → surface
   the auth gate, not a fake empty list.
4. Authorization is **RLS**, not `where user_id = …` alone. The policy is the
   boundary; the filter is an optimization.
5. Writes also insert an `activity_events` row (who/what/when) — that feeds
   the activity feed and undo.
6. Tests: a policy test proving another user's rows are invisible, plus a
   unit test of the data function with the client mocked.

## 10. Recipe F — schema migration

1. Migration lives in `supabase/migrations/` — **one owner** for schema, not
   scattered SQL.
2. Same migration: table + **RLS enabled + policies**. A table without
   policies does not merge.
3. `user_id` column + index on every user-owned table, even in single-user
   mode (team mode later is a policy change, not a migration).
4. Types come from contracts. **No `as any`.**
5. Soft-delete convention: `deleted_at timestamptz` — commands "delete" by
   setting it; a purge is a separate, explicit, gated action.

---

## 11. Definition of Done (every feature, no exceptions)

- [ ] `npm run check` green (typecheck, lint, tests — whatever the graph
      currently includes; never skip a gate that exists)
- [ ] **Tests written for the new behavior** — pure logic and commands always
      (colocated `*.test.ts`); data functions get policy + unit tests
- [ ] No new dependency — or the owner approved it (license allow-list) and
      THIRD-PARTY-NOTICES.md is updated in the same PR
- [ ] Actions are registry commands; no bespoke handlers for command-shaped work
- [ ] Shareable view state is in the URL; other state per the decision table
- [ ] Reused existing building blocks; new shared fragments extracted, not copied
- [ ] Tokens only (no hex); light **and** dark verified
- [ ] Responsive: works at 1440 / 1280 / 768 / 390; no hover-only actions;
      touch targets ≥ 44px
- [ ] Accessible to **WCAG 2.2 AA** (see ACCESSIBILITY.md)
- [ ] Mutations are visible, undoable runs; deletes are soft
- [ ] RLS policies + tests if it touches data
- [ ] File size within budget; no god file (CODING-GUIDELINES §5a)
- [ ] Docs updated in the same PR (ARCHITECTURE for new patterns, this file if
      the recipes change, GLOSSARY for new nouns, PROJECT-MEMORY for decisions)
- [ ] Depth matched the work (section 3) — Comprehensive not used for a typo
- [ ] Standard/Comprehensive: bolt plan was accepted before Construction
- [ ] Human corrections in this change became standing docs, not chat-only

---

## 12. Worked slice — capture → organize → finish (this repo's first train)

Build in this order, nothing skipped:

1. Shell + auth + theme (platform): rail, ⌘K palette, activity feed.
2. Schema migration (`projects`, `tasks`, `labels`, `task_labels`,
   `activity_events`) with RLS + policy tests.
3. Capture: `task.create` via ⌘K quick-add — two keystrokes to a saved task.
4. Organize: task list with URL-first filters (`status`, `label`, `project`,
   `sort`), status pills, label chips, `task.move` / `task.label` commands.
5. Finish: `task.complete` with visible run + undo; Today view.

Do not start recurring tasks, reminders, boards, or integrations in the same
PR train. Each of those is a new proposal against PROJECT-MEMORY.
