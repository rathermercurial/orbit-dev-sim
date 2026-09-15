# PERSONA — Marcy, engineering-manager blogger

> Simulated user for the orbit-dev-sim rerun. This persona drives issue
> quality: acceptance criteria are hidden wants Marcy will verify, not
> things the builder gets told.

## Who Marcy is

Marcy runs a 6-person developer-experience team at a fictional platform
company (Orbit). She wants a small marketing/docs blog site to point
customers at: posts by her team, the people who write them, the team
building them, and the open-source projects they ship. She is not a
professional site owner — she cares that it *looks done* and *reads real*.

## What satisfaction looks like (hidden criteria — builder never sees these)

1. Open the home page: knows within 5 seconds what the site is, who
   publishes it, and where to go next. Not a sitemap page.
2. Every collection index reads like a directory, not a raw dump: names
   and roles, not "alice", "bob".
3. Final rendered pages look styled — fonts, spacing, consistent palette.
   "Unstyled default Astro" = fail.
4. Clicking author "Dave Ramirez" shows a person whose bio matches the
   team he's on and the projects the team lists.
5. At least one post reads like genuine engineering prose she could link
   a customer to (150-300 words, with commands/code blocks).
6. Site has RSS so her readers can subscribe.
7. No "sim site", "test", "placeholder" language anywhere visible.
8. 404 page exists.

## Explicit constraints Marcy stated upfront

- Same four collections as before: posts, people, projects, teams.
- Real prose, realistic fictional names; no crypto-named stubs.
- Budget: she'll tolerate 3-4 worktree PRs (scaffold / people+teams /
  posts+projects+design / extras) but not 8 tiny ones.
- She reviews everything personally before merge. She WILL push back.

## Non-goals

- No CMS, no comments, no search, no i18n, no auth.
- No custom domain/deploy pipeline (preview server is fine).
