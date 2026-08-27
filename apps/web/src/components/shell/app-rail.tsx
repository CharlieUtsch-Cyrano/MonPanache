/**
 * Left rail matching the design export: dark avatar circle, dark-filled
 * selected icon, Analysis and Settings placeholders, theme toggle at the
 * bottom. Sign-out and real navigation arrive with auth (Bolt C).
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
      className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-border-soft bg-surface py-3"
    >
      <span
        title="MonPanache — know what needs you now"
        className="flex size-9 items-center justify-center rounded-full bg-brand-dark text-xs font-bold text-white"
      >
        MP
      </span>
      <button
        type="button"
        aria-label="Board"
        aria-current="page"
        className="flex size-9 items-center justify-center rounded-xl bg-brand-dark text-base text-white"
      >
        ▦
      </button>
      <button
        type="button"
        aria-label="Analysis (coming soon)"
        disabled
        title="Analysis — coming soon"
        className="flex size-9 items-center justify-center rounded-xl text-base text-muted opacity-50"
      >
        ◔
      </button>
      <button
        type="button"
        aria-label="Settings (coming soon)"
        disabled
        title="Settings — coming soon"
        className="flex size-9 items-center justify-center rounded-xl text-base text-muted opacity-50"
      >
        ⚙
      </button>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        className="mt-auto flex size-9 items-center justify-center rounded-xl text-base hover:bg-surface-2"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </nav>
  );
}
