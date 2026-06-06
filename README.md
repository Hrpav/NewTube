# NewTube

A YouTube clone made with Next.js, Bun, React, tRPC, drizzle, tailwind, shadcn, eslint, and more.

## Status

This project is **not finished yet** and is still under active development. Expect breaking changes.

## Core Features

### Main page (/)

#### Sidebar

[docs/screenshots/sidebar.jpg](https://github.com/Hrpav/NewTube/blob/main/docs/screenshots/sidebar.jpg)

- Button to close and open
- **"NewTube"** Logo
- **Home** *(Not finished yet*)
- **Subscriptions** *(Not finished yet*)
- **Trending** *(Not finished yet*)
- **History**
- **Liked videos**
- **All playlists**

#### Video Categories

![docs/screenshots/categories.jpg](https://raw.githubusercontent.com/Hrpav/NewTube/main/docs/screenshots/categories.jpg)

- `ShadcnUI Carousel` implementation
- Buttons to move to the `right` and `left`

#### Search bar *(not implemented yet)*

![docs/screenshots/sidebar.jpg](https://raw.githubusercontent.com/Hrpav/NewTube/main/docs/screenshots/sidebar.jpg)

- `Search` placeholder
- Search button *(`lucide react`)*

#### Your Profile *(using `clerk`)*

![docs/screenshots/profile.jpg](https://raw.githubusercontent.com/Hrpav/NewTube/main/docs/screenshots/profile.jpg)

[`Clerk` documentation](https://clerk.com/docs)

- `Clerk` implementation
- "Manage account" button
- Studio (goes to `/studio`)
- Sign out

### Studio (/studio)

![docs/screenshots/studio.jpg](https://raw.githubusercontent.com/Hrpav/NewTube/main/docs/screenshots/studio.jpg)

## Getting started

### Prerequisites

- [Bun](https://bun.com/) (recommeneded) or [Node.js](https://nodejs.org/en)

### Install dependencies

```bash
npm install
# or
bun install
```

### Run the dev server

```bash
npm run dev
# or
bun run dev
```

## Scripts

- `dev` - start Next.js in development mode
- `dev:all` - run the app + webhook tunnel (requires [ngrok](https://ngrok.com/))
- `build` - production build
- `start` - run the production server
- `lint` - run linting

## Notes

- Environment variables live in `.env.local` (see the repo for an example).

## Tutorial outline

- Intro & Demo
- Additional information
- Project setup
- Basic layout
- Authentication
- Database setup
- Webhook sync
- TRPC setup
- TRPC configuration
- Video categories
- Studio layout
- Studio videos
- Infinite loading
- Mux integration
- Mux webhooks
- Video form
- Video thumbnails
- AI background jobs
- AI thumbnails
- End of part 1

## License

MIT — see `LICENSE.txt`.

## Part Two

This project will have a part 2 to it.
