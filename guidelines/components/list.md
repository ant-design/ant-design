# List Component

**Purpose**: List display for structured data.

## When to Use

- Display list of items
- Show structured data
- Simple list displays (use Table for complex data)

## Basic Usage

```typescript
import { List } from 'antd';

<List
  dataSource={data}
  renderItem={(item) => <List.Item>{item}</List.Item>}
/>
```

## Common Props

| Property     | Description       | Type                       | Default |
| ------------ | ----------------- | -------------------------- | ------- |
| `dataSource` | Data source       | any[]                      | -       |
| `renderItem` | Render function   | (item, index) => ReactNode | -       |
| `loading`    | Loading state     | boolean                    | false   |
| `pagination` | Pagination config | boolean \| object          | false   |

## Best Practices

1. **Simple data** - Use List for simple data, Table for complex
2. **Custom render** - Use renderItem for custom item rendering
3. **Loading states** - Show loading during data fetch
