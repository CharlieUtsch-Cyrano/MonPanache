# Lanes

A **lane** is a product with its own repo and standards. A **branch** is an
environment of one product. Never use branches to mean one product vs
another.

## Map

| Lane | Git repo | Runs on | Standard |
| --- | --- | --- | --- |
| Customer product | `CyranoApp-AI-Production` | AWS | Production rules, tenancy, SLO |
| Lab (prototypes) | Cyrano AI Tools | Hostinger VPS + Supabase | Experiment speed |
| Design / reference | `CyranoAPP-Design` | Static, mocks | UI patterns, one-way port source |
| **Internal tools (this repo)** | `Cyrano-Task-Manager` | Static SPA + its **own** Supabase project | Framework-first, lighter ceremony |

## Lifecycle labels

`experiment` | `internal_tool` | `retired`

This repo is `internal_tool`. If it ever becomes customer-facing, that is a
graduation project with a PROJECT-MEMORY proposal — not a feature PR.

## Hard no

- Pointing this app at the Lab Supabase, the production RDS, or any sibling
  repo's database. Own repo, own database.
- Importing Tools / Design / Production code at runtime. Ports only.
- Managing customer deliverables *content* here (see COMPLIANCE.md) — this
  tool tracks the work, it does not store the work product.
- Deploying it inside another product's app "as a tab."

## Porting

UI patterns move **one way** from Design/Production into this repo, and only
when they satisfy FEATURE-PLAYBOOK's Definition of Done here. A port is a
copy that meets this repo's rules — not a git merge, not an npm dependency
on a sibling tree.
