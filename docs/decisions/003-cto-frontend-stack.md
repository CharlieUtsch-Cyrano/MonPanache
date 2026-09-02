# 003 — CTO frontend stack

**Date:** 2026-08-26 · **Status:** accepted

## Context

The frontend stack needed locking before the first UI code. The same stack
already runs CyranoApp-AI-Production and CyranoAPP-Design, so patterns,
components, and muscle memory port directly.

## Decision

React 19 · TypeScript strict · Vite · Tailwind v4 · TanStack Router ·
Zustand · Radix · Zod, with Biome for lint/format and Vitest for tests.
npm workspaces: `apps/web` (the SPA) + `packages/contracts` (shared Zod
schemas).

## Consequences / revisit when

New dependencies still need owner approval and a permissive license
(decision 012). Revisit a stack element only when a ticket demonstrates it
blocking the work — not for novelty.
