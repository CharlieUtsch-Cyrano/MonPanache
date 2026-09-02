#!/usr/bin/env node
// PreToolUse guard: evals are append-mostly (evals/README.md). New eval files
// are allowed; Edit/Write against a git-tracked evals/*.eval.test.ts is
// blocked (exit 2) so weakening an eval requires a human PR review, not a
// session. Guards the Edit/Write tools only — CODEOWNERS remains the boundary.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0); // unparseable input must not wedge every edit
}

const filePath = input?.tool_input?.file_path;
const projectDir =
  process.env.CLAUDE_PROJECT_DIR || input?.cwd || process.cwd();
if (!filePath) process.exit(0);

const rel = path.relative(path.resolve(projectDir), path.resolve(filePath));
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0);

const parts = rel.split(path.sep);
const first = process.platform === "win32" ? parts[0].toLowerCase() : parts[0];
if (first !== "evals" || !/\.eval\.test\.ts$/i.test(rel)) process.exit(0);

const gitPath = parts.join("/");
let tracked;
try {
  execFileSync("git", ["ls-files", "--error-unmatch", "--", gitPath], {
    cwd: projectDir,
    stdio: "ignore",
  });
  tracked = true;
} catch (err) {
  // exit 1 = untracked; anything else = git unavailable — fail closed.
  tracked = err?.status === 1 ? false : existsSync(filePath);
}
if (!tracked) process.exit(0);

process.stderr.write(
  `BLOCKED: ${gitPath} is an existing, git-tracked eval. Evals are ` +
    `append-mostly: add new eval files freely, but changing an existing one ` +
    `needs tech-lead sign-off via PR review (evals/README.md rule 3). If you ` +
    `believe the eval itself is wrong, stop and say so — do not edit it.\n`,
);
process.exit(2);
