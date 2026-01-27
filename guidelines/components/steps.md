# Steps Component

**Purpose**: Step-by-step process indicator. Guide users through a process.

## When to Use

- Show step-by-step process
- Guide users through multi-step forms
- Display process progress

## Basic Usage

```typescript
import { Steps } from 'antd';

<Steps
  current={1}
  items={[
    { title: 'Finished', description: 'This is a description.' },
    { title: 'In Progress', description: 'This is a description.' },
    { title: 'Waiting', description: 'This is a description.' },
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `current` | Current step | number | 0 |
| `items` | Step items | StepItem[] | - |
| `direction` | Direction | `'horizontal'` \| `'vertical'` | `'horizontal'` |
| `status` | Current step status | `'wait'` \| `'process'` \| `'finish'` \| `'error'` | `'process'` |

## Best Practices

1. **Clear steps** - Use clear, descriptive step titles
2. **Progress indication** - Show current step clearly
3. **Error handling** - Use error status for failed steps
