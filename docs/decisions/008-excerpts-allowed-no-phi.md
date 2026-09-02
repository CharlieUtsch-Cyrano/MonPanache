# 008 — Excerpts allowed; the no-PHI line is hard

**Date:** 2026-08-26 · **Status:** accepted

## Context

Understanding a task requires context from the email or transcript it came
from, but Cyrano's customers are hospitals — patient-related content must
never land here.

## Decision

A task may store a **short excerpt** of its source (the sentences that
explain the task) plus a link back; the system of record stays Gmail/Zoom.
Hard lines: **never PHI** (extraction must drop it; human review is the
backstop; PHI found anyway gets an explicit gated purge and a note in
PROJECT_STATE), **never secrets** (keys, passwords, credentials — typed or
extracted), excerpts not archives. This extends to development: fixtures,
mock data, and eval inputs use invented customers and invented text only.

## Consequences / revisit when

Treat titles and excerpts as sensitive in any export or integration. If
this tool ever holds regulated data on purpose, that is a policy rewrite
with its own record and a security review — not a TODO on a feature PR.
