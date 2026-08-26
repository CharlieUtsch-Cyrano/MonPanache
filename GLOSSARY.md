# Glossary

One noun per concept. If you want a second name, you are describing a new
concept — or you are recreating the Tools-repo naming sprawl. Reviewers
reject PRs that introduce aliases.

| Say | Do not say | Meaning here |
| --- | --- | --- |
| **Task** | todo, item, ticket, card, action item | One actionable unit of work. Table: `tasks` |
| **Project** | board, workspace, folder, epic | A container of tasks with a goal. Table: `projects` |
| **Subtask** | checklist item, child ticket | A task whose `parent_id` points at another task. Same table |
| **Status** | column, stage, state (loose) | One of: `inbox`, `todo`, `in_progress`, `blocked`, `done`, `cancelled` |
| **Label** | tag, category, chip (the chip is UI) | Cross-cutting marker on tasks. Tables: `labels`, `task_labels` |
| **Priority** | urgency, severity | `p0`–`p3`, default `p2` |
| **View** | filter set, saved search, smart list | A named/shareable combination of URL filters (Today, Overdue) |
| **Due date** | deadline, ETA | The date a task should be finished. `due_at` |
| **Bucket** | category, type, area (loose) | The *type* of work a task is (recurring pattern) — distinct from Project (which effort) and Label (free tag). Taxonomy emerges from real use + backfill |
| **Source** | integration, channel, input | Where a task originated: `manual`, `gmail`, `zoom` — kept on the task with a link back |
| **Suggested task** | auto-task, AI task, draft | A task **proposed** by extraction, waiting in the review queue. Becomes a Task only when a human accepts it |
| **Customer** | client, account, tenant (that word is taken) | The external party a task relates to (e.g. a hospital). An attribute here, not a login boundary |
| **Activity event** | audit row, history, log entry (in UI say “activity”) | One recorded change. Table: `activity_events`; feeds the feed + undo |
| **Run** | job, spinner, toast-with-side-effects | A visible, undoable execution of a command in the activity store |
| **Command** | handler, onClick, RPC | Typed verb in the registry + contracts package (`task.create`) |
| **Data layer** | “the client”, api utils, helpers | `lib/data/` — the only module that touches Supabase |
| **Cyrano-Task-Manager** | the tracker, task app, TaskMaster | This repo / product |
| **Bolt** | sprint, stage, “just ship it” | One approved Construction slice: plan accepted, then implement + tests + DoD |
| **Construction gate** | approval theater | Human yes on the bolt plan before behavior-changing code. FEATURE-PLAYBOOK §3 |
| **Depth** | “always Comprehensive” | Minimal / Standard / Comprehensive — how much plan-and-gate the session uses |

When in doubt, add a row here in the same PR that introduces the term.
