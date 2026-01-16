# Collapse — 折叠面板

## 功能概述

可以折叠/展开的内容区域。

## 应用场景

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

## 输入字段

### Collapse 属性

#### 必填

- 无必填属性。

#### 可选

- `accordion`: boolean，手风琴模式，默认 false。
- `activeKey`: string\[] | string <br/> number\[] | number，当前激活 tab 面板的 key，默认 [手风琴模式](#collapse-demo-accordion)下默认第一个元素。
- `bordered`: boolean，带边框风格的折叠面板，默认 true。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `collapsible`: `header` | `icon` | `disabled`，所有子面板是否可折叠或指定可折叠触发区域，版本 4.9.0。
- `defaultActiveKey`: string\[] | string<br/> number\[] | number，初始化选中面板的 key。
- `~~destroyInactivePanel~~`: boolean，销毁折叠隐藏的面板，默认 false。
- `destroyOnHidden`: boolean，销毁折叠隐藏的面板，默认 false，版本 5.25.0。
- `expandIcon`: (panelProps) => ReactNode，自定义切换图标。
- `expandIconPlacement`: `start` | `end`，设置图标位置，默认 `start`。
- `~~expandIconPosition~~`: `start` | `end`，设置图标位置，请使用 `expandIconPlacement` 替换，版本 4.21.0。
- `ghost`: boolean，使折叠面板透明且无边框，默认 false，版本 4.4.0。
- `size`: `large` | `middle` | `small`，设置折叠面板大小，默认 `middle`，版本 5.2.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `onChange`: function，切换面板的回调。
- `items`: [ItemType](#itemtype)，折叠项目内容，版本 5.6.0。

### ItemType 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: [`Record<header | body, string>`](#semantic-dom)，语义化结构 className，版本 5.21.0。
- `collapsible`: `header` | `icon` | `disabled`，是否可折叠或指定可折叠触发区域。
- `children`: ReactNode，body 区域内容。
- `extra`: ReactNode，自定义渲染每个面板右上角的内容。
- `forceRender`: boolean，被隐藏时是否渲染 body 区域 DOM 结构，默认 false。
- `key`: string | number，对应 activeKey。
- `label`: ReactNode，面板标题。
- `showArrow`: boolean，是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon），默认 true。
- `styles`: [`Record<header | body, CSSProperties>`](#semantic-dom)，语义化结构 style，版本 5.21.0。

### Collapse.Panel 属性

#### 必填

- 无必填属性。

#### 可选

- `collapsible`: `header` | `icon` | `disabled`，是否可折叠或指定可折叠触发区域，版本 4.9.0 (icon: 4.24.0)。
- `extra`: ReactNode，自定义渲染每个面板右上角的内容。
- `forceRender`: boolean，被隐藏时是否渲染 body 区域 DOM 结构，默认 false。
- `header`: ReactNode，面板标题。
- `key`: string | number，对应 activeKey。
- `showArrow`: boolean，是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon），默认 true。

## 方法

无公开方法。

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
    <Collapse items={items} defaultActiveKey={['1']} />

    <Collapse accordion items={items} />

    <Collapse bordered={false} items={items} />

    <Collapse ghost items={items} />

    <Collapse
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={items}
    />

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
