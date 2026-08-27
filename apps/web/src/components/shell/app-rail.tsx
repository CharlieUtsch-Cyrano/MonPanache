/**
 * Left rail, per the MonPanache design: logo, Board (live), Analysis and
 * Settings (placeholders until Bolt C), theme toggle. The full rail
 * behavior (flyouts, sign out) arrives with auth.
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
      <img
        src="/mp-logo.png"
        alt="MonPanache"
        title="MonPanache — know what needs you now"
        className="size-9 rounded-xl"
      />
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
        aria-label="Analysis (coming soon)"
        disabled
        title="Analysis — coming soon"
        className="flex size-9 items-center justify-center rounded-lg text-base text-muted opacity-50"
      >
        ◔
      </button>
      <button
        type="button"
        aria-label="Settings (coming soon)"
        disabled
        title="Settings — coming soon"
        className="flex size-9 items-center justify-center rounded-lg text-base text-muted opacity-50"
      >
        ⚙
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
