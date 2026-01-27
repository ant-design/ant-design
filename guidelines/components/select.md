# Select Component

**Purpose**: A dropdown menu for displaying choices. An elegant alternative to the native `<select>` element.

## When to Use

- Display choices in a dropdown menu
- Use when there are 4-20 predefined options
- For single or multiple selection
- When you need searchable options

**Note**: Use `Radio` for fewer options (less than 5). Use `AutoComplete` if you need an input that can be typed or selected.

## Basic Usage

```typescript
import { Select } from 'antd';

// Recommended usage (5.11.0+)
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>

// Legacy usage (deprecated)
<Select>
  <Select.Option value="1">Option 1</Select.Option>
  <Select.Option value="2">Option 2</Select.Option>
</Select>
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `options` | Select options (recommended) | { label, value }[] | - |
| `value` | Selected value | string \| string[] \| number | - |
| `defaultValue` | Default selected value | string \| string[] | - |
| `mode` | Set mode | `'multiple'` \| `'tags'` | - |
| `size` | Size | `'small'` \| `'middle'` \| `'large'` | `'middle'` |
| `placeholder` | Placeholder | ReactNode | - |
| `showSearch` | Whether select is searchable | boolean | single: false, multiple: true |
| `allowClear` | Show clear button | boolean | false |
| `disabled` | Disabled state | boolean | false |
| `loading` | Loading state | boolean | false |
| `onChange` | Change handler | (value, option) => void | - |
| `onSearch` | Search handler | (value: string) => void | - |

## Examples

### Multiple Selection

```typescript
<Select
  mode="multiple"
  placeholder="Select items"
  options={options}
  onChange={handleChange}
/>
```

### With Search

```typescript
<Select
  showSearch
  placeholder="Search and select"
  optionFilterProp="label"
  options={options}
/>
```

### With Loading

```typescript
<Select
  loading={loading}
  options={options}
/>
```

### Tags Mode

```typescript
<Select
  mode="tags"
  placeholder="Add tags"
  tokenSeparators={[',']}
/>
```

## Best Practices

1. **Use options prop** - Prefer `options` prop over children (better performance)
2. **Search for many options** - Enable `showSearch` when you have many options
3. **Multiple selection** - Use `mode="multiple"` for multiple selections
4. **Form integration** - Always use within `Form.Item` for form handling
5. **Loading states** - Show loading state during async data fetching
