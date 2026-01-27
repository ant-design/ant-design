# Tabs Component

**Purpose**: Tabs make it easy to explore and switch between different views.

## When to Use

- **Card Tabs**: For managing too many closeable views
- **Normal Tabs**: For functional aspects of a page
- **Radio.Button**: For secondary tabs

## Basic Usage

```typescript
import { Tabs } from 'antd';

const items = [
  { key: '1', label: 'Tab 1', children: 'Content 1' },
  { key: '2', label: 'Tab 2', children: 'Content 2' },
  { key: '3', label: 'Tab 3', children: 'Content 3' },
];

<Tabs items={items} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Tab items | TabItem[] | - |
| `activeKey` | Active tab key | string | - |
| `defaultActiveKey` | Default active tab | string | - |
| `type` | Tab type | `'line'` \| `'card'` \| `'editable-card'` | `'line'` |
| `size` | Tab size | `'large'` \| `'middle'` \| `'small'` | `'middle'` |
| `tabPosition` | Tab position | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'top'` |
| `onChange` | Tab change handler | (key: string) => void | - |

## Examples

### Card Tabs

```typescript
<Tabs type="card" items={items} />
```

### Editable Card Tabs

```typescript
<Tabs
  type="editable-card"
  items={items}
  onEdit={(targetKey, action) => {
    if (action === 'add') {
      // Add tab
    } else {
      // Remove tab
    }
  }}
/>
```

### With Icons

```typescript
const items = [
  { key: '1', label: <span><AppleOutlined />Tab 1</span>, children: 'Content' },
];
```

## Best Practices

1. **Use items prop** - Prefer `items` prop for tab configuration
2. **Card tabs for many views** - Use card tabs when you have many closeable views
3. **Controlled tabs** - Use `activeKey` for controlled tabs
4. **Accessible tabs** - Ensure keyboard navigation works
