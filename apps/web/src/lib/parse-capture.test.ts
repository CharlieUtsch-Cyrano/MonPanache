import { describe, expect, it } from "vitest";
import { parseCapture } from "./parse-capture";

const WED = new Date(2026, 8, 9); // Wednesday 2026-09-09
const KNOWN = {
  buckets: ["Support", "Contract / billing"],
  customers: ["Mercy General", "Piedmont Health"],
};

describe("parseCapture", () => {
  it("parses priority, weekday, bucket, and customer tokens", () => {
    const parsed = parseCapture("send quote friday p1 #sup @mercy", WED, KNOWN);
    expect(parsed.title).toBe("send quote");
    expect(parsed.priority).toBe("p1");
    expect(parsed.dueDate).toBe("2026-09-11");
    expect(parsed.bucket).toBe("Support");
    expect(parsed.customer).toBe("Mercy General");
  });

  it("understands today and tomorrow", () => {
    expect(parseCapture("pay invoice today", WED, KNOWN).dueDate).toBe(
      "2026-09-09",
    );
    expect(parseCapture("pay invoice tomorrow", WED, KNOWN).dueDate).toBe(
      "2026-09-10",
    );
  });

  it("defaults to p2 with no tokens and keeps the title intact", () => {
    const parsed = parseCapture("write the FAQ draft", WED, KNOWN);
    expect(parsed.priority).toBe("p2");
    expect(parsed.dueDate).toBeUndefined();
    expect(parsed.title).toBe("write the FAQ draft");
    expect(parsed.readsAs).toContain("priority p2");
  });
});
