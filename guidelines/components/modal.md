# Modal Component

**Purpose**: Modal dialog for important confirmations, forms, or information display.

## When to Use

- Important confirmations
- Forms that need focus
- Display detailed information
- User interactions that require attention

## Basic Usage

```typescript
import { Modal } from 'antd';

Modal.confirm({
  title: 'Confirm',
  content: 'Some descriptions',
  onOk() {
    console.log('OK');
  },
});

// Or as component
<Modal
  title="Modal Title"
  open={isOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <p>Modal content</p>
</Modal>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `open` | Visible state | boolean | false |
| `title` | Modal title | ReactNode | - |
| `footer` | Modal footer | ReactNode | null |
| `onOk` | OK button handler | () => void | - |
| `onCancel` | Cancel handler | () => void | - |
| `width` | Modal width | number \| string | 520 |
| `centered` | Center modal | boolean | false |

## Best Practices

1. **Use for important actions** - Use modals for important confirmations
2. **Clear actions** - Provide clear OK/Cancel actions
3. **Form modals** - Use Modal with Form for form dialogs
4. **Accessible** - Ensure keyboard navigation and focus management
