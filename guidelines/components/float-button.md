# FloatButton Component

**Purpose**: Floating action button for primary actions.

## When to Use

- Primary action button
- Quick access to main actions
- Floating action buttons

## Basic Usage

```typescript
import { FloatButton } from 'antd';

<FloatButton icon={<CustomerServiceOutlined />} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `icon` | Button icon | ReactNode | - |
| `type` | Button type | `'default'` \| `'primary'` | `'default'` |
| `shape` | Button shape | `'circle'` \| `'square'` | `'circle'` |
| `tooltip` | Tooltip text | ReactNode | - |

## Best Practices

1. **Primary actions** - Use for primary, frequently used actions
2. **Icon clarity** - Use clear, recognizable icons
3. **Tooltip** - Provide tooltip for icon-only buttons
