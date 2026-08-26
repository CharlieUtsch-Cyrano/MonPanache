import { describe, expect, it } from "vitest";
import { TASK_STATUSES, taskStatusSchema } from "./task-status";

describe("taskStatusSchema", () => {
  it("accepts every locked status", () => {
    for (const status of TASK_STATUSES) {
      expect(taskStatusSchema.parse(status)).toBe(status);
    }
  });

  it("rejects statuses outside the locked taxonomy", () => {
    expect(taskStatusSchema.safeParse("archived").success).toBe(false);
    expect(taskStatusSchema.safeParse("").success).toBe(false);
  });

  it("locks the taxonomy at six statuses (PROJECT-MEMORY decision 8)", () => {
    expect(TASK_STATUSES).toHaveLength(6);
  });
});
