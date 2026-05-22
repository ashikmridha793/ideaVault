# IdeaVault – Startup Idea Sharing Platform

IdeaVault is a full-stack web app where entrepreneurs share startup ideas, explore community concepts, and validate ideas through comments and discussions.

## Features

- **Home experience** — Animated banner (3+ slides), trending ideas (top 6), success stories, and startup category highlights
- **Ideas hub** — 3-column responsive grid with search (case-insensitive regex), category filter, and optional date range filter
- **Authentication** — Email/password and Google sign-in with JWT for API calls; protected routes persist session on reload
- **Add & manage ideas** — Full idea form (title, descriptions, category, tags, image, budget, audience, problem/solution) with update modal and delete confirmation
- **Idea details & comments** — Private route with full idea view; add, edit, and delete your own comments with timestamps
- **Profile & interactions** — Update name and photo; view ideas you have commented on
- **Dark / light theme** — Global toggle from the navbar

## Tech Stack

| Layer    | Stack                                      |
|----------|--------------------------------------------|
| Client   | Next.js 16, React 19, Tailwind CSS, HeroUI |
| Server   | Express, MongoDB                           |
| Auth     | Better Auth + JWT (Bearer) for API         |

## Run Locally

### Server (`ideaVault-server`)

```bash
cd ideaVault-server
npm install
npm run dev
```

### Client (`ideaVault`)

## Author

