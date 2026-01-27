# Watermark Component

**Purpose**: Watermark overlay for content protection.

## When to Use

- Add watermarks to content
- Protect sensitive information
- Brand content

## Basic Usage

```typescript
import { Watermark } from 'antd';

<Watermark content="Ant Design">
  <div style={{ height: 500 }} />
</Watermark>
```

## Common Props

| Property  | Description            | Type               | Default    |
| --------- | ---------------------- | ------------------ | ---------- |
| `content` | Watermark content      | string \| string[] | -          |
| `font`    | Font configuration     | object             | -          |
| `gap`     | Gap between watermarks | [number, number]   | [100, 100] |

## Best Practices

1. **Content protection** - Use for protecting sensitive content
2. **Appropriate opacity** - Set appropriate opacity for visibility
3. **Non-intrusive** - Ensure watermark doesn't obstruct content
