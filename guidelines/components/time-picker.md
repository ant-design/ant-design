# TimePicker Component

**Purpose**: Time picker for selecting time.

## When to Use

- Select time
- Time range selection
- Form time inputs

## Basic Usage

```typescript
import { TimePicker } from 'antd';

<TimePicker onChange={onChange} />
<TimePicker.RangePicker onChange={onChange} />
```

## Common Props

| Property   | Description    | Type                       | Default      |
| ---------- | -------------- | -------------------------- | ------------ |
| `value`    | Selected time  | dayjs                      | -            |
| `format`   | Time format    | string                     | `'HH:mm:ss'` |
| `onChange` | Change handler | (time, timeString) => void | -            |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Time format** - Set appropriate time format
3. **Range picker** - Use RangePicker for time ranges
