import type { TaskPriority } from "@cyrano/task-manager-contracts";

/** Where a task lands on the board — a column, or parked in Later. */
export type BoardSlot = TaskPriority | "later";

const DAY_MS = 86_400_000;

function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

/** Whole days from `today` until `iso` (negative = overdue). */
export function daysUntil(iso: string, today: Date): number {
  return Math.round(
    (startOfDay(new Date(`${iso}T00:00:00`)) - startOfDay(today)) / DAY_MS,
  );
}

/** Days from `today` through Sunday (0 when today is Sunday). */
export function daysToEndOfWeek(today: Date): number {
  return (7 - today.getDay()) % 7;
}

/**
 * The design's core mechanic (MonPanache Task Board): a schedule OVERRIDES
 * manual priority. Overdue → Now; due today → Today; due this week → This
 * Week; due beyond → parked in Later. No date → the manual priority.
 */
export function boardSlot(
  task: { priority: TaskPriority; dueDate?: string },
  today: Date,
): BoardSlot {
  if (!task.dueDate) {
    return task.priority;
  }
  const days = daysUntil(task.dueDate, today);
  if (days < 0) {
    return "p0";
  }
  if (days === 0) {
    return "p1";
  }
  if (days <= daysToEndOfWeek(today)) {
    return "p2";
  }
  return "later";
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Human label for a due date: "overdue 2d", "today", "Thu", "Sep 12". */
export function dueLabel(iso: string, today: Date): string {
  const days = daysUntil(iso, today);
  if (days < 0) {
    return `overdue ${-days}d`;
  }
  if (days === 0) {
    return "today";
  }
  if (days === 1) {
    return "tomorrow";
  }
  const date = new Date(`${iso}T00:00:00`);
  if (days < 7) {
    return WEEKDAYS[date.getDay()] ?? iso;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** ISO date `days` from today (mock-data helper). */
export function isoAddDays(days: number, today: Date): string {
  const date = new Date(startOfDay(today) + days * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}
