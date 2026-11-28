# Implementation Plan: Tooltip smartPlacement Feature

## Overview
Add a new `smartPlacement` prop to the Tooltip component that enables intelligent collision detection and automatic fallback positioning. When enabled, the tooltip automatically finds the best placement to avoid viewport overflow.

## Design Decisions

1. **Hook-based placement calculation**: Create a `useSmartPlacement` hook that performs collision detection on demand when the tooltip opens. This avoids ResizeObserver overhead and integrates cleanly with existing ref-based positioning.

2. **Fallback priority strategy**: For base placements (top/bottom/left/right), try the requested placement first, then opposite, then perpendiculars. For corner placements (topLeft, topRight, etc.), apply similar logic. Fallback to original placement if no position offers full space.

3. **Opt-in design**: `smartPlacement` defaults to false for full backward compatibility. Users explicitly enable it with `smartPlacement={true}`.

4. **Integration with autoAdjustOverflow**: smartPlacement works alongside the existing autoAdjustOverflow system—it provides a smarter initial placement choice before autoAdjustOverflow fine-tunes bounds.

## Implementation Items

- [ ] 1. Create useSmartPlacement hook for collision detection.
      Implements a React hook that takes the current placement, trigger element ref, tooltip container ref, and arrow configuration. Calculates viewport bounds and container dimensions, tests each fallback placement using getBoundingClientRect, and returns the best placement or original if none have full space.
      Files: `components/tooltip/hook/useSmartPlacement.ts`
      Verify: `npm run test -- components/tooltip/__tests__/tooltip.test.tsx` — hook logic tests pass.

- [ ] 2. Add smartPlacement prop to AbstractTooltipProps and TooltipProps types.
      Add optional `smartPlacement?: boolean` property to both interfaces in `components/tooltip/index.tsx`. Document that it enables intelligent collision detection (default: false).
      Files: `components/tooltip/index.tsx` (type definitions only)
      Verify: TypeScript compilation runs without errors: `npm run tsc -- components/tooltip/index.tsx`

- [ ] 3. Integrate useSmartPlacement hook into InternalTooltip component.
      In the InternalTooltip component, extract `smartPlacement` from props. Call the hook when tooltip opens and smartPlacement is true. Pass the calculated placement to RcTooltip instead of the static placement prop. Ensure the hook receives all necessary refs and configuration (arrow, arrowPointAtCenter, etc.).
      Files: `components/tooltip/index.tsx` (InternalTooltip render logic)
      Verify: `npm run test -- components/tooltip/__tests__/tooltip.test.tsx` — existing tooltip tests pass.

- [ ] 4. Add unit tests for smartPlacement behavior.
      Add tests in `components/tooltip/__tests__/tooltip.test.tsx` covering: (a) smartPlacement={false} uses original placement unchanged, (b) smartPlacement={true} with no viewport collision returns original placement, (c) smartPlacement={true} with top collision falls back to bottom, (d) smartPlacement={true} with complex corner placement collision tries perpendiculars, (e) smartPlacement with different arrow configurations.
      Files: `components/tooltip/__tests__/tooltip.test.tsx`
      Verify: `npm run test -- components/tooltip/__tests__/tooltip.test.tsx` — all new tests pass.

- [ ] 5. Update Tooltip API documentation.
      Add `smartPlacement` row to the API table in `components/tooltip/index.en-US.md` and corresponding Chinese docs `components/tooltip/index.zh-CN.md`. Description: "Automatically select the best placement to avoid viewport overflow. When enabled, tries base placement, then opposite, then perpendicular, falling back to original if no position has full space." Type: `boolean`, Default: `false`, Version: (insert appropriate version).
      Files: `components/tooltip/index.en-US.md`, `components/tooltip/shared/sharedProps.en-US.md` (if shared with Popover/Popconfirm)
      Verify: Build the documentation site: `npm run site` — no errors in tooltip docs.

- [ ] 6. Create demo showcasing smartPlacement in action.
      Add a new demo file `components/tooltip/demo/smart-placement.tsx` that renders tooltips near viewport edges, showing the difference between smartPlacement={false} and smartPlacement={true}. Include multiple placements (top, right, bottom, left, corner variants) positioned near edges to trigger fallback behavior.
      Files: `components/tooltip/demo/smart-placement.tsx`
      Verify: Demo renders without errors and placement changes are visually observable.

## Verification Strategy

1. **Type safety**: TypeScript compilation should succeed with new prop types.
2. **Backward compatibility**: All existing tooltip tests pass unchanged.
3. **Hook behavior**: New unit tests verify collision detection logic and fallback order.
4. **Integration**: End-to-end tests confirm smartPlacement prop flows through component and adjusts placement as expected.
5. **Documentation**: Updated API table and demo site build without warnings.

## File Summary

- New: `components/tooltip/hook/useSmartPlacement.ts`
- New: `components/tooltip/demo/smart-placement.tsx`
- Modified: `components/tooltip/index.tsx` (types + hook integration)
- Modified: `components/tooltip/__tests__/tooltip.test.tsx` (new tests)
- Modified: `components/tooltip/index.en-US.md` (API table)
- Modified: `components/tooltip/index.zh-CN.md` (Chinese API table, if exists)
