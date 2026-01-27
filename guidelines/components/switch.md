# Switch Component

**Purpose**: Toggle switch for switching between two states.

## When to Use

- Toggle between two states (on/off)
- Enable or disable settings
- Binary choices in forms

## Basic Usage

```typescript
import { Switch } from 'antd';

<Switch defaultChecked onChange={handleChange} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `checked` | Checked state | boolean | false |
| `defaultChecked` | Default checked | boolean | false |
| `disabled` | Disabled state | boolean | false |
| `loading` | Loading state | boolean | false |
| `size` | Switch size | `'default'` \| `'small'` | `'default'` |
| `onChange` | Change handler | (checked) => void | - |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Clear labels** - Provide clear labels for on/off states
3. **Loading states** - Show loading during async operations
