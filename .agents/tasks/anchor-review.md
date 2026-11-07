# Resizable anchor menu with tooltips for documentation

Addresses issue #59426 by making the right-side anchor menu resizable through a drag handle on its left edge and adding tooltips to all anchor link titles. The menu width is persisted to localStorage and clamped between 148px and 400px. The article content padding adjusts dynamically to prevent overlap at any width.

Watch for: **Drag direction is inverted** (confirmed) — dragging left makes the menu wider, dragging right makes it narrower, which contradicts the visual affordance of the handle position and standard resize behavior.

**Verdict**: NEEDS_CHANGES

## High-level view

The resize handle is positioned on the left edge of the anchor menu and tracks horizontal mouse movement to adjust width. Dragging leftward (negative deltaX) increases width, dragging rightward (positive deltaX) decreases it — this is backward from typical resize behavior where dragging toward the handle's side expands in that direction. The anchor menu is pinned to the right edge (`inset-inline-end: 0`), so its left edge moves as width changes, but the current deltaX math doesn't account for this anchor-right geometry.

All anchor link titles are wrapped in Tooltip components placed at both depth-2 (main sections) and depth-3 (subsections). The text itself is styled with `text-overflow: ellipsis` so titles truncate when the menu is narrow.

Width state is synchronized between DocAnchor.tsx (which owns the resize handle and applies the width to styles) and index.tsx (which uses the same width to calculate article padding). Both read from the same localStorage key and apply identical clamping. The width changes are saved to localStorage on every drag movement, so dragging emits frequent writes but the hook already handles rapid updates internally.

Responsive behavior is unchanged — the anchor menu remains hidden below the screenLG breakpoint via the existing media query.

<details>
<summary>Issues (1)</summary>

1. **Inverted drag direction** — dragging the handle left widens the menu, dragging right narrows it. Reverse the sign of deltaX or flip the calculation so dragging matches visual direction. The handle is on the left edge of a right-anchored container, so as the user drags left (negative deltaX), the menu should shrink (decreasing width), not grow.

</details>

<details><summary>Details</summary>

## Drag direction is backward

The resize handle sits on the left edge of the anchor menu (set via `inset-inline-start: 0`). The anchor menu itself is pinned to the right side of the viewport (`inset-inline-end: 0`), so changing its width moves the left edge horizontally — a wider menu extends further left, a narrower menu pulls the left edge rightward.

The resize logic calculates:

```typescript
const deltaX = e.clientX - startXRef.current;
const newWidth = startWidthRef.current + deltaX;
```

When the user drags the handle leftward, `e.clientX` decreases, producing negative `deltaX`. Adding negative `deltaX` to `startWidthRef.current` yields a smaller width, but the anchor menu is right-anchored, so its left edge actually moved left while the user dragged left. The visual result: dragging the handle left makes the menu narrower (the left edge moves left relative to the content, but the width shrinks). This is inverted — dragging left should widen the menu.

For a right-anchored container, the fix is to subtract deltaX instead of adding it, or to capture the distance from the right edge rather than the left. The simplest correction:

```typescript
const newWidth = startWidthRef.current - deltaX;
```

Now dragging left (negative deltaX) increases width, and dragging right (positive deltaX) decreases width, matching the expected behavior where you drag toward open space to expand.

## Article padding adapts to menu width

The `articleWrapper` style in `useStyle` was previously hardcoded to `padding-inline: 48px 164px` (left 48px, right 164px). The new version computes the right padding as `${width + 16}px`, where `width` is the clamped anchor width. At the default 200px menu width, right padding becomes 216px. At the minimum 148px, right padding is 164px (matching the old hardcoded value). At the maximum 400px, right padding is 416px.

The additional 16px accounts for spacing between the article content and the anchor menu. Both DocAnchor.tsx and index.tsx pass the same `clampedWidth` to `useStyle`, so the anchor menu's actual width and the article's padding stay synchronized.

</details>

## File map

<details>
<summary>3 files changed</summary>

- `.dumi/theme/slots/Content/DocAnchor.tsx` — parameterized useStyle by anchor width, added Tooltip wrappers to all anchor link titles, integrated localStorage width state and ResizeHandle component
- `.dumi/theme/slots/Content/ResizeHandle.tsx` — new drag handle component with mouse tracking, width constraints, and ARIA attributes
- `.dumi/theme/slots/Content/index.tsx` — read anchor width from localStorage to compute article padding dynamically

[View full diff](command:git.openChange)

</details>
