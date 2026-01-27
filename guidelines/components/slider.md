# Slider Component

**Purpose**: Range slider for selecting numeric values.

## When to Use

- Select numeric values in a range
- Range selection
- Volume, price range selection

## Basic Usage

```typescript
import { Slider } from 'antd';

<Slider defaultValue={30} />
<Slider range defaultValue={[20, 50]} />
```

## Common Props

| Property       | Description    | Type                       | Default |
| -------------- | -------------- | -------------------------- | ------- |
| `value`        | Current value  | number \| [number, number] | -       |
| `defaultValue` | Default value  | number \| [number, number] | -       |
| `min`          | Minimum value  | number                     | 0       |
| `max`          | Maximum value  | number                     | 100     |
| `step`         | Step value     | number \| null             | 1       |
| `range`        | Range mode     | boolean                    | false   |
| `onChange`     | Change handler | (value) => void            | -       |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Clear range** - Set appropriate min/max values
3. **Step values** - Set step for discrete values
