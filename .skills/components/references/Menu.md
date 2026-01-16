# Menu — 导航菜单

## 功能概述

为页面和功能提供导航的菜单列表。

## 应用场景

- 导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
- 更多布局和导航的使用可以参考：[通用布局](/components/layout-cn)。

## 输入字段

### Menu 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultOpenKeys`: string\[]，初始展开的 SubMenu 菜单项 key 数组。
- `defaultSelectedKeys`: string\[]，初始选中的菜单项 key 数组。
- `expandIcon`: ReactNode | `(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode`，自定义展开图标，版本 4.9.0。
- `forceSubMenuRender`: boolean，在子菜单展示之前就渲染进 DOM，默认 false。
- `inlineCollapsed`: boolean，inline 时菜单是否收起状态。
- `inlineIndent`: number，inline 模式的菜单缩进宽度，默认 24。
- `items`: [ItemType\[\]](#itemtype)，菜单内容，版本 4.20.0。
- `mode`: `vertical` | `horizontal` | `inline`，菜单类型，现在支持垂直、水平、和内嵌模式三种，默认 `vertical`。
- `multiple`: boolean，是否允许多选，默认 false。
- `openKeys`: string\[]，当前展开的 SubMenu 菜单项 key 数组。
- `overflowedIndicator`: ReactNode，用于自定义 Menu 水平空间不足时的省略收缩的图标，默认 `<EllipsisOutlined />`。
- `selectable`: boolean，是否允许选中，默认 true。
- `selectedKeys`: string\[]，当前选中的菜单项 key 数组。
- `style`: CSSProperties，根节点样式。
- `styles`: Record<[SemanticDOM](#semantic-dom) , CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom) , CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `subMenuCloseDelay`: number，用户鼠标离开子菜单后关闭延时，单位：秒，默认 0.1。
- `subMenuOpenDelay`: number，用户鼠标进入子菜单后开启延时，单位：秒，默认 0。
- `theme`: `light` | `dark`，主题颜色，默认 `light`。
- `triggerSubMenuAction`: `hover` | `click`，SubMenu 展开/关闭的触发行为，默认 `hover`。
- `onClick`: function({ key, keyPath, domEvent })，点击 MenuItem 调用此函数。
- `onDeselect`: function({ key, keyPath, selectedKeys, domEvent })，取消选中时调用，仅在 multiple 生效。
- `onOpenChange`: function(openKeys: string\[])，SubMenu 展开/关闭的回调。
- `onSelect`: function({ key, keyPath, selectedKeys, domEvent })，被选中时调用。
- `popupRender`: (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement，自定义子菜单的弹出框。

### MenuItemType 属性

#### 必填

- 无必填属性。

#### 可选

- `danger`: boolean，展示错误状态样式，默认 false。
- `disabled`: boolean，是否禁用，默认 false。
- `extra`: ReactNode，额外节点，版本 5.21.0。
- `icon`: ReactNode，菜单图标。
- `key`: string，item 的唯一标志。
- `label`: ReactNode，菜单项标题。
- `title`: string，设置收缩时展示的悬浮标题。

### SubMenuType 属性

#### 必填

- 无必填属性。

#### 可选

- `children`: [ItemType\[\]](#itemtype)，子菜单的菜单项。
- `disabled`: boolean，是否禁用，默认 false。
- `icon`: ReactNode，菜单图标。
- `key`: string，唯一标志。
- `label`: ReactNode，菜单项标题。
- `popupClassName`: string，子菜单样式，`mode="inline"` 时无效。
- `popupOffset`: \[number, number]，子菜单偏移量，`mode="inline"` 时无效。
- `onTitleClick`: function({ key, domEvent })，点击子菜单标题。
- `theme`: `light` | `dark`，设置子菜单的主题，默认从 Menu 上继承。
- `popupRender`: (node: ReactElement, props: { item: SubMenuProps; keys: string[] }) => ReactElement，自定义当前子菜单的弹出框。

### group 属性

#### 必填

- 无必填属性。

#### 可选

- `children`: [MenuItemType\[\]](#menuitemtype)，分组的菜单项。
- `label`: ReactNode，分组标题。

### divider 属性

#### 必填

- 无必填属性。

#### 可选

- `dashed`: boolean，是否虚线，默认 false。

## 方法

无公开方法。

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
