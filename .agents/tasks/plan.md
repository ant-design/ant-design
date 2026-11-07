# Implementation Plan: Resizable Anchor Menu (Issue #59426)

## Problem Summary

The right-side anchor menu (DocAnchor) in the Ant Design documentation website is fixed at 148px width, causing long anchor link titles to be truncated. Users cannot see full titles without clicking through, and there's no tooltip showing the full text on hover.

## Solution Approach

After investigating the codebase, I determined that:

1. **Splitter component is NOT suitable**: The antd Splitter component works in normal document flow with flexbox/grid layouts. DocAnchor uses `position: fixed` with `inset-inline-end: 0`, which is incompatible with Splitter's architecture.

2. **Custom resize handle is the right approach**: Implement a draggable resize handle on the left edge of the fixed-position anchor menu, similar to how IDE sidebars work. This respects the existing fixed-position layout while providing resize functionality.

3. **localStorage hook exists**: `.dumi/hooks/useLocalStorage.ts` is already available with cross-tab synchronization.

4. **Tooltip component is available**: Already used throughout `.dumi/theme` for similar purposes.

## Technical Decisions

- **Resize mechanism**: Custom drag handle with `onMouseDown` event listeners, tracking `mousemove` and `mouseup` on `document` during drag
- **Width storage**: Use existing `useLocalStorage` hook with key `ANT_DESIGN_ANCHOR_WIDTH`
- **Width constraints**: Default 200px (increased from 148px), min 148px, max 400px
- **Tooltip strategy**: Wrap anchor link titles in Tooltip components, show title on hover for all items (not just truncated ones, for consistency)
- **Article padding**: Dynamically adjust `articleWrapper` right padding to match anchor menu width + spacing
- **Responsive behavior**: Preserve existing behavior where menu is hidden at `max-width: screenLG`

## Implementation Steps

- [ ] 1. Create a custom ResizeHandle component in `.dumi/theme/slots/Content/ResizeHandle.tsx`
      - Render a draggable vertical bar (4px wide, positioned on the left edge of anchor menu)
      - Implement mouse drag logic with `onMouseDown`, `document.mousemove`, `document.mouseup`
      - Emit width changes via callback prop `onWidthChange(newWidth: number)`
      - Include hover and active states (visual feedback)
      - Add cursor: col-resize style
      Files: `.dumi/theme/slots/Content/ResizeHandle.tsx` (new file)
      Verify: Import ResizeHandle in DocAnchor.tsx and confirm TypeScript compilation with `npm run tsc` passes

- [ ] 2. Update DocAnchor.tsx to integrate ResizeHandle and localStorage
      - Import `useLocalStorage` from `../../hooks/useLocalStorage` and `Tooltip` from `antd`
      - Import ResizeHandle component
      - Add state using `useLocalStorage<number>('ANT_DESIGN_ANCHOR_WIDTH', { defaultValue: 200 })`
      - Clamp width to min 148px, max 400px using `Math.min(Math.max(width, 148), 400)`
      - Update `tocWrapper` style to use dynamic width instead of fixed 148px: `width: ${clampedWidth}px`
      - Render `<ResizeHandle onWidthChange={setWidth} />` as first child inside `tocWrapper`
      - Update `articleWrapper` style to use dynamic right padding: `padding-inline: 48px ${clampedWidth + 16}px` (16px for spacing)
      - Wrap anchor link titles (in `renderAnchorItem`) with `<Tooltip title={item.title}>` for both parent and child items
      Files: `.dumi/theme/slots/Content/DocAnchor.tsx`
      Verify: Run `npm run tsc` to confirm TypeScript compiles. Start dev server with `npm start` and navigate to any component docs page (e.g., http://localhost:8001/components/button). Verify:
        1. Anchor menu renders with 200px default width (inspect element)
        2. Resize handle appears on left edge of anchor menu
        3. Hover over resize handle shows cursor change
        4. localStorage key `ANT_DESIGN_ANCHOR_WIDTH` exists in DevTools > Application > Local Storage

- [ ] 3. Implement drag resize functionality
      - In ResizeHandle component, handle mouse events to update width during drag
      - Calculate new width based on `window.innerWidth - event.clientX` (since anchor is positioned from right)
      - Apply constraints (min 148px, max 400px) during drag
      - Prevent text selection during drag using `user-select: none` on body
      - Clean up event listeners on unmount and drag end
      Files: `.dumi/theme/slots/Content/ResizeHandle.tsx`
      Verify: Run `npm start`, navigate to http://localhost:8001/components/button, and test:
        1. Click and drag the resize handle left/right
        2. Anchor menu width changes smoothly during drag
        3. Width constraints enforced (cannot go below 148px or above 400px)
        4. Text selection is prevented during drag
        5. After releasing mouse, new width is persisted in localStorage (check DevTools)
        6. Refresh page and verify width is restored from localStorage

- [ ] 4. Add Tooltip to anchor links for truncated text
      - In DocAnchor's `renderAnchorItem` function, wrap the title with `<Tooltip title={item.title} placement="left">`
      - Apply same wrapping for child items
      - Use `placement="left"` since anchor menu is on the right side
      Files: `.dumi/theme/slots/Content/DocAnchor.tsx`
      Verify: Run `npm start`, navigate to http://localhost:8001/components/button:
        1. Resize anchor menu to a narrow width (e.g., 150px) where titles are truncated
        2. Hover over truncated anchor links
        3. Tooltip appears showing full title text
        4. Tooltip positioned to the left of the anchor menu

- [ ] 5. Style the ResizeHandle with hover and active states
      - Use `createStyles` from antd-style for consistent theming
      - Default state: semi-transparent border or background
      - Hover state: more visible with `background: ${token.colorPrimary}` at 0.3 opacity
      - Active (dragging) state: fully visible primary color
      - Match the design language of existing antd components
      Files: `.dumi/theme/slots/Content/ResizeHandle.tsx`
      Verify: Run `npm start`, check visual appearance and interaction states:
        1. Resize handle is subtle but visible in default state
        2. Hover over handle shows clear visual feedback (color change)
        3. During drag, handle remains highlighted
        4. Colors match antd theme (test both light and dark themes using theme switcher in header)

- [ ] 6. Ensure responsive behavior is preserved
      - Verify that at screen width < screenLG breakpoint, the anchor menu is still hidden (existing CSS media query)
      - Verify that on mobile/tablet, no errors occur and layout is correct
      - Test that article padding adjusts correctly on screens where anchor is visible
      Files: No changes needed, but verify existing CSS behavior
      Verify: Run `npm start`, test responsive behavior:
        1. Resize browser window to < 1200px width (screenLG breakpoint)
        2. Anchor menu should be hidden
        3. Article padding should revert to the mobile padding (check computed styles)
        4. No console errors at any viewport size
        5. Resize browser back to > 1200px, anchor menu reappears with stored width

- [ ] 7. Add visual polish and accessibility
      - Add `aria-label="Resize anchor menu"` to ResizeHandle
      - Add `role="separator"` to ResizeHandle for screen readers
      - Ensure keyboard navigation still works for anchor links (not affected by resize handle)
      - Test that focus states are visible and correct
      Files: `.dumi/theme/slots/Content/ResizeHandle.tsx`
      Verify: Run `npm start` and test accessibility:
        1. Tab through page elements, verify anchor links are still keyboard-navigable
        2. Use browser DevTools accessibility inspector to verify aria attributes
        3. Test with screen reader (VoiceOver on macOS) if available - resize handle should be announced
        4. Verify focus indicators are visible on anchor links

- [ ] 8. Test edge cases and cross-browser compatibility
      - Test rapid resize operations (drag quickly back and forth)
      - Test dragging outside viewport boundaries
      - Test with RTL layout (direction='rtl')
      - Test localStorage synchronization across multiple tabs
      - Test that very long anchor titles display correctly in tooltip
      Files: All changed files
      Verify: Run comprehensive tests:
        1. Rapidly drag resize handle - no flickering or performance issues
        2. Drag to extreme positions - constraints enforced smoothly
        3. Switch to RTL mode using RTL toggle in header - resize handle should be on the right edge of anchor menu (which is now on left side), math for width calculation should be adjusted
        4. Open docs in two browser tabs, resize in one tab, verify other tab updates width when switching focus
        5. Navigate to a page with very long anchor titles (e.g., /components/form with long form field names), hover to see full text in tooltip

- [ ] 9. Run full test suite and fix any issues
      - Run TypeScript compiler: `npm run tsc`
      - Run linting: `npm run lint:script`
      - Run tests: `npm run test:vitest` (if any tests cover DocAnchor)
      - Build the site: `npm run site` and verify no build errors
      Files: All changed files
      Verify: Execute commands:
        ```bash
        npm run tsc
        npm run lint:script
        npm run test:vitest
        npm run site
        ```
        All commands should pass without errors related to DocAnchor or ResizeHandle changes

- [ ] 10. Manual testing checklist and documentation
      - Create a testing checklist covering all features
      - Test on Chrome, Firefox, Safari (if on macOS)
      - Test light and dark themes
      - Test with various component documentation pages (Button, Form, Table, Modal)
      - Document the localStorage key `ANT_DESIGN_ANCHOR_WIDTH` if there's a relevant place
      Files: Manual testing (no file changes)
      Verify: Complete testing matrix:
        - ✓ Chrome + Light theme + Resize works
        - ✓ Chrome + Dark theme + Resize works
        - ✓ Firefox + Light theme + Resize works
        - ✓ Safari + Light theme + Resize works (macOS only)
        - ✓ Tooltip shows on hover across all browsers
        - ✓ Width persists after page refresh
        - ✓ Width syncs across tabs
        - ✓ Responsive behavior (menu hides < 1200px)
        - ✓ RTL layout works correctly
        - ✓ No console errors or warnings

## Key Files Modified

1. **`.dumi/theme/slots/Content/ResizeHandle.tsx`** (new file)
   - Custom resize handle component with drag logic
   - Uses antd-style for theming
   - Implements mouse event handlers for drag interaction

2. **`.dumi/theme/slots/Content/DocAnchor.tsx`**
   - Import useLocalStorage and Tooltip
   - Add width state with localStorage persistence
   - Integrate ResizeHandle component
   - Update styles to use dynamic width
   - Wrap anchor link titles with Tooltip

## Verification Strategy

- **TypeScript compilation**: `npm run tsc` must pass
- **Linting**: `npm run lint:script` must pass
- **Build**: `npm run site` must complete successfully
- **Manual testing**: Start dev server with `npm start`, test on http://localhost:8001/components/button and other component pages
- **Cross-browser**: Test in Chrome, Firefox, Safari
- **Responsive**: Test at various viewport sizes
- **Persistence**: Verify localStorage stores and restores width preference
- **Accessibility**: Tab navigation, screen reader compatibility, ARIA attributes

## Constraints and Considerations

- **No breaking changes**: Existing behavior for screens < 1200px must be preserved
- **Performance**: Drag operations must be smooth (use throttling if needed)
- **Theme compatibility**: Must work with both light and dark themes
- **RTL support**: Must handle RTL layout correctly (anchor menu appears on left in RTL)
- **No dependencies added**: Use existing hooks and components from antd and .dumi
- **Backward compatibility**: Default width 200px is reasonable for users with no stored preference

## RTL Layout Consideration

In RTL mode, the anchor menu appears on the left side instead of the right. The resize handle logic needs to account for this:
- In LTR: `position: fixed; inset-inline-end: 0` places menu on right, resize handle on left edge of menu
- In RTL: `position: fixed; inset-inline-end: 0` places menu on left (due to inline-end), resize handle should be on right edge of menu
- Width calculation: In LTR, `window.innerWidth - event.clientX`; in RTL, `event.clientX` (approximately)
- This will be handled by testing and adjusting the ResizeHandle logic based on the document direction

## Success Criteria

✅ Users can resize the anchor menu by dragging a handle
✅ Width preference is stored in localStorage and persists across sessions
✅ Tooltips show full anchor link titles on hover
✅ Default width is 200px (improved from 148px)
✅ Width constraints: min 148px, max 400px
✅ Responsive behavior preserved (hidden < 1200px)
✅ Works in light and dark themes
✅ Works in LTR and RTL layouts
✅ No TypeScript, linting, or build errors
✅ Smooth drag interaction with visual feedback
✅ Article padding adjusts dynamically to accommodate resized menu
