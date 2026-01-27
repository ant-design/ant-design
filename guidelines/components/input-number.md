# InputNumber Component

**Purpose**: Number input field with increment/decrement controls.

## When to Use

- Input numeric values
- Need increment/decrement controls
- Form inputs for numbers

## Basic Usage

```typescript
import { InputNumber } from 'antd';

<InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
```

## Common Props

| Property       | Description       | Type                            | Default |
| -------------- | ----------------- | ------------------------------- | ------- |
| `value`        | Current value     | number                          | -       |
| `defaultValue` | Default value     | number                          | -       |
| `min`          | Minimum value     | number                          | -       |
| `max`          | Maximum value     | number                          | -       |
| `step`         | Step value        | number \| string                | 1       |
| `precision`    | Decimal precision | number                          | -       |
| `disabled`     | Disabled state    | boolean                         | false   |
| `onChange`     | Change handler    | (value: number \| null) => void | -       |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Set min/max** - Set appropriate min and max values
3. **Precision** - Set precision for decimal numbers
