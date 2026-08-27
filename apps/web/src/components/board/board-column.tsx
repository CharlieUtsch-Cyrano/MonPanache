import { TaskCard } from "@/components/board/task-card";
import { cn } from "@/lib/cn";
import type { MockTask } from "@/lib/mock-tasks";

/** One urgency column: fixed header, scrolling card list. */
export function BoardColumn({
  label,
  hint,
  accentClass,
  tasks,
  today,
  selectedId,
  draggingId,
  onOpenTask,
  onMarkDone,
  onDragStart,
  onDragEnd,
  onDropTask,
}: {
  label: string;
  hint: string;
  accentClass: string;
  tasks: MockTask[];
  today: Date;
  selectedId?: string | null;
  draggingId?: string | null;
  onOpenTask: (task: MockTask) => void;
  onMarkDone: (task: MockTask) => void;
  onDragStart?: (task: MockTask) => void;
  onDragEnd?: () => void;
  /** Drop into the column body (append) or onto a card (insert). */
  onDropTask?: (target: MockTask | null, before: boolean) => void;
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
      {/* biome-ignore lint/a11y/noStaticElementInteractions: drop target only — keyboard users move tasks via the task panel's schedule/urgency fields */}
      <div
        className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-1"
        onDragOver={(event) => {
          if (onDropTask) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
          }
        }}
        onDrop={(event) => {
          if (onDropTask) {
            event.preventDefault();
            onDropTask(null, false);
          }
        }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            today={today}
            selected={task.id === selectedId}
            dragging={task.id === draggingId}
            onOpen={onOpenTask}
            onMarkDone={onMarkDone}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDropOnCard={onDropTask}
          />
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
