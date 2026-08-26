import { z } from "zod";

/** Locked priority taxonomy (PROJECT-MEMORY decision 8). */
export const TASK_PRIORITIES = ["p0", "p1", "p2", "p3"] as const;

export const taskPrioritySchema = z.enum(TASK_PRIORITIES);

export type TaskPriority = z.infer<typeof taskPrioritySchema>;

export const DEFAULT_TASK_PRIORITY: TaskPriority = "p2";
