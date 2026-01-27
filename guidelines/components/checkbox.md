# Checkbox Component

**Purpose**: Checkbox input for selecting one or multiple options.

## When to Use

- Select one or multiple options
- Use Checkbox.Group for multiple related options
- Form inputs for boolean or multiple selections

## Basic Usage

```typescript
import { Checkbox } from 'antd';

<Checkbox>Checkbox</Checkbox>

<Checkbox.Group
  options={['Apple', 'Pear', 'Orange']}
  onChange={handleChange}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `checked` | Checked state | boolean | false |
| `defaultChecked` | Default checked | boolean | false |
| `disabled` | Disabled state | boolean | false |
| `indeterminate` | Indeterminate state | boolean | false |
| `onChange` | Change handler | (e) => void | - |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Group for multiple** - Use Checkbox.Group for related options
3. **Indeterminate** - Use for parent checkboxes with mixed children states
