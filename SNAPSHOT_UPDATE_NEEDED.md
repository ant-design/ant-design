# Snapshot Update Required for register.tsx Demo

## Issue
The snapshot test for `components/form/demo/register.tsx` is failing because the component implementation was updated to use the render props pattern.

## Changes Made
The Phone Number and Donation fields in the register demo were converted from using external JSX variables (`prefixSelector` and `suffixSelector`) to using the render props pattern directly within Form.Item.

### Before:
```tsx
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select ... />
  </Form.Item>
);

<Form.Item name="phone">
  <Space.Compact block>
    {prefixSelector}
    <Input style={{ width: '100%' }} />
  </Space.Compact>
</Form.Item>
```

### After:
```tsx
<Form.Item name="phone">
  {(control) => (
    <Space.Compact block>
      <Form.Item name="prefix" noStyle>
        <Select ... />
      </Form.Item>
      <Input {...control} style={{ width: '100%' }} />
    </Space.Compact>
  )}
</Form.Item>
```

## Why This Change Was Made
The render props pattern fixes a critical bug where `setFieldsValue` was not working properly with compound form controls inside Space.Compact. The render props pattern ensures that Form.Item's control props (value, onChange, id, etc.) are properly passed to the Input/InputNumber components.

## Expected Snapshot Differences
The new snapshot should show that the Input and InputNumber elements now properly receive control props from Form.Item, including:
- `id` attribute (e.g., `id="register_phone"`)
- `value` attribute
- Event handlers (onChange, onBlur, etc.)

These attributes were missing or not properly connected in the old implementation, which was the root cause of the `setFieldsValue` bug.

## How to Update the Snapshot

Run one of the following commands:

### Update only the form demo snapshot:
```bash
npm test -- components/form/__tests__/demo.test.tsx -u
```

### Update all snapshots:
```bash
npm test -- -u
```

### In CI:
The snapshot will need to be regenerated in the CI environment or by a maintainer with a properly configured development environment.

## Verification
After updating the snapshot, verify that:
1. The test passes: `npm test -- components/form/__tests__/demo.test.tsx`
2. The register demo still renders correctly in the documentation site
3. The `setFieldsValue` functionality works as expected in the demo
