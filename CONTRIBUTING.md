# Contributing to NewTube

Start with [AGENTS.md](./AGENTS.md) for the full repository guide. This file is the short entry point for contributors.

## Before You Start

- Use Node.js or Bun locally; Bun is recommended by the project README.
- Copy environment values into `.env.local` from `.env.example`.
- Keep changes focused on one feature or fix at a time.

## Working Locally

- `npm run dev` starts the app.
- `npm run dev:all` starts the app and the webhook tunnel.
- `npm run lint` checks code style and framework rules.
- `npm run build` verifies the project builds cleanly.

## Code Changes

- Use TypeScript and follow the existing module structure under `src/app/`, `src/modules/`, `src/lib/`, and `src/db/`.
- Prefer feature-local code over new shared abstractions unless reuse is obvious.
- Use `@/` for imports from `src/`.
- Keep component and file names descriptive; React components should usually use `PascalCase`.

## Pull Requests

- Describe what changed, why it changed, and how you verified it.
- Include screenshots or short recordings for UI updates.
- Do not commit or push without explicit approval from me.
