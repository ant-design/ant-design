# Patches for Dependencies

This directory contains patches for third-party dependencies that are needed to fix bugs or add features.

## @rc-component/mentions

**File:** `mentions-disabled-options.patch`

**Issue:** [BUG] Mentions: Pressing Enter Key in Mention Component Selects Disabled First Option Instead of First Available Option

**Description:** The `@rc-component/mentions` package has a bug where pressing the Enter key selects the first option even if it's disabled, instead of selecting the first available (non-disabled) option. This patch fixes the issue by:

1. Adding logic to skip disabled options when navigating with arrow keys
2. Adding logic to select the first non-disabled option when Enter is pressed
3. Ensuring the initial active index points to the first non-disabled option

**Status:** 
- ⚠️ Patch is currently applied manually to `node_modules/@rc-component/mentions`
- These changes will be lost when running `npm install` or `npm ci`
- **TODO:** Set up automated patch application (e.g., using `patch-package` or postinstall script)
- **TODO:** Submit these changes upstream to the `@rc-component/mentions` repository

**Files Modified:**
- `node_modules/@rc-component/mentions/es/Mentions.js` (ES Module)
- `node_modules/@rc-component/mentions/lib/Mentions.js` (CommonJS)

**How to Apply:**
After running `npm install`, manually apply the changes documented in `mentions-disabled-options.patch`, or wait for an automated solution to be implemented.

## Future Improvements

- Set up `patch-package` to automatically apply patches after install
- Or use `pnpm` with patch support
- Or fork and publish patched versions of dependencies
- Submit patches upstream to avoid needing local patches
