import { useEffect, useState } from "react";
import { BoardColumn } from "@/components/board/board-column";
import { AppRail } from "@/components/shell/app-rail";
import { groupTasksByPriority, URGENCY_COLUMNS } from "@/lib/group-tasks";
import { MOCK_TASKS } from "@/lib/mock-tasks";

const COLUMN_ACCENTS: Record<string, string> = {
  p0: "bg-urgency-now",
  p1: "bg-urgency-today",
  p2: "bg-urgency-week",
  p3: "bg-urgency-note",
};

/**
 * Design pass 1: the urgency board with mock data. Theme lives in useState
 * for now; it moves to a persisted preference store with the real shell.
 */
export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const groups = groupTasksByPriority(MOCK_TASKS);

  return (
    <div className="flex h-full">
      <AppRail
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border-soft px-5 py-3">
          <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
          <p className="text-sm text-muted">
            Wednesday — mock data, design pass 1
          </p>
          <p className="ml-auto hidden text-sm text-muted md:block">
            Know what needs you now.
          </p>
        </header>
        <main className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4">
          {URGENCY_COLUMNS.map((column) => (
            <BoardColumn
              key={column.priority}
              label={column.label}
              hint={column.hint}
              accentClass={COLUMN_ACCENTS[column.priority] ?? "bg-muted"}
              tasks={groups[column.priority]}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
