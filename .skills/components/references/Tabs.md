# Tabs — 标签页

## 功能概述

选项卡切换组件。

## 应用场景

- 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
- Ant Design 依次提供了三级选项卡，分别用于不同的场景。
- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。
- [Radio.Button](/components/radio-cn/#radio-demo-radiobutton) 可作为更次级的页签来使用。

## 输入字段

### Tabs 属性

#### 必填

- 无必填属性。

#### 可选

- `activeKey`: string，当前激活 tab 面板的 key。
- `addIcon`: ReactNode，自定义添加按钮，设置 `type="editable-card"` 时有效，默认 `<PlusOutlined />`，版本 4.4.0。
- `animated`: boolean| { inkBar: boolean, tabPane: boolean }，是否使用动画切换 Tabs，默认 { inkBar: true, tabPane: false }。
- `centered`: boolean，标签居中展示，默认 false，版本 4.4.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `defaultActiveKey`: string，初始化选中面板的 key，如果没有设置 activeKey，默认 `第一个面板的 key`。
- `hideAdd`: boolean，是否隐藏加号图标，在 `type="editable-card"` 时有效，默认 false。
- `indicator`: { size?: number | (origin: number) => number; align: `start` | `center` | `end`; }，自定义指示条的长度和对齐方式，版本 5.13.0。
- `items`: [TabItemType](#tabitemtype)，配置选项卡内容，默认 []，版本 4.23.0。
- `more`: [MoreProps](#moreprops)，自定义折叠菜单属性，默认 { icon: `<EllipsisOutlined />` , trigger: 'hover' }。
- `removeIcon`: ReactNode，自定义删除按钮，设置 `type="editable-card"` 时有效，默认 `<CloseOutlined />`，版本 5.15.0。
- `~~popupClassName~~`: string，更多菜单的 `className`, 请使用 `classNames.popup` 替换，版本 4.21.0。
- `renderTabBar`: (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement，替换 TabBar，用于二次封装标签头。
- `size`: string，大小，提供 `large` `middle` 和 `small` 三种大小，默认 `middle`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `tabBarExtraContent`: ReactNode | {left?: ReactNode, right?: ReactNode}，tab bar 上额外的元素，版本 object: 4.6.0。
- `tabBarGutter`: number，tabs 之间的间隙。
- `tabBarStyle`: CSSProperties，tab bar 的样式对象。
- `tabPlacement`: string，页签位置，可选值有 `top` `end` `bottom` `start`，默认 `top`。
- `~~tabPosition~~`: string，页签位置，可选值有 `top` `right` `bottom` `left`，请使用 `tabPlacement` 替换，默认 `top`。
- `~~destroyInactiveTabPane~~`: boolean，被隐藏时是否销毁 DOM 结构，使用 `destroyOnHidden` 代替，默认 false。
- `destroyOnHidden`: boolean，被隐藏时是否销毁 DOM 结构，默认 false，版本 5.25.0。
- `type`: string，页签的基本样式，可选 `line`、`card` `editable-card` 类型，默认 `line`。
- `onChange`: (activeKey: string) => void，切换面板的回调。
- `onEdit`: (action === 'add' ? event : targetKey, action) => void，新增和删除页签的回调，在 `type="editable-card"` 时有效。
- `onTabClick`: (key: string, event: MouseEvent) => void，tab 被点击的回调。
- `onTabScroll`: ({ direction: `left` | `right` | `top` | `bottom` }) => void，tab 滚动时触发，版本 4.3.0。

### TabItemType 属性

#### 必填

- 无必填属性。

#### 可选

- `closeIcon`: ReactNode，自定义关闭图标，在 `type="editable-card"` 时有效。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮。
- `~~destroyInactiveTabPane~~`: boolean，被隐藏时是否销毁 DOM 结构，使用 `destroyOnHidden` 代替，默认 false，版本 5.11.0。
- `destroyOnHidden`: boolean，被隐藏时是否销毁 DOM 结构，默认 false，版本 5.25.0。
- `disabled`: boolean，禁用某一项，默认 false。
- `forceRender`: boolean，被隐藏时是否渲染 DOM 结构，默认 false。
- `key`: string，对应 activeKey。
- `label`: ReactNode，选项卡头部文字元素。
- `icon`: ReactNode，选项卡头部图标元素，版本 5.12.0。
- `children`: ReactNode，选项卡内容元素。
- `closable`: boolean，是否显示选项卡的关闭按钮，在 `type="editable-card"` 时有效，默认 true。

### MoreProps 属性

#### 必填

- 无必填属性。

#### 可选

- `icon`: ReactNode，自定义折叠图标。
- `[DropdownProps](/components/dropdown-cn#api)`。

## 方法

无公开方法。

## 使用建议

优先使用 `items` 配置而非 `children`；标签数量较多时会自动出现滚动箭头；可编辑标签页使用 `type="editable-card"`；需要销毁非激活面板时设置 `destroyInactiveTabPane`。

## 示例代码

```tsx
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={(key) => console.log(key)} />
);
```

## 返回结果

渲染一个标签页组件，支持切换显示不同内容。
