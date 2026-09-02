# Third-party notices

License inventory. Update in the **same PR** that adds a dependency
(decision 012, clause 6). Empty `license` means "not installed yet — do not
import."

| Package | Role | License | Notes |
| --- | --- | --- | --- |
| react / react-dom | web | MIT | 19.x |
| typescript | all | Apache-2.0 | strict |
| vite | web | MIT | |
| tailwindcss | web | MIT | v4 |
| @tanstack/react-router | web | MIT | approved, not yet installed (shell ticket) |
| zustand | web | MIT | approved, not yet installed (shell ticket) |
| zod | contracts / web | MIT | |
| (backend SDK) | data layer only | | pending decision 013 — do not install |
| vitest | test + evals | MIT | |
| biome | lint/format | MIT / Apache-2.0 | |
| @types/react / @types/react-dom / @types/node | dev types | MIT | tooling only |
| @vitejs/plugin-react | build | MIT | |
| @tailwindcss/vite | build | MIT | |
| husky | git hooks | MIT | |

Rejected classes: GPL, LGPL, AGPL, MPL, SSPL, BSL, Elastic, non-commercial.
