import type { MockTask, TaskSource } from "@/lib/mock-tasks";

const SOURCE_LABELS: Record<TaskSource, string> = {
  manual: "Added manually",
  gmail: "From Gmail",
  zoom: "From a Zoom call",
};

const PRIORITY_LABELS: Record<MockTask["priority"], string> = {
  p0: "Now",
  p1: "Today",
  p2: "This Week",
  p3: "Note",
};

/** Right-side task detail panel, per the MonPanache design. Read-only in
 * the mock phase — editing arrives with commands + real data. */
export function TaskPanel({
  task,
  onClose,
  onMarkDone,
}: {
  task: MockTask;
  onClose: () => void;
  onMarkDone: (task: MockTask) => void;
}) {
  return (
    <aside
      aria-label="Task detail"
      className="flex w-80 shrink-0 flex-col border-l border-border-soft bg-surface"
    >
      <header className="flex items-center gap-2 border-b border-border-soft px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Task</h2>
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
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted">Urgency</dt>
          <dd className="font-medium">{PRIORITY_LABELS[task.priority]}</dd>
          <dt className="text-muted">Customer</dt>
          <dd>{task.customer ?? "Internal"}</dd>
          <dt className="text-muted">Project</dt>
          <dd>{task.project ?? "—"}</dd>
          <dt className="text-muted">Bucket</dt>
          <dd>{task.bucket}</dd>
          <dt className="text-muted">Due</dt>
          <dd className={task.overdue ? "font-semibold text-danger" : ""}>
            {task.dueLabel ?? "—"}
          </dd>
          <dt className="text-muted">Source</dt>
          <dd>{SOURCE_LABELS[task.source]}</dd>
        </dl>
        {task.excerpt ? (
          <figure className="rounded-xl bg-surface-2 p-3">
            <figcaption className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              From the source
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
