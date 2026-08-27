import type { ReactNode } from "react";

/** Collapsible right-rail section (Projects / Later / Done), per the
 * MonPanache design's collapse toggles. */
export function SideSection({
  title,
  count,
  collapsed,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className="flex min-h-0 flex-col rounded-2xl bg-surface-2/60 p-2"
    >
      <header className="flex items-center gap-2 px-2 py-1.5">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <span className="text-xs text-muted">{count}</span>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? `Show ${title}` : `Collapse ${title}`}
          className="ml-auto flex size-6 items-center justify-center rounded-md text-xs text-muted hover:bg-surface-2"
        >
          {collapsed ? "▸" : "▾"}
        </button>
      </header>
      {collapsed ? null : (
        <div className="flex min-h-0 flex-col gap-2 overflow-y-auto p-1">
          {children}
        </div>
      )}
    </section>
  );
}
