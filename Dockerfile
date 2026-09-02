# The one true environment: this image runs locally, in CI, and in cloud
# agents. "Works on my machine" dies here (AIDLC playbook, quality gates).
FROM node:22-slim

# node:22-slim ships without make; CI runs `docker run --rm app:ci make eval`.
RUN apt-get update \
    && apt-get install -y --no-install-recommends make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Workspace manifests first so `npm ci` caches across source-only changes.
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY packages/contracts/package.json packages/contracts/
RUN npm ci

COPY . .

CMD ["make", "eval"]
