# Popconfirm Component

**Purpose**: Popup confirmation dialog before an action.

## When to Use

- Confirm before destructive actions
- Ask for confirmation before operations
- Delete, remove, or critical actions

## Basic Usage

```typescript
import { Popconfirm } from 'antd';

<Popconfirm
  title="Delete the task"
  description="Are you sure to delete this task?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
>
  <Button danger>Delete</Button>
</Popconfirm>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Confirmation title | ReactNode | - |
| `description` | Confirmation description | ReactNode | - |
| `onConfirm` | Confirm handler | (e) => void | - |
| `onCancel` | Cancel handler | (e) => void | - |
| `okText` | OK button text | string | `'OK'` |
| `cancelText` | Cancel button text | string | `'Cancel'` |

## Best Practices

1. **Destructive actions** - Use for delete, remove, or critical actions
2. **Clear messages** - Provide clear confirmation messages
3. **Appropriate placement** - Choose placement that doesn't obstruct
