# Transfer Component

**Purpose**: Two-column transfer for moving items between lists.

## When to Use

- Move items between two lists
- Select multiple items from a list
- User permission assignment

## Basic Usage

```typescript
import { Transfer } from 'antd';

<Transfer
  dataSource={mockData}
  titles={['Source', 'Target']}
  targetKeys={targetKeys}
  onChange={handleChange}
  render={(item) => item.title}
/>
```

## Common Props

| Property     | Description     | Type                                      | Default |
| ------------ | --------------- | ----------------------------------------- | ------- |
| `dataSource` | Data source     | TransferItem[]                            | []      |
| `targetKeys` | Selected keys   | string[]                                  | []      |
| `onChange`   | Change handler  | (targetKeys, direction, moveKeys) => void | -       |
| `render`     | Render function | (item) => ReactNode                       | -       |
| `titles`     | Column titles   | [string, string]                          | -       |

## Best Practices

1. **Form integration** - Use with Form for form data
2. **Clear labels** - Provide clear source and target labels
3. **Search** - Enable search for large lists
