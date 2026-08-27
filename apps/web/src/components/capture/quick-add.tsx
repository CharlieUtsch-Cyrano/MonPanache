import { useState } from "react";
import type { ParsedCapture } from "@/lib/parse-capture";

/**
 * New-task capture, per the MonPanache design: one input, live "Reads as"
 * interpretation, and a mock Log-work voice mode (real speech capture
 * arrives with the platform; the pill demonstrates the interaction).
 */
export function QuickAdd({
  text,
  parsed,
  listening,
  onText,
  onToggleListening,
  onSave,
  onCancel,
}: {
  text: string;
  parsed: ParsedCapture | null;
  listening: boolean;
  onText: (value: string) => void;
  onToggleListening: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [touched, setTouched] = useState(false);
  const canSave = (parsed?.title.length ?? 0) > 0;
  return (
    <div
      role="dialog"
      aria-label="New task"
      className="fixed inset-0 z-10 flex items-start justify-center bg-black/30 pt-32"
    >
      <div className="w-full max-w-xl rounded-2xl border border-border-soft bg-surface p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight">New task</h2>
          <button
            type="button"
            onClick={onToggleListening}
            aria-pressed={listening}
            className="ml-auto rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-brand-ink hover:bg-surface-3"
          >
            {listening ? "◼ Stop" : "🎙 Log work"}
          </button>
        </div>
        {listening ? (
          <p className="mt-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-muted-foreground">
            Listening — speak naturally, it stops when you pause.
          </p>
        ) : null}
        <input
          // biome-ignore lint/a11y/noAutofocus: capture dialog exists to type into
          autoFocus
          value={text}
          onChange={(event) => {
            setTouched(true);
            onText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && canSave) {
              onSave();
            }
            if (event.key === "Escape") {
              onCancel();
            }
          }}
          placeholder='Try: "send Mercy the quote friday p1 #contract @mercy"'
          aria-label="Task"
          className="mt-3 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand-ink"
        />
        <p role="status" className="mt-2 min-h-4 text-xs text-muted">
          {touched && parsed ? `Reads as: ${parsed.readsAs}` : ""}
        </p>
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-surface-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
}
