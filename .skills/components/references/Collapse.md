# Collapse — 折叠面板

## 功能概述

可以折叠/展开的内容区域。用于将复杂的内容区域分组和隐藏。

## 输入字段

### 必填

- `items`: CollapseItem[]，折叠项配置数组。

### CollapseItem 结构

```tsx
interface CollapseItem {
  key: string; // 唯一标识
  label: ReactNode; // 面板标题
  children: ReactNode; // 面板内容
  disabled?: boolean; // 禁用
  showArrow?: boolean; // 显示箭头
  forceRender?: boolean; // 强制渲染隐藏内容
  collapsible?: 'header' | 'icon' | 'disabled'; // 可折叠触发区域
  extra?: ReactNode; // 右上角额外内容
  style?: CSSProperties; // 样式
  headerClass?: string; // 标题类名（5.21.0+）
}
```

### 可选

- `activeKey`: string | string[]，当前激活面板的 key（受控）。
- `defaultActiveKey`: string | string[]，默认激活面板的 key。
- `accordion`: boolean，手风琴模式（只展开一个）。
- `bordered`: boolean，带边框，默认 `true`。
- `ghost`: boolean，幽灵样式（无边框背景）。
- `size`: string，尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `collapsible`: string，可折叠触发区域，可选 `header` | `icon` | `disabled`。
- `expandIcon`: (panelProps) => ReactNode，自定义切换图标。
- `expandIconPosition`: string，图标位置，可选 `start` | `end`，默认 `start`。
- `destroyInactivePanel`: boolean，销毁非激活面板。
- `onChange`: (key) => void，切换回调。

## 使用建议

FAQ 页面使用折叠面板；手风琴模式用于只需查看一项的场景；使用 extra 添加操作按钮。

## 示例代码

```tsx
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Space } from 'antd';
import type { CollapseProps } from 'antd';

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>A dog is a type of domesticated animal.</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>A dog is a type of domesticated animal.</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>A dog is a type of domesticated animal.</p>,
  },
];

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    {/* 基础用法 */}
    <Collapse items={items} defaultActiveKey={['1']} />

    {/* 手风琴模式 */}
    <Collapse accordion items={items} />

    {/* 无边框 */}
    <Collapse bordered={false} items={items} />

    {/* 幽灵模式 */}
    <Collapse ghost items={items} />

    {/* 自定义图标 */}
    <Collapse
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={items}
    />

    {/* 可嵌套 */}
    <Collapse
      items={[
        {
          key: '1',
          label: 'This is panel 1',
          children: (
            <Collapse
              items={[{ key: '1-1', label: 'Nested panel', children: <p>Nested content</p> }]}
            />
          ),
        },
      ]}
    />
  </Space>
);
```

## 返回结果

渲染一个折叠面板，用于分组和隐藏内容。
