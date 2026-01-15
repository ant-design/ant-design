# Menu — 导航菜单

## 功能概述

为页面和功能提供导航的菜单列表，支持顶部导航和侧边栏导航，支持多级菜单。

## 输入字段

### 必填

无必填属性，但通常需要提供 `items`。

### 可选

- `items`: MenuItem[]，菜单配置数组。
  - `key`: string，唯一标识。
  - `label`: ReactNode，菜单标题。
  - `icon`: ReactNode，菜单图标。
  - `children`: MenuItem[]，子菜单。
  - `type`: `group` | `divider`，菜单类型。
  - `disabled`: boolean，禁用状态。
  - `danger`: boolean，危险样式。
  - `title`: string，悬停提示。
- `mode`: string，菜单类型，可选 `vertical` | `horizontal` | `inline`，默认 `vertical`。
- `theme`: string，主题，可选 `light` | `dark`，默认 `light`。
- `selectedKeys`: string[]，选中的菜单项 key（受控）。
- `defaultSelectedKeys`: string[]，默认选中项。
- `openKeys`: string[]，展开的子菜单 key（受控）。
- `defaultOpenKeys`: string[]，默认展开的子菜单。
- `inlineCollapsed`: boolean，inline 模式下收起菜单。
- `inlineIndent`: number，inline 模式下的缩进宽度，默认 `24`。
- `multiple`: boolean，允许多选。
- `selectable`: boolean，允许选择，默认 `true`。
- `triggerSubMenuAction`: string，子菜单展开触发方式，可选 `hover` | `click`，默认 `hover`。
- `subMenuCloseDelay`: number，子菜单关闭延迟（秒），默认 `0.1`。
- `subMenuOpenDelay`: number，子菜单展开延迟（秒），默认 `0`。
- `forceSubMenuRender`: boolean，强制渲染子菜单。
- `expandIcon`: ReactNode | (props) => ReactNode，自定义展开图标。
- `overflowedIndicator`: ReactNode，自定义省略图标。
- `getPopupContainer`: (node) => HTMLElement，弹出容器。
- `onClick`: ({ key, keyPath, domEvent }) => void，点击菜单回调。
- `onSelect`: ({ key, keyPath, selectedKeys, domEvent }) => void，选中回调。
- `onDeselect`: ({ key, keyPath, selectedKeys, domEvent }) => void，取消选中回调。
- `onOpenChange`: (openKeys) => void，展开/收起回调。

### 菜单项类型

```tsx
type MenuItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItem[];
  type?: 'group' | 'divider';
  disabled?: boolean;
  danger?: boolean;
};
```

## 使用建议

优先使用 `items` 配置而非 `children`；侧边栏使用 `mode="inline"`；顶部导航使用 `mode="horizontal"`；配合 Layout.Sider 使用时设置 `inlineCollapsed`。

## 示例代码

```tsx
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
    ],
  },
];

const App: React.FC = () => (
  <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ width: 256 }}
    items={items}
  />
);
```

## 返回结果

渲染一个导航菜单，支持多级展开和选中状态。
