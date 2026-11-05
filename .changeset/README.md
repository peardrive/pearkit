# Changesets

Every pull request into `develop` that changes what apps get from pearkit adds one changeset:

```bash
npx changeset
```

Pick the bump and write one or two sentences for the changelog, written for the people using pearkit:

| Change | Bump while on 0.x | Bump from 1.0 |
| --- | --- | --- |
| Fix, visual tweak, docs | patch | patch |
| New component, prop, variant or token | patch | minor |
| Renamed/removed prop, token or component; changed default | minor | major |

For breaking changes, include a short migration note in the changeset.

The files here are consumed by `npm run release:prepare`, which bumps `package.json` and writes them into `CHANGELOG.md`.
See [docs/releasing.md](../docs/releasing.md).
