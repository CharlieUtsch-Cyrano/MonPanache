## Ticket

Closes #<!-- issue number. The diff should do what the ticket's intent says — and nothing more. -->

## Plan

<!-- The approved plan-mode plan, verbatim: files touched, order of work,
     risks, and what proves it works. Review checks the diff against this
     (REVIEW.md, compliance pass). "See ticket" is not a plan. -->

## Eval evidence

<!-- Link the CI run, or paste the local `make eval` output. Every acceptance
     criterion should be demonstrably met by evals/<issue#>_*.eval.test.ts. -->

## What was NOT done

<!-- The classic agent failure is what it skipped without telling you.
     Skipped edge cases, untested paths, open questions — say so, every PR. -->

-

## Checklist

- [ ] `PROJECT_STATE.md` updated in this PR
- [ ] `evals/` unchanged — or the change is legitimate and has owner sign-off
      (CODEOWNERS will request it)
- [ ] Scope creep spotted → filed as a new ticket, not expanded here
