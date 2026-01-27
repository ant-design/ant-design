# Spin Component

**Purpose**: Loading spinner to indicate loading state.

## When to Use

- Show loading state
- Indicate async operations
- Loading indicators for content

## Basic Usage

```typescript
import { Spin } from 'antd';

<Spin />
<Spin tip="Loading...">
  <div>Content</div>
</Spin>
```

## Common Props

| Property   | Description    | Type                                  | Default     |
| ---------- | -------------- | ------------------------------------- | ----------- |
| `spinning` | Spinning state | boolean                               | true        |
| `tip`      | Loading text   | ReactNode                             | -           |
| `size`     | Spin size      | `'small'` \| `'default'` \| `'large'` | `'default'` |

## Best Practices

1. **Wrap content** - Wrap content to show loading overlay
2. **Loading text** - Provide helpful loading text
3. **Appropriate size** - Use appropriate size for context
