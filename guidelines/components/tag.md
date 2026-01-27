# Tag Component

**Purpose**: Tag/label for categorizing or markup.

## When to Use

- Categorize content
- Display labels
- Show status or categories

## Basic Usage

```typescript
import { Tag } from 'antd';

<Tag>Tag</Tag>
<Tag color="blue">Blue Tag</Tag>
```

## Common Props

| Property   | Description       | Type        | Default |
| ---------- | ----------------- | ----------- | ------- |
| `color`    | Tag color         | string      | -       |
| `closable` | Show close button | boolean     | false   |
| `onClose`  | Close handler     | (e) => void | -       |

## Best Practices

1. **Color coding** - Use colors for categorization
2. **Closable tags** - Make tags closable when removable
3. **Consistent colors** - Use consistent color scheme
