# Security

Security posture for an internal tool with a real database. Lighter than
customer production, but the boundary rules are binding.

> **Backend note (2026-08-26):** the backend is an **Open** decision in
> PROJECT-MEMORY. Controls below are written against the proposed Supabase
> shape; whatever is chosen must provide the same guarantees (row security
> enforced server-side, no privileged key in the browser, policy tests).

## Threats we actually have

- Cross-user read/write if a table ships without RLS policies.
- The service key leaking into the web bundle (`VITE_*`) or git.
- Session tokens in logs or activity events.
- A "temporary" table created in the dashboard with RLS off.
- Pointing the app at a sibling repo's database by copy-pasting env values.

## Controls

1. **RLS on every table, in the creating migration.** A table without
   policies does not merge. Policies — not client filters — are the boundary.
2. **Anon key only in the browser.** The service key lives in local tooling
   and CI secrets. Nothing secret is ever `VITE_*`.
3. **Supabase Auth session** required for every data function. No hardcoded
   prototype login.
4. **Policy tests** in CI: user A cannot see or mutate user B's rows
   (FEATURE-PLAYBOOK Recipe E). Written even while the tool is single-user.
5. **Own database.** This app never holds credentials for Lab, Design, or
   Production systems.
6. **Soft deletes + activity events** give an audit trail and undo; purges
   are explicit and gated.
7. **No secrets in git** — env files are gitignored; add a leak scan to CI
   when the graph is wired.
8. **Dependency audit** in CI once packages are installed.

## Explicitly out of v1

- Enterprise IdP / SSO.
- Sharing sessions or cookies with any other Cyrano app.
- Public sharing links (a View URL is shareable *within* the app's auth,
  not anonymously — revisit deliberately if ever needed).
