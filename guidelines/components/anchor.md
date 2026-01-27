# Anchor Component

**Purpose**: Anchor navigation for jumping to different sections on the same page.

## When to Use

- Navigate to different sections on a long page
- Create table of contents
- Quick navigation within a page

## Basic Usage

```typescript
import { Anchor } from 'antd';

<Anchor
  items={[
    { key: 'part-1', href: '#part-1', title: 'Part 1' },
    { key: 'part-2', href: '#part-2', title: 'Part 2' },
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Anchor items | AnchorItem[] | - |
| `affix` | Fixed position | boolean | true |
| `offsetTop` | Offset from top | number | 0 |

## Best Practices

1. **Long pages** - Use for pages with multiple sections
2. **Fixed position** - Use affix for always-visible navigation
3. **Smooth scrolling** - Ensure smooth scroll behavior
