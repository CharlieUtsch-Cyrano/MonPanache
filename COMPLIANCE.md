# Compliance

**Policy: this tool tracks the work; it does not store the work product.**

Tasks, projects, and comments are metadata about work — titles, statuses,
dates, links. The boundary:

- **Never paste PHI** or anything patient-related into a task. Cyrano's
  customer repos prohibit PHI; a task tracker is not an exception, it is the
  easiest place to leak it accidentally.
- **Never paste customer-confidential content** (contract terms, credentials,
  unreleased hospital material). Link to the system of record instead.
- **Never store secrets** (API keys, passwords) in a task, comment, or label.

If a task needs the sensitive thing to make sense, it links to where that
thing properly lives (the repo, the drive, the vault) — it does not copy it.

## Enforcement

- Onboarding note + this file.
- Activity events and logs contain ids and user-typed titles only — treat
  titles as potentially sensitive in any future export/integration.
- If sensitive data lands anyway: purge the row (explicit gated purge, not
  just soft delete) and note the incident in PROJECT-MEMORY.

## If this tool ever holds regulated data

That is a deliberate future project: policy rewrite here, PROJECT-MEMORY
decision, and a security review — not a TODO on a feature PR.
