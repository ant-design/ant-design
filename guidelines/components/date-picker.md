# DatePicker Component

**Purpose**: Date picker for selecting dates.

## When to Use

- Select dates
- Date range selection
- Form date inputs

## Basic Usage

```typescript
import { DatePicker } from 'antd';

<DatePicker onChange={onChange} />
<RangePicker onChange={onChange} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Selected date | dayjs | - |
| `defaultValue` | Default date | dayjs | - |
| `format` | Date format | string | `'YYYY-MM-DD'` |
| `onChange` | Change handler | (date, dateString) => void | - |
| `disabledDate` | Disable date function | (current) => boolean | - |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Date format** - Set appropriate date format
3. **Range picker** - Use RangePicker for date ranges
4. **Disabled dates** - Use disabledDate to restrict dates
