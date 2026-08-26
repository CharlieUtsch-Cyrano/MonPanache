# Third-party notices

License inventory. Update in the **same PR** that adds a dependency.
Until packages are installed, this lists the **intended** stack. Empty
`license` means "not installed yet — do not import."

| Package | Role | License | Notes |
| --- | --- | --- | --- |
| react / react-dom | web | MIT | 19.x |
| typescript | all | Apache-2.0 | strict |
| vite | web | MIT | |
| tailwindcss | web | MIT | v4 |
| @tanstack/react-router | web | MIT | |
| zustand | web | MIT | |
| zod | contracts / web | MIT | |
| @supabase/supabase-js | data layer only | MIT | imported only in `lib/data/` |
| vitest | test | MIT | |
| biome | lint/format | MIT / Apache-2.0 | |

Rejected classes: GPL, LGPL, AGPL, MPL, SSPL, BSL, Elastic, non-commercial.
