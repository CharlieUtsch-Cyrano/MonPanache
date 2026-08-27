import type { TaskStatus } from "@cyrano/task-manager-contracts";
import { BUCKETS, type MockTask, type TaskSource } from "@/lib/mock-tasks";
import { boardSlot, dueLabel } from "@/lib/schedule";

const SOURCE_LABELS: Record<TaskSource, string> = {
  manual: "Added manually",
  gmail: "From Gmail",
  zoom: "From a Zoom call",
};

const SLOT_LABELS: Record<string, string> = {
  p0: "Now",
  p1: "Today",
  p2: "This Week",
  p3: "Notes",
  later: "Later",
};

const STATUS_OPTIONS: Array<{ value: TaskStatus; label: string }> = [
  { value: "inbox", label: "Inbox" },
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
];

/** Right-side task detail panel, per the MonPanache design: schedule and
 * fields are editable; urgency is shown as derived from the schedule. */
export function TaskPanel({
  task,
  today,
  onClose,
  onMarkDone,
  onEdit,
}: {
  task: MockTask;
  today: Date;
  onClose: () => void;
  onMarkDone: (task: MockTask) => void;
  onEdit: (id: string, patch: Partial<MockTask>) => void;
}) {
  const slot = boardSlot(task, today);
  return (
    <aside
      aria-label="Task detail"
      className="flex w-88 shrink-0 flex-col border-l border-border-soft bg-surface"
    >
      <header className="flex items-center gap-2 border-b border-border-soft px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Task</h2>
        <span className="text-xs text-muted">{SOURCE_LABELS[task.source]}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="ml-auto flex size-7 items-center justify-center rounded-lg text-muted hover:bg-surface-2"
        >
          ✕
        </button>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <h3 className="text-base font-medium leading-6">{task.title}</h3>

        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2.5 text-sm">
          <span className="text-muted">Customer</span>
          <span>{task.customer ?? "Internal"}</span>

          <span className="text-muted">Project</span>
          <span>{task.project ?? "—"}</span>

          <label className="text-muted" htmlFor="task-due">
            Schedule
          </label>
          <div className="flex items-center gap-2">
            <input
              id="task-due"
              type="date"
              value={task.dueDate ?? ""}
              onChange={(event) =>
                onEdit(task.id, {
                  dueDate: event.target.value || undefined,
                })
              }
              className="rounded-lg border border-border bg-surface px-2 py-1 text-sm"
            />
            {task.dueDate ? (
              <span className="text-xs text-muted">
                {dueLabel(task.dueDate, today)}
              </span>
            ) : null}
          </div>

          <span className="text-muted">Urgency</span>
          <span className="font-medium">{SLOT_LABELS[slot]}</span>

          <label className="text-muted" htmlFor="task-status">
            Status
          </label>
          <select
            id="task-status"
            value={task.status}
            onChange={(event) =>
              onEdit(task.id, { status: event.target.value as TaskStatus })
            }
            className="rounded-lg border border-border bg-surface px-2 py-1 text-sm"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="text-muted" htmlFor="task-bucket">
            Bucket
          </label>
          <select
            id="task-bucket"
            value={task.bucket}
            onChange={(event) =>
              onEdit(task.id, { bucket: event.target.value })
            }
            className="rounded-lg border border-border bg-surface px-2 py-1 text-sm"
          >
            {BUCKETS.map((bucket) => (
              <option key={bucket} value={bucket}>
                {bucket}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs leading-4 text-muted">
          {task.dueDate
            ? "Urgency is set by the schedule — clear the date to place it manually."
            : "No schedule — urgency follows the manual priority."}
        </p>

        {task.excerpt ? (
          <figure className="rounded-xl bg-surface-2 p-3">
            <figcaption className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Context
            </figcaption>
            <blockquote className="text-sm italic leading-5 text-muted-foreground">
              {task.excerpt}
            </blockquote>
          </figure>
        ) : null}

        <button
          type="button"
          onClick={() => onMarkDone(task)}
          className="mt-auto rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Mark done
        </button>
      </div>
    </aside>
  );
}
