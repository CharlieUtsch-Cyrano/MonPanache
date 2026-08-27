import { cn } from "@/lib/cn";

/** Collapsed section as a thin vertical strip, matching the design:
 * 40px wide, teal dot, sideways 12px label. Click to expand. */
export function SideStrip({
  label,
  count,
  fill = false,
  onExpand,
}: {
  label: string;
  count: number;
  /** Right-edge strips stretch to share the full height (design flex:1). */
  fill?: boolean;
  onExpand: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`Show ${label} (${count})`}
      className={cn(
        "flex w-10 shrink-0 flex-col items-center gap-2 rounded-2xl bg-surface-2/60 py-3.5 text-muted hover:bg-surface-2",
        fill ? "flex-1" : "",
      )}
    >
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
      <span
        className="text-xs font-semibold tracking-wide"
        style={{ writingMode: "vertical-rl" }}
      >
        {label} · {count}
      </span>
    </button>
  );
}
