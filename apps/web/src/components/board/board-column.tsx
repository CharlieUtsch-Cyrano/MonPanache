import { TaskCard } from "@/components/board/task-card";
import { cn } from "@/lib/cn";
import type { MockTask } from "@/lib/mock-tasks";

/** One urgency column: fixed header, scrolling card list. */
export function BoardColumn({
  label,
  hint,
  accentClass,
  tasks,
}: {
  label: string;
  hint: string;
  accentClass: string;
  tasks: MockTask[];
}) {
  return (
    <section
      aria-label={`${label} — ${tasks.length} tasks`}
      className="flex w-72 shrink-0 flex-col rounded-2xl bg-surface-2/60 p-2"
    >
      <header className="flex items-center gap-2 px-2 py-1.5">
        <span aria-hidden className={cn("size-2 rounded-full", accentClass)} />
        <h2 className="text-sm font-semibold tracking-tight">{label}</h2>
        <span className="text-xs text-muted">{tasks.length}</span>
        <span className="ml-auto truncate text-[11px] text-muted">{hint}</span>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border-soft p-4 text-center text-xs text-muted">
            Nothing here — enjoy it.
          </p>
        ) : null}
      </div>
    </section>
  );
}
