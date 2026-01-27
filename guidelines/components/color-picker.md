# ColorPicker Component

**Purpose**: Color picker for selecting colors.

## When to Use

- Select colors
- Color customization
- Theme color selection

## Basic Usage

```typescript
import { ColorPicker } from 'antd';

<ColorPicker defaultValue="#1677ff" onChange={onChange} />
```

## Common Props

| Property       | Description     | Type                          | Default |
| -------------- | --------------- | ----------------------------- | ------- |
| `value`        | Selected color  | string                        | -       |
| `defaultValue` | Default color   | string                        | -       |
| `format`       | Color format    | `'hex'` \| `'rgb'` \| `'hsb'` | `'hex'` |
| `onChange`     | Change handler  | (color, colorString) => void  | -       |
| `showText`     | Show color text | boolean                       | false   |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Color format** - Choose appropriate color format
3. **Show text** - Use showText for better UX
