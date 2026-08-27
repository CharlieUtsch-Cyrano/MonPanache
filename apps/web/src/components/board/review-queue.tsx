import type { MockSuggestedTask, TaskSource } from "@/lib/mock-tasks";

const SOURCE_GLYPHS: Record<TaskSource, string> = {
  manual: "✎",
  gmail: "G",
  zoom: "Z",
};

/** Suggested tasks from extraction, per the MonPanache design: nothing
 * reaches the board until a human accepts it. */
export function ReviewQueue({
  suggested,
  onAccept,
  onDismiss,
  onClose,
}: {
  suggested: MockSuggestedTask[];
  onAccept: (suggestion: MockSuggestedTask) => void;
  onDismiss: (suggestion: MockSuggestedTask) => void;
  onClose: () => void;
}) {
  return (
    <aside
      aria-label="Review queue"
      className="flex w-90 shrink-0 flex-col border-l border-border-soft bg-surface"
    >
      <header className="flex items-center gap-2 border-b border-border-soft px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">Review queue</h2>
        <span className="text-xs text-muted">{suggested.length}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="ml-auto flex size-7 items-center justify-center rounded-lg text-muted hover:bg-surface-2"
        >
          ✕
        </button>
      </header>
      <p className="border-b border-border-soft px-4 py-2.5 text-xs leading-4 text-muted">
        Proposed by extraction from Gmail and Zoom. Nothing reaches the board
        until you accept it.
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
        {suggested.map((suggestion) => (
          <article
            key={suggestion.id}
            className="rounded-xl border border-border-soft bg-surface-2/60 p-3"
          >
            <p className="text-[11px] text-muted">
              {SOURCE_GLYPHS[suggestion.source]} {suggestion.sourceLine}
            </p>
            <h3 className="mt-1 text-sm font-medium leading-5">
              {suggestion.title}
            </h3>
            {suggestion.excerpt ? (
              <blockquote className="mt-1.5 border-l-2 border-border pl-2 text-xs italic leading-4 text-muted-foreground">
                {suggestion.excerpt}
              </blockquote>
            ) : null}
            <div className="mt-2 flex flex-nowrap items-center gap-1.5 overflow-hidden">
              <span className="whitespace-nowrap rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
                {suggestion.bucket}
              </span>
              {suggestion.customer ? (
                <span className="truncate text-[11px] text-brand-ink">
                  {suggestion.customer}
                </span>
              ) : null}
            </div>
            <div className="mt-2.5 flex gap-2">
              <button
                type="button"
                onClick={() => onAccept(suggestion)}
                className="flex-1 rounded-lg bg-primary px-2 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => onDismiss(suggestion)}
                className="flex-1 rounded-lg bg-surface-2 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface-3"
              >
                Dismiss
              </button>
            </div>
          </article>
        ))}
        {suggested.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border-soft p-6 text-center">
            <p className="text-sm font-medium">All caught up</p>
            <p className="mt-1 text-xs text-muted">
              New suggestions land here as calls and email come in.
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
