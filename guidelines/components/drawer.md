# Drawer Component

**Purpose**: Drawer panel that slides in from the edge of the screen.

## When to Use

- Show additional content from the side
- Display forms or details
- Mobile-friendly side panels

## Basic Usage

```typescript
import { Drawer } from 'antd';

<Drawer
  title="Drawer Title"
  placement="right"
  onClose={onClose}
  open={open}
>
  <p>Drawer content</p>
</Drawer>
```

## Common Props

| Property    | Description      | Type                                           | Default   |
| ----------- | ---------------- | ---------------------------------------------- | --------- |
| `open`      | Visible state    | boolean                                        | false     |
| `title`     | Drawer title     | ReactNode                                      | -         |
| `placement` | Drawer placement | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'right'` |
| `width`     | Drawer width     | number \| string                               | 378       |
| `onClose`   | Close handler    | (e) => void                                    | -         |

## Best Practices

1. **Right placement** - Use right placement for most cases
2. **Appropriate width** - Set width based on content
3. **Mobile friendly** - Drawers work well on mobile
