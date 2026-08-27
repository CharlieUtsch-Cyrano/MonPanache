import type { TaskPriority } from "@cyrano/task-manager-contracts";
import type { MockTask } from "@/lib/mock-tasks";
import { boardSlot } from "@/lib/schedule";

/** Board columns are URGENCY, not status (PROJECT-MEMORY decision 10). */
export const URGENCY_COLUMNS: Array<{
  priority: TaskPriority;
  label: string;
  hint: string;
}> = [
  { priority: "p0", label: "Now", hint: "needs you immediately" },
  { priority: "p1", label: "Today", hint: "done by end of day" },
  { priority: "p2", label: "This Week", hint: "due in the coming days" },
  { priority: "p3", label: "Notes", hint: "worth remembering, not scheduled" },
];

/** Statuses that appear on the board. Done/cancelled live in the Done rail. */
const OPEN_STATUSES = new Set(["inbox", "todo", "in_progress", "blocked"]);

export type BoardGroups = {
  columns: Record<TaskPriority, MockTask[]>;
  /** Scheduled beyond this week — parked until their week arrives. */
  later: MockTask[];
};

/**
 * Places open tasks: the schedule decides the column (boardSlot); tasks due
 * beyond this week park in `later`, soonest first.
 */
export function groupTasks(tasks: MockTask[], today: Date): BoardGroups {
  const columns: Record<TaskPriority, MockTask[]> = {
    p0: [],
    p1: [],
    p2: [],
    p3: [],
  };
  const later: MockTask[] = [];
  for (const task of tasks) {
    if (!OPEN_STATUSES.has(task.status)) {
      continue;
    }
    const slot = boardSlot(task, today);
    if (slot === "later") {
      later.push(task);
    } else {
      columns[slot].push(task);
    }
  }
  later.sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
  return { columns, later };
}
