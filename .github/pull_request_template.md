<!--
Title must follow Conventional Commits — it becomes the squash commit on develop:
  feat(Sidebar): add drag-to-collapse     fix(Tooltip): keep inside viewport
  design(theme): raise light contrast     docs: explain theming
Breaking change? Add "!" after the type: feat(Button)!: rename `kind` to `tone`
-->

Closes #

## What changed

## Screenshots / Storybook

<!-- Before/after for visual changes. Link the story if relevant. -->

## Checklist

- [ ] Branch is named `<type>/<issue>-<short-name>` and targets **develop**
- [ ] Changeset added (`npx changeset`) — or label `no-changeset` for repo-only changes (CI, tooling)
- [ ] Stories added/updated; `npm run typecheck` and `npm run build-storybook` pass
- [ ] Docs updated (`docs/components.md`, guides) if the public API changed
- [ ] Breaking changes called out in the changeset with a migration note
