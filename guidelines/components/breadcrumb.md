# Breadcrumb Component

**Purpose**: Breadcrumb navigation to show the current page location and path.

## When to Use

- Show the current page location within a website hierarchy
- Navigate back to parent pages
- Display the navigation path

## Basic Usage

```typescript
import { Breadcrumb } from 'antd';

<Breadcrumb
  items={[
    { title: 'Home' },
    { title: 'Application' },
    { title: 'An Application' },
  ]}
/>
```

## Common Props

| Property    | Description      | Type             | Default |
| ----------- | ---------------- | ---------------- | ------- |
| `items`     | Breadcrumb items | BreadcrumbItem[] | -       |
| `separator` | Custom separator | ReactNode        | `/`     |

## Best Practices

1. **Show hierarchy** - Display the full path from home to current page
2. **Clickable items** - Make parent items clickable for navigation
3. **Current page** - Don't make the current page clickable
