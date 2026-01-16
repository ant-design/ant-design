# Timeline — 时间轴

## 功能概述

垂直展示的时间流信息。

## 应用场景

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 输入字段

### Timeline 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `items`: [Items](#Items)[]，选项配置。
- `mode`: `start` | `alternate` | `end`，通过设置 `mode` 可以改变时间轴和内容的相对位置，默认 `start`。
- `orientation`: `vertical` | `horizontal`，设置时间轴的方向，默认 `vertical`。
- `~~pending~~`: ReactNode，指定最后一个幽灵节点是否存在或内容，请使用 `item.loading` 代替，默认 false。
- `~~pendingDot~~`: ReactNode，当最后一个幽灵节点存在時，指定其时间图点，请使用 `item.icon` 代替，默认 <LoadingOutlined />。
- `reverse`: boolean，节点排序，默认 false。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `titleSpan`: number | string，设置标题占比空间，为到 dot 中心点距离 <InlinePopover previewURL="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1NJISa7bpqgAAAAAR5AAAAgAerJ8AQ/original"></InlinePopover>，默认 12。
- `variant`: `filled` | `outlined`，设置样式变体，默认 `outlined`。

### Items 属性

#### 必填

- 无必填属性。

#### 可选

- `color`: string，指定圆圈颜色 `blue`、`red`、`green`、`gray`，或自定义的色值，默认 `blue`。
- `content`: ReactNode，设置内容。
- `~~children~~`: ReactNode，设置内容，请使用 `content` 替换。
- `~~dot~~`: ReactNode，自定义时间轴点，请使用 `icon` 替换。
- `icon`: ReactNode，自定义节点图标。
- `~~label~~`: ReactNode，设置标签，请使用 `title` 替换。
- `loading`: boolean，设置加载状态，默认 false。
- `placement`: `start` | `end`，自定义节点位置。
- `~~position~~`: `start` | `end`，自定义节点位置，请使用 `placement` 替换。
- `title`: ReactNode，设置标题。

## 方法

无公开方法。

## 使用建议

展示时间流程使用时间轴；双边交替显示使用 alternate 模式；进行中的流程使用 pending。

## 示例代码

```tsx
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Timeline } from 'antd';

const App: React.FC = () => (
  <>
    <Timeline
      items={[
        { children: 'Create a services site 2015-09-01' },
        { children: 'Solve initial network problems 2015-09-01' },
        { children: 'Technical testing 2015-09-01' },
        { children: 'Network problems being solved 2015-09-01' },
      ]}
    />

    <Timeline
      items={[
        { color: 'green', children: 'Create a services site 2015-09-01' },
        { color: 'green', children: 'Solve initial network problems 2015-09-01' },
        { color: 'red', children: 'Technical testing 2015-09-01' },
        { children: 'Network problems being solved 2015-09-01' },
      ]}
    />

    <Timeline
      items={[
        { children: 'Create a services site 2015-09-01' },
        { dot: <ClockCircleOutlined />, color: 'red', children: 'Solve initial network problems' },
        { children: 'Technical testing 2015-09-01' },
        { dot: <SmileOutlined />, children: 'Network problems being solved' },
      ]}
    />

    <Timeline
      mode="left"
      items={[
        { label: '2015-09-01', children: 'Create a services' },
        { label: '2015-09-01 09:12:11', children: 'Solve initial network problems' },
        { children: 'Technical testing' },
      ]}
    />

    <Timeline
      mode="alternate"
      items={[
        { children: 'Create a services site 2015-09-01' },
        { children: 'Solve initial network problems 2015-09-01', color: 'green' },
        { children: 'Technical testing 2015-09-01', dot: <ClockCircleOutlined /> },
        { children: 'Network problems being solved 2015-09-01', color: 'red' },
      ]}
    />

    <Timeline
      pending="Recording..."
      items={[
        { children: 'Create a services site 2015-09-01' },
        { children: 'Solve initial network problems 2015-09-01' },
        { children: 'Technical testing 2015-09-01' },
      ]}
    />
  </>
);
```

## 返回结果

渲染一个时间轴组件，用于展示时间流信息。
