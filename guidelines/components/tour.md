# Tour Component

**Purpose**: Tour guide to help users understand new features.

## When to Use

- Guide new users
- Introduce new features
- Onboarding tours

## Basic Usage

```typescript
import { Tour } from 'antd';

<Tour
  open={open}
  onClose={() => setOpen(false)}
  steps={[
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current,
    },
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `open` | Tour visible state | boolean | false |
| `steps` | Tour steps | TourStepProps[] | - |
| `onClose` | Close handler | () => void | - |

## Best Practices

1. **Clear steps** - Provide clear, concise step descriptions
2. **Skip option** - Allow users to skip tour
3. **Progressive disclosure** - Show one step at a time
