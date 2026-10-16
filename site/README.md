# leostuart.com

Personal portfolio of Leonardo Stuart, software engineer. Single-page site with experience, projects, skills and contact, available in English and Portuguese, with light/dark themes.

Live at [leostuart.com](https://leostuart.com).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Vercel Analytics, deployed on Vercel

## Project structure

- `src/data/content.ts`: all copy (EN and PT), project links and tech lists
- `src/components/`: page sections (Hero, About, Experience, Projects, Skills, Contact)
- `src/context/`: language context
- `public/projects/`: project screenshots (cards without an image fall back to a name placeholder)
- `public/cv.pdf`: downloadable CV

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

To add or edit a project, update the `PROJECT_LINKS`, `TECH` and the `projects.items` entries for both `en` and `pt` in `src/data/content.ts`.
