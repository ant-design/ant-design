# Statistic Component

**Purpose**: Statistic display for numbers and data.

## When to Use

- Display statistics
- Show numbers with formatting
- Dashboard metrics

## Basic Usage

```typescript
import { Statistic } from 'antd';

<Statistic title="Active Users" value={1128} prefix={<UserOutlined />} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Statistic title | ReactNode | - |
| `value` | Statistic value | number \| string | - |
| `prefix` | Prefix element | ReactNode | - |
| `suffix` | Suffix element | ReactNode | - |
| `precision` | Decimal precision | number | - |

## Best Practices

1. **Clear titles** - Provide clear statistic titles
2. **Formatting** - Use precision for decimal formatting
3. **Prefix/suffix** - Use for units or icons
