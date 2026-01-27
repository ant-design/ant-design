# Carousel Component

**Purpose**: Carousel/slider for cycling through content.

## When to Use

- Image carousels
- Content sliders
- Rotating content display

## Basic Usage

```typescript
import { Carousel } from 'antd';

<Carousel>
  <div>
    <h3>1</h3>
  </div>
  <div>
    <h3>2</h3>
  </div>
</Carousel>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `autoplay` | Auto play | boolean | false |
| `dots` | Show dots | boolean | true |
| `infinite` | Infinite loop | boolean | true |
| `speed` | Transition speed | number | 500 |

## Best Practices

1. **Image carousels** - Use for image galleries
2. **Auto play** - Use autoplay sparingly
3. **Navigation** - Provide clear navigation controls
