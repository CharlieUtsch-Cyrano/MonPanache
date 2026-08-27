/**
 * Minimal left rail for the mockup phase: brand mark, board slot, theme
 * toggle. The full rail (pinned apps, flyouts, profile) ports later.
 */
export function AppRail({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}) {
  return (
    <nav
      aria-label="Primary"
      className="flex w-14 shrink-0 flex-col items-center gap-2 border-r border-border-soft bg-surface py-3"
    >
      <span
        title="MonPanache — know what needs you now"
        className="flex size-9 items-center justify-center rounded-xl bg-brand-dark text-sm font-bold text-white"
      >
        MP
      </span>
      <button
        type="button"
        aria-label="Board"
        aria-current="page"
        className="mt-2 flex size-9 items-center justify-center rounded-lg bg-surface-3 text-base"
      >
        ▦
      </button>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        className="mt-auto flex size-9 items-center justify-center rounded-lg text-base hover:bg-surface-2"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </nav>
  );
}
