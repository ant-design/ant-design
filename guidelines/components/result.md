# Result Component

**Purpose**: Result page for displaying operation results.

## When to Use

- Show operation results (success, error, etc.)
- Display final states after operations
- Result pages for forms or processes

## Basic Usage

```typescript
import { Result } from 'antd';

<Result
  status="success"
  title="Successfully Purchased Cloud Server ECS!"
  subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  extra={[
    <Button type="primary" key="console">Go Console</Button>,
    <Button key="buy">Buy Again</Button>,
  ]}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `status` | Result status | `'success'` \| `'error'` \| `'info'` \| `'warning'` \| `'403'` \| `'404'` \| `'500'` | `'info'` |
| `title` | Result title | ReactNode | - |
| `subTitle` | Result subtitle | ReactNode | - |
| `extra` | Extra actions | ReactNode | - |
| `icon` | Custom icon | ReactNode | - |

## Best Practices

1. **Clear status** - Use appropriate status for result type
2. **Actionable** - Provide next steps in extra prop
3. **Helpful messages** - Provide clear, helpful messages
