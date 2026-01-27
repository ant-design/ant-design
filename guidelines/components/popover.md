# Popover Component

**Purpose**: Popup container for more complex content than Tooltip.

## When to Use

- Show complex content on hover/click
- Display forms or actions in popup
- More detailed information than Tooltip

## Basic Usage

```typescript
import { Popover } from 'antd';

<Popover content={content} title="Title">
  <Button>Hover me</Button>
</Popover>
```

## Common Props

| Property    | Description       | Type                                | Default   |
| ----------- | ----------------- | ----------------------------------- | --------- |
| `content`   | Popover content   | ReactNode                           | -         |
| `title`     | Popover title     | ReactNode                           | -         |
| `trigger`   | Trigger action    | `'hover'` \| `'focus'` \| `'click'` | `'hover'` |
| `placement` | Popover placement | string                              | `'top'`   |

## Best Practices

1. **Complex content** - Use for content more complex than Tooltip
2. **Interactive content** - Use for interactive content (forms, buttons)
3. **Appropriate trigger** - Choose trigger based on interaction needs
