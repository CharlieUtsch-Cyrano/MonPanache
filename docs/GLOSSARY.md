# Glossary

One noun per concept. If you want a second name, you are describing a new
concept — or you are recreating the Tools-repo naming sprawl. Reviewers
reject PRs that introduce aliases (REVIEW.md, compliance pass).

| Say | Do not say | Meaning here |
| --- | --- | --- |
| **Task** | todo, item, card, action item | One actionable unit of work. Table: `tasks` |
| **Project** | board, workspace, folder, epic | A container of tasks with a goal. Table: `projects` |
| **Subtask** | checklist item, child task | A task whose `parent_id` points at another task. Same table |
| **Status** | column, stage, state (loose) | One of: `inbox`, `todo`, `in_progress`, `blocked`, `done`, `cancelled` (decision 004) |
| **Label** | tag, category, chip (the chip is UI) | Cross-cutting marker on tasks. Tables: `labels`, `task_labels` |
| **Priority** | urgency, severity | `p0`–`p3`, default `p2` (decision 004) |
| **View** | filter set, saved search, smart list | A named/shareable combination of URL filters (Today, Overdue) |
| **Due date** | deadline, ETA | The date a task should be finished. `due_at` |
| **Bucket** | category, type, area (loose) | The *type* of work a task is (recurring pattern) — distinct from Project (which effort) and Label (free tag). Taxonomy emerges from real use + backfill |
| **Source** | integration, channel, input | Where a task originated: `manual`, `gmail`, `zoom` — kept on the task with a link back |
| **Suggested task** | auto-task, AI task, draft | A task **proposed** by extraction, waiting in the review queue. Becomes a Task only when a human accepts it (decision 011) |
| **Customer** | client, account, tenant (that word is taken) | The external party a task relates to (e.g. a hospital). An attribute here, not a login boundary |
| **Activity event** | audit row, history, log entry (in UI say "activity") | One recorded change. Table: `activity_events`; feeds the feed + undo |
| **Run** | job, spinner, toast-with-side-effects | A visible, undoable execution of a command in the activity store |
| **Command** | handler, onClick, RPC | Typed verb in the registry + contracts package (`task.create`) (decision 012) |
| **Data layer** | "the client", api utils, helpers | `lib/data/` — the only module that touches the backend client |
| **MonPanache** | Panache (superseded), the tracker, task app, CTM | The product **and** the repo (decision 006). Tagline: "Know what needs you now. Automate what repeats." |
| **Cyrano-Task-Manager** | — | Legacy repo name (secondary remote) and the npm package (`cyrano-task-manager`) |
| **Ticket** | issue (loose), story, task (that word is the product's) | The AIDLC context packet — a GitHub issue from the ticket template; the agent's prompt |
| **Eval** | acceptance test (loose), e2e | `evals/<issue#>_<slug>.eval.test.ts` — written before code, gates the merge |
| **Decision record** | ADR (fine informally), memory | One dated file in `docs/decisions/` per settled debate |

When in doubt, add a row here in the same PR that introduces the term.
