import { cn } from "@/lib/cn";

/** Collapsed section as a thin vertical strip (design: "Projects · 5"
 * written sideways with the section's dot). Click to expand. */
export function SideStrip({
  label,
  count,
  dotClass,
  onExpand,
}: {
  label: string;
  count: number;
  dotClass: string;
  onExpand: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`Show ${label} (${count})`}
      className="flex min-h-0 w-9 flex-col items-center gap-2 rounded-2xl bg-surface-2/60 py-3 hover:bg-surface-2"
    >
      <span
        aria-hidden
        className={cn("size-2 shrink-0 rounded-full", dotClass)}
      />
      <span
        className="text-xs font-medium text-muted-foreground"
        style={{ writingMode: "vertical-rl" }}
      >
        {label} · {count}
      </span>
    </button>
  );
}
