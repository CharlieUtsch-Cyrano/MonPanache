# The stable agent interface (AIDLC playbook): every venue — laptop, CI, cloud
# agent — drives the repo through these four targets. They wrap npm scripts so
# the underlying toolchain can evolve without retraining anyone.
# Windows without make: use the npm scripts directly (package.json).
.PHONY: dev lint test eval

dev:
	npm run dev

lint:
	npm run lint && npm run typecheck

test:
	npm run test

eval:
	npm run eval
