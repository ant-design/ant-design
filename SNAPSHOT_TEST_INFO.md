# Snapshot Test Update Required

## Context
The form demo test `components/form/__tests__/demo.test.tsx` will fail for `register.tsx` because the component implementation has changed from the problematic pattern to a working custom component pattern.

## Why the Test Fails
The snapshot captures the HTML output of the register form. With the new implementation:

1. **Phone field** now uses `PhoneInput` custom component with compound value `{ prefix, phone }`
2. **Donation field** now uses `DonationInput` custom component with compound value `{ amount, currency }`

Previously, these fields used separate Form.Items with `noStyle` which didn't work properly with `setFieldsValue`.

## Updating the Snapshot

### Option 1: Run tests locally
```bash
npm test -- components/form/__tests__/demo.test.tsx -u
```

### Option 2: Let CI update
The maintainers can review the changes and update the snapshot in the CI environment.

## What Changed in the Snapshot

The main differences will be:
- Form structure remains the same
- Input/Select elements remain the same  
- Only the way values are managed internally changed (from separate fields to compound values)
- The HTML output should be nearly identical, just with proper value binding

## Verification After Update

After updating the snapshot, verify:
1. Test passes: `npm test -- components/form/__tests__/demo.test.tsx`
2. Demo renders correctly
3. `setFieldsValue` works: `form.setFieldsValue({ phone: { prefix: '87', phone: '123' } })`
