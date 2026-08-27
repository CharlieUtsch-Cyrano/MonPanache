import { useEffect, useMemo, useState } from "react";
import { BoardColumn } from "@/components/board/board-column";
import { ProjectPanel } from "@/components/board/project-panel";
import { nextStep, ProjectsSection } from "@/components/board/projects-section";
import { ReviewQueue } from "@/components/board/review-queue";
import { SideSection } from "@/components/board/side-section";
import { TaskCard } from "@/components/board/task-card";
import { TaskPanel } from "@/components/board/task-panel";
import { QuickAdd } from "@/components/capture/quick-add";
import { AppRail } from "@/components/shell/app-rail";
import { groupTasks, URGENCY_COLUMNS } from "@/lib/group-tasks";
import type {
  MockProject,
  MockSuggestedTask,
  MockTask,
} from "@/lib/mock-tasks";
import {
  BUCKETS,
  MOCK_PROJECTS,
  MOCK_SUGGESTED,
  MOCK_TASKS,
} from "@/lib/mock-tasks";
import { parseCapture } from "@/lib/parse-capture";

const COLUMN_ACCENTS: Record<string, string> = {
  p0: "bg-urgency-now",
  p1: "bg-urgency-today",
  p2: "bg-urgency-week",
  p3: "bg-urgency-note",
};

type Panel =
  | { type: "task"; id: string }
  | { type: "project"; id: string }
  | { type: "queue" }
  | null;

const LISTEN_SAMPLE =
  "call Piedmont about the caption timeline tomorrow p1 @piedmont";

/**
 * Design pass 3 — the full MonPanache Task Board design: schedule-derived
 * urgency, Projects with step outlines pushed onto the board, Later
 * parking, Done with Reopen, the Review queue, and capture with a live
 * "Reads as" interpretation. All state is ephemeral in the mock phase;
 * mutations become commands and filters move to the URL with the shell.
 */
export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [tasks, setTasks] = useState<MockTask[]>(MOCK_TASKS);
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS);
  const [suggested, setSuggested] =
    useState<MockSuggestedTask[]>(MOCK_SUGGESTED);
  const [pushedStepIds, setPushedStepIds] = useState<ReadonlySet<string>>(
    new Set(),
  );
  const [panel, setPanel] = useState<Panel>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [capture, setCapture] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [lastDone, setLastDone] = useState<MockTask | null>(null);

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const { columns, later } = groupTasks(tasks, today);
  const done = tasks.filter((task) => task.status === "done");
  const customers = useMemo(
    () => [
      ...new Set(tasks.map((t) => t.customer).filter((c): c is string => !!c)),
    ],
    [tasks],
  );
  const parsed =
    capture !== null && capture.trim().length > 0
      ? parseCapture(capture, today, { buckets: BUCKETS, customers })
      : null;

  const editTask = (id: string, patch: Partial<MockTask>) =>
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...patch } : task)),
    );

  const markDone = (task: MockTask) => {
    editTask(task.id, { status: "done" });
    setLastDone(task);
    if (panel?.type === "task" && panel.id === task.id) {
      setPanel(null);
    }
  };

  const reopen = (task: MockTask) => editTask(task.id, { status: "todo" });

  const saveCapture = () => {
    if (!parsed || parsed.title.length === 0) {
      return;
    }
    setTasks((current) => [
      {
        id: `t-${Date.now()}`,
        title: parsed.title,
        customer: parsed.customer,
        bucket: parsed.bucket ?? "Internal ops",
        source: "manual",
        priority: parsed.priority,
        status: "todo",
        dueDate: parsed.dueDate,
      },
      ...current,
    ]);
    setCapture(null);
    setListening(false);
  };

  const acceptSuggestion = (suggestion: MockSuggestedTask) => {
    setTasks((current) => [
      { ...suggestion, status: "todo" satisfies MockTask["status"] },
      ...current,
    ]);
    setSuggested((current) => current.filter((s) => s.id !== suggestion.id));
  };

  const pushStep = (project: MockProject) => {
    const step = nextStep(project);
    if (!step || pushedStepIds.has(step.id)) {
      return;
    }
    setTasks((current) => [
      {
        id: `t-step-${step.id}`,
        title: step.title,
        project: project.name,
        bucket: project.defaultBucket,
        source: "manual",
        priority: "p1",
        status: "todo",
      },
      ...current,
    ]);
    setPushedStepIds(new Set([...pushedStepIds, step.id]));
  };

  const toggleStep = (projectId: string, stepId: string) =>
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              steps: project.steps.map((step) =>
                step.id === stepId ? { ...step, done: !step.done } : step,
              ),
            }
          : project,
      ),
    );

  const panelTask =
    panel?.type === "task"
      ? (tasks.find((task) => task.id === panel.id) ?? null)
      : null;
  const panelProject =
    panel?.type === "project"
      ? (projects.find((project) => project.id === panel.id) ?? null)
      : null;

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
          <p className="hidden text-sm text-muted lg:block">
            Know what needs you now.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCapture("");
                setListening(true);
              }}
              className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm font-medium text-brand-ink hover:bg-surface-3"
            >
              🎙 Log work
            </button>
            <button
              type="button"
              onClick={() => setCapture("")}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              ＋ New task
            </button>
            {suggested.length > 0 ? (
              <button
                type="button"
                onClick={() => setPanel({ type: "queue" })}
                className="flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/10 px-3 py-1.5 text-sm font-medium text-brand-ink hover:bg-accent/20"
              >
                Review
                <span className="flex size-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {suggested.length}
                </span>
              </button>
            ) : null}
          </div>
        </header>
        <main className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4">
          {URGENCY_COLUMNS.map((column) => (
            <BoardColumn
              key={column.priority}
              label={column.label}
              hint={column.hint}
              accentClass={COLUMN_ACCENTS[column.priority] ?? "bg-muted"}
              tasks={columns[column.priority]}
              today={today}
              onOpenTask={(task) => setPanel({ type: "task", id: task.id })}
              onMarkDone={markDone}
            />
          ))}
          <div className="flex w-72 shrink-0 flex-col gap-3">
            <SideSection
              title="Projects"
              count={projects.length}
              collapsed={collapsed.projects ?? false}
              onToggle={() =>
                setCollapsed((c) => ({ ...c, projects: !c.projects }))
              }
            >
              <ProjectsSection
                projects={projects}
                pushedStepIds={pushedStepIds}
                onOpenProject={(project) =>
                  setPanel({ type: "project", id: project.id })
                }
                onPushStep={pushStep}
              />
            </SideSection>
            <SideSection
              title="Later"
              count={later.length}
              collapsed={collapsed.later ?? false}
              onToggle={() => setCollapsed((c) => ({ ...c, later: !c.later }))}
            >
              {later.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  today={today}
                  onOpen={(t) => setPanel({ type: "task", id: t.id })}
                  onMarkDone={markDone}
                />
              ))}
              {later.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border-soft p-4 text-center text-xs text-muted">
                  Nothing scheduled out — set a due date on any task to park it
                  here.
                </p>
              ) : null}
            </SideSection>
            <SideSection
              title="Done"
              count={done.length}
              collapsed={collapsed.done ?? true}
              onToggle={() =>
                setCollapsed((c) => ({ ...c, done: !(c.done ?? true) }))
              }
            >
              {done.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 rounded-xl border border-border-soft bg-surface p-2.5"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-muted line-through">
                    {task.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => reopen(task)}
                    className="shrink-0 text-xs font-medium text-brand-ink hover:underline"
                  >
                    Reopen
                  </button>
                </div>
              ))}
              {done.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border-soft p-4 text-center text-xs text-muted">
                  Nothing completed yet — go knock something out.
                </p>
              ) : null}
            </SideSection>
          </div>
        </main>
      </div>
      {panelTask ? (
        <TaskPanel
          task={panelTask}
          today={today}
          onClose={() => setPanel(null)}
          onMarkDone={markDone}
          onEdit={editTask}
        />
      ) : null}
      {panelProject ? (
        <ProjectPanel
          project={panelProject}
          onClose={() => setPanel(null)}
          onToggleStep={toggleStep}
        />
      ) : null}
      {panel?.type === "queue" ? (
        <ReviewQueue
          suggested={suggested}
          onAccept={acceptSuggestion}
          onDismiss={(s) =>
            setSuggested((current) => current.filter((x) => x.id !== s.id))
          }
          onClose={() => setPanel(null)}
        />
      ) : null}
      {capture !== null ? (
        <QuickAdd
          text={capture}
          parsed={parsed}
          listening={listening}
          onText={(value) => {
            setCapture(value);
            setListening(false);
          }}
          onToggleListening={() => {
            // Mock voice capture: "stopping" drops the sample utterance in.
            if (listening) {
              setCapture(LISTEN_SAMPLE);
            }
            setListening(!listening);
          }}
          onSave={saveCapture}
          onCancel={() => {
            setCapture(null);
            setListening(false);
          }}
        />
      ) : null}
      {lastDone ? (
        <output className="fixed bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border-soft bg-surface px-4 py-2 text-sm shadow-lg">
          <span className="max-w-64 truncate">Done — {lastDone.title}</span>
          <button
            type="button"
            onClick={() => {
              reopen(lastDone);
              setLastDone(null);
            }}
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
