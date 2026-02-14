# Issue to Report to @rc-component/mentions Repository

## Bug Description

Pressing the Enter key in the Mentions component selects a disabled first option instead of skipping to the first available (non-disabled) option.

## Steps to Reproduce

1. Create a Mentions component with the first option set to `disabled: true`
2. Focus on the input field
3. Type `@` to open the dropdown
4. Press the Enter key

## Expected Behavior

The component should select the first available (non-disabled) option.

## Actual Behavior

The component incorrectly selects the first option, even though it is disabled.

## Environment

- @rc-component/mentions: ~1.6.0
- React: 19.0.0

## Root Cause

In `Mentions.js`, when the Enter key is pressed:
1. The code directly selects `mergedOptions[activeIndex]` without checking if it's disabled
2. The `activeIndex` is initialized to 0, which may point to a disabled option
3. Arrow key navigation also doesn't skip disabled options

## Proposed Solution

### 1. Add useEffect to set initial activeIndex to first non-disabled option

After the `mergedOptions` definition, add:

```javascript
// Ensure activeIndex points to a non-disabled option
useEffect(() => {
  if (mergedMeasuring && mergedOptions.length > 0) {
    const currentOption = mergedOptions[activeIndex];
    if (currentOption?.disabled) {
      // Find first non-disabled option
      const firstEnabledIndex = mergedOptions.findIndex(opt => !opt.disabled);
      if (firstEnabledIndex >= 0 && firstEnabledIndex !== activeIndex) {
        setActiveIndex(firstEnabledIndex);
      }
    }
  }
}, [mergedOptions, activeIndex, mergedMeasuring]);
```

### 2. Enhance arrow key navigation to skip disabled options

Replace the arrow key handling:

```javascript
if (which === KeyCode.UP || which === KeyCode.DOWN) {
  // Control arrow function
  const optionLen = mergedOptions.length;
  const offset = which === KeyCode.UP ? -1 : 1;
  
  // Find next non-disabled option
  let newActiveIndex = activeIndex;
  let attempts = 0;
  do {
    newActiveIndex = (newActiveIndex + offset + optionLen) % optionLen;
    attempts++;
  } while (mergedOptions[newActiveIndex]?.disabled && attempts < optionLen);
  
  // Only update if we found a non-disabled option
  if (!mergedOptions[newActiveIndex]?.disabled) {
    setActiveIndex(newActiveIndex);
  }
  event.preventDefault();
} else if (which === KeyCode.ESC) {
```

### 3. Add logic in Enter key handler to select first non-disabled option

Replace the Enter key handling:

```javascript
} else if (which === KeyCode.ENTER) {
  // Measure hit
  event.preventDefault();
  // loading skip
  if (silent) {
    return;
  }
  if (!mergedOptions.length) {
    stopMeasure();
    return;
  }
  const option = mergedOptions[activeIndex];
  // Skip if the current option is disabled, find first non-disabled option
  if (option?.disabled) {
    const firstEnabledOption = mergedOptions.find(opt => !opt.disabled);
    if (firstEnabledOption) {
      selectOption(firstEnabledOption);
    }
  } else {
    selectOption(option);
  }
}
```

## Test Cases

The fix should handle:
1. ✅ Initially highlight first non-disabled option when first option is disabled
2. ✅ Select first non-disabled option when Enter is pressed and current option is disabled
3. ✅ Skip disabled options when navigating with arrow keys
4. ✅ Handle all options being disabled gracefully

## Files to Modify

- `src/Mentions.tsx` (or equivalent source file)
- Both ES and CJS build outputs need the fix

## Additional Notes

This issue affects usability and accessibility, as users cannot easily select available options when disabled options are present in the list.

---

**Reporter:** ant-design/ant-design team  
**Priority:** Medium-High (affects user experience)  
**Type:** Bug Fix
