# Compliance

**Policy (revised 2026-08-26, approved by Charlie): tasks may carry short
excerpts of the communication they came from — with hard lines.**

The tool's job is understanding tasks in context, so a task created from an
email or a Zoom transcript may store a **short excerpt** of that source as
context, plus a link back to the original. The boundary:

- **Never PHI.** If a hospital call or email contains patient-related
  content, that content must not land in a task — the extraction step must
  drop it and the human review step is the backstop. PHI found anyway gets
  purged (explicit gated purge), and the incident noted in PROJECT-MEMORY.
- **Excerpts, not archives.** Store the sentences that explain the task,
  not the whole email or transcript. The system of record stays Gmail/Zoom;
  the task links back to it.
- **Never secrets.** API keys, passwords, and credentials do not belong in
  a task, comment, label, or excerpt — human-typed or extracted.

## Enforcement

- The extraction prompt excludes PHI and secrets by instruction; accepted
  suggestions pass through human review before reaching the board.
- Activity events and logs contain ids and titles; treat titles and
  excerpts as sensitive in any future export or integration.
- Purge path: soft delete is the default everywhere, but a compliance purge
  (hard delete of a row and its excerpt) is an explicit, gated action.

## If this tool ever holds regulated data

That is a deliberate future project: policy rewrite here, PROJECT-MEMORY
decision, and a security review — not a TODO on a feature PR.
