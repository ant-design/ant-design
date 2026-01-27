# Card Component

**Purpose**: A container for displaying information. Used to display content related to a single subject.

## When to Use

- Display content related to a single subject
- Group related information together
- Create visual containers for content sections
- Display cards in grids or lists

## Basic Usage

```typescript
import { Card } from 'antd';

<Card title="Card Title">
  Card content
</Card>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `title` | Card title | ReactNode | - |
| `extra` | Content in top-right corner | ReactNode | - |
| `actions` | Action list at bottom | ReactNode[] | - |
| `cover` | Card cover image | ReactNode | - |
| `loading` | Loading state | boolean | false |
| `hoverable` | Lift up when hovering | boolean | false |
| `bordered` | Show border | boolean | true |
| `size` | Card size | `'default'` \| `'small'` | `'default'` |

## Examples

### With Cover

```typescript
<Card
  cover={<img alt="example" src="..." />}
  actions={[<SettingOutlined />, <EditOutlined />]}
>
  <Card.Meta title="Card Title" description="Card description" />
</Card>
```

### Loading Card

```typescript
<Card loading={loading} title="Card Title">
  Content
</Card>
```

### Grid Cards

```typescript
<Row gutter={16}>
  <Col span={8}>
    <Card title="Card 1">Content</Card>
  </Col>
  <Col span={8}>
    <Card title="Card 2">Content</Card>
  </Col>
</Row>
```

## Best Practices

1. **Single subject** - Each card should focus on a single subject
2. **Clear hierarchy** - Use title, description, and actions appropriately
3. **Loading states** - Show loading state while fetching data
4. **Hoverable for interaction** - Use hoverable for clickable cards
