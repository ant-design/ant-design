# Rate Component

**Purpose**: Rating component for displaying or selecting ratings.

## When to Use

- Display ratings
- Allow users to rate
- Star ratings

## Basic Usage

```typescript
import { Rate } from 'antd';

<Rate defaultValue={3} />
<Rate disabled defaultValue={2} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `value` | Current value | number | - |
| `defaultValue` | Default value | number | - |
| `count` | Star count | number | 5 |
| `allowHalf` | Allow half star | boolean | false |
| `disabled` | Disabled state | boolean | false |
| `onChange` | Change handler | (value: number) => void | - |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Clear labels** - Provide context for ratings
3. **Half stars** - Use allowHalf for finer ratings
