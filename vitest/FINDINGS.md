# Jest -> Vitest migration status

## Current Status

The component test migration is now on Vitest. The default jsdom gate, node SSR gate, and image screenshot gate all have passing Vitest runs.

| Gate | Command | Verified result |
| --- | --- | --- |
| Main jsdom tests | `npm test` | 569 passed, 2 skipped test files; 7383 passed, 90 skipped tests |
| Node SSR tests | `npx vitest run --config vitest.node.config.ts` | 1 passed test file; 999 passed, 34 skipped tests |
| Image screenshot tests | `npx vitest run --config vitest.image.config.ts` | 66 passed test files; 2976 passed tests |

`test:site` has a Vitest config as well. It requires `_site` to exist, matching the previous `test:site-update` flow of building the site before running the check.

## Scope

The main Vitest config covers `components/**/__tests__/**/*.test.{ts,tsx}` and root `tests/*.test.ts`. It excludes only suites that are run by dedicated configs:

- `image.test.*` via `vitest.image.config.ts`
- `node.test.*` via `vitest.node.config.ts`

Vitest snapshots are stored under `components/**/__tests__/__snapshots__/vitest/` so the new baselines do not collide with the historical Jest snapshots.

When `LIB_DIR=dist` or `LIB_DIR=dist-min`, the main config keeps the historical Jest behavior and only collects `components/**/__tests__/demo.test.{ts,tsx}`.

## Benchmark

The default test script was benchmarked against a detached `origin/master` worktree on the same 571-file main test collection:

| Runner | Command    | Wall time | Runner duration |
| ------ | ---------- | --------: | --------------: |
| Jest   | `npm test` |   320.27s |        318.987s |
| Vitest | `npm test` |   278.52s |         277.71s |

That is a 41.75s wall-clock improvement for the default jsdom gate, about 13.0% faster in this local run.

## Important Migration Notes

- `@testing-library/jest-dom` and `jest-axe` are still intentional dependencies. They are matcher/assertion libraries used by Vitest, not the Jest runner.
- `eslint-plugin-jest` is still used by the current ESLint config for test lint rules.
- `@vitest/coverage-v8` is required because CI runs the main jsdom gate with `--coverage`.
- Image tests no longer depend on `jest-puppeteer`; `vitest.image.setup.ts` starts Puppeteer directly and exposes `page` plus `vitestPuppeteer.resetPage()`.
- `test:site` was not fully verified in this pass because `_site` was not built in the worktree. Running `npm run test:site-update` remains the correct end-to-end check for that gate.

## Verified Commands

```bash
npm test
npm run tsc -- --pretty false
npx vitest run --config vitest.config.ts components/button/__tests__/delay-timer.test.tsx --coverage
npx vitest run --config vitest.node.config.ts
npx vitest run --config vitest.image.config.ts
```
