# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` contains the Next.js App Router routes and layouts, including route groups such as `(home)`, `(auth)`, and `(studio)`.
- `src/modules/` holds feature-oriented code. Keep UI, server procedures, and view composition inside the relevant module, for example `src/modules/studio/...`.
- Shared utilities live in `src/lib/`, `shadcnUI` components in `src/components/ui`, `TRPC` [TRPC Documentation](https://trpc.io/docs/) in `src/trpc/`, and finally the database files (NOT information) live in `src/db/`.
- Static assets belong in `public/`; documentation and screenshots live in `docs/`.
- Scripts such as database seeding belong in `src/scripts/`.

## Build, Test, and Development Commands

- `npm run dev` starts the Next.js dev server.
- `npm run dev:all` runs the app plus the ngrok webhook tunnel; it expects `ngrok` to be installed.
- `npm run build` creates a production build.
- `npm run start` serves the production build locally.
- `npm run lint` runs ESLint using `next/core-web-vitals` and `next/typescript`.

## Coding Style & Naming Conventions

- Use TypeScript and React with strict typing enabled.
- Follow the existing file style in each module; keep imports grouped, keep components small, and prefer feature-local code over shared abstractions unless reuse is clear.
- Use the `@/` path alias for imports from `src/`.
- Name React components and files in `PascalCase` when they export components, and use descriptive route or feature names elsewhere.
- Match the surrounding indentation and formatting in touched files, then rely on `npm run lint` to catch style issues.

## Testing Guidelines

- No dedicated test runner is configured yet.
- Use `npm run lint` and `npm run build` as the baseline verification before opening a change.
- If you add tests later, keep them next to the feature they cover or in a dedicated `tests/` area, and use clear names such as `video-player.test.tsx`.

## Commit & Pull Request Guidelines

- DO NOT commit/push without the user's approval. When you finish the task, at the end of the message say what commit message is better for the changes.
- Recent commit history uses short, lowercase, imperative messages, often describing the user-visible change directly.
- Keep commits focused and specific, for example `add video upload validation`.
- Pull requests should explain what changed, why it changed, and how it was verified.
- Include screenshots or screen recordings for UI changes, and link related issues or follow-up work when applicable.

## Security & Configuration Tips

- Store local secrets in `.env.local`; use `.env.example` as the template for required variables.
- Do not commit API keys, webhook secrets, or database credentials.
