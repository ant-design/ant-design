# Tooltip Component

**Purpose**: Simple text popup tips on hover.

## When to Use

- Show additional information on hover
- Provide context or help text
- Explain functionality

## Basic Usage

```typescript
import { Tooltip } from 'antd';

<Tooltip title="prompt text">
  <Button>Hover me</Button>
</Tooltip>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Tooltip content | ReactNode | - |
| `placement` | Tooltip placement | string | `'top'` |
| `trigger` | Trigger action | `'hover'` \| `'focus'` \| `'click'` | `'hover'` |

## Best Practices

1. **Helpful content** - Provide useful, concise information
2. **Appropriate placement** - Choose placement that doesn't obstruct content
3. **Accessible** - Ensure keyboard accessibility
