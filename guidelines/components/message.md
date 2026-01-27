# Message Component

**Purpose**: Global message feedback for operations. Non-blocking notifications.

## When to Use

- Show operation feedback
- Display success, error, warning, or info messages
- Non-blocking notifications

## Basic Usage

```typescript
import { message } from 'antd';

message.success('Success message');
message.error('Error message');
message.warning('Warning message');
message.info('Info message');
```

## API Methods

- `message.success(content, duration, onClose)`
- `message.error(content, duration, onClose)`
- `message.warning(content, duration, onClose)`
- `message.info(content, duration, onClose)`
- `message.loading(content, duration, onClose)`

## Best Practices

1. **Short messages** - Keep messages concise
2. **Appropriate type** - Use correct type for message severity
3. **Auto dismiss** - Messages auto-dismiss after duration
4. **Stack messages** - Multiple messages stack vertically
