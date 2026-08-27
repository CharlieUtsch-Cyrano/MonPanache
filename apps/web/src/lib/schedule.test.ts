import { describe, expect, it } from "vitest";
import { boardSlot, daysUntil, dueLabel, isoAddDays } from "./schedule";

// A fixed Wednesday keeps end-of-week math deterministic.
const WED = new Date(2026, 8, 9); // 2026-09-09, a Wednesday

describe("boardSlot — schedule overrides manual priority", () => {
  it("overdue lands in Now regardless of priority", () => {
    expect(boardSlot({ priority: "p3", dueDate: "2026-09-08" }, WED)).toBe(
      "p0",
    );
  });

  it("due today lands in Today", () => {
    expect(boardSlot({ priority: "p3", dueDate: "2026-09-09" }, WED)).toBe(
      "p1",
    );
  });

  it("due within the week lands in This Week", () => {
    expect(boardSlot({ priority: "p0", dueDate: "2026-09-12" }, WED)).toBe(
      "p2",
    );
  });

  it("due beyond the week parks in Later", () => {
    expect(boardSlot({ priority: "p0", dueDate: "2026-09-20" }, WED)).toBe(
      "later",
    );
  });

  it("no date falls back to manual priority", () => {
    expect(boardSlot({ priority: "p2" }, WED)).toBe("p2");
  });
});

describe("dueLabel", () => {
  it("labels overdue, today, tomorrow, weekday, and far dates", () => {
    expect(dueLabel("2026-09-07", WED)).toBe("overdue 2d");
    expect(dueLabel("2026-09-09", WED)).toBe("today");
    expect(dueLabel("2026-09-10", WED)).toBe("tomorrow");
    expect(dueLabel("2026-09-11", WED)).toBe("Fri");
    expect(dueLabel("2026-10-02", WED)).toBe("Oct 2");
  });
});

describe("date helpers", () => {
  it("isoAddDays and daysUntil round-trip", () => {
    const iso = isoAddDays(5, WED);
    expect(daysUntil(iso, WED)).toBe(5);
  });
});
