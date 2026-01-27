# App Component

**Purpose**: App-level container for message, notification, and modal context.

## When to Use

- Use message, notification, or modal hooks
- Need context for static methods
- App-level container

## Basic Usage

```typescript
import { App } from 'antd';

function MyApp() {
  return (
    <App>
      <YourComponent />
    </App>
  );
}
```

## Best Practices

1. **Wrap app** - Wrap app when using hooks like useModal, useMessage
2. **Context provider** - Provides context for static methods
3. **Single instance** - Usually one App component per application
