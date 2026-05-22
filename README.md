# IdeaVault – Startup Idea Sharing Platform

**Live site:** [https://ideavault.vercel.app](https://ideavault.vercel.app) *(replace with your deployed URL after hosting)*

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
# .env: PORT=8000, MONGODB_URI=..., JWT_SECRET=...
npm run dev
```

### Client (`ideaVault`)

```bash
cd ideaVault
npm install
# .env: MONGODB_URI, BETTER_AUTH_SECRET, BETTER_AUTH_URL, GOOGLE_*, NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

- **Client:** Vercel — set env vars and `NEXT_PUBLIC_API_URL` to your Render/Railway API URL
- **Server:** Render or Railway — set `PORT`, `MONGODB_URI`, `JWT_SECRET`

## Author

Built for CAT_01 – IdeaVault assignment.
