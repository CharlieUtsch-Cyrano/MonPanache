#!/usr/bin/env node
// PostToolUse: run Biome (check --write) on the file just edited, so format
// drift never accumulates between edits. Non-blocking — residual diagnostics
// stay CI's job (`make lint`); this only applies the safe fixes.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

let input;
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const filePath = input?.tool_input?.file_path;
const projectDir =
  process.env.CLAUDE_PROJECT_DIR || input?.cwd || process.cwd();
if (!filePath || !existsSync(filePath)) process.exit(0);

const rel = path.relative(path.resolve(projectDir), path.resolve(filePath));
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0);

// Repo-local Biome bin under the current node — no npx, no .cmd shims.
let biomeBin;
try {
  const requireFromRepo = createRequire(path.join(projectDir, "package.json"));
  biomeBin = requireFromRepo.resolve("@biomejs/biome/bin/biome");
} catch {
  process.exit(0); // node_modules not installed yet
}

try {
  execFileSync(
    process.execPath,
    [
      biomeBin,
      "check",
      "--write",
      "--files-ignore-unknown=true",
      "--no-errors-on-unmatched",
      filePath,
    ],
    { cwd: projectDir, stdio: "ignore" },
  );
} catch {
  // Unfixable diagnostics remain or Biome balked; safe fixes are already
  // written. Stay silent — mid-edit states shouldn't nag.
}
process.exit(0);
