import type { TaskPriority } from "@cyrano/task-manager-contracts";
import type { MockTask } from "@/lib/mock-tasks";

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

/** Statuses that appear on the board. Done/cancelled live in history views. */
const OPEN_STATUSES = new Set(["inbox", "todo", "in_progress", "blocked"]);

/** Groups open tasks into the four urgency columns, preserving input order. */
export function groupTasksByPriority(
  tasks: MockTask[],
): Record<TaskPriority, MockTask[]> {
  const groups: Record<TaskPriority, MockTask[]> = {
    p0: [],
    p1: [],
    p2: [],
    p3: [],
  };
  for (const task of tasks) {
    if (OPEN_STATUSES.has(task.status)) {
      groups[task.priority].push(task);
    }
  }
  return groups;
}
