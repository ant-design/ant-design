# Badge Component

**Purpose**: Small numerical value or status descriptor for UI elements. Typically displays unread messages count.

## When to Use

- Display notification count on icons or avatars
- Show status indicators
- Display small numerical values
- Show unread message counts

## Basic Usage

```typescript
import { Badge } from 'antd';

<Badge count={5}>
  <Avatar shape="square" size="large" />
</Badge>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `count` | Number to show | ReactNode | - |
| `dot` | Show red dot instead of count | boolean | false |
| `overflowCount` | Max count to show | number | 99 |
| `showZero` | Show when count is zero | boolean | false |
| `offset` | Badge offset | [number, number] | - |
| `color` | Custom badge color | string | - |
| `status` | Status badge | `'success'` \| `'processing'` \| `'default'` \| `'error'` \| `'warning'` | - |

## Examples

### Dot Badge

```typescript
<Badge dot>
  <NotificationOutlined />
</Badge>
```

### Status Badge

```typescript
<Badge status="success" text="Success" />
<Badge status="error" text="Error" />
```

### Overflow Count

```typescript
<Badge count={1000} overflowCount={999}>
  <Avatar />
</Badge>
```

## Best Practices

1. **Use for notifications** - Use badges for unread counts and notifications
2. **Overflow handling** - Set appropriate overflowCount
3. **Status indicators** - Use status prop for status badges
4. **Don't overuse** - Use badges sparingly to maintain visual hierarchy
