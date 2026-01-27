# Timeline Component

**Purpose**: Timeline display for showing chronological events.

## When to Use

- Display chronological events
- Show process steps
- Activity timelines

## Basic Usage

```typescript
import { Timeline } from 'antd';

<Timeline
  items={[
    { children: 'Create a services site 2015-09-01' },
    { children: 'Solve initial network problems 2015-09-01' },
    { children: 'Technical testing 2015-09-01' },
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Timeline items | TimelineItem[] | - |
| `mode` | Timeline mode | `'left'` \| `'right'` \| `'alternate'` | - |
| `pending` | Pending node | ReactNode | - |

## Best Practices

1. **Chronological order** - Display events in chronological order
2. **Clear content** - Provide clear event descriptions
3. **Pending state** - Use pending for ongoing processes
