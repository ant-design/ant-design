# Menu Component

**Purpose**: A versatile menu for navigation. Supports top and side navigation.

## When to Use

- Top navigation for website categories and functions
- Side navigation for multi-level structure
- Navigation menus with submenus
- Context menus

## Basic Usage

```typescript
import { Menu } from 'antd';

const items = [
  { key: '1', label: 'Navigation One' },
  { key: '2', label: 'Navigation Two' },
  {
    key: '3',
    label: 'Navigation Three',
    children: [
      { key: '3-1', label: 'Option 1' },
      { key: '3-2', label: 'Option 2' },
    ],
  },
];

<Menu items={items} />
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `items` | Menu items | MenuItem[] | - |
| `mode` | Menu mode | `'vertical'` \| `'horizontal'` \| `'inline'` | `'vertical'` |
| `theme` | Menu theme | `'light'` \| `'dark'` | `'light'` |
| `selectedKeys` | Selected menu items | string[] | - |
| `defaultSelectedKeys` | Default selected items | string[] | - |
| `openKeys` | Open submenu keys | string[] | - |
| `defaultOpenKeys` | Default open submenus | string[] | - |
| `onClick` | Click handler | ({ key, keyPath }) => void | - |
| `onSelect` | Select handler | ({ key, keyPath }) => void | - |

## Examples

### Horizontal Menu

```typescript
<Menu mode="horizontal" items={items} />
```

### Vertical Menu

```typescript
<Menu mode="vertical" items={items} />
```

### With Icons

```typescript
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const items = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Nav 1' },
  { key: '2', icon: <SettingOutlined />, label: 'Nav 2' },
];
```

## Best Practices

1. **Use items prop** - Prefer `items` prop for menu configuration
2. **Unique keys** - Ensure all menu items have unique keys
3. **Theme consistency** - Use consistent theme with layout
4. **Accessible navigation** - Ensure keyboard navigation works
