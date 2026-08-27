import { useEffect, useState } from "react";
import { BoardColumn } from "@/components/board/board-column";
import { ProjectsSidebar } from "@/components/board/projects-sidebar";
import { TaskPanel } from "@/components/board/task-panel";
import { AppRail } from "@/components/shell/app-rail";
import { groupTasksByPriority, URGENCY_COLUMNS } from "@/lib/group-tasks";
import { listProjects } from "@/lib/list-projects";
import type { MockTask } from "@/lib/mock-tasks";
import { MOCK_TASKS } from "@/lib/mock-tasks";

const COLUMN_ACCENTS: Record<string, string> = {
  p0: "bg-urgency-now",
  p1: "bg-urgency-today",
  p2: "bg-urgency-week",
  p3: "bg-urgency-note",
};

/**
 * Design pass 2: the board plus the MonPanache design's upgrades —
 * projects sidebar, task detail panel, mark-done with undo toast. All
 * state is ephemeral useState in the mock phase; filters move to the URL
 * and mutations become commands when the real shell lands.
 */
export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [doneIds, setDoneIds] = useState<ReadonlySet<string>>(new Set());
  const [lastDone, setLastDone] = useState<MockTask | null>(null);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const visible = MOCK_TASKS.filter(
    (task) =>
      !doneIds.has(task.id) && (project === null || task.project === project),
  );
  const groups = groupTasksByPriority(visible);
  const openTask =
    openTaskId === null
      ? null
      : (visible.find((task) => task.id === openTaskId) ?? null);

  const markDone = (task: MockTask) => {
    setDoneIds(new Set([...doneIds, task.id]));
    setLastDone(task);
    if (openTaskId === task.id) {
      setOpenTaskId(null);
    }
  };

  const undoDone = () => {
    if (lastDone) {
      const next = new Set(doneIds);
      next.delete(lastDone.id);
      setDoneIds(next);
      setLastDone(null);
    }
  };

  return (
    <div className="flex h-full">
      <AppRail
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <ProjectsSidebar
        projects={listProjects(
          MOCK_TASKS.filter((task) => !doneIds.has(task.id)),
        )}
        selected={project}
        onSelect={setProject}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border-soft px-5 py-3">
          <h1 className="text-2xl font-semibold tracking-tight">Board</h1>
          <p className="text-sm text-muted">
            {project ?? "All tasks"} — mock data, design pass 2
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
              onOpenTask={(task) => setOpenTaskId(task.id)}
              onMarkDone={markDone}
            />
          ))}
        </main>
      </div>
      {openTask ? (
        <TaskPanel
          task={openTask}
          onClose={() => setOpenTaskId(null)}
          onMarkDone={markDone}
        />
      ) : null}
      {lastDone ? (
        <output className="fixed bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm shadow-lg">
          <span className="max-w-64 truncate">Done — {lastDone.title}</span>
          <button
            type="button"
            onClick={undoDone}
            className="font-semibold text-brand-ink hover:underline"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => setLastDone(null)}
            aria-label="Dismiss"
            className="text-muted hover:text-foreground"
          >
            ✕
          </button>
        </output>
      ) : null}
    </div>
  );
}
