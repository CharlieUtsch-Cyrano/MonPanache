import { describe, expect, it } from "vitest";
import {
  DEFAULT_TASK_PRIORITY,
  TASK_PRIORITIES,
  taskPrioritySchema,
} from "./task-priority";

describe("taskPrioritySchema", () => {
  it("accepts every locked priority", () => {
    for (const priority of TASK_PRIORITIES) {
      expect(taskPrioritySchema.parse(priority)).toBe(priority);
    }
  });

  it("rejects priorities outside the locked taxonomy", () => {
    expect(taskPrioritySchema.safeParse("p4").success).toBe(false);
    expect(taskPrioritySchema.safeParse("high").success).toBe(false);
  });

  it("defaults to p2 (PROJECT-MEMORY decision 8)", () => {
    expect(DEFAULT_TASK_PRIORITY).toBe("p2");
  });
});
