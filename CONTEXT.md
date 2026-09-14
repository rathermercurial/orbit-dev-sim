# orbit-dev-sim

Simulation site for the Hermes→Orca→pi pipeline. An Astro site with four
content collections: posts, people, projects, teams.

## Collections

- `posts` — markdown blog posts; `author` references a person slug.
- `people` — markdown profiles; may reference `team` slugs.
- `projects` — markdown project pages; `team` and `contributors` reference
  slugs in teams/people.
- `teams` — markdown team pages; `members` and `projects` reference
  people/projects slugs.

## Agents

- Triage labels: `docs/agents/triage-labels.md`
- Issue tracker rules: `docs/agents/issue-tracker.md`
