import { cn } from "@/lib/cn";
import type { MockTask, TaskSource } from "@/lib/mock-tasks";

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
 * One task on the board. Zones are fixed-height so sibling cards align
 * (DESIGN-GUIDELINES §6): meta row, two-line title slot, footer row.
 */
export function TaskCard({
  task,
  className,
}: {
  task: MockTask;
  className?: string;
}) {
  const source = SOURCE_BADGES[task.source];
  const statusPill = STATUS_PILLS[task.status];
  return (
    <article
      className={cn(
        "rounded-xl border border-border-soft bg-surface p-3 shadow-xs",
        "transition-colors hover:border-border",
        className,
      )}
    >
      <div className="flex min-h-5 items-center gap-2">
        <span
          role="img"
          aria-label={source.label}
          title={source.label}
          className="flex size-5 shrink-0 items-center justify-center rounded-md bg-surface-2 text-[10px] font-semibold text-muted-foreground"
        >
          {source.glyph}
        </span>
        <span className="truncate text-xs font-medium text-brand-ink">
          {task.customer ?? "Internal"}
        </span>
        {task.dueLabel ? (
          <span
            className={cn(
              "ml-auto shrink-0 whitespace-nowrap text-xs",
              task.overdue ? "font-semibold text-danger" : "text-muted",
            )}
          >
            {task.dueLabel}
          </span>
        ) : null}
      </div>

      <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-medium leading-5">
        {task.title}
      </h3>

      <div className="mt-2 flex min-h-6 flex-nowrap items-center gap-1.5 overflow-hidden">
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
