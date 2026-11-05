# Workflow and releases

pearkit is used by other PearDrive apps, so `main` only ever holds released, tagged versions. All work happens on short-lived branches that land on `develop`; a release moves `develop` into `main`.

```
 issue #42 ─▶ feat/42-segmented-control ─┐
 issue #57 ─▶ design/57-light-contrast  ─┼─ squash ─▶ develop ─▶ release PR ─▶ main ─▶ tag v0.3.0
 issue #63 ─▶ fix/63-tooltip-offset     ─┘                       (merge commit)       + GitHub Release
```

| Branch | Holds | Merges in by | Protected |
| --- | --- | --- | --- |
| `main` | Released versions only. Every commit is tagged `vX.Y.Z`. | Merge commit from `develop` (or `hotfix/*`) | Yes |
| `develop` | Everything finished and reviewed, waiting for the next release. | Squash merge | Yes |
| `<type>/<issue>-<name>` | One issue's work. Deleted after merge. | — | No |

Reading history:

- `git log --oneline develop` — one commit per issue, in Conventional Commit form.
- `git log --oneline --first-parent main` — one merge per release.

## 1. Start with an issue

Every change starts as an issue, using one of the templates:

- **New component** — name, layer (primitive / chrome / pattern), Figma link, proposed API.
- **Design change** — Figma link, affected components/tokens, impact (visual only / additive / breaking).
- **Bug report** — version, platform, reproduction.

Triage it (`status: triage` → `status: ready`) and assign it to a milestone named after the release it should ship in, e.g. `v0.3.0`.

## 2. Branch from develop

```bash
git switch develop && git pull --ff-only
git switch -c feat/42-segmented-control
```

Branch types: `feat/` (new component or API), `design/` (visual/token/theme/icon change), `fix/`, `docs/`, `refactor/`, `chore/`.

Commit as often as you like on your branch — those commits are squashed away.

## 3. Add a changeset

Before opening the PR, describe the change for the changelog:

```bash
npx changeset
```

Pick the bump (see the table in [`.changeset/README.md`](../.changeset/README.md)) and write a sentence or two for app developers. Commit the generated `.changeset/*.md` file. CI/tooling-only PRs can skip this with the `no-changeset` label.

## 4. Open a pull request into develop

- **Title** in Conventional Commit form — it becomes the commit on `develop`:
  `feat(SegmentedControl): add segmented control`, `fix(Tooltip): keep inside viewport`, `design(theme): raise light-theme contrast`.
  Breaking: `feat(Button)!: rename kind to tone`.
- **Body**: `Closes #42` so the issue closes on merge.
- CI runs: `verify` (install + bob build, typecheck, Storybook build), `pr-title`, `changeset`.
- Merge with **Squash and merge**. Delete the branch.

## 5. Release

When `develop` has what the milestone needs:

```bash
git switch develop && git pull --ff-only
npm run release:prepare
```

This creates `release/vX.Y.Z`, runs `changeset version` (bumps `package.json`, writes `CHANGELOG.md`, removes the consumed changesets) and commits `chore(release): vX.Y.Z`. Then:

1. `git push -u origin release/vX.Y.Z` and open a PR **into develop** titled `chore(release): vX.Y.Z`. Review the changelog, squash-merge.
2. Open a PR **develop → main** titled `release: vX.Y.Z`. CI's `release-source` check confirms it comes from `develop`, the version is new and no changesets are left. Merge with **Create a merge commit**.
3. The **Release** workflow tags the merge commit `vX.Y.Z` and publishes a GitHub Release with that version's changelog section.
4. Close the milestone.

GitHub will show `develop` as "1 commit behind main" after each release. That's the release merge commit and is expected; don't merge `main` back into `develop`.

## Hotfixes

Normally a fix just goes through `develop` and you cut a patch release right away. If `develop` holds unreleased work that can't ship yet:

1. `git switch -c hotfix/71-crash-on-launch origin/main`, fix it, `npx changeset` (patch).
2. Run `npx changeset version`, then `npm install --package-lock-only`, and commit `chore(release): vX.Y.Z`.
3. PR `hotfix/71-…` → `main` titled `release: vX.Y.Z`, merge commit. The tag and Release are created automatically.
4. Bring the fix to develop: `git switch -c fix/71-port-hotfix origin/develop`, `git cherry-pick <hotfix commits>`, PR into `develop` with label `no-changeset`, squash-merge.

## Versioning

pearkit follows [SemVer](https://semver.org). While it's `0.x`, a minor bump (`0.2 → 0.3`) is the breaking one, so apps pinned to `^0.2.0` only get compatible updates.

## How apps install a release

Apps install from GitHub, pinned to a release tag:

```bash
npm install "github:peardrive/pearkit#semver:^0.2.0"   # newest compatible release
npm install "github:peardrive/pearkit#v0.2.0"          # exact release
```

`npm install github:peardrive/pearkit` without a tag installs `main`, which is always the latest release.

## One-time GitHub setup (maintainer)

1. Push `main`, the `v0.2.0` tag and `develop`.
2. **Settings → General → Pull Requests**: allow *merge commits* and *squash merging*, disable *rebase merging*; set squash commit message to *Pull request title and description*; enable *Automatically delete head branches*.
3. **Settings → Rules → Rulesets → New ruleset → Import a ruleset**, once for each file in [`.github/rulesets/`](../.github/rulesets): `main.json`, `develop.json`, `release-tags.json`.
4. **Settings → Actions → General → Workflow permissions**: *Read and write permissions* (the Release workflow pushes tags and creates releases).
5. **Actions → Repo setup (labels) → Run workflow** to create the labels.
6. Create a milestone for the next release (`v0.3.0`).

To add required reviews once more people are on the team, raise `required_approving_review_count` in the `main` and `develop` rulesets.
