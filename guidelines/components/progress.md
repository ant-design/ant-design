# Progress Component

**Purpose**: Progress indicator to show the completion percentage of an operation.

## When to Use

- Show operation progress
- Display completion percentage
- Loading progress indicators

## Basic Usage

```typescript
import { Progress } from 'antd';

<Progress percent={30} />
<Progress percent={50} status="active" />
<Progress percent={100} />
```

## Common Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `percent` | Progress percentage | number | 0 |
| `status` | Progress status | `'success'` \| `'exception'` \| `'active'` \| `'normal'` | `'normal'` |
| `type` | Progress type | `'line'` \| `'circle'` \| `'dashboard'` | `'line'` |
| `showInfo` | Show percentage | boolean | true |

## Best Practices

1. **Clear progress** - Show meaningful progress percentages
2. **Status indication** - Use status for success/error states
3. **Appropriate type** - Choose type based on space and context
