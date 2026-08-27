import type { TaskPriority } from "@cyrano/task-manager-contracts";
import { isoAddDays } from "@/lib/schedule";

export type ParsedCapture = {
  title: string;
  priority: TaskPriority;
  dueDate?: string;
  bucket?: string;
  customer?: string;
  /** The design's "Reads as" preview line. */
  readsAs: string;
};

const DAY_WORDS: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

function nextWeekday(target: number, today: Date): string {
  const delta = (target - today.getDay() + 7) % 7 || 7;
  return isoAddDays(delta, today);
}

/**
 * One input, no mode switch (DESIGN-GUIDELINES §6b): "send quote friday p1
 * #Support @Mercy" → title + schedule + priority + bucket + customer. The
 * interpretation is shown ("reads as"), never asked for.
 */
export function parseCapture(
  raw: string,
  today: Date,
  known: { buckets: string[]; customers: string[] },
): ParsedCapture {
  let priority: TaskPriority = "p2";
  let dueDate: string | undefined;
  let bucket: string | undefined;
  let customer: string | undefined;
  const words: string[] = [];

  for (const token of raw.trim().split(/\s+/)) {
    const lower = token.toLowerCase();
    const bare = lower.replace(/^[#@]/, "");
    if (/^p[0-3]$/.test(lower)) {
      priority = lower as TaskPriority;
    } else if (lower === "today") {
      dueDate = isoAddDays(0, today);
    } else if (lower === "tomorrow") {
      dueDate = isoAddDays(1, today);
    } else if (DAY_WORDS[bare.slice(0, 3)] !== undefined && bare.length <= 9) {
      const day = DAY_WORDS[bare.slice(0, 3)];
      if (day !== undefined && /^(sun|mon|tue|wed|thu|fri|sat)/.test(bare)) {
        dueDate = nextWeekday(day, today);
      } else {
        words.push(token);
      }
    } else if (token.startsWith("#")) {
      bucket =
        known.buckets.find((b) => b.toLowerCase().startsWith(bare)) ?? bare;
    } else if (token.startsWith("@")) {
      customer =
        known.customers.find((c) => c.toLowerCase().includes(bare)) ?? bare;
    } else {
      words.push(token);
    }
  }

  const title = words.join(" ");
  const parts = [
    dueDate ? `due ${dueDate}` : `priority ${priority}`,
    dueDate ? `(${priority} if date cleared)` : undefined,
    bucket ? `bucket ${bucket}` : undefined,
    customer ? `for ${customer}` : undefined,
  ].filter(Boolean);
  return {
    title,
    priority,
    dueDate,
    bucket,
    customer,
    readsAs: `${title || "…"} — ${parts.join(", ")}`,
  };
}
