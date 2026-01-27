# Cascader Component

**Purpose**: Cascading selector for hierarchical data selection.

## When to Use

- Select from hierarchical data
- Multi-level selection
- Region, category selection

## Basic Usage

```typescript
import { Cascader } from 'antd';

<Cascader options={options} onChange={onChange} placeholder="Please select" />
```

## Common Props

| Property     | Description        | Type                             | Default |
| ------------ | ------------------ | -------------------------------- | ------- |
| `options`    | Cascader options   | CascaderOption[]                 | -       |
| `value`      | Selected value     | string[]                         | -       |
| `onChange`   | Change handler     | (value, selectedOptions) => void | -       |
| `showSearch` | Enable search      | boolean                          | false   |
| `multiple`   | Multiple selection | boolean                          | false   |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Search for many options** - Enable search for large option sets
3. **Clear labels** - Provide clear option labels
