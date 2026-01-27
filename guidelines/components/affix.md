# Affix Component

**Purpose**: Make elements stick to viewport when scrolling.

## When to Use

- Sticky navigation
- Fixed elements during scroll
- Keep important elements visible

## Basic Usage

```typescript
import { Affix } from 'antd';

<Affix offsetTop={10}>
  <Button type="primary">Affix top</Button>
</Affix>
```

## Common Props

| Property       | Description        | Type              | Default      |
| -------------- | ------------------ | ----------------- | ------------ |
| `offsetTop`    | Offset from top    | number            | -            |
| `offsetBottom` | Offset from bottom | number            | -            |
| `target`       | Target container   | () => HTMLElement | () => window |

## Best Practices

1. **Navigation** - Use for sticky navigation
2. **Important elements** - Keep important elements visible
3. **Appropriate offset** - Set appropriate offset values
