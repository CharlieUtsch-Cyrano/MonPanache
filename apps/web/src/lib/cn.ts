/**
 * Minimal class joiner for the mockup phase. Swapped for clsx +
 * tailwind-merge when the full component kit lands (ARCHITECTURE seam).
 */
export function cn(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
