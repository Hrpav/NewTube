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

## Overview

A YouTube clone built with **Next.js 15**, **React 19**, and **TypeScript**. Uses **tRPC v11** for type-safe API communication, **Drizzle ORM** with **Neon** (serverless PostgreSQL), **Mux** for video processing, **Clerk** for auth, and **Upstash Redis** for rate limiting.

## Routes (App Router)

| Route | Purpose |
|---|---|
| `/` | Home page with category filter carousel |
| `/studio` | Creator studio – video table with infinite scroll |
| `/studio/videos/[videoId]` | Edit video details (title, description, category, visibility) |
| `/sign-in`, `/sign-up` | Clerk auth pages |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in/Sign-up layouts
│   ├── (home)/             # Home page layout
│   ├── (studio)/           # Studio layout (protected by Clerk)
│   └── api/                # API routes
│       ├── trpc/[trpc]     # tRPC HTTP handler
│       ├── users/webhook   # Clerk user webhooks
│       └── videos/webhook  # Mux video webhooks
├── modules/                # Feature modules
│   ├── auth/ui/            # AuthButton component
│   ├── home/ui/            # HomeNavbar, HomeSidebar, CategoriesSection
│   ├── studio/ui/          # StudioNavbar, StudioSidebar, UploadModal
│   ├── studio/server/      # studio.getMany, studio.getOne procedures
│   ├── videos/ui/          # VideoPlayer, VideoThumbnail
│   ├── videos/server/      # videos.create, update, remove procedures
│   └── categories/server/  # categories.getMany procedure
├── components/             # Shared UI components (shadcn-based)
│   ├── ui/                 # 48 shadcn components
│   ├── filter-carousel.tsx # Category carousel
│   ├── infinite-scroll.tsx # Load-more with intersection observer
│   └── responsive-modal.tsx# Dialog/Drawer responsive switch
├── db/
│   ├── schema.ts           # users, categories, videos tables
│   └── index.ts            # Drizzle Neon client
├── trpc/
│   ├── init.ts             # tRPC setup, protectedProcedure with Clerk + rate limit
│   ├── client.tsx          # Client-side tRPC provider
│   ├── server.tsx          # Server-side hydration helpers
│   └── routers/_app.ts     # Router composition
├── lib/
│   ├── mux.ts              # Mux SDK client
│   ├── ratelimit.ts        # Upstash rate limiter (10 req/10s)
│   ├── redis.ts            # Upstash Redis client
│   └── utils.ts            # cn(), formatDuration(), snakeCaseToTitle()
├── hooks/                  # useIntersectionObserver, useIsMobile, useToast
└── middleware.ts           # Clerk middleware (protects /studio)
```

## Database Schema (PostgreSQL)

- **users** – `id`, `clerk_id` (unique), `name`, `image_url`, timestamps
- **categories** – `id`, `name` (unique), `description`, timestamps
- **videos** – `id`, `title`, `description`, Mux fields (asset, upload, playback, track IDs/status), `thumbnail_url`, `preview_url`, `duration`, `visibility` (private/public), `user_id` → users, `category_id` → categories, timestamps

## Key Features

- **Auth**: Clerk with sign-in modal, protected studio routes
- **Video Upload**: Mux direct upload with progress, webhook-driven status updates
- **Video Management**: CRUD operations via tRPC, infinite-scroll table in studio
- **Category Filtering**: Carousel-based category selection on home page
- **Rate Limiting**: Upstash Redis sliding window (10 requests per 10s per user)
- **Dark Mode**: CSS variables with `.dark` class support (no toggle yet)
- **Responsive**: Renders dialog/drawer based on mobile breakpoint

---


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
