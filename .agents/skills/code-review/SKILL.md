---
name: antd-code-review
description: Code review checklist for ant-design. Use when reviewing PRs, diffs, or code changes in the ant-design repository. Covers correctness, compatibility, tests, docs, styling, i18n, and ant-design specific project rules for components, demos, tests, changelog, and release-facing changes.
---

# Ant Design Code Review Guide

## Before You Start

1. Read `/Users/yujian/Desktop/home/ant-design/AGENTS.md` for repository rules before reviewing.
2. Get the diff unless it is already provided in context:
   - `git diff`
   - `git diff origin/master...HEAD`
   - Feature work may need `git diff origin/feature...HEAD`
3. Review the full source around each changed hunk before raising a finding. Do not rely on the diff alone.

## Checklist

### Correctness

- Does the change match existing component patterns instead of introducing one-off behavior?
- Are controlled and uncontrolled modes both handled correctly where applicable?
- Are edge cases covered, including empty values, disabled state, loading state, and nested usage?
- Are there leftover `console.log`, `console.debug`, or temporary debug branches?
- Does the implementation preserve backward compatibility for public props, events, class names, and ref behavior?
- If behavior changed intentionally, is the change clearly documented and versioned where needed?

### React And Runtime Safety

- Any effect, ref, or event logic that can break under Strict Mode or repeated mount/unmount?
- Any direct DOM access that can break in SSR or before mount?
- Any assumption about `window`, `document`, `HTMLElement`, `ResizeObserver`, or `matchMedia` without guards?
- Any unstable key usage, stale closure risk, or race between async state updates and unmount?

### Styling And Tokens

- New styles should follow the existing `style/index.ts` and token-based CSS-in-JS patterns.
- Avoid hardcoded colors, spacing, radii, shadows, and z-index when an existing token should be used.
- If styles changed, check whether component token definitions in `style/token.ts` or `prepareComponentToken` also need updates.
- Review CSS selector specificity and motion changes for regression risk across variants and composed components.
- Check visual changes in dark theme and compact theme when the touched component supports them.

### Theme, RTL, And Semantic DOM

- Style or layout changes should be checked for RTL behavior, especially margin, padding, placement, and icon direction.
- Public structure changes should not break semantic DOM APIs such as `classNames` and `styles`.
- If semantic DOM was changed, review semantic demos, snapshots, and related docs.
- Token or algorithm changes should not accidentally break global token override or component token inheritance.

### API, Types, And Deprecation

- Public prop names should follow Ant Design naming conventions and remain consistent with similar components.
- Type changes should preserve existing inference and avoid narrowing public API unintentionally.
- New props, slots, methods, or semantic nodes should include docs and version fields.
- Removed or renamed API should be treated as breaking unless a compatible migration path exists.

### Testing

- Bug fixes should include or update tests that cover the fixed scenario.
- New branches in component logic should have test coverage where practical.
- Existing snapshots should still be meaningful; snapshot churn alone is not sufficient validation.
- Tests in `components/**/__tests__/` must use relative imports, not `antd`, `antd/es/*`, `antd/lib/*`, `.dumi/*`, or `@@/*`.
- If the change affects style, semantic DOM, RTL, popup behavior, keyboard interaction, or focus handling, look for dedicated test coverage.

### Demo And Import Rules

- Files under `components/**/demo/` and `.dumi/` should use absolute imports, not relative imports into component internals.
- Demo files should not cross-reference other demos with relative paths.
- Demo code should reflect recommended public usage instead of internal shortcuts.

### Docs And Examples

- User-facing API changes require updates to both `index.en-US.md` and `index.zh-CN.md`.
- API tables should stay alphabetically sorted.
- New API entries should include the `Version` column when applicable.
- String defaults should use backticks; boolean or numeric defaults should be plain values; missing defaults should be `-`.
- Chinese headings that need anchors should use explicit English anchor ids, and FAQ anchors should start with `faq-`.
- If behavior changed, demos and prose should explain the new behavior instead of only changing the code sample.

### i18n And Locale

- New user-facing strings should go through locale mechanisms instead of being hardcoded in component logic where localization is expected.
- Changes under `components/locale/` should be synchronized across all locale files, not only one language.
- Locale type exports in `components/locale/index.tsx` should stay consistent with locale file changes.

### Accessibility

- Check keyboard interaction, focus management, ARIA attributes, and screen reader labeling for regressions.
- Visual-only state changes should not be the only signal for disabled, error, selected, or expanded state.
- Popup, modal, dropdown, and composite widget changes should preserve focus return and escape behavior.

### Performance And Bundle Impact

- Avoid unnecessary rerenders, repeated measurements, or layout thrashing in hot paths.
- Shared helpers should be reused instead of duplicating logic across components.
- Watch for added dependencies, larger locale data, or shipping demo-only code into runtime bundles.

### Release Surface

- User-visible component changes may require changelog updates in both `CHANGELOG.en-US.md` and `CHANGELOG.zh-CN.md`.
- Changelog entries should describe user impact, not internal implementation details, and follow existing Ant Design formatting.
- If a change is docs-only, test-only, or internal refactor with no user impact, it usually should not appear in changelog.

## Ant Design Specific Hotspots

- Popup and portal components: placement, container, scroll, z-index, and nested popup interactions.
- Form-related components: controlled value flow, validation status, feedback icons, and `Form.Item` integration.
- CSS-in-JS changes: token derivation, hashed styles, SSR style extraction, and compatibility with css variables.
- Semantic DOM and design token work: docs, demos, and test snapshots often need coordinated updates.

## Output Format

For local CLI review:

1. Number all findings sequentially.
2. Indicate priority with `[high]`, `[medium]`, or `[low]`.
3. Include file path and line number for each finding.
4. Only list problems. No summary or praise.
5. Re-read the full source for every finding before emitting it.
6. After the findings, output `All findings verified.`

If there are no findings, output:

`No findings. Residual risk: <short note>.`
