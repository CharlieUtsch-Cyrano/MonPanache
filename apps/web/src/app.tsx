import { useEffect, useMemo, useState } from "react";
import { BoardColumn } from "@/components/board/board-column";
import { ProjectPanel } from "@/components/board/project-panel";
import { nextStep, ProjectsSection } from "@/components/board/projects-section";
import { ReviewQueue } from "@/components/board/review-queue";
import { SideSection } from "@/components/board/side-section";
import { SideStrip } from "@/components/board/side-strip";
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
import { boardSlot } from "@/lib/schedule";

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
  | { type: "done" }
  | null;

const LISTEN_SAMPLE =
  "call Piedmont about the caption timeline tomorrow p1 @piedmont";

const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * The MonPanache Task Board, matching the design export: three urgency
 * columns with Projects / Later / Notes collapsed into side strips,
 * header chips + date line, review pill, and capture with "Reads as".
 * All state is ephemeral in the mock phase; mutations become commands
 * and view state moves to the URL with the real shell.
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
  const [open, setOpen] = useState({
    projects: false,
    later: false,
    notes: false,
  });
  const [capture, setCapture] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [lastDone, setLastDone] = useState<MockTask | null>(null);
  const [doneToday, setDoneToday] = useState(0);
  const [dragId, setDragId] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCapture("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { columns, later } = groupTasks(tasks, today);
  const done = tasks.filter((task) => task.status === "done");
  const openCount = tasks.length - done.length;
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
    setDoneToday((count) => count + 1);
    if (panel?.type === "task" && panel.id === task.id) {
      setPanel(null);
    }
  };

  const reopen = (task: MockTask) => {
    editTask(task.id, { status: "todo" });
    setDoneToday((count) => Math.max(0, count - 1));
  };

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

  /** The design's drop semantics: moving across columns adopts that
   * column's priority and CLEARS the schedule (manual placement);
   * dropping on a card inserts before/after it. */
  const dropTask = (
    columnPriority: MockTask["priority"],
    target: MockTask | null,
    before: boolean,
  ) => {
    if (!dragId || dragId === target?.id) {
      setDragId(null);
      return;
    }
    setTasks((current) => {
      const dragged = current.find((task) => task.id === dragId);
      if (!dragged) {
        return current;
      }
      const movedAcross = boardSlot(dragged, today) !== columnPriority;
      const updated: MockTask = {
        ...dragged,
        priority: columnPriority,
        dueDate: movedAcross ? undefined : dragged.dueDate,
        dueTime: movedAcross ? undefined : dragged.dueTime,
      };
      const rest = current.filter((task) => task.id !== dragId);
      const index = target ? rest.findIndex((t) => t.id === target.id) : -1;
      if (index === -1) {
        rest.push(updated);
      } else {
        rest.splice(before ? index : index + 1, 0, updated);
      }
      return rest;
    });
    setDragId(null);
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
  const selectedTaskId = panel?.type === "task" ? panel.id : null;

  const notesColumn = URGENCY_COLUMNS[3];

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
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium">
            Open {openCount}
          </span>
          <button
            type="button"
            onClick={() =>
              setPanel(panel?.type === "done" ? null : { type: "done" })
            }
            className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium hover:bg-surface-3"
          >
            Done {done.length}
          </button>
          <p className="hidden text-sm text-muted md:block">
            {WEEKDAY[today.getDay()]} — {openCount} open · {doneToday} done
            today
          </p>
          <div className="ml-auto flex items-center gap-2">
            {suggested.length > 0 ? (
              <button
                type="button"
                onClick={() => setPanel({ type: "queue" })}
                className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand-ink hover:bg-brand/20"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {suggested.length} suggested — review
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setCapture("");
                setListening(true);
              }}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium hover:bg-surface-2"
            >
              🎙 Log work
            </button>
            <button
              type="button"
              onClick={() => setCapture("")}
              className="flex items-center gap-2 rounded-lg bg-brand-dark px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              ＋ New task
              <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-[10px]">
                ⌘K
              </kbd>
            </button>
          </div>
        </header>
        <main className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4">
          {open.projects ? (
            <SideSection
              title="Projects"
              count={projects.length}
              hint="internal, ongoing"
              side="left"
              onCollapse={() => setOpen((o) => ({ ...o, projects: false }))}
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
          ) : (
            <SideStrip
              label="Projects"
              count={projects.length}
              onExpand={() => setOpen((o) => ({ ...o, projects: true }))}
            />
          )}
          {URGENCY_COLUMNS.slice(0, 3).map((column) => (
            <BoardColumn
              key={column.priority}
              label={column.label}
              hint={column.hint}
              accentClass={COLUMN_ACCENTS[column.priority] ?? "bg-muted"}
              tasks={columns[column.priority]}
              today={today}
              selectedId={selectedTaskId}
              draggingId={dragId}
              onOpenTask={(task) => setPanel({ type: "task", id: task.id })}
              onMarkDone={markDone}
              onDragStart={(task) => setDragId(task.id)}
              onDragEnd={() => setDragId(null)}
              onDropTask={(target, before) =>
                dropTask(column.priority, target, before)
              }
            />
          ))}
          {open.notes ? (
            <BoardColumn
              label={notesColumn.label}
              hint={notesColumn.hint}
              accentClass={COLUMN_ACCENTS.p3 ?? "bg-muted"}
              tasks={columns.p3}
              today={today}
              selectedId={selectedTaskId}
              draggingId={dragId}
              onOpenTask={(task) => setPanel({ type: "task", id: task.id })}
              onMarkDone={markDone}
              onDragStart={(task) => setDragId(task.id)}
              onDragEnd={() => setDragId(null)}
              onDropTask={(target, before) => dropTask("p3", target, before)}
              onCollapse={() => setOpen((o) => ({ ...o, notes: false }))}
            />
          ) : null}
          {open.later ? (
            <SideSection
              title="Later"
              count={later.length}
              hint="scheduled out"
              side="right"
              onCollapse={() => setOpen((o) => ({ ...o, later: false }))}
            >
              {later.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  today={today}
                  selected={task.id === selectedTaskId}
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
          ) : null}
          <div className="ml-auto flex min-h-0 flex-col gap-2">
            {open.later ? null : (
              <SideStrip
                label="Later"
                count={later.length}
                fill
                onExpand={() => setOpen((o) => ({ ...o, later: true }))}
              />
            )}
            {open.notes ? null : (
              <SideStrip
                label="Notes"
                count={columns.p3.length}
                fill
                onExpand={() => setOpen((o) => ({ ...o, notes: true }))}
              />
            )}
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
      {panel?.type === "done" ? (
        <aside
          aria-label="Done"
          className="flex w-90 shrink-0 flex-col border-l border-border-soft bg-surface"
        >
          <header className="flex items-center gap-2 border-b border-border-soft px-4 py-3">
            <h2 className="text-sm font-semibold tracking-tight">Done</h2>
            <span className="text-xs text-muted">{done.length}</span>
            <button
              type="button"
              onClick={() => setPanel(null)}
              aria-label="Close panel"
              className="ml-auto flex size-7 items-center justify-center rounded-lg text-muted hover:bg-surface-2"
            >
              ✕
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
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
          </div>
        </aside>
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
