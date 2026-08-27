import type { MockProject } from "@/lib/mock-tasks";

/** The next open step in a project's outline, or null when all done. */
export function nextStep(project: MockProject) {
  return project.steps.find((step) => !step.done) ?? null;
}

/** Project cards with the outline's next step and a push-to-board action,
 * per the MonPanache design's Projects section. */
export function ProjectsSection({
  projects,
  pushedStepIds,
  onOpenProject,
  onPushStep,
}: {
  projects: MockProject[];
  pushedStepIds: ReadonlySet<string>;
  onOpenProject: (project: MockProject) => void;
  onPushStep: (project: MockProject) => void;
}) {
  return (
    <>
      {projects.map((project) => {
        const step = nextStep(project);
        const doneCount = project.steps.filter((s) => s.done).length;
        return (
          <article
            key={project.id}
            className="rounded-xl border border-border-soft bg-surface p-3"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenProject(project)}
                className="min-w-0 flex-1 truncate text-left text-sm font-medium hover:text-brand-ink"
              >
                {project.name}
              </button>
              <span className="shrink-0 text-xs text-muted">
                {doneCount}/{project.steps.length}
              </span>
            </div>
            {step ? (
              <div className="mt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Next
                </p>
                <p className="mt-0.5 line-clamp-2 text-sm leading-5">
                  {step.title}
                </p>
                {pushedStepIds.has(step.id) ? (
                  <p className="mt-1.5 text-xs text-success">On the board ✓</p>
                ) : (
                  <button
                    type="button"
                    onClick={() => onPushStep(project)}
                    className="mt-1.5 rounded-lg bg-surface-2 px-2 py-1 text-xs font-medium text-brand-ink hover:bg-surface-3"
                  >
                    ＋ Add next step to board
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-2 text-xs text-muted">All steps done</p>
            )}
          </article>
        );
      })}
      {projects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-soft p-4 text-center text-xs text-muted">
          Nothing here — enjoy it.
        </p>
      ) : null}
    </>
  );
}
