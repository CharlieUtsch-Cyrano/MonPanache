import type { MockProject } from "@/lib/mock-tasks";

/** Project detail panel, per the MonPanache design: notes, outline with
 * check-off steps, progress. Editing names/steps arrives with commands. */
export function ProjectPanel({
  project,
  onClose,
  onToggleStep,
}: {
  project: MockProject;
  onClose: () => void;
  onToggleStep: (projectId: string, stepId: string) => void;
}) {
  const doneCount = project.steps.filter((step) => step.done).length;
  return (
    <aside
      aria-label="Project detail"
      className="flex w-90 shrink-0 flex-col border-l border-border-soft bg-surface"
    >
      <header className="flex items-center gap-2 border-b border-border-soft px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Project</h2>
        <span className="text-xs text-muted">Internal project</span>
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
        <h3 className="text-base font-medium leading-6">{project.name}</h3>
        <p className="text-sm leading-5 text-muted-foreground">
          {project.notes}
        </p>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Progress
          </p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${Math.round((doneCount / project.steps.length) * 100)}%`,
              }}
            />
          </div>
          <p className="mt-1 text-xs text-muted">
            {doneCount} of {project.steps.length} steps
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Outline
          </p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {project.steps.map((step) => (
              <li key={step.id}>
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={step.done}
                    onChange={() => onToggleStep(project.id, step.id)}
                    className="mt-1 size-4 shrink-0 accent-(--success)"
                  />
                  <span
                    className={`text-sm leading-5 ${step.done ? "text-muted line-through" : ""}`}
                  >
                    {step.title}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <span className="text-muted">Default bucket</span>
          <span>{project.defaultBucket}</span>
        </div>
      </div>
    </aside>
  );
}
