# Tabs — 标签页

## 功能概述

选项卡切换组件，用于在同一区域内切换显示不同的内容模块。

## 输入字段

### 必填

无必填属性，但通常需要提供 `items`。

### 可选

- `items`: TabItem[]，标签页配置数组。
  - `key`: string，唯一标识。
  - `label`: ReactNode，标签文本。
  - `children`: ReactNode，标签内容。
  - `disabled`: boolean，禁用状态。
  - `closable`: boolean，是否可关闭（type="editable-card" 时有效）。
  - `closeIcon`: ReactNode，自定义关闭图标。
  - `icon`: ReactNode，标签图标。
  - `forceRender`: boolean，强制渲染。
  - `destroyInactiveTabPane`: boolean，销毁非激活面板。
- `activeKey`: string，当前激活标签（受控）。
- `defaultActiveKey`: string，默认激活标签。
- `type`: string，标签页类型，可选 `line` | `card` | `editable-card`，默认 `line`。
- `size`: string，尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `tabPosition`: string，标签位置，可选 `top` | `right` | `bottom` | `left`，默认 `top`。
- `centered`: boolean，标签居中显示。
- `tabBarGutter`: number，标签间距。
- `tabBarStyle`: CSSProperties，标签栏样式。
- `tabBarExtraContent`: ReactNode | { left, right }，标签栏额外内容。
- `animated`: boolean | { inkBar, tabPane }，动画效果。
- `indicator`: { size, align }，指示条配置（5.13.0+）。
- `destroyInactiveTabPane`: boolean，销毁非激活面板，默认 `false`。
- `hideAdd`: boolean，隐藏添加按钮（type="editable-card"）。
- `addIcon`: ReactNode，自定义添加图标。
- `removeIcon`: ReactNode，自定义删除图标。
- `moreIcon`: ReactNode，自定义更多图标。
- `popupClassName`: string，更多弹出层类名。
- `onChange`: (activeKey) => void，切换回调。
- `onTabClick`: (key, event) => void，标签点击回调。
- `onEdit`: (key, action) => void，新增/删除回调（type="editable-card"）。
- `onTabScroll`: ({ direction }) => void，标签滚动回调。
- `renderTabBar`: (props, DefaultTabBar) => ReactNode，自定义标签栏渲染。

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
