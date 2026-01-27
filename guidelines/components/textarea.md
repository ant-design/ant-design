# TextArea Component

**Purpose**: Multiline text input component for longer form input.

## When to Use

- Multiline text input
- Longer form input
- Comments, descriptions, notes

## Basic Usage

```typescript
import { Input } from 'antd';
const { TextArea } = Input;

<TextArea rows={4} placeholder="Enter text" />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `rows` | Number of rows | number | 4 |
| `maxLength` | Maximum length | number | - |
| `showCount` | Show character count | boolean | false |
| `autoSize` | Auto resize | boolean \| { minRows, maxRows } | false |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Show count** - Use showCount for character limits
3. **Auto size** - Use autoSize for dynamic height
