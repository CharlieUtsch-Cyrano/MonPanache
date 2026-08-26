# supabase/

Schema owner. Migrations + RLS policies live in `migrations/` — no
dashboard-only edits.

Rules (FEATURE-PLAYBOOK Recipe F):

- Every table: RLS enabled + policies in the **same** migration that creates
  it. A table without policies does not merge.
- Every user-owned table: `user_id` (+ index), `created_at`, `updated_at`,
  `deleted_at` (soft delete).
- This is a **dedicated** Supabase project — never the Lab database.
