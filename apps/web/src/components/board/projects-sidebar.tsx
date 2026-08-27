import { cn } from "@/lib/cn";
import type { ProjectSummary } from "@/lib/list-projects";

/** Collapsible project list, per the MonPanache design. */
export function ProjectsSidebar({
  projects,
  selected,
  onSelect,
}: {
  projects: ProjectSummary[];
  selected: string | null;
  onSelect: (project: string | null) => void;
}) {
  return (
    <aside
      aria-label="Projects"
      className="flex w-52 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-border-soft bg-surface px-2 py-3"
    >
      <h2 className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
        Projects
      </h2>
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={selected === null}
        className={cn(
          "flex items-center rounded-lg px-2 py-1.5 text-left text-sm",
          selected === null ? "bg-surface-3 font-medium" : "hover:bg-surface-2",
        )}
      >
        All tasks
      </button>
      {projects.map((project) => (
        <button
          key={project.name}
          type="button"
          onClick={() =>
            onSelect(selected === project.name ? null : project.name)
          }
          aria-pressed={selected === project.name}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm",
            selected === project.name
              ? "bg-surface-3 font-medium"
              : "hover:bg-surface-2",
          )}
        >
          <span className="min-w-0 flex-1 truncate">{project.name}</span>
          <span className="shrink-0 text-xs text-muted">{project.count}</span>
        </button>
      ))}
    </aside>
  );
}
