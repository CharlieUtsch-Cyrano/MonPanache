import { describe, expect, it } from "vitest";
import { groupTasks } from "./group-tasks";
import type { MockTask } from "./mock-tasks";

const WED = new Date(2026, 8, 9); // Wednesday 2026-09-09

function task(overrides: Partial<MockTask> & Pick<MockTask, "id">): MockTask {
  return {
    title: "A task",
    bucket: "Support",
    source: "manual",
    priority: "p2",
    status: "todo",
    ...overrides,
  };
}

describe("groupTasks", () => {
  it("places unscheduled tasks by manual priority", () => {
    const { columns } = groupTasks(
      [task({ id: "a", priority: "p0" }), task({ id: "b", priority: "p3" })],
      WED,
    );
    expect(columns.p0.map((t) => t.id)).toEqual(["a"]);
    expect(columns.p3.map((t) => t.id)).toEqual(["b"]);
  });

  it("lets the schedule override manual priority", () => {
    const { columns } = groupTasks(
      [task({ id: "overdue", priority: "p3", dueDate: "2026-09-08" })],
      WED,
    );
    expect(columns.p0.map((t) => t.id)).toEqual(["overdue"]);
    expect(columns.p3).toEqual([]);
  });

  it("parks beyond-this-week tasks in later, soonest first", () => {
    const { later, columns } = groupTasks(
      [
        task({ id: "far", dueDate: "2026-09-30" }),
        task({ id: "near", dueDate: "2026-09-20" }),
      ],
      WED,
    );
    expect(later.map((t) => t.id)).toEqual(["near", "far"]);
    expect(columns.p2).toEqual([]);
  });

  it("keeps done and cancelled tasks off the board", () => {
    const { columns } = groupTasks(
      [
        task({ id: "done", priority: "p0", status: "done" }),
        task({ id: "open", priority: "p0", status: "blocked" }),
      ],
      WED,
    );
    expect(columns.p0.map((t) => t.id)).toEqual(["open"]);
  });
});
