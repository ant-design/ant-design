# Radio Component

**Purpose**: Radio button for selecting a single option from a group.

## When to Use

- Select a single option from multiple choices
- Use Radio.Group for related options
- Form inputs for single selection

## Basic Usage

```typescript
import { Radio } from 'antd';

<Radio.Group onChange={handleChange} value={value}>
  <Radio value={1}>Option 1</Radio>
  <Radio value={2}>Option 2</Radio>
</Radio.Group>
```

## Common Props

| Property       | Description    | Type        | Default |
| -------------- | -------------- | ----------- | ------- |
| `value`        | Selected value | any         | -       |
| `defaultValue` | Default value  | any         | -       |
| `disabled`     | Disabled state | boolean     | false   |
| `onChange`     | Change handler | (e) => void | -       |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Group for options** - Use Radio.Group for related options
3. **Few options** - Use Radio for 2-4 options, Select for more
