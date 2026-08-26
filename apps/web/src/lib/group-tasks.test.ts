import { describe, expect, it } from "vitest";
import { groupTasksByPriority } from "./group-tasks";
import type { MockTask } from "./mock-tasks";

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

describe("groupTasksByPriority", () => {
  it("groups open tasks under their priority", () => {
    const groups = groupTasksByPriority([
      task({ id: "a", priority: "p0" }),
      task({ id: "b", priority: "p2" }),
      task({ id: "c", priority: "p2" }),
    ]);
    expect(groups.p0.map((t) => t.id)).toEqual(["a"]);
    expect(groups.p2.map((t) => t.id)).toEqual(["b", "c"]);
  });

  it("always returns all four columns, even when empty", () => {
    const groups = groupTasksByPriority([]);
    expect(Object.keys(groups).sort()).toEqual(["p0", "p1", "p2", "p3"]);
    expect(groups.p1).toEqual([]);
  });

  it("keeps done and cancelled tasks off the board", () => {
    const groups = groupTasksByPriority([
      task({ id: "done", priority: "p0", status: "done" }),
      task({ id: "gone", priority: "p0", status: "cancelled" }),
      task({ id: "open", priority: "p0", status: "blocked" }),
    ]);
    expect(groups.p0.map((t) => t.id)).toEqual(["open"]);
  });
});
