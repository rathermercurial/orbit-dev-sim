# Orbit Dev Sim

A minimal Astro site with four content collections (posts, people, projects, teams) cross-referenced by slug.

## Collections

| Collection | Cross-references |
| :--------- | :--------------- |
| `posts`    | `author` → `people` slug |
| `projects` | `team` → `teams` slug; `contributors` → `people[]` slugs |
| `teams`    | `members` → `people[]` slugs; `projects` → `projects[]` slugs |
| `people`   | — |

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the build locally                    |
| `npm test`        | Run schema tests with Node test runner       |
