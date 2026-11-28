---
"pearkit": patch
---

Keep the source-only `@/…` import shorthand inside the package. Internal imports now use it, and `lib/` is built with the alias rewritten to relative paths (JS by `babel-plugin-module-resolver`, declarations by `scripts/fix-alias-declarations.mjs`). React Native consumers now resolve the built `lib/module` entry instead of `src`, so an app's own `@/` alias can never capture pearkit's imports; Tailwind still scans the shipped `src` for class names, and nothing in the public API changed.
