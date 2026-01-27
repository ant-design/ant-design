# Pagination Component

**Purpose**: Pagination controls for navigating through pages of data.

## When to Use

- Navigate through paginated data
- Show page numbers and navigation controls
- Display total count and page information

## Basic Usage

```typescript
import { Pagination } from 'antd';

<Pagination
  current={current}
  total={500}
  onChange={handleChange}
/>
```

## Common Props

| Property          | Description             | Type                     | Default |
| ----------------- | ----------------------- | ------------------------ | ------- |
| `current`         | Current page            | number                   | -       |
| `total`           | Total number of items   | number                   | 0       |
| `pageSize`        | Items per page          | number                   | 10      |
| `showSizeChanger` | Show page size selector | boolean                  | false   |
| `onChange`        | Page change handler     | (page, pageSize) => void | -       |

## Best Practices

1. **Server-side pagination** - Use for large datasets with server-side pagination
2. **Show totals** - Display total count when helpful
3. **Page size options** - Allow users to change page size for better UX
