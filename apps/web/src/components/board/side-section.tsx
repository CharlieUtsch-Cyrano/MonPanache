import type { ReactNode } from "react";

/** Expanded side section (Projects / Later), matching the design: 300px
 * panel with dot + title + count + hint and a chevron collapse button. */
export function SideSection({
  title,
  count,
  hint,
  side,
  onCollapse,
  children,
}: {
  title: string;
  count: number;
  hint?: string;
  /** Which edge the section lives on — sets the chevron direction. */
  side: "left" | "right";
  onCollapse: () => void;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="flex w-[300px] shrink-0 flex-col rounded-2xl bg-surface-2/60 p-2"
    >
      <header className="flex items-center gap-2 px-2 py-1.5">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <span className="text-xs text-muted">{count}</span>
        {hint ? (
          <span className="ml-auto truncate text-[11px] text-muted">
            {hint}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onCollapse}
          aria-label={`Collapse ${title.toLowerCase()}`}
          title={`Collapse ${title.toLowerCase()}`}
          className={`flex size-5 shrink-0 items-center justify-center rounded-md text-xs text-muted hover:bg-surface-3 ${hint ? "" : "ml-auto"}`}
        >
          {side === "left" ? "«" : "»"}
        </button>
      </header>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-1">
        {children}
      </div>
    </section>
  );
}
