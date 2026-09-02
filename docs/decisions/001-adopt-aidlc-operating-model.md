# 001 — Adopt the AIDLC operating model

**Date:** 2026-09-02 · **Status:** accepted

## Context

The charter operating system (~1,400 lines of advisory prose across 13 root
docs: FEATURE-PLAYBOOK, guidelines, PROJECT-MEMORY et al.) had no
enforcement — a session could ignore it, and did: the shipped `styles.css`
silently overwrote the locked palette decision. Cyrano-AI-OS proved the
AIDLC model: enforced gates instead of advisory rules.

## Decision

This repo runs on the AI Development Lifecycle model ported from
Cyrano-AI-OS: tickets are context packets and the agent's prompt; every
ticket branch writes its eval before the implementation; CI runs evals in
Docker; humans gate twice (ticket Ready, PR approved) and machines gate
everything in between; context files are code and ship via PR. The charter
docs are deleted; their settled calls live on as records 002–013.

## Consequences / revisit when

All process changes go through PRs to CLAUDE.md, skills, and templates.
House rules stay in Cyrano-AI-OS (`dotfiles/claude/`), not forked here.
Revisit at each milestone retro: rules that didn't earn their place get
deleted.
