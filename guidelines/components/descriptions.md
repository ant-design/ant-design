# Descriptions Component

**Purpose**: Display read-only fields in groups. Key-value pairs.

## When to Use

- Display read-only information
- Show key-value pairs
- Detail views and information display

## Basic Usage

```typescript
import { Descriptions } from 'antd';

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
</Descriptions>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Descriptions title | ReactNode | - |
| `column` | Number of columns | number | 3 |
| `bordered` | Show border | boolean | false |

## Best Practices

1. **Read-only data** - Use for displaying read-only information
2. **Key-value pairs** - Perfect for key-value data display
3. **Appropriate columns** - Set columns based on screen size
