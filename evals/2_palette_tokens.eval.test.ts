import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Ticket #2 / decision 007: the MonPanache palette is indigo + amber, and
 * amber — never red — means "needs you now". This suite reads the token
 * source so the palette cannot silently drift again (that drift is what
 * created the ticket).
 */
const root = fileURLToPath(new URL("..", import.meta.url));
const css = readFileSync(path.join(root, "apps/web/src/styles.css"), "utf8");

/** The declarations of one CSS block, e.g. block(":root"), block(".dark"). */
function block(selector: string): string {
  const matches = [
    ...css.matchAll(
      new RegExp(`^${selector.replace(".", "\\.")} \\{([^}]*)\\}`, "gms"),
    ),
  ];
  expect(matches.length, `no ${selector} block found`).toBeGreaterThan(0);
  return matches.map((m) => m[1]).join("\n");
}

/** The oklch hue of a custom property inside a block, in degrees. */
function oklchHue(blockCss: string, prop: string): number {
  const m = blockCss.match(
    new RegExp(`${prop}:\\s*oklch\\([\\d.]+ [\\d.]+ ([\\d.]+)\\)`),
  );
  expect(m, `${prop} is not a literal oklch() value`).not.toBeNull();
  return Number((m as RegExpMatchArray)[1]);
}

describe("criterion 1 — brand slots are the MonPanache indigos", () => {
  it("declares light indigo #818cf8 and deep indigo #312e81", () => {
    expect(css.toLowerCase()).toContain("#818cf8");
    expect(css.toLowerCase()).toContain("#312e81");
  });

  it.each(["00c4d3", "001e45", "Cyrano pair"])(
    "the design export's %s is gone",
    (relic) => {
      expect(css.toLowerCase()).not.toContain(relic.toLowerCase());
    },
  );
});

describe("criterion 2 — urgency mapping: amber=now · indigo=today · green=week · gray=note", () => {
  it.each([
    ["--color-urgency-now", "--accent"],
    ["--color-urgency-today", "--brand-ink"],
    ["--color-urgency-week", "--success"],
    ["--color-urgency-note", "--muted"],
  ])("%s maps to var(%s)", (token, target) => {
    expect(css).toMatch(new RegExp(`${token}:\\s*var\\(${target}\\)`));
  });

  it("red is no longer mapped to urgency-now (red = overdue only)", () => {
    expect(css).not.toMatch(/--color-urgency-now:\s*var\(--danger\)/);
  });

  it.each([":root", ".dark"])(
    "in %s, --accent is amber and --success is green",
    (theme) => {
      const b = block(theme);
      const amber = oklchHue(b, "--accent");
      expect(amber, "--accent hue outside the amber range").toBeGreaterThan(55);
      expect(amber, "--accent hue outside the amber range").toBeLessThan(90);
      const green = oklchHue(b, "--success");
      expect(green, "--success hue outside the green range").toBeGreaterThan(
        140,
      );
      expect(green, "--success hue outside the green range").toBeLessThan(170);
    },
  );

  it("brand-ink stays theme-adjusted: deep indigo on light, light indigo on dark", () => {
    expect(block(":root")).toMatch(/--brand-ink:\s*var\(--brand-secondary\)/);
    expect(block(".dark")).toMatch(/--brand-ink:\s*var\(--brand-primary\)/);
  });
});
