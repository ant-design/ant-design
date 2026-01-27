# BackTop Component

**Purpose**: Back to top button for long pages.

## When to Use

- Long pages that need quick scroll to top
- Improve navigation on long content
- Quick return to top

## Basic Usage

```typescript
import { BackTop } from 'antd';

<BackTop />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `visibilityHeight` | Show button after scrolling | number | 400 |
| `target` | Target element to listen | () => HTMLElement | () => window |

## Best Practices

1. **Long pages** - Use for pages with long content
2. **Visibility height** - Set appropriate visibility height
3. **Smooth scroll** - Provides smooth scroll to top
