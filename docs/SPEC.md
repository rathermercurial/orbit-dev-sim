# SPEC — Orbit engineering blog (rerun of orbit-dev-sim)

Per `docs/PERSONA.md` (Marcy). This spec is the single source of truth the
issues are derived from. TDD seams: content schemas (`src/content.config.ts`)
and the built site output (`dist/`) — nothing else.

## Problem Statement

Marcy's team ships open-source work and writes about it, but the pieces
live in scattered READMEs and chat threads. She wants one small site her
customers and readers can visit: posts, the people behind them, the team,
and the projects — cross-linked so a reader can land on any one of them
and find the others.

## Solution

A statically-built Astro site with four collections — posts, people,
projects, teams — cross-referenced by slug, themed so it looks like a
finished product, with RSS and a 404 page. Content lives in the repo as
markdown; no CMS.

## User Stories

1. As a reader, I want a home page that names the site and links the four
   sections, so that I can orient in under 5 seconds.
2. As a reader, I want post pages to show the author's real name linked
   to their profile, so that I can trust and explore who wrote it.
3. As a reader, I want an elegant posts index sorted newest-first with
   dates visible.
4. As a reader, I want a people index showing full names and roles.
5. As a potential collaborator, I want project pages naming the owning
   team and contributors by name (linked).
6. As an engineering manager, I want team pages listing members and the
   projects that team owns.
7. As a subscriber, I want an RSS feed at /rss.xml.
8. As a reader hitting a bad link, I want a branded 404 page.
9. As a maintainer, I want the build to fail loudly on duplicate or
   orphaned slugs, so content rot can't ship silently.
10. As a maintainer, I want tags/categories on posts so readers can
    browse by topic. *(stretch — may land in polish PR)*

## Implementation Decisions

- Astro with markdown content layer; four glob-loader collections.
- Cross-collection references via the framework's native reference
  mechanism in zod schemas (NOT hand-rolled YAML parsing). This is a
  deliberate correction of the previous run's wrong seam.
- Duplicate-slug protection in the loader's id-generation seam so it
  runs in dev AND build.
- A single chosen theme/design system applied via the layout; palette,
  typography, and component styling live in one place. (Theme selection
  happens in the design PR; the spec doesn't hardcode it.)
- Realistic fiction content: 5 people with full names/roles/bios; 3
  teams; 4 projects; 6 posts with 150-300-word bodies including code
  blocks; internal consistency (person↔team↔project references agree).
- RSS via the official integration; `site` set in config.

## Testing Decisions

- Test external behavior, not implementation: schemas parse valid
  frontmatter and reject invalid; every built href resolves; RSS output
  is well-formed XML with the expected post count.
- Tests live under `tests/` (node test runner), runnable via `npm test`.
- Prior art: the previous run's schema/orphans/duplicates tests
  (replaced by framework-native checks where the framework suffices).

## Out of Scope

- CMS, comments, search, auth, i18n, analytics.
- Deployment pipeline; `astro preview` is the demo interface.
- Per-post images/artwork.

## Acceptance gates (Marco's hidden criteria are the reviewers')

The persona criteria in `docs/PERSONA.md` gate every PR review; UI PRs
also get a persona pass that opens the built site.
