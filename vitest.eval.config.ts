import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Tier 2 acceptance evals only (evals/README.md). `npm test` runs the unit
// suites; `npm run eval` runs this — CI runs it inside the Docker image.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./apps/web/src", import.meta.url)),
    },
  },
  test: {
    include: ["evals/**/*.eval.test.ts"],
  },
});
