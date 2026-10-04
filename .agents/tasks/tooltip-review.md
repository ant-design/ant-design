# Tooltip smartPlacement Implementation Review

## Summary

The Tooltip `smartPlacement` prop adds logic to automatically select alternative placements when a tooltip would overflow the viewport. The implementation includes a new `useSmartPlacement` hook with collision detection, tests for basic functionality, and documentation. However, the feature is **non-functional in its current state**: the hook is never imported or called, the placement calculation always returns the original placement, and there's a temporal dependency bug where `tempOpen` is referenced in a memoized value before it's defined.

**Watch for:**
- **Blocking**: smartPlacementResult memo uses tempOpen before it's defined in render order (line 300 references tempOpen, defined at line 347)
- **Blocking**: useSmartPlacement hook is never imported in index.tsx — feature is a no-op
- **Blocking**: smartPlacementResult calculation doesn't call useSmartPlacement or perform collision detection; it just returns placement
- **Likely**: useSmartPlacement hook doesn't handle SSR; calls window.innerWidth without checking if window exists
- **Blocking**: No integration between smartPlacementResult calculation and the actual dom measurements needed to detect collisions

**Verdict**: CHANGES_REQUESTED

---

## High-level view

The smartPlacement feature aims to improve tooltip behavior at viewport edges by automatically falling back to alternative placements when space runs out. The implementation is split into two parts: a hook (`useSmartPlacement`) that calculates the best placement based on viewport geometry, and integration into the Tooltip component via a new prop.

The hook takes the trigger and tooltip refs and viewport dimensions, measures whether each placement in a priority-ordered fallback list would fit without overflow, and returns the first one that fits. The main component was updated to accept the `smartPlacement` boolean prop and pass it to the underlying RcTooltip placement, but the integration is incomplete: the hook is never called, the placement calculation doesn't perform collision detection, and there's a reference-before-definition issue with the temporary open state.

Backward compatibility is preserved via `smartPlacement` defaulting to `false`. TypeScript integration looks solid. Test coverage includes a basic acceptance test that the prop is accepted and one test that verifies closed tooltips don't compute placement, but no tests that verify the actual fallback behavior or collision detection works.

---

<details>
<summary>Issues (5)</summary>

1. **Temporal dependency: tempOpen used before definition** — The `smartPlacementResult` memo at line 300 references `tempOpen`, which is not defined until line 347. This will cause a ReferenceError at runtime when `smartPlacement` is true.

2. **useSmartPlacement hook never imported** — The hook is defined in `useSmartPlacement.ts` but is never imported into `index.tsx`. The feature cannot function without it.

3. **smartPlacementResult doesn't call useSmartPlacement** — The memoized calculation always returns the original `placement` without calling the hook or performing any collision detection logic.

4. **SSR safety missing in useSmartPlacement** — The hook calls `window.innerWidth` and `window.innerHeight` without checking if `window` exists, which will cause a ReferenceError in SSR contexts.

5. **No measurements before placement calculation** — The smartPlacementResult memo runs before the tooltip has been rendered and measured, so tooltipRef.current will always be null and the hook will fall back to the original placement even if imported and called.

</details>

---

## Details

<details>
<summary>Details</summary>

### Temporal Dependency: tempOpen Reference Error

The `smartPlacementResult` memo (line 300) uses `tempOpen` in its dependency array and conditional check, but `tempOpen` is not defined until line 347 during the render section. This creates a forward reference that will cause a ReferenceError.

```
// Line 300 - smartPlacementResult memo
const smartPlacementResult = React.useMemo(() => {
  if (!smartPlacement || !tempOpen) {  // ← tempOpen undefined at this point
    return placement;
  }
  return placement;
}, [smartPlacement, tempOpen, placement]);

// Line 347 - tempOpen defined
let tempOpen = open;
```

Reorganizing the code so tempOpen is computed before the memo will fix this.

### Hook Not Imported

The `useSmartPlacement` hook is exported from `hook/useSmartPlacement.ts` but never imported at the top of `index.tsx`. Without the import, the hook cannot be called. The smartPlacementResult memoized value doesn't reference the hook anywhere.

### Collision Detection Never Runs

Even if the hook were imported, the `smartPlacementResult` memo doesn't call it. The current implementation always returns `placement`:

```
const smartPlacementResult = React.useMemo(() => {
  if (!smartPlacement || !tempOpen) {
    return placement;
  }
  return placement;  // ← Always returns original placement
}, [smartPlacement, tempOpen, placement]);
```

The memo should call useSmartPlacement and return the result.

### SSR Safety Gap in useSmartPlacement

The hook accesses `window.innerWidth` and `window.innerHeight` without checking if `window` is defined:

```typescript
// Line 84 in useSmartPlacement.ts
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
```

In SSR contexts, `window` is undefined. This will throw a ReferenceError. The check should be:

```typescript
if (typeof window === 'undefined') {
  return placement;
}
```

### Measurement Timing Issue

The `smartPlacementResult` memo runs during component render, before the tooltip has been mounted and measured. At that point, `tooltipRef.current` will be null (the tooltip hasn't rendered yet), so the hook's check `if (!triggerRef?.current || !tooltipRef?.current) return placement;` will always take the early-exit path. Even if all other issues are fixed, this architectural problem means the feature won't work: the refs won't have measurements until after the first render, but by then the placement has already been calculated and committed.

The hook needs to be called later in the lifecycle, or the measurement needs to happen asynchronously after the tooltip renders.

### Test Coverage Gaps

The tests verify that the prop is accepted (`smartPlacement={true}`) and that closed tooltips don't compute placement, but there are no tests that verify:
- Collision detection actually works when the tooltip would overflow
- The fallback order is followed (primary placement tried first, then alternates)
- Edge cases where the trigger is at the viewport edge
- SSR scenarios where window is undefined
- That the corrected placement actually gets passed to RcTooltip and rendered

</details>

---

## File Map

<details>
<summary>Files Changed</summary>

- **components/tooltip/hook/useSmartPlacement.ts** — New file. Defines the collision detection logic and fallback placement ordering. Needs SSR guard.
- **components/tooltip/index.tsx** — Updated component. Added `smartPlacement?: boolean` prop to AbstractTooltipProps. Added unused `smartPlacementResult` memo with temporal dependency bug. useSmartPlacement never imported or called. Placement passed to RcTooltip conditionally on smartPlacement flag.
- **components/tooltip/__tests__/tooltip.test.tsx** — Added basic tests for smartPlacement prop acceptance and closed tooltip behavior. No tests for actual collision detection or fallback logic.
- **components/tooltip/index.en-US.md** — Documentation unchanged; no API table entry for smartPlacement added.

Full diff: `git diff main`

</details>

</details>
