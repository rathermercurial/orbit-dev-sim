# Issue tracker rules

GitHub issues are the sole task tracker. Workflow:

1. Hermes triages `needs-triage` issues and posts a scope comment.
2. Human (or simulation driver) approves → `ready-for-agent`.
3. Orchestrator dispatches a worktree agent; PR to `main`.
4. Orchestrator reviews the PR; human merges.
