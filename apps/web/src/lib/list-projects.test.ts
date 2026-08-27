import { describe, expect, it } from "vitest";
import { listProjects } from "./list-projects";
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

describe("listProjects", () => {
  it("counts tasks per project, most active first", () => {
    const projects = listProjects([
      task({ id: "a", project: "Renewals" }),
      task({ id: "b", project: "Renewals" }),
      task({ id: "c", project: "Demo" }),
      task({ id: "d" }),
    ]);
    expect(projects).toEqual([
      { name: "Renewals", count: 2 },
      { name: "Demo", count: 1 },
    ]);
  });

  it("breaks count ties alphabetically", () => {
    const projects = listProjects([
      task({ id: "a", project: "Zulu" }),
      task({ id: "b", project: "Alpha" }),
    ]);
    expect(projects.map((p) => p.name)).toEqual(["Alpha", "Zulu"]);
  });

  it("returns empty for tasks without projects", () => {
    expect(listProjects([task({ id: "a" })])).toEqual([]);
  });
});
