import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Scaffold guard: the operating system's load-bearing files exist and keep
 * their contracts. Broke this? You probably renamed or deleted a gate —
 * that needs owner sign-off, not a quick fix here (evals/README.md rule 3).
 */
const root = fileURLToPath(new URL("..", import.meta.url));
const at = (rel: string) => path.join(root, rel);

const REQUIRED_FILES = [
  "CLAUDE.md",
  "PROJECT_STATE.md",
  "README.md",
  "REVIEW.md",
  "Makefile",
  "Dockerfile",
  ".github/workflows/gates.yml",
  ".github/CODEOWNERS",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/ticket.md",
  ".claude/settings.json",
  ".claude/hooks/protect-evals.mjs",
  ".claude/hooks/format-file.mjs",
  ".claude/agents/verifier.md",
  ".claude/skills/ship-a-feature/SKILL.md",
  "evals/README.md",
  "docs/GLOSSARY.md",
  "docs/TOOLS_INDEX.md",
  "docs/SETUP_CHECKLIST.md",
  "docs/decisions/000-template.md",
];

describe("operating-system scaffold", () => {
  it.each(REQUIRED_FILES)("%s exists", (rel) => {
    expect(existsSync(at(rel)), `${rel} is missing`).toBe(true);
  });

  it("CLAUDE.md stays a map, not an encyclopedia (≤ 150 lines)", () => {
    const lines = readFileSync(at("CLAUDE.md"), "utf8").split("\n").length;
    expect(lines).toBeLessThanOrEqual(150);
  });

  it("gates.yml keeps the job ids branch protection references", () => {
    const gates = readFileSync(at(".github/workflows/gates.yml"), "utf8");
    expect(gates).toMatch(/^ {2}lint-and-unit:$/m);
    expect(gates).toMatch(/^ {2}eval:$/m);
    expect(gates).toContain("docker build");
  });

  it("the Makefile keeps the four-target agent interface", () => {
    const makefile = readFileSync(at("Makefile"), "utf8");
    for (const target of ["dev:", "lint:", "test:", "eval:"]) {
      expect(makefile).toContain(target);
    }
  });

  it("the settled decisions 001–013 are on disk", () => {
    const names = readdirSync(at("docs/decisions"));
    for (let n = 1; n <= 13; n += 1) {
      const prefix = `${String(n).padStart(3, "0")}-`;
      expect(
        names.some((name) => name.startsWith(prefix)),
        `docs/decisions/${prefix}* is missing`,
      ).toBe(true);
    }
  });

  it("both hooks are wired in .claude/settings.json", () => {
    const settings = readFileSync(at(".claude/settings.json"), "utf8");
    expect(settings).toContain("protect-evals.mjs");
    expect(settings).toContain("format-file.mjs");
  });
});
