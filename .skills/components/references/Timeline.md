# Timeline — 时间轴

## 功能概述

垂直展示的时间流信息。

## 输入字段

### 必填

- `items`: TimelineItem[]，时间轴项配置数组。

### TimelineItem 结构

```tsx
interface TimelineItem {
  label?: ReactNode; // 标签（设置 mode 后有效）
  children: ReactNode; // 内容
  color?: string; // 圆点颜色，可选 `blue` | `red` | `green` | `gray` 或自定义
  dot?: ReactNode; // 自定义圆点
  pending?: boolean; // 是否为幽灵节点
  position?: 'left' | 'right'; // 位置（mode 为 `alternate` 时有效）
}
```

### 可选

- `mode`: string，模式，可选 `left` | `alternate` | `right`，默认 `left`。
- `pending`: ReactNode，是否显示幽灵节点。
- `pendingDot`: ReactNode，幽灵节点的圆点。
- `reverse`: boolean，节点排序，默认 `false`。

## 使用建议

展示时间流程使用时间轴；双边交替显示使用 alternate 模式；进行中的流程使用 pending。

## 示例代码

```tsx
import { ClockCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Timeline } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础用法 */}
    <Timeline
      items={[
        { children: 'Create a services site 2015-09-01' },
        { children: 'Solve initial network problems 2015-09-01' },
        { children: 'Technical testing 2015-09-01' },
        { children: 'Network problems being solved 2015-09-01' },
      ]}
    />

    {/* 不同颜色 */}
    <Timeline
      items={[
        { color: 'green', children: 'Create a services site 2015-09-01' },
        { color: 'green', children: 'Solve initial network problems 2015-09-01' },
        { color: 'red', children: 'Technical testing 2015-09-01' },
        { children: 'Network problems being solved 2015-09-01' },
      ]}
    />

    {/* 自定义图标 */}
    <Timeline
      items={[
        { children: 'Create a services site 2015-09-01' },
        { dot: <ClockCircleOutlined />, color: 'red', children: 'Solve initial network problems' },
        { children: 'Technical testing 2015-09-01' },
        { dot: <SmileOutlined />, children: 'Network problems being solved' },
      ]}
    />

    {/* 带标签 */}
    <Timeline
      mode="left"
      items={[
        { label: '2015-09-01', children: 'Create a services' },
        { label: '2015-09-01 09:12:11', children: 'Solve initial network problems' },
        { children: 'Technical testing' },
      ]}
    />

    {/* 交替展示 */}
    <Timeline
      mode="alternate"
      items={[
        { children: 'Create a services site 2015-09-01' },
        { children: 'Solve initial network problems 2015-09-01', color: 'green' },
        { children: 'Technical testing 2015-09-01', dot: <ClockCircleOutlined /> },
        { children: 'Network problems being solved 2015-09-01', color: 'red' },
      ]}
    />

    {/* 进行中 */}
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
