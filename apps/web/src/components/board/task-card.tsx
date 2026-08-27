import { cn } from "@/lib/cn";
import type { MockTask, TaskSource } from "@/lib/mock-tasks";
import { daysUntil, dueLabel } from "@/lib/schedule";

const SOURCE_BADGES: Record<TaskSource, { glyph: string; label: string }> = {
  manual: { glyph: "✎", label: "Added manually" },
  gmail: { glyph: "G", label: "From Gmail" },
  zoom: { glyph: "Z", label: "From a Zoom call" },
};

const STATUS_PILLS: Partial<Record<MockTask["status"], string>> = {
  in_progress: "In progress",
  blocked: "Blocked",
};

/**
 * One task on the board, matching the design export: meta row is
 * [done circle][source circle][customer][due], then a two-line title,
 * then the chips row. Zones are fixed-height so sibling cards align.
 */
export function TaskCard({
  task,
  today,
  selected = false,
  onOpen,
  onMarkDone,
  className,
}: {
  task: MockTask;
  today: Date;
  selected?: boolean;
  onOpen: (task: MockTask) => void;
  onMarkDone: (task: MockTask) => void;
  className?: string;
}) {
  const source = SOURCE_BADGES[task.source];
  const statusPill = STATUS_PILLS[task.status];
  const overdue = task.dueDate ? daysUntil(task.dueDate, today) < 0 : false;
  const due = task.dueDate
    ? (task.dueTime ?? dueLabel(task.dueDate, today))
    : null;
  return (
    <article
      className={cn(
        "rounded-3xl border bg-surface p-3 shadow-xs",
        "transition-colors hover:border-border",
        selected ? "border-brand-ink" : "border-border-soft",
        className,
      )}
    >
      <div className="flex min-h-5 items-center gap-2">
        <button
          type="button"
          onClick={() => onMarkDone(task)}
          aria-label={`Mark done: ${task.title}`}
          title="Mark done"
          className="size-5 shrink-0 rounded-full border-[1.5px] border-border hover:border-success hover:bg-success/20"
        />
        <span
          role="img"
          aria-label={source.label}
          title={source.label}
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-muted-foreground"
        >
          {source.glyph}
        </span>
        <span className="truncate text-xs font-semibold">
          {task.customer ?? "Internal"}
        </span>
        {due ? (
          <span
            className={cn(
              "ml-auto shrink-0 whitespace-nowrap text-xs",
              overdue ? "font-semibold text-danger" : "text-muted",
            )}
          >
            {overdue && task.dueDate ? dueLabel(task.dueDate, today) : due}
          </span>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onOpen(task)}
        className="mt-1 line-clamp-2 min-h-[34px] w-full text-left text-xs font-medium leading-[17px] hover:text-brand-ink"
      >
        {task.title}
      </button>

      <div className="mt-1.5 flex min-h-6 flex-nowrap items-center gap-1.5 overflow-hidden">
        <span className="whitespace-nowrap rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
          {task.bucket}
        </span>
        {statusPill ? (
          <span
            className={cn(
              "whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium",
              task.status === "blocked"
                ? "bg-danger/10 text-danger"
                : "bg-success/10 text-success",
            )}
          >
            {statusPill}
          </span>
        ) : null}
      </div>
    </article>
  );
}
