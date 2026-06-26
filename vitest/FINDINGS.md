# Jest -> Vitest migration progress

> Plan A: keep Jest and Vitest side by side. Vitest uses the native Vite transform path, an independent config, and independent snapshot baselines.

## Current Status

| Metric | POC stage | Expanded stage |
| --- | --: | --: |
| Test files | 16 | 169 |
| Test cases | 272 | 1365 |
| Coverage scope | Button / Modal / Table | All component directories, excluding known incompatible suites |
| CI | None | Non-blocking `test-vitest` job |

## Summary

The expanded Vitest gate now covers the component test body across the repository without changing existing Jest test files. It keeps Vitest snapshots in `components/**/__tests__/__snapshots__/vitest/`, and Jest ignores that directory through `modulePathIgnorePatterns`.

This PR is still an expansion checkpoint, not the final migration. The remaining blockers are concrete and enumerable: legacy `jest.mock()` patterns, demo test loading, non-jsdom suites, and a few Vitest runtime compatibility differences.

## Verified Gate

`npm run test:vitest` currently passes with:

- 169 test files
- 1365 test cases
- tracked Vitest snapshot baselines
- no `--update` in CI

The CI job also prints a summary with total, included, and excluded test file counts before running the gate.

## Included / Excluded Scope

Vitest includes `components/**/__tests__/**/*.test.{ts,tsx}` and excludes these categories:

| Category | Scope | Reason |
| --- | --- | --- |
| Non-jsdom suites | `image.test.*`, `node.test.*`, `demo-semantic.test.*`, `a11y.test.*`, `type.test.*` | These need separate Vitest configs or environments. |
| Demo suites | `demo.test.*`, `demo-extend.test.*` | Demo loading still depends on synchronous `jest.requireActual`; many `style-class.tsx` demos also hit an `antd-style` module-status conflict in Vite. |
| Legacy mock suites | Exact files in `vitest.config.ts` | Indirect `globalThis.jest.mock()` calls are not hoisted by Vitest, so these must be rewritten to literal `vi.mock()` calls. |
| Runtime compatibility | Exact files in `vitest.config.ts` | Examples include relative `jest.requireActual` resolution, popup timing, fake timers, ResizeObserver constructor behavior, and deprecated async `done()` usage. |

## How To Continue

Use this section as the handoff point for the next migration pass.

### Before changing the include / exclude list

1. Pick one excluded file or one excluded category.
2. Run that file directly with Vitest, for example:

```bash
npx vitest run components/button/__tests__/index.test.tsx
```

3. Fix the first real compatibility failure only.
4. Remove the file from `vitest.config.ts` `exclude`.
5. Run the full gate:

```bash
npm run test:vitest
```

6. If snapshots changed, keep only snapshots for collected test files.

Useful checks:

```bash
npx vitest list --filesOnly
npx vitest list --filesOnly | wc -l
find components -path '*/__tests__/__snapshots__/vitest/*.snap'
```

The CI summary uses `npx vitest list --filesOnly`; keep that command file-based. Do not switch it back to plain `vitest list`, which counts test cases / hierarchy output rather than files.

### Snapshot maintenance rule

Vitest snapshots are committed baselines, not generated CI artifacts.

- Do not run CI with `--update`.
- Do not ignore `components/**/__snapshots__/vitest/`.
- Do not keep snapshots for tests still excluded by `vitest.config.ts`; they are obsolete baselines and can make the signal misleading.

### Demo test migration path

Demo suites are excluded on purpose. Re-enabling them needs a loader change first:

1. Refactor `tests/shared/demoTest.tsx` away from synchronous `jest.requireActual(...)`.
2. Prefer `await vi.importActual(...)` or an explicit `import.meta.glob` based demo loader.
3. Resolve the `antd-style` `style-class.tsx` module-status conflict.
4. Only then remove `**/demo.test.*` / `**/demo-extend.test.*` from `vitest.config.ts`.

Do not restore full demo preloading in `vitest.setup.ts` while demo suites are excluded. It slows every unit suite and can add unrelated DOM side effects to snapshots.

### `jest.mock` migration path

Treat every excluded suite that uses `jest.mock(...)` as suspicious until converted. A passing test through `globalThis.jest.mock` can be a false positive because Vitest does not hoist that indirect call.

Recommended pattern:

```ts
vi.mock('module', async () => {
  const actual = await vi.importActual<typeof import('module')>('module');
  return { ...actual, value: vi.fn() };
});
```

After a file is converted:

1. Remove it from `exclude`.
2. Run the file directly.
3. Run `npm run test:vitest`.

## Key Findings

### `jest.mock()` cannot be supported by the shim

Vitest hoists literal `vi.mock(...)` calls during transform. Existing tests call `jest.mock(...)`, which reaches `vi.mock` indirectly through `globalThis.jest.mock`. That call shape is invisible to Vitest's hoist transform, so the target module may already be loaded by the time the mock is registered. Passing tests in this state can be false positives.

The migration path is a codemod/manual rewrite from:

```ts
jest.mock('module', () => {
  const actual = jest.requireActual('module');
  return { ...actual, value: jest.fn() };
});
```

to:

```ts
vi.mock('module', async () => {
  const actual = await vi.importActual('module');
  return { ...actual, value: vi.fn() };
});
```

### Demo tests need a loader refactor

`tests/shared/demoTest.tsx` synchronously calls `jest.requireActual(...)` from inside the test body. The current shim can support selected paths through `import.meta.glob` plus a synchronous cache, but it cannot resolve every relative call site safely and it cannot recover when a demo module fails during preload.

The durable fix is to refactor demo loading to async `vi.importActual` or an explicit `import.meta.glob` based loader, then re-enable `demo.test.*` and `demo-extend.test.*`.

### `antd-style` blocks broad demo coverage

Many `style-class.tsx` demos import `antd-style` and hit Vite's module-status conflict when a module is required and imported in the same graph. Since each `demo.test.*` suite traverses all demos for a component, excluding only `style-class.tsx` is not enough without changing the demo loader.

### Snapshot policy

Vitest snapshots are tracked. CI does not run with `--update`, so the job compares against committed baselines instead of accepting current output. This preserves the gate as a regression signal.

## Infrastructure Added

```text
vitest.config.ts
vitest.setup.ts
vitest/FINDINGS.md
components/**/__tests__/__snapshots__/vitest/
package.json
eslint.config.mjs
.jest.js / .jest.node.js / .jest.image.js / .jest.site.js
.github/workflows/test.yml
```

## Next Steps

1. Fix demo loading and the `antd-style` module conflict, then re-enable demo suites.
2. Rewrite legacy `jest.mock()` / `jest.requireActual` usage to `vi.mock()` / `vi.importActual`.
3. Split non-jsdom suites into dedicated Vitest configs.
4. Remove the temporary `jest` shim once test files are migrated to native Vitest APIs.
