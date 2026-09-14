# AGENTS.md — orbit-dev-sim

Simulation site (Astro, four content collections: posts, people, projects, teams).
Collections cross-reference by slug: posts→people (author), projects→teams +
people (contributors), teams→people (members) + projects.

Rules for coding agents:
- TDD at the seams: collection schemas live in `src/content.config.ts`; add
  zodSchema tests under `tests/` for any new reference/validation behavior.
- Run `npm run test` (fast) and `npm run build` (full check) before pushing.
- Branch off `origin/main`; open PRs to `origin/main`.
- Never touch `docs/adr/` decisions without an issue reference.
