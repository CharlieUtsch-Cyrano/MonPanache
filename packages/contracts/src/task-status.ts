import { z } from "zod";

/**
 * Locked status taxonomy (PROJECT-MEMORY decision 8). The contract uses
 * these values; UI may render friendlier labels.
 */
export const TASK_STATUSES = [
  "inbox",
  "todo",
  "in_progress",
  "blocked",
  "done",
  "cancelled",
] as const;

export const taskStatusSchema = z.enum(TASK_STATUSES);

export type TaskStatus = z.infer<typeof taskStatusSchema>;
