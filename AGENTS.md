# AGENTS.md — orbit-dev-sim

Simulation site: an Astro site with content collections, built via the
Hermes→Orca→pi pipeline (see docs/SIMULATOR.md).

## Rules for coding agents

- TDD at the seams: tests live under `tests/`. Tests first, then code.
- Run `npm run test` and `npm run build` before pushing. Paste the real
  output of both into the PR body's Verification section — a PR body that
  says only "Closes #N" is a pipeline fault.
- PR bodies follow `.github/PULL_REQUEST_TEMPLATE.md` (repo) or the org
  defaults in `rathermercurial/.github`: Summary, Linked issue, Verification,
  Evidence, Out of scope, Risks. Empty required sections fail review.
- Report completion with the structured worker contract and an evidence
  file; see the `implement` skill's Structured completion section.
- Don't invent versions or facts: if work needs a current version, check it
  live and paste the real output into the issue/PR.
- Prefer the framework's documented native machinery over hand-rolled
  validation utilities. If you find yourself re-implementing something the
  framework documents natively, that is a finding, not a shortcut — say so
  in the PR rather than shipping the workaround.
