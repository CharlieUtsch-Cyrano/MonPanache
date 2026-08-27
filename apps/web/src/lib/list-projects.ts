import type { MockTask } from "@/lib/mock-tasks";

export type ProjectSummary = { name: string; count: number };

/**
 * Distinct projects among the given tasks with open-task counts, ordered by
 * count (ties alphabetical). Tasks without a project are not counted — the
 * board's "All tasks" entry covers them.
 */
export function listProjects(tasks: MockTask[]): ProjectSummary[] {
  const counts = new Map<string, number>();
  for (const task of tasks) {
    if (task.project) {
      counts.set(task.project, (counts.get(task.project) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
