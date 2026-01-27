# Image Component

**Purpose**: Image display with preview functionality.

## When to Use

- Display images with preview
- Image galleries
- Images that need zoom/preview

## Basic Usage

```typescript
import { Image } from 'antd';

<Image
  width={200}
  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `src` | Image source | string | - |
| `width` | Image width | number | - |
| `height` | Image height | number | - |
| `preview` | Enable preview | boolean \| object | true |
| `alt` | Alt text | string | - |

## Best Practices

1. **Alt text** - Always provide alt text for accessibility
2. **Preview** - Enable preview for detailed images
3. **Appropriate sizing** - Set appropriate width/height
