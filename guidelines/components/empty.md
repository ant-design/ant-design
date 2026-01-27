# Empty Component

**Purpose**: Empty state placeholder when there is no data.

## When to Use

- Show empty state when no data
- Display helpful messages for empty states
- Guide users when content is missing

## Basic Usage

```typescript
import { Empty } from 'antd';

<Empty description="No Data" />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `description` | Empty description | ReactNode | `'No Data'` |
| `image` | Custom image | ReactNode | - |

## Best Practices

1. **Helpful messages** - Provide helpful, actionable messages
2. **Custom images** - Use custom images for branded empty states
3. **Action guidance** - Guide users on what to do next
