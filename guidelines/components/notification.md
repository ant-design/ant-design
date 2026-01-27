# Notification Component

**Purpose**: Notification box that appears in the corner of the page. More detailed than Message.

## When to Use

- Show detailed notifications
- Display notifications with descriptions
- Show notifications that need more information than Message

## Basic Usage

```typescript
import { notification } from 'antd';

notification.open({
  message: 'Notification Title',
  description: 'This is the content of the notification.',
});
```

## API Methods

- `notification.success(config)`
- `notification.error(config)`
- `notification.warning(config)`
- `notification.info(config)`
- `notification.open(config)`

## Best Practices

1. **Detailed content** - Use for notifications with descriptions
2. **Placement** - Choose appropriate placement (topRight, topLeft, etc.)
3. **Duration** - Set appropriate duration for message importance
4. **Actions** - Add action buttons when needed
